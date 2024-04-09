import { createDefu } from 'defu';
import { isNull } from '@/utils/validation';

/**
 * Mezcla 2 objectos, ecluyendo las claves del objeto destino que no están presentes en el origen
 */
export const defuSchema = createDefu((schema, key) => {
  return !(key in schema);
});

/**
 * Parse a string to a Date object
 */
function getDate(test?: string): Date {
  return test ? new Date(test) : new Date();
}

/**
 * Parsea una fecha en un formato legible y acorde
 * al idioma del usuario
 */
export function parseDate(stringDate?: string): string {
  return getDate(stringDate).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte una imagen recibida en un evento @change de un input a Base64
 */
export async function toBase64(event: Event): Promise<string | undefined> {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    return await new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        resolve(isNull(reader.result) ? undefined : String(reader.result));
      }, { once: true });

      reader.readAsDataURL(file);
    });
  }
}

