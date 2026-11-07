"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPulse, usePulse } from "@/lib/viewer/usePulse";
import { progressTiles, type ProgressTile } from "@/lib/me/stats";
import type { Pulse } from "@/lib/pulse/cache";

/**
 * The /me progress row: answered, % right, fixed (2026-11-05), from the shared
 * pulse, the same read as the Today card and the header badge.
 *
 * Holds its height while the pulse is on its way so nothing below jumps, and
 * renders nothing once it has settled with no answers or no data: a zero there
 * reads as "you did nothing", and a failed read is not a zero. `fetchPulse`
 * returns the request already in flight, so waiting on it costs no fetch.
 */
export default function ProgressTiles({ pulse: given }: { pulse?: Pulse } = {}) {
  // The staff view of a student's /me passes the STUDENT's pulse; fetching
  // here would show the viewer's own numbers.
  const fetched = usePulse(!given);
  const pulse = given ?? fetched;
  const [settled, setSettled] = useState(!!given);

  useEffect(() => {
    if (given) return;
    let live = true;
    void fetchPulse().finally(() => {
      if (live) setSettled(true);
    });
    return () => {
      live = false;
    };
  }, [given]);

  const tiles = progressTiles(pulse?.totals, pulse?.due ?? null);

  if (!tiles) {
    if (pulse || settled) return null;
    return <div aria-hidden className="h-[76px] rounded-xl sm:h-[92px]" />;
  }

  return (
    <section aria-label="Your progress" className="grid grid-cols-3 gap-2 sm:gap-3">
      {tiles.map((t) => (
        <Tile key={t.key} tile={t} />
      ))}
    </section>
  );
}

function Tile({ tile }: { tile: ProgressTile }) {
  const body = (
    <>
      <span className="block text-2xl font-bold tabular-nums tracking-tight text-brand-accent">{tile.value}</span>
      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{tile.label}</span>
      {tile.note && <span className="mt-0.5 block text-xs font-medium tabular-nums text-foreground">{tile.note}</span>}
    </>
  );
  const base = "rounded-xl border bg-card p-3 sm:p-4";
  if (!tile.href) return <div className={base}>{body}</div>;
  return (
    <Link
      href={tile.href}
      prefetch={false}
      aria-label={tile.note ? `${tile.value} fixed, ${tile.note}: open the drill` : `${tile.value} fixed: open the drill`}
      className={`${base} transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      {body}
    </Link>
  );
}
