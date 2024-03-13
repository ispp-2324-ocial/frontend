<template>
  <Ondas />
  <div style="margin-top: 10%;">
    <ul style="list-style-type:none; margin-top: 1vh;">
      <li
        v-for="(item, index) in carProfile"
        :key="index">
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
            <div
              class="ml-3"
              style="text-align: left; width: 100%;">
              <Title>
                {{ item.username }}
              </Title>
              <img
                alt="Event image"
                src="@/assets/images/temp/alamillo.png"
                class="center"
                style="margin-bottom: 7% ;display: block; width: 40%; border-radius: 50%; max-width: 220px; max-height: 220px; min-width: 90px; min-height: 90px" />
              <p class="elemento">
                <b>{{ item.name }}</b>
              </p>
              <p class="elemento">
                <b>{{ $t('email:') }}</b> {{ item.email }}
              </p>
              <p class="elemento">
                <b>{{ $t('localidad:' ) }}</b> {{ item.city }}
              </p>
              <p class="elemento">
                <b>{{ $t('organiza:' ) }}</b> {{ item.tipoCliente }}
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
      @click="router.push('/client/subscription')">
      <Boton
        type="rounded-blue"
        class="ocial-button"
        style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
        <div>
          <p>
            {{ $t('comprobarSuscripcion') }}
          </p>
        </div>
      </Boton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

const router = useRouter();

const carProfile = [
  {
    name: 'Marta García Gómez',
    username: 'Alamillo Eventos',
    email: ' alamillo@local.jccm.es',
    city: 'Sevilla',
    tipoCliente: 'Eventos y conciertos'
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
  margin-top: 4%;
}
</style>
