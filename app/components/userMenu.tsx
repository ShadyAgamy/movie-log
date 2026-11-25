import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { signOut } from "../actions/auth";

const UserMenu = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
        Sign in
      </Link>
    );
  }

  const displayName = user.name ?? user.username;

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-sm">
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold text-white uppercase dark:bg-neutral-200 dark:text-neutral-900"
        >
          {displayName[0]}
        </span>
        <span className="hidden font-medium sm:inline">{displayName}</span>
      </span>
      <form action={signOut}>
        <button
          type="submit"
          className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-900"
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export const UserMenuSkeleton = () => (
  <div
    aria-hidden="true"
    className="h-7 w-28 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-900"
  />
);

export default UserMenu;
