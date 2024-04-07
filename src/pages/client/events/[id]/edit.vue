<!-- TODO: Arreglar -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <Ondas />
  <div>
    <Title style="margin-top: 10%;">
      {{ $t('editarEvento') }}
    </Title>
    <div>
      <div
        v-for="(event, index) in eventDetail">
        <BaseInput
          :key="index"
          v-model="event.name"
          class="input-box"
          :placeholder="placeholders[index]" />
      </div>
    </div>
    <Boton
      type="rounded-blue"
      style="margin-top: 10%;display: flex;"
      @click="editE()">
      {{ $t('guardarCambios') }}
    </Boton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { CategoryEnum , EventApi } from '@/api';
import { useEvent } from '@/composables/apis';

const { t } = useI18n();

const router = useRouter();

const route = useRoute('/client/events/[id]/edit');

const { data: eventDetail } = await useEvent(EventApi, 'eventList')(() => ({
  'id': Number(route.params.id)
}));

/**
 * Se intenta rellenar estos campos con los obtenidos en eventDetail para sincronizar
 *     los datos que salen en la vista con los que se quieren guardar en la base de datos
 */
const form = ref({
  name: '',
  place: '',
  event: '',
  timeStart: '',
  timeEnd: '',
  capacity: 1,
  category: CategoryEnum.Sports
});

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function editE() : Promise<void> {
  await useEvent(EventApi, 'eventCreateCreate')(() => ({
    eventCreate: {
      'event': form.value.event,
      'place': form.value.place,
      'capacity': form.value.capacity,
      'name': form.value.name,
      'timeEnd' : form.value.timeEnd,
      'timeStart': form.value.timeStart,
      'category': form.value.category,
      'ocialClient': 0
    }
  }));

  await router.push('/');
};

const placeholders = computed(() =>
  [t('placeholderNombreEvento'),
   t('placeholderLugar'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderDescripcion'),
   t('placeholderCapacidad')]);
</script>

<style scoped>
.input-box{
  margin-bottom: 1.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
