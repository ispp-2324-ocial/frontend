<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <div class="logo-container">
    <img
      alt="Ocial Logo"
      class="mt-25 mb-8"
      src="@/assets/Texto_Ocial.png"
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
          ¿Ya tienes una cuenta? <a href="#">Inicia sesión</a>
        </p>
      </form>
      <form class="login-form">
        <input
          type="text"
          placeholder="correo electrónico" />
        <input
          type="password"
          placeholder="contraseña" />
        <p
          class="message"
          style="text-align:right;">
          <a href="#">Recuperar contraseña</a>
        </p>
        <button>iniciar sesión</button>
        <p
          class="message"
          style="margin: 15px 0 0;">
          ¿Aún no tienes cuenta? <a href="#">Regístrate</a>
        </p>
      </form>
    </div>
  </div>

  <svg
    class="h-auto -mt-6 w-6/12 absolute right-0 top-0 z-[-1]"
    style="min-width:400px"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 800 800">
    <ellipse
      cx="700"
      cy="100"
      rx="600"
      ry="600"
      fill="currentColor"
      style="color:#c5deff; opacity:0.3" />
    <ellipse
      cx="700"
      cy="100"
      rx="520"
      ry="550"
      fill="currentColor"
      style="color:#c5deff; opacity:0.6" />
    <ellipse
      cx="700"
      cy="100"
      rx="450"
      ry="500"
      fill="currentColor"
      style="color:#c5deff" />
  </svg>
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
}
.login-page {
  width: 90%;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #deecff;
  width: 70%;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  border-radius: 25px;
  border: 2px solid #ffffff;
}
.form input {
  font-family: "OSR", sans-serif;
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
  font-family: "OSR", sans-serif;
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
  font-family: "OSR", sans-serif;
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
  font-family: "OSR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
