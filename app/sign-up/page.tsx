import type { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/app/components/signUpForm";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUpPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span aria-hidden className="text-4xl">
            🎬
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Start logging the movies you watch.
          </p>
        </div>

        <SignUpForm />

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
