import type { AxiosResponse } from 'axios';
import { deepEqual } from 'fast-equals';
import { computed, effectScope, getCurrentScope, isRef, shallowRef, toValue, unref, watch, type ComputedRef, type Ref, type ShallowRef } from 'vue';
import { base_url } from 'virtual:url';
import AxiosPlugin from '@/plugins/remote/axios';
/**
 * TODO: Crear componente de barra de carga (como el que aparece en YouTube en la parte superior)
 */
// import { useLoading } from '@/composables/use-loading';
/**
 * TODO: Añadir notificador para avisar al usuario cuando se ha perdido la conexión y se ha reestablecido.
 */
/*
 * import { useToast } from '@/composables/use-toast';
 * import { i18n } from '@/plugins/i18n';
 */
import { network } from '@/store';
import { apiStore } from '@/store/api';
import { isArray, isAxiosError, isNil, isUndef } from '@/utils/validation';
import type { BaseAPI } from '@/api/base';
import { Configuration, type Event } from '@/api';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
type KeyedFunction<T, K extends FunctionKeys<T>> = T[K] extends (...args: any[]) => any ? T[K] : never;
type ParametersAsGetters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
  ? { [K in keyof P]: () => Mutable<P[K]> }
  : never;
type ExtractResponseDataType<T> = Awaited<T> extends AxiosResponse<infer U, any> ? U : undefined;
type Validate<T, U> = T extends U ? U : never;
type ComposableParams<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, U extends ParametersAsGetters<KeyedFunction<InstanceType<T>, K>>> =
  Validate<ParametersAsGetters<KeyedFunction<InstanceType<T>, K>>, U>;

/**
 * Si response.data es Event o Event[], lo devuelve. Si no, devuelve undefined.
 */
type ExtractEventResponse<T> =
  (ExtractResponseDataType<T> extends Event ? Event :
  (ExtractResponseDataType<T> extends Event[] ? Event[] : undefined));
/**
 * Si response.data es Event o Event[], devuelve undefined. Si no, devuelve el tipo de dato.
 */
type ExtractResponseType<T> =
  (ExtractResponseDataType<T> extends Event ? undefined :
  (ExtractResponseDataType<T> extends Event[] ? undefined :
  ExtractResponseDataType<T>));

type ReturnData<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, J extends boolean> =
  J extends true ? ExtractEventResponse<ReturnType<KeyedFunction<InstanceType<T>, K>>> : ExtractResponseType<ReturnType<KeyedFunction<InstanceType<T>, K>>>;

type MaybeReadonlyRef<T> = T | Ref<T> | ComputedRef<T>;

interface ReturnPayload<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, J extends boolean> {
  loading: Ref<boolean | undefined>,
  data: ComputedRef<ReturnData<T, K, J>>;
  response: ShallowRef<BetterOmit<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, 'data'> | undefined>;
}

interface OfflineParams<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>> {
  api: BaseAPI;
  methodName: K;
  args: Parameters<KeyedFunction<InstanceType<T>, K>>;
}

interface SkipCacheOps {
  event?: boolean;
  request?: boolean;
}

interface ComposableOps {
  globalLoading?: boolean;
  skipCache?: SkipCacheOps;
}

type EventComposableOps = ComposableOps & BetterOmit<SkipCacheOps, 'event'> ;

const defaultOps: EventComposableOps = Object.freeze({
  globalLoading: true,
  skipCache: {
    event: false,
    request: false
  }
});

/**
 * Establece el estado del composable como "cargando", también iniciando el
 * indicador de carga global si es necesario
 *
 * @param loading - Ref para mantener el estado de carga
 * @param global - Si se debe mostrar el indicador de carga global o no
 */
function startLoading(loading: Ref<boolean | undefined> | undefined, global: boolean): void {
  if (!isNil(loading)) {
    loading.value = true;


    if (global) {
      // UseLoading().start();
    }
  }
}

/**
 * Establece la respuesta de Axios en el responseRef
 */
function handleAxiosResponse<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>>(
  r: Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>,
  responseRef: ShallowRef<BetterOmit<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, 'data'> | undefined>): void {
  delete r.data;

  responseRef.value = r as BetterOmit<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, 'data'>;
}

/**
 * Finaliza el estado de carga del composable, también desmontando el
 * indicador de carga global si es necesario.
 *
 * @param loading - Ref para mantener el estado de carga
 * @param global - Si se debe mostrar el indicador de carga global o no
 */
function stopLoading(loading: Ref<boolean | undefined> | undefined, global: boolean): void {
  if (!isNil(loading)) {
    loading.value = false;


    if (global) {
      // UseLoading().finish();
    }
  }
}

/**
 * Realiza la solicitud a la API y actualiza la apiStore en consecuencia
 *
 * @param api - La clase de la API
 * @param methodName - Método de la API a ejecutar
 * @param ofEvent - Si este método esta relacionado con la entidad de Eventos o no.
 * @param loading - Ref para almacenar el estado de carga
 * @param args - Argumentos de la función
 */
async function resolveAndAdd<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>>(
  api: T,
  methodName: K,
  ofEvent: boolean,
  { loadingRef, responseRef }: { loadingRef: Ref<boolean | undefined> | undefined, responseRef: ShallowRef<BetterOmit<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, 'data'> | undefined> },
  stringifiedArgs: string,
  ops: Required<ComposableOps>,
  ...args: Parameters<KeyedFunction<InstanceType<T>, K>>): Promise<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>['data']> | void> {
  try {
    startLoading(loadingRef, ops.globalLoading);

    const apiInstance = new api(new Configuration(), base_url, AxiosPlugin.instance) as InstanceType<T>;
    const func = (apiInstance[methodName] as KeyedFunction<InstanceType<T>, K>).bind(apiInstance);
    const funcName = `${api.name}.${String(methodName)}`;
    const response = await func(...args) as Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>;

    if (response.data) {
      const requestData = response.data as Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>['data']>;

      if (ofEvent && !ops.skipCache.event) {
        apiStore.eventAdd(requestData as Event | Event[]);
      }

      if (ops.skipCache.request) {
        return requestData;
      } else {
        apiStore.requestAdd(funcName, stringifiedArgs, ofEvent, requestData);
      }
    }

    handleAxiosResponse(response, responseRef);
  } catch (error) {
    if (isAxiosError(error)) {
      handleAxiosResponse(error.response as Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, responseRef);
    }

    if (!isNil(loadingRef)) {
      loadingRef.value = undefined;
    }

    stopLoading(loadingRef, ops.globalLoading);
  }
}

/**
 * Esta es la lógica interna compartida de cada uno de los composables individuales.
 */
function _sharedInternalLogic<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, U extends ParametersAsGetters<KeyedFunction<InstanceType<T>, K>>>(
  ofEvent: boolean,
  api: MaybeReadonlyRef<T | undefined>,
  methodName: MaybeReadonlyRef<K | undefined>,
  ops: Required<ComposableOps>
): (this: any, ...args: ComposableParams<T,K,U>) => Promise<ReturnPayload<T, K, typeof ofEvent>> | ReturnPayload<T, K, typeof ofEvent> {
  const offlineParams: OfflineParams<T,K>[] = [];
  const isFuncDefined = (): boolean => unref(api) !== undefined && unref(methodName) !== undefined;

  const loading = shallowRef<boolean | undefined>(false);
  const argsRef = shallowRef<Parameters<KeyedFunction<InstanceType<T>, K>>>();
  const result = shallowRef<ReturnData<T, K, typeof ofEvent>>();
  const response = shallowRef<BetterOmit<Awaited<ReturnType<KeyedFunction<InstanceType<T>, K>>>, 'data'>>();

  const stringArgs = computed(() => {
    return JSON.stringify(argsRef.value);
  });
  const cachedData = computed<ReturnType<typeof apiStore.getCachedRequest> | undefined>((previous) => {
    const currentCachedRequest = apiStore.getCachedRequest(`${String(unref(api)?.name)}.${String(unref(methodName))}`, stringArgs.value);

    if ((loading.value || isNil(loading.value)) && !currentCachedRequest) {
      return previous;
    }

    return currentCachedRequest;
  });
  const isCached = computed(() => Boolean(cachedData.value));
  const data = computed<ReturnData<T, K, typeof ofEvent>>(() => {
    if (ops.skipCache.request && result.value) {
      if (ofEvent) {
        return isArray(result.value) ?
          apiStore.getEventsById((result.value as Event[]).map((r) => r.id)) as ReturnData<T, K, typeof ofEvent> :
          apiStore.getEventById((result.value as Event).id) as ReturnData<T, K, typeof ofEvent>;
      } else {
        return result.value;
      }
    } else {
      return apiStore.getRequest(cachedData.value) as ReturnData<T, K, typeof ofEvent>;
    }
  });

  /**
   * Esta función se invoca por cada cambio de datos.
   * @param onlyPending - Si sólo ejecutar aquellas peticiones pendientes o no
   */
  const run = async ({ onlyPending = false, isRefresh = false }): Promise<void> => {
    const unrefApi = unref(api);
    const unrefMethod = unref(methodName);

    if (isUndef(unrefApi) || isUndef(unrefMethod)) {
      return;
    }

    /**
     * Vuelve a ejecutar los parámetros anteriores cuando el usuario vuelve a estar en línea
     */
    if (offlineParams.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - This is propbably a bug in TypeScript
      await Promise.all(offlineParams.map((p) => void resolveAndAdd(p.api, p.methodName, ofEvent, loading, stringArgs.value, ops, ...p.args)));
      offlineParams.length = 0;
    }

    if (argsRef.value && !onlyPending) {
      try {
        if (network.isOnline.value) {
          const resolved = await resolveAndAdd(unrefApi, unrefMethod, ofEvent,
                                               { loadingRef: isRefresh ? undefined : loading, responseRef: response },
                                               stringArgs.value, ops, ...argsRef.value);

          result.value = resolved as ReturnData<T, K, typeof ofEvent>;
        } else {
          /**
           * TODO: Usar el notificador para avisar de que se está offline y la petición va a reintentarse cuando
           * vuelva la conexión
           */
          // UseSnackbar (i18n.t('offlineCantDoThisWillRetryWhenOnline'), 'error');

          offlineParams.push({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error - This is propbably a bug in TypeScript
            api: unrefApi,
            methodName: unrefMethod,
            args: argsRef.value
          });
        }
      } catch {}
    }
  };

  return function (this: any, ...args: ComposableParams<T,K,U>) {
    const normalizeArgs = (): Parameters<KeyedFunction<InstanceType<T>, K>> => args.map((a) => toValue(a)) as Parameters<KeyedFunction<InstanceType<T>, K>>;
    const runNormally = async (): Promise<void> => await run({});
    const runWithRetry = async (): Promise<void> => await run({ onlyPending: true });
    const returnablePromise = async (): Promise<ReturnPayload<T, K, typeof ofEvent>> => {
      const scope = effectScope();

      await runNormally();

      return new Promise((resolve) => {
        scope.run(() => {
          watch([isCached, response], () => {
            if ((isCached.value && !ops.skipCache.request) || !isNil(response.value)) {
              scope.stop();
              resolve({ loading, data, response });
            }
          }, { immediate: true, flush: 'sync' });
        });
      });
    };

    argsRef.value = normalizeArgs();

    if (getCurrentScope() !== undefined) {
      watch(args, async (_newVal, oldVal) => {
        const normalizedArgs = normalizeArgs();

        /**
         * Realiza una comparación recursiva para evitar peticiones dobles innecesarias
         */
        if (!normalizedArgs.every((a, index) => deepEqual(a, toValue(oldVal?.[index])))) {
          argsRef.value = normalizedArgs;
          await runNormally();
        }
      }, { immediate: true });
      watch(network.isOnline, runWithRetry);
      isRef(api) && watch(api, runNormally);
      isRef(methodName) && watch(methodName, runNormally);
    }

    /**
     * Si hay datos cacheados en apiStore antes de montar el componente, los devolvemos directamente (ver abajo
     * como nos saltamos la Promise) para montar el componente lo antes posible.
     *
     * Sin embargo, ponemos en cola el actualizar los datos con el servidor después de montar el componente.
     * setTimeout se ejecuta cuando el 'event loop' del intérprete JavaScript del navegador está libre, evitando
     * sobrecargarlo durante el renderizado.
     */
    if (isCached.value) {
      window.setTimeout(async () => {
        await run({ isRefresh: true });
      });
    }

    /**
     * Espera que los resultados se cacheen antes de resolver la promesa
     *
     * Si la Promesa nunca se resuelve (y, por ende, el componente nunca se monta),
     * el problema está en tu lógica, no en este composable.
     */
    if (!isCached.value && isFuncDefined()) {
      return returnablePromise();
    }

    return { loading, data, response };
  };
}

/**
 * Realiza a la API de entidades del tipo ``Event`` de forma reactiva:
 *
 * - Cuando cambian los parámetros de la solicitud, se realiza la solicitud nuevamente y el ComputedRef devuelve los datos actualizados.
 * - Almacena en caché la respuesta de la solicitud en apiStore.
 * - Si ya hay datos en caché en apiStore para los parámetros dados, se realiza una solicitud al servidor para actualizarlos, pero la Promise se resuelve
 *   inmediatamente cuando se está montando el componente y el ComputedRef devuelve primero los datos en caché y,
 *   una vez se complete la solicitud al servidor, los actualizados.
 * - Si se realiza la solicitud cuando se pierde la conexión con el servidor, la solicitud y sus parámetros se
 *   almacenan y se ejecutan cuando se restablece la conexión.
 *
 * Este composable también devuelve una `Promise`, por lo que evita renderizar el componente con `Suspense` hasta que se haya completado la solicitud inicial
 * (asegurando de esta manera que los datos siempre estén disponibles antes de montar el componente).
 * Consulta la [documentación de Vue](https://vuejs.org/guide/built-ins/suspense.html#suspense) para obtener más información.
 *
 * Aquí tienes un ejemplo de uso. **Los parámetros de la solicitud deben pasarse como getters (como se hace con los props en los watchers)**:
 *
 * ```ts
 * import { EventApi } from '@/api';
 *
 * const { loading, data: event } = await useEvent(EventApi, 'eventNearbyList')(() => ({
 *   ...los parámetros de la solicitud
 * }));
 * ```
 *
 * Consideraciones:
 * - Si no se utiliza dentro de `<script setup>` (o en cualquier effectScope de Vue), los cambios en los parámetros
 *   y las condiciones de red no serán reactivos. Esto se hace para evitar fugas de memoria.
 * - Solo funciona con solicitudes que devuelven respuestas de tipo `Event` o `Event[]`. Si necesitas usar otro tipo, **debes**
 *   utilizar el composable `useApi` en su lugar.
 * - **TEN CUIDADO**: Dado que el tipo de los ComputedRef de los datos siempre es la respuesta de la solicitud (nunca es `undefined`),
 *   si en algún momento no hay repuesta del servidor ni datos cacheados disponibles (**y skipCache = false**),
 *   la `Promise` nunca se resolverá para garantizar que los datos esperados estén disponibles en tiempo de ejecución.
 *   Esto significa que el componente puede que nunca se monte si se usa para obtener los datos iniciales de la página.
 *   Esto te obliga a tener la lógica correcta y que las respuestas sean correctas en condiciones normales.
 *   Si el usuario ha perdido la conexión a Internet, por ejemplo, no se redirigirá al componente de la nueva página,
 *   ya que nunca se montará, ¡y eso es lo que queremos! (para que el usuario solo pueda navegar por los datos que ya ha adquirido).
 *   Esto no sucederá si tanto `api` como `methodName` se pasan como `undefined`, por lo que
 *   puedes usar esa invocación del composable después del montaje.
 *
 * No te preocupes, TypeScript te indicará que `data` siempre es `undefined` cuando no puedas usar el composable con un método API específico.
 *
 * @param api - La sección de la API a utilizar.
 * @param methodName - La operación que se va a ejecutar.
 * @param ops - Opciones del composable
 * @param ops.globalLoading - Si mostrar el indicador de carga global o no para esta solicitud. El valor predeterminado es `true`.
 *   Este parámetro se ignora si la solicitud ya está en caché y se está actualizando (en ese caso, no se muestra ningún indicador de carga).
 * @param ops.skipCache.request - Si se debe omitir la caché o no. Útil para solicitudes cuya respuesta se sabe que no es útil para almacenar en caché,
 *   como marcar las valoraciones de un evento. El valor predeterminado es `false`.
 *   USAR CON PRECAUCIÓN, YA QUE ES MEJOR ALMACENAR EN CACHÉ SIEMPRE DE FORMA PREDETERMINADA.
 * @returns data - El `Event` o `Event[]` que se solicitó.
 * @returns response - El objeto de tipo AxiosResponse devuelto por la solicitud.
 * @returns loading - Un ref booleano que indica si la solicitud está en progreso. Es `undefined` si ha habido un error en la solicitud
 * realizada con los parámetros actuales. En ese caso, `data` apuntará a los datos cacheados de la última solicitud correcta.
 */
export function useEvent<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, U extends ParametersAsGetters<KeyedFunction<InstanceType<T>, K>>>(
  api: MaybeReadonlyRef<T | undefined>,
  methodName: MaybeReadonlyRef<K | undefined>,
  ops?: EventComposableOps
): (this: any, ...args: ComposableParams<T,K,U>) => Promise<ReturnPayload<T, K, true>> | ReturnPayload<T, K, true> {
  return _sharedInternalLogic<T, K, U>(true, api, methodName, (ops ? { ...ops, ...defaultOps } : defaultOps) as Required<ComposableOps>);
}

/**
 * Realiza solicitudes a cualquiera de las APIs forma reactiva:
 *
 * - Cuando cambian los parámetros de la solicitud, se realiza la solicitud nuevamente y el ComputedRef devuelve los datos actualizados.
 * - Almacena en caché la respuesta de la solicitud en apiStore.
 * - Si ya hay datos en caché en apiStore para los parámetros dados, se realiza una solicitud al servidor para actualizarlos, pero la Promise se resuelve
 *   inmediatamente cuando se está montando el componente y el ComputedRef devuelve primero los datos en caché y,
 *   una vez se complete la solicitud al servidor, los actualizados.
 * - Si se realiza la solicitud cuando se pierde la conexión con el servidor, la solicitud y sus parámetros se
 *   almacenan y se ejecutan cuando se restablece la conexión.
 *
 * Este composable también devuelve una `Promise`, por lo que evita renderizar el componente con `Suspense` hasta que se haya completado la solicitud inicial
 * (asegurando de esta manera que los datos siempre estén disponibles antes de montar el componente).
 * Consulta la [documentación de Vue](https://vuejs.org/guide/built-ins/suspense.html#suspense) para obtener más información.
 *
 * Aquí tienes un ejemplo de uso. **Los parámetros de la solicitud deben pasarse como getters (como props en los watchers)**:
 *
 * ```ts
 * import { ChatApi } from '@/api';
 *
 * const { loading, data: chat } = await useApi(ChatApi, 'chatMessagesRetrieve')(() => ({
 *   ...los parámetros de la solicitud
 * }));
 * ```
 *
 * Consideraciones:
 * - Si no se utiliza dentro de `<script setup>` (o en cualquier effectScope de Vue), los cambios en los parámetros
 *   y las condiciones de red no serán reactivos. Esto se hace para evitar fugas de memoria.
 * - Solo funciona con solicitudes que **NO** devuelven respuestas de tipo `Event` o `Event[]`. Si estás
 *   trabajando con solicitudes que devuelven `Event` o `Event[]`, **debes** utilizar el composable `useEvent` en su lugar.
 * - **TEN CUIDADO**: Dado que el tipo de los ComputedRef de los datos siempre es la respuesta de la solicitud (nunca es `undefined`),
 *   si en algún momento no hay repuesta del servidor ni datos cacheados disponibles (**y skipCache = false**),
 *   la `Promise` nunca se resolverá para garantizar que los datos esperados estén disponibles en tiempo de ejecución.
 *   Esto significa que el componente puede que nunca se monte si se usa para obtener los datos iniciales de la página.
 *   Esto te obliga a tener la lógica correcta y que las respuestas sean correctas en condiciones normales.
 *   Si el usuario ha perdido la conexión a Internet, por ejemplo, no se redirigirá al componente de la nueva página,
 *   ya que nunca se montará, ¡y eso es lo que queremos! (para que el usuario solo pueda navegar por los datos que ya ha adquirido).
 *   Esto no sucederá si tanto `api` como `methodName` se pasan como `undefined`, por lo que
 *   puedes usar esa invocación del composable después del montaje.
 *
 * No te preocupes, TypeScript te indicará que `data` siempre es `undefined` cuando no puedas usar el composable con un método API específico.
 *
 * @param api - La sección de la API a utilizar.
 * @param methodName - La operación que se va a ejecutar.
 * @param ops - Opciones del composable
 * @param ops.globalLoading - Si mostrar el indicador de carga global o no para esta solicitud. El valor predeterminado es `true`.
 *   Este parámetro se ignora si la solicitud ya está en caché y se está actualizando (en ese caso, no se muestra ningún indicador de carga).
 * @param ops.skipCache.request - Si se debe omitir la caché o no. Útil para solicitudes cuya respuesta se sabe que no es útil para almacenar en caché,
 *   como marcar las valoraciones de un evento. El valor predeterminado es `false`.
 *   USAR CON PRECAUCIÓN, YA QUE ES MEJOR ALMACENAR EN CACHÉ SIEMPRE DE FORMA PREDETERMINADA.
 * @returns data - Los datos de la solicitud.
 * @returns response - El objeto de tipo AxiosResponse devuelto por la solicitud.
 * @returns loading - Un ref booleano que indica si la solicitud está en progreso. Es `undefined` si ha habido un error en la solicitud
 * realizada con los parámetros actuales. En ese caso, `data` apuntará a los datos cacheados de la última solicitud correcta.
 */
export function useApi<T extends new (...args: any[]) => BaseAPI, K extends FunctionKeys<InstanceType<T>>, U extends ParametersAsGetters<KeyedFunction<InstanceType<T>, K>>>(
  api: MaybeReadonlyRef<T | undefined>,
  methodName: MaybeReadonlyRef<K | undefined>,
  ops?: ComposableOps
): (this: any, ...args: ComposableParams<T,K,U>) => Promise<ReturnPayload<T, K, false>> | ReturnPayload<T, K, false> {
  return _sharedInternalLogic<T, K, U>(false, api, methodName, (ops ? { ...ops, ...defaultOps } : defaultOps) as Required<ComposableOps>);
}

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
