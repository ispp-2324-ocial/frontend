import type {
  RouteLocationNormalized,
  RouteLocationPathRaw,
  RouteLocationRaw
} from 'vue-router/auto';
import { auth } from '@/store/auth';
import { useToast } from '@/composables/use-toast';
import { i18n } from '@/plugins/i18n';

const loginUrl = '/login';
const homeUrl = '/';
const loginRoutes = new Set([loginUrl, '/register', '/register/client']);
const routes = new Set([...loginRoutes, homeUrl]);

/**
 * Redirects to login page if there's no user logged in.
 */
export function loginGuard (
  to: RouteLocationNormalized
): boolean | RouteLocationRaw {
  let destinationRoute: RouteLocationPathRaw| undefined;

  if (!auth.isLoggedIn.value && !auth.isClient.value && !routes.has(to.path)) {
    destinationRoute = { path: loginUrl, replace: true };
  } else if (auth.isLoggedIn.value && auth.isClient.value && loginRoutes.has(to.path)) {
    destinationRoute = { path: homeUrl, replace: true };
  }

  if (destinationRoute && to.path !== destinationRoute.path) {
    useToast(i18n.t('NotLogged'), 'error');

    return destinationRoute;
  }

  return true;
}
