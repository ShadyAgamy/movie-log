"use client";

import { ActionResponse } from "@/lib/types";
import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

type FieldProps = {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  hint?: string;
  errors?: string[];
  defaultValue?: string;
};

const Field = ({
  name,
  label,
  type,
  autoComplete,
  hint,
  errors,
  defaultValue,
}: FieldProps) => {
  const hasError = !!errors?.length;
  const describedBy = hasError
    ? `${name}-error`
    : hint
      ? `${name}-hint`
      : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className="h-10 rounded-lg border border-neutral-300 bg-transparent px-3 text-sm transition-colors outline-none placeholder:text-neutral-400 focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500/30 aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/30 dark:border-neutral-700"
      />
      {hasError ? (
        <p
          id={`${name}-error`}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {errors[0]}
        </p>
      ) : (
        hint && (
          <p id={`${name}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
};

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

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

      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        errors={state.errors?.email}
        defaultValue={state?.inputs?.email}
      />
      <Field
        name="username"
        label="Username"
        type="text"
        autoComplete="username"
        hint="4–25 characters: letters, numbers, - and _"
        errors={state.errors?.username}
        defaultValue={state?.inputs?.username}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters"
        errors={state.errors?.password}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 h-10 rounded-lg bg-neutral-800 font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
};

export default SignUpForm;
