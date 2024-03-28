<template>
  <Ondas />
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
                v-if="eventDetail.image"
                alt="Event"
                :src="eventDetail.image.image"
                class="center"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px;" />
              <IMdiImageBrokenVariant
                v-else
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px;" />
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
                <b>{{ $t('StartDate:') }}</b>&nbsp;{{ $t('fecha', {date: eventDetail.timeStart?.split('T')[0], hour: eventDetail.timeStart?.split('T')[1].split('.')[0].slice(0,5)} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('EndDate:') }}</b>&nbsp;{{ $t('fecha', {date: eventDetail.timeEnd?.split('T')[0], hour: eventDetail.timeEnd?.split('T')[1].split('.')[0].slice(0,5)} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('capacidad:') }}</b>&nbsp;{{ eventDetail.capacity }}
              </p>
              <p class="elemento">
                <b>{{ $t('categoria:') }}</b>&nbsp;{{ eventDetail.category }}
              </p>
              <p class="elemento">
                <b>{{ $t('client:') }}</b>&nbsp;{{ nameClient }}
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
      v-if="auth.isLoggedIn.value && auth.isClient.value"
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
</template>


<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router/auto';
import { EventApi, UsersApi } from '@/api';
import { useApi, useEvent } from '@/composables/apis';
import { auth } from '@/store/auth';

const route = useRoute('/client/events/[id]');

const router = useRouter();

const { data: eventDetail} = await useEvent(EventApi, 'eventList')(() => ({
  'id': route.params.id
}));

const {data: ocialClient} = await useEvent(EventApi, 'eventClientRetrieve')(() => ({
  'id': route.params.id
}));

const nameClient = ocialClient.value.name;

if (auth.isLoggedIn.value) {
  const { data: loggedClient } = await useApi(UsersApi, 'usersClientGetList')();

  console.log(loggedClient.value);
  console.log(loggedClient.value[0]);
}

console.log(eventDetail.value);
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
