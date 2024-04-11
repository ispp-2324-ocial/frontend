<template>
  <footer
    class="footer">
    <div
      class="flex justify-center m-0"
      style="background-color: #deecff">
      <Boton
        @click="router.push('/event')">
        <OImg
          class="img"
          alt="Logo Ocial"
          src="@/assets/images/Ocial_Clear.png" />
      </Boton>
      <Boton
        @click="router.push('/')">
        <OImg
          class="img"
          alt="Mapa Claro"
          src="@/assets/images/Map_Clear.png" />
      </Boton>
      <Boton
        @click="router.push('/profile')">
        <OImg
          class="img"
          alt="Human Blue"
          src="@/assets/images/Human_Clear.png" />
      </Boton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

const router = useRouter();

</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  transform: translateY(0%);
  z-index: 1004;
}

.footer .img {
  width: 50%;
  height: auto;
  margin: auto;
  padding: 7%;
  padding-right: 0%;
}
</style>
