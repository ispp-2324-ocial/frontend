<template>
  <div>
    <ul style="list-style-type:none; margin-top: 1vh;">
      <li
        v-for="(item, index) in eventDetail"
        :key="index">
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
            <div
              class="ml-3"
              style="text-align: left; width: 100%;">
              <Title>
                {{ item.name }}
              </Title>
              <img
                alt="Event image"
                src="@/assets/images/temp/yoga.png"
                class="center"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px" />
              <p class="elemento">
                <b>{{ item.event }}</b>
              </p>
              <p class="elemento">
                <b>{{ $t('lugar:') }}</b>&nbsp;{{ $t('lugar', {place: item.place} ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('fecha:') }}</b>&nbsp;{{ $t('fecha', {date: item.date, hour: item.hour } ) }}
              </p>
              <p class="elemento">
                <b>{{ $t('capacidad:') }}</b>&nbsp;{{ item.capacity }}
              </p>
              <p class="elemento">
                <b>{{ $t('categoria:') }}</b>&nbsp;{{ item.category }}
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
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

const router = useRouter();

const eventDetail = [
  {
    name: 'Yoga Outdoor',
    place: 'Parque del Alamillo',
    event: 'Clase de yoga al aire libre.',
    date: '16/03/24',
    hour: '16:00',
    capacity: 60,
    category: 'Deporte',
    image: '@/assets/images/temp/yoga.png'
  }
];

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
