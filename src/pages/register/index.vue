<template>
  <form @submit.prevent="() => {}">
    <BaseInput
      v-model="form.username"
      tipo="text"
      :is-required="true"
      :placeholder="placeholders[0]" />
    <div class="error">
      {{ getError('username') }}
    </div>
    <BaseInput
      v-model="form.email"
      :is-required="true"
      tipo="email"
      :placeholder="placeholders[1]" />
    <div class="error">
      {{ getError('email') }}
    </div>
    <BaseInput
      v-model="form.password"
      tipo="password"
      :is-required="true"
      :placeholder="placeholders[2]" />
    <div class="error">
      {{ getError('password') }}
    </div>
    <BaseInput
      v-model="form.password2"
      tipo="password"
      :is-required="true"
      :validators="[(v)=>v===form.password]"
      :placeholder="placeholders[3]" />
    <div class="error">
      {{ getError('password2') }}
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
      class="boton"
      type="auth"
      @click="createAcc()">
      {{ $t('Crear') }}
    </Boton>
    <Boton
      type="auth"
      @click="router.push('/register/client')">
      {{ $t('cuentaCliente') }}
    </Boton>
  </form>
  <p class="message">
    {{ $t('tienesCuenta') }}
    <RouterLink
      to="/login">
      {{ $t('iniciaSesion') }}
    </RouterLink>
  </p>
</template>

<route lang="yaml">
  meta:
    layout: anonymous
</route>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { useValidation } from '@/composables/use-validation';
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';

const { t } = useI18n();

const validationSchema = z.object({
  username: z.string().min(1, t('usernameRequired')),
  password: z.string().min(8, t('validPassword')),
  password2: z.string().min(8, t('validPassword')),
  email: z.string().email(t('validEmail')),
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
  acceptCondition: false
});

const { validate, isValid, getError, scrolltoError } = useValidation(validationSchema, form, {
  mode: 'lazy'
});

const router = useRouter();

/**
 * Esta función crea un usuario
 */
async function createAcc() : Promise<void> {

  await validate();

  if (isValid.value) {
    const { response: r } = await useApi(UsersApi, 'usersUserRegisterCreate')(() => ({
      user: {
        'password': form.value.password,
        'email': form.value.email,
        'username': form.value.username,
        'lastKnowLocLat': 0, //TO-DO mejorar
        'lastKnowLocLong': 0,
        'djangoUser': 1
      }
    }));

    console.log(r.value); //Sigue sin pasar por aqui y no puedo comprobar el error

    await router.push('/login');
  } else {
    scrolltoError('.p-invalid', 24);
  }
};

const placeholders = computed(() =>
  [t('placeholderUsername'),
   t('placeholderEmail'),
   t('placeholderContra'),
   t('placeholderConfirmarContra')]);
</script>

<style scoped>
.boton{
  margin-bottom: 1vh;
}

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
