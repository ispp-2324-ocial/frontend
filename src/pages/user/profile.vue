<template>
  <Ondas />
  <div v-if="auth.isLoggedIn.value && !auth.isClient.value">
    <div style="margin-top: 10%;">
      <ul style="list-style-type:none; margin-top: 1vh;">
        <li
          v-for="(item, index) in carProfile"
          :key="index">
          <div class="row mb-7 mr-3">
            <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
              <div
                class="ml-3"
                style="text-align: left; width: 100%;">
                <Title>
                  {{ item.name }}
                </Title>
                <p class="elemento">
                  <b>{{ $t('email:') }}</b> {{ item.email }}
                </p>
                <p class="elemento">
                  <b>{{ $t('localidad:' ) }}</b> {{ item.city }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="mb-7"
      style="width: 100%; margin-top: 30%;">
      <div
        style="justify-content: center; display: flex;"
        @click="Logout()">
        <Boton
          type="rounded-blue"
          class="ocial-button"
          style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
          <div>
            <p>
              {{ $t('cerrarsesion') }}
            </p>
          </div>
        </Boton>
      </div>
    </div>
  </div>
  <div v-else>
    <Title>
      {{ $t('NotLoggedUser') }}
    </Title>
    <Boton
      type="rounded-blue"
      style="margin-top: 5%;display: flex;"
      @click="router.push('/login')">
      {{ $t('iniciaSesion') }}
    </Boton>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { auth } from '@/store/auth';

const router = useRouter();

const carProfile = [
  {
    name: 'Marta García Gómez',
    email: ' alamillo@local.jccm.es',
    city: 'Sevilla'
  }
];

/**
 * Cerrar sesion usuario
 */
async function Logout() : Promise<void> {
  auth.logout();
  await router.push('/login');
}

</script>

<style scoped>
.elemento {
  font-size: clamp(15px, 5.5vw, 30px);
  font-weight: normal;
  width: 90%;
  margin-left: 4vw;
  margin-bottom: 1vh;
  margin-top: 4%;
}
</style>
