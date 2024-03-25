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
      :validators="[(v)=>v===ocialClientDetail.password]"
      :placeholder="placeholders[5]" />
    <select v-model="ocialClientDetail.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category">
        {{ categorias[indice] }}
      </option>
    </select>
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
import { UsersApi, type LoginUser, TypeClientEnum} from '@/api';
import { useApi } from '@/composables/apis';

const password2 = ref('');

const router = useRouter();

const { t } = useI18n();

const ocialClientDetail = ref(
  {
    username: '',
    name: '',
    email: '',
    dni: '',
    password: '',
    category: TypeClientEnum._0
  });

const cateEnum = [CategoryEnum.Sports, CategoryEnum.Music, CategoryEnum.Markets, CategoryEnum.RelaxActivities, CategoryEnum.LiveConcert];

const categorias = computed(() =>
  [t('categoryDeporte'),
   t('categoryMusica'),
   t('categoryMercado'),
   t('categoryRelax'),
   t('categoryConcierto')]);

/**
 * Esta función guarda la información en la base de datos y luego redirige a otra vista
 * Cuando se fusione con back hay que añadir en la primera línea este código
 * This.finds.push({ value: '' });
 */
async function createAcc() : Promise<void> {

  const { data: UserCreated} = await useApi(UsersApi, 'usersClientRegisterCreate')(() => ({
    client: {
      'password': ocialClientDetail.value.password,
      'email': ocialClientDetail.value.email,
      'username': ocialClientDetail.value.username,
      'name': ocialClientDetail.value.name,
      'identification_document': ocialClientDetail.value.dni,
      'typeClient': TypeClientEnum._0,
      'default_latitude': 0,
      'default_longitude': 0,
      'usuario': 0
    }
  }));

  console.log(UserCreated.value);
  // Autenticar al cliente
  await router.push('/client/createEvent');
};

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
