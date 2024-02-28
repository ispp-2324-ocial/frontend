<template>
  <div
    class="pin-container"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <button
      class="checkbox-class"
      :class="{ 'scaled': isHovered }"
      @click="handleClick">
      <CarbonFaceCool class="text-yellow text-3xl" />Texto
    </button>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  methods: {
    handleClick() {
      console.log('Button clicked!');
    }
  }
};
const isHovered = ref(true);
</script>

<style scoped>
  .scaled {
    cursor: pointer;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  </style>
