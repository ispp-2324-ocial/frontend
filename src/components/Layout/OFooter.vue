<template>
  <footer
    class="footer">
    <div
      class="flex justify-center m-0"
      style="background-color: #deecff">
      <Boton
        @click="router.push('/event')">
        <OImg
          class="icon"
          alt="Logo Ocial"
          :src="Ocial_Icon" />
      </Boton>
      <Boton
        v-if="loggedClient.is_client"
        @click="router.push('/client/events/create')">
        <OImg
          class="icon"
          alt="Mapa Claro"
          :src="Create_Icon" />
      </Boton>
      <Boton
        v-else
        @click="router.push('/')">
        <OImg
          class="icon"
          alt="Mapa Claro"
          :src="Map_Icon" />
      </Boton>
      <Boton
        @click="router.push('/profile')">
        <OImg
          class="icon"
          alt="Human Blue"
          :src="Human_Icon" />
      </Boton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useApi } from '@/composables/apis';
import { UsersApi } from '@/api';
import Human_Icon from '@/assets/images/Human_Clear.png';
import Map_Icon from '@/assets/images/Map_Clear.png';
import Create_Icon from '@/assets/images/Create_Clear.png';
import Ocial_Icon from '@/assets/images/Ocial_Clear.png';

const router = useRouter();

const { data: loggedClient } = await useApi(UsersApi, 'usersMeRetrieve')();
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  transform: translateY(0%);
  z-index: 1004;
}

:deep(.icon) {
  width: 50%;
  height: auto;
  margin: auto;
  padding: 7%;
}
</style>
