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
          <div
            v-if="subsEnum[2] == currentSubscription.typeSubscription">
            <Checkbox v-model="form.highlighted ">
              {{ $t('highlight') }}
            </Checkbox>
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
import destr from 'destr';
import { icon } from 'leaflet';
import { CategoryEnum , EventApi, TypeSubscriptionEnum, SubscriptionApi } from '@/api';
import Azul from '@/assets/pin/Pin_Azul.png';
import { useApi } from '@/composables/apis';
import { useValidation } from '@/composables/use-validation';
import { toBase64 } from '@/utils/data-manipulation';
import { useToast } from '@/composables/use-toast';
import { isNil, isObj } from '@/utils/validation';

const { t } = useI18n();

const { data : currentSubscription } = await useApi(SubscriptionApi, 'subscriptionRetrieve')();
const subsEnum = [
  TypeSubscriptionEnum.Free,
  TypeSubscriptionEnum.Basic,
  TypeSubscriptionEnum.Pro
];


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
  longitude: -999,
  highlighted: false
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
    const { response } = await useApi(EventApi, 'eventCreateCreate')(() => ({
      eventCreate: {
        imageB64: image?.value ?? '',
        name: form.value.name,
        place: form.value.place,
        description: form.value.description,
        timeStart: form.value.timeStart,
        timeEnd: form.value.timeEnd,
        capacity: form.value.capacity,
        category: form.value.category,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        highlighted: form.value.highlighted
      }
    }));

    if (
      !isNil(response.value?.status) &&
      response.value.status >= 400 &&
      isObj(response.value?.request) &&
      'response' in response.value.request
    ) {
      const casted = destr<ErrorPayload>(response.value.request.response);

      if ('error' in casted) {
        useToast(casted.error, 'error');
      } else {
        const { t } = useI18n();

        useToast(t('ErrorDesconocido'), 'error');
      }
    } else {
      await router.push('/');
    }
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

  const customIcon = icon({
    iconUrl: Azul,
    iconSize:  [22, 30],
    iconAnchor: [11, 30]
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', (e: L.LeafletMouseEvent) => {
    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker(e.latlng, { icon: customIcon }).addTo(map);
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
