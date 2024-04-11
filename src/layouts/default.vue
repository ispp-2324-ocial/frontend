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
import { watch, onUnmounted, shallowRef } from 'vue';
import { windowWidth, windowHeight } from '@/store';

const footerCssVarKey = '--o-footer-height';
const footerRef = shallowRef<HTMLElement>();

watch([windowWidth, windowHeight, footerRef], () => {
  const footer = document.querySelector('footer');

  if (footer) {
    window.document.documentElement.style.setProperty(footerCssVarKey, `${footer.clientHeight}px`);
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
}
</style>
