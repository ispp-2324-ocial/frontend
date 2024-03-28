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
          :placeholder="placeholders[0]" />
        <BaseInput
          :key="index"
          v-model="event.place"
          class="input-box"
          :placeholder="placeholders[1]" />
        <BaseInput
          :key="index"
          v-model="event.event"
          class="input-box"
          :placeholder="placeholders[2]" />
        <BaseInput
          :key="index"
          v-model="event.date"
          class="input-box"
          tipo="date" />
        <BaseInput
          :key="index"
          v-model="event.hour"
          class="input-box"
          tipo="time" />
        <BaseInput
          :key="index"
          v-model="event.capacity"
          class="input-box"
          tipo="number"
          :placeholder="placeholders[3]" />
        <select
          v-model="event.category"
          class="input-box">
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
import { ref, computed } from 'vue';
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
async function createE() : Promise<void> {
  await router.push('/client');
};

const placeholders = computed(() =>
  [t('placeholderNombreEvento'),
   t('placeholderLugar'),
   t('placeholderDescripcion'),
   t('placeholderCapacidad')]);
</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}
</style>
