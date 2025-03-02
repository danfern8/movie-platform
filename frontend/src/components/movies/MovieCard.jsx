import { useState } from "react";
import { MovieForm } from "./MovieForm";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";

export const MovieCard = ({ id }) => {
  const [showForm, setShowForm] = useState(false);
  const { data: film, isLoading, refetch } = useMovie(id);
  const { deleteMovie } = useDeleteMovie();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  async function handleDelete() {
    try {
      await deleteMovie(id);
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar pelicula:", error);
    }
  }

  return (
    <>
      <div class="m-4 mb-8 w-auto px-4 mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="rounded-lg bg-white shadow-lg">
          <div class="p-4">
            <h2 class="mb-2 text-lg font-semibold">{film.name}</h2>
            <p class="mb-2 text-sm text-gray-700">
            Director: {film.director}
            </p>
            <p class="mb-2 text-sm text-gray-700">Año: {film.year}</p>
            <p class="mb-2 text-sm text-gray-700">Nota media: {film.rating}</p>
            
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between">
        <button
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors w-fit mx-auto"
          onClick={handleDelete}
        >
          Eliminar pelicula
        </button>
        <button
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors w-fit mx-auto"
          onClick={() => setShowForm(true)}
        >
          Editar película
        </button>
      </div>
      {showForm && (
        <div>
          <MovieForm
            film={film}
            onClose={async () => {
              setShowForm(false);
              //Despues de editar, viene aqui y muestre el dato actualizado
              await refetch();
            }}
            isEditMode={true}
          />
        </div>
      )}
    </>
  );
};
