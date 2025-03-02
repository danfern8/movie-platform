import { useState } from "react";
import { useUpdateMovie } from "../../hooks/useUpdateMovie";
import { useAddMovie } from "../../hooks/useAddMovie";

export const MovieForm = ({ film, onClose, isEditMode }) => {
  const [formData, setFormData] = useState(
    isEditMode
      ? { ...film }
      : { name: "", director: "", year: "", rating: "" }
  );

  const { updateMovie, isLoading, error } = useUpdateMovie();
  const { addMovie } = useAddMovie();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode){
        await updateMovie(film.id, formData);
      }else{
        await addMovie(formData)
      }
      onClose();
    } catch (error) {
      console.error("Error al actualizar/añadir:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md border border-black bg-opacity-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-lg w-full max-w-md"
        >
          <h2 className="text-xl mb-4">
            {isEditMode ? `Editar ${film.name}` : "Añadir nueva película"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Año</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Nota (1-5)
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {isEditMode ? "Guardar cambios" : "Añadir película"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
