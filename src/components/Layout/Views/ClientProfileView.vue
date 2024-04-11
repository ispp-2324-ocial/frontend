<template>
  <Ondas />
  <div>
    <div style="margin-top: 10%;">
      <ul style="list-style-type:none; margin-top: 1vh;">
        <li>
          <div class="row mb-7 mr-3">
            <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: center;">
              <div
                class="ml-3"
                style="text-align: center; width: 100%;">
                <Title>
                  {{ loggedClient.name }}
                </Title>
                <div class="flex justify-center items-center pt-12">
                  <BlurhashImage
                    :item="loggedClient.image"
                    class="center img" />
                </div>
                <p class="elemento">
                  <b>{{ loggedDjangoUser.username }}</b>
                </p>
                <p class="elemento">
                  <b>{{ $t('email:') }}</b> {{ loggedDjangoUser.email }}
                </p>
                <p class="elemento">
                  <b>{{ $t('organiza:') }} </b> <span
                    v-for="(category,indice) in cateEnum"
                    :key="category">
                    <span v-if="category == loggedClient.typeClient">
                      {{ categorias[indice] }}
                    </span>
                  </span>
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
        @click="router.push('/client/subscription')">
        <Boton
          type="rounded-blue"
          class="ocial-button"
          style="width: 80%; padding-top: 1vh; padding-bottom: 1vh;">
          <div>
            <p>
              {{ $t('comprobarSuscripcion') }}
            </p>
          </div>
        </Boton>
      </div>
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
  </div>
  <div
    class="mb-7"
    style="width: 100%;">
    <div
      v-if="false"
      style="justify-content: center; display: flex;"
      @click="router.push('/profile/edit')">
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
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { auth } from '@/store/auth';
import { useApi } from '@/composables/apis';
import { UsersApi, TypeClientEnum } from '@/api';


const router = useRouter();

const { t } = useI18n();

const { data: loggedClient } = await useApi(UsersApi, 'usersClientGetRetrieve')();
const { data: loggedDjangoUser } = await useApi(UsersApi, 'usersGetRetrieve')();

const cateEnum = [TypeClientEnum.Artist, TypeClientEnum.BarRestaurant, TypeClientEnum.EventsAndConcerts, TypeClientEnum.LocalGuide, TypeClientEnum.SmallBusiness];

const categorias = computed(() =>
  [t('categoryArtist'),
   t('categoryBarRestaurant'),
   t('categoryEventsAndConcerts'),
   t('categoryLocalGuide'),
   t('categorySmallBusiness')]);
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.elemento {
  font-size: clamp(15px, 5.5vw, 30px);
  font-weight: normal;
  width: 90%;
  margin-left: 4vw;
  margin-bottom: 1vh;
  margin-top: 4%;
}

.img {
  width: 30%;
  border-radius: 50%;
  max-width: 220px;
  max-height: 220px;
  min-width: 90px;
  min-height: 90px;
  margin: 16px
}
</style>
