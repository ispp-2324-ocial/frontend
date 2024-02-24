import { createDefu } from 'defu';

/**
 * Mezcla 2 objectos, ecluyendo las claves del objeto destino que no están presentes en el origen
 */
export const defuSchema = createDefu((schema, key) => {
  return !(key in schema);
});
