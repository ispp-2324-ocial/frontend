<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      tipo="text"
      v-model="username"
      :placeholder="placeholders[0]" />
    <BaseInput
      tipo="email"
      v-model="email"
      :placeholder="placeholders[1]" />
    <BaseInput
      tipo="password"
      v-model="password"
      :placeholder="placeholders[2]" />
    <BaseInput
      tipo="password"
      v-model="password2"
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
import { UsersApi, type User, CategoryEnum } from '@/api';
import { useApi } from '@/composables/apis';

const username = ref('');
const password = ref('');
const password2 = ref('');
const email = ref('');

const router = useRouter();

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {
  if (password.value != password2.value) {
    //TO-DO error
  }
  const { loading, data: UserCreated} = await useApi(UsersApi, 'usersUserRegisterCreate')(() => ({
  user: {
  "password": password.value,
  "email": email.value,
  "username": username.value,
  //"auth_provider": "email",
  "lastKnowLocLat": 0.,
  "lastKnowLocLong": 0,
  "category": CategoryEnum.NUMBER_0, //esto hay que quitarlo
  "usuario": 1 //cambiar despues a django user
  }
  }));
  console.log(UserCreated.value);
  // autenticar al usuario registrado
  await router.push('/map');
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
