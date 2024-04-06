<template>
  <select
    v-model="selectedCategory"
    class="input-box">
    <option
      v-for="(category, index) in categories"
      :key="index"
      :value="category.value">
      {{ category.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { CategoryEnum } from '@/api';

const { t } = useI18n();

const selectedCategory = ref<CategoryEnum>(CategoryEnum.Sports);

interface CategoryOption {
  value: CategoryEnum;
  label: string;
}

const categories: CategoryOption[] = [
  { value: CategoryEnum.Sports, label: t('categoryDeporte') },
  { value: CategoryEnum.Music, label: t('categoryMusica') },
  { value: CategoryEnum.Markets, label: t('categoryMercado') },
  { value: CategoryEnum.RelaxActivities, label: t('categoryRelax') },
  { value: CategoryEnum.LiveConcert, label: t('categoryConcierto') }
];
</script>
