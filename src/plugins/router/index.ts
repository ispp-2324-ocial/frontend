import { useTitle } from '@vueuse/core';
import { computed } from 'vue';
import {
  createRouter,
  createWebHistory
} from 'vue-router';
/**
 * TODO: Implementar cuando el login esté terminado
 */
// Import { loginGuard } from './middlewares/login';
import { metaGuard } from './middlewares/meta';
import { isStr } from '@/utils/validation';

export const router = createRouter({
  history: createWebHistory(),
  routes: [],
  /**
   * TODO: Arreglar esto, de forma que solo se realice el scroll en cuanto Suspense resuelva
   */
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 };
  }
});

/**
 * Lógica de middlewares: El orden ES IMPORTANTE (meta siempre debe ir primero)
 *
 * Cada uno de ellos se ejecutará antes de que accedamos a una ruta.
 */
router.beforeEach(metaGuard);
/**
 * TODO: Reimplementar, de forma que se redirija a la página de inicio si no se ha iniciado sesión
 */
// Router.beforeEach(loginGuard);

/**
 * Reemplaza la función 'back', teniendo en cuenta si hay una página anterior o no.
 * Si no hay una página anterior en el historial, nos aseguramos de que queremos ir a la página de inicio
 * en vez de a una página que esté fuera de la aplicación.
 */
router.back = (): ReturnType<typeof router.back> => {
  const route = router.currentRoute;
  const leaveTransition = 'scroll-x-transition';

  /**
   * Reproduce la misma transición que hacemos en TransitionView.vue (scroll-x-reverse-transition)
   * pero de forma inversa, para reproducir un efecto contrario al ir a la página anterior.
   */
  if (!route.value.meta.transition) {
    route.value.meta.transition = {
      enter: 'scroll-x-reverse-transition',
      leave: leaveTransition
    };
  } else if (!route.value.meta.transition.leave) {
    route.value.meta.transition.leave = leaveTransition;
  }

  window.setTimeout(
    async () =>
      await router.replace(
        isStr(router.options.history.state.back)
          ? router.options.history.state.back
          : '/'
      )
  );
};

/**
 * Gestiona los cambios de título de la página
 */
const pageTitle = computed(() => {
  const title = router.currentRoute.value.meta.title?.trim();

  return title ? `${title} | Ocial` : 'Ocial';
});

useTitle(pageTitle);
