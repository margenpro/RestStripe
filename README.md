# VIRTUAL HOCKY ON FIREBASE CLOUD FUNCTION

A continuacion les dejo los pasos para deploy.

## Configuracion de Firebase-cli

Es necesario tener instalado el firebase-cli

`npm install -g firebase-tools`

Luego es preciso que se logueen con su cuenta.

`fireabse login`

Este paso les guiara a traves de la autenticacion y credenciales locales.

## Setup de proyecto inicial (Ya hecho en este repo)

Para iniciar el proyecto con un scaffolding generico de cloud functions es preciso que ejecuten `firebase init` en la carpeta raiz del proyecto, y luego procedan con los pasos:

- Seleccionar el proyecto de Firebase (que ya este creado)
- Seleccionar el tipo de proyecto FB: seleccionar *Cloud Function*
- Seleccionar Lenguaje
- Seleccionar ESLint option: (No tuvimos buena experiencia)

## Desarrollar

Nada eso. Desarrollar. El proyecto en si, esta dentro de la carpeta *functions*

Para testear pueden probar en su local invocando al `firebase:serve`

## Deploy

Una vez con todo configurado y con el desarrollo en un buen estadio pueden deployar: `firebase deploy`



``