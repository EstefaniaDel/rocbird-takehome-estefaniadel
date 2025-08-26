# Rocbird takehome

Solución al desafío técnico de Rocbird, desarrollada con un stack moderno orientado a la escalabilidad y buenas prácticas.

### Stack Tecnológico
- Frontend & Backend: Next.js (React 19)
- ORM & DB: Prisma + PostgreSQL
- Estilos: Tailwind CSS
- Validaciones: Zod, React Hook Form
- UI Components: Shadcn UI
- DevOps: Docker, Docker Compose
- Otros: TypeScript, ESLint

### Descripción
Esta aplicación permite gestionar y consultar información de talentos y líderes técnicos, implementando relaciones y operaciones CRUD sobre una base de datos PostgreSQL. El objetivo es demostrar habilidades en desarrollo fullstack, modelado de datos y despliegue en entornos modernos.

---
### Para ejecutar el proyecto:

### 1. Requerimientos
- Docker
- Docker Compose

### 2. Primeros pasos
Clonar el repositorio:
```bash
git clone https://github.com/estefaniadel/rocbird-takehome-estefaniadel.git
```
Movernos al directorio del proyecto:
```bash
cd rocbird-takehome-estefaniadel
```

### 3. Configuración de variables de entorno
```bash
cp .env.example .env
```

### 4. Configuración inicial y ejecución 
Para iniciar el entorno, ejecutar:
```bash
docker compose up --build -d
```
Para detener el entorno, ejecutar:
```bash
docker compose down
```
Aplicar el esquema de la base de datos:
```bash
docker compose exec web npx prisma db push
```

### 5. Poblar la base de datos (para desarrollo)
Aplicar el seed para poblar la base de datos:
```bash
docker compose exec web npx prisma db seed
```
