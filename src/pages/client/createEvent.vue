<!-- TODO: Arreglar -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <Ondas />
  <div
    v-if="auth.isLoggedIn.value && auth.isClient.value"
    style="margin-top: 10%; ">
    <Title>
      {{ $t('nuevoEvento') }}
    </Title>
    <div style="margin-top: 10%; justify-content: center; display: flex;">
      <div v-for="(event, index) in eventDetail">
        <BaseInput
          :key="index"
          v-model="eventDetail.name"
          class="input-box"
          :placeholder="placeholders[0]" />
        <BaseInput
          :key="index"
          v-model="eventDetail.place"
          class="input-box"
          :placeholder="placeholders[1]" />
        <BaseInput
          :key="index"
          v-model="eventDetail.event"
          class="input-box"
          :placeholder="placeholders[2]" />
        <BaseInput
          :key="index"
          v-model="eventDetail.timeStart"
          class="input-box"
          tipo="datetime-local" />
        <BaseInput
          :key="index"
          v-model="eventDetail.timeEnd"
          class="input-box"
          tipo="datetime-local" />
        <BaseInput
          :key="index"
          v-model="eventDetail.capacity"
          class="input-box"
          tipo="number"
          :placeholder="placeholders[3]" />
        <select
          v-model="eventDetail.category"
          class="input-box">
          <option
            v-for="(category,indice) in cateEnum"
            :key="category"
            :value="category">
            {{ categorias[indice] }}
          </option>
        </select>
        <div>
          <input
            type="file"
            accept="image/*"
            @change="handleImage" />
        </div>
        <div
          id="map"
          style="height: 300px;" />
        <div />
      </div>
      <Boton
        type="rounded-blue"
        style="margin-top: 5%;display: flex;"
        @click="createE()">
        {{ $t('crearEvento') }}
      </Boton>
    </div>
  </div>
  <div v-else>
    <Title>
      {{ $t('NotLogged') }}
    </Title>
    <Boton
      type="rounded-blue"
      style="margin-top: 5%;display: flex;"
      @click="router.push('/login')">
      {{ $t('iniciaSesion') }}
    </Boton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as L from 'leaflet';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { CategoryEnum , EventApi } from '@/api';
import { auth } from '@/store/auth';
import { useEvent } from '@/composables/apis';
import { isNull } from '@/utils/validation';

const { t } = useI18n();

const router = useRouter();

const image = ref('');

const markerLocation = ref<[number, number]>();

const eventDetail = ref([
  {
    name: '',
    place: '',
    event: '',
    timeStart: '',
    timeEnd: '',
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
  const { data: eventCreated } = await useEvent(EventApi, 'eventCreateCreate')(() => ({
    eventCreate: {
      'event': eventDetail.value.event,
      'place': eventDetail.value.place,
      'capacity': eventDetail.value.capacity,
      'name': eventDetail.value.name,
      'latitude': markerLocation.value[0],
      'longitude': markerLocation.value[1],
      'timeEnd' : eventDetail.value.timeEnd + ':00.000Z',
      'timeStart': eventDetail.value.timeStart + ':00.000Z',
      'category': eventDetail.value.category,
      'imageB64': image.value == undefined ? '' : image.value,
      'ocialClient': 0
    }
  }));

  await router.push('/client');
};

/**
 * Pasar imagen del input a base64
 */
function handleImage() : void {
  var file = document.querySelector('input[type=file]')['files'][0];

  var reader = new FileReader();

  reader.addEventListener('load', () => {
    image.value = isNull(reader.result) ? undefined : reader.result;

  });
  reader.readAsDataURL(file);
};

const placeholders = computed(() =>
  [t('placeholderNombreEvento'),
   t('placeholderLugar'),
   t('placeholderDescripcion'),
   t('placeholderCapacidad')]);


let map: L.Map;
let marker: L.Marker | undefined;

onMounted(() => {
  map = L.map('map').setView([37.393, -5.984], 12); // Initial map center (Sevilla)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', (e: L.LeafletMouseEvent) => {
    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);
    markerLocation.value = [e.latlng.lat, e.latlng.lng];
  });
});
</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}
</style>
