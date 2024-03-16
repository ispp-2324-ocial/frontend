/**
 * Este script genera módulos ES6 virtuales para rollup-plugin-virtual
 *
 * En nuestro caso, generamos un módulo virtual que contenga solo los archivos de idioma de date-fns
 * (una librería de manipulación de fechas) que necesitamos, y otro módulo virtual que contiene el hash
 * del commit con el que se ha construido la aplicación.
 */
import { readdirSync } from 'node:fs';
import { localeFilesFolder } from './paths';

const localeFiles = readdirSync(localeFilesFolder.replace('**', ''));
const localeNames = localeFiles.map((l) => l.replace('.json', ''));

/**
 * Normaliza los códigos ISO-639-1 de los idiomas para que estén en un formato compatible con ESM
 */
function localeTransform (keys: string[], l: string): string | undefined {
  const testStrings = l.split('-');
  const lang = testStrings.join('');

  /**
   * - Si el nombre coincide exactamente con uno de los de date-fns
   * - Elimina el guión para poder emparejar "en-US" con "enUS".
   *
   * También necesitamos eliminar todos los guiones, ya que usar exportaciones con nombre con ellos no es válido en JS.
   */
  if (keys.includes(l) || keys.includes(lang)) {
    return lang;
    /**
     * Si el nombre coincide con el idioma, pero no con el país, por ejemplo "fr" en "fr-FR"
     */
  } else if (keys.includes(testStrings[0])) {
    return `${testStrings[0]} as ${lang}`;
  }
}

/**
 * Importamos los idiomas y comenzamos el procesamiento
 */
const dfnskeys = Object.keys(await import('date-fns/locale'));
const dfnsExports = localeNames
  .map((l) => localeTransform(dfnskeys, l))
  .filter((l): l is string => typeof l === 'string');

/**
 * Obtener el hash del commit
 */
const commit_available = !Number(process.env.IS_STABLE) && Boolean(process.env.COMMIT_HASH);
const commit_hash = commit_available && `'${process.env.COMMIT_HASH}'` || undefined;
const base_url = process.env.BASE_URL ? `'${process.env.BASE_URL}'` : 'https://backend.s2.ocial.es';

/**
 * Date-fns exporta todos los idiomas ingleses con variantes, por lo que tenemos que añadir el emparejamiento a mano
 */
dfnsExports.unshift('enUS as en');

export default {
  'virtual:locales/date-fns': `export { ${dfnsExports.join(
    ', '
  )} } from 'date-fns/locale'`,
  'virtual:commit': `export const commit_hash = ${commit_hash}`,
  'virtual:url': `export const base_url = '${base_url}'`
};
