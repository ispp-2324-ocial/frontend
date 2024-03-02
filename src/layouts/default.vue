<template>
  <div
    class="slot mt-4 bgcolor">
    <slot />
  </div>

  <div>
    <div
      class="footer"
      style="background-color: #deecff; justify-content: center;">
      <div>
        <Boton class="h-10vh">
          <div @click="redirectTo('/client')">
            <img
              alt="Logo Ocial"
              src="@/assets/images/Ocial_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton class="h-10vh">
          <div @click="redirectTo('/client/map')">
            <img
              alt="Mapa Claro"
              src="@/assets/images/Map_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton class="h-10vh">
          <div @click="redirectTo('/client/profile')">
            <img
              alt="Human Blue"
              src="@/assets/images/Human_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import Boton from '@/components/Boton.vue';

export default {
  name: 'FooterComponent',
  components: {Boton}
};


</script>
<script setup lang="ts">


const router = useRouter();

/**
 *
 */
function redirectTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
.slot {
  height: 100%;
  width: 100%;
  background-color: #deecff;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.footer img {
  width: 50%;
  height: auto;
  margin: auto;
  padding-right: 0%;
}
</style>
