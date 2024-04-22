import {
  useStorage,
  type RemovableRef
} from '@vueuse/core';
import { computed, watchEffect } from 'vue';
import AxiosPlugin from '@/plugins/remote/axios';
import { defuSchema } from '@/utils/data-manipulation';
import { UsersApi, type TokenResponse, type User } from '@/api';
import { useApi } from '@/composables/apis';

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

  public readonly authenticate = (response: TokenResponse): void => {
    this._state.value.token = response.token;
    this._state.value.user = response.user;
  };

  public readonly logout = (): void => {
    Object.assign(this._state.value, this._defaultState);
  };

  private readonly _refreshUser = async (): Promise<void> => {
    const { data } = await useApi(UsersApi, 'usersMeRetrieve')();

    this._state.value.user = data.value;
  };

  public constructor() {
    watchEffect(() => {
      AxiosPlugin.setToken(this._state.value.token);
    });

    if (this.isLoggedIn.value) {
      /**
       * Refresca la información del usuario actual al iniciarse el cliente
       */
      void this._refreshUser();
    }
  }
}

export const auth = new AuthStore();
