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
      <form class="register-form">
        <input
          type="text"
          placeholder="nombre" />
        <input
          type="text"
          placeholder="correo electrónico" />
        <input
          type="password"
          placeholder="contraseña" />
        <input
          type="password"
          placeholder="confirmar contraseña" />
        <button>create</button>
        <p class="message">
          {{ $t('tienesCuenta') }} <a href="#">{{ $t('iniciaSesion') }}</a>
        </p>
      </form>
      <form class="login-form">
        <input
          type="text"
          placeholder="correo electrónico" />
        <input
          type="password"
          placeholder="contraseña" />
        <button>{{ $t('iniciarSesion') }}</button>
        <p
          class="message"
          style="margin: 15px 0 0;">
          {{ $t('noTienesCuenta') }} <a href="#">{{ $t('registrate') }}</a>
        </p>
      </form>
    </div>
  </div>

  <div class="container3">
    <img
      alt="Ocial Logo"
      src="@/assets/images/Logo_Ocial.png"
      style="width:20%; height: auto; margin-top: -5vh;" />
  </div>
  <slot />
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
.form input {
  outline: 0;
  background: #ffffff;
  width: 100%;
  border: 2px solid #3e80d7;
  border-radius: 15px;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
}
.form button {
  text-transform: uppercase;
  background: #aacfff;
  width: 100%;
  border: 2px solid #3e80d7;
  padding: 15px;
  border-radius: 15px;
  font-size: 16px;
  margin: auto;
  text-align: center;
}

.form .message {
  color: #3e80d7;
  font-size: 14px;
}
.form .message a {
  color: #0e4791;
  text-decoration: underline;
}
.form .register-form {
  display: none;
}

body {
  background: #3e80d7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1%;
  }
</style>
