<template>
  <Title style="margin-top: 3vh;">
    {{ $t('suscripciones') }}
  </Title>
  <div style="justify-content: center; display: flex;">
    <div style="width: 90%;">
      <div
        class="row plan"
        style="text-transform: uppercase">
        <div
          class="column left">
          <p>
            {{ $t('gratuito') }}
          </p>
        </div>
        <div
          class="column right">
          <p>
            {{ $t('1eventoMensual') }}
          </p>
        </div>
      </div>
      <div
        class="row plan"
        style="text-transform: uppercase">
        <div
          class="column left">
          <p>
            {{ $t('basico') }}
          </p>
        </div>
        <div
          class="column right">
          <p>
            <span class="highlight">{{ $t('dot10') }}</span>&nbsp;{{ $t('eventosMensuales') }}<br />
            <span class="highlight">
              {{ $t('edicionEventos') }}
            </span><br />
            <span class="highlight">
              {{ $t('soporteLimitado') }}
            </span>
          </p>
        </div>
      </div><div
        class="row plan selectedp"
        style="text-transform: uppercase">
        <div
          class="column left">
          <p style="display: flex; align-items: center; justify-content: center;">
            <img
              class="mr-2"
              alt="star"
              src="@/assets/images/star.png"
              style="height: 18px;" />{{ $t('pro') }}<img
                class="ml-2"
                alt="star"
                src="@/assets/images/star.png"
                style="height: 18px;" />
          </p>
        </div>
        <div
          class="column right">
          <p>
            <span class="highlight">{{ $t('eventosIlimitados') }}</span><br />
            {{ $t('edicionEventos') }}<br />
            <span class="highlight">{{ $t('prioridad') }}</span>&nbsp;{{ $t('soporte24h') }}<br />
            <span class="highlight">{{ $t('eventosDestacados') }}<br />
              {{ $t('envioNotificaciones') }}<br />
              {{ $t('funcionesAvanzadas') }}</span>
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
  width: 27%;
  font-weight: bold;
  font-size: clamp(18px, 5.5vw, 25px);
justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 1vh;
}
.right {
  width: 70%;
  font-weight: bold;
  padding: 2%;
  font-size: clamp(14px, 4vw, 18px);
justify-content: left;
  align-items: center;
  display: flex;
  margin-left: 3vw;
  margin-right: -6vw;
}
.row:after {
  content: "";
  display: table;
  clear: both;
  }
.highlight {
  color:rgb(24, 172, 83)
}
.plan{
  border: solid 1px #0e4791;
  border-radius: 25px;
  height: clamp(100px, 24vh, 300px);
  margin-bottom: 2vh;
  justify-content: center;
  display: flex;
}
.selectedp {
  border: solid 5px #0e4791;
  background-color: rgb(255, 247, 236);
}
</style>
