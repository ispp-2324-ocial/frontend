<!--TODO: Ajustar slot con el footer-->
<template>
  <div
    class="h-full flex flex-col"
    style="margin-bottom:20%">
    <slot />
  </div>
  <footer
    class="footer">
    <div
      class="flex justify-center -mb-1.6"
      style="background-color: #deecff">
      <div>
        <Boton
          class="h-10vh">
          <div @click="redirectEvent()">
            <img
              alt="Logo Ocial"
              src="@/assets/images/Ocial_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>
      <div>
        <RouterLink
          v-slot="{ navigate }"
          to="/">
          <Boton
            class="h-10vh">
            <div @click="navigate">
              <img
                alt="Mapa Claro"
                src="@/assets/images/Map_Clear.png"
                style="padding: 7%;" />
            </div>
          </Boton>
        </RouterLink>
      </div>
      <div>
        <Boton
          class="h-10vh">
          <div @click="router.push('/profile')">
            <img
              alt="Human Blue"
              src="@/assets/images/Human_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { auth } from '@/store/auth';

const router = useRouter();

/**
 * Redirección botón evento
 */
async function redirectEvent() : Promise<void> {
  if (auth.isClient.value) {
    await router.push('/');
  }
  /*
   * } else {
   *   await router.push('/map'); //TO-DO Debe llevarte a la vista de lista de eventos
   * }
   */
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  transform: translateY(0%);
  z-index: 1000;
}
.footer img {
  width: 50%;
  height: auto;
  margin: auto;
  padding-right: 0%;
}
</style>
