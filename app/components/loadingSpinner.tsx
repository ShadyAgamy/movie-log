const LoadingSpinner = ({ label = "Loading…" }: { label?: string }) => {
  return (
    <div
      role="status"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24"
    >
      <div className="size-10 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-200" />
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
};

export default LoadingSpinner;
