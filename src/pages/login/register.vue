<template>
  <form @submit.prevent="() => {}">
    <BaseInput
      v-model="form.username"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[0]" />
    <div class="error">
      {{ getError('name') }}
    </div>
    <BaseInput
      v-model="form.email"
      :is-required="true"
      tipo="email"
      :placeholder="placeholders[1]" />
    <div class="error">
      {{ getError('email') }}
    </div>
    <BaseInput
      v-model="form.password"
      tipo="password"
      :is-required="true"
      :placeholder="placeholders[2]" />
    <div class="error">
      {{ getError('password') }}
    </div>
    <BaseInput
      v-model="form.password2"
      tipo="password"
      :is-required="true"
      :validators="[(v)=>v===form.password]"
      :placeholder="placeholders[3]" />
    <div class="error">
      {{ getError('password2') }}
    </div>
    <Boton
      class="boton"
      type="auth"
      @click="createAcc()">
      {{ $t('Crear') }}
    </Boton>
    <Boton
      type="auth"
      @click="router.push('/login/registerClient')">
      {{ $t('cuentaCliente') }}
    </Boton>
  </form>
  <p class="message">
    {{ $t('tienesCuenta') }} <a href="/login">{{ $t('iniciaSesion') }}</a>
  </p>
</template>

<route lang="yaml">
  meta:
    layout: login
</route>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import useValidation from '@/pages/login/useValidation';
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';

const validationSchema = z.object({
  username: z.string().min(1, 'The name field is required'),
  password: z.string().min(8, 'Please enter a valid password'),
  password2: z.string().min(8, 'Please enter a valid password'),
  email: z.string().email(1, 'Please enter a valid email')
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ['password2']
});

const form = ref({
  username: '',
  password: '',
  password2: '',
  email: ''
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

const password = ref('');

const router = useRouter();

/**
 * Esta función crea un usuario
 */
async function createAcc() : Promise<void> {

  await validate();

  if (isValid.value) {
    await useApi(UsersApi, 'usersUserRegisterCreate')(() => ({
      user: {
        'password': form.value.password,
        'email': form.value.email,
        'username': form.value.username,
        'lastKnowLocLat': 0, //TO-DO mejorar
        'lastKnowLocLong': 0,
        'djangoUser': 1
      }
    }));

    await router.push('/login');
  } else {
    scrolltoError('.p-invalid', { offset: 24 });
  }

};

const { t } = useI18n();

const placeholders = computed(() =>
  [t('placeholderNombre'),
   t('placeholderEmail'),
   t('placeholderContra'),
   t('placeholderConfirmarContra')]);
</script>

<style scoped>
.boton{
  margin-bottom: 1vh;
}

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

.form .message a {
  color: #0e4791;
  text-decoration: underline;
}
</style>
