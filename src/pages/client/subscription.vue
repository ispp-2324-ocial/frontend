<template>
  <h1 style="text-align: center;">
    Suscripciones
  </h1>
  <div>
    <div>
      <div
        class="row plan">
        <div
          class="column left"
          style="justify-content: center; align-items: center;display: flex;">
          <p>
            GRATUITO
          </p>
        </div>
        <div
          class="column right"
          style="justify-content: left; align-items: center;display: flex; margin-left: 1vh;">
          <p>
            · 1 EVENTO MENSUAL
          </p>
        </div>
      </div>
      <div
        class="row plan">
        <div
          class="column left"
          style="justify-content: center; align-items: center;display: flex;">
          <p>
            BÁSICO
          </p>
        </div>
        <div
          class="column right"
          style="justify-content: left; align-items: center;display: flex; margin-left: 1vh;">
          <p>
            <span class="highlight">· 10</span> EVENTOS MENSUALES<br />
            <span class="highlight">· EDICIÓN DE EVENTOS</span><br />
            <span class="highlight">· SOPORTE 24H LIMITADO</span>
          </p>
        </div>
      </div><div
        class="row plan selectedp">
        <div
          class="column left"
          style="justify-content: center; align-items: center;display: flex;">
          <p>
            <span style="color:rgb(228,210,12); margin-left: -2vh;">✭</span> PRO <span style="color:rgb(228, 210, 12)">✭</span>
          </p>
        </div>
        <div
          class="column right"
          style="justify-content: left; align-items: center;display: flex; margin-left: 1vh;">
          <p>
            <span class="highlight">· EVENTOS ILIMITADOS</span><br />
            · EDICIÓN DE EVENTOS<br />
            <span class="highlight">·</span> SOPORTE 24H <span class="highlight">PRIORITARIO</span><br />
            <span class="highlight">· EVENTOS DESTACADOS<br />· ENVÍO DE NOTIFICACIONES<br />· FUNCIONES AVANZADAS</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
.column {
  float: left;
  width: 40%;
  padding: 10px;
}
.left {
  width: 23%;
  font-weight: bold;
  font-size: clamp(15px, 6vw, 30px);
}
.right {
  width: 57%;
  font-weight: bold;
  padding: 2%;
  font-size: clamp(14px, 3vw, 25px);
}
.row:after {
  content: "";
  display: table;
  clear: both;
  }
.highlight {
  color:rgb(60, 234, 129)
}
.plan{
  border: solid 1px #0e4791;
  border-radius: 25px;
  height: clamp(100px, 22vh, 300px);
  margin-bottom: 1vh;
  justify-content: center;
  display: flex;
}
.selectedp {
  border: solid 5px #0e4791;
  background-color: rgb(255, 247, 236);
}
</style>
