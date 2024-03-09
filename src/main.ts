/**
 * Top-level await requiere ES2022 (al menos) como target y module
 * para el compilador de TypeScript (revisar tsconfig.json)
 * https://caniuse.com/mdn-javascript_operators_await_top_level
 */

import { createApp } from 'vue';
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-expect-error - Comprobar si se puede hacer PR para resolver este error
import { routes } from 'vue-router/auto-routes';
import Root from '@/App.vue';
import { hideDirective } from '@/plugins/directives';
import { vuePlugin as i18n } from '@/plugins/i18n';
import { router } from '@/plugins/router';


/**
 * - ESTILOS GLOBALES -
 */
import 'inter-ui/inter-variable.css';
import '@/assets/styles/global.css';
import 'virtual:uno.css';

/**
 * - PLUGINS DE VUE Y DIRECTIVAS -
 * El orden en el que se declaran es IMPORTANTE y es el mismo orden en el que se instancian.
 */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
const app = createApp(Root);

/**
 * Añadimos las rutas en este punto, en lugar de en el plugin de router, para evitar referencias circulares.
 * Aquí ya estamos seguros de que todas las dependencias de las rutas estan instanciadas.
 */
for (const route of routes) {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
  router.addRoute(route);
}

app.use(i18n);
app.use(router);
app.directive('hide', hideDirective);

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
