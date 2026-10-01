import { getYear } from "@/lib/format";
import { Movie } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  movie,
  eager = false,
}: {
  movie: Movie;
  eager?: boolean;
}) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex flex-col gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-neutral-200 shadow-md ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-neutral-800 dark:ring-white/10">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
            fill
            sizes="(min-width: 1280px) 200px, (min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-neutral-500">
            {movie.title}
          </div>
        )}
      </div>
      <div className="px-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold group-hover:underline group-hover:underline-offset-4">
          {movie.title}
        </h3>
        <p className="text-xs text-neutral-500">
          {getYear(movie.release_date) || "TBA"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
