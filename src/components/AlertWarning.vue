<template>
  <div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { notify } from './use-toast'; 


onMounted(() => {
  notify('warning'); 
});
</script>