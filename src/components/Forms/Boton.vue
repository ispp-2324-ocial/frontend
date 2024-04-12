<template>
  <button
    :class="{ 'scaled': isHovered,
              'checkbox-class': type === 'default',
              'rounded-blue': type === 'rounded-blue',
              'rounded-red': type === 'rounded-red',
              'auth': type === 'auth',
              'share': type === 'share' }"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false">
    <slot />
  </button>
</template>

<script setup lang = 'ts'>
import { ref } from 'vue';

withDefaults(defineProps<{
  type?: 'rounded-blue' | 'rounded-red' | 'default' | 'auth' | 'share';
}>(), { type: 'default' });

const isHovered = ref(false);

</script>

<style scoped>
.scaled {
  cursor: pointer;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.rounded-blue {
  text-transform: uppercase;
  background-color: #aacfff;
  border: 2px solid #3e80d7;
  color: #0e4791;
  border-radius: 15px;
  font-size: clamp(20px,6vw,30px);
  font-weight: bold;
  margin: auto;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
}

.rounded-red {
  text-transform: uppercase;
  background-color: #ffaac2;
  border: 2px solid #d73e5f;
  color: #910e38;
  border-radius: 15px;
  font-size: clamp(20px,6vw,30px);
  font-weight: bold;
  margin: auto;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
}

.checkbox-class {
  height: auto;
  background-color: var(--o-color-theme);
  color: #000;
}

.auth {
  text-transform: uppercase;
  background: #aacfff;
  width: 100%;
  border: 2px solid #3e80d7;
  padding: 15px 5px 15px 5px;
  border-radius: 15px;
  font-size: clamp(16px,4.5vw,20px);
  font-weight: 550;
  margin: auto;
  text-align: center;
}

.share {
  text-transform: uppercase;
  background: #aacfff;
  width: 50%;
  border: 2px solid #3e80d7;
  padding: 10px 3px 10px 3px;
  border-radius: 15px;
  font-size: clamp(10px,3.5vw,15px);
  font-weight: 400;
  margin: auto;
  text-align: center;
}
</style>
