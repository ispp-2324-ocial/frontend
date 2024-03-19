<template>
  <form>
    <slot />
    <BaseInput
      tipo="text"
      placeholder="nombre" />
    <BaseInput
      tipo="text"
      placeholder="correo electrónico" />
    <BaseInput
      tipo="dni"
      placeholder="DNI" />
    <BaseInput
      tipo="password"
      placeholder="contraseña" />
    <BaseInput
      tipo="password"
      placeholder="confirmar contraseña" />
    <select v-model="ocialClientDetail.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category">
        {{ categorias[indice] }}
      </option>
    </select>
    <BaseInput
      tipo="categoria"
      placeholder="categoria" />
    <Boton
      type="auth"
      @click="createAcc()">
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
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import { CategoryEnum } from '@/api';

const router = useRouter();

const { t } = useI18n();

const ocialClientDetail = ref(
  {
    name: '',
    email: '',
    dni: '',
    password: '',
    category: ''
  });

const cateEnum = [CategoryEnum.NUMBER_0, CategoryEnum.NUMBER_1, CategoryEnum.NUMBER_2, CategoryEnum.NUMBER_3, CategoryEnum.NUMBER_4];

const categorias = computed(() =>
  [t('categoryDeporte'),
   t('categoryMusica'),
   t('categoryMercado'),
   t('categoryRelax'),
   t('categoryConcierto')]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {
  await router.push('/client/createEvent');
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
