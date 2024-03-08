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
    latitud: 37.415_474_233_257_7,
    longitud: -5.997_796_824_409_255,
    category: 'Deporte'
  },{
    description: 'Partido Fútbol Casa Félix',
    latitud: 37.358_307_457_869_76,
    longitud: -5.986_125_275_133_24,
    category: 'Ocio'
  }
];
</script>
