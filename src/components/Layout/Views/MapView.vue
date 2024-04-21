<template>
  <OHeader>
    <form @submit.prevent="()=>{}">
      <div
        class="flex justify-center">
        <BaseInput v-model="search" />
        <Dropdown>
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

const { data: eventList } = await useEvent(EventApi, 'eventList')();

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
