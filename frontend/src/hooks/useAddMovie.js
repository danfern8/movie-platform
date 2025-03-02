import { useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function useAddMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovie = async (newMovie) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Error añadiendo pelicula", await response.text());
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addMovie, isLoading, error };
}
