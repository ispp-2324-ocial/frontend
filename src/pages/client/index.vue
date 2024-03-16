<template>
  <div>
    <div
      style="justify-content: center; display: flex; margin-top: 10%;"
      @click="router.push('/client/createEvent')">
      <Boton type="rounded-blue">
        <div>
          <p>
            {{ $t('creaEvento') }}
          </p>
        </div>
      </Boton>
    </div>

    <div style="margin-top: 7%;">
      <Title>
        {{ $t('tusEventos') }}
      </Title>
      <ul
        style="list-style-type:none;">
        <li
          v-for="event in eventList"
          :key="event.id">
          <div
            class="row mr-3"
            style="border-top: solid 1px #b0b0b0; padding: 0%;"
            @click="router.push('/client/events')">
            <div style=" cursor: pointer;margin:auto; text-align: center;display: flex; align-items: center; justify-content: left;">
              <img
                alt="Event image"
                src="@/assets/images/temp/yoga.png"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px;" />
              <div
                class="ml-3"
                style="text-align: left; width: 70%;">
                <div>
                  <p class="nombre">
                    {{ event.name }}
                  </p>
                </div>
                <p class="tiempo">
                  {{ $t('fecha', {date: event.date, hour: event.hour } ) }}
                </p>
                <p class="lugar">
                  {{ $t('lugar', {place: event.place} ) }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { EventApi } from '@/api';
import { useEvent } from '@/composables/apis';

const router = useRouter();

/**
 *TODO: pasar a eventListClientList cuando funcione el general
 */
const { data: eventList} = await useEvent(EventApi, 'eventListList')();
</script>

<style scoped>
.nombre{
  font-size: clamp(15px, 6vw, 30px);
  font-weight: bold;
  margin-bottom: 0px;
}
.tiempo{
  font-size: clamp(15px, 5vw, 20px);
  margin-top: 3px;
  margin-bottom: 0px;
}
.lugar{
  font-size: clamp(14px, 3vw, 18px);
  margin-top: 3px;
}
</style>

<style scoped>
.nombre{
  font-size: clamp(15px, 6vw, 30px);
  font-weight: bold;
  margin-bottom: 0px;
}
.tiempo{
  font-size: clamp(15px, 5vw, 20px);
  margin-top: 3px;
  margin-bottom: 0px;
}
.lugar{
  font-size: clamp(14px, 3vw, 18px);
  margin-top: 3px;
}
</style>
