# Mini CRM

CRM mínimo: backend Node.js + frontend JavaScript con Tailwind. Base de datos en MongoDB Atlas.

## Requisitos

- Node.js 20+
- Cuenta MongoDB Atlas y URI de conexión

## Backend

```bash
cd backend
cp .env.example .env
# Editar .env y poner tu MONGODB_URI de Atlas
npm install
npm run dev
```

API en `http://localhost:4000`. Rutas: `GET/POST /api/contacts`, `GET/PATCH/DELETE /api/contacts/:id`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:3000`. El proxy de Vite envía `/api` al backend en el puerto 4000.

## Variables de entorno (backend)

| Variable     | Descripción                    |
| ------------ | ------------------------------ |
| `PORT`       | Puerto del servidor (default 4000) |
| `MONGODB_URI`| URL de MongoDB Atlas          |

## Estructura

```
backend/     → Express, Mongoose, API REST
frontend/    → Vite, Tailwind CSS, JS módulos
```
