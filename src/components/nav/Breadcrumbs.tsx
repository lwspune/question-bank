import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { href?: string; label: string };

/**
 * The site's one breadcrumb: a round Home button, then the trail.
 *
 * Home is a 36 px button rather than a 14 px grey icon (2026-10-07): it was
 * easy to miss and smaller than a thumb. It always links to "/", which sends a
 * signed-in student on to /me. Earlier crumbs are bold blue links, so they read
 * as links; the last one is the current page. Long trails wrap to a second line
 * on a phone instead of running off the screen.
 *
 * tests/breadcrumb-single-source.test.ts fails if any other file renders a
 * breadcrumb, because the seven hand-rolled copies this replaced had drifted
 * into six different styles.
 */
export default function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/30 bg-card text-brand-accent shadow-sm transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Home className="h-[18px] w-[18px]" aria-hidden />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            {item.href ? (
              <Link
                href={item.href}
                className="rounded py-1.5 font-semibold text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
