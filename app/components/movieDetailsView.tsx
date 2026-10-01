import {
  formatDate,
  formatLanguage,
  formatRuntime,
  getYear,
} from "@/lib/format";
import { MovieDetails } from "@/lib/types";
import Image from "next/image";
import Rating from "./rating";

const IMG = "https://image.tmdb.org/t/p";

const MovieDetailsView = ({ movie }: { movie: MovieDetails }) => {
  const year = getYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);

  return (
    <article className="pb-16">
      <div className="relative mx-auto aspect-video w-full max-w-6xl mask-x-from-80% mask-b-from-45%">
        {movie.backdrop_path && (
          <Image
            src={`${IMG}/w1280${movie.backdrop_path}`}
            alt=""
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            loading="eager"
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-background/25" />
      </div>

      {/* Poster + headline, overlapping the backdrop */}
      <div className="relative mx-auto -mt-16 flex max-w-5xl flex-col gap-6 px-4 sm:-mt-56 sm:flex-row sm:items-end sm:gap-8">
        <div className="relative aspect-2/3 w-40 shrink-0 overflow-hidden rounded-xl bg-neutral-800 shadow-2xl ring-1 ring-white/10 sm:w-56">
          {movie.poster_path ? (
            <Image
              src={`${IMG}/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              fill
              sizes="(min-width: 640px) 224px, 160px"
              loading="eager"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-neutral-400">
              No poster
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            {movie.title}
            {year && (
              <span className="ml-3 font-normal text-neutral-500">{year}</span>
            )}
          </h1>

          {movie.tagline && (
            <p className="text-lg italic text-neutral-500">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Rating average={movie.vote_average} count={movie.vote_count} />
            {runtime && <span className="text-neutral-500">{runtime}</span>}
          </div>

          {movie.genres.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium dark:border-neutral-700"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 px-4 md:grid-cols-[1fr_16rem]">
        <section>
          <h2 className="mb-3 text-xl font-semibold">Overview</h2>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
            {movie.overview || "No overview available."}
          </p>
        </section>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm md:grid-cols-1">
          <Fact label="Status" value={movie.status} />
          <Fact label="Release date" value={formatDate(movie.release_date)} />
          <Fact
            label="Original language"
            value={formatLanguage(movie.original_language)}
          />
          <Fact
            label="Spoken languages"
            value={movie.spoken_languages.map((l) => l.english_name).join(", ")}
          />
          {movie.homepage && (
            <div>
              <dt className="text-neutral-500">Website</dt>
              <dd>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-neutral-500"
                >
                  Official site ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
};

const Fact = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <div>
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  ) : null;

export default MovieDetailsView;
