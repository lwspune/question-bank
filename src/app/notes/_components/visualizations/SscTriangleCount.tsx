/**
 * Static figure: counting the triangles of the worked example (concept
 * sscrfctr-label). Triangle ABC with D and E on BC in the order B, D, E, C,
 * both joined to A. The base is cut into 3 parts; the triangles are listed by
 * size: one part (ABD, ADE, AEC), two parts (ABE, ADC), three parts (ABC),
 * 6 in all, matching 3 × 4 ÷ 2. The list is computed by checking every set of
 * three labelled points against the drawn lines, so it cannot miss or double
 * a triangle. Plain geometry, server component. Pinned by
 * tests/notes-w2-13.test.ts.
 */

export type Pt = { x: number; y: number };

export const POINTS: Record<string, Pt> = {
  A: { x: 160, y: 14 },
  B: { x: 46, y: 104 },
  D: { x: 122, y: 104 },
  E: { x: 198, y: 104 },
  C: { x: 274, y: 104 },
};

/** The base points in order along BC. */
export const BASE = ["B", "D", "E", "C"] as const;

/** Every drawn line, as the labelled points lying on it. */
export const LINES: string[][] = [["A", "B"], ["A", "D"], ["A", "E"], ["A", "C"], ["B", "D", "E", "C"]];

const onOneLine = (pts: string[]) => LINES.some((l) => pts.every((p) => l.includes(p)));

/** All triangles: three points, each pair joined by a drawn line, not all on one line. */
export function listTriangles(): string[] {
  const names = Object.keys(POINTS);
  const out: string[] = [];
  for (let i = 0; i < names.length; i++)
    for (let j = i + 1; j < names.length; j++)
      for (let k = j + 1; k < names.length; k++) {
        const t = [names[i], names[j], names[k]];
        const sidesDrawn = onOneLine([t[0], t[1]]) && onOneLine([t[1], t[2]]) && onOneLine([t[0], t[2]]);
        if (sidesDrawn && !onOneLine(t)) out.push(t.join(""));
      }
  return out;
}

/** A triangle A, X, Y with X, Y on the base: how many base parts it covers. */
export function partsOf(base1: string, base2: string): number {
  return Math.abs(BASE.indexOf(base1 as (typeof BASE)[number]) - BASE.indexOf(base2 as (typeof BASE)[number]));
}

/** The worked example's listing, by size, in its own order and names. */
export const BY_SIZE: { parts: number; names: string[] }[] = [
  { parts: 1, names: ["ABD", "ADE", "AEC"] },
  { parts: 2, names: ["ABE", "ADC"] },
  { parts: 3, names: ["ABC"] },
];

export const fanCount = (k: number) => (k * (k + 1)) / 2;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A small copy of the figure at (ox, oy), scale s, with triangle `name` shaded. */
function Thumb({ name, ox, oy, s }: { name: string; ox: number; oy: number; s: number }) {
  const at = (p: Pt) => ({ x: r2(ox + (p.x - 46) * s), y: r2(oy + (p.y - 14) * s) });
  const pts = name.split("").map((n) => at(POINTS[n]));
  const a = at(POINTS.A);
  return (
    <g>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} className="fill-sky-400/60 dark:fill-sky-500/50" stroke="none" />
      {LINES.map((l) => {
        const p = at(POINTS[l[0]]);
        const q = at(POINTS[l[l.length - 1]]);
        return <line key={l.join("")} x1={p.x} y1={p.y} x2={q.x} y2={q.y} strokeWidth={1} className="stroke-muted-foreground" />;
      })}
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" strokeWidth={1.6} className="stroke-sky-700 dark:stroke-sky-300" />
      <text x={a.x} y={r2(oy + 90 * s + 12)} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {name}
      </text>
    </g>
  );
}

export default function SscTriangleCount() {
  const s = 0.25;
  const thumbW = 228 * s;
  const rowY = [140, 196, 252];
  const total = BY_SIZE.reduce((n, r) => n + r.names.length, 0);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · listing triangles by size
      </p>
      <svg
        viewBox="0 0 320 318"
        className="block h-auto w-full"
        role="img"
        aria-label="Triangle ABC with D and E on BC, both joined to A. The base is cut into three parts. One-part triangles: ABD, ADE, AEC. Two-part triangles: ABE, ADC. Three parts: ABC. Six triangles in all, which matches 3 times 4 divided by 2."
      >
        {LINES.map((l) => {
          const p = POINTS[l[0]];
          const q = POINTS[l[l.length - 1]];
          return <line key={l.join("")} x1={p.x} y1={p.y} x2={q.x} y2={q.y} strokeWidth={1.6} className="stroke-foreground" />;
        })}
        {Object.entries(POINTS).map(([n, p]) => (
          <g key={n}>
            <circle cx={p.x} cy={p.y} r={2.4} className="fill-foreground" />
            <text x={p.x} y={n === "A" ? p.y - 4 : p.y + 14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {n}
            </text>
          </g>
        ))}
        <text x={160} y={132} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          The base BC is cut into 3 parts: BD, DE, EC
        </text>

        {BY_SIZE.map((row, i) => (
          <g key={row.parts}>
            <text x={4} y={rowY[i] + 16} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
              {row.parts === 1 ? "1 part" : `${row.parts} parts`}
            </text>
            {row.names.map((name, j) => (
              <Thumb key={name} name={name} ox={58 + j * (thumbW + 14)} oy={rowY[i]} s={s} />
            ))}
            <text x={316} y={rowY[i] + 16} textAnchor="end" className="fill-indigo-700 text-[12px] font-bold dark:fill-indigo-300">
              {row.names.length}
            </text>
          </g>
        ))}
        <line x1={250} y1={300} x2={316} y2={300} strokeWidth={1} className="stroke-border" />
        <text x={316} y={314} textAnchor="end" className="fill-foreground text-[11px] font-bold">
          total {total} = 3 × 4 ÷ 2
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Label every point first, then count by size: the 3 single parts, then the 2 triangles made of two parts, then the whole triangle.
        That gives 3 + 2 + 1 = 6, the same as k(k + 1) ÷ 2 with k = 3 parts. B, D, E and C lie on one line, so no three of them make a
        triangle.
      </p>
    </div>
  );
}
