import { useEffect, useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateMovies();
  }, []);

  async function updateMovies( filters = {} ) {
    try{
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${apiURL}/movies?${queryParams}`);
      const data = await response.json();
      setMovies(data);

    }catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // async function getMovies() {
  //   const response = await fetch(`${apiURL}/movies`);
  //   const data = await response.json();
  //   return data;
  // }

  return { movies, loading, error, refetch: updateMovies };
}
