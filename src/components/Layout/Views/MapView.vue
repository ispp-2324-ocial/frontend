<template>
  <form @submit.prevent="()=>{}">
    <div
      style="display:flex;
      width: 100%;
      justify-content: center;">
      <BaseInput
        v-model="firstName" />
      <Boton
        class="transparente p-1">
        <IMdiSearch class="size-6" />
      </Boton>
      <Dropdown>
        <template #trigger>
          <Tooltip>
            <Boton class="transparente p-1">
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
  <div>
    <LMap :markers="eventList" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';

const firstName = shallowRef('');
const { data: eventList } = await useEvent(EventApi, 'eventListList')();
</script>

<style scoped>
.transparente {
  background-color: transparent;
  border-color: transparent;
}
</style>
