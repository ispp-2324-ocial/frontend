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

import { watch , ref } from 'vue';

const isHovered = ref(true);

/**
 * Gestiona clicado
 */
function handleClick(params:type) {
  console.log('Button clicked!');
}

watch(isHovered, ()=> {
  console.log('isHovered', isHovered.value);
});


</script>

<style scoped>
  .scaled {
    cursor: pointer;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }

  /**
 * Color
 */
 .checkbox-class {
  background-color: #0e4781;
  color: #aacfff;
  }
</style>
