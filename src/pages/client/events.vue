<template>
  <div>
    <ul
      class="-ml-7"
      style="list-style-type:none;">
      <li
        v-for="(item, index) in eventDetail"
        :key="index">
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
            <div
              class="ml-3"
              style="text-align: left; width: 100%;">
              <p style="text-align: center;font-size: clamp(15px, 7vw, 40px); font-weight: bold; justify-content: center;">
                {{ item.name }}
              </p>
              <img
                alt="Event image"
                src="@/assets/images/temp/yoga.png"
                class="center"
                style="display: block; width: 30%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px" />
              <p style="font-size: clamp(15px, 6vw, 30px); font-weight: bold">
                {{ item.event }}
              </p>
              <p style="font-size: clamp(15px, 6vw, 30px); font-weight: normal">
                <b>Lugar:</b> {{ item.place }}
              </p>
              <p style="font-size: clamp(15px, 6vw, 30px); font-weight: normal">
                <b>Fecha: </b>{{ item.date }} a las {{ item.hour }}
              </p>
              <p style="font-size: clamp(15px, 6vw, 30px); font-weight: normal">
                <b>Capacidad:</b> {{ item.capacity }}
              </p>
              <p style="font-size: clamp(15px, 6vw, 30px); font-weight: normal">
                <b>Categoría:</b> {{ item.category }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div
    class="mb-7"
    style="background-color: #deecff; width: 100%;">
    <div
      style="justify-content: center; display: flex;"
      @click="redirectTo('/client/subscription')">
      <Boton class="ocial-button">
        <div>
          <p style="color:#0e4791; font-size: 60%;">
            Comprobar suscripciones
          </p>
        </div>
      </Boton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 *
 */
function redirectTo(path: string) {
  router.push(path);
}

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
