<template>
  <div ref="imageElement">
    <OImg
      class="absolute-cover"
      :src="imageUrl"
      :alt="isImage(props.item) || isNil(props.item?.name) ? $t('Desconocido') : props.item.name"
      v-bind="$attrs">
      <template #placeholder>
        <BlurhashCanvas
          v-if="hash"
          :hash="hash"
          :width="width"
          :height="height"
          :punch="punch"
          class="absolute-cover">
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
import { computed, shallowRef } from 'vue';
import type { Event, Image } from '@/api';
import { isObj, isNil } from '@/utils/validation';

const props = defineProps<{
  item?: Event | Image;
  width?: number;
  height?: number;
  punch?: number;
}>();

const imageElement = shallowRef<HTMLDivElement>();

/**
 * Type guard for Image object
 */
function isImage(obj: unknown): obj is Image {
  return isObj(obj) && 'image' in obj;
}

const hash = computed(() => isImage(props.item) ? props.item.blurhash : props.item?.image?.blurhash);
const imageUrl = computed(() => isImage(props.item) ? props.item.image : props.item?.image?.image);
</script>

<style scoped>
.z-1 {
  z-index: -1;
}
</style>
