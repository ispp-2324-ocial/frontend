<template>
  <FooterComponent>
    <div class="flex flex-col justify-around items-center gap-4 bg-gray-200 p-5">
      <div
        class="card"
        @click="redirectTo('/client/events')">
        <h2>Tus Eventos</h2>
        <p>Lista todos tus eventos</p>
      </div>

      <div
        class="card"
        @click="redirectTo('/client/createEvent')">
        <h2>Crear Eventos</h2>
        <p>Crear un nuevo evento</p>
      </div>

      <div
        class="card"
        @click="redirectTo('/client/profile')">
        <h2>Tu perfil</h2>
        <p>Consulta todos los detalles de tu perfil</p>
      </div>
    </div>
  </FooterComponent>
</template>

<script setup lang="ts">
import FooterComponent from '@/layouts/default.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 *
 */
function redirectTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
.card {
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.card:hover {
  background-color: #eee;
}
</style>
