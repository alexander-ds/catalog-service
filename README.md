# Catalog Service - NestJS + PostgreSQL

Este microservicio maneja la gestión del catálogo de productos.

---

## Tecnologías

* NestJS
* PostgreSQL
* TypeORM
* UUID

---

## Configuración

1. Clonar el proyecto  
2. Crear archivo `.env`:

PORT=3001  
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=admin  
DB_NAME=catalog-db  

---

## Base de datos

Tabla `products`:

* id (UUID)
* name (nombre del producto)
* description (texto opcional)
* price (decimal)
* stock (entero)
* created_at (fecha de creación)

---

## Ejecutar proyecto

npm install  
npm run start:dev  

---

## Endpoints

### Obtener producto por ID

GET /products/:id  

---

### Validar producto y stock

POST /products/validate  

Body:
{
  "id": "uuid",
  "quantity": 2
}

---

### Disminuir stock

POST /products/decrease-stock  

Body:
{
  "id": "uuid",
  "quantity": 2
}

---

## Flujo del catálogo

1. Se crean productos en el sistema  
2. Se consultan desde otros microservicios  
3. Se valida stock antes de generar órdenes  
4. Se descuenta stock al confirmar compras  

---

## Arquitectura

Este servicio forma parte de una arquitectura de microservicios:

* catalog-service → gestión de productos  
* order-service → consume catálogo  
* auth-service → seguridad (JWT)  

---

## Buenas prácticas

* No exponer lógica de órdenes en este servicio  
* Mantener consistencia de stock  
* No permitir valores negativos en stock  
* Validar existencia de producto antes de operaciones  

---

## Mejoras futuras

* Reservas de stock  
* Historial de cambios de inventario  
* Caché con Redis  
* Eventos (Kafka / RabbitMQ)  
* Búsqueda avanzada de productos  

---

## Autor

ALX