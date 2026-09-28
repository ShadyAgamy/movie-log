import { fetchMovies } from "@/lib/dal";
import { Movie } from "@/lib/types";
import Image from "next/image";

const Home = async () => {
  const movies = await fetchMovies();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {movies.map((movie: Movie, i) => (
        <div key={movie.id} className="w-64">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg"
            loading={i < 14 ? "eager" : "lazy"}
          />
          <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
          <p className="text-gray-600">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
