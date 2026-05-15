import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string; // e.g. "Strategy"
};

type Props = {
  prev?: NavItem;
  next?: NavItem;
  className?: string;
};

/**
 * Bottom-of-page Previous / Next pair. Renders nothing if both are absent.
 * Each side is optional so a landing page (no prev) or final page (no next)
 * looks correct.
 */
export default function PrevNextNav({ prev, next, className }: Props) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "mt-16 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-between",
        className
      )}
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col gap-1 rounded-md border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent sm:max-w-xs"
        >
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-primary">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col gap-1 rounded-md border bg-card p-4 text-right transition-colors hover:border-primary/40 hover:bg-accent sm:max-w-xs sm:items-end"
        >
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-primary">
            {next.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
