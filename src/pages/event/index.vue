<template>
  <ClientView v-if="auth.isClient.value" />
  <UserLikeView v-else-if="auth.isLoggedIn.value" />
  <MapView v-else />
</template>

<script setup lang="ts">
import { auth } from '@/store/auth';
</script>
