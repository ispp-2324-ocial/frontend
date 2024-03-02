<template>
  <div
    class="mb-7"
    style="background-color: #deecff;">
    <div
      style="justify-content: center; display: flex;"
      @click="redirectTo('/client/createEvent')">
      <Boton class="ocial-button">
        <div>
          <p style="color:#0e4791; font-size: 60%;">
            Crear nuevo evento
          </p>
        </div>
      </Boton>
    </div>

    <div>
      <h1
        class="ml-8"
        style="font-size: 24px;">
        Tus eventos
      </h1>
      <ul
        class="-ml-7"
        style="list-style-type:none;">
        <li
          v-for="(item, index) in tempEvents"
          :key="index">
          <div class="row mb-7 mr-3">
            <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: left;">
              <img
                alt="Event image"
                src="@/assets/images/temp/yoga.png"
                style="display: block; width: 30%; border-radius: 50%;" />
              <div
                class="ml-3"
                style="text-align: left; width: 70%;">
                <p style="font-size: 6vw; font-weight: bold">
                  {{ item.name }}
                </p>
                <p
                  style="font-size: 5vw;">
                  {{ item.date }} a las {{ item.hour }}
                </p>
                <p>En {{ item.place }}</p>
              </div>
            </div>
            <div />
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
    event: 'Clase de yoga al aire libre.',
    date: '2024-03-16',
    hour: '16:00:00',
    capacity: 60,
    category: 'Category.SPORTS',
    latitude: 37.418_594,
    longitude: -5.996_096,
    ocialClient: 'Alamillo',
    image: '@/assets/images/temp/yoga.png'
  },
  {
    name: 'Competición de calistenia',
    place: place1,
    event: 'Competición deportiva de calistenia en el parque de barras del Alamillo. Se requiere de inscripción previa.',
    date: '2024-03-24',
    hour: '17:30:00',
    capacity: 40,
    category: 'Category.SPORTS',
    latitude: 37.415_472_529_948_86,
    longitude: -5.998_031_476_148_601,
    ocialClient: 'Alamillo',
    image: '@/assets/images/temp/barras.png'
  }, {
    name: 'In the Park',
    place: place1,
    event: 'Conciertos al aire libre.',
    date: '2024-03-30',
    hour: '11:00:00',
    capacity: 800,
    category: 'Category.MUSIC',
    latitude: 37.418_251_778_866_25,
    longitude: -5.996_513_552_310_005,
    ocialClient: 'Alamillo',
    image: '@/assets/images/temp/inthepark.png'
  }
];

</script>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 *
 */
function redirectTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
.card {
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.card:hover {
  background-color: #eee;
}
.ocial-button {
  text-transform: uppercase;
  background: #aacfff;
  width: 80%;
  border: 2px solid #3e80d7;
  border-radius: 20px;
  font-size: 200%;
  font-weight: bold;
  margin: auto;
  text-align: center;
  justify-content: center;
}
</style>
