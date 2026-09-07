import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  lines?: "none" | "before" | "after" | "both";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const alignment = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const eyebrowAlignment = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  lines = "none",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeadingProps) {
  const hasBeforeLine = lines === "before" || lines === "both";
  const hasAfterLine = lines === "after" || lines === "both";

  return (
    <div className={`${alignment[align]} ${className}`}>
      {eyebrow && (
        <div className={`mb-5 flex items-center gap-3 ${eyebrowAlignment[align]}`}>
          {hasBeforeLine && <span aria-hidden="true" className="h-px w-10 bg-amber-500" />}
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
            {eyebrow}
          </p>
          {hasAfterLine && <span aria-hidden="true" className="h-px w-10 bg-amber-500" />}
        </div>
      )}
      <h2 className={`text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-8 text-gray-400 ${
            align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
          } ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
