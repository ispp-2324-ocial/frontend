<template>
  <div
    class="blurhash-image"
    :class="{
      'b-rounded-5': props.variant === 'circle'
    }">
    <OImg
      :src="imageUrl"
      :alt="isImage(props.item) || isNil(props.item?.name) ? $t('Desconocido') : props.item.name"
      :transition-props="{
        mode: 'out-in'
      }"
      :class="{
        'b-rounded-5': props.variant === 'circle'
      }">
      <template #placeholder>
        <BlurhashCanvas
          v-if="hash"
          :hash="hash"
          :width="width"
          :height="height"
          :punch="punch">
          <IMdiImageBrokenVariant class="z-1" />
        </BlurhashCanvas>
        <IMdiImageBrokenVariant
          v-else
          class="z-1" />
      </template>
    </OImg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Event, Image } from '@/api';
import { isObj, isNil } from '@/utils/validation';

const props = withDefaults(
  defineProps<{
    item?: Event | Image;
    width?: number;
    height?: number;
    punch?: number;
    variant?: 'circle';
  }>(),
  { variant: 'circle' }
);

/**
 * Type guard for Image object
 */
function isImage(obj: unknown): obj is Image {
  return isObj(obj) && 'image' in obj;
}

const hash = computed(() => isImage(props.item) ? props.item.blurhash : props.item?.image?.blurhash);
const imageUrl = computed(() => isImage(props.item) ? "https://s3.backend.ocial.es" + props.item.image : props.item?.image?.image);
</script>

<style scoped>
.z-1 {
  z-index: -1;
}

.blurhash-image {
  width: 30%;
  max-width: 220px;
  min-width: 90px;
  margin: 16px
}
</style>
