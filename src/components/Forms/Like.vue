<template>
  <div
    class="checkbox-container"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    @click.stop.prevent="isFavorite = !isFavorite">
    <input
      v-model="isFavorite"
      type="checkbox"
      class="hidden" />
    <IMdiHeartOutline
      v-if="!isFavorite"
      class="heart-outline" />
    <IMdiHeart
      v-else
      class="heart-outline" />
    <p class="elemento">
      {{ isFavorite ? event.likes + 1 : event.likes }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useApi } from '@/composables/apis';
import { auth } from '@/store/auth';
import { EventApi, type Event } from '@/api';

const props = defineProps<{
  event: Event
}>();

const isHovered = shallowRef(false);

const methodToExecute = shallowRef<'eventLikeCreate' | 'eventLikeDestroy' | undefined>();
const { data: like } = await useApi(EventApi, methodToExecute, { skipCache: { request: true }, globalLoading: false })(() => ({
  id: Number(props.event.id)
}));

const { data: likedEvents } = await useApi(EventApi, 'eventLikeList')(() => ({
  id: Number(props.event.id)
}));

const isFavorite = computed({
  get() {
    return like.value ? Boolean(like.value) : likedEvents.value.some((l) => l.user.username === auth.user.value?.username);
  },
  set(newVal: boolean) {
    methodToExecute.value = newVal ? 'eventLikeCreate' : 'eventLikeDestroy';
  }
});
</script>

<style scoped>
.checkbox-container {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  position: absolute;
  left: -9999px;
}

.heart-outline {
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: var(--o-color-theme)
}

.heart-outline:hover {
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.elemento {
  font-size: clamp(15px, 5.5vw, 30px);
  font-weight: normal;
  margin-left: 2%;
}
</style>
