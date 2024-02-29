<template>
  <div>
    <div class="footer">
      <div
        class="image-container -mb-7"
        style="border-right: 5px solid #0e4791">
        <img
          alt="Logo Ocial"
          class="mt-10"
          src="@/assets/images/Ocial_Blue.png" />
      </div>

      <div class="image-container2 -mb-7">
        <img
          alt="Mapa Claro"
          class="mt-10"
          src="@/assets/images/Map_Clear.png" />
      </div>

      <div
        class="image-container -mb-7"
        style="border-left: 5px solid #0e4791">
        <img
          alt="Persona"
          class="mt-10"
          src="@/assets/images/Human_Blue.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FooterComponent'

};
</script>

<style scoped>
/* Estilos para el contenedor del footer */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f800;
  padding-left: 0%;
  padding-right: 50%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 7%;
}

.image-container {
  background-color: lightblue;
  padding: 10px;
  flex-grow: 1;
}
.image-container2 {
  background-color: #3e80d7;
  padding: 10px;
  flex-grow: 1;
}

/* Estilos para las imÃ¡genes */
.footer img {
  width: 50%;
  height: auto;
  margin: auto;
  padding-left: 25%;
  padding-right: 0%;
}
</style>
