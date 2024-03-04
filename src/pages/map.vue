<template>
  <LMap :markers="markers" />
</template>

<script setup lang="ts">
const markers = [
  {
    description: 'Concierto Nuevo Berlin',
    latitud: 37.408_696_273_137_89,
    longitud: -5.990_007_338_209_76,
    category: 'Música'
  },{
    description: 'Clase Yoga en Alamillo',
    latitud: 37.4154742332577,
    longitud: -5.997796824409255,
    category: 'Deporte'
  },{
    description: 'Partido Fútbol Casa Félix',
    latitud: 37.35830745786976, 
    longitud: -5.98612527513324,
    category: 'Deporte'
  }
];
</script>
