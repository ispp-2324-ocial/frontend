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
          <div class="flex align-center font-bold">
            {{ $t('Categoría') }}
          </div>
          <SelectCategory
            v-model="form.category"
            class="border ml-2"
            @click.stop />
        </div>
        <div>
          <div class="font-bold justify-center">
            {{ $t('Fecha') }}
          </div>
          <BaseInput 
            v-model="form.date"
            tipo="datetime-local"
            @click.stop />
        </div>
        <div>
          <div class="font-bold justify-center">
          {{ $t('Distancia') }}
          </div>
          <Slider 
            v-model="form.distance"
            @click.stop />
        </div>
        <div>
          <div class="font-bold justify-center">
            {{ $t('Likes') }}
          </div>
          <Checkbox 
            v-model="form.likes"
            @click.stop />
        </div>
        <div>
          <div class="font-bold justify-center">
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
  date?: string;
  distance?: string;
  likes: boolean;
  highlighted: boolean;
}

const current_date = new Date();
const form = ref({
  category: undefined,
  date: new Date(current_date.getTime() - (current_date.getTimezoneOffset() * 60_000)).toJSON().slice(0,16),
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
