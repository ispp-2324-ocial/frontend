<template>
  <Ondas />
  <div>
    <ul style="list-style-type:none; margin-top: 10%;">
      <li>
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center; display: flex; align-items: center; justify-content: center;">
            <div
              class="ml-3"
              style=" text-align: center; width: 100%;">
              <Title>
                {{ eventDetail.name }}
              </Title>
              <div class="flex justify-center items-center pt-12">
                <OImg
                  v-if="eventDetail.image"
                  alt="Event"
                  :src="eventDetail.image.image"
                  class="center"
                  style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px" />
              </div>
              <p
                class="elemento"
                style="margin-top: 7%;">
                <b>{{ eventDetail.description }}</b>
              </p>
              <p
                class="elemento"
                style="margin-top: 4%;">
                <b>{{ $t('lugar:') }}</b>&nbsp;{{ $t('lugar', {place: eventDetail.place} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('StartDate:') }}</b>&nbsp;{{ $t('fecha', {date: eventDetail.timeStart?.split('T')[0], hour: eventDetail.timeStart?.split('T')[1].split('.')[0].slice(0,5)} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('EndDate:') }}</b>&nbsp;{{ $t('fecha', {date: eventDetail.timeEnd?.split('T')[0], hour: eventDetail.timeEnd?.split('T')[1].split('.')[0].slice(0,5)} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('capacidad:') }}</b>&nbsp;{{ eventDetail.capacity }}
              </p>
              <p class="elemento">
                <b>{{ $t('categoria:') }} </b> <span
                  v-for="(category,indice) in cateEnum"
                  :key="category">
                  <span v-if="category == eventDetail.category">
                    {{ categorias[indice] }}
                  </span>
                </span>
              </p>
              <p class="elemento">
                <b>{{ $t('client:') }}</b>&nbsp;{{ eventDetail.creator.name }}
              </p>
              <p>
                <Like :event="eventDetail" />
              </p>
              <Boton
                style="margin-bottom: 1rem"
                type="share">
                <div @click="startShare()">
                  {{ $t('compartirEvento') }}
                </div>
              </Boton>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { EventApi, CategoryEnum } from '@/api';
import { useEvent } from '@/composables/apis';

const route = useRoute('/user/events/[id]/');

const { t } = useI18n();

const { data: eventDetail } = await useEvent(EventApi, 'eventRetrieve')(() => ({
  'id': Number(route.params.id)
}));

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

const shareData = {
  title:'Evento',
  url: route.hash + '#/details/' + route.params.id //Lleva a la vista de detalles de evento del mapa
};

/**
 * Función para compartir evento
 */
async function startShare() : Promise<void> {
  await navigator.share(
    shareData
  );
}
</script>


<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.elemento {
  font-size: clamp(15px, 5.5vw, 30px);
  font-weight: normal;
  width: 90%;
  margin-left: 4vw;
  margin-bottom: 1vh;
}
</style>
