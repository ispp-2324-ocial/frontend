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
    <IMdiHeartOutline
      v-if="!value"
      class="heart-outline" />
    <IMdiHeart
      v-else
      class="heart-outline" />
    <p class="elemento">
      {{ counter }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useApi, useEvent } from '@/composables/apis';
import { EventApi, UsersApi } from '@/api';

const value = ref(false);
const isHovered = ref(false);
const route = useRoute('/details/[id]');

const { data: likedEvents } = await useEvent(EventApi, 'eventLikeList')(() => ({
  id: Number(route.params.id)
}));

const counter = ref(likedEvents.value ? likedEvents.value.length : 0);

console.log(counter.value);
console.log(likedEvents.value);

const { data: user } = await useApi(UsersApi, 'usersUserGetRetrieve')();

console.log(user.value);

if(likedEvents.value != undefined){
  for ( const e of likedEvents.value) {
    if (e.user == user.value.id) {
      value.value = true;
      break;
    }
  }
}

/**
 * Función que añade el like cuando el corazón el pulsado
 */
async function toggleLike(): Promise<void> {
  if (value.value) {
    counter.value--;
  } else {
    counter.value++;
  }

  value.value = !value.value;

  await (value.value ? useEvent(EventApi, 'eventLikeCreate')(() => ({
    like: {
      event: 0,
      user: 0
    }, id: Number(route.params.id)
  })) : useEvent(EventApi, 'eventLikeDestroy')(() => ({
    id: Number(route.params.id)
  })));
};


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
