<template>
    <p>
      Using the custom checkbox with an array
    </p>
    <p>{{ selectedPeople }}</p>
    <template v-for="person in people" key="person.name" >
    <Checkbox :label="person.name" v-model="selectedPeople" :value="person" />
    </template>
  
   <br> 
   <p>  Using the custom checkbox as stand alone </p>
   <Checkbox  :label="`I am checked: ${isSelected}`" v-model="isSelected"  />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const people = ref([
    {
      name:"William",
      age: 30,
      sex: "Male"
    },
    {
      name:"Thomas",
      age: 24,
      sex: "Male"
    },
     {
      name:"Jennifer",
      age: 20,
      sex: "Female"
    }
  ]);
  
  const selectedPeople = ref([]);
  const isSelected= ref(false);
  </script>


 <style scoped>
 
 </style>