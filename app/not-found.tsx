import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p
        aria-hidden="true"
        className="bg-linear-to-b from-neutral-300 to-neutral-100 bg-clip-text text-8xl font-black tracking-tighter text-transparent select-none sm:text-9xl dark:from-neutral-600 dark:to-neutral-900"
      >
        404
      </p>
      <h1 className="text-3xl font-bold sm:text-4xl">
        This scene didn&apos;t make the cut
      </h1>
      <p className="max-w-md text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
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
