<!-- TODO: Arreglar -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <Ondas />
  <div style="margin-top: 10%; ">
    <Title>
      {{ $t('nuevoEvento') }}
    </Title>
    <div style="margin-top: 10%; justify-content: center; display: flex;">
      <div v-for="(event, index) in eventDetail">
        <BaseInput
          :key="index"
          v-model="event.name"
          class="input-box"
          placeholder="Nombre del evento" />
        <BaseInput
          :key="index"
          v-model="event.place"
          class="input-box"
          placeholder="Lugar" />
        <BaseInput
          :key="index"
          v-model="event.event"
          class="input-box"
          placeholder="Descripción" />
        <BaseInput
          :key="index"
          v-model="event.date"
          class="input-box"
          tipo="date"
          placeholder="dd/mm/yy" />
        <BaseInput
          :key="index"
          v-model="event.hour"
          class="input-box"
          tipo="time"
          placeholder="hh:mm" />
        <BaseInput
          :key="index"
          v-model="event.capacity"
          class="input-box"
          tipo="number"
          placeholder="Capacidad" />
        <select v-model="event.category">
          <option
            v-for="(category,indice) in cateEnum"
            :key="category">
            {{ categorias[indice] }}
          </option>
        </select>
      </div>
    </div>
    <Boton
      type="rounded-blue"
      style="margin-top: 5%;display: flex;"
      @click="createE()">
      {{ $t('crearEvento') }}
    </Boton>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { CategoryEnum } from '@/api';

const { t } = useI18n();

const router = useRouter();

const eventDetail = ref([
  {
    name: '',
    place: '',
    event: '',
    date: '',
    hour: '',
    capacity: '',
    category: ''
  }]);

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
async function createE() : Promise<void> {
  await router.push('/client');
};

</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}
</style>
