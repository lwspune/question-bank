"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A long paragraph that shows a few lines and expands on a "Read more".
 *
 * Built for the /notes chapter hero, where `intro` runs a median of 1,035 chars
 * (~165 words) across the 85 shipped chapters and up to 1,673 — 15-18 phone
 * lines before the reader reaches a single link.
 *
 * THE FULL TEXT IS ALWAYS RENDERED. Those 85 pages are ISR-static and the intro
 * is real indexable body copy, so the collapse is CSS (`line-clamp`) and never a
 * conditional render: hiding the tail behind a click would delete it from the
 * HTML that a crawler fetches. `tests/notes-hero-collapsible.test.ts` pins that.
 *
 * SAFE TO CLAMP HERE, and not in general: `intro` is one of the gated
 * PLAIN-TEXT notes fields (`npm run notes:latex` audits it), so there is no
 * KaTeX in the box. A clamp over rendered math truncates a formula mid-glyph —
 * do not lift this component onto a field that can carry `\(...\)`.
 */

type Props = {
  text: string;
  /** Applied to the paragraph, so the caller keeps its own type scale. */
  className?: string;
};

export default function ExpandableProse({ text, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  /**
   * Starts TRUE so the control is in the server-rendered HTML.
   *
   * The honest default is the one that costs nothing when it is right and least
   * when it is wrong. Every shipped intro overflows the clamp (shortest is 362
   * chars against a ~260-char desktop budget — asserted in the test), so
   * starting false would pop the button in after hydration on all 85 static
   * pages for no case that actually occurs. The effect below only ever turns it
   * OFF, for a future paragraph short enough that "Read more" would reveal
   * nothing.
   */
  const [overflows, setOverflows] = useState(true);
  const ref = useRef<HTMLParagraphElement>(null);
  const bodyId = useId();

  const measure = useCallback(() => {
    const el = ref.current;
    // Only meaningful while the clamp is applied — expanded, scrollHeight and
    // clientHeight are equal by construction and would wrongly hide "Show less".
    if (!el || expanded) return;
    setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [expanded]);

  useEffect(() => {
    measure();
    if (typeof ResizeObserver === "undefined") return;
    // The clamp is responsive (2 lines / 4 from `sm` up), so the answer changes
    // with the viewport — a rotate on a phone can take a 3-line paragraph from
    // overflowing to not.
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div>
      <p
        ref={ref}
        id={bodyId}
        className={cn(
          className,
          !expanded && "line-clamp-2 sm:line-clamp-4"
        )}
      >{text}</p>
      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          className="mt-2 inline-flex items-center gap-1 rounded text-sm font-medium text-brand-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
            aria-hidden
          />
        </button>
      )}
    </div>
  );
}
