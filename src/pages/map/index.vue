<template>
  <ClientView v-if="auth.isClient.value" />
  <MapView v-else />
</template>

<script setup lang="ts">
import { auth } from '@/store/auth';
</script>
