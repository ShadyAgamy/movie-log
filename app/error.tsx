"use client";
const ErrorPage = ({ retry }: { retry: () => void }) => {
  return (
    <div
      role="alert"
      className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center"
    >
      <span
        aria-hidden="true"
        className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-7"
        >
          <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
      </span>
      <h1 className="text-3xl font-bold sm:text-4xl">Something went wrong</h1>
      <p className="max-w-md text-neutral-500">
        We couldn&apos;t load this page. It&apos;s probably temporary, so give it
        another try.
      </p>
      <button
        onClick={retry}
        className="mt-4 rounded-lg bg-neutral-800 px-5 py-2 font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
