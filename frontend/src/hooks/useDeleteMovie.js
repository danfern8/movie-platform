import { useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function useDeleteMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMovie = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/movie/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error eliminando película");
      return true; // Éxito
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMovie, isLoading, error };
}
