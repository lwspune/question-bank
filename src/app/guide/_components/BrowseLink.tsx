import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildBrowseUrl,
  type BrowseFilters,
} from "@/lib/guide/buildBrowseUrl";

type Props = BrowseFilters & {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
};

/**
 * A "Drill these N questions →" CTA used throughout /guide pages. Resolves
 * to the /browse URL with the given filters pre-applied. The label content
 * is supplied by the caller (so the caller decides whether to render a live
 * count from a server-side facet query or a static label).
 */
export default function BrowseLink({
  children,
  className,
  variant = "primary",
  ...filters
}: Props) {
  const href = buildBrowseUrl(filters);
  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "text-primary hover:underline underline-offset-4",
  }[variant];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
        styles,
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}
