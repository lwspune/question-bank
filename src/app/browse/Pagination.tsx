import Link from "next/link";
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
    <nav className="mt-6 flex items-center justify-center gap-1" aria-label="Pagination">
      <PageLink
        href={currentPage > 1 ? buildHref(currentPage - 1) : null}
        label="‹ Prev"
      />
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <PageLink
            key={p}
            href={p === currentPage ? null : buildHref(p)}
            label={String(p)}
            active={p === currentPage}
          />
        )
      )}
      <PageLink
        href={currentPage < totalPages ? buildHref(currentPage + 1) : null}
        label="Next ›"
      />
    </nav>
  );
}

function PageLink({
  href,
  label,
  active,
}: {
  href: string | null;
  label: string;
  active?: boolean;
}) {
  const className = cn(
    "inline-flex items-center justify-center rounded-md text-sm h-9 min-w-9 px-3",
    active
      ? "bg-primary text-primary-foreground"
      : "border border-input bg-background hover:bg-accent",
    !href && !active && "opacity-40 pointer-events-none"
  );
  if (!href) return <span className={className}>{label}</span>;
  return (
    <Link href={href} className={className}>
      {label}
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
