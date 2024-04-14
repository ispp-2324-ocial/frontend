<template>
  <div>
    <div style="margin-top: 7%;">
      <Title>
        {{ $t('tusEventosFav') }}
      </Title>
      <ul
        style="list-style-type:none;">
        <li
          v-for="event in eventList"
          :key="event.id">
          <div
            class="row mr-3"
            style="border-top: solid 1px #b0b0b0; padding: 0%;"
            @click="getDetailsEvent(event.id)">
            <div style=" cursor: pointer;margin:auto; text-align: center;display: flex; align-items: center; justify-content: left;">
              <OImg
                v-if="event.image"
                alt="Event"
                :src="event.image.image"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px;" />
              <div
                class="ml-3"
                style="text-align: left; width: 70%;">
                <div>
                  <p class="nombre">
                    {{ event.name }}
                  </p>
                </div>
                <p class="tiempo inicial">
                  {{ $t('Fecha Inicio') }}: {{ parseDate(event.timeStart) }}
                </p>
                <p class="tiempo final">
                  {{ $t('Fecha Final') }}: {{ parseDate(event.timeStart) }}
                </p>
                <p class="lugar">
                  {{ $t('lugar', { place: event.place } ) }}
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
import { parseDate } from '@/utils/data-manipulation';

const router = useRouter();

const { data: eventList } = await useEvent(EventApi, 'eventListList')(() => ({
  liked: true
}));

/**
 * Go to the details of that event
 */
async function getDetailsEvent(eventId: number | undefined) : Promise<void> {
  await router.push(`/user/events/${eventId}`);
};

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
