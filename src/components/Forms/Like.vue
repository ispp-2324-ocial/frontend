<template>
  <div
    class="checkbox-container"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    @click="toggleLike">
    <input
      v-model="value"
      type="checkbox"
      class="hidden" />
    <svg
      v-if="!value"
      class="heart-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 56 56">
      <path
        fill="#0e4791"
        d="M4.727 20.64c0 9.985 8.367 19.805 21.562 28.243c.516.304 1.219.633 1.711.633s1.195-.328 1.688-.633c13.218-8.438 21.586-18.258 21.586-28.242c0-8.297-5.696-14.157-13.29-14.157c-4.359 0-7.875 2.063-9.984 5.227c-2.11-3.14-5.648-5.227-9.984-5.227c-7.594 0-13.29 5.86-13.29 14.157m3.773 0c0-6.234 4.031-10.382 9.469-10.382c4.406 0 6.914 2.742 8.437 5.086c.633.937 1.032 1.195 1.594 1.195c.563 0 .914-.281 1.594-1.195c1.593-2.297 4.054-5.086 8.437-5.086c5.438 0 9.469 4.148 9.469 10.383c0 8.718-9.211 18.117-19.031 24.632c-.235.164-.375.282-.469.282c-.094 0-.258-.117-.492-.282C17.71 38.758 8.5 29.36 8.5 20.641" />
    </svg>
    <svg
      v-else
      class="heart-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 56 56">
      <path
        fill="#0e4791"
        d="M28 49.516c.492 0 1.195-.328 1.688-.633c13.289-8.367 21.586-18.258 21.586-28.242c0-8.297-5.696-14.157-13.29-14.157c-4.359 0-7.875 2.579-9.984 6.54c-2.11-3.938-5.648-6.54-9.984-6.54c-7.594 0-13.29 5.86-13.29 14.157c0 9.984 8.227 19.992 21.563 28.242c.516.304 1.219.633 1.711.633" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';

const value = ref(false);
const isHovered = ref(false);
const route = useRoute('/details/[id]');

/**
 * Función que añade el like cuando el corazón el pulsado
 */
async function toggleLike(): Promise<void> {
  value.value = !value.value;

  await value.value ? useEvent(EventApi, 'eventLikeCreate') : useEvent(EventApi, 'eventLikeDestroy');
};

const { data: likedEvents } = await useEvent(EventApi, 'eventLikeList')(() => ({
  'id': Number(route.params.id)
}));

console.log(likedEvents.value);
</script>

<style scoped>
.checkbox-container {
  display: inline-block;
  margin-left: 1%;
}

.hidden {
  position: absolute;
  left: -9999px;
}

.heart-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;

}

.heart-icon:hover {
  transform: scale(0.9);
  transition: transform 0.3s ease;
}
</style>
