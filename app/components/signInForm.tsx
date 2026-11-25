"use client";

import FormField from "@/app/components/formField";
import { useActionState } from "react";
import { userSignUpOrIninitialState } from "@/lib/types";
import { signIn } from "@/app/actions/auth";

const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(
    signIn,
    userSignUpOrIninitialState,
  );

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
    >
      {!state.success && state.message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300"
        >
          {state.message}
        </p>
      )}

      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        errors={state.errors?.email}
        defaultValue={state.inputs?.email}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        errors={state.errors?.password}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 h-10 cursor-pointer rounded-lg bg-neutral-800 font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};

export default SignInForm;
