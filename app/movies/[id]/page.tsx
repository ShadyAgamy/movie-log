import MovieDetailsView from "@/app/components/movieDetailsView";
import { fetchSingleMovie } from "@/lib/dal";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getYear } from "@/lib/format";

const MoviePage = async ({ params }: PageProps<"/movies/[id]">) => {
  const { id } = await params;
  const movieId = Number(id);
  if (movieId <= 0 || !Number.isInteger(movieId)) {
    notFound();
  }

  const movieData = await fetchSingleMovie({ movieId });
  if (!movieData) {
    notFound();
  }

  return <MovieDetailsView movie={movieData} />;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const { id } = await params;

  const movieData = await fetchSingleMovie({ movieId: Number(id) });

  return !movieData
    ? {
        title: "Movie not found",
      }
    : {
        title: `${movieData.title} (${getYear(movieData.release_date)})`,
      };
}

export default MoviePage;
