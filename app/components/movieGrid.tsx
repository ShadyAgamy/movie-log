"use client";
import { Movie } from "@/lib/types";
import MovieCard from "./movieCard";
import { useEffect, useRef, useState, useTransition } from "react";

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  const [movieList, setMovieList] = useState(movies);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(2);
  const loaderRef = useRef(null);

  const handleLoadMoreMovies = (page: number) => {
    startTransition(async () => {
      try {
        const result = await fetch(`/api/movies?pageNumber=${page}`);
        if (!result.ok) {
          throw new Error(`${result.status} Failed to load page ${page}`);
        }
        const data = await result.json();
        setMovieList((prev) => [...prev, ...data.movies]);
        setPage(page + 1);
      } catch (error) {
        console.error("Error ", error);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPending && page < 501) {
          handleLoadMoreMovies(page);
        }
      },
      { rootMargin: "100px" },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, isPending]);
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {movieList.map((movie: Movie, i) => (
          <li key={movie.id}>
            <MovieCard movie={movie} eager={i < 6} />
          </li>
        ))}
      </ul>

      <div ref={loaderRef} className="flex h-24 items-center justify-center">
        {isPending && (
          <div
            role="status"
            className="flex items-center gap-3 text-sm text-neutral-500"
          >
            <span className="size-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-200" />
            Loading more movies…
          </div>
        )}
      </div>
    </>
  );
};

export default MovieGrid;
