/**
 * Static figure: the three patterns of selection on a continuous trait from
 * the IMAT concept imat-evo-selection-types. Each panel draws the starting
 * bell curve (faint, dashed) and the curve after selection (solid), with
 * arrows to the phenotypes that are favoured, and the concept's own example
 * as its caption:
 *
 * - Directional: one extreme favoured, the mean shifts (peppered moths).
 * - Stabilising: the middle favoured, narrower curve, same mean (birth weight).
 * - Disruptive: both extremes favoured, two peaks (finch beaks).
 *
 * The curves are exported and pinned by tests/notes-imat-visuals-bioevo.test.ts.
 * Server component, no client state.
 */

export type Bell = { mean: number; sd: number; weight: number };
export type SelectionPanel = {
  id: "directional" | "stabilising" | "disruptive";
  title: string;
  trait: string;
  /** The low and high ends of the trait axis, as the example names them. */
  ends: readonly [string, string];
  favoured: string;
  example: string;
  before: readonly Bell[];
  after: readonly Bell[];
  /** Arrows (trait values): from, to. They point to the favoured phenotypes. */
  arrows: readonly (readonly [number, number])[];
};

/** Trait values run 0 to 10 on every panel; the starting curve is the same in all three. */
export const TRAIT_MAX = 10;
const START: readonly Bell[] = [{ mean: 5, sd: 1.5, weight: 1 }];

export const SELECTION_PANELS: readonly SelectionPanel[] = [
  {
    id: "directional",
    title: "Directional",
    trait: "wing colour",
    ends: ["light", "dark"],
    favoured: "one extreme",
    example: "Dark peppered moths on sooty trees in industrial England: the mean shifts towards dark.",
    before: START,
    after: [{ mean: 6.8, sd: 1.3, weight: 1 }],
    arrows: [[7.6, 9.4]],
  },
  {
    id: "stabilising",
    title: "Stabilising",
    trait: "birth weight",
    ends: ["light", "heavy"],
    favoured: "the middle",
    example: "Human birth weight: very light and very heavy babies fared worst. Narrower curve, same mean.",
    before: START,
    after: [{ mean: 5, sd: 0.8, weight: 1 }],
    arrows: [
      [1.6, 3.6],
      [8.4, 6.4],
    ],
  },
  {
    id: "disruptive",
    title: "Disruptive",
    trait: "beak size",
    ends: ["small", "large"],
    favoured: "both extremes",
    example: "Finches with large or small beaks where only large or small seeds exist: the curve splits into two peaks.",
    before: START,
    after: [
      { mean: 2.8, sd: 0.9, weight: 0.5 },
      { mean: 7.2, sd: 0.9, weight: 0.5 },
    ],
    arrows: [
      [4.4, 2.4],
      [5.6, 7.6],
    ],
  },
];

/** Height of a curve (a sum of weighted normal curves) at trait value t. */
export function density(bells: readonly Bell[], t: number): number {
  return bells.reduce(
    (sum, b) => sum + (b.weight / (b.sd * Math.sqrt(2 * Math.PI))) * Math.exp(-((t - b.mean) ** 2) / (2 * b.sd ** 2)),
    0,
  );
}

/** Mean trait value of a curve. */
export function meanOf(bells: readonly Bell[]): number {
  const w = bells.reduce((s, b) => s + b.weight, 0);
  return bells.reduce((s, b) => s + b.weight * b.mean, 0) / w;
}

// Panel geometry (viewBox units).
const W = 320;
const H = 100;
const PL = 14;
const PR = 14;
const BASE = 84;
const PLOT_H = 58;
const Y_MAX = 0.52; // the tallest curve (stabilising, sd 0.8) peaks at 0.499
const px = (t: number) => PL + (t / TRAIT_MAX) * (W - PL - PR);
const py = (d: number) => BASE - (d / Y_MAX) * PLOT_H;

export function curvePoints(bells: readonly Bell[], n = 80): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (TRAIT_MAX * i) / n;
    pts.push(`${px(t).toFixed(1)},${py(density(bells, t)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function Panel({ panel }: { panel: SelectionPanel }) {
  const arrowY = 22;
  return (
    <figure className="rounded-md border border-indigo-100 bg-background/60 p-3 dark:border-indigo-900/40">
      <figcaption className="mb-1 text-xs font-semibold text-foreground">
        {panel.title}: {panel.favoured} favoured
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${panel.title} selection on ${panel.trait}: the dashed starting curve and the solid curve after selection, with arrows towards ${panel.favoured}`}
      >
        <defs>
          <marker id={`sel-arrow-${panel.id}`} viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
        </defs>

        <line x1={PL} y1={BASE} x2={W - PR} y2={BASE} className="stroke-muted-foreground/60" />
        <text x={PL} y={BASE + 13} className="fill-muted-foreground text-[10px]">
          {panel.ends[0]}
        </text>
        <text x={W - PR} y={BASE + 13} textAnchor="end" className="fill-muted-foreground text-[10px]">
          {panel.ends[1]}
        </text>
        <text x={W / 2} y={BASE + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {panel.trait}
        </text>

        <polyline points={curvePoints(panel.before)} fill="none" strokeWidth={1.5} strokeDasharray="4 3" className="stroke-slate-400 dark:stroke-slate-500" />
        <polyline points={curvePoints(panel.after)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />

        {panel.arrows.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={px(from)}
            y1={arrowY}
            x2={px(to)}
            y2={arrowY}
            strokeWidth={2}
            className="stroke-amber-600 dark:stroke-amber-400"
            markerEnd={`url(#sel-arrow-${panel.id})`}
          />
        ))}
        {panel.arrows.map(([from, to]) => (
          <text
            key={`label-${from}-${to}`}
            x={px(to)}
            y={arrowY - 7}
            textAnchor="middle"
            className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300"
          >
            favoured
          </text>
        ))}
      </svg>
      <p className="mt-1 text-xs text-muted-foreground">{panel.example}</p>
    </figure>
  );
}

export default function ImatSelectionTypes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three ways selection changes a trait
      </p>
      <div className="grid grid-cols-1 gap-3">
        {SELECTION_PANELS.map((p) => (
          <Panel key={p.id} panel={p} />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The height of a curve is the number of individuals with that value of the trait. Dashed: before selection. Solid: after. Arrows point to the phenotypes that survive
        and breed best. Directional moves the mean, stabilising narrows the curve, disruptive splits it in two.
      </p>
    </div>
  );
}
