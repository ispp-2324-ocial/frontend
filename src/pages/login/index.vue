<template>
  <form>
    <input
      type="text"
      placeholder="correo electrónico" />
    <input
      type="password"
      placeholder="contraseña" />
    <Boton type="auth">
      <div @click="router.push('/map')">
        {{ $t('iniciarSesion') }}
      </div>
    </Boton>
    <p
      class="message"
      style="margin: 15px 0 0;">
      {{ $t('noTienesCuenta') }} <a href="/login/register">{{ $t('registrate') }}</a>
    </p>
  </form>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.form .message {
  color: #3e80d7;
  font-size: 14px;
}

.form .message a {
  color: #0e4791;
  text-decoration: underline;
}

.form input {
  outline: 0;
  background: #ffffff;
  width: 100%;
  border: 2px solid #3e80d7;
  border-radius: 15px;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
