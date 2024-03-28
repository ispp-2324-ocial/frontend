<template>
  <div
    :class="{ 'auth': variant === 'auth',
              'inputWrap': variant === 'default'}">
    <label>{{ label }}</label>
    <input
      v-model="value"
      v-bind="$attrs"
      :type="tipo"
      class="validate-style rounded-xl border focus-visible:outline-none"
      :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isStr } from '@/utils/validation';

const props = withDefaults(defineProps<{
  label?: string,
  validators?: Array<(i: string) => boolean>,
  placeholder?: string,
  tipo?: string,
  variant?: 'default' | 'auth',
}>(), { variant: 'default' });

const value = defineModel<string>();
const validate = computed(()=>{
  return (props.validators ?? [] ).map((fn)=>{
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

.inputWrap {
    display: flex;
    flex-direction: column;

    input {
      padding: 8px 12px;
      font-size: 16px;
    }
}

.auth {
  display: flex;
  flex-direction: column;

  input {
    padding: 15px;
    font-size: 16px;
    border: 2px solid #3e80d7;
    border-radius: 15px;
    margin-bottom: 1vh;
    outline: 0;
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
