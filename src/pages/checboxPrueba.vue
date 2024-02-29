<template>
   <p>  Using the custom checkbox as stand alone </p>
   <Checkbox v-model="isSelected">
    I am checked: {{ isSelected }}
   </Checkbox>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const isSelected= ref(false);
  </script>


 <style scoped>
 
 </style>