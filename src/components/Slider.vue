<template>
  <div class="slider-component">
    <div
      class="current-value">
      <p>{{ value || (min+max)/2 }} {{ $t(' km') }} </p>
    </div>
    <input
      v-model="value"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="slider" />
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  min: number;
  max: number;
  step: number;
}>(), {
  min: 0,
  max: 1000,
  step: 10}
);

const value = defineModel<string>();
</script>

<style scoped>
 /* Baseline */
.current-value {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.slider-component .slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
.slider-component .slider::-webkit-slider-runnable-track {
  background-color: #deecff;
  border-radius: 10px;
  height: 4px;
}

/* slider thumb */
.slider-component .slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  margin-top: -8px; /* Centers thumb on the track */
  background-color: #0e4791;
  border-radius: 10px;
  height: 20px;
  width: 10px;
}

.slider-component .slider:focus::-webkit-slider-thumb {
  outline: 2px solid #0e4791;
  outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
.slider-component .slider::-moz-range-track {
  background-color: #deecff;
  border-radius: 10px;
  height: 4px;
}

/* slider thumb */
.slider-component .slider::-moz-range-thumb {
  background-color: #0e4791;
  border: none; /*Removes extra border that FF applies*/
  border-radius: 10px;
  height: 20px;
  width: 10px;
}

.slider-component .slider:focus::-moz-range-thumb{
  outline: 2px solid #0e4791;
}
</style>
