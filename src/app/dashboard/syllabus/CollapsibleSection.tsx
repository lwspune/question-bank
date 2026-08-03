import type { ReactNode } from "react";

/**
 * A section that folds away.
 *
 * Built on native <details>/<summary> rather than a JS accordion, deliberately:
 * the page is entirely server-rendered, and a state-driven version would force
 * "use client" on it for a disclosure triangle. Native also gets keyboard and
 * screen-reader behaviour for free, and browsers skip layout for the collapsed
 * subtree — which is the actual win, since five tables make up 92% of this page.
 *
 * KNOWN LIMIT: Chrome and Edge auto-expand a closed <details> when you Ctrl+F
 * into it; Firefox and Safari do not. So on those, find-on-page cannot reach a
 * collapsed table. The row count in the summary is there to reduce how often
 * you need to open one to find out what is inside.
 */
export default function CollapsibleSection({
  id,
  title,
  count,
  countLabel = "rows",
  description,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  /** Shown in the summary so the cost of opening is visible up front. */
  count?: number;
  countLabel?: string;
  description?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group mb-4 rounded-lg border bg-card">
      <summary
        className="flex cursor-pointer list-none items-center gap-2 p-3 text-sm font-semibold marker:content-none hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        aria-controls={id}
      >
        {/* Rotates on open. aria-hidden: the <summary> already announces state. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
          fill="currentColor"
        >
          <path d="M7 5l6 5-6 5V5z" />
        </svg>
        <span className="flex-1">{title}</span>
        {count !== undefined && (
          <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs font-normal tabular-nums text-muted-foreground">
            {count} {countLabel}
          </span>
        )}
      </summary>
      <div id={id} className="border-t p-3 pt-4">
        {description && <div className="mb-3 text-xs text-muted-foreground">{description}</div>}
        {children}
      </div>
    </details>
  );
}
