<template>
  <div class="input-wrap">
    <label>{{ label }}</label>
    <input
      v-model="value"
      type="text"
      class="validate-style rounded-xl border placeholder:text-slate-400 focus-visible:outline-none" />
  </div>
</template>

<script setup lang="ts">
import type { Fn } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  validators: {
    type: Array<Fn>,
    default: []
  }
});

const value = defineModel<string>();
const validate = computed(()=>{
  return props.validators.map((fn)=>{
    return Boolean (fn(value.value));
  }).every((i)=>{
    return i===true;
  });
});
const cssColor = computed(()=>validate.value || value.value===''? 'var(--o-color-theme)': 'red');
</script>

<style scoped>

.validate-style {
  border-color: v-bind(cssColor);

}
.input-wrap {
    display: flex;
    flex-direction: column;

    input {
      padding: 8px 12px;
      font-size: 16px;
    }
}
</style>
