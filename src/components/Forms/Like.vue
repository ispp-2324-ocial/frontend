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
      v-if="!likeValue"
      class="heart-outline" />
    <IMdiHeart
      v-else
      class="heart-outline" />
    <p class="elemento">
      {{ likeValue ? counter+1 : counter }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useApi } from '@/composables/apis';
import { EventApi, UsersApi } from '@/api';

const isHovered = ref(false);
const likeValue = ref(false);
const route = useRoute('/details/[id]');

const methodToExecute = ref<'eventLikeCreate' | 'eventLikeDestroy' | undefined>();
const { data: like } = await useApi(EventApi, methodToExecute, { skipCache: { request: true }, globalLoading: false })(() => ({
  id: Number(route.params.id),
  like: {
    event: 0,
    user: 0
  }
}));

const isFavorite = computed({
  get() {
    return Boolean(like.value);
  },
  set() {
    methodToExecute.value = likeValue.value ? 'eventLikeDestroy' : 'eventLikeCreate';
    likeValue.value = ! likeValue.value;
  }
});

const { data: likedEvents } = await useApi(EventApi, 'eventLikeList')(() => ({
  id: Number(route.params.id)
}));

const counter = ref(likedEvents.value ? likedEvents.value.length : 0);

const { data: user } = await useApi(UsersApi, 'usersMeRetrieve')();

if(likedEvents.value != undefined){
  for ( const e of likedEvents.value) {
    if (e.user == user.value.id) {
      likeValue.value = true;
      counter.value--;
      break;
    }
  }
}

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
