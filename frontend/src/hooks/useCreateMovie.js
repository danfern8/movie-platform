import { useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function useCreateMovie() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMovie = async (movieData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) throw new Error("Error creando película");
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createMovie, isLoading, error };
}