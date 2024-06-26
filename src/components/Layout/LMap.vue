<template>
  <div
    ref="mapContainer"
    class="h-full w-full"
    v-bind="$attrs" />
  <Teleport
    v-if="selectedEvent"
    :to="`.leaflet-popup_event-${selectedEvent.id} .leaflet-popup-content-wrapper`">
    <div class="popup">
      <strong>{{ t('Evento') }}:</strong> {{ selectedEvent.name }}<br />
      <strong>{{ t('Lugar') }}:</strong> {{ selectedEvent.place }}<br />
      <template v-if="selectedEvent.timeStart">
        <strong>{{ t('Fecha Inicio') }}:</strong> {{ parseDate(selectedEvent.timeStart) }}<br />
      </template>
      <template v-if="selectedEvent.timeEnd">
        <strong>{{ t('Fecha Final') }}:</strong> {{ parseDate(selectedEvent.timeEnd) }}<br />
      </template>
      <strong>{{ t('Capacidad') }}:</strong> {{ selectedEvent.capacity }}<br />
      <RouterLink
        v-if="selectedEvent.id"
        :to="`/details/${selectedEvent.id}`">
        {{ t('Ver detalles') }}
      </RouterLink>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch, computed } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, icon, marker, tileLayer, type Marker, Popup } from 'leaflet';
import { useI18n } from 'vue-i18n';
import { usePermission } from '@vueuse/core';
import { parseDate } from '@/utils/data-manipulation';
import { CategoryEnum, type Event } from '@/api';
import Azul from '@/assets/pin/Pin_Azul.png';
import Verde from '@/assets/pin/Pin_Verde.png';
import Rojo from '@/assets/pin/Pin_Rojo.png';
import Morado from '@/assets/pin/Pin_Morado.png';
import Amarillo from '@/assets/pin/Pin_Amarillo.png';
import Dorado from '@/assets/pin/Pin_Dorado.png';
import Dot from '@/assets/pin/dot.png';
import { useToast } from '@/composables/use-toast';
import { isNil, isNumber } from '@/utils/validation';
import { windowHeight, windowWidth } from '@/store';

const props = defineProps<{ markers: Event[] }>();
const locationAccess = usePermission('geolocation');
const { t } = useI18n();

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mapContainer = shallowRef<HTMLDivElement>();
const mapInstance = shallowRef<ReturnType<typeof map>>();
const selectedEventId = shallowRef<Event['id']>();
let watchId: number | undefined;
let userMarker: Marker | undefined;
let userLocationDetermined = false;
const mapMarkers = new Map<Event['id'], Marker>();
const mapPopups = new Map<Event['id'], Popup>();

const categoryIconMap: { [key in CategoryEnum]: string } = {
  [CategoryEnum.Sports]: Azul,
  [CategoryEnum.Music]: Verde,
  [CategoryEnum.Markets]: Rojo,
  [CategoryEnum.RelaxActivities]: Morado,
  [CategoryEnum.LiveConcert]: Amarillo
};

const userIcon = icon({
  iconUrl: Dot,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});
const selectedEvent = computed(() => props.markers.find((e) => e.id === selectedEventId.value));

/**
 * Coloca los marcadores en el mapa
 */
function setMarkers(markers: Event[]): void {
  if (mapInstance.value) {
    for (const event of markers) {
      const category = event.category ?? CategoryEnum.Sports;
      const customIconUrl = categoryIconMap[category] ?? Azul;
      const customIcon = icon({
        iconUrl: event.highlighted ? Dorado : customIconUrl,
        iconSize: event.highlighted ? [30, 42] : [22, 30],
        iconAnchor: [11, 6]
      });

      // Crear un objeto Popup y asociarlo al marcador
      const popup = new Popup({
        className: `leaflet-popup_event-${event.id}`
      });
      const mapMarker = marker([event.latitude, event.longitude], { icon: customIcon });

      mapMarker.addEventListener('popupopen', () => {
        selectedEventId.value = event.id;
      });
      mapMarker.addEventListener('popupclose', () => {
        selectedEventId.value = undefined;
      });
      mapPopups.set(event.id, popup);
      mapMarkers.set(event.id, mapMarker);
      mapMarker.bindPopup(popup);
      mapMarker.addTo(mapInstance.value);
    }
  }
};

/**
 * Crea la instancia de Leaflet e inicia la geolocalización
 */
function createMapLayer(): void {
  if (!mapInstance.value && mapContainer.value) {
    mapInstance.value = map(mapContainer.value);

    tileLayer(TILE_LAYER_URL).addTo(mapInstance.value);
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
      () => {
        useToast(`${t('Error al obtener la ubicación')}`, 'error');
      },
      { enableHighAccuracy: true }
    );

  } else {
    useToast(t('La geolocalización no es soportada por tu navegador'), 'error');
  }
};

/**
 * Elimina los marcadores del mapa
 */
function disposeMarkers(): void {
  if (!isNil(userMarker)) {
    userMarker.clearAllEventListeners();
    userMarker.remove();
  }

  for (const [,marker] of mapMarkers) {
    marker.clearAllEventListeners();
    marker.remove();
  }

  mapMarkers.clear();
}

/**
 * Elimina los popups del mapa
 */
function disposePopups(): void {
  for (const [,popup] of mapPopups) {
    popup.close();
    popup.clearAllEventListeners();
    popup.remove();
  }

  mapPopups.clear();
}

/**
 * Dispose the map instance
 */
function disposeMap(): void {
  if (mapInstance.value) {
    mapInstance.value.clearAllEventListeners();
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
 * Dispose everything
 */
function dispose(): void {
  disposeWatcher();
  disposePopups();
  disposeMarkers();
  disposeMap();
}

/**
 * Se necesita esto para que el mapa se redibuje después de una transición
 * o el cambio de tamaño de la ventana
 */
function redraw(): void {
  window.setTimeout(() => {
    if (mapInstance.value) {
      mapInstance.value.invalidateSize();
    }
  }, 300);
}

/**
 * Este watcher trackea cuando el elemento div cambia para crear el mapa (ahora mismo no cambia nunca
 * solo en mount, pero es posible que en un futuro, dependiendo del dispositivo, cambiemos el objeto DOM
 * al que haga referencia con un `<component :is="" ....>`)
 */
watch(mapContainer, () => {
  dispose();
  createMapLayer();
});

/**
 * Este watch trackea los markers si cambian y se actualizan si es así.
 */
watch([mapInstance, ():typeof props.markers => props.markers], ([, newMarkers]) => {
  selectedEventId.value = undefined;
  disposePopups();
  disposeMarkers();
  setMarkers(newMarkers);
  redraw();
});

watch([windowHeight, windowWidth], redraw);

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

onBeforeUnmount(dispose);
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  padding: 10%;
}
</style>
