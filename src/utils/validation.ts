import type { AxiosError } from 'axios';

/**
 * Comprueba si el parámetro es un número.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Comprueba si el parámetro es un booleano.
 */
export function isBool(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Comprueba si el parámetro es una cadena de texto.
 */
export function isStr(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Comprueba si el parámetro es una función.
 */
export function isFunc<T extends (...args: unknown[]) => unknown>(value: unknown): value is T {
  return typeof value === 'function';
}

/**
 * Comprueba si el parametro es de tipo `undefined`.
 */
export function isUndef(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Comprueba si el parámetro es de tipo `null`.
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Comprueba si el parámetro es de tipo `null` o `undefined`.
 */
export function isNil(value: unknown): value is null | undefined {
  return isNull(value) || isUndef(value);
}

/**
 * Comprueba si el parámetro es un array.
 */
export function isArray(object: unknown): object is unknown[] {
  return Array.isArray(object);
}

/**
 * Comprueba si el parámetro es de tipo `object`.
 */
export function isObj(value: unknown): value is object {
  return typeof value === 'object' && !isNull(value) && !isArray(value);
}

/**
 * *Typeguard* de TypeScript para comprobar si el parámetro es un error de axios.
 */
export function isAxiosError(object: unknown): object is AxiosError {
  return isObj(object) && 'isAxiosError' in object;
}
