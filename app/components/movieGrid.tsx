"use client";
import { Movie } from "@/lib/types";
import MovieCard from "./movieCard";
import { MovieCardSkeleton } from "./movieGridSkeleton";
import { useEffect, useRef, useState, useTransition } from "react";

const MovieGrid = ({ movies }: { movies: Movie[] }) => {
  const [movieList, setMovieList] = useState(movies);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(2);
  const loaderRef = useRef(null);
  const [isError, setIsError] = useState(false);

  const handleLoadMoreMovies = (page: number) => {
    startTransition(async () => {
      try {
        const result = await fetch(`/api/movies?pageNumber=${page}`);
        if (!result.ok) {
          throw new Error(`${result.status} Failed to load page ${page}`);
        }
        const data: { movies: Movie[] } = await result.json();
        setMovieList((prev) => {
          const existingMovieIds = new Set(prev.map((movie) => movie.id));
          return [
            ...prev,
            ...data.movies.filter((movie) => !existingMovieIds.has(movie.id)),
          ];
        });
        setPage(page + 1);
        setIsError(false);
      } catch (error) {
        console.error("Error ", error);
        setIsError(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPending && page < 501 && !isError) {
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
  }, [page, isPending, isError]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {movieList.map((movie: Movie, i) => (
          <li key={movie.id}>
            <MovieCard movie={movie} eager={i < 12} />
          </li>
        ))}
        {isPending &&
          Array.from({ length: 12 }, (_, i) => (
            <li key={`skeleton-${i}`} aria-hidden="true">
              <MovieCardSkeleton />
            </li>
          ))}
      </ul>

      <p role="status" className="sr-only">
        {isPending ? "Loading more movies…" : ""}
      </p>
      {isError && (
        <button onClick={() => setIsError(false)}>
          Retry Loading movies...
        </button>
      )}

      <div ref={loaderRef} className="h-24" />
    </>
  );
};

export default MovieGrid;
