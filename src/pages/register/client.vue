<template>
  <form @submit.prevent="()=>{}">
    <BaseInput
      v-model="form.username"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[0]" />
    <div class="error">
      {{ getError('username') }}
    </div>
    <BaseInput
      v-model="form.name"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[1]" />
    <div class="error">
      {{ getError('name') }}
    </div>
    <BaseInput
      v-model="form.email"
      tipo="email"
      :is-required="true"
      :placeholder="placeholders[2]" />
    <div class="error">
      {{ getError('email') }}
    </div>
    <BaseInput
      v-model="form.dni"
      tipo="dni"
      :is-required="true"
      :placeholder="placeholders[3]" />
    <div class="error">
      {{ getError('dni') }}
    </div>
    <BaseInput
      v-model="form.password"
      tipo="password"
      :is-required="true"
      :placeholder="placeholders[4]" />
    <div class="error">
      {{ getError('password') }}
    </div>
    <BaseInput
      v-model="form.password2"
      tipo="password"
      :is-required="true"
      :validators="[(v: string)=>v===form.password]"
      :placeholder="placeholders[5]" />
    <div class="error">
      {{ getError('password2') }}
    </div>
    <select v-model="form.category">
      <option
        v-for="(category,indice) in cateEnum"
        :key="category"
        :value="category">
        {{ categorias[indice] }}
      </option>
    </select>
    <div class="error">
      {{ getError('category') }}
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        @change="handleImage" />
    </div>
    <Checkbox v-model="form.acceptCondition">
      {{ $t('accept') }}
      <a
        href="https://ocial.es/privacy"
        style="color:var(--o-color-theme)"
        target="_blank"
        rel="noopener">
        {{ $t('policy') }}
      </a>
      {{ $t('and') }}
      <a
        href="https://ocial.es/customeragreement"
        style="color:var(--o-color-theme)"
        target="_blank"
        rel="noopener">
        {{ $t('terms') }}
      </a>
    </Checkbox>
    <div class="error">
      {{ getError('acceptCondition') }}
    </div>
    <Boton
      type="auth"
      @click="createAcc()">
      {{ $t('Crear') }}
    </Boton>
    <p class="message">
      {{ $t('tienesCuenta') }} <RouterLink
        :to="`/login`">
        {{ $t('iniciaSesion') }}
      </RouterLink>
    </p>
  </form>
</template>

<route lang="yaml">
  meta:
    layout: anonymous
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import { z } from 'zod';
import { UsersApi, TypeClientEnum } from '@/api';
import { useApi } from '@/composables/apis';
import { isNull } from '@/utils/validation';
import { useValidation } from '@/composables/use-validation';

const { t } = useI18n();

const validationSchema = z.object({
  username: z.string().min(1, t('usernameRequired')),
  name: z.string().min(1, t('nameRequired')),
  password: z.string().min(8, t('validPassword')),
  password2: z.string().min(8, t('validPassword')),
  email: z.string().email(t('validEmail')),
  dni: z.string().length(9, t('validDocumentation')),
  category: z.string().min(1, t('categoryRequired')),
  acceptCondition: z.boolean()
}).refine((data) => data.password === data.password2, {
  message: t('passwordMatch'),
  path: ['password2']
}).refine((data) => data.acceptCondition === true, {
  message: t('acceptConditions'),
  path: ['acceptCondition']
});

const form = ref({
  username: '',
  password: '',
  password2: '',
  email: '',
  name: '',
  dni: '',
  category: TypeClientEnum.Artist,
  acceptCondition: false
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

const router = useRouter();

const image = ref('');

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

  await validate();

  if (isValid.value) {
    await useApi(UsersApi, 'usersClientRegisterCreate')(() => ({
      clientCreate: {
        'password': form.value.password,
        'email': form.value.email,
        'username': form.value.username,
        'name': form.value.name,
        'identificationDocument': form.value.dni,
        'defaultLatitude': 0,
        'typeClient': form.value.category, //OcialClientDetail.value.category,
        'defaultLongitude':0,
        'djangoUser': 0,
        'imageB64': image.value == undefined ? '' : image.value //Cambiar
      }
    }));

    // Autenticar al cliente
    await router.push('/login');

  } else {
    scrolltoError('.p-invalid', 24);
  }
};

/**
 * Pasar imagen del input a base64
 */
function handleImage() : void {
  var file = document.querySelector('input[type=file]')['files'][0];

  var reader = new FileReader();

  reader.addEventListener('load', () => {
    image.value = isNull(reader.result) ? undefined : reader.result;

  });
  reader.readAsDataURL(file);
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

.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}
a:hover {
  text-decoration-line: underline;
}
</style>
