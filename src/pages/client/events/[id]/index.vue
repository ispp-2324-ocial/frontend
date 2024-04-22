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
                <BlurhashImage
                  :item="eventDetail.image"
                  class="center" />
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
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="mb-7"
      style="width: 100%;">
      <div v-if="auth.user.value?.username == eventDetail.creator.username">
        <div
          v-if="subsEnum[0] != currentSubscription.typeSubscription">
          <Boton
            type="rounded-blue"
            style="margin-top: 1%; display: flex;"
            @click="router.push(`/client/events/${route.params.id}/edit`)">
            <p>
              {{ $t('editarEvento') }}
            </p>
          </Boton>
        </div>
        <Boton
          type="rounded-red"
          style="margin-top: 3%; display: flex;"
          @click="deleteE()">
          {{ $t('eliminarEvento') }}
        </Boton>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { auth } from '@/store/auth';
import { EventApi, CategoryEnum, TypeSubscriptionEnum, SubscriptionApi } from '@/api';
import { useEvent, useApi } from '@/composables/apis';

const route = useRoute('/client/events/[id]/');

const { data : currentSubscription } = await useApi(SubscriptionApi, 'subscriptionRetrieve')(() => ({}));
const subsEnum = [
  TypeSubscriptionEnum.Free,
  TypeSubscriptionEnum.Basic,
  TypeSubscriptionEnum.Pro
];

const router = useRouter();

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

/**
 * Esta función elimina el evento de la vista
 */
async function deleteE() : Promise<void> {
  await useEvent(EventApi, 'eventDestroy')(() => ({
    id: Number(route.params.id)
  }));

};
</script>

<style scoped>
.center {
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
