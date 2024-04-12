<template>
  <div>
    <Title style="margin-top: 3vh;">
      {{ $t('suscripciones') }}
    </Title>
    <div style="justify-content: center; display: flex;">
      <div style="width: 90%;">
        <div @click="planFree()">
          <Suscripcion :is-plan="subsEnum[0] == currentSubscription.typeSubscription">
            <template #left>
              <span class="price">{{ $t('gratuito') }}</span>
              <br />
              <span class="price">{{ $t('gratis') }}</span>
            </template>
            <template #right>
              {{ $t('1eventoMensual') }}
            </template>
          </Suscripcion>
        </div>
        <div @click="planBasic()">
          <Suscripcion :is-plan="subsEnum[1] == currentSubscription.typeSubscription">
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
        </div>
        <div @click="planPro()">
          <Suscripcion :is-plan="subsEnum[2] == currentSubscription.typeSubscription">
            <template #left>
              <div class="flex flex-row justify-center">
                <img
                  class="flex-self-center"
                  alt="star"
                  src="@/assets/images/star.png"
                  style="height: 18px;" />
                <p>
                  <span class="price">{{ $t('pro') }}</span>
                </p>
                <img
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
                {{ $t('funcionesAvanzadas') }}</span>
            </template>
          </Suscripcion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { SubscriptionApi, TypeSubscriptionEnum } from '@/api';
import { useApi } from '@/composables/apis';

const router = useRouter();

const { data : currentSubscription } = await useApi(SubscriptionApi, 'subscriptionGetRetrieve')(() => ({}));
const subsEnum = [TypeSubscriptionEnum.Free, TypeSubscriptionEnum.Basic, TypeSubscriptionEnum.Pro ];


/**
 * Función para el planFree
 */
async function planFree() : Promise<void> {
  if (subsEnum[0] != currentSubscription.value.typeSubscription) {
    //Const { data : redToURL } = await useApi(PaymentApi, 'subscriptionGetRetrieve')(() => ({}));
    await router.push('/cancelPlan');
    //window.open('https://www.google.com/', '_blank');

  }
};

/**
 * Función para el planBasic
 */
async function planBasic() : Promise<void> {
  if (subsEnum[2] == currentSubscription.value.typeSubscription) {
    await router.push('/cancelPlan');
  } else if (subsEnum[0] == currentSubscription.value.typeSubscription) {
    //Await router.push('/upgradePlan');
    window.open('https://www.google.com/', '_blank');
  }
};

/**
 * Función para el planPro
 */
async function planPro() : Promise<void> {
  if (subsEnum[1] == currentSubscription.value.typeSubscription) {
    await router.push('/cancelPlan');
  } else if (subsEnum[0] == currentSubscription.value.typeSubscription) {
    //Await router.push('/upgradePlan');
    window.open('https://www.google.com/', '_blank');
  }
};

</script>

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
