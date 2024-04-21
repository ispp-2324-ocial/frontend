import {
  useStorage,
  type RemovableRef
} from '@vueuse/core';
import { computed, watchEffect } from 'vue';
import AxiosPlugin from '@/plugins/remote/axios';
import { defuSchema } from '@/utils/data-manipulation';
import type { TokenResponse, User } from '@/api';

/**
 * == INTERFACES Y TIPOS ==
 */
export interface AuthState {
  user?: User;
  token?: string;
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
    user: undefined,
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
  public readonly isClient = computed(() => Boolean(this._state.value.user?.is_client));
  public readonly user = computed(() => this._state.value.user);
  public readonly isLoggedIn = computed(() => Boolean(this._state.value.token));

  public authenticate = (response: TokenResponse): void => {
    this._state.value.token = response.token;
    this._state.value.user = response.user;
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


