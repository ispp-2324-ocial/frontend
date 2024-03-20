<template>
  <form>
    <BaseInput
      class="input"
      tipo="text"
      :placeholder="placeholders[0]" />
    <BaseInput
      tipo="password"
      :placeholder="placeholders[1]" />
    <Boton type="auth">
      <div @click="router.push('/map')">
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
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';

const router = useRouter();

const { t } = useI18n();

const placeholders = computed(() =>
  [t('placeholderEmail'),
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
