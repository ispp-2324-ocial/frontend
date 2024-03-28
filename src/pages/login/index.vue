<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      v-model="username"
      class="input"
      tipo="text"
      :placeholder="placeholders[0]" />
    <BaseInput
      v-model="password"
      tipo="password"
      :placeholder="placeholders[1]" />
    <Boton type="auth">
      <div @click="Login()">
        {{ $t('iniciarSesion') }}
      </div>
    </Boton>
    <p
      class="message">
      {{ $t('noTienesCuenta') }} <a href="/login/register">{{ $t('registrate') }}</a>
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
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';
import { auth } from '@/store/auth';

const router = useRouter();

const { t } = useI18n();

const username = ref('');
const password = ref('');

/**
 * Login de usuario y cliente
 */
async function Login() : Promise<void> {
  const {data: UserCreated} = await useApi(UsersApi, 'usersLoginCreate')(() => ({
    loginUser: {
      'username': username.value,
      'password': password.value
    }
  }));

  auth.authenticate(username.value, UserCreated.value.isClient, UserCreated.value.token);
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

.form .message a {
  color: #0e4791;
  text-decoration: underline;
}
</style>
