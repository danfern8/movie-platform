import { useParams } from "react-router-dom";
import { MovieCard } from "../components/movies/MovieCard";

function MoviePage() {
  const { id } = useParams();

  return (
    <>
      {/* <MovieProvider> */}
      <MovieCard id={id} />
      {/* </MovieProvider> */}
    </>
  );
}

export default MoviePage;
