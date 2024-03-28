<template>
  <form @submit.prevent="() => {}">
    <BaseInput
      v-model="username"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[0]" />
    <BaseInput
      v-model="email"
      :is-required="true"
      tipo="email"
      :placeholder="placeholders[1]" />
    <BaseInput
      v-model="password"
      tipo="password"
      :is-required="true"
      :placeholder="placeholders[2]" />
    <BaseInput
      v-model="password2"
      tipo="password"
      :is-required="true"
      :validators="[(v)=>v===password]"
      :placeholder="placeholders[3]" />
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
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';

const username = ref('');
const password = ref('');
const password2 = ref('');
const email = ref('');

const router = useRouter();

/**
 * Esta función crea un usuario
 */
async function createAcc() : Promise<void> {

  if (password.value == password2.value && username.value != '' && password.value != '' && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    const { data: UserCreated} = await useApi(UsersApi, 'usersUserRegisterCreate')(() => ({
      user: {
        'password': password.value,
        'email': email.value,
        'username': username.value,
        'lastKnowLocLat': 0, //TO-DO mejorar
        'lastKnowLocLong': 0,
        'djangoUser': 1
      }
    }));

    await router.push('/login');
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

.form .message a {
  color: #0e4791;
  text-decoration: underline;
}
</style>
