"use client";

/**
 * The signed-in student's Vault Points (migration 0245; the table is still
 * fix_points, named for the first way to earn them), for display. One fetch
 * per page load, shared by every component that asks; a failed or signed-out
 * read is null and every card then shows its plain price. The order route
 * reads the points again at checkout, so nothing here decides a price.
 */
import { useEffect, useMemo, useState } from "react";
import type { PassCta } from "@/lib/billing/plans";
import Link from "next/link";
import {
  vaultPointsOfferNote,
  vaultPointsLine,
  vaultPointsShort,
  vaultPointsLapseLine,
  type FixPointsView,
} from "@/lib/billing/fixPoints";
import { drillHref } from "@/lib/drill/from";
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
export function VaultPointsOfferNote({ planId, className }: { planId: string; className?: string }) {
  const view = useFixPoints();
  const note = view && view.prices[planId] ? vaultPointsOfferNote(view) : null;
  if (!note) return null;
  return <p className={className ?? "text-center text-xs font-medium text-emerald-700 dark:text-emerald-400"}>{note}</p>;
}

/** Just the price, for a server-rendered card: lowered by the student's points where they apply. */
export function PassPrice({ pass }: { pass: PassCta }) {
  return <>{useDiscountedPass(pass).price}</>;
}

/**
 * "12 Vault Points: 12% off the pass…" on the drill's end screen and Review
 * (owner, 2026-11-09: shown with its value, to every student; a pass holder's
 * points lower their next pass). Nothing until the read lands, so a failed
 * read costs only this line.
 */
export function VaultPointsStatus({ fresh = false, className }: { fresh?: boolean; className?: string }) {
  const line = vaultPointsLine(useFixPoints(true, fresh));
  if (!line) return null;
  return (
    <p className={className ?? "flex items-start gap-2 text-sm text-muted-foreground"}>
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
      <span>{line}</span>
    </p>
  );
}

/**
 * The Vault Points card on /me Home (owner, 2026-11-09: every student sees
 * their points there). What they are worth, when the oldest run out, and the
 * one way to earn more today. Nothing until the read lands, and nothing on
 * the intl site (the route answers not eligible there).
 */
export function VaultPointsCard() {
  const view = useFixPoints();
  const line = vaultPointsLine(view);
  if (!view || !line) return null;
  const lapse = vaultPointsLapseLine(view);
  return (
    <section aria-labelledby="vault-points-heading" className="rounded-xl border bg-card p-6">
      <h2 id="vault-points-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
        Vault Points
        <span className="ml-auto text-2xl font-bold tabular-nums">{view.points}</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{line}</p>
      {lapse && <p className="mt-1 text-xs text-muted-foreground">{lapse}</p>}
      <Link
        prefetch={false}
        href={drillHref("me_points")}
        className="mt-3 inline-flex text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Fix your mistakes
      </Link>
    </section>
  );
}

/**
 * The avatar menu's points line. It sits inside the menu's popover, which
 * mounts only when opened, so the read happens on open and not on every page.
 */
export function VaultPointsMenuLine() {
  const short = vaultPointsShort(useFixPoints());
  if (!short) return null;
  return (
    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-emerald-700 dark:text-emerald-400">
      <Sparkles className="h-3 w-3 shrink-0" aria-hidden />
      <span className="truncate">{short}</span>
    </p>
  );
}
