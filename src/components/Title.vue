<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<script setup lang="ts">
</script>

<style scoped>
.title{
  font-size: clamp(20px, 7vw, 40px);
  font-weight: bold;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
}
</style>
