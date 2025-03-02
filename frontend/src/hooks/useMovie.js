import { useEffect, useState } from "react";
const apiURL = import.meta.env.VITE_API_URL;

// let cache = [];

export function useMovie(id) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    updateMovie();
  }, [id]); //Must, cuz Loading will be always false

  async function updateMovie() {
    const movie = await fetchMovie();
    setMovie(movie);
    setLoading(false);
  }

  async function fetchMovie() {
    // :))))) in Backend--> /movie/{movie_id}
    const response = await fetch(`${apiURL}/movie/${id}`);
    const data = await response.json();
    return data;
  }

  return { data: movie, isLoading, refetch: updateMovie };
}
