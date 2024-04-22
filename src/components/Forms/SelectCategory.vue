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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CategoryEnum } from '@/api';

const { t } = useI18n();

const selectedCategory = defineModel<CategoryEnum>(CategoryEnum.Sports);

// Hay que cambiar la API para que LiveConcert y RelaxActivities funcionen. Arreglar en refactor.
enum tempCategoryEnum {
  Sports = 'Sports',
  Music = 'Music',
  Markets = 'Markets',
  RelaxActivities = 'Relax%20activities',
  LiveConcert = 'Live%20concert'
}

const categories = computed(() => [
  { value: tempCategoryEnum.Sports, label: t('categoryDeporte') },
  { value: tempCategoryEnum.Music, label: t('categoryMusica') },
  { value: tempCategoryEnum.Markets, label: t('categoryMercado') },
  { value: tempCategoryEnum.RelaxActivities, label: t('categoryRelax') },
  { value: tempCategoryEnum.LiveConcert, label: t('categoryConcierto') }
]);
</script>
