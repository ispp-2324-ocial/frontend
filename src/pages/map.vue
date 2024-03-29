<template>
  <form @submit.prevent="()=>{}">
    <div
      style="display:flex;
    width: 100%;
    justify-content: center;">
      <BaseInput
        v-model="firstName" />
      <Boton
        class="transparente"
        @click="getEvents(firstName)">
        <IIwwaSearch class="size-6 text-muted-foreground" />
      </Boton>
    </div>
  </form>


  <div v-if="contador > 0">
    <LMap :markers="miArray" />
  </div>
  <div v-else>
    <LMap :markers="eventList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEvent } from '@/composables/apis';
import { EventApi, type Event } from '@/api';


const firstName = ref('');
const { data: eventList } = await useEvent(EventApi, 'eventListList')();
const miArray = ref<Event[]>([]);
const contador = ref(0);


/**
 * Buscador por nombre, descripción o cliente
 */
function getEvents(text: string): void {
  miArray.value.length = 0;
  text = text.toLowerCase();
  contador.value++;

  for (const event of eventList.value) {

    const name = event.name.toLowerCase();
    const eventText = event.event.toLowerCase();
    const ocialClient = String(event.ocialClient).toLowerCase();

    if (name.includes(text) || eventText.includes(text) || ocialClient.includes(text)){
      miArray.value.push(event);
    }
  }

}

</script>


<style scoped>
.transparente {
  background-color: transparent;
  border-color: transparent;
  margin-left: 3%;
}

</style>
