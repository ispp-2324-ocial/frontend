<template>
  <div
    ref="mapContainer"
    class="mapContainer" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, icon, marker, tileLayer, type Marker, Popup} from 'leaflet';
import { useI18n } from 'vue-i18n';
import { usePermission } from '@vueuse/core';
import { CategoryEnum} from '@/api';
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

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '© OpenStreetMap contributors';

const mapContainer = shallowRef<HTMLDivElement>();
const mapInstance = shallowRef<ReturnType<typeof map>>();
let watchId: number | undefined;
let userMarker: Marker | undefined;
const mapMarkers: Marker[] = [];
let userLocationDetermined = false;

interface MapEvent {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  category?: CategoryEnum;
  date: string;
  hour: string;
  event: string;
  place: string;
  capacity?: number;
}
/**
 * Para asignar los iconos a la categoría
 */
function getCategoryEnum(categoryName?: string): CategoryEnum {
  if (!categoryName) {
    return CategoryEnum.NUMBER_0;
  }

  switch (categoryName.toLowerCase()) {
    case 'sports': {
      return CategoryEnum.NUMBER_0;
    }
    case 'music': {
      return CategoryEnum.NUMBER_1;
    }
    case 'markets': {
      return CategoryEnum.NUMBER_2;
    }
    case 'relax activities': {
      return CategoryEnum.NUMBER_3;
    }
    case 'live concert': {
      return CategoryEnum.NUMBER_4;
    }
    default: {
      console.error(`Categoría desconocida: ${categoryName}`);

      return CategoryEnum.NUMBER_0;
    }
  }
}

const categoryIconMap: { [key in CategoryEnum]: string } = {
  [CategoryEnum.NUMBER_0]: Azul,
  [CategoryEnum.NUMBER_1]: Verde,
  [CategoryEnum.NUMBER_2]: Rojo,
  [CategoryEnum.NUMBER_3]: Morado,
  [CategoryEnum.NUMBER_4]: Amarillo
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
function setMarkers(markers: MapEvent[]): void {
  if (mapInstance.value) {
    for (const event of markers) {
      const category = getCategoryEnum(event.category?.toString());
      const customIconUrl = categoryIconMap[category] ?? Azul;
      const customIcon = icon({
        iconUrl: customIconUrl,
        iconSize: [22, 30],
        iconAnchor: [11, 6]
      });
      const eventHour = event.hour.split(':').slice(0, 2).join(':'); // Obtener solo la parte de la hora y los minutos
      const popupContent = document.createElement('div');

      popupContent.innerHTML = `
        <strong>${t('Evento')}:</strong> ${event.name}<br>
        <strong>${t('Lugar')}:</strong> ${event.place}<br>
        <strong>${t('Fecha')}:</strong> ${event.date}<br>
        <strong>${t('Hora')}:</strong> ${eventHour}<br>
        <strong>${t('Capacidad')}:</strong> ${event.capacity}<br>
        <a href="/detalles/${event.id}">${t('Ver detalles')}</a>
      `;

      // Crear un objeto Popup y asociarlo al marcador
      const popup = new Popup().setContent(popupContent);

      marker([event.latitude, event.longitude], { icon: customIcon })
        .addTo(mapInstance.value)
        .bindPopup(popup);
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
watch([mapInstance, ():typeof props.markers => props.markers], ([, newMarkers]) => {
  disposeMarkers();
  setMarkers(newMarkers);
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
  width: 100%;
  height: 90vh;
}
</style>
