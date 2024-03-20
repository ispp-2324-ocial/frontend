<template>
  <form>
    <BaseInput
      tipo="text"
      :placeholder="placeholders[0]" />
    <BaseInput
      tipo="email"
      :placeholder="placeholders[1]" />
    <BaseInput
      tipo="password"
      :placeholder="placeholders[2]" />
    <BaseInput
      tipo="password"
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
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';

const router = useRouter();

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {
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
