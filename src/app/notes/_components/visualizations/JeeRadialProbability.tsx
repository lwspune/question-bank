/**
 * Static figure: radial probability 4πr²ψ² against r for the hydrogen 1s, 2s,
 * 2p and 3s orbitals (concept jcatom-probability-plots), from the exact
 * hydrogen radial functions (ρ = r/a₀):
 *   1s ∝ e^(−ρ)          2s ∝ (2 − ρ) e^(−ρ/2)
 *   2p ∝ ρ e^(−ρ/2)      3s ∝ (27 − 18ρ + 2ρ²) e^(−ρ/3)
 *
 * - Radial nodes n − l − 1: 1s 0, 2s 1 (at 2a₀), 2p 0, 3s 2.
 * - Peaks n − l: 1s one (at a₀), 2s two (the outer larger), 2p one (at 4a₀),
 *   3s three.
 *
 * Each curve is scaled to its own height; the r axis is shared. Server
 * component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

export type OrbitalId = "1s" | "2s" | "2p" | "3s";

export const ORBITALS: readonly { id: OrbitalId; n: number; l: number }[] = [
  { id: "1s", n: 1, l: 0 },
  { id: "2s", n: 2, l: 0 },
  { id: "2p", n: 2, l: 1 },
  { id: "3s", n: 3, l: 0 },
];

/** Hydrogen radial function R(ρ), up to a constant (signs kept, so nodes show as sign changes). */
export function radial(id: OrbitalId, rho: number): number {
  switch (id) {
    case "1s":
      return Math.exp(-rho);
    case "2s":
      return (2 - rho) * Math.exp(-rho / 2);
    case "2p":
      return rho * Math.exp(-rho / 2);
    case "3s":
      return (27 - 18 * rho + 2 * rho * rho) * Math.exp(-rho / 3);
  }
}

/** Radial probability ∝ r²R², up to a constant. */
export function radialProbability(id: OrbitalId, rho: number): number {
  const r = radial(id, rho);
  return rho * rho * r * r;
}

/** Radial nodes: n − l − 1. */
export function radialNodes(n: number, l: number): number {
  return n - l - 1;
}

/** Where each radial node lies, in units of a₀ (roots of the polynomial part). */
export const NODES: Record<OrbitalId, readonly number[]> = {
  "1s": [],
  "2s": [2],
  "2p": [],
  "3s": [(9 - 3 * Math.sqrt(3)) / 2, (9 + 3 * Math.sqrt(3)) / 2],
};

/** r axis drawn, in a₀. */
export const R_MAX = 24;

export function curve(id: OrbitalId, samples = 240): { rho: number; p: number }[] {
  const pts = Array.from({ length: samples + 1 }, (_, i) => {
    const rho = (i / samples) * R_MAX;
    return { rho, p: radialProbability(id, rho) };
  });
  const max = Math.max(...pts.map((q) => q.p));
  return pts.map((q) => ({ rho: q.rho, p: q.p / max }));
}

// Geometry (viewBox units).
export const PLOT_X = { x0: 46, x1: 304 } as const;
/** Baseline of each panel. */
export const BASE_Y = [72, 138, 204, 270] as const;
const PANEL_H = 50;

const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (rho: number) => r2(PLOT_X.x0 + (rho / R_MAX) * (PLOT_X.x1 - PLOT_X.x0));

const TONE: Record<OrbitalId, { stroke: string; fill: string }> = {
  "1s": { stroke: "stroke-indigo-600 dark:stroke-indigo-400", fill: "fill-indigo-700 dark:fill-indigo-300" },
  "2s": { stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-700 dark:fill-emerald-300" },
  "2p": { stroke: "stroke-amber-600 dark:stroke-amber-400", fill: "fill-amber-700 dark:fill-amber-300" },
  "3s": { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-700 dark:fill-rose-300" },
};

/** Peak marks labelled on the figure (the concept's values for hydrogen). */
const PEAK_LABEL: Partial<Record<OrbitalId, { rho: number; text: string }>> = {
  "1s": { rho: 1, text: "peak at a₀" },
  "2p": { rho: 4, text: "peak at 4a₀" },
};

export default function JeeRadialProbability() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · radial probability and radial nodes
      </p>

      <svg
        viewBox="0 0 320 302"
        className="block h-auto w-full"
        role="img"
        aria-label="Radial probability against distance from the nucleus for hydrogen. 1s: one peak at the Bohr radius, no radial node. 2s: a node at 2 Bohr radii and two peaks, the outer one larger. 2p: one peak at 4 Bohr radii, no radial node. 3s: two nodes and three peaks. Radial nodes equal n minus l minus 1."
      >
        <text x={PLOT_X.x1} y={10} textAnchor="end" className="fill-muted-foreground text-[10px]">
          4πr²ψ² (each scaled to its own peak)
        </text>
        {ORBITALS.map((o, i) => {
          const base = BASE_Y[i];
          const pts = curve(o.id);
          const sy = (p: number) => r2(base - p * PANEL_H);
          const nodes = radialNodes(o.n, o.l);
          const peak = PEAK_LABEL[o.id];
          return (
            <g key={o.id}>
              <line x1={PLOT_X.x0} y1={base} x2={PLOT_X.x1} y2={base} className="stroke-muted-foreground" />
              <text x={6} y={base - 30} className={`${TONE[o.id].fill} text-[13px] font-semibold`}>
                {o.id}
              </text>
              <text x={6} y={base - 16} className="fill-foreground text-[10px]">
                {nodes} {nodes === 1 ? "node" : "nodes"}
              </text>
              <polyline
                points={pts.map((q) => `${px(q.rho)},${sy(q.p)}`).join(" ")}
                fill="none"
                strokeWidth={2.2}
                strokeLinejoin="round"
                className={TONE[o.id].stroke}
              />
              {NODES[o.id].map((rho) => (
                <circle key={rho} cx={px(rho)} cy={base} r={3} strokeWidth={1.5} className="fill-background stroke-foreground" />
              ))}
              {o.id === "2s" && (
                <text x={px(2)} y={base + 11} textAnchor="middle" className="fill-foreground text-[10px]">
                  2a₀
                </text>
              )}
              {peak && (
                <g>
                  <line
                    x1={px(peak.rho)}
                    y1={base}
                    x2={px(peak.rho)}
                    y2={sy(1)}
                    strokeDasharray="2 2"
                    className="stroke-muted-foreground"
                  />
                  <text x={px(peak.rho) + 4} y={sy(1) - 3} className="fill-foreground text-[10px]">
                    {peak.text}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {[0, 4, 8, 12, 16, 20, 24].map((v) => (
          <text key={v} x={px(v)} y={BASE_Y[3] + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}
          </text>
        ))}
        <text x={PLOT_X.x1} y={BASE_Y[3] + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
          r (in a₀)
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground">
        Radial nodes = n − l − 1: 1s 0, 2s 1, 2p 0, 3s 2 (open circles). Each orbital has n − l peaks, one more than its nodes.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        For 1s the density ψ² is highest at the nucleus, but the radial probability peaks at a₀, because a shell further out has
        more volume.
      </p>
    </div>
  );
}
