<template>
  <Title>
    {{ $t('editarEvento') }}
  </Title>
  <div style="justify-content: center; display: flex;">
    <div
      v-for="event in eventDetail">
      <BaseInput
        v-model="event.name"
        class="input-box"
        placeholder="Nombre del evento" />
      <BaseInput
        v-model="event.place"
        class="input-box"
        placeholder="Lugar" />
      <BaseInput
        v-model="event.event"
        class="input-box"
        placeholder="Descripción" />
      <BaseInput
        v-model="event.date"
        class="input-box"
        placeholder="dd/mm/yy" />
      <BaseInput
        v-model="event.hour"
        class="input-box"
        placeholder="hh:mm" />
      <BaseInput
        v-model="event.capacity"
        class="input-box"
        placeholder="Capacidad" />
      <BaseInput
        v-model="event.category"
        class="input-box"
        placeholder="Categoría" />
    </div>
  </div>
  <BotonOcial
    style="display: flex;"
    @click="editE('/client')">
    {{ $t('guardarCambios') }}
  </BotonOcial>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();

t('');

const router = useRouter();

const eventDetail = ref([
  {
    name: 'Yoga Outdoor',
    place: 'Parque del Alamillo',
    event: 'Clase de yoga al aire libre.',
    date: '16/03/24',
    hour: '16:00',
    capacity: '60',
    category: 'Deporte',
    image: '@/assets/images/temp/yoga.png'
  }]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function editE(path:string) : Promise<void> {
  await router.push(path);
};

</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
}
</style>
