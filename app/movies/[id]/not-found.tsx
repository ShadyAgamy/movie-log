import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
        404
      </p>
      <h1 className="text-3xl font-bold sm:text-4xl">
        We couldn&apos;t find that movie
      </h1>
      <p className="max-w-md text-neutral-500">
        It may have been removed, or the link might be wrong.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-neutral-800 px-5 py-2 font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
      >
        Back to home
      </Link>
    </div>
  );
};
export default NotFound;
