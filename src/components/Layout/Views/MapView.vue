<template>
  <OHeader class="mt-5">
    <form @submit.prevent="()=>{}">
      <div
        class="flex justify-center">
        <BaseInput v-model="search" />
        <Dropdown @update="(new_filters) => filters = new_filters">
          <template #trigger>
            <Tooltip>
              <Boton class="transparent p-1">
                <IMdiFilter class="size-6" />
              </Boton>
              <template #tooltip>
                {{ $t('Filtra eventos') }}
              </template>
            </Tooltip>
          </template>
        </Dropdown>
      </div>
    </form>
  </OHeader>
  <div class="h-full">
    <LMap
      :markers="events ?? []" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';
import type { ConfigurationParameters } from '@/components/Forms/Dropdown.vue';

const filters = ref<ConfigurationParameters>();

/**
 * Los tipos exportados de archivos .vue no son reconocidos por el parseador de ESLint,
 * por lo que es seguro desactivar estas reglas aquí - ferferga
 */
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
const { data: eventList } = await useEvent(EventApi, 'eventList')(() => ({
  ...(filters.value ? {
    category: filters.value.category,
    timeStart: filters.value.time_start,
    timeEnd: filters.value.time_end,
    // latitude: navigator.geolocation.watchPosition((position) => position.coords.latitude),
    // longitude: navigator.geolocation.watchPosition((position) => position.coords.longitude),
    // radius:  filters.value?.distance ? Number(filters.value.distance) : undefined,
    highlighted: Boolean(filters.value.highlighted)
  } : {})
}));
/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

const search = ref('');

const text = computed(() => search.value.toLowerCase());
const events = computed(() => {
  return text.value ? eventList.value.filter((event) => {
    const name = event.name.toLowerCase();
    const eventText = event.description.toLowerCase();
    const creator = event.creator.name!.toLowerCase();

    return name.includes(text.value) || eventText.includes(text.value) || creator.includes(text.value);
  }) : eventList.value;
});

</script>

<style scoped>
.transparent {
  background-color: transparent !important;
  border: none;
}
</style>
