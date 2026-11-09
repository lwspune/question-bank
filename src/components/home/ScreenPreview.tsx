import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A product screen shown on the homepage as a picture (2026-11-09): framed like
 * the top of a phone screen, faded at the bottom, and inert, so nothing inside
 * can be tapped, focused or counted. Screen readers get one description, the
 * `label`, instead of the screen's own controls.
 *
 * The content is laid out at 125% width and scaled to 80%, so a page built for
 * a phone keeps its real proportions in a frame narrower than one.
 */
export default function ScreenPreview({
  label,
  title,
  children,
  className,
}: {
  /** What the screen shows, in one sentence (the image's text alternative). */
  label: string;
  /** The screen's name in the little top bar, e.g. "Review". */
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative mx-auto h-72 w-full max-w-[300px] overflow-hidden rounded-t-[22px] border border-b-0 bg-background shadow-[var(--shadow-card-hover)] [mask-image:linear-gradient(180deg,#000_78%,transparent)]",
        className
      )}
    >
      {/* `inert` as a non-empty string: React 18 (the runtime here) does not
          know the attribute and drops it when given a boolean or "" (checked in
          the rendered HTML, 2026-11-10). Any value makes the element inert. */}
      <div {...({ inert: "true" } as object)} aria-hidden className="pointer-events-none select-none">
        <div className="flex items-center gap-2 border-b bg-card px-3 py-2 text-[11px] font-semibold">
          <span className="h-3 w-3 rounded bg-brand" aria-hidden />
          {title}
        </div>
        <div className="w-[125%] origin-top-left scale-[0.8] p-3">{children}</div>
      </div>
    </div>
  );
}
