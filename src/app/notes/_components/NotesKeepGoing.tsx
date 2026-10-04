import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavLink } from "@/lib/notes/keepGoing";

/**
 * "Keep going" — the way on at the end of a notes page. Server-rendered and
 * identical for every visitor, so it lives in the prerendered HTML (and gives
 * crawlers a next/previous chain through every chapter). Links come from
 * src/lib/notes/keepGoing.ts.
 */
export default function NotesKeepGoing({ next, prev }: { next: NavLink | null; prev: NavLink | null }) {
  if (!next && !prev) return null;
  return (
    <nav aria-label="Keep going" className="mt-12">
      {next && (
        <Link
          href={next.href}
          className="group flex items-center gap-4 rounded-lg border-2 border-brand/40 bg-brand/5 p-5 transition-colors hover:border-brand hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wide text-brand-accent">{next.kicker}</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight">{next.label}</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-brand-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
      {prev && (
        <Link
          href={prev.href}
          className="mt-3 inline-flex items-center gap-1.5 rounded px-1 text-sm text-muted-foreground hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          <span>
            {prev.kicker}: {prev.label}
          </span>
        </Link>
      )}
    </nav>
  );
}
