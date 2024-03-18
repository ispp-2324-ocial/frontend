<template>
  <form>
    <slot />
    <input
      type="text"
      placeholder="nombre" />
    <input
      type="text"
      placeholder="correo electrónico" />
    <input
      type="password"
      placeholder="contraseña" />
    <input
      type="password"
      placeholder="confirmar contraseña" />
    <Boton
      class="boton"
      type="auth"
      @click="createAcc('/map')">
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
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc(path:string) : Promise<void> {
  await router.push(path);
};
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

.form input {
  outline: 0;
  background: #ffffff;
  width: 100%;
  border: 2px solid #3e80d7;
  border-radius: 15px;
  margin-bottom: 1vh;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
