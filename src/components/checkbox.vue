<template>
    <div class="pin-container"
       @mouseover="isHovered = true"
       @mouseout="isHovered = false"
    >
    <input type="checkbox" v-model="model" :value="value" class="checkbox-class" :class="{ 'scaled': isHovered, 'selected':value }" />
    <span>{{ label }}</span>
    </div>
  </template>
  
<script setup lang="ts">
import { computed, defineEmits, ref } from "vue";
const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String }
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const isHovered = ref(false);
</script>
  
  <style scoped>
  .selected {
    cursor: pointer;
  }
  .scaled {
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  </style>