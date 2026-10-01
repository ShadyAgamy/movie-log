import { cacheLife } from "next/cache";
import { Movie, MovieDetails } from "./types";

export const fetchMovies = async ({ pageNumber }: { pageNumber: number }) => {
  "use cache";
  cacheLife("hours");

  let res;
  try {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      },
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Couldn't reach the movie database. Try again later.");
  }
  const data = await res.json();
  if (!res.ok) {
    console.error("Error fetching movies:", data.status_message);
    throw new Error(data.status_message);
  }
  return data.results as Movie[];
};

export const fetchSingleMovie = async ({ movieId }: { movieId: number }) => {
  "use cache";
  cacheLife("days");
  let res;
  try {
    res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw new Error("Couldn't reach the movie database. Try again later.");
  }
  const data = await res.json();
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    console.error("Error fetching movie:", data.status_message);
    throw new Error(data.status_message);
  }
  return data as MovieDetails;
};
