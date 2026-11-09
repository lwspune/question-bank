"use client";

/**
 * The signed-in student's Fix Points (migration 0245), for display. One fetch
 * per page load, shared by every component that asks; a failed or signed-out
 * read is null and every card then shows its plain price. The order route
 * reads the points again at checkout, so nothing here decides a price.
 */
import { useEffect, useMemo, useState } from "react";
import type { PassCta } from "@/lib/billing/plans";
import { fixPointsOfferNote, fixPointsStatusLine, type FixPointsView } from "@/lib/billing/fixPoints";
import { Sparkles } from "lucide-react";

let shared: Promise<FixPointsView | null> | null = null;

function load(fresh: boolean): Promise<FixPointsView | null> {
  if (shared && !fresh) return shared;
  const p = fetch("/api/me/fix-points", { cache: "no-store" })
    .then(async (res) => {
      if (!res.ok) return null;
      const body = (await res.json()) as ({ eligible: true } & FixPointsView) | { eligible: false };
      return body.eligible ? body : null;
    })
    .catch(() => null);
  // A failure is not kept, so the next card to mount can ask again.
  shared = p.then((v) => {
    if (v === null) shared = null;
    return v;
  });
  return shared;
}

/** Null until loaded, and on any failure. `fresh` skips the shared copy (the drill's end screen, after points moved). */
export function useFixPoints(enabled = true, fresh = false): FixPointsView | null {
  const [view, setView] = useState<FixPointsView | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    load(fresh).then((v) => {
      if (live) setView(v);
    });
    return () => {
      live = false;
    };
  }, [enabled, fresh]);
  return view;
}

/** The pass offer with its price lowered by the student's points, where they lower it. */
export function useDiscountedPass<T extends PassCta | null>(pass: T): T {
  const view = useFixPoints(pass !== null);
  return useMemo(() => {
    const price = pass && view && !view.hasPass ? view.prices[pass.planId] : undefined;
    return (pass && price ? { ...pass, price } : pass) as T;
  }, [pass, view]);
}

/** "Includes 12% off: you fixed 12 mistakes…" under an offer whose price the points lowered. */
export function FixPointsOfferNote({ planId, className }: { planId: string; className?: string }) {
  const view = useFixPoints();
  const note = view && view.prices[planId] ? fixPointsOfferNote(view) : null;
  if (!note) return null;
  return <p className={className ?? "text-center text-xs font-medium text-emerald-700 dark:text-emerald-400"}>{note}</p>;
}

/** Just the price, for a server-rendered card: lowered by the student's points where they apply. */
export function PassPrice({ pass }: { pass: PassCta }) {
  return <>{useDiscountedPass(pass).price}</>;
}

/**
 * "12 fix points: 12% off the pass…" on the drill's end screen and Review
 * (owner, 2026-11-09: shown with its value). Nothing for a pass holder, and
 * nothing until the read lands, so a failed read costs only this line.
 */
export function FixPointsStatus({ fresh = false, className }: { fresh?: boolean; className?: string }) {
  const line = fixPointsStatusLine(useFixPoints(true, fresh));
  if (!line) return null;
  return (
    <p className={className ?? "flex items-start gap-2 text-sm text-muted-foreground"}>
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
      <span>{line}</span>
    </p>
  );
}
