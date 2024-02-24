# Frontend de Ocial

## Entorno de desarrollo

### Local

* Instalamos NodeJS y git si no los tenemos ya instalado:

```
sudo apt install -y curl git
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

* Clonamos el repositorio con `git clone` y accedemos a él
* Ejecutamos `npm ci` para instalar todas las dependencias (esto hay que hacerlo cada vez que se mergee un PR de `renovate`)
* Iniciamos el servidor de desarrollo con `npm start`.

### En remoto

Este repositorio está preparado para ser utilizado con Devcontainers, por lo que puede utilizarse también
con GitHub Codespaces haciendo click en el botón verde "Code" de la esquina superior derecha > "Create codespace".

Los Codespaces cuando dejen de utilizarse deben de eliminarse para no consumir toda la [cuota disponible](https://github.com/settings/billing/summary).
Se pueden gestionar desde [https://github.com/codespaces](https://github.com/codespaces).

## Antes de hacer un PR

* Los PR primero van a la rama `develop`. Posteriormente serán mergeados a `main` por el equipo de QA.
* Antes de hacer PR hay que ejecutar las comprobaciones: `npm run check`. **Si esto no se hace, las comprobaciones fallarán y el PR no se mergeará**.

Todos los scripts disponibles se encuentran bajo la clave `scripts` del archivo `package.json`.
