<!-- TODO: Arreglar -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <Ondas />
  <div style="margin-top: 10%; ">
    <Title>
      {{ $t('nuevoEvento') }}
    </Title>
    <div style="margin-top: 10%; justify-content: center; display: flex;">
      <div v-for="(event, index) in eventDetail">
        <BaseInput
          :key="index"
          v-model="event.name"
          class="input-box"
          placeholder="Nombre del evento" />
        <BaseInput
          :key="index"
          v-model="event.place"
          class="input-box"
          placeholder="Lugar" />
        <BaseInput
          :key="index"
          v-model="event.event"
          class="input-box"
          placeholder="Descripción" />
        <BaseInput
          :key="index"
          v-model="event.date"
          class="input-box"
          placeholder="dd/mm/yy" />
        <BaseInput
          :key="index"
          v-model="event.hour"
          class="input-box"
          placeholder="hh:mm" />
        <BaseInput
          :key="index"
          v-model="event.capacity"
          class="input-box"
          placeholder="Capacidad" />
        <BaseInput
          :key="index"
          v-model="event.category"
          class="input-box"
          placeholder="Categoría" />
      </div>
    </div>
    <Boton
      type="rounded-blue"
      style="margin-top: 10%;display: flex;"
      @click="createE('/client')">
      {{ $t('crearEvento') }}
    </Boton>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter();

const eventDetail = ref([
  {
    name: '',
    place: '',
    event: '',
    date: '',
    hour: '',
    capacity: '',
    category: ''
  }]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createE(path:string) : Promise<void> {
  await router.push(path);
};

</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}
</style>
