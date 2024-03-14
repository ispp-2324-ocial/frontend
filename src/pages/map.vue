<template>
  <LMap :markers="eventList" />
</template>

<script setup lang="ts">
import { useEvent } from '@/composables/apis';
import { EventApi } from '@/api';

const { data: eventList } = await useEvent(EventApi, 'eventListList')();

</script>
