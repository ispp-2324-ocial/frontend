import type { DirectiveBinding } from 'vue';

/**
 * Cambia entre 'visible' y 'hidden' la propiedad 'visibility' de un elemento.
 */
export function hideDirective(
  element: HTMLElement,
  binding: DirectiveBinding<boolean>
): void {
  if (element) {
    element.style.visibility = binding.value === true ? 'hidden' : 'visible';
  }
}
