<template>
  <Ondas />
  <div style="margin-top: 10%;">
    <ul style="list-style-type:none; margin-top: 1vh;">
      <li>
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
            <div
              class="ml-3"
              style="text-align: center; width: 100%;">
              <Title>
                {{ auth.user.value?.username }}
              </Title>
              <p class="elemento">
                <b>{{ $t('email:') }}</b> {{ auth.user.value?.email }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div
    class="mb-7"
    style="width: 100%;">
    <div
      style="justify-content: center; display: flex;"
      @click="auth.logout">
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
  <div
    class="mb-7"
    style="width: 100%;">
    <div
      v-if="false"
      style="justify-content: center; display: flex;"
      @click="router.push('/user/editProfile')">
      <Boton
        type="rounded-blue"
        class="ocial-button"
        style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
        <div>
          <p>
            {{ $t('editarPerfil') }}
          </p>
        </div>
      </Boton>
    </div>
  </div>

  <div
    style="justify-content: center; display: flex;"
    @click="deleteAccountMessage">
    <Boton
      type="rounded-red"
      class="ocial-button"
      style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
      <div>
        <p>
          {{ $t('eliminarCuenta') }}
        </p>
      </div>
    </Boton>
  </div>
</template>


<script setup lang="ts">
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router/auto';
import { auth } from '@/store/auth';

const { t } = useI18n();
const router = useRouter();

/**
 * Esta función se encarga de preguntar al usuario si quiere borrar su cuenta con un mensaje
 */
async function deleteAccountMessage() : Promise<void> {
  await Swal.fire({
    title: t('deleteAccountMessageTitle'),
    text: t('deleteAccountMessageText'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#910e38',
    cancelButtonColor: '#0e4781',
    confirmButtonText: t('deleteAccountMessageConfirm'),
    cancelButtonText: t('deleteAccountMessageCancel')
  }).then(async (res) => {
    if (res.isConfirmed) {
      await Swal.fire({
        title: t('deleteAccountMessageConfirmedTitle'),
        text: t('deleteAccountMessageConfirmedText'),
        icon: 'success'
      });
      auth.logout();

      return 'Account deleted';
    } else {
      return 'Account deletion cancelled';
    }
  });
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
