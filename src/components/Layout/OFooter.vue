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
          :src="Ocial_Clear" />
      </Boton>
      <Boton
        @click="router.push('/')">
        <OImg
          class="icon"
          alt="Mapa Claro"
          :src="Map_Clear" />
      </Boton>
      <Boton
        @click="router.push('/profile')">
        <OImg
          class="icon"
          alt="Human Blue"
          :src="Human" />
      </Boton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import Human from '@/assets/images/Human_Clear.png';
import Map_Clear from '@/assets/images/Map_Clear.png';
import Ocial_Clear from '@/assets/images/Ocial_Clear.png';

const router = useRouter();
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
