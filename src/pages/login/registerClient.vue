<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      v-model="ocialClientDetail.username"
      tipo="text"
      :placeholder="placeholders[0]" />
    <BaseInput
      v-model="ocialClientDetail.name"
      tipo="text"
      :placeholder="placeholders[1]" />
    <BaseInput
      v-model="ocialClientDetail.email"
      tipo="email"
      :placeholder="placeholders[2]" />
    <BaseInput
      v-model="ocialClientDetail.dni"
      tipo="dni"
      :placeholder="placeholders[3]" />
    <BaseInput
      v-model="ocialClientDetail.password"
      tipo="password"
      :placeholder="placeholders[4]" />
    <BaseInput
      v-model="password2"
      tipo="password"
      :validators="[(v: string)=>v===ocialClientDetail.password]"
      :placeholder="placeholders[5]" />
    <select v-model="ocialClientDetail.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category">
        {{ categorias[indice] }}
      </option>
    </select>
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        @change="createImage(image)" />
    </div>
    <Boton
      type="auth"
      @click="createAcc()">
      {{ $t('Crear') }}
    </Boton>
    <p class="message">
      {{ $t('tienesCuenta') }} <a href="/login">{{ $t('iniciaSesion') }}</a>
    </p>
  </form>
</template>

<route lang="yaml">
  meta:
    layout: login
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import imageToBase64 from 'image-to-base64/browser';
import { UsersApi, TypeClientEnum} from '@/api';
import { useApi } from '@/composables/apis';

const password2 = ref('');

const router = useRouter();

const { t } = useI18n();

const image = ref();


const ocialClientDetail = ref(
  {
    username: '',
    name: '',
    email: '',
    dni: '',
    password: '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    category: TypeClientEnum.Artist
  });

const cateEnum = [TypeClientEnum.Artist, TypeClientEnum.BarRestaurant, TypeClientEnum.EventsAndConcerts, TypeClientEnum.LocalGuide, TypeClientEnum.SmallBusiness];

const categorias = computed(() =>
  [t('categoryArtist'),
   t('categoryBarRestaurant'),
   t('categoryEventsAndConcerts'),
   t('categoryLocalGuide'),
   t('categorySmallBusiness')]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {
  console.log(image.value);

  const { data: UserCreated} = await useApi(UsersApi, 'usersClientRegisterCreate')(() => ({
    client: {
      'password': ocialClientDetail.value.password,
      'email': ocialClientDetail.value.email,
      'username': ocialClientDetail.value.username,
      'name': ocialClientDetail.value.name,
      'identificationDocument': ocialClientDetail.value.dni,
      'defaultLatitude': 0,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'typeClient': TypeClientEnum.Artist, //OcialClientDetail.value.category,
      'defaultLongitude':0,
      'djangoUser': 0,
      'imageB64': image.value //Cambiar
    }
  }));

  // Autenticar al cliente
  await router.push('/login');
};

/**
 * Imagen to base64
 */
function createImage(file: string) : void {
  imageToBase64(file) // Path to the image
    .then(
      (response: any) => {
        console.log(response);
        image.value = response; // "cGF0aC90by9maWxlLmpwZw=="
      }
    )
    .catch(
      (error: any) => {
        console.log(error); // Logs an error if there was one
      }
    );
}

const placeholders = computed(() =>
  [t('placeholderUsername'),
   t('placeholderNombre'),
   t('placeholderEmail'),
   t('placeholderDNI'),
   t('placeholderContra'),
   t('placeholderConfirmarContra')]);
</script>

<style scoped>
.form .message {
  color: #3e80d7;
  font-size: 14px;
  margin-top: 1.5vh;
}

.form .message a {
  color: #0e4791;
  text-decoration: underline;
}
</style>
