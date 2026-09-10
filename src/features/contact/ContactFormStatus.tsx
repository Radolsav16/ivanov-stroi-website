import type { ContactFormStatus } from "./types";

type ContactFormStatusProps = {
  status: ContactFormStatus;
  message: string;
  className?: string;
};

export default function ContactFormStatus({
  status,
  message,
  className = "",
}: ContactFormStatusProps) {
  if (status === "idle" || status === "submitting" || !message) return null;

  const isSuccess = status === "success";

  return (
    <p
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
        isSuccess
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border-red-400/30 bg-red-400/10 text-red-200"
      } ${className}`}
    >
      {message}
    </p>
  );
}
