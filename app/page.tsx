import { fetchMovies } from "@/lib/dal";
import Image from "next/image";

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}
const Home = async () => {
  const {
    movies,
    status_message,
  }: {
    movies: Movie[];
    status_message?: string;
  } = await fetchMovies();
  if (status_message) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{status_message}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {movies?.map((movie: Movie) => (
        <div key={movie.id} className="w-64">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg"
          />
          <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
          <p className="text-gray-600">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
