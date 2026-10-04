"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import type { NextStep } from "@/lib/growth/secondPage";

/**
 * The card a chapter questions page shows after its 5th question: the chapter
 * test, the notes and the full bank, as plain links inside the list. Part of
 * the page, never a pop-up. Growth registry: "second-page".
 */
export default function NextStepCard({ links }: { links: NextStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = links[0]?.target ?? "none";

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackFunnelOnce("next_step_card_shown", "session", { target: first });
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [first]);

  if (links.length === 0) return null;
  return (
    <div ref={ref} className="rounded-lg border border-dashed bg-muted/40 p-4">
      <p className="font-sans text-sm font-semibold">Done a few? Here&rsquo;s your next move</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.target}>
            <Link
              href={l.href}
              onClick={() => trackFunnel("next_step_card_click", { target: l.target })}
              className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
