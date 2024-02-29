<template>
  <button
    class="checkbox-class"
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
  background-color: var(--o-color-theme);
  color: #aacfff;
  }
</style>
