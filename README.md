## Configuracion de la clave de API

## Descripción
Este proyecto es una demostración de una aplicación que integra datos bancarios y permite configurar valores como `bankId` y `customerId` para obtener las cuentas y balances. Está desarrollado con **Next.js** y **TailwindCSS**

## Requisitos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:
- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/), preferentemente la versión LTS.
- **npm**: Se instala automáticamente con Node.js.
- **Git**: [Descargar e instalar Git](https://git-scm.com/).
1. Crea un archivo `.env` en la raíz del proyecto.
2. Copia el contenido del archivo `.env.example` al archivo `.env.local` que debes de crear:
3. Sustituye `your-api-key-here` por tu X-API_KEY

## Pasos para ejecutar la aplicación

### 1. Clonar el repositorio
Primero, clona el repositorio en tu máquina local:
### 2. Accede al proyecto 
cd web-digital-bank
### 3. Configura tu variable de entorno
NEXT_PUBLIC_API_KEY=tu_api_key
### 4. ejecuta el proyecto
npm install & npm run dev
### 5. Accede a la aplicacion
La aplicación estará disponible en http://localhost:3000.

