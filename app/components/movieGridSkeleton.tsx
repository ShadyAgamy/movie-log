export const MovieCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="aspect-2/3 rounded-xl bg-neutral-100 dark:bg-neutral-900" />
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="h-3.5 w-3/4 rounded bg-neutral-100 dark:bg-neutral-900" />
        <div className="h-3 w-1/4 rounded bg-neutral-100 dark:bg-neutral-900" />
      </div>
    </div>
  );
};

const MovieGridSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <div role="status">
      <span className="sr-only">Loading movies…</span>
      <ul
        aria-hidden="true"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
      >
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <MovieCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieGridSkeleton;
