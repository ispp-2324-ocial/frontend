<template>
    <div class="error-notification">
      <span class="error-text">ERROR</span>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .error-notification {
    border: 2px solid #ff0000; /* Borde rojo */
    color: #ff0000; /* Texto rojo */
    border-radius: 5px;
    padding: 5px;
    width: 100px; /* Ancho fijo */
    height: 20px; /* Altura fija */
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .error-text {
    font-size: 14px;
    font-weight: bold;
  }
  </style>
