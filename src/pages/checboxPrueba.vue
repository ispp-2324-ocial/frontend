<template>
  <p>  {{ string2 }} </p>
  <Checkbox v-model="isSelected">
    {{ string + isSelected }}
  </Checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSelected= ref(false);
let string = 'I am checked: ';
let string2 = 'Using the custom checkbox as stand alone ';
</script>
