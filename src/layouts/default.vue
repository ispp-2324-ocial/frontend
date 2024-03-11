<template>
  <slot />
  <div>
    <div
      class="footer -mb-1.6"
      style="background-color: #deecff; justify-content: center;">
      <div>
        <Boton
          type="default"
          class="h-10vh">
          <div @click="router.push('/client')">
            <img
              alt="Logo Ocial"
              src="@/assets/images/Ocial_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton
          type="default"
          class="h-10vh">
          <div @click="router.push('/client/map')">
            <img
              alt="Mapa Claro"
              src="@/assets/images/Map_Clear.png"
              style="padding: 7%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton
          type="default"
          class="h-10vh">
          <div @click="router.push('/client/profile')">
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

</script>
<script setup lang="ts">


const router = useRouter();
</script>

<style scoped>
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
