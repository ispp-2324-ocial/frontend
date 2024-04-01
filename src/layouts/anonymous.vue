<template style="display: block; justify-content: center">
  <Ondas />
  <div class="logo-container">
    <img
      alt="Ocial Name Logo"
      class="logo"
      src="@/assets/images/Texto_Ocial.png"
      style="width:70%; height: auto;" />
  </div>

  <div class="login-page">
    <div class="form">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  margin-bottom: 4vh;
}

.login-page {
  width: 100%;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #deecff;
  width: 80%;
  margin: 0 auto 2vh;
  padding: 45px;
  text-align: center;
  border-radius: 25px;
  border: 2px solid #ffffff;
}
</style>
