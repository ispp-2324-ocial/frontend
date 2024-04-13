import { useMediaQuery, useNetwork, useNow , useWindowSize } from '@vueuse/core';
/**
 * Este archivo contiene variables globales individuales (especialmente de VueUse) que se utilizan en varios lugares del cliente.
 * Los composables de VueUse establecerían nuevos *event handlers*, por lo que es más eficiente reutilizarlos, tanto en componentes como en archivos TS.
 */

/**
 * Date.now() reactivo
 */
export const now = useNow();
/**
 * Sigue si el usuario quiere animaciones (false) o no (true).
 */
export const prefersNoMotion = useMediaQuery('(prefers-reduced-motion)');
/**
 * Sigue si el usuario está conectado a internet de forma reactiva
 */
export const network = useNetwork();

export const { width: windowWidth, height: windowHeight } = useWindowSize();
