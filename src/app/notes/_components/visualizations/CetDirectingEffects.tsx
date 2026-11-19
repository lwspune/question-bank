/**
 * Static figure: where a second group enters a substituted benzene ring
 * (concept cetarom-directing-effects).
 *
 * Three rings with the concept's own groups:
 * - –OH: pushes electrons into the ring, ortho/para director, activating.
 * - –Cl: a halogen, still ortho/para through its lone pairs, but deactivating
 *   (the concept's "halogens deactivate but still direct o/p").
 * - –NO₂: pulls electrons out, meta director, deactivating.
 * Positions are counted round the ring from the carbon holding the group:
 * next door is ortho (2 and 6), one further meta (3 and 5), opposite para (4).
 * Below, the concept's two lists and its para-major example
 * (chlorobenzene + Cl₂ → 1,4-dichlorobenzene).
 *
 * Server component. Pinned by tests/notes-cet-visuals-chem-b.test.ts.
 */

export type Director = "o/p" | "m";

/** Position name of ring carbon k (0 = the carbon holding the group, then round the ring). */
export function positionName(k: number): "ipso" | "o" | "m" | "p" {
  const d = Math.min(k % 6, 6 - (k % 6));
  return d === 0 ? "ipso" : d === 1 ? "o" : d === 2 ? "m" : "p";
}

/** The ring carbons a director sends the new group to. */
export function directedPositions(dir: Director): number[] {
  return [1, 2, 3, 4, 5].filter((k) => (dir === "o/p" ? positionName(k) !== "m" : positionName(k) === "m"));
}

export const PANELS = [
  { group: "OH", director: "o/p" as Director, activates: true },
  { group: "Cl", director: "o/p" as Director, activates: false },
  { group: "NO₂", director: "m" as Director, activates: false },
] as const;

/** The concept's two lists. */
export const OP_GROUPS = ["–OH", "–OCH₃", "–NH₂", "–R", "–X"] as const;
export const M_GROUPS = ["–NO₂", "–CHO", "–COOH", "–COR", "–CN", "–SO₃H"] as const;

// Geometry (viewBox units).
export const CENTRES = [56, 160, 264] as const;
const RING_Y = 84;
const R = 24;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function vertex(cx: number, k: number, radius = R): { x: number; y: number } {
  const a = ((-90 + 60 * k) * Math.PI) / 180;
  return { x: r1(cx + radius * Math.cos(a)), y: r1(RING_Y + radius * Math.sin(a)) };
}

function Ring({ cx, group, director, activates }: { cx: number; group: string; director: Director; activates: boolean }) {
  const pts = [0, 1, 2, 3, 4, 5].map((k) => vertex(cx, k));
  const top = pts[0];
  const marked = directedPositions(director);
  const op = director === "o/p";
  return (
    <g>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" strokeWidth={1.5} className="stroke-foreground" />
      <circle cx={cx} cy={RING_Y} r={14} fill="none" strokeWidth={1.2} className="stroke-foreground" />
      <line x1={top.x} y1={top.y} x2={top.x} y2={top.y - 14} strokeWidth={1.5} className="stroke-foreground" />
      <text x={top.x} y={top.y - 18} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {group}
      </text>
      {marked.map((k) => {
        const v = pts[k];
        const lab = vertex(cx, k, R + 11);
        return (
          <g key={k}>
            <circle
              cx={v.x}
              cy={v.y}
              r={3.2}
              className={op ? "fill-emerald-600 dark:fill-emerald-400" : "fill-amber-600 dark:fill-amber-400"}
            />
            <text
              x={lab.x}
              y={lab.y + 4}
              textAnchor="middle"
              className={`text-[11px] font-bold ${op ? "fill-emerald-700 dark:fill-emerald-300" : "fill-amber-700 dark:fill-amber-300"}`}
            >
              {positionName(k)}
            </text>
          </g>
        );
      })}
      <text x={cx} y={140} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {director} director
      </text>
      <text
        x={cx}
        y={154}
        textAnchor="middle"
        className={`text-[11px] ${activates ? "fill-emerald-700 dark:fill-emerald-300" : "fill-rose-700 dark:fill-rose-300"}`}
      >
        {activates ? "activates the ring" : "deactivates"}
      </text>
    </g>
  );
}

export default function CetDirectingEffects() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · where the second group goes
      </p>
      <svg
        viewBox="0 0 320 226"
        className="block h-auto w-full"
        role="img"
        aria-label="Three benzene rings. With –OH the new group goes ortho or para and the ring is activated. With –Cl it also goes ortho or para, but the ring is deactivated. With –NO₂ it goes meta and the ring is deactivated."
      >
        {PANELS.map((p, i) => (
          <Ring key={p.group} cx={CENTRES[i]} group={p.group} director={p.director} activates={p.activates} />
        ))}
        <line x1={8} y1={166} x2={312} y2={166} className="stroke-border" />
        <text x={8} y={182} className="fill-emerald-700 text-[10.5px] dark:fill-emerald-300">
          <tspan className="font-semibold">o/p:</tspan> {OP_GROUPS.join(", ")} (X = halogen)
        </text>
        <text x={8} y={197} className="fill-amber-700 text-[10.5px] dark:fill-amber-300">
          <tspan className="font-semibold">m:</tspan> {M_GROUPS.join(", ")}
        </text>
        <text x={8} y={214} className="fill-muted-foreground text-[10.5px]">
          Para is usually major: C₆H₅Cl + Cl₂ → 1,4-dichlorobenzene
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        o = ortho (next carbon), m = meta (one further), p = para (opposite). A dot marks where the new group goes.
      </p>
    </div>
  );
}
