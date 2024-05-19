<template>
  <Ondas />
  <div class="texto">
    <Title>
      {{ t('suscripcionCompletada') }} {{ currentSubscription.typeSubscription }}{{ t('planFiller') }}
    </Title>
  </div>
  <div class="texto">
    <p style="margin-top: -8vh; color: green; font-size: 15vw; font-weight: bolder;">
      {{ t('tickIcon') }}
    </p>
  </div>
  <div
    style="justify-content: center; display: flex;"
    @click="router.push('/client/subscription')">
    <Boton
      type="rounded-blue"
      class="ocial-button"
      style="width: 70%; padding-top: 1vh; padding-bottom: 1vh;">
      <div>
        <p>
          {{ $t('volver') }}
        </p>
      </div>
    </Boton>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { i18n } from '@/plugins/i18n';
import { SubscriptionApi } from '@/api';
import { useApi } from '@/composables/apis';

const router = useRouter();

const { data : currentSubscription } = await useApi(SubscriptionApi, 'subscriptionRetrieve')(() => ({}));

const { t } = i18n;
</script>

<style scoped>
.texto {
  margin: 15% 10% 10% 10%;
  display:flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
