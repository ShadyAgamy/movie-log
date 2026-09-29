import { fetchMovies } from "@/lib/dal";
import MovieGrid from "./components/movieGrid";

const Home = async () => {
  const pageNumber = 1;
  const movies = await fetchMovies({
    pageNumber,
  });

  return (
    <div>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default Home;
