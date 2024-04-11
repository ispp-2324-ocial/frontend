import {
  useStorage,
  type RemovableRef
} from '@vueuse/core';
import { computed, watchEffect } from 'vue';
import AxiosPlugin from '@/plugins/remote/axios';
import { defuSchema } from '@/utils/data-manipulation';

/**
 * == INTERFACES Y TIPOS ==
 */

export interface AuthState {
  name: string | undefined;
  id: number | undefined;
  isClient: boolean | undefined;
  token: string | undefined;
}

/**
 * == CONSTRUCTOR DE LA CLASE ==
 */
class AuthStore {
  /**
   * == ESTADO NO REACTIVO Y CONSTANTES ==
   */
  private readonly _storeKey = 'auth';
  private readonly _defaultState: AuthState = {
    name: undefined,
    id: undefined,
    isClient: undefined,
    token: undefined
  };
  /**
   * == SECCION DE ESTADO REACTIVO ==
   */
  private readonly _state: RemovableRef<AuthState> = useStorage(
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
   */

  public readonly name = computed(() => this._state.value.name);

  public readonly id = computed(() => this._state.value.id);

  public readonly isClient = computed(() => this._state.value.isClient);

  public readonly isLoggedIn = computed(() => Boolean(this._state.value.token));

  public readonly token = computed(() => this._state.value.token);

  public authenticate = (username: string, isClient: boolean, token: string | undefined): void => {
    this._state.value.name = username;
    this._state.value.id = 0; // Cambiar
    this._state.value.isClient = isClient;
    this._state.value.token = token;
  };

  public logout = (): void => {
    Object.assign(this._state.value, this._defaultState);
  };

  public constructor() {
    watchEffect(() => {
      AxiosPlugin.setToken(this._state.value.token);
    });
  }
}

export const auth = new AuthStore();


