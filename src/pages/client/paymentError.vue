<template>
  <Ondas />
  <div class="texto">
    <Title>
      {{ t('haHabidoUnError') }}
    </Title>
  </div>
  <div class="texto">
    <p style="margin-top: -8vh; color: red; font-size: 15vw; font-weight: bolder;">
      {{ t('crossIcon') }}
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
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router/auto';

const router = useRouter();

const { t } = useI18n();
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
