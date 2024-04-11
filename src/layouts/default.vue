<template>
  <main
    class="w-full flex content">
    <slot />
    <OFooter />
  </main>
</template>

<style scoped>
.content {
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
