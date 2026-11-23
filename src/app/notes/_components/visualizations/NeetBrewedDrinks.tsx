/**
 * Static figure: how brewer's yeast gives the five drinks, in the NEET
 * concept's own terms (nbomi-beverages).
 *
 * Brewer's yeast, Saccharomyces cerevisiae, ferments malted cereals and fruit
 * juices to make ethanol. Wine and beer are made without distillation; whisky,
 * brandy and rum are made by distilling the fermented broth (the concept's
 * first trap, asked as "which is not distilled").
 *
 * The two lists are exported and pinned by tests/notes-w2-06.test.ts.
 * Server component.
 */

export const YEAST = { name: "Saccharomyces cerevisiae", common: "brewer's yeast" } as const;
export const RAW = "malted cereals and fruit juices";

export const DRINKS = {
  notDistilled: ["wine", "beer"],
  distilled: ["whisky", "brandy", "rum"],
} as const;

const BOX = "fill-amber-50 stroke-amber-700 dark:fill-amber-950/40 dark:stroke-amber-400";

export default function NeetBrewedDrinks() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · distilled or not
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="Brewer's yeast, Saccharomyces cerevisiae, ferments malted cereals and fruit juices into a broth with ethanol. Without distillation it gives wine and beer; distilled, it gives whisky, brandy and rum"
      >
        <defs>
          <marker id="bd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <rect x={60} y={8} width={200} height={28} rx={6} className={BOX} strokeWidth={1.3} />
        <text x={160} y={26} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {RAW}
        </text>

        <line x1={160} y1={36} x2={160} y2={78} className="stroke-muted-foreground" strokeWidth={1.4} markerEnd="url(#bd-arrow)" />
        <text x={168} y={54} className="fill-foreground text-[10px]">
          fermented by {YEAST.common}
        </text>
        <text x={168} y={67} className="fill-muted-foreground text-[10px] italic">
          {YEAST.name}
        </text>

        <rect x={70} y={80} width={180} height={28} rx={6} className={BOX} strokeWidth={1.3} />
        <text x={160} y={98} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          fermented broth with ethanol
        </text>

        <line x1={130} y1={108} x2={82} y2={152} className="stroke-muted-foreground" strokeWidth={1.4} markerEnd="url(#bd-arrow)" />
        <line x1={190} y1={108} x2={238} y2={152} className="stroke-muted-foreground" strokeWidth={1.4} markerEnd="url(#bd-arrow)" />
        <text x={96} y={128} textAnchor="end" className="fill-foreground text-[10.5px] font-semibold">
          not distilled
        </text>
        <text x={224} y={128} className="fill-foreground text-[10.5px] font-semibold">
          distilled
        </text>

        <rect x={14} y={154} width={130} height={34} rx={6} className="fill-sky-50 stroke-sky-700 dark:fill-sky-950/40 dark:stroke-sky-400" strokeWidth={1.6} />
        <text x={79} y={176} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {DRINKS.notDistilled.join(", ")}
        </text>
        <rect x={176} y={154} width={130} height={34} rx={6} className="fill-rose-50 stroke-rose-700 dark:fill-rose-950/40 dark:stroke-rose-400" strokeWidth={1.6} />
        <text x={241} y={176} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {DRINKS.distilled.join(", ")}
        </text>
        <text x={160} y={208} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Brewer&apos;s yeast and baker&apos;s yeast are the same species.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Wine and beer come straight from fermentation. Whisky, brandy and rum need the fermented broth to be distilled.
      </p>
    </div>
  );
}
