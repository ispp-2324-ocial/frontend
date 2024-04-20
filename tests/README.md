# Tests

## Introducción

### Pruebas unitarias

Se encuentran bajo la carpeta `unit`. Deben probar exclusivamente la lógica de
negocio de la aplicación y no la apariencia/funcionalidad de los componentes.
Se proporcionan varios tests de este tipo como ejemplo.

### Pruebas E2E

Se encuentran bajo la carpeta `e2e`. En estos test, nosotros grabamos una serie
de pasos que playwright automáticamente codifica, de forma que luego
dichas acciones se reproduzcan automáticamente cuando se ejecuta la suite de
pruebas. *Seguir leyendo para aprender más sobre cómo se realizan estos tests*.

### Estructura de las carpetas

Bajo esta carpeta se encuentra el código de los tests necesarios. La estructura
de carpetas es exactamente la misma que la que se encuentra bajo `src/`. Es decir,
si estamos haciendo pruebas unitarias al archivo `src/utils/data-manipulation.ts`,
los tests se encontrarían en `tests/unit/utils/data-manipulation.ts`.

## Cómo escribir tests

### Unitarios

Hay unos cuantos ejemplos ya creados. No tiene mucha más ciencia
que la de llamar a funciones y comprobar si los valores de salida
son los esperados. Este tipo de tests se ejecutan con Vitest, que tiene
[muy buena documentación para aprender a escribir tests](https://vitest.dev/guide/)
