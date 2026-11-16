type FormFieldProps = {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  hint?: string;
  errors?: string[];
  defaultValue?: string;
};

const FormField = ({
  name,
  label,
  type,
  autoComplete,
  hint,
  errors,
  defaultValue,
}: FormFieldProps) => {
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

export default FormField;
