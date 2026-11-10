import Link from "next/link";
import { cn } from "@/lib/utils";
import { sourceLine, type Band, type MapTile } from "@/lib/performance/masteryMap";

/*
 * One chapter of the mastery map (/me/map), moved out of the map page on
 * 2026-11-09 so the homepage's How it works can show the real tile with sample
 * data. Behaviour unchanged.
 */

export const BAND_DOT: Record<Band, string> = {
  weak: "bg-red-500",
  mid: "bg-amber-500",
  mastered: "bg-emerald-500",
  unknown: "bg-muted-foreground/30",
};

export const BAND_LABEL: Record<Band, string> = {
  weak: "to fix",
  mid: "nearly there",
  mastered: "mastered",
  unknown: "not tested yet",
};

/**
 * A chapter tile. Collapsed: name, the dot row, the plain-words label.
 * Expanded (native <details>): one line per subtopic with its band and a
 * "Practise" link. The summary is the whole collapsed card so the tap target
 * is the tile, not a chevron.
 */
export default function MapTileCard({ tile }: { tile: MapTile }) {
  return (
    <details className="group rounded-xl border bg-card">
      <summary className="cursor-pointer list-none p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <p className="truncate text-sm font-semibold" title={tile.chapter}>
          {tile.chapter}
        </p>
        <div className="mt-2 flex flex-wrap gap-1" aria-hidden>
          {tile.dots.map((d) => (
            <span key={d.subtopic} className={cn("inline-block h-2.5 w-2.5 rounded-full", BAND_DOT[d.band])} />
          ))}
        </div>
        <p
          className={cn(
            "mt-2 text-xs",
            tile.counts.weak > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
          )}
        >
          {tile.label}
        </p>
      </summary>
      <ul className="space-y-1.5 border-t p-3">
        {tile.dots.map((d) => (
          <li key={d.subtopic} className="flex items-center gap-2 text-xs">
            <span className={cn("inline-block h-2.5 w-2.5 shrink-0 rounded-full", BAND_DOT[d.band])} aria-hidden />
            <span className="min-w-0 flex-1 truncate" title={d.subtopic}>
              {d.subtopic}
              <span className="sr-only">, {BAND_LABEL[d.band]}</span>
            </span>
            {d.accuracy !== null && (
              <span className="tabular-nums text-muted-foreground">{d.accuracy}%</span>
            )}
            <Link
              href={d.href}
              prefetch={false}
              aria-label={`Practise ${d.subtopic}`}
              className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
            >
              Practise
            </Link>
          </li>
        ))}
        {sourceLine(tile) && <li className="pt-1 text-xs text-muted-foreground">{sourceLine(tile)}</li>}
      </ul>
    </details>
  );
}
