<template>
  <main
    class="w-full flex content">
    <div class="grow">
      <slot />
    </div>
  </main>
  <OFooter ref="footerRef" />
</template>

<script setup lang="ts">
import { onUnmounted, shallowRef , watch, type ComponentPublicInstance } from 'vue';
import { windowWidth, windowHeight } from '@/store';

const footerCssVarKey = '--o-footer-height';
const footerRef = shallowRef<ComponentPublicInstance>();

watch([windowWidth, windowHeight, footerRef], () => {
  const el = footerRef.value?.$el as HTMLElement;

  if (el) {
    /**
     * Necesario puesto que el DOM aplaza el cálculo de la dimensión de los items con translate y fixed
     */
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        window.document.documentElement.style.setProperty(footerCssVarKey, window.getComputedStyle(el).height);
      });
    });
  }
});

onUnmounted(() => {
  window.document.documentElement.style.removeProperty(footerCssVarKey);
});
</script>

<style scoped>
.content {
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100vh - var(--o-footer-height)) !important;
  margin-bottom: 70vh !important;
}
</style>
