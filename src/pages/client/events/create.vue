<!-- TODO: Arreglar -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <Ondas />
  <div
    style="margin-top: 10%; ">
    <Title>
      {{ $t('nuevoEvento') }}
    </Title>
    <div style="margin-top: 1%; justify-content: center; display: flex;">
      <form @submit.prevent="()=>{}">
        <div>
          <BaseInput
            v-model="form.name"
            class="input-box"
            :placeholder="placeholders[0]" />
          <div class="error">
            {{ getError('name') }}
          </div>
          <BaseInput
            v-model="form.place"
            class="input-box"
            :placeholder="placeholders[1]" />
          <div class="error">
            {{ getError('place') }}
          </div>
          <BaseInput
            v-model="form.description"
            class="input-box"
            :placeholder="placeholders[2]" />
          <div class="error">
            {{ getError('description') }}
          </div>
          <BaseInput
            v-model="form.timeStart"
            class="input-box"
            tipo="datetime-local" />
          <div class="error">
            {{ getError('timeStart') }}
          </div>
          <BaseInput
            v-model="form.timeEnd"
            class="input-box"
            tipo="datetime-local" />
          <div class="error">
            {{ getError('timeEnd') }}
          </div>
          <BaseInput
            v-model="parseableCapacity"
            class="input-box"
            tipo="number"
            :placeholder="placeholders[3]" />
          <div class="error">
            {{ getError('capacity') }}
          </div>
          <SelectCategory v-model="form.category" />
          <div class="error">
            {{ getError('category') }}
          </div>
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
          <div class="error">
            {{ getError('latitude') }}
          </div>
        </div>
      </form>
    </div>
    <Boton
      type="rounded-blue"
      style="display: flex; margin-top: 1%"
      @click="createE()">
      {{ $t('crearEvento') }}
    </Boton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import * as L from 'leaflet';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { CategoryEnum , EventApi } from '@/api';
import { useEvent } from '@/composables/apis';
import { useValidation } from '@/composables/use-validation';
import { toBase64 } from '@/utils/data-manipulation';

const { t } = useI18n();

const validationSchema = z.object({
  place: z.string().min(1, t('placeRequired')),
  name: z.string().min(1, t('nameRequired')),
  description: z.string().min(1, t('eventRequired')),
  timeStart: z.string().datetime({ precision: 3, message: t('timeStartRequired') }),
  timeEnd: z.string().datetime({ precision: 3, message: t('timeEndRequired') }),
  capacity: z.number().min(1, t('capacityRequired')),
  category: z.string().min(1, t('categoryRequired')),
  latitude: z.number().min(-91, t('mapRequired')),
  longitude: z.number().min(-400, t('mapRequired'))
}).refine((data) => new Date(data.timeStart) <= new Date(data.timeEnd), {
  message: t('EventMustStartBeforeEnd'),
  path: ['timeStart']
}).refine((data) => new Date(data.timeStart) >= new Date(Date.now()), {
  message: t('EventMustStartInFuture'),
  path: ['timeStart']
}).refine((data) => new Date(data.timeEnd) <= new Date(new Date(data.timeStart).setDate(new Date(data.timeStart).getDate() + 1)), {
  message: t('EventMustEndBeforeADay'),
  path: ['timeEnd']
});

const form = ref({
  name: '',
  place: '',
  description: '',
  timeStart: '',
  timeEnd: '',
  capacity: 1,
  category: CategoryEnum.Sports,
  latitude: -999,
  longitude: -999
});

const parseableCapacity = computed({
  get() {
    return String(form.value.capacity);
  },
  set(val: string) {
    form.value.capacity = Number(val);
  }
});

const router = useRouter();

const image = shallowRef<string>();

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});


/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createE() : Promise<void> {

  form.value.timeStart = form.value.timeStart + ':00.000Z';
  form.value.timeEnd = form.value.timeEnd + ':00.000Z';
  await validate();

  if (isValid.value) {

    await useEvent(EventApi, 'eventCreateCreate')(() => ({
      eventCreate: {
        description: form.value.description,
        place: form.value.place,
        capacity: form.value.capacity,
        name: form.value.name,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        timeEnd: form.value.timeEnd,
        timeStart: form.value.timeStart,
        category: form.value.category,
        imageB64: image?.value ?? '',
        ocialClient: 0
      }
    }));

    await router.push('/');
  } else {
    scrolltoError('.p-invalid', 24);
  }
};

/**
 * Pasar imagen del input a base64
 */
async function handleImage(event: Event): Promise<void> {
  image.value = await toBase64(event);
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
    form.value.latitude = e.latlng.lat;
    form.value.longitude = e.latlng.lng;
  });
});
</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}

.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}
</style>
