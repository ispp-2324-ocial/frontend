declare module 'virtual:locales/date-fns' {
  import * as locales from 'date-fns/locale';

  export = locales;
}

declare module 'virtual:commit' {
  export const commit_hash: string | undefined;
}
