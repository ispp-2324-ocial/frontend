<template>
  <div class="mapContainer" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapMarker {
  description: string;
  latitud: number;
  longitud: number;
}

const props = defineProps<{ markers: Array<MapMarker> }>();
let map: ReturnType<typeof L> ;

onMounted(() => {
  console.log(props.markers);
  createMapLayer();
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});

const createMapLayer = (): void => {
  map = L.map('mapContainer').setView([37.388_63, -5.982_18], 13); // Coordenadas de Sevilla
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  if (props.markers.length > 0) {
    setMarkers();
  }
};

const setMarkers = (): void => {
  props.markers.map((marker) => {
    return L.marker([marker.latitud, marker.longitud]).addTo(map)
      .bindPopup(marker.description);
  });
};
</script>

<style scoped>
  .mapContainer {
    width: 95%;
    height: 90vh;
    margin: 2% 2%;
  }
  </style>
