/**
 * Carga la pantalla de carga basándose en el tema (claro/oscuro) guardado en las preferencias del usuario
 * o proporcionado por el dispositivo del usuario
 */
import { destr } from 'destr';
import '@/assets/styles/colors.css';
import '@/assets/splashscreen.css';
import type { ClientSettingsState } from './store/clientSettings';

const store = localStorage.getItem('clientSettings') ?? '{}';
const parsedStore = destr<ClientSettingsState>(store);
const matchedDarkColorScheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;
let classToApply: 'light' | 'dark' = matchedDarkColorScheme ? 'dark' : 'light';

if ('darkMode' in parsedStore) {
  const storeDarkMode = parsedStore.darkMode;

  if (typeof storeDarkMode === 'boolean') {
    classToApply = parsedStore.darkMode === true ? 'dark' : 'light';
  }
}

if (document.documentElement) {
  document.documentElement.classList.add(classToApply);
}
