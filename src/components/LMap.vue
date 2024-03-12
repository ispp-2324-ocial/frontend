<template>
  <div
    ref="mapContainer"
    class="mapContainer" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, icon, marker, tileLayer, type Marker} from 'leaflet';
import { useI18n } from 'vue-i18n';
import { usePermission } from '@vueuse/core';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';
import Dot from '@/assets/pin/dot.png';
import { useToast } from '@/composables/use-toast';
import { isNil, isNumber } from '@/utils/validation';

const props = defineProps<{ markers: MapMarker[] }>();

const locationAccess = usePermission('geolocation');

const { t } = useI18n();
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© OpenStreetMap contributors';

interface MapMarker {
  description: string;
  latitud: number;
  longitud: number;
  category: string;
}

const mapContainer = shallowRef<HTMLDivElement>();
const mapInstance = shallowRef<ReturnType<typeof map>>();
let watchId: number | undefined;
let userMarker: Marker | undefined;
const mapMarkers: Marker[] = [];
let userLocationDetermined = false;
let mapInitialized = false;

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
  disposeMarkers();
});

/**
 * Coloca los marcadores en el mapa
 */
function setMarkers(): void {
  if (mapInstance.value) {
    for (const mapMarker of props.markers) {
      const customIcon = icon({
        iconUrl: categoryIconMap[mapMarker.category] || Dot,
        iconSize: [22, 30],
        iconAnchor: [11, 6]
      });

      mapMarkers.push(
        marker([mapMarker.latitud, mapMarker.longitud], { icon: customIcon })
          .addTo(mapInstance.value)
          .bindPopup(`${t('Evento')}: ${mapMarker.description}`)
      );
    }
  }
};

/**
 * Elimina los marcadores del mapa
 */
function disposeMarkers(): void {
  for (const marker of mapMarkers) {
    marker.remove();
  }

  mapMarkers.length = 0;
}

/**
 * Crea la instancia de Leaflet e inicia la geolocalización
 */
function createMapLayer(): void {
  if (!mapInitialized && mapContainer.value) {
    mapInstance.value = map(mapContainer.value);

    tileLayer(TILE_LAYER_URL, {
      attribution: ATTRIBUTION
    }).addTo(mapInstance.value);
    /**
     * Ubicación de sevilla
     */
    mapInstance.value.setView([37.3896, -5.9823], 5);

    mapInitialized = true;
  }

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!isNil(userMarker)) {
          userMarker.remove();
          userMarker = undefined;
        }

        if (!userLocationDetermined) {
          mapInstance.value!.setView([latitude, longitude], 15);
          userLocationDetermined = true;
        }

        userMarker = marker([latitude, longitude], { icon: userIcon }).addTo(mapInstance.value!);

        userMarker.bindPopup(t('Tu ubicación'));
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
  if (mapInstance.value) {
    mapInstance.value.remove();
    mapInstance.value = undefined;
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

/**
 * Este watch trackea los markers si cambian y se actualizan si es así.
 */
watch([mapInstance, ():typeof props.markers => props.markers], () => {
  disposeMarkers();
  setMarkers();
}, { deep: true }) ;

/**
 * Este watch trackea si el usuario ha dado permisos de ubicación y si los da resetea la vista
 * a la ubicación del usuario
 */
watch(locationAccess, () => {
  if (locationAccess.value === 'granted') {
    createMapLayer();
  } else if (locationAccess.value === 'denied' || locationAccess.value === 'prompt') {
    if (!isNil(userMarker)) {
      userMarker.remove();
      userMarker = undefined;
    }
  }
});
</script>

<style scoped>
.mapContainer {
  width: 95%;
  height: 90vh;
  margin: 2% 2%;
}
</style>
