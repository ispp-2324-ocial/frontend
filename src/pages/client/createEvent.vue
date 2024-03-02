<template>
  <h1>Create Event</h1>
</template>

<script setup lang="ts">

</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  background-color: #f0f0f0;
  padding: 20px;
}

.card {
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.card:hover {
  background-color: #eee;
}
</style>
