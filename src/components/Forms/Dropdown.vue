<template>
  <RDropdownMenuRoot
    v-model:open="toggleState"
    :modal="false">
    <RDropdownMenuTrigger>
      <slot name="trigger" />
      <RDropdownMenuContent
        v-show="toggleState"
        class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5">
        <RDropdownMenuLabel> {{ $t('Filtra por:') }}</RDropdownMenuLabel>
        <RDropdownMenuSeparator />
        <div>
          <div class="title">
            {{ $t('Categoría') }}
          </div>
          <SelectCategory
            v-model="form.category"
            class="selector"
            @click.stop />
        </div>
        <div>
          <div class="title">
            {{ $t('Fecha') }}
          </div>
          <div class="flex row" 
               style="align-items: center;">
            <div class="justify-left col-3 date-left">
              {{ $t('Desde') }}
            </div>
            <BaseInput
              v-model="form.time_start"
              class="ml-2 justify-right col-9 date-right"
              tipo="datetime-local"
              @click.stop />
          </div>
          <div class="flex row mt-2" 
               style="align-items: center;">
            <div class="justify-left col-3 date-left">
              {{ $t('Hasta') }}
            </div>
            <BaseInput
              v-model="form.time_end"
              class="ml-2 justify-right col-9 date-right"
              tipo="datetime-local"
              @click.stop />
          </div>
        </div>
        <div>
          <div class="title">
          {{ $t('Distancia') }}
          </div>
          <Slider
            v-model="form.distance"
            @click.stop />
        </div>
        <div>
          <div class="title">
            {{ $t('Likes') }}
          </div>
          <Checkbox 
            v-model="form.likes"
            @click.stop />
        </div>
        <div>
          <div class="title">
          {{ $t('Destacados') }}
          </div>
          <Checkbox
            v-model="form.highlighted"
            @click.stop />
        </div>
      </RDropdownMenuContent>
    </RDropdownMenuTrigger>
  </RDropdownMenuRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CategoryEnum } from '@/api';

const emit = defineEmits<{
  update: [filters: ConfigurationParameters];
}>();

const toggleState = ref<boolean>();

export interface ConfigurationParameters{
  category?: CategoryEnum;
  time_start?: string;
  time_end?: string;
  distance?: string;
  likes: boolean;
  highlighted: boolean;
}

const current_date = new Date();
const form = ref({
  category: undefined,
  time_start: new Date(current_date.getTime() - (current_date.getTimezoneOffset() * 60_000)).toJSON().slice(0,16),
  time_end: new Date(current_date.getTime() - (current_date.getTimezoneOffset() * 60_000)).toJSON().slice(0,16),
  distance: undefined,
  likes: false,
  highlighted: false
});

watch(form, () => {
  if (form.value) {
    emit('update', form.value);
  }
}
);
</script>

<style>
.title{
  font-weight: bold;
  justify-content: center;
  margin: 1vh 0 1vh;
}
.selector{
  border: solid 1px #0e4791;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  margin: auto;
  height: 6vh;
  justify-content: center;
  padding-left: 1vw;
  display: flex;
  width: 80%;
}
.date-left{
  width: 90%;
  margin-left: 1vw;
  justify-content: center;
}
.date-right{
  width: 90%;
  margin-right: 1vw;
  justify-content: center;
} 
</style>