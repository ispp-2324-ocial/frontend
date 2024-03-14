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
import { type CategoryEnum, EventApi } from '@/api';
import { useEvent } from '@/composables/apis';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';
import Morado from '@/assets/pin/Pin_Morado.png';
import Amarillo from '@/assets/pin/Pin_Amarillo.png';
import Dot from '@/assets/pin/dot.png';
import { useToast } from '@/composables/use-toast';
import { isNil, isNumber } from '@/utils/validation';

const props = defineProps<{ markers: MapEvent[] }>();

const locationAccess = usePermission('geolocation');
const { t } = useI18n();
const { data: eventList } = await useEvent(EventApi, 'eventListList')();

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© OpenStreetMap contributors';

const mapContainer = shallowRef<HTMLDivElement>();
const mapInstance = shallowRef<ReturnType<typeof map>>();
let watchId: number | undefined;
let userMarker: Marker | undefined;
const mapMarkers: Marker[] = [];
let userLocationDetermined = false;

interface MapEvent {
  name: string;
  latitude: number;
  longitude: number;
  category?: CategoryEnum;
}

const categoryIconMap : { [key in CategoryEnum]: string } = {
  '0': Azul,
  '1': Verde,
  '2': Rojo,
  '3': Morado,
  '4': Amarillo
};

const userIcon = icon({
  iconUrl: Dot,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

onBeforeUnmount(() => {
  disposeWatcher();
  disposeMarkers();
  disposeMap();
});

/**
 * Coloca los marcadores en el mapa
 */
function setMarkers(): void {
  if (mapInstance.value) {
    for (const event of eventList.value) {
      const customIconUrl = event.category !== undefined && categoryIconMap[event.category]
        !== undefined ? categoryIconMap[event.category] : Dot;
      const customIcon = icon({
        iconUrl: customIconUrl,
        iconSize: [22, 30],
        iconAnchor: [11, 6]
      });

      marker([event.latitude, event.longitude], { icon: customIcon })
        .addTo(mapInstance.value)
        .bindPopup(t('Evento')+`: ${event.name}`);
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
  if (!mapInstance.value && mapContainer.value) {
    mapInstance.value = map(mapContainer.value);

    tileLayer(TILE_LAYER_URL, {
      attribution: ATTRIBUTION
    }).addTo(mapInstance.value);
    /**
     * Ubicación de sevilla
     */
    mapInstance.value.setView([37.3896, -5.9823], 5);
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
 * Dispose the watch instance
 */
function disposeWatcher(): void {
  if (isNumber(watchId)) {
    navigator.geolocation.clearWatch(watchId);
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
    disposeWatcher();
    createMapLayer();

    if (mapInstance.value && userMarker) {
      userMarker.addTo(mapInstance.value);
    }
  } else if ((locationAccess.value === 'denied' || locationAccess.value === 'prompt') && userMarker) {
    if (mapInstance.value) {
      userMarker.remove();
    }

    userMarker = undefined;
  }
}, { immediate: true });
</script>

<style scoped>
.mapContainer {
  width: 95%;
  height: 90vh;
  margin: 2% 2%;
}
</style>
