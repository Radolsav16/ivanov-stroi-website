import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
  size?: "default" | "content" | "narrow" | "wide";
  padding?: "default" | "compact" | "page";
}>;

const sizes = {
  default: "max-w-7xl",
  content: "max-w-5xl",
  narrow: "max-w-4xl",
  wide: "max-w-[90rem]",
} as const;

const paddings = {
  default: "px-6 lg:px-8",
  compact: "px-4 sm:px-6 lg:px-8",
  page: "px-5 sm:px-6 lg:px-8",
} as const;

export default function Container({
  children,
  className = "",
  size = "default",
  padding = "default",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${sizes[size]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
