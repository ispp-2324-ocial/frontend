/**
 * Top-level await requiere ES2022 (al menos) como target y module
 * para el compilador de TypeScript (revisar tsconfig.json)
 * https://caniuse.com/mdn-javascript_operators_await_top_level
 */

import { createApp } from 'vue';
import vue3GoogleLogin from 'vue3-google-login';
import Root from '@/App.vue';
import { hideDirective } from '@/plugins/directives';
import { vuePlugin as i18n } from '@/plugins/i18n';
import { router } from '@/plugins/router';
/**
 * TODO: Eliminar de aquí una vez se importe el store
 * en alguna parte del código.
 */
import '@/store/clientSettings';

/**
 * - ESTILOS GLOBALES -
 */
import 'inter-ui/inter-variable.css';
/**
 *  Unocss already includes the reset, no need of @unocss/reset
 */
/* eslint-disable-next-line import/no-extraneous-dependencies */
import '@unocss/reset/tailwind.css';
import '@/assets/styles/global.css';
import 'virtual:uno.css';
import 'sweetalert2/dist/sweetalert2.css';

/**
 * - PLUGINS DE VUE Y DIRECTIVAS -
 * El orden en el que se declaran es IMPORTANTE y es el mismo orden en el que se instancian.
 */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
const app = createApp(Root);

app.use(i18n);
app.use(router);
app.directive('hide', hideDirective);
app.use(vue3GoogleLogin, {
  clientId: '224489231445-sim93fap18uklaoh054aiteh8r24m5v3.apps.googleusercontent.com'
});
/**
 * Esto asegura que la transición se ejecute: https://router.vuejs.org/guide/migration/#all-navigations-are-now-always-asynchronous
 */
await router.isReady();

/**
 * PUNTO DE MONTAJE
 *
 * Lee App.vue para entender cómo se completa la pantalla de carga.
 */
window.requestAnimationFrame(() => {
  app.mount('#app');
});
