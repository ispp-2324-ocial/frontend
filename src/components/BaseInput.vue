<template>
  <div class="input-wrap">
    <label>{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>

.input-wrap {
    display: flex;
    flex-direction: column;

    input {
        padding: 8px 12px;
        font-size: 16px;
    }
}
</style>
