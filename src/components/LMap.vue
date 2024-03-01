<template>
  <div id="mapContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Azul from '@/assets/pin/Pin_Azul.png'; 
import Dot from '@/assets/pin/dot.png'; 

interface MapMarker {
  description: string;
  latitud: number;
  longitud: number;
  category: string;
}

const props = defineProps<{ markers: Array<MapMarker> }>();
let map: ReturnType<typeof L> ;
let userLocationMarker: ReturnType<typeof L.marker>;
  let watchId: number | null = null;

onMounted(() => {
  console.log(props.markers);
  createMapLayer();
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
});


const createMapLayer = (): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map = L.map('mapContainer').setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const userIcon = L.icon({
          iconUrl: Dot,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        userLocationMarker = L.marker([latitude, longitude], { icon: userIcon }).addTo(map);
        userLocationMarker.bindPopup("Tu ubicación");
        if (props.markers.length > 0) {
            setMarkers();
            }
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error.message);
      }
    );

  } else {
    console.error('Geolocalización no es soportada por tu navegador');
  }
};

const setMarkers = (): void => {
  props.markers.forEach((marker) => {
      const customIcon = L.icon({
      iconUrl: Azul,
      iconSize: [25, 30], 
      iconAnchor: [16, 16],});
      const markerInstance = L.marker([marker.latitud, marker.longitud], { icon: customIcon }).addTo(map)
      .bindPopup("Evento:" + marker.description);

      markerInstance.on('click', () => {
      markerInstance.getElement()?.classList.add('scaled');
      setTimeout(() => {
        markerInstance.getElement()?.classList.remove('scaled');
        }, 300);
      });
    return L.marker([marker.latitud, marker.longitud], { icon: customIcon }).addTo(map)
      .bindPopup("Evento:"+marker.description);
  });
};
</script>

<style scoped>
  #mapContainer {
    width: 95%;
    height: 90vh;
    margin: 2% 2%;
  }
  .scaled {
  transform: scale(0.9);
  transition: transform 0.3s ease;
  }
  </style>
