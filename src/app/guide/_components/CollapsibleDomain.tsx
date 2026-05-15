import { ChevronDown } from "lucide-react";

type Props = {
  label: string; // "Algebra"
  blurb: string;
  principleCount: number;
  totalQ: number;
  /** Default-open for the first domain on the page, closed for the rest. */
  defaultOpen?: boolean;
  children: React.ReactNode;
};

/**
 * <details> accordion wrapper for one domain section on the Principles page.
 * The summary shows the domain label + aggregate counts; chevron rotates
 * via [open] selector + CSS, no JavaScript.
 */
export default function CollapsibleDomain({
  label,
  blurb,
  principleCount,
  totalQ,
  defaultOpen,
  children,
}: Props) {
  return (
    <details
      className="group rounded-lg border bg-card open:shadow-sm"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent/40">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {label}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            {principleCount} principle{principleCount === 1 ? "" : "s"} ·{" "}
            <span className="tabular-nums">{totalQ}</span> questions
            <span className="hidden sm:inline"> — {blurb}</span>
          </p>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="space-y-3 border-t bg-background p-4">{children}</div>
    </details>
  );
}
