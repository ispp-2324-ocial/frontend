<template>
  <OHeader>
    <form @submit.prevent="()=>{}">
      <div
        class="flex justify-center">
        <BaseInput />
        <Boton
          class="transparent p-1">
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
      :markers="eventList" />
  </div>
</template>

<script setup lang="ts">
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';

const { data: eventList } = await useEvent(EventApi, 'eventListList')();
</script>

<style scoped>
.transparent {
  background-color: transparent !important;
  border: none;
}
</style>
