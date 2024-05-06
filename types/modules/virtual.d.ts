/// <reference types="vite-plugin-pwa/vue" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:locales/date-fns' {
  import * as locales from 'date-fns/locale';

  export = locales;
}

declare module 'virtual:commit' {
  export const commit_hash: string | undefined;
}

declare module 'virtual:url' {
  export const base_url: string;
}
