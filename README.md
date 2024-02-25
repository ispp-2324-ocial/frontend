# Frontend de Ocial

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ispp-2324-ocial_frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ispp-2324-ocial_frontend)

## Despliegues configurados:

Este repositorio sigue una estructura GitFlow, donde la rama ``main`` es la de producción,
``develop`` es la de desarrollo para la siguiente versión y cada desarrollador
crea una rama por característica (*feature-based-branching*). Hay despliegues automáticos en cada rama:

* ``main``: https://app.ocial.es (desplegado usando GitHub Pages y GitHub Actions)
* ``develop``: https://develop.app.ocial.es (desplegado usando Cloudflare Pages)
* El resto de ramas tendrán despliegues bajo demanda. Al crear un Pull Request, Cloudflare Pages publicará un comentario
  con el enlace en el que se podrá visualizar el despliegue de dicha rama en cuestión.

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
