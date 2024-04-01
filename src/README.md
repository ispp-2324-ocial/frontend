# Información general sobre el código fuente

## Archivos
* ``splashscreen.ts``: Contiene toda la lógica que se encarga de la pantalla de carga. Principalmente,
muestra los colores de nuestro tema claro/oscuro dependiendo de los ajustes del navegador/sistema del usuario.
* ``main.ts``: Es el punto de entrada de la aplicación (el equivalente al ``public static void main`` de Java). Inicializa
todos los plugins de Vue y monta la aplicación en el DOM.
* ``App.vue``: Es el componente que se monta en el DOM. De él cuelgan todos los demás. Tiene una estructura que:
- Permite tener ``layouts`` diferentes (de forma que podamos tener una estructura del contenido diferente para la
pantalla de inicio de sesión, por ejemplo)
  - Muestra una transición al cambiar de página (ver ``components/TransitionView.vue`` para más información)
  - No monta los componentes (haciendo uso de [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense)) hasta que
  estos no han completado todas las Promises que tengan en su ``<script setup>`` (las Promises son las funciones ``async`` con las que
  realizamos peticiones al backend).

## Carpetas

* ``assets``: Contiene los estilos CSS y cualquier otro archivo que necesitemos utilizar dentro de la aplicación (como imágenes)
y que forman parte de la aplicación (no como los de la carpeta ``public`` que no son parseados por el bundler)
* ``components``: Contiene todos los componentes de la aplicación como archivos ``.vue``. Estos archivos se llaman [SFC](https://vuejs.org/guide/scaling-up/sfc.html) y los utilizaremos usando la [Composition API](https://vuejs.org/api/sfc-css-features.html#usage-with-composition-api) de Vue 3.
Tienen que tener esta estructura (en algunos ejemplos online, el orden de las etiquetas puede ser diferente,
**por consistencia nosotros vamosa utilizar este**):

```
<!-- Plantilla de este componente (equivalente al return de React) -->
<template>

</template>

<!-- OPCIONAL: Ver plugins/router/middlewares/meta.ts y types/plugins.d.ts para una descripción de todos los valores aceptados -->
<route lang="yaml">
meta:
  layout: anonymous
</route>

<!-- OPCIONAL: Por si queremos declarar refs que estén compartidos entre todas las instancias que haya en la aplicación de este componentes -->
<script lang="ts">
</script>

<!-- Todas las variables que declaremos aquí estarán disponibles en el template. Esto es como el 'constructor' del componente, se ejecuta por cada instancia que se cree -->
<script setup lang="ts">
</script>

<script lang="ts">
</script>

<!-- Los estilos que apliquemos aquí solo aplican a este componente -->
<style scoped>
</style>
```


* ``composables``: Contienen lógica de negocio reactiva que pueda ser reusable entre componentes. Hay muy buenos ejemplos
[en la documentación de Vue](https://vuejs.org/guide/reusability/composables.html#composables) y en la propia carpeta está ``use-datefns.ts``
que permite utilizar todas las funciones de la librería [``date-fns``](https://date-fns.org/) de forma reactiva de forma que, si cambiamos el idioma
o mostramos que un evento es "Dentro de 30 minutos", el texto se actualice automáticamente (se cambie el idioma y se actualice los minutos que quedan
hasta que comience, respectivamente)
* ``layouts``: Contiene los componentes que representan los diferentes *layouts* de la aplicación.
En ``<slot />`` renderizan el elemento hijo (ver [documentación sobre slots](https://vuejs.org/guide/components/slots.html#slots))
* ``pages``: Contiene los componentes que representan las diferentes páginas que tiene nuestra app. Dependiendo del tipo de
página que queramos, necesitan un nombre concreto.
  - Ver [documentación de unplugin-vue-router](https://uvr.esm.is/)
  - Ver [documentación de Vue Router](https://router.vuejs.org/)
* ``plugins``: Contiene el punto de entrada de los plugins de Vue (como Vue Router, Vue i18n, etc). Aquí se encontrará también
toda la lógica que nos permitirá realizar peticiones y solicitudes al backend y el gestor del WebSocket.
* ``store``: Son "contenedores" de variables reactivas globales, de forma que puedan ser reutilizadas por varios componentes. También
son "autómatas" que gestionan su propio estado. Utilizaremos clases de TypeScript, muy parecidas a las de Java:
  - Permiten establecer que propiedades/funciones queremos que sean de solo lectura y su accesibilidad
  - Permiten componerse unas con otras al usar ``extends`` y clases abstractas.

Además, utilizaremos un patrón ``singleton`` (cada clase se instancia solo una vez en toda la vida de la aplicación).

Hay un ejemplo muy bueno en ``clientSettings.ts``:
  - En él se encuentran almacenados el idioma y el tema seleccionado por el usuario, que son datos que varios componentes podrían necesitar.
  Además, su propio estado se actualiza cuando los ``watchers`` que establecemos en el constructor detectan que el idioma o el tema del navegador
  se han cambiado.

**IMPORTANTE**: Todos los elementos que sean privados (es decir, que utilicen el modificador de acceso `private` y solo sean accesibles dentro de
la clase) deben de ir precedidos de un ``_``. Así:

```
private readonly _storeKey = 'clientSettings';
```

* ``utils``: En esta carpeta colocaremos todo el código que se utilice en varias partes de la aplicación y no sean exclusivos a ningún componente.
Se diferencia de los ``composables`` en que estos últimos tienen estado y estos no.
Ahora mismo por ejemplo tenemos varias funciones de utilizada para realizar comprobaciones de tipo de datos y realizar manipulación de datos.

## Información sobre las dependencias

- Para los iconos, estamos utilizando [unplugin-icons](https://github.com/unplugin/unplugin-icons), que genera los componentes de iconos
que necesitemos sobre la marcha. Los iconos admitidos están [aquí](https://icon-sets.iconify.design/)

- Cuando vayamos a usar un componente, sólo hace falta colocarlo en el `<template>` del componente padre y listo, se importará automáticamente
(a diferencia de Astro y React). [Leer más sobre como esto es posible](https://github.com/unplugin/unplugin-vue-components)

- Para navegar entre páginas, utilizamos [Vue Router](https://router.vuejs.org/) como enrutador. Nos proporciona el componentes
[`RouterLink`](https://router.vuejs.org/api/#RouterLink) para renderizar el enlace y los métodos
[`useRoute` y `useRouter` para navegar de forma programática](https://router.vuejs.org/guide/advanced/composition-api.html#Vue-Router-and-the-Composition-API).

- Para generar el CSS, en vez de TailwindCSS, utilizamos [UnoCSS](https://unocss.dev/). A efectos prácticos, la sintaxis es la misma,
pero es mucho más eficiente a la hora de compilar que Tailwind y soporta HMR mucho mejor.
