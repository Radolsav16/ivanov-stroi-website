import type { PropsWithChildren, ReactNode } from "react";
import { Link, type To } from "react-router-dom";

type ActionLinkBaseProps = {
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  target?: string;
  rel?: string;
};

type InternalActionLinkProps = ActionLinkBaseProps & {
  to: To;
  href?: never;
};

type ExternalActionLinkProps = ActionLinkBaseProps & {
  href: string;
  to?: never;
};

type ActionLinkProps = PropsWithChildren<
  InternalActionLinkProps | ExternalActionLinkProps
>;

const variants = {
  primary:
    "bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30",
  secondary:
    "border border-white/15 bg-white/5 text-white backdrop-blur-sm hover:border-white/25 hover:bg-white/10",
  quiet: "text-amber-500 hover:text-amber-400",
} as const;

export default function ActionLink({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  icon,
  iconPosition = "end",
  target,
  rel,
}: ActionLinkProps) {
  const content = (
    <>
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </>
  );
  const classNames = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={classNames}>{content}</Link>;
  }

  return <a href={href} className={classNames} target={target} rel={rel}>{content}</a>;
}
