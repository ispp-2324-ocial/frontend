<template>
  <div class="dropdown">
    <p>{{ $t('Filtra por:') }}</p>
    <select v-model="selectedOption">
      <option
        value=""
        disabled
        hidden>
        {{ $t('Categoría') }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span>{{ selectedOption || $t('Categoría') }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedOption = ref('option1'); // Set default option value here
const options = ref([
  { label: 'Categoría', value: 'option1' },
  { label: 'Fecha', value: 'option2' },
  { label: 'Distancia', value: 'option3' }
]);
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown select {
  background-color: #0e4791;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown select:focus {
  outline: none;
}

.dropdown select::-ms-expand {
  display: none;
}

span {
  position: absolute;
  left: 10%;
}
</style>
