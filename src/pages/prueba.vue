<template>
  <div class="centered-image">
    <slot />
    <BaseInput
      v-model="firstName"
      label="username"
      :validators="[(v)=>v==='Francis']" />
    <p>{{ firstName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('');
</script>

<style scoped>
.centered-image {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
