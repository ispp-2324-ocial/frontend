import type en from '@/../locales/en.json';

/**
 * The object that represents RouteMeta is defined at @/plugins/vue/router/middleware/meta
 */
interface BackdropPayload {
  blurhash?: string;
  opacity?: number;
}
interface RouteTransition {
  enter: string;
  leave?: string;
}
declare module 'vue-router' {
  interface RouteMeta {
    readonly layout: 'default' | 'anonymous';
    transparentLayout?: boolean;
    transition?: RouteTransition;
    readonly admin: boolean;
    title?: string | null;
    backdrop: BackdropPayload;
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

