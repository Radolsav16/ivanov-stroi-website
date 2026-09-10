import type { PropsWithChildren } from "react";

type FormFieldProps = PropsWithChildren<{
  id: string;
  label: string;
  error?: string;
  className?: string;
  labelClassName?: string;
}>;

export default function FormField({
  id,
  label,
  error,
  className = "",
  labelClassName = "",
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children}
      <p
        id={errorId}
        aria-live="polite"
        className={`mt-2 min-h-5 text-xs leading-5 ${
          error ? "text-red-300" : "text-transparent"
        }`}
      >
        {error ?? " "}
      </p>
    </div>
  );
}
