<template>
  <Ondas />
  <div v-if="auth.user.value?.username == eventDetail.creator.username">
    <Title style="margin-top: 10%;">
      {{ $t('editarEvento') }}
    </Title>
    <div style="margin-top: 1%; justify-content: center; display: flex;">
      <form @submit.prevent="()=>{}">
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
        <select
          v-model="form.category"
          class="input-box">
          <option
            v-for="(category,indice) in cateEnum"
            :key="category"
            :value="category">
            {{ categorias[indice] }}
          </option>
        </select>
        <div class="error">
          {{ getError('category') }}
        </div>
        <div
          v-if="subsEnum[2] == currentSubscription.typeSubscription">
          <Checkbox v-model="form.highlighted ">
            {{ $t('highlight') }}
          </Checkbox>
        </div>
        <div
          id="map"
          style="height: 300px;" />
        <div />
        <div class="error">
          {{ getError('latitude') }}
        </div>
      </form>
    </div>
    <Boton
      type="rounded-blue"
      style="margin-top: 10%;display: flex;"
      @click="editE()">
      {{ $t('guardarCambios') }}
    </Boton>
  </div>
  <div v-else>
    <div class="texto">
      <Title>
        {{ t('noEsTuEvento') }}
      </Title>
    </div>
    <div class="texto">
      <p style="margin-top: -8vh; color: red; font-size: 15vw; font-weight: bolder;">
        {{ t('crossIcon') }}
      </p>
    </div>
    <div
      style="justify-content: center; display: flex;"
      @click="redirect()">
      <Boton
        type="rounded-blue"
        class="ocial-button"
        style="width: 70%; padding-top: 1vh; padding-bottom: 1vh;">
        <div>
          <p>
            {{ $t('volver') }}
          </p>
        </div>
      </Boton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as L from 'leaflet';
import { useRoute, useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import destr from 'destr';
import { auth } from '@/store/auth';
import { CategoryEnum , EventApi, TypeSubscriptionEnum, SubscriptionApi } from '@/api';
import { useEvent, useApi } from '@/composables/apis';
import { useValidation } from '@/composables/use-validation';
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
  longitude: z.number().min(-400, t('mapRequired')),
  highlighted: z.boolean()
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

const router = useRouter();

const route = useRoute('/client/events/[id]/edit');

const { data: eventDetail } = await useEvent(EventApi, 'eventRetrieve')(() => ({
  'id': Number(route.params.id)
}));

/**
 * Se intenta rellenar estos campos con los obtenidos en eventDetail para sincronizar
 *     los datos que salen en la vista con los que se quieren guardar en la base de datos
 */
const form = ref({
  name: eventDetail.value.name,
  place: eventDetail.value.place,
  description: eventDetail.value.description,
  timeStart: eventDetail.value.timeStart.slice(0,16),
  timeEnd: eventDetail.value.timeEnd.slice(0,16),
  capacity: eventDetail.value.capacity,
  category: eventDetail.value.category,
  longitude: eventDetail.value.longitude,
  latitude: eventDetail.value.latitude,
  highlighted: eventDetail.value.highlighted
});

const parseableCapacity = computed({
  get() {
    return String(form.value.capacity);
  },
  set(val: string) {
    form.value.capacity = Number(val);
  }
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

/**
 * TODO: Refactorizar esto en un middleware apropiado. - ferferga (assigned: @horgarler)
 * Esta función sirve para redirigir, ya que los otros métodos
 * interfieren en una redirección base.
 */
async function redirect() : Promise<void> {
  await router.replace('/event');
  window.location.reload();
}

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function editE() : Promise<void> {

  form.value.timeStart = form.value.timeStart + ':00.000Z';
  form.value.timeEnd = form.value.timeEnd + ':00.000Z';
  await validate();

  if (isValid.value) {
    const { response } = await useEvent(EventApi, 'eventPartialUpdate')(() => ({
      id: Number(route.params.id),
      patchedEventCreate: {
        name: form.value.name,
        place: form.value.place,
        description: form.value.description,
        timeStart: form.value.timeStart,
        timeEnd : form.value.timeEnd,
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

const cateEnum = [
  CategoryEnum.Sports,
  CategoryEnum.Music,
  CategoryEnum.Markets,
  CategoryEnum.RelaxActivities,
  CategoryEnum.LiveConcert
];

const categorias = computed(() =>
  [t('categoryDeporte'),
   t('categoryMusica'),
   t('categoryMercado'),
   t('categoryRelax'),
   t('categoryConcierto')]);

const placeholders = computed(() =>
  [t('placeholderNombreEvento'),
   t('placeholderLugar'),
   t('placeholderDescripcion'),
   t('placeholderCapacidad')]);

let map: L.Map;
let marker: L.Marker | undefined;

onMounted(() => {
  map = L.map('map').setView([37.393, -5.984], 12); // Initial map center (Sevilla)

  marker = L.marker([eventDetail.value.latitude,eventDetail.value.longitude]).addTo(map);

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
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}

.texto {
  margin: 15% 10% 10% 10%;
  display:flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
