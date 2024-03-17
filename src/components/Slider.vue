<template>
  <div class="slider-component">
    <div class="slider-container">
      <input
        ref="input"
        v-model="currentValue"
        type="range"
        :min="min"
        :max="max"
        class="slider"
        @input="slide" />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(['input']);
const currentValue = defineModel<string>();

const data = (): number => {
  return props.value;
};

const slide = (): void => {
  emits('input', Number.parseInt(data().toString()));
};
</script>

<style scoped>
.slider-component .slider-container {
	width: 100%;
}

.slider-component .slider-container .slider {
	-webkit-appearance: none;
	appearance: none;
	width: 100%;
	height: 4px;
	border-radius: 2px;
	background: #deecff;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
}

.slider-component .slider-container .slider:hover {
	opacity: 1;
}

.slider-component .slider-container .slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 18px;
	height: 18px;
	background: #0e4791;
	cursor: pointer;
	border-radius: 50%;
}

.slider-component .slider-container .slider::-moz-range-thumb {
	width: 18px;
	height: 18px;
	background: #D8A22E;
	cursor: pointer;
	border-radius: 50%;
}
</style>
