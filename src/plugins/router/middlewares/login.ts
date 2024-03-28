import type {
  RouteLocationNormalized,
  RouteLocationPathRaw,
  RouteLocationRaw
} from 'vue-router/auto';
import { auth } from '@/store/auth';

const loginUrl = '/login';
const registerUrl = '/login/register';
const homeUrl = '/';
const loginRoutes = new Set([loginUrl, registerUrl]);
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

  return destinationRoute && to.path !== destinationRoute.path
    ? destinationRoute : true;
}
