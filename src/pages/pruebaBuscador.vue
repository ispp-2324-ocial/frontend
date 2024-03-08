<template>
  <div class="centered-image">
    <BaseInput v-model="firstName" />
    <Boton class="transparente">
      <IwwaSearch />
    </Boton>
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
.transparente {
  background-color: transparent;
  border-color: transparent;
  margin-left: 0.5%;
}
</style>
