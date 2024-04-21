<template>
  <OHeader>
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
      :markers="events" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';
import type { ConfigurationParameters } from '@/components/Forms/Dropdown.vue';

const filters = ref<ConfigurationParameters>();

// eslint-disable @typescript-eslint/no-unsafe-member-access
const { data: eventList } = await useEvent(EventApi, 'eventList')(() => ({
  category: filters.value?.category ? String(filters.value.category) : undefined,
  timeStart: filters.value?.time_start ? String(filters.value.time_start) : undefined,
  timeEnd: filters.value?.time_end ? String(filters.value.time_end) : undefined,
  // latitude: navigator.geolocation.watchPosition((position) => position.coords.latitude),
  // longitude: navigator.geolocation.watchPosition((position) => position.coords.longitude),
  radius: filters.value?.distance ? Number(filters.value.distance) : undefined,
  liked: filters.value?.likes ? Boolean(filters.value.likes) : undefined,
  highlighted: filters.value?.highlighted ? Boolean(filters.value.highlighted) : undefined
}));
// eslint-enable @typescript-eslint/no-unsafe-member-access

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
