import { useTitle } from '@vueuse/core';
import { computed, watch } from 'vue';
import {
  createRouter,
  createWebHashHistory
} from 'vue-router/auto';
import { loginGuard } from './middlewares/login';
import { metaGuard } from './middlewares/meta';
import { auth } from '@/store/auth';
import { isStr } from '@/utils/validation';

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 };
  }
});

/**
 * Lógica de middlewares: El orden ES IMPORTANTE (meta siempre debe ir el último)
 *
 * Cada uno de ellos se ejecutará antes de que accedamos a una ruta.
 */
router.beforeEach(loginGuard);
router.beforeEach(metaGuard);

/**
 * Reemplaza la función 'back', teniendo en cuenta si hay una página anterior o no.
 * Si no hay una página anterior en el historial, nos aseguramos de que queremos ir a la página de inicio
 * en vez de a una página que esté fuera de la aplicación.
 */
const backTransition = 'slide-x';

router.back = (): ReturnType<typeof router.back> => {
  const route = router.currentRoute;

  /**
   * Reproduce la misma transición que hacemos al navegar a una página,
   * pero a la inversa, para reproducir un efecto diferente cuando vamos a la página
   * anterior
   */
  if (!route.value.meta.transition) {
    route.value.meta.transition = {
      enter: 'slide-x-reverse',
      leave: backTransition
    };
  } else if (!route.value.meta.transition.leave) {
    route.value.meta.transition.leave = backTransition;
  }

  void router.replace(
    isStr(router.options.history.state.back)
      ? router.options.history.state.back
      : '/'
  );
};

/**
 * Este watcher redirige al usuario a la página de inicio de sesión si no está autenticado.
 *
 * A diferencia del middleware, este watcher se ejecuta al momento de cambiar el estado de la autenticación,
 * sin importar si se ha ejecutado una navegación o no.
 *
 * Igualmente, ambos son necesarios: https://github.com/ispp-2324-ocial/frontend/pull/104#pullrequestreview-1964894975
 */
watch(auth.isLoggedIn, async () => {
  if (!auth.isLoggedIn.value) {
    await router.replace('/login');
  }
});

/**
 * Gestiona los cambios de título de la página
 */
const pageTitle = computed(() => {
  const title = router.currentRoute.value.meta.title?.trim();

  return title ? `${title} | Ocial` : 'Ocial';
});

useTitle(pageTitle);
