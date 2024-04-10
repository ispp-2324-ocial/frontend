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
              <RoundImage
                class="center"
                :is-image="eventDetail.image"
                :alt="'Event picture'"
                :src="eventDetail.image.image" />
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
                <b>{{ $t('client:') }}</b>&nbsp;{{ eventDetail.ocialClient.name }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div
      class="mb-7"
      style="width: 100%;">
      <!-- TODO: Reemplazar -->
      <div
        v-if="false"
        style="justify-content: center; display: flex;"
        @click="router.push(`/client/events/${route.params.id}`)">
        <Boton
          type="rounded-blue"
          style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
          <div>
            <p>
              {{ $t('editarEvento') }}
            </p>
          </div>
        </Boton>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { EventApi, CategoryEnum } from '@/api';
import { useEvent } from '@/composables/apis';
import { auth } from '@/store/auth';

const route = useRoute('/client/events/[id]/');

const router = useRouter();

const { t } = useI18n();

const { data: eventDetail } = await useEvent(EventApi, 'eventRetrieve')(() => ({
  'id': Number(route.params.id)
}));

/**
 * Cuando se haga editar evento, en el v-if del boton de editar evento hay que cambiar el false por comprobar que el cliente logueado sea el que creó ese evento
 */
if (auth.isLoggedIn.value) {
  //Const { data: loggedClient } = await useApi(UsersApi, 'usersClientGetList')();
}

const cateEnum = [CategoryEnum.Sports, CategoryEnum.Music, CategoryEnum.Markets, CategoryEnum.RelaxActivities, CategoryEnum.LiveConcert];

const categorias = computed(() =>
  [t('categoryDeporte'),
   t('categoryMusica'),
   t('categoryMercado'),
   t('categoryRelax'),
   t('categoryConcierto')]);

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
