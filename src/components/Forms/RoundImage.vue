<template>
  <div
    class="rect-img-container">
    <img
      v-if="isImage"
      class="rect-img"
      :alt="alt"
      :src="src" />
    <IMdiImageBrokenVariant
      v-else />
  </div>
</template>

<script setup lang = 'ts'>
withDefaults(defineProps<{
  src: string,
  isImage: boolean,
  alt?: string
}>(), { alt: 'Avatar' });

</script>

<style scoped>
.rect-img-container {
  position: relative;
  overflow:hidden;
  display: block;
  width: 30%;
  border-radius: 50%;
  max-width: 220px;
  max-height: 220px;
  min-width: 90px;
  min-height: 90px;
  margin: 16px;
}

.rect-img-container::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.rect-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
