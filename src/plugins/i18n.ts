import { createI18n } from 'vue-i18n';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import messages from '@intlify/unplugin-vue-i18n/messages';

/**
 * Comprueba @/store/clientSettings para ver dónde se inicializa el idioma del usuario actual
 */

const DEFAULT_LANGUAGE = 'es';

export const vuePlugin = createI18n({
  fallbackLocale: DEFAULT_LANGUAGE,
  globalInjection: true,
  legacy: false,
  messages: messages
});

export const i18n = vuePlugin.global;
