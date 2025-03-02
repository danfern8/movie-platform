# Plataforma de Películas 🎬

Proyecto full-stack para gestión de películas con backend en FastAPI y frontend en React.

## Descripción
Sistema completo que permite realizar operaciones CRUD sobre películas, con capacidad de filtrado avanzado y despliegue containerizado.

## Funcionalidades Principales
- **Agregar película**  
  Campos requeridos:
  - Nombre (obligatorio)
  - Director
  - Año
  - Nota media (1-5)  

- **Actualizar película**  
  Modificación de todos los campos editables

- **Eliminar película**  
  Eliminación permanente del registro

- **Filtrar películas**  
  Combinación múltiple de criterios:
  - Por nombre
  - Por director
  - Por año
  - Por nota media

## Stack Tecnológico
| Área       | Tecnologías                                                                 |
|------------|-----------------------------------------------------------------------------|
| **Backend**  | Python, FastAPI, PostgreSQL                                                 |
| **Frontend** | React, Vite, Tailwind CSS                                                   |
| **DevOps**   | Docker                                                     |

## Endpoints API
| Método | Endpoint            | Descripción                               |
|--------|---------------------|-------------------------------------------|
| GET    | `/movies`           | Obtener todas las películas (con filtros) |
| GET    | `/movies/{id}`      | Obtener película por ID                   |
| POST   | `/movies`           | Crear nueva película                      |
| PUT    | `/movies/{id}`      | Actualizar película existente             |
| DELETE | `/movies/{id}`      | Eliminar película                         |


## 🛠 Pasos para el despliegue

### DOCKER
```bash
# 
docker-compose build
# 
docker-compose up