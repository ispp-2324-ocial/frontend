<template>
  <LMap :markers="markers"/>
</template>

<script setup lang="ts">
  const markers = [
    {
      description: 'Concierto Nuevo Berlin',
      latitud: 37.40869627313789,
      longitud: -5.99000733820976,
      category: 'Música',
    }
  ];
</script>
