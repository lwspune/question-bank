/**
 * Static figure: percentage composition as one bar per compound
 * (concept ssccmomo-mole).
 *
 * The concept's worked example H₂SO₃: molar mass 2 + 32 + 48 = 82; sulphur
 * 32 / 82 × 100, about 39% (H about 2%, O about 59%). Its self-check H₂O:
 * 2 + 16 = 18; oxygen 16 / 18 × 100, about 88.9% (H about 11.1%). Each bar's
 * shares add to 100. Atomic masses H 1, O 16, S 32. Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export const ATOMIC_MASS = { H: 1, O: 16, S: 32 } as const;
type El = keyof typeof ATOMIC_MASS;

export type Compound = { formula: string; atoms: { el: El; count: number }[]; decimals: number };

export const COMPOUNDS: readonly Compound[] = [
  {
    formula: "H₂SO₃",
    atoms: [
      { el: "H", count: 2 },
      { el: "S", count: 1 },
      { el: "O", count: 3 },
    ],
    decimals: 0,
  },
  {
    formula: "H₂O",
    atoms: [
      { el: "H", count: 2 },
      { el: "O", count: 1 },
    ],
    decimals: 1,
  },
];

export function composition(c: Compound) {
  const parts = c.atoms.map((a) => ({ el: a.el, mass: ATOMIC_MASS[a.el] * a.count }));
  const molar = parts.reduce((s, p) => s + p.mass, 0);
  return {
    molar,
    parts: parts.map((p) => ({ ...p, percent: (p.mass / molar) * 100 })),
  };
}

/** The percentage as printed on the figure. */
export function shown(percent: number, decimals: number): string {
  return percent.toFixed(decimals);
}

const X0 = 12;
const W = 296;
const FILL: Record<El, string> = {
  H: "fill-amber-300 dark:fill-amber-600",
  S: "fill-violet-400 dark:fill-violet-500",
  O: "fill-sky-400 dark:fill-sky-600",
};

export default function SscMassPercent() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · each element&apos;s share of the molar mass
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="Two bars, each 100 percent of a molar mass. H2SO3: hydrogen 2, sulphur 32, oxygen 48, total 82; sulphur is about 39 percent, hydrogen about 2 and oxygen about 59. H2O: hydrogen 2, oxygen 16, total 18; oxygen is about 88.9 percent and hydrogen about 11.1."
      >
        {COMPOUNDS.map((c, i) => {
          const top = 18 + i * 104;
          const comp = composition(c);
          let x = X0;
          return (
            <g key={c.formula}>
              <text x={X0} y={top} className="fill-foreground text-[11px] font-bold">
                {c.formula}: molar mass {comp.parts.map((p) => p.mass).join(" + ")} = {comp.molar}
              </text>
              {comp.parts.map((p) => {
                const w = (p.percent / 100) * W;
                const x0 = x;
                x += w;
                const wide = w > 40;
                return (
                  <g key={p.el}>
                    <rect x={x0} y={top + 8} width={w} height={22} className={`${FILL[p.el]} stroke-background`} strokeWidth={1} />
                    {wide && (
                      <text x={x0 + w / 2} y={top + 23} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
                        {p.el} {p.mass}
                      </text>
                    )}
                  </g>
                );
              })}
              {comp.parts.map((p, j) => (
                <text key={p.el} x={X0} y={top + 44 + j * 13} className="fill-foreground text-[10px]">
                  {p.el}: {p.mass} / {comp.molar} × 100 ≈ {shown(p.percent, c.decimals)}%
                </text>
              ))}
              <text x={X0} y={top + 44 + comp.parts.length * 13} className="fill-muted-foreground text-[10px] font-semibold">
                adds to {comp.parts.map((p) => shown(p.percent, c.decimals)).join(" + ")} = 100
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        An element&apos;s share is its mass in one formula over the molar mass, times 100. The shares add to 100.
      </p>
    </div>
  );
}
