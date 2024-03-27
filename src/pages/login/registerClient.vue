<template>
  <form>
    <BaseInput
      tipo="text"
      :placeholder="placeholders[0]" />
    <BaseInput
      tipo="text"
      :placeholder="placeholders[1]" />
    <BaseInput
      tipo="dni"
      :placeholder="placeholders[2]" />
    <BaseInput
      tipo="password"
      :placeholder="placeholders[3]" />
    <BaseInput
      tipo="password"
      :placeholder="placeholders[4]" />
    <select v-model="ocialClientDetail.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category">
        {{ categorias[indice] }}
      </option>
    </select>
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

const cateEnum = [CategoryEnum.Sports, CategoryEnum.Music, CategoryEnum.Markets, CategoryEnum.RelaxActivities, CategoryEnum.LiveConcert];

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

const placeholders = computed(() =>
  [t('placeholderNombre'),
   t('placeholderEmail'),
   t('placeholderDNI'),
   t('placeholderContra'),
   t('placeholderConfirmarContra')]);
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
