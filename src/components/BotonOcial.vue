<template>
  <button
    class="checkbox-class ocial-button"
    :class="{ 'scaled': isHovered }"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <slot />
  </button>
</template>

<script setup lang = 'ts'>
import { ref } from 'vue';

const isHovered = ref(false);
</script>

<style scoped>
  .scaled {
    cursor: pointer;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }

 .checkbox-class {
  height: auto;
  background-color: var(--o-color-theme);
  color: #000;
  }
.ocial-button {
  text-transform: uppercase;
  background: #aacfff;
  border: 2px solid #3e80d7;
  color: #0e4791;
  border-radius: 15px;
  font-size: clamp(20px,6vw,30px);
  font-weight: bold;
  margin: auto;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
