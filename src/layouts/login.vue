<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template style="display: block; justify-content: center">
  <Ondas />
  <div class="logo-container">
    <img
      alt="Ocial Name Logo"
      class="mt-15 mb-8"
      src="@/assets/images/Texto_Ocial.png"
      style="width:70%; height: auto;" />
  </div>

  <div class="login-page">
    <div class="form">
      <slot />
    </div>
  </div>

  <div class="container3">
    <img
      alt="Ocial Logo"
      src="@/assets/images/Logo_Ocial.png"
      style="width:20%; height: auto; margin-top: -5vh;" />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.logo-container {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
}

.login-page {
  width: 100%;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #deecff;
  width: 80%;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  border-radius: 25px;
  border: 2px solid #ffffff;
}

.container3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1%;
  }
</style>
