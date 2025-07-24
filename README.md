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
sudo docker compose up --build
```

Esto levanta:

- PostgreSQL en el puerto `5432`
- API GraphQL en el puerto `4000`

---

## Inicializar la base de datos

Una vez que los contenedores están corriendo:

```bash
docker compose exec api npx prisma migrate dev --name init
```

Esto crea la tabla `Article`.

---

## Acceder a la API

Ir al Playground:

```
http://localhost:4000/graphql
```

---

## Probar la API desde Postman

Seleccioná POST como método.

Usá esta URL:

http://localhost:4000/graphql

En la pestaña Body, elegí raw y luego seleccioná JSON.

## Ejemplos de queries y mutations

### Obtener todos los artículos

```json
{
  "query": "query { allArticles { id title body imageUrl author date } }"
}
```

---

### Obtener un artículo por ID

```json
{
  "query": "query { article(id: 1) { id title body imageUrl author date } }"
}
```

---

### Buscar artículos por palabra clave

```json
{
  "query": "query { searchArticles(keyword: \"someText\") { id title author } }"
}
```

---

### Crear un artículo

```json
{
  "query": "mutation { createArticle(title: \"Nueva noticia\", body: \"Este es el contenido.\", imageUrl: \"https://ejemplo.com/image.jpg\", author: \"Juan\") { id title } }"
}
```

---

### Actualizar un artículo

```json
{
  "query": "mutation { updateArticle(id: 1, title: \"Artículo actualizado\", body: \"Nuevo contenido\") { id title body } }"
}
```

---

### Eliminar un artículo

```json
{
  "query": "mutation { deleteArticle(id: 1) { id title } }"
}
```

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
