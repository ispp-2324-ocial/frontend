import type en from '@/../locales/en.json';
import type { OTransitionProps } from '@/components/lib/OTransition.vue';

/**
 * The object that represents RouteMeta is defined at @/plugins/vue/router/middleware/meta
 */
interface BackdropPayload {
  blurhash?: string;
  opacity?: number;
}
interface RouteTransition {
  enter: NonNullable<OTransitionProps['name']>;
  leave?: OTransitionProps['name'];
}

declare module 'vue-router' {
  interface RouteMeta {
    readonly layout: 'default' | 'anonymous';
    transition?: RouteTransition;
    readonly admin: boolean;
    title?: string | null;
  }
}

declare module 'vue-i18n' {
  type messages = typeof en;

  export interface DefineLocaleMessage extends messages {}
}

/**
 * This is important: https://stackoverflow.com/a/64189046
 * https://www.typescriptlang.org/docs/handbook/modules.html
 */

export { };

