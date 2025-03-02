from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os
from psycopg2.extras import RealDictCursor

app = FastAPI()

frontend_host = os.getenv("FRONTEND_HOST", "localhost")
frontend_port = os.getenv("FRONTEND_PORT", "5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"http://{frontend_host}:{frontend_port}"],  # URL de tu frontend (React)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los headers
)

DATABASE_CONFIG = {
    "dbname": os.getenv("DATABASE_NAME", "movie_db"),
    "user": os.getenv("DATABASE_USER", "movie_user"),
    "password": os.getenv("DATABASE_PASSWORD", "movie_password"),
    "host": os.getenv("DATABASE_HOST", "localhost"),  # Usa el nombre del servicio de Docker
    "port": os.getenv("DATABASE_PORT", "5432")
}

class Movie(BaseModel):
    name: str
    director: str
    year: int  # Año como entero
    rating: float  # Nota como flotante



def get_db_connection():
    return psycopg2.connect(**DATABASE_CONFIG, cursor_factory=RealDictCursor)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/movies")
def get_movies(name = None,director=None,year=None,rating=None):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM movies WHERE 1=1"
        params = []
        
        if name:
            query += " AND name ILIKE %s"
            params.append(f"%{name}%")
            
        if director:
            query += " AND director ILIKE %s"
            params.append(f"%{director}%")
            
        if year:
            query += " AND year = %s"
            params.append(year)
            
        if rating:
            query += " AND rating >= %s"
            params.append(rating)
        
        cursor.execute(query, params)
        movies = cursor.fetchall()
        conn.close()
        
        return movies
    except Exception as e:
        return {"error": str(e)}
    finally:
        if 'conn' in locals():
            conn.close()

# @app.get("/movies")
# async def getMovies():
#     return movies

@app.get("/movie/{movie_id}")
async def get_movie(movie_id: int):  # Tipo de dato específico
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM movies WHERE id = %s",  # Parámetro correcto
            (movie_id,)  # Tupla de parámetros
        )
        movie = cursor.fetchone()
        conn.close()
        
        if not movie:
            raise HTTPException(status_code=404, detail="Película no encontrada")
                
        return movie
    except psycopg2.Error as e:  # Captura error específico
        raise HTTPException(
            status_code=500,
            detail=f"Error de base de datos: {str(e)}"
        )

# @app.get("/movie/{id}")
# async def getMovie(id):
#   for movie in movies:
#     if movie["id"] == int(id):
#       return movie
#   raise HTTPException(status_code=404, detail="Película no encontrada")

@app.put("/movie/{movie_id}")
async def update_movie(movie_id: int, updated_movie: Movie):
  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE movies 
        SET 
            name = %s,
            director = %s,
            year = %s,
            rating = %s
        WHERE id = %s
        RETURNING *;
        """,
        (
          updated_movie.name,
          updated_movie.director,
          updated_movie.year,
          updated_movie.rating,
          movie_id
        )
    )
    update_movie = cursor.fetchone()
    conn.commit()
    conn.close()
    
    if not update_movie:
        raise HTTPException(status_code=404, detail="Película no encontrada")
            
    return update_movie

  except psycopg2.Error as e:  # Captura error específico
      raise HTTPException(
          status_code=500,
          detail=f"Error de base de datos: {str(e)}"
      )


@app.post("/movies")
async def create_movie( new_movie: Movie):
  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO movies 
        (name,director,year,rating)
        VALUES
        (%s,%s,%s,%s)
        RETURNING *;
        """,
        (
          new_movie.name,
          new_movie.director,
          new_movie.year,
          new_movie.rating
        )
    )
    created_movie = cursor.fetchone()
    conn.commit()
    conn.close()
    
    if not created_movie:
      raise HTTPException(
          status_code=500,
          detail="No se pudo crear la película"
      )
            
    return created_movie
  
  except psycopg2.IntegrityError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error de datos: {str(e)}"
        )

  except psycopg2.Error as e:  
    raise HTTPException(
        status_code=500,
        detail=f"Error de base de datos: {str(e)}"
    )


@app.delete("/movie/{movie_id}")
async def delete_movie( movie_id: int):
  try:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        DELETE FROM movies
        WHERE id = %s
        RETURNING *;
        """,
        (
          movie_id,
        )
    )
    delete_movie = cursor.fetchone()
    conn.commit()
    conn.close()
    
    if not delete_movie:
        raise HTTPException(
            status_code=404,
            detail=f"Película con ID {movie_id} no encontrada"
        )
    return delete_movie

  except psycopg2.IntegrityError as e:
        raise HTTPException(
            status_code=400,
            detail=f"No se puede eliminar la pelicula: {str(e)}"
        )

  except psycopg2.Error as e:  
    raise HTTPException(
        status_code=500,
        detail=f"Error de base de datos: {str(e)}"
    )
