import {
  useStorage,
  type RemovableRef
} from '@vueuse/core';
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

  public readonly name = (): string | undefined => {
    return this._state.value.name;
  };

  public readonly id = (): number | undefined => {
    return this._state.value.id;
  };

  public readonly isClient = (): boolean | undefined => {
    return this._state.value.isClient;
  };

  public readonly token = (): string | undefined => {
    return this._state.value.token;
  };

  public authenticate = (): void => {
    // Todo: lógica de login call backend
    const response = {
      name: 'nombre',
      id: 1,
      isClient: true,
      token: 'token'
    };

    this._state.value.name = response.name;
    this._state.value.id = response.id;
    this._state.value.isClient = response.isClient;
    this._state.value.token = response.token;
  };

  public logout = (): void => {
    this._state.value.name = undefined;
    this._state.value.id = undefined;
    this._state.value.isClient = undefined;
    this._state.value.token = undefined;
  };
}

export const auth = new AuthStore();


