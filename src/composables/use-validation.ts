import type { ZodTypeAny, z } from 'zod';
import { groupBy } from 'lodash-es';
import { ref, shallowRef, watch, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

interface ComposableReturnType {
  validate: () => Promise<Ref<Record<string, z.ZodIssue[]> | undefined>>;
  errors: Ref<Record<string, z.ZodIssue[]> | undefined>;
  isValid: Ref<boolean>;
  clearErrors: () => void;
  getError: (path: string) => string | undefined;
  scrolltoError: (selector?: string, offset?: number) => void;
};

/**
 * Funcion auxiliar para validacion zod
 */
export function useValidation<T extends ZodTypeAny>(
  schema: T,
  data: MaybeRefOrGetter<Record<string, unknown>>,
  options?: { mode: 'eager' | 'lazy' }): ComposableReturnType {
  const opts = { mode : 'lazy', ...options };
  const isValid = shallowRef(true);
  const errors = ref<Record<string, z.ZodIssue[]> | undefined>();

  const clearErrors = (): void => {
    errors.value = undefined;
  };

  const validate = async (): Promise<typeof errors> => {
    clearErrors();

    const result = await schema.safeParseAsync(toValue(data));

    isValid.value = result.success;

    if (!result.success) {
      errors.value = groupBy(result.error.issues, 'path');
    }

    return errors;
  };

  const scrolltoError = (selector = '.is-error', offset = 0): void => {
    const element = document.querySelector(selector);

    if (element) {
      const topOffset = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;

      window.scrollTo({
        behavior: 'smooth',
        top: topOffset
      });
    }
  };

  const getError = (path: string): string | undefined =>
    errors.value?.[path]?.[0]?.message;

  if (opts.mode === 'eager') {
    watch(
      () => toValue(data),
      async () => {
        await validate();
      },
      { deep: true }
    );
  }

  return { validate, errors, isValid, clearErrors, getError, scrolltoError };
}
