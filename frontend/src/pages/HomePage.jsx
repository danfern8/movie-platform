import { useNavigate } from "react-router-dom";
import { MovieForm } from "../components/movies/MovieForm";
import { useState } from "react";
import { useMovies } from "../hooks/useMovies";

export const HomePage = () => {
  const [filters, setFilters] = useState({
    name: "",
    director: "",
    year: "",
    rating: "",
  });
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const { movies, refetch } = useMovies();
  // cons movies = useMovies().movies; Mejor desesfracturarlo, mas limpio

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    const cleanedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) {
          if (key === "year") acc[key] = parseInt(value);
          else if (key === "rating") acc[key] = parseFloat(value);
          else acc[key] = value;
        }
        return acc;
      },
      {}
    );

    refetch(cleanedFilters);
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Lista de Películas</h1>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Filtrar por nombre..."
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Director</label>
            <input
              type="text"
              name="director"
              placeholder="Filtrar por director..."
              value={filters.director}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Año</label>
            <input
              type="number"
              name="year"
              placeholder="Filtrar por año..."
              min="1900"
              max="2025"
              step="1"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nota mínima
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Filtrar por nota..."
              min="1"
              max="5"
              step="0.1"
              value={filters.rating}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{movie.name}</h3>
              <button
                className="bg-blue-500 text-white p-2 rounded transition-colors duration-200 hover:bg-blue-600"
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                Detalles
              </button>
            </div>
          ))}
        </div>

        {movies.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No hay películas que coincidan con los filtros.
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors w-fit mx-auto "
          onClick={() => setShowForm(true)}
        >
          Agregar pelicula
        </button>
      </div>
      {showForm && (
        <MovieForm
          onClose={() => {
            setShowForm(false);
            refetch();
          }}
          isEditMode={false}
        />
      )}
    </>
  );
};
