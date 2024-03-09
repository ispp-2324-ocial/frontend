<template>
  <div
    class="checkbox-container"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <input
      v-model="value"
      type="checkbox"
      :class="{ 'scaled': isHovered }" />
    <span>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = defineModel<boolean>();

const isHovered = ref(false);
</script>

<style scoped>
.scaled {
  transform: scale(0.9);
  transition: transform 0.3s ease;
  cursor: pointer;
}
</style>
