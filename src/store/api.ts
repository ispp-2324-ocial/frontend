/**
 * Este store mantiene y almacena referencias reactivas a todas las capas de la API, proporcionadas por
 * el composable useEvent y useRequest
 */
import { reactive } from 'vue';
import { isArray } from '@/utils/validation';
import type { Event } from '@/api';

/**
 * Clase que utilizamos para transformar a evento cuando se recibe un evento o un array de eventos,
 * o a un payload crudo.
 */
class CachedResponse {
  public wasArray: boolean | undefined;
  public ids: Event['id'][] = [];
  public rawResult: unknown | undefined;
  public ofEvent: boolean;

  public constructor(ofEvent: boolean, payload: boolean extends typeof ofEvent ? Event | Event[] : unknown) {
    this.ofEvent = ofEvent;

    if (this.ofEvent) {
      this.wasArray = isArray(payload);
      this.ids = this.wasArray ? (payload as Event[]).map((i) => i.id) : [(payload as Event).id];
    } else {
      this.rawResult = payload;
    }
  }
}

/**
 * == CLASS CONSTRUCTOR ==
 */
class ApiStore {
  /**
   * == SECCIÓN DE ESTADO ==
   */
  /**
   * ES6 Map pueden vaciarse (ver this._clear), por lo que no es necesario realizar un structuredClone
   */
  private readonly _events = reactive(new Map<Event['id'], Event>());
  private readonly _requests = reactive(new Map<string, Map<string, CachedResponse>>());

  /**
   * == GETTERS Y SETTERS ==
   */
  public readonly getEventById = (id: Event['id']): Event | undefined =>
    this._events.get(id);

  public readonly getEventsById = (ids: Event['id'][]): Array<Event | undefined> =>
    ids.map((id) => this._events.get(id));

  public readonly getCachedRequest = (funcName: string, params: string): CachedResponse | undefined =>
    this._requests.get(funcName)?.get(params);

  public readonly getRequest = (cache?: CachedResponse): Event | Event[] | unknown => {
    if (cache) {
      if (cache.ofEvent) {
        const array = cache.ids.map((r) => this.getEventById(r));

        return cache.wasArray ? array : array[0] ;
      }

      return cache.rawResult;
    }
  };

  /**
   * == ACTIONS ==
   */
  public readonly eventAdd = <T extends Event | Event[]>(event: T): T => {
    if (isArray(event)) {
      return event.map((i) => {
        this._events.set(i.id, i);

        return this.getEventById(i.id);
      }) as T;
    } else {
      this._events.set(event.id, event);

      return this._events.get(event.id) as T;
    }
  };

  public readonly requestAdd = <T, U extends Event | Event[]>(
    funcName: string,
    params: string,
    ofEvent: boolean,
    result: U): typeof ofEvent extends true ? U : T => {
    const toSave = new CachedResponse(ofEvent, result);

    if (this._requests.has(funcName)) {
      this._requests.get(funcName)?.set(params, toSave);
    } else {
      this._requests.set(funcName, new Map([[params, toSave]]));
    }

    return this.getRequest(this.getCachedRequest(funcName, params) as CachedResponse) as T;
  };
}

export const apiStore = new ApiStore();
