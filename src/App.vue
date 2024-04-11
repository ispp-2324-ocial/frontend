<template>
  <div class="ocial-app h-full w-full flex-col min-h-dvh relative">
    <RouterView v-slot="{ Component, route }">
      <TransitionView>
        <Suspense @resolve="apploaded = true">
          <div
            :key="route.meta.layout"
            class="flex h-full w-full flex-col origin-center min-h-dvh relative">
            <component
              :is="getLayoutComponent(route.meta.layout)"
              :key="route.meta.layout">
              <TransitionView>
                <Suspense suspensible>
                  <div
                    :key="route.path"
                    class="flex h-full w-full flex-col origin-center min-h-dvh relative">
                    <component
                      :is="Component"
                      :key="route.path" />
                  </div>
                </Suspense>
              </TransitionView>
            </component>
          </div>
        </Suspense>
      </TransitionView>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { shallowRef, type Component as VueComponent } from 'vue';
import type { RouteMeta } from 'vue-router/auto';
import DefaultLayout from '@/layouts/default.vue';
import AnonymousLayout from '@/layouts/anonymous.vue';

const apploaded = shallowRef(false);

/**
 * - ELIMINACIÓN DE LA PANTALLA DE CARGA REMOVAL -
 *
 * Sin window.setTimeout y window.requestAnimationFrame, la pantalla de carga se congela un pequeño (pero notable) tiempo.
 *
 * En cuanto alcanzamos este punto, todas las dependencias asíncronas estarán completamente cargadas y montadas,
 * por lo que agregamos una clase loadFinished (definida en splashscreen.css) que ejecuta la transición definida
 * para mostrar un buen efecto mientras se oculta la pantalla de carga.
 *
 * Para terminar, eliminamos el nodo de la pantalla de carga una vez que la transición ha terminado.
 */
const stop = whenever(apploaded, () => {
  window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      const splashDOM = document.querySelector('.splashBackground');

      if (!splashDOM) {
        throw new Error('could not locate splash div in DOM');
      }

      splashDOM.addEventListener(
        'transitionend',
        () => {
          window.setTimeout(() => {
            window.requestAnimationFrame(() => {
              splashDOM.remove();
              stop();
            });
          });
        },
        { once: true }
      );

      splashDOM.classList.add('loadFinished');
    });
  });
});

/**
 * Devuelve el componente de layout apropiado según la propiedad meta.layout de la ruta
 */
function getLayoutComponent(layout: RouteMeta['layout']): VueComponent {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
  return layout === 'anonymous' ? AnonymousLayout as VueComponent : DefaultLayout;
}
</script>

<style scoped>
.ocial-app {
  backface-visibility: hidden;
}
</style>
