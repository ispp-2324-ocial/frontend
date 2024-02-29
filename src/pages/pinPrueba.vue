<template>
  <div class="centered-image">
    <slot />
    <Pin />
  </div>
</template>

<script setup lang="ts">
</script>


 <style scoped>
 .centered-image {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100vw;
   height: 100vh;
 }

 </style>
