import type { Metadata } from "next";
import Link from "next/link";
import SignInForm from "@/app/components/signInForm";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span aria-hidden className="text-4xl">
            🎬
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to your movie log.
          </p>
        </div>

        <SignInForm />

        <p className="mt-6 text-center text-sm text-neutral-500">
          New here?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
