<template>
  <div
    ref="mapContainer"
    class="mapContainer" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, icon, marker, tileLayer} from 'leaflet';
import { useI18n } from 'vue-i18n';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';
import Dot from '@/assets/pin/dot.png';
import { useToast } from '@/composables/use-toast';
import { isNumber } from '@/utils/validation';

const props = defineProps<{ markers: MapMarker[] }>();
const { t } = useI18n();
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© OpenStreetMap contributors';

interface MapMarker {
  description: string;
  latitud: number;
  longitud: number;
  category: string;
}

const mapContainer = ref<HTMLDivElement>();
let mapInstance: ReturnType<typeof map> | undefined;
let watchId: number | undefined;

const categoryIconMap : { [key: string]: string } = {
  'Música': Azul,
  'Deporte': Verde,
  'Ocio': Rojo
};

const userIcon = icon({
  iconUrl: Dot,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

onBeforeUnmount(() => {
  if (isNumber(watchId)) {
    navigator.geolocation.clearWatch(watchId);
  }

  disposeMap();
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
        .bindPopup(t('Evento')+`: ${mapMarker.description}`);
    }
  }
};

/**
 * Crea la instancia de Leaflet e inicia la geolocalización
 */
function createMapLayer(): void {
  if (mapContainer.value) {
    mapInstance = map(mapContainer.value);
    tileLayer(TILE_LAYER_URL, {
      attribution: ATTRIBUTION
    }).addTo(mapInstance);
    /**
     * Ubicación de sevilla
     */
    mapInstance.setView([37.3896, -5.9823], 13);
  }

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        mapInstance!.setView([latitude, longitude], 15);

        const userLocationMarker = marker([latitude, longitude], { icon: userIcon }).addTo(mapInstance!);

        userLocationMarker.bindPopup(t('Tu ubicación'));

        if (props.markers.length > 0) {
          setMarkers();
        }
      },
      (error) => {
        useToast(`${t('Error al obtener la ubicación')}: ${error.message}`, 'error');
      },
      { enableHighAccuracy: true }
    );

  } else {
    useToast(t('La geolocalización no es soportada por tu navegador'), 'error');
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
