import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Virtual from '@rollup/plugin-virtual';
import Vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import {
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers';
import RadixVueResolver from 'radix-vue/resolver';
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig, type UserConfig } from 'vite';
import { apiRoot, entrypoints, localeFilesFolder, srcRoot } from './scripts/paths';
import { UnpluginVueRouterSyncImportFix } from './scripts/transforms';
import virtualModules from './scripts/virtual-modules';

export default defineConfig(({ mode }): UserConfig => {
  const config: UserConfig = {
    appType: 'spa',
    base: './',
    cacheDir: 'node_modules/.cache/vite',
    plugins: [
      Virtual(virtualModules),
      UnoCSS(),
      VueRouter({
        dts: './types/global/routes.d.ts',
        importMode: 'sync',
        routeBlockLang: 'yaml'
      }),
      VueMacros({
        plugins: {
          vue: Vue()
        }
      }),
      /**
       * Este plugin es el que permite que los componentes se importen de forma automática
       */
      Components({
        dts: './types/global/components.d.ts',
        /**
         * El plugin de los iconos busca iconos de 'unplugin-icons' usando esta convención:
         * {prefix}-{collection}-{icon} e.g. <i-mdi-thumb-up />
         */
        resolvers: [
          IconsResolver(),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
          RadixVueResolver({
            prefix: 'R'
          })
        ]
      }),
      /**
       * Este plugin permite usar todos los iconos de Iconify como componentes de Vue
       * See: https://github.com/antfu/unplugin-icons
       */
      Icons({
        compiler: 'vue3'
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: false,
        forceStringify: true,
        include: localeFilesFolder
      }),
      UnpluginVueRouterSyncImportFix()
    ],
    build: {
      /**
       * Ver main.ts para una explicación de este target
       */
      target: 'es2022',
      /**
       * Desactiva las advertencias de tamaño de los chunks
       */
      chunkSizeWarningLimit: Number.NaN,
      cssMinify: 'lightningcss',
      modulePreload: false,
      reportCompressedSize: false,
      rollupOptions: {
        input: {
          splashscreen: entrypoints.splashscreen,
          main: entrypoints.main,
          index: entrypoints.index
        },
        output: {
          chunkFileNames: (chunkInfo) => {
            /**
             * Este es el valor por defecto: https://rollupjs.org/configuration-options/#output-chunkfilenames
             */
            return chunkInfo.name === 'index' ? 'shared-[hash].js': '[name]-[hash].js';
          },
          validate: true,
          plugins: [
            mode === 'analyze'
              ?
              visualizer({
                open: true,
                filename: 'dist/stats.html'
              })
              : undefined
          ],
          /**
           * Este es lo primero que se debería de debuggear si hay problemas con el bundle. Revisar estos issues:
           * - https://github.com/vitejs/vite/issues/5142
           * - https://github.com/evanw/esbuild/issues/399
           * - https://github.com/rollup/rollup/issues/3888
           */
          manualChunks(id) {
            if (
              id.includes('virtual:locales') ||
              id.includes('@intlify/unplugin-vue-i18n/messages')
            ) {
              return 'locales';
            }
          }
        }
      }
    },
    css: {
      lightningcss: {
        nonStandard: {
          deepSelectorCombinator: true
        },
        targets: browserslistToTargets(browserslist())
      }
    },
    preview: {
      port: 3000,
      strictPort: true,
      host: '0.0.0.0',
      cors: true
    },
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    resolve: {
      alias: {
        '@/api': apiRoot,
        '@/': srcRoot
      }
    },
    worker: {
      format: 'es'
    }
  };

  return config;
});
