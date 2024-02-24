Esta carpeta contiene la definición de los tipos **globales** de TypeScript,

* ``global/attributes.d.ts``: Estas declaraciones permiten que podamos pasar cualquier parámetro `data-*` como `prop`
de un componente, de forma que este aparezca en la página renderizada final. Estos atributos se utlizan para
dar información a lectores de pantalla o para guardar información sobre el estado del componente

* ``global/components.d.ts``: Estas declaraciones se crean automáticamente por Vite al ejecutar ``npm run build``
o ``npm start``. Permiten que los componentes se importen automáticamente en cada archivo `.vue`.

* ``global/plugins.d.ts``: Contienen las definiciones de la propiedad ``meta`` que tienen todas las [rutas](https://router.vuejs.org/guide/advanced/meta.html#Route-Meta-Fields).
En nuestro caso, usaremos estas propiedades para controlar el ``layout`` y las transiciones entre las páginas (entre otras cosas).
También contienen las definiciones de tipos de las claves de localización que utilicemos, de forma que al utilizar `t` tengamos autocompletado
dependiendo de las claves de localización que tengamos.

* ``global/routes.d.ts``: Estas declaraciones (también autogeneradas por Vite como la de `components.d.ts`)
permiten que a la hora de utilizar ``RouterLink`` o ``useRouter`` tengamos autocompletado de la información de las rutas.

* ``global/util.d.ts``: Son tipos de "utilidad" que permiten crear otros tipos a partir de ellos.

* ``modules/virtual.d.ts``: Permiten añadir información de tipo a la constante global que almacena la firma del ``commit`` con
el que se ha construido el cliente y los módulos virtuales creados por ``rollup-plugin-virtual`` (ver carpeta ``scripts`` de la raíz
del repositorio o ``vite.config.ts`` para más información).
