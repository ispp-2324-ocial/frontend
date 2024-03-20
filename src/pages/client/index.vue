<template>
  <div>
    <div
      style="justify-content: center; display: flex; margin-top: 3vh;"
      @click="router.push('/client/createEvent')">
      <Boton type="rounded-blue">
        <div>
          <p>
            {{ $t('creaEvento') }}
          </p>
        </div>
      </Boton>
    </div>

    <div>
      <Title>
        {{ $t('tusEventos') }}
      </Title>
      <ul
        style="list-style-type:none;">
        <li
          v-for="(item, index) in tempEvents"
          :key="index">
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
                    {{ item.name }}
                  </p>
                </div>
                <p class="tiempo">
                  {{ $t('fecha', {date: item.date, hour: item.hour } ) }}
                </p>
                <p class="lugar">
                  {{ $t('lugar', {place: item.place} ) }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
const place1 = 'Parque del Alamillo';
const tempEvents = [
  {
    name: 'Yoga Outdoor',
    place: place1,
    date: '16/03/24',
    hour: '16:00',
    category: 'Category.SPORTS',
    image: '@/assets/images/temp/yoga.png'
  },
  {
    name: 'Competición de calistenia',
    place: place1,
    date: '24/03/24',
    hour: '17:30',
    category: 'Category.SPORTS',
    image: '@/assets/images/temp/barras.png'
  }, {
    name: 'In the Park',
    place: place1,
    date: '30/03/24',
    hour: '11:00',
    category: 'Category.MUSIC',
    image: '@/assets/images/temp/inthepark.png'
  }
];

</script>
<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

const router = useRouter();
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
