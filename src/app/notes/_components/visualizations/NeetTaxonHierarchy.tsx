/**
 * Static figure: the seven obligate taxonomic categories as a ladder, in the
 * NEET concept's own terms (nbolw-hierarchy).
 *
 * Species is the lowest category and kingdom the highest. Each band is wider
 * than the one below it because, going up, a taxon holds more organisms; the
 * side arrow says the other half of the rule: they share fewer characters.
 * Animals use phylum and plants use division for the same step.
 *
 * The order and the band widths are exported and pinned by
 * tests/notes-w2-06.test.ts: ascending starts at species (the concept's trap)
 * and every band is wider than the one below. Server component.
 */

/** The seven categories, ascending (lowest first), as the concept lists them. */
export const ASCENDING = ["Species", "Genus", "Family", "Order", "Class", "Phylum or division", "Kingdom"] as const;

export const LADDER = { cx: 118, top: 34, bandH: 26, gap: 3, topWidth: 184, bottomWidth: 70 } as const;

/** Band geometry by rank from the top (0 = kingdom, 6 = species). */
export function band(fromTop: number): { y: number; wTop: number; wBottom: number } {
  const n = ASCENDING.length;
  const step = (LADDER.topWidth - LADDER.bottomWidth) / n;
  const y = LADDER.top + fromTop * (LADDER.bandH + LADDER.gap);
  return { y, wTop: LADDER.topWidth - step * fromTop, wBottom: LADDER.topWidth - step * (fromTop + 1) };
}

/** Descending order (highest first): the ladder read from the top. */
export function descending(): string[] {
  return [...ASCENDING].reverse();
}

const BAND_FILLS = [
  "fill-emerald-100 dark:fill-emerald-950/50",
  "fill-emerald-50 dark:fill-emerald-900/30",
] as const;

export default function NeetTaxonHierarchy() {
  const top = descending();
  const last = band(top.length - 1);
  const yTop = LADDER.top;
  const yBottom = last.y + LADDER.bandH;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the seven taxonomic categories
      </p>
      <svg
        viewBox="0 0 320 268"
        className="block h-auto w-full"
        role="img"
        aria-label="A ladder of the seven taxonomic categories, kingdom at the top and species at the bottom: kingdom, phylum or division, class, order, family, genus, species. Going up, each taxon holds more organisms that share fewer characters"
      >
        <defs>
          <marker id="tx-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {top.map((name, i) => {
          const b = band(i);
          const x = LADDER.cx;
          const points = [
            `${x - b.wTop / 2},${b.y}`,
            `${x + b.wTop / 2},${b.y}`,
            `${x + b.wBottom / 2},${b.y + LADDER.bandH}`,
            `${x - b.wBottom / 2},${b.y + LADDER.bandH}`,
          ].join(" ");
          return (
            <g key={name}>
              <polygon points={points} className={`${BAND_FILLS[i % 2]} stroke-emerald-700 dark:stroke-emerald-400`} strokeWidth={1.2} />
              <text x={x} y={b.y + 17} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {name}
              </text>
            </g>
          );
        })}

        {/* Ascending: from species up. */}
        <line x1={16} y1={yBottom} x2={16} y2={yTop + 4} className="stroke-muted-foreground" strokeWidth={1.4} markerEnd="url(#tx-arrow)" />
        <text
          x={11}
          y={(yTop + yBottom) / 2}
          textAnchor="middle"
          transform={`rotate(-90 11 ${(yTop + yBottom) / 2})`}
          className="fill-muted-foreground text-[10px] font-semibold"
        >
          ascending (species first)
        </text>

        {/* What changes going up. */}
        <line x1={222} y1={yBottom} x2={222} y2={yTop + 4} className="stroke-emerald-700 dark:stroke-emerald-400" strokeWidth={1.6} markerEnd="url(#tx-arrow)" />
        <text x={230} y={yTop + 10} className="fill-foreground text-[10px] font-semibold">
          highest category
        </text>
        <text x={230} y={yTop + 26} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          more organisms,
        </text>
        <text x={230} y={yTop + 39} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          fewer characters
        </text>
        <text x={230} y={yTop + 52} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          in common
        </text>
        <text x={230} y={yBottom - 40} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          fewer organisms,
        </text>
        <text x={230} y={yBottom - 27} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          more characters
        </text>
        <text x={230} y={yBottom - 14} className="fill-emerald-800 text-[10px] dark:fill-emerald-300">
          in common
        </text>
        <text x={230} y={yBottom} className="fill-foreground text-[10px] font-semibold">
          lowest category
        </text>

        <text x={160} y={yBottom + 24} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Animals use phylum; plants use division for the same step.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Read up from species for the ascending order, down from kingdom for the descending order. Each category is a rank,
        and a group at that rank is a taxon.
      </p>
    </div>
  );
}
