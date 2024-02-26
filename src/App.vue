<template>
  <RouterView v-slot="{ Component, route }">
    <TransitionView>
      <Suspense @resolve="apploaded = true">
        <div
          :key="route.meta.layout"
          style="transform-origin: center">
          <component
            :is="getLayoutComponent(route.meta.layout)"
            :key="route.meta.layout">
            <TransitionView>
              <Suspense suspensible>
                <div
                  :key="route.path"
                  style="transform-origin: center">
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
</template>

<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { ref, type Component as VueComponent } from 'vue';
import type { RouteMeta } from 'vue-router';
import DefaultLayout from '@/layouts/default.vue';
import LoginLayout from '@/layouts/login.vue';

const apploaded = ref(false);

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
  return layout === 'login' ? LoginLayout as VueComponent : DefaultLayout;
}
</script>

<style scoped>
@font-face {
    font-family: "OSR";
    src: url('~@/assets/fonts/OpenSans-Regular.ttf');
}

@font-face {
    font-family: "OSI";
    src: url('~@/assets/fonts/OpenSans-Italic.ttf');
}

@font-face {
    font-family: "OSB";
    src: url('~@/assets/fonts/OpenSans-Bold.ttf');
}
</style>
