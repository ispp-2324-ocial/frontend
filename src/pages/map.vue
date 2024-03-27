<template>
  <LMap :markers="markers" />
</template>

<script setup lang="ts">
/*
 * Import { ref } from 'vue';
 * import { EventApi, CategoryEnum, type Event } from '@/api';
 * import { useEvent } from '@/composables/apis';
 */

const markers = [
  {
    description: 'Concierto Nuevo Berlin',
    latitud: 37.408_696_273_137_89,
    longitud: -5.990_007_338_209_76,
    category: 'Música'
  },{
    description: 'Clase Yoga en Alamillo',
    latitud: 37.415_474_233_257_7,
    longitud: -5.997_796_824_409_255,
    category: 'Deporte'
  },{
    description: 'Partido Fútbol Casa Félix',
    latitud: 37.358_307_457_869_76,
    longitud: -5.986_125_275_133_24,
    category: 'Ocio'
  }
];


/*
 * Const eventFiltered = ref<Event[]>([]);
 * const { data: eventList } = await useEvent(EventApi, 'eventListList')();
 */

/**
 * Esta función permitira el filtrado por categoria
 */
/*
 * function filterMapByEventCategory(): void {
 *   eventFiltered.value.length = 0;
 */

/*
 *   for (const event of eventList.value) {
 *     switch (event.category) {
 *       case CategoryEnum.NUMBER_0: {
 *         eventFiltered.value.push(event);
 *         break;
 *       }
 */

/*
 *       case CategoryEnum.NUMBER_1: {
 *         eventFiltered.value.push(event);
 *         break;
 *       }
 */

/*
 *       case CategoryEnum.NUMBER_2: {
 *         eventFiltered.value.push(event);
 *         break;
 *       }
 */

/*
 *       case CategoryEnum.NUMBER_3: {
 *         eventFiltered.value.push(event);
 *         break;
 *       }
 */

/*
 *       case CategoryEnum.NUMBER_4: {
 *         eventFiltered.value.push(event);
 *         break;
 *       }
 */

/*
 *       default: {
 *         break;
 *       }
 *     }
 *   }
 * }
 */

/**
 * Esta función permitira el filtrado por latitud y longitud
 */
/*
 * async function filterMapByEventLat(radiusClient: number): Promise<void> {
 *   eventFiltered.value.length = 0;
 */

/*
 *   const { data: eventNearby } = await useEvent(EventApi, 'eventNearbyList')(() => ({
 *     latitude: 37.3896,
 *     longitude: -5.9823,
 *     radius: radiusClient
 *   }));
 */

/*
 *   for (const event of eventNearby.value) {
 *     eventFiltered.value.push(event);
 */

/*
 *   }
 * }
 */

/**
 * Esta función permitira el filtrado por fecha y hora
 * quiero hacer que el usuario introduzca una fecha y hora en el formato correcto y se filtre por eso tipo: 2022-12-12 12:12:12  YA SE HARA MAS ADELANTE
 */

/*
 * async function filterMapByEventTime(startDate: Date, endDate: Date): Promise<void> {
 *   eventFiltered.value.length = 0;
 */


/*
 *   for (const event of eventList.value) {
 *      if(event.startDate === response.event.date){
 *        if(event.hour === response.event.hour){
 *          res.add(event)
 *      }
 *      if(event.date === response.event.date){
 *        res.add(event)
 *      }
 *      if(event.hourIn => response.event.hourIn || event.hourOut === response.event.hourOut){
 *        res.add(event)
 *    }
 *   }
 *   }
 */

// </script>
