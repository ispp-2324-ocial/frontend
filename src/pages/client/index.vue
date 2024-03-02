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
        class="ml-8 mb-1"
        style="font-size: 7vw;">
        Tus eventos
      </h1>
      <ul
        class="-ml-7"
        style="list-style-type:none;">
        <li
          v-for="(item, index) in tempEvents"
          :key="index">
          <div
            class="row mr-3"
            style="border-top: solid 1px #b0b0b0; padding: 0%;"
            @click="redirectTo('/client/events')">
            <div style=" cursor: pointer;margin:auto; text-align: center;display: flex; align-items: center; justify-content: left;">
              <!-- src se tiene que cambiar por v-bind:src="image" cuando se junte con back-->
              <img
                alt="Event image"
                src="@/assets/images/temp/yoga.png"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px; margin: 16px;" />
              <div
                class="ml-3"
                style="text-align: left; width: 70%;">
                <div>
                  <p style="font-size: clamp(15px, 6vw, 30px); font-weight: bold; margin-bottom: 0px;">
                    {{ item.name }}
                  </p>
                </div>

                <p
                  style="font-size: clamp(15px, 5vw, 20px); margin-top: 3px; margin-bottom: 0px;">
                  {{ item.date }} a las {{ item.hour }}
                </p>
                <p style="font-size: clamp(14px, 3vw, 18px); margin-top: 3px;">
                  En {{ item.place }}
                </p>
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
