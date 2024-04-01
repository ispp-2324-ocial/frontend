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
    <GoogleLogin :callback="callback" />

    <p
      class="message">
      {{ $t('noTienesCuenta') }} <RouterLink
        :to="`/login/register`">
        {{ $t('registrate') }}
      </RouterLink>
    </p>
  </form>
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
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';
import { auth } from '@/store/auth';
import { useValidation } from '@/composables/use-validation';

const router = useRouter();

const { t } = useI18n();

const validationSchema = z.object({
  username: z.string().min(1, t('usernameRequired')), //The username is required
  password: z.string().min(8, t('validPassword')) //Please enter a valid password
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

/**
 * Login de usuario y cliente
 */
async function Login() : Promise<void> {

  await validate();

  if (isValid.value) {
    const { data: UserCreated } = await useApi(UsersApi, 'usersLoginCreate')(() => ({
      loginUser: {
        'username': form.value.username,
        'password': form.value.password
      }
    }));

    auth.authenticate(form.value.username, UserCreated.value.isClient, UserCreated.value.token);
    await router.replace('/');

  } else {
    scrolltoError('.p-invalid', { offset: 24 });
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

const callback = async (response : GoogleResponseObject): Promise<void> => {
  let credential = response.credential;

  const { data: UserCreated } = await useApi(UsersApi, 'usersUserGoogleOauth2Create', { skipCache: { request: true } } )(() => ({
    googleSocialAuth: {
      'auth_token': credential
    }
  }));

  auth.authenticate(UserCreated.value.user.username, UserCreated.value.isClient, UserCreated.value.token);
  await router.push('/map');
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
