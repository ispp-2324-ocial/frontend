<template>
  <div class="pin-container"
       @mouseover="isHovered = true"
       @mouseout="isHovered = false"
       @click="changeImage">
    <img :src="pinUrl" alt="Pin" :style="{ transform: isHovered ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.3s ease', width: '75px', height: '100px' }">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pinUrls = ['src/assets/pin/Pin_Azul.png', 
                'src/assets/pin/Pin_Verde.png', 
                'src/assets/pin/Pin_Amarillo.png', 
                'src/assets/pin/Pin_Marron.png', 
                'src/assets/pin/Pin_Morado.png', 
                'src/assets/pin/Pin_Rojo.png'];
const pinUrlIndex = ref(0);
const pinUrl = ref(pinUrls[pinUrlIndex.value]);

const changeImage = () => {
  pinUrlIndex.value = (pinUrlIndex.value + 1) % pinUrls.length;
  pinUrl.value = pinUrls[pinUrlIndex.value];
};

let isHovered = ref(false);
</script>

<style scoped>
.pin-container {
  width: 50vw; 
  height: 50vh;
  overflow: hidden;
}
</style>

  