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
      type="dni"
      placeholder="DNI" />
    <input
      type="password"
      placeholder="contraseña" />
    <input
      type="password"
      placeholder="confirmar contraseña" />
    <input
      type="categoria"
      placeholder="categoria" />
    <Boton
      type="auth"
      @click="createAcc('/client/createEvent')">
      {{ $t('Crear') }}
    </Boton>
    <p class="message">
      {{ $t('tienesCuenta') }} <a href="/login">{{ $t('iniciaSesion') }}</a>
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
