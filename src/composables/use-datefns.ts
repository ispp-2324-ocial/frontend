import * as datefnslocales from 'virtual:locales/date-fns';
import { getCurrentScope, type ComputedRef, computed } from 'vue';
import { i18n } from '@/plugins/i18n';
import { isObj } from '@/utils/validation';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

/**
 * Utiliza cualquier función de date-fns con el idioma adecuado.
 * La función de date-fns a invocar se pasa como primer parámetro, y sus parámetros como segundo parámetro
 *
 * ESTA FUNCIÓN DEBE SER LLAMADA DENTRO DE UN COMPUTED O UN TEMPLATE PARA QUE SE REFLEJEN LOS CAMBIOS
 *
 * @param func - date-fns function to invoke
 * @param params - Parameters to pass to the date-fns function
 */
export function useDateFns<T extends (...a: any[]) => any>(
  func: T,
  ...params: Parameters<T>
): ReturnType<T> | ComputedRef<ReturnType<T>> {
  const logic = (): ReturnType<T> => {
    /**
     * Tenemos que eliminar el guión de nuestros códigos de localización, ya que usar exportaciones con nombre con ellos no es una sintaxis JS válida
     */
    const importCode = i18n.locale.value.replace(
      '-',
      ''
    ) as keyof typeof datefnslocales;

    if (isObj(params.at(-1)) && !(params.at(-1) instanceof Date)) {
      params.at(-1).locale = datefnslocales[importCode];
    } else {
      params.push({ locale: datefnslocales[importCode] });
    }

    return func(...params);
  };

  return getCurrentScope() === undefined ? computed(logic) : logic();
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
