import { fetchMovies } from "@/lib/dal";
import MovieGrid from "./components/movieGrid";

const Home = async () => {
  const pageNumber = 1;
  const movies = await fetchMovies({
    pageNumber,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Popular right now
        </h1>
        <p className="mt-2 text-neutral-500">
          What everyone&apos;s watching this week. Pick one to see the details.
        </p>
      </header>
      <MovieGrid movies={movies} />
    </main>
  );
};

export default Home;
