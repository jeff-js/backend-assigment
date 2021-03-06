# Backend Coding Challenge


## Pasos para inciar el proyecto

- Clonar el proyecto -> `git clone https://github.com/jeff-js/backend-assigment.git`
- Instalar las dependecias -> `npm i`
- Crear un archivo `.env` o puedes clonar el archivo `.env-example`
- Actualizar la cadena de conexión de la base de datos `MONGOBD`
- Ejecutar el comando para correr el proyecto `nom run start:dev`

## Postam

https://documenter.getpostman.com/view/11466897/T17J9nX3?version=latest


## Extra CRON

En el proyecto tambien unclui un CRON para cuando se adicionan nuevos agentes para la solucion de los problemas de la Aplicación


# Docred

Code Challenge para candidatos Backend para DocRed.

**IMPORTANTE**: Haz un _fork_ de este repositorio para trabajar en la solución

## Contexto

El soporte de nuestros usuarios es muy importante en DocRed. Nuestros agentes quieren ser mas eficientes en la resolución de los problemas o consultas que nuestros usuarios puedan tener. Para eso, se decidio construir un software para automatizar el proceso - el software que tu vas a construir.

## Tu misión

Tu tarea es proveer una API para una aplicación frontend que satisfaga los requerimentos descriptos arriba.
Por favor, sigue los requerimentos del producto.
No debes implementar autorización o autenticación, ya que no es importante en este challenge.

## Requerimientos del producto

- Los usuarios de Docred pueden reportar un problema.
- Los problemas nuevos deben asignarse automáticamente, a un agente que esté libre.
- Cada agente debe trabajar en un problema a la vez.
- El agente puede marcar un problema como resuelto, de esta manera, el agente queda libre para tomar un nuevo problema.
- El sistema asignará automáticamente, un nuevo problema a un agente, cuando este se libere.

## Requerimientos técnicos

- Node.js
- Tests (calidad y cobertura).
- Eres libre de elegir cualquier framework, pero te recomendamos que uses uno con el que más te sientas cómodo.
- Eres libre de usar la base de datos que prefieras, sin embargo, debes justificar tu elección.
- Typescript es un plus.
- NestJS es un plus.
- **Puntos extra**: Provee una collección en Postman para testear tu solución.

## Instrucciones

- The challenge is on!
- Haz un fork de este repositorio
- Construye una solucion bien estructurada, limpia y facil de leer. Performance tambien es importante.
- Haz commit pronto y seguido. Queremos ser capazes de seguir tu progreso.
- Provee un README explicando como correr tu solucion _paso a paso_.
- Envianos un email con el link a tu repositorio cuando termines el challenge.
- El projecto debe ser "auto-suficiente". Es decir, Si usa una base de datos, la solución debe proveer una.
- Por favor, no te tomes mas de 1 dia.
