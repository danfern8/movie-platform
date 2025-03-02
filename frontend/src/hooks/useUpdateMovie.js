import { useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function useUpdateMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMovie = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/movie/${id}`, {
        method: "PUT", // o "PATCH" según tu API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error actualizando película");
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateMovie, isLoading, error };
}
