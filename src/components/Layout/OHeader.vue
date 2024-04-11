<template>
  <header class="header flex">
    <slot />
  </header>
</template>

<style scoped>
.header {
  top: 0px;
  z-index: 1008;
  transform: translateY(0%);
  position: fixed;
  left: 0px;
  width: calc(100% + 0px);
  border: 0;
  flex-direction: column;
}
</style>
