import type { Plugin } from 'vite';

/**
 * Hacky workaround until HMR in sync mode is fixed, see: https://github.com/posva/unplugin-vue-router/issues/132
 */
export function UnpluginVueRouterSyncImportFix(): Plugin {
  return {
    name: 'unplugin-vue-router-sync-import-fix',
    transform(code: string, id: string): { code: string } | void {
      if (id === 'virtual:vue-router/auto') {
        return {
          code: code.replace('extendRoutes(routes) : routes', 'extendRoutes(routes()) : routes()')
        };
      }

      if (id === 'virtual:vue-router/auto-routes') {
        return {
          code: code.replace('export const routes = [', 'export const routes = () => [')
        };
      }
    }
  };
}
