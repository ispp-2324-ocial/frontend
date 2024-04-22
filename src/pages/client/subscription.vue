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
                <OImg
                  class="flex-self-center"
                  alt="star"
                  :src="Star"
                  style="height: 18px;" />
                <p>
                  <span class="price">{{ $t('pro') }}</span>
                </p>
                <OImg
                  class="flex-self-center"
                  alt="star"
                  :src="Star"
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
              <span class="highlight">{{ $t('eventosDestacados') }}</span>
            </template>
          </Suscripcion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { SubscriptionApi, PaymentsApi, TypeSubscriptionEnum, PaymentsCreateCheckoutSessionCreateTypeEnum } from '@/api';
import { useApi } from '@/composables/apis';
import Star from '@/assets/images/star.png';

const { data : currentSubscription } = await useApi(SubscriptionApi, 'subscriptionRetrieve')(() => ({}));
const subsEnum = [
  TypeSubscriptionEnum.Free,
  TypeSubscriptionEnum.Basic,
  TypeSubscriptionEnum.Pro
];
const payEnum = [
  PaymentsCreateCheckoutSessionCreateTypeEnum.Basic,
  PaymentsCreateCheckoutSessionCreateTypeEnum.Pro
];
const router = useRouter();
const subscriptionRoute = '/client/subscription';

/**
 * Función para el planFree
 */
async function planFree() : Promise<void> {
  if (subsEnum[0] != currentSubscription.value.typeSubscription) {
    await useApi(PaymentsApi, 'paymentsCancelDestroy')();

    await router.push(subscriptionRoute);
  }
};

/**
 * Función para el planBasic
 */
async function planBasic() : Promise<void> {
  if (subsEnum[2] == currentSubscription.value.typeSubscription) {
    await useApi(PaymentsApi, 'paymentsCancelDestroy')();

    await router.push(subscriptionRoute);
  } else if (subsEnum[0] == currentSubscription.value.typeSubscription) {
    const { data: paymentUrl } = await useApi(PaymentsApi, 'paymentsCreateCheckoutSessionCreate')(() => ({
      type: payEnum[0] }));

    window.open(String(paymentUrl.value.redirect_url), '_blank');
  }
};

/**
 * Función para el planPro
 */
async function planPro() : Promise<void> {
  if (subsEnum[1] == currentSubscription.value.typeSubscription) {
    await useApi(PaymentsApi, 'paymentsCancelDestroy')();

    await router.push(subscriptionRoute);
  } else if (subsEnum[0] == currentSubscription.value.typeSubscription) {
    const { data: paymentUrl } = await useApi(PaymentsApi, 'paymentsCreateCheckoutSessionCreate')(() => ({
      type: payEnum[1] }));

    window.open(String(paymentUrl.value.redirect_url), '_blank');
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
