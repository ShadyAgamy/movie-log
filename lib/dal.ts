export const fetchMovies = async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error fetching movies:", data.status_message);
      return { movies: [], status_message: data.status_message };
    }
    return { movies: data.results, status_message: undefined };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      movies: [],
      status_message: "Couldn't reach the movie database. Try again later.",
    };
  }
};
