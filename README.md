Noticias API

API GraphQL hecha con TypeScript, Express, Prisma y PostgreSQL.

## Requisitos

- Node.js `>= 18.18.0`
- Docker + Docker Compose
- npm

---

## Instalación

1. Clonar el repositorio:

```bash
git clone git@github.com:gomezleo35/news-service.git
cd news-service
```

2. Instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` con este contenido:

```env
DATABASE_URL=postgres://postgres:postgres@db:5432/noticias
```

---

## Levantar el entorno

```bash
sudo docker compose up --build -d
```

Esto levanta:

- PostgreSQL en el puerto `5432`
- API GraphQL en el puerto `4000`

---

## Inicializar la base de datos

Una vez que los contenedores están corriendo:

```bash
sudo docker compose exec api npx prisma migrate dev --name init
```

Esto crea la tabla `Article`.

---

## Endpoints disponibles

### Obtener todos los artículos

**GET** `/articles`

### Obtener un artículo por ID

**GET** `/articles/:id`

### Buscar artículos por palabra clave

**GET** `/articles/search/:keyword`

### Crear un artículo

**POST** `/articles`

Body esperado (JSON):

```json
{
  "title": "Nueva noticia",
  "body": "Contenido completo",
  "imageUrl": "https://example.com/img.jpg",
  "author": "Leito"
}
```

### Actualizar un artículo

**PUT** `/articles/:id`

Body esperado (JSON):

```json
{
  "title": "Título actualizado",
  "body": "Nuevo contenido",
  "imageUrl": "https://example.com/nueva-img.jpg",
  "author": "Actualizado"
}
```

### Eliminar un artículo

**DELETE** `/articles/:id`

---

---

## Scripts útiles

- Ejecutar tests:

```bash
npm test
```

- Regenerar Prisma Client:

```bash
npx prisma generate
```

- Resetear DB:

```bash
npx prisma migrate reset
```
- Detener orquestador (docker-compose)

```bash
docker compose down
```
