<template>
  <div class="input-wrap">
    <label>{{ label }}</label>
    <input
      v-model="value"
      type="text"
      class="validate-style rounded-xl border focus-visible:outline-none"
      :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isStr } from '@/utils/validation';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  validators: {
    type: Array<(i: string) => boolean>,
    default: []
  },
  placeholder: {
    type: String,
    default:''
  }
});

const value = defineModel<string>();
const validate = computed(()=>{
  return props.validators.map((fn)=>{
    return isStr(value.value) && Boolean(fn(value.value));
  }).every((i)=>{
    return i === true;
  });
});
const cssColor = computed(()=> validate.value || value.value === '' ? 'var(--o-color-theme)' : 'red');
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
