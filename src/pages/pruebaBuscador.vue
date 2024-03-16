<template>
  <div
    class="centered-image"
    style="margin-top: 10%;">
    <form @submit.prevent="()=>{}">
      <BaseInput v-model="firstName" />
      <Boton
        class="transparente"
        @click="getEvents(firstName)">
        <IIwwaSearch class="size-6 text-muted-foreground" />
      </Boton>
    </form>
    {{ miArray }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EventApi, type Event } from '@/api';
import { useEvent } from '@/composables/apis';

const firstName = ref('');
const { data: eventList } = await useEvent(EventApi, 'eventListList')();
const miArray = ref<Event[]>([]);

console.log(eventList.value);

/**
 * Prueba para buscar
 */
function getEvents(text: string): void {
  miArray.value.length = 0;

  for (const event of eventList.value) {
    if (event.name.includes(text) || event.event.includes(text) || String(event.ocialClient).includes(text)){
      miArray.value.push(event);
    }
  }

  console.log(miArray);
}


</script>

<style scoped>
.centered-image {
    display: flex;
    justify-content: center;
    align-items: center;
}
.transparente {
  background-color: transparent;
  border-color: transparent;
  margin-left: 3%;
}

</style>
