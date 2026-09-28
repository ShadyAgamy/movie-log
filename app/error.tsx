"use client";
const ErrorPage = ({ retry }: { retry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <button
        onClick={retry}
        className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
