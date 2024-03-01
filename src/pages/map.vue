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
  }
];
</script>
