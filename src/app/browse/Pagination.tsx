"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  const pages = visiblePages(currentPage, totalPages);

  return (
    <>
      {/* Mobile: compact Prev / Page X of Y / Next bar — easier on thumbs and
          fits a 360 px viewport without crowding the numbered jumper. */}
      <nav
        className="mt-6 flex items-center justify-between gap-2 sm:hidden"
        aria-label="Pagination"
      >
        <PageLink
          href={currentPage > 1 ? buildHref(currentPage - 1) : null}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span className="ml-1">Prev</span>
        </PageLink>
        <span className="text-sm text-muted-foreground tabular-nums">
          Page {currentPage} of {totalPages}
        </span>
        <PageLink
          href={currentPage < totalPages ? buildHref(currentPage + 1) : null}
          aria-label="Next page"
        >
          <span className="mr-1">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </PageLink>
      </nav>

      {/* Desktop / tablet: numbered jumper. */}
      <nav
        className="mt-6 hidden items-center justify-center gap-1 sm:flex"
        aria-label="Pagination"
      >
        <PageLink
          href={currentPage > 1 ? buildHref(currentPage - 1) : null}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </PageLink>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="px-2 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <PageLink
              key={p}
              href={p === currentPage ? null : buildHref(p)}
              active={p === currentPage}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </PageLink>
          )
        )}
        <PageLink
          href={currentPage < totalPages ? buildHref(currentPage + 1) : null}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </PageLink>
      </nav>
    </>
  );
}

function PageLink({
  href,
  active,
  children,
  ...rest
}: {
  href: string | null;
  active?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const className = cn(
    "inline-flex items-center justify-center rounded-md text-sm h-9 min-w-9 px-3",
    active
      ? "bg-primary text-primary-foreground"
      : "border border-input bg-background hover:bg-accent transition-colors",
    !href && !active && "opacity-40 pointer-events-none"
  );
  if (!href) return <span className={className} {...rest}>{children}</span>;
  return (
    <Link
      href={href}
      className={className}
      // After navigation, smooth-scroll to the top so the teacher lands on
      // the new question list without a jarring instant jump.
      onClick={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}
