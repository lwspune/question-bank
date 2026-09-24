import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Loop } from "@/lib/education/howItWorks";

/**
 * The three-step loop as numbered cards. Rendered by /start (both loops), the
 * welcome step (the chosen exam's loop) and the /me hero — one component, one
 * data source (lib/education/howItWorks.ts), so the words on every surface
 * are the same words. Server-safe: no hooks, no state.
 *
 * `prefetch={false}` on every step link: /drill and /me/map are per-user
 * server renders, and three cards in the viewport would run them for anyone
 * who merely opened the page (the 2026-09-15 outage class).
 */
export default function HowItWorks({
  loop,
  compact = false,
  linkSteps = true,
}: {
  loop: Loop;
  /** Tighter padding + smaller type, for a card inside another page. */
  compact?: boolean;
  /** /start links every step; the welcome screen has its own buttons. */
  linkSteps?: boolean;
}) {
  return (
    <ol className={compact ? "space-y-3" : "space-y-4"}>
      {loop.steps.map((s, i) => (
        <li
          key={s.href}
          className={
            "flex gap-4 rounded-xl border bg-card " + (compact ? "p-4" : "p-5 sm:p-6")
          }
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold tabular-nums text-brand-foreground"
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className={compact ? "font-semibold" : "text-lg font-semibold tracking-tight"}>
              {s.title}
            </p>
            <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
            {linkSteps && (
              <Link
                href={s.href}
                prefetch={false}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                {s.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
