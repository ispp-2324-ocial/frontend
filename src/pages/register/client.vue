<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      v-model="form.username"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[0]" />
    <div class="error">
      {{ getError('username') }}
    </div>
    <BaseInput
      v-model="form.name"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[1]" />
    <div class="error">
      {{ getError('name') }}
    </div>
    <BaseInput
      v-model="form.email"
      tipo="email"
      :is-required="true"
      :placeholder="placeholders[2]" />
    <div class="error">
      {{ getError('email') }}
    </div>
    <BaseInput
      v-model="form.dni"
      tipo="dni"
      :is-required="true"
      :placeholder="placeholders[3]" />
    <div class="error">
      {{ getError('dni') }}
    </div>
    <BaseInput
      v-model="form.password"
      tipo="password"
      :is-required="true"
      :placeholder="placeholders[4]" />
    <div class="error">
      {{ getError('password') }}
    </div>
    <BaseInput
      v-model="form.password2"
      tipo="password"
      :is-required="true"
      :validators="[(v: string)=>v===form.password]"
      :placeholder="placeholders[5]" />
    <div class="error">
      {{ getError('password2') }}
    </div>
    <select v-model="form.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category"
        :value="category">
        {{ categorias[indice] }}
      </option>
    </select>
    <div class="error">
      {{ getError('category') }}
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        @change="handleImage" />
    </div>
    <Checkbox v-model="form.acceptCondition">
      {{ $t('accept') }}
      <a
        href="https://ocial.es/privacy"
        style="color:var(--o-color-theme)"
        target="_blank"
        rel="noopener">
        {{ $t('policy') }}
      </a>
      {{ $t('and') }}
      <a
        href="https://ocial.es/customeragreement"
        style="color:var(--o-color-theme)"
        target="_blank"
        rel="noopener">
        {{ $t('terms') }}
      </a>
    </Checkbox>
    <div class="error">
      {{ getError('acceptCondition') }}
    </div>
    <Boton
      type="auth">
      <div @click="createAcc()">
        {{ $t('Crear') }}
      </div>
    </Boton>
    <p class="message">
      {{ $t('tienesCuenta') }} <RouterLink
        :to="`/login`">
        {{ $t('iniciaSesion') }}
      </RouterLink>
    </p>
  </form>
</template>

<route lang="yaml">
  meta:
    layout: anonymous
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { ref, shallowRef, computed } from 'vue';
import { z } from 'zod';
import destr from 'destr';
import { UsersApi, TypeClientEnum } from '@/api';
import { useApi } from '@/composables/apis';
import { useValidation } from '@/composables/use-validation';
import { toBase64 } from '@/utils/data-manipulation';
import { useToast } from '@/composables/use-toast';
import { isNil, isObj } from '@/utils/validation';
import { auth } from '@/store/auth';

const { t } = useI18n();

const validationSchema = z.object({
  username: z.string().min(1, t('usernameRequired')),
  name: z.string().min(1, t('nameRequired')),
  password: z.string().min(8, t('validPassword')),
  password2: z.string().min(8, t('validPassword')),
  email: z.string().email(t('validEmail')),
  dni: z.string().length(9, t('validDocumentation')),
  category: z.string().min(1, t('categoryRequired')),
  acceptCondition: z.boolean()
}).refine((data) => data.password === data.password2, {
  message: t('passwordMatch'),
  path: ['password2']
}).refine((data) => data.acceptCondition === true, {
  message: t('acceptConditions'),
  path: ['acceptCondition']
});

const form = ref({
  username: '',
  password: '',
  password2: '',
  email: '',
  name: '',
  dni: '',
  category: TypeClientEnum.Artist,
  acceptCondition: false
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

const router = useRouter();

const image = shallowRef<string>();

const cateEnum = [
  TypeClientEnum.Artist,
  TypeClientEnum.BarRestaurant,
  TypeClientEnum.EventsAndConcerts,
  TypeClientEnum.LocalGuide,
  TypeClientEnum.SmallBusiness
];

const categorias = computed(() =>
  [t('categoryArtist'),
   t('categoryBarRestaurant'),
   t('categoryEventsAndConcerts'),
   t('categoryLocalGuide'),
   t('categorySmallBusiness')]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {
  await validate();

  if (isValid.value) {
    const { data: UserCreated, response } = await useApi(UsersApi, 'usersClientRegisterCreate')(() => ({
      ocialClientCreate: {
        'password': form.value.password,
        'email': form.value.email,
        'username': form.value.username,
        'image_B64': image?.value ?? '',
        'name': form.value.name,
        'identification_document': form.value.dni,
        'type_client': form.value.category,
        'default_latitude': 0,
        'default_longitude':0
      }
    }));

    // Autenticar al cliente
    if (
      !isNil(response.value?.status) &&
      response.value.status >= 400 &&
      isObj(response.value?.request) &&
      'response' in response.value.request
    ) {
      const casted = destr<ErrorPayload>(response.value.request.response);

      if ('error' in casted) {
        useToast(casted.error, 'error');
      } else {
        const { t } = useI18n();

        useToast(t('ErrorDesconocido'), 'error');
      }
    } else {
      auth.authenticate(UserCreated.value);
      await router.replace('/');
    }

  } else {
    scrolltoError('.p-invalid', 24);
  }
};

/**
 * Pasar imagen del input a base64
 */
async function handleImage(event: Event): Promise<void> {
  image.value = await toBase64(event);
};

const placeholders = computed(() =>
  [t('placeholderUsername'),
   t('placeholderNombre'),
   t('placeholderEmail'),
   t('placeholderDNI'),
   t('placeholderContra'),
   t('placeholderConfirmarContra')]);
</script>

<style scoped>
.form .message {
  color: #3e80d7;
  font-size: 14px;
  margin-top: 1.5vh;
}

.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}
a:hover {
  text-decoration-line: underline;
}
</style>
