<template>
  <div>
    <div class="footer">
      <div>
        <Boton>
          <div>
            <img
              alt="Logo Ocial"
              class="mt-10"
              src="@/assets/images/Ocial_Clear.png"
              style="padding: 7%; width: 40%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton>
          <div>
            <img
              alt="Mapa Claro"
              class="mt-10"
              src="@/assets/images/Map_Clear.png"
              style="padding: 7%; width: 40%;" />
          </div>
        </Boton>
      </div>

      <div>
        <Boton>
          <div>
            <img
              alt="Human Blue"
              class="mt-10"
              src="@/assets/images/Human_Clear.png"
              style="padding: 7%; width: 40%;" />
          </div>
        </Boton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style scoped>
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
}
.footer img {
  width: 50%;
  height: auto;
  margin: auto;
  padding-right: 0%;
}
</style>
