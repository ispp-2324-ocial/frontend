import { reactive } from 'vue';
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteMeta
} from 'vue-router';
import { defuSchema } from '@/utils/data-manipulation';

const defaultMeta: RouteMeta = {
  layout: 'default',
  transparentLayout: false,
  admin: false,
  backdrop: {
    opacity: 0.25
  }
};

/**
 * Este middleware gestiona la propiedad meta entre rutas
 *
 * El diseño de la página de destino necesita existir antes de que se acceda a la ruta.
 * Es por eso que necesitamos el siguiente bloque en las páginas:
 *
 * <route lang="yaml">
 *  meta:
 *    layout: login
 * </route>
 *
 * Ese bloque también es necesario cuando una propiedad necesita resolverse antes
 * de que se instancie el componente (por ejemplo, la propiedad transition.enter, para que se muestre la animación correcta)
 *
 * Ese bloque rellena la propiedad meta a través de Vite en tiempo de compilación, por lo que la
 * instanciación de Vue Router sería tal que así: https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
 *
 * Si queremos cambiar 'meta' en tiempo de ejecución (para el título de la página, el fondo, etc.), necesitamos fusionar
 * cualquier valor predeterminado que se defina en el bloque de ruta con nuestras propiedades personalizadas y hacerlo reactivo. Para asegurar
 * la consistencia, pasamos un objeto con valores predeterminados que coinciden con el tipo *RouteMeta*,
 * presente en el archivo plugins.d.ts
 */
export function metaGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): boolean | RouteLocationRaw {
  to.meta = reactive<RouteMeta>(defuSchema(to.meta, defaultMeta));

  if (from.meta.transition?.leave) {
    if (to.meta.transition) {
      to.meta.transition.enter = from.meta.transition.leave;
    } else {
      to.meta.transition = { enter: from.meta.transition.leave };
    }
  }

  return true;
}
