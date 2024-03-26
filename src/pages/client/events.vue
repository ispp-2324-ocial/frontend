<template>
  <Ondas />
  <div v-if="auth.isLoggedIn.value && auth.isClient.value">
    <div>
      <ul style="list-style-type:none; margin-top: 10%;">
        <li>
          <div class="row mb-7 mr-3">
            <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
              <div
                class="ml-3"
                style=" text-align: left; width: 100%;">
                <Title>
                  {{ eventDetail.name }}
                </Title>
                <img
                  alt="Event"
                  src="@/assets/images/temp/yoga.png"
                  class="center"
                  style="display: block; width: 40%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px" />
                <p
                  class="elemento"
                  style="margin-top: 7%;">
                  <b>{{ eventDetail.event }}</b>
                </p>
                <p
                  class="elemento"
                  style="margin-top: 4%;">
                  <b>{{ $t('lugar:') }}</b>&nbsp;{{ $t('lugar', {place: eventDetail.place} ) }}
                </p>
                <p class="elemento">
                  <b>{{ $t('fecha:') }}</b>&nbsp;{{ $t('fecha', {date: eventDetail.date, hour: eventDetail.hour } ) }}
                </p>
                <p class="elemento">
                  <b>{{ $t('capacidad:') }}</b>&nbsp;{{ eventDetail.capacity }}
                </p>
                <p class="elemento">
                  <b>{{ $t('categoria:') }}</b>&nbsp;{{ eventDetail.category }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="mb-7"
      style="width: 100%;">
      <div
        style="justify-content: center; display: flex;"
        @click="router.push('/client/editEvent')">
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
import { useRouter } from 'vue-router/auto';
import { EventApi } from '@/api';
import { useEvent } from '@/composables/apis';
import { auth } from '@/store/auth';

const router = useRouter();

/**
 *TODO: pasar a eventListClientList cuando funcione el general
 */
const { data: eventList } = await useEvent(EventApi, 'eventListList')();

const eventDetail = eventList.value[0];

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
