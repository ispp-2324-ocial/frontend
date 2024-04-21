<template>
  <OHeader>
    <form @submit.prevent="()=>{}">
      <div
        class="flex justify-center">
        <BaseInput v-model="search" />
        <Boton
          class="transparent p-1"
          @click="getEvents(search)">
          <IMdiSearch class="size-6" />
        </Boton>
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
      :markers="miArray.length>0 ? miArray : eventList" />
    <p>{{ console.log(miArray) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEvent } from '@/composables/apis';
import { EventApi, type Event } from '@/api';

const { data: eventList } = await useEvent(EventApi, 'eventList')();

const search = ref('');
const miArray = ref<Event[]>([]);

/**
 * Buscador por nombre, descripción o cliente
 *
 */
function getEvents(text: string): void {
  miArray.value.length = 0;
  text = text.toLowerCase();

  for (const event of eventList.value) {
    const name = event.name.toLowerCase();
    const eventText = event.description.toLowerCase();
    const creator = event.creator.name.toLowerCase();

    if (name.includes(text) || eventText.includes(text) || creator.includes(text)){
      miArray.value.push(event);

    }
  }
}

</script>

<style scoped>
.transparent {
  background-color: transparent !important;
  border: none;
}
</style>
