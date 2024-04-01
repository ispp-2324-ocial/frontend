<template>
  <ClientProfileView v-if="auth.isClient.value" />
  <UserProfileView v-else />
</template>

<script setup lang="ts">
import { auth } from '@/store/auth';
</script>
