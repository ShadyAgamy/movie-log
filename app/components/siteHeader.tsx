import Link from "next/link";
import { Suspense } from "react";
import UserMenu, { UserMenuSkeleton } from "./userMenu";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/70 bg-background/80 backdrop-blur-md dark:border-neutral-800/70">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span aria-hidden className="text-xl">
            🎬
          </span>
          Movie Log
        </Link>
        <div className="ml-auto">
          <Suspense fallback={<UserMenuSkeleton />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
