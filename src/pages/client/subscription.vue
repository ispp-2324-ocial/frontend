<template>
  <div>
    <Title style="margin-top: 3vh;">
      {{ $t('suscripciones') }}
    </Title>
    <div style="justify-content: center; display: flex;">
      <div style="width: 90%;">
        <Suscripcion :is-plan="true">
          <template #left>
            <span class="price">{{ $t('gratuito') }}</span>
            <br />
            <span class="price">{{ $t('gratis') }}</span>
          </template>
          <template #right>
            {{ $t('1eventoMensual') }}
          </template>
        </Suscripcion>

        <Suscripcion>
          <template #left>
            <span class="price">{{ $t('basico') }}</span>
            <br />
            <span class="price">{{ $t('medio') }}</span>
          </template>
          <template #right>
            <p>
              <span class="highlight">{{ $t('dot10') }}</span>&nbsp;{{ $t('eventosMensuales') }}<br />
              <span class="highlight">
                {{ $t('edicionEventos') }}
              </span><br />
              <span class="highlight">
                {{ $t('soporteLimitado') }}
              </span>
            </p>
          </template>
        </Suscripcion>

        <Suscripcion>
          <template #left>
            <div class="flex flex-row justify-center">
              <OImg
                class="flex-self-center"
                alt="star"
                src="@/assets/images/star.png"
                style="height: 18px;" />
              <p>
                <span class="price">{{ $t('pro') }}</span>
              </p>
              <OImg
                class="flex-self-center"
                alt="star"
                src="@/assets/images/star.png"
                style="height: 18px;" />
            </div>
            <div style="line-height: 130%;">
              <div
                style="display: flex;"
                class="column flex-col">
                <div>
                  <span class="price">{{ $t('caro') }}</span>
                </div>
              </div>
            </div>
          </template>
          <template #right>
            <span class="highlight">{{ $t('eventosIlimitados') }}</span><br />
            {{ $t('edicionEventos') }}<br />
            <span class="highlight">{{ $t('prioridad') }}</span>&nbsp;{{ $t('soporte24h') }}<br />
            <span class="highlight">{{ $t('eventosDestacados') }}<br />
              {{ $t('envioNotificaciones') }}<br />
              {{ $t('funcionesAvanzadas') }}</span>
          </template>
        </Suscripcion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  padding: 10px;
}
.highlight {
  color:rgb(24, 172, 83)
}
.price{
  font-size: clamp(18px, 4.5vw, 25px);
}
</style>
