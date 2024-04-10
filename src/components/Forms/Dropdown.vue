<template>
  <RDropdownMenuRoot v-model:open="toggleState">
    <RDropdownMenuTrigger>
      <slot name="trigger" />
      <RDropdownMenuContent
        v-show="toggleState"
        class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5">
        <RDropdownMenuLabel> {{ $t('Filtra por:') }}</RDropdownMenuLabel>
        <RDropdownMenuSeparator />
        <RDropdownMenuItem>
          <RDropdownMenuCheckboxItem v-model:checked="checkboxCategory">
            {{ $t('Categoría') }}
          </RDropdownMenuCheckboxItem>
        </RDropdownMenuItem>
        <RDropdownMenuItem>
          <RDropdownMenuCheckboxItem v-model:checked="checkboxDate">
            {{ $t('Fecha') }}
          </RDropdownMenuCheckboxItem>
        </RDropdownMenuItem>
        <RDropdownMenuItem>
          <RDropdownMenuCheckboxItem v-model:checked="checkboxDistance">
            {{ $t('Distancia') }}
          </RDropdownMenuCheckboxItem>
        </RDropdownMenuItem>
        <RDropdownMenuItem>
          <RDropdownMenuCheckboxItem v-model:checked="checkboxLikes">
            {{ $t('Likes') }}
          </RDropdownMenuCheckboxItem>
        </RDropdownMenuItem>
      </RDropdownMenuContent>
    </RDropdownMenuTrigger>
  </RDropdownMenuRoot>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const toggleState = defineModel<boolean>();
const checkboxCategory = shallowRef(false);
const checkboxDate = shallowRef(false);
const checkboxDistance = shallowRef(false);
const checkboxLikes = shallowRef(false);
</script>
