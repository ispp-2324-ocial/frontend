<template>
  <div
    ref="mapContainer"
    class="mapContainer" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, icon, marker, tileLayer} from 'leaflet';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';
import Dot from '@/assets/pin/dot.png';

interface MapMarker {
  description: string;
  latitud: number;
  longitud: number;
  category: string;
}

const props = defineProps<{ markers: MapMarker[] }>();
const mapContainer = ref<HTMLDivElement>();
let mapInstance: ReturnType<typeof map> | undefined;
let watchId: number | undefined;

const categoryIconMap : { [key: string]: string } = {
  'Música': Azul,
  'Deporte': Verde,
  'Ocio': Rojo
};

onBeforeUnmount(() => {
  disposeMap();

  if (watchId !== undefined) {
    navigator.geolocation.clearWatch(watchId);
  }
});

/**
 * Coloca los marcadores en el mapa
 */
function setMarkers(): void {
  if (mapInstance) {
    for (const mapMarker of props.markers) {
      const customIcon = icon({
        iconUrl: categoryIconMap[mapMarker.category] || Dot,
        iconSize: [22, 30],
        iconAnchor: [11, 6]
      });

      marker([mapMarker.latitud, mapMarker.longitud], { icon: customIcon })
        .addTo(mapInstance)
        .bindPopup(`Evento: ${mapMarker.description}`);
    }
  }
};

/**
 * Crea la instancia de Leaflet e inicia la geolocalización
 */
function createMapLayer(): void {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!mapInstance && mapContainer.value) {
          mapInstance = map(mapContainer.value);
          mapInstance.setView([latitude, longitude], 15);
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstance);
          console.log(mapInstance);
          console.log(mapContainer.value);

          const userIcon = icon({
            iconUrl: Dot,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          const userLocationMarker = marker([latitude, longitude], { icon: userIcon }).addTo(mapInstance);

          userLocationMarker.bindPopup('Tu ubicación');

          if (props.markers.length > 0) {
            setMarkers();
          }
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

/**
 * Dispose the map instance
 */
function disposeMap(): void {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = undefined;
  }
}

/**
 * Este watcher trackea cuando el elemento div cambia para crear el mapa (ahora mismo no cambia nunca
 * solo en mount, pero es posible que en un futuro, dependiendo del dispositivo, cambiemos el objeto DOM
 * al que haga referencia con un `<component :is="" ....>`)
 */

watch(mapContainer, () => {
  disposeMap();
  createMapLayer();
});
</script>

<style scoped>
.mapContainer {
  width: 95%;
  height: 90vh;
  margin: 2% 2%;
}
</style>
