<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      v-model="form.username"
      class="input"
      tipo="text"
      :placeholder="placeholders[0]" />
    <div class="error">
      {{ getError('username') }}
    </div>
    <BaseInput
      v-model="form.password"
      tipo="password"
      :placeholder="placeholders[1]" />
    <div class="error">
      {{ getError('password') }}
    </div>
    <Boton
      style="margin-bottom: 1rem"
      type="auth">
      <div @click="Login()">
        {{ $t('iniciarSesion') }}
      </div>
    </Boton>
    <p class="message">
      {{ $t('soloUsuarios') }}
    </p>
    <GoogleLogin
      :callback="callback"
      style="display: flex; justify-content: center;" />

    <p
      class="message">
      {{ $t('noTienesCuenta') }}
      <RouterLink
        to="/register">
        {{ $t('registrate') }}
      </RouterLink>
    </p>
  </form>
</template>

<route lang="yaml">
  meta:
    layout: anonymous
</route>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import destr from 'destr';
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';
import { auth } from '@/store/auth';
import { useValidation } from '@/composables/use-validation';
import { useToast } from '@/composables/use-toast';
import { isObj } from '@/utils/validation';

const router = useRouter();

const { t } = useI18n();

const validationSchema = z.object({
  username: z.string().min(1, t('usernameRequired')), //The username is required
  password: z.string().min(8, t('validPassword')) //Please enter a valid password
});

const form = ref({
  username: '',
  password: '',
  password2: ''
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

/**
 * Login de usuario y cliente
 */
async function Login() : Promise<void> {
  await validate();

  if (isValid.value) {
    const { data: UserCreated, response } = await useApi(UsersApi, 'usersLoginCreate')(() => ({
      login: {
        'username': form.value.username,
        'password': form.value.password
      }
    }));

    if (response.value?.status == 200) {
      auth.authenticate(UserCreated.value);
      await router.replace('/');
    } else if (isObj(response.value?.request) &&
    'response' in response.value.request
    ) {
      const casted = destr<ErrorPayload>(response.value.request.response);

      if ('error' in casted) {
        useToast(casted.error, 'error');
      } else {
        const { t } = useI18n();

        useToast(t('Error desconocido'), 'error');
      }
    }
  } else {
    scrolltoError('.p-invalid', 24);
  }
};

/**
 * Google login callback
 */

interface GoogleResponseObject {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

const callback = async (googleresponse : GoogleResponseObject): Promise<void> => {
  const { data: UserCreated, response: api_response } = await useApi(UsersApi, 'usersUserGoogleOauth2Create', { skipCache: { request: true } } )(() => ({
    googleSocialAuth: {
      'auth_token': googleresponse.credential
    }
  }));

  if (api_response.value?.status == 200) {
    auth.authenticate(UserCreated.value);
    await router.replace('/');
  } else if (isObj(api_response.value?.request) &&
  'response' in api_response.value.request
  ) {
    const casted = destr<ErrorPayload>(api_response.value.request.response);

    if ('error' in casted) {
      useToast(casted.error, 'error');
    } else {
      const { t } = useI18n();

      useToast(t('Error desconocido'), 'error');
    }
  }
};


const placeholders = computed(() =>
  [t('placeholderUsername'),
   t('placeholderContra')]);
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
</style>
