<template>
  <div
    class="pin-container"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    @click="changeImage">
    <img
      :src="pinImgs[pinImgsIndex]"
      alt="Pin"
      class="pin-image"
      :class="{ 'scaled': isHovered }" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Amarillo from '@/assets/pin/Pin_Amarillo.png';
import Marron from '@/assets/pin/Pin_Marron.png';
import Morado from '@/assets/pin/Pin_Morado.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';

const pinImgs = [Azul, Amarillo, Verde, Marron, Morado, Rojo];
const pinImgsIndex = ref(0);

/**
 * Cambia la imagen del Pin de forma cíclica, basándose en
 * el índice de la imagen
 */
function changeImage(): void {
  pinImgsIndex.value = (pinImgsIndex.value + 1) % pinImgs.length;
};

const isHovered = ref(false);
</script>

<style scoped>
.pin-container {
  width: 50vw;
  height: 50vh;
  overflow: hidden;
}
.pin-image{
  width: 75px;
  height: 100px;
}
.scaled {
  transform: scale(0.9);
  transition: transform 0.3s ease;
}
</style>
