import {
  useNavigatorLanguage,
  usePreferredDark,
  useStorage,
  type RemovableRef
} from '@vueuse/core';
import { computed, watch } from 'vue';
import { i18n } from '@/plugins/i18n';
import { defuSchema } from '@/utils/data-manipulation';

/**
 * == INTERFACES Y TIPOS ==
 */
export interface ClientSettingsState {
  darkMode: 'auto' | boolean;
  locale: string;
}

/**
 * == CONSTRUCTOR DE LA CLASE ==
 */
class ClientSettingsStore {
  /**
   * == ESTADO NO REACTIVO Y CONSTANTES ==
   */
  private readonly _storeKey = 'clientSettings';
  private readonly _defaultState: ClientSettingsState = {
    darkMode: 'auto',
    locale: 'auto'
  };
  /**
   * == SECCION DE ESTADO REACTIVO ==
   */
  private readonly _browserPrefersDark = usePreferredDark();
  private readonly _navigatorLanguage = useNavigatorLanguage();
  private readonly _BROWSER_LANGUAGE = computed<string>(() => {
    const rawString = this._navigatorLanguage.language.value ?? '';
    /**
     * Elimina la información de cultura de la cadena de idioma, por lo que 'es-ES' se reconoce como 'es'
     */
    const cleanString = rawString.split('-');

    return cleanString[0];
  });
  private readonly _state: RemovableRef<ClientSettingsState> = useStorage(
    this._storeKey,
    structuredClone(this._defaultState),
    localStorage,
    {
      mergeDefaults: (storageValue, defaults) =>
        defuSchema(storageValue, defaults)
    }
  );

  /**
   * == GETTERS AND SETTERS ==
   *
   * Si queremos que no su setter no sea público, simplemente no lo declaramos y creamos un
   * private set _locale() { ... }.
   */
  public readonly locale = computed({
    get: () => {
      return this._state.value.locale;
    },
    set: (newVal: string) => {
      this._state.value.locale =
        i18n.availableLocales.includes(newVal) && newVal !== 'auto'
          ? newVal : 'auto';
    }
  });

  public readonly darkMode = computed({
    get: () => {
      return this._state.value.darkMode;
    },
    set: (newVal: 'auto' | boolean) => {
      this._state.value.darkMode = newVal;
    }
  });

  private readonly _updateLocale = (): void => {
    i18n.locale.value =
      this.locale.value === 'auto'
        ? this._BROWSER_LANGUAGE.value || String(i18n.fallbackLocale.value)
        : this.locale.value;
  };

  private readonly _updateTheme = (): void => {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const dark = 'dark';
        const light = 'light';
        const browserColor = this._browserPrefersDark.value ? dark : light;
        const userColor =
          this.darkMode.value !== 'auto' && this.darkMode ? dark : light;
        const targetColor = this.darkMode.value === 'auto' ? browserColor : userColor;

        document.documentElement.classList.remove(dark, light);
        document.documentElement.classList.add(targetColor);
      });
    });
  };

  public constructor() {
    /**
     * == WATCHERS ==
     */
    /**
     * Detecta el cambio del idioma del navegador y del estado e informa a Vue i18n para que
     * actualice el idioma de todas las cadenas de texto de la aplicación.
     */
    watch(
      [this._BROWSER_LANGUAGE, (): typeof this.locale => this.locale],
      this._updateLocale,
      { immediate: true }
    );

    /**
     * Detecta el cambio de las preferencias del usuario sobre el tema oscuro y del propio estado
     * de este *store* para aplicar las clases `dark` y `light` que contienen las variables CSS
     * con los colores adecuados (ver assets/styles/colors.css)
     */
    watch(
      [this._browserPrefersDark, (): typeof this.darkMode => this.darkMode],
      this._updateTheme,
      { immediate: true }
    );
  }
}

export const clientSettings = new ClientSettingsStore();
