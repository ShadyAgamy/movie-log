"use client";
import { Movie } from "@/lib/types";
import Image from "next/image";
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
      <div className="flex flex-wrap justify-center gap-4">
        {movieList.map((movie: Movie, i) => (
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

      <div ref={loaderRef}>{isPending && <div>Loading...</div>}</div>
    </>
  );
};

export default MovieGrid;
