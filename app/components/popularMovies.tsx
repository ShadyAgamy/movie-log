import { fetchMovies } from "@/lib/dal";
import MovieGrid from "./movieGrid";

const PopularMovies = async () => {
  const pageNumber = 1;
  const movies = await fetchMovies({
    pageNumber,
  });

  return <MovieGrid movies={movies} />;
};

export default PopularMovies;
