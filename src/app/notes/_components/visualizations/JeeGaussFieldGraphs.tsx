/**
 * Static figure: E against r from Gauss's law for a thin charged shell and for
 * a uniformly charged solid (insulating) sphere (concept jpes-symmetric-gauss).
 *
 * Both carry the worked example's charge and size: Q = 2 μC, R = 10 cm, so
 * kQ = 1.8 × 10⁴ N m² C⁻¹. Outside, both give kQ/r² (1.8 × 10⁶ N/C at the
 * surface, 4.5 × 10⁵ N/C at 20 cm). Inside, the shell's Gaussian sphere
 * encloses no charge, so E = 0; the solid sphere's encloses Q r³/R³, so
 * E = kQr/R³ grows from zero (9 × 10⁵ N/C at 5 cm) to its peak at the surface,
 * the concept's trap. Pinned by tests/notes-jee-visuals-phys-b.test.ts.
 * Server component, no client state.
 */

/** The worked example: Q in coulombs, R in metres, k in N m² C⁻². */
export const SPHERE_EXAMPLE = { Q: 2e-6, R: 0.1, k: 9e9 } as const;

/** Field of a uniformly charged solid sphere at distance r (metres) from its centre, in N/C. */
export function fieldSolid(r: number, s: { Q: number; R: number; k: number } = SPHERE_EXAMPLE): number {
  return r < s.R ? (s.k * s.Q * r) / s.R ** 3 : (s.k * s.Q) / (r * r);
}

/** Field of a thin charged shell at distance r (metres) from its centre, in N/C. */
export function fieldShell(r: number, s: { Q: number; R: number; k: number } = SPHERE_EXAMPLE): number {
  return r < s.R ? 0 : (s.k * s.Q) / (r * r);
}

/** Charge enclosed by a Gaussian sphere of radius r inside each body (as a share of Q). */
export const enclosedShare = { solid: (r: number, R: number) => Math.min(1, (r / R) ** 3), shell: (r: number, R: number) => (r < R ? 0 : 1) };

/** The marked points: r in cm, E in units of 10⁶ N/C. */
export const MARKED = {
  solid: [
    { r: 5, E: 0.9 },
    { r: 10, E: 1.8 },
    { r: 20, E: 0.45 },
  ],
  shell: [
    { r: 10, E: 1.8 },
    { r: 20, E: 0.45 },
  ],
} as const;

// Plot geometry (viewBox units): r from 0 to 30 cm, E from 0 to 2 × 10⁶ N/C.
export const R_AXIS_CM = 30;
const X0 = 110;
const X1 = 306;
const E_UNITS = 36; // viewBox units per 10⁶ N/C
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (rCm: number) => r2(X0 + (rCm / R_AXIS_CM) * (X1 - X0));

/** Polyline points of a field curve for a panel whose E = 0 line is at `base`. */
export function curvePath(kind: "solid" | "shell", base: number, samples = 120): string {
  const py = (E: number) => r2(base - (E / 1e6) * E_UNITS);
  const R = SPHERE_EXAMPLE.R * 100;
  const outside: string[] = [];
  for (let k = 0; k <= samples; k++) {
    const rCm = R + (k / samples) * (R_AXIS_CM - R);
    outside.push(`${px(rCm)},${py(fieldShell(rCm / 100))}`);
  }
  if (kind === "shell") return `M ${px(0)},${py(0)} L ${px(R)},${py(0)} M ${outside.join(" L ")}`;
  return `M ${px(0)},${py(0)} L ${outside.join(" L ")}`;
}

const SKY = "stroke-sky-600 dark:stroke-sky-400";

function Panel({ kind, base }: { kind: "solid" | "shell"; base: number }) {
  const py = (E: number) => r2(base - E * E_UNITS);
  const cy = base - 36;
  const top = py(2);
  const pts = MARKED[kind];
  return (
    <g>
      {/* The body and two Gaussian spheres, one inside and one outside */}
      {kind === "solid" ? (
        <circle cx={50} cy={cy} r={20} strokeWidth={1.5} className={`fill-sky-300/50 dark:fill-sky-700/40 ${SKY}`} />
      ) : (
        <circle cx={50} cy={cy} r={20} strokeWidth={3} fill="none" className={SKY} />
      )}
      <circle cx={50} cy={cy} r={10} fill="none" strokeDasharray="3 2" strokeWidth={1.2} className="stroke-rose-600 dark:stroke-rose-400" />
      <circle cx={50} cy={cy} r={32} fill="none" strokeDasharray="3 2" strokeWidth={1.2} className="stroke-rose-600 dark:stroke-rose-400" />
      <circle cx={50} cy={cy} r={1.5} className="fill-foreground" />

      {/* Axes */}
      <line x1={X0} y1={base} x2={X1} y2={base} className="stroke-muted-foreground" />
      <line x1={X0} y1={base} x2={X0} y2={top - 4} className="stroke-muted-foreground" />
      {[0, 1, 2].map((t) => (
        <text key={t} x={X0 - 4} y={py(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
          {t}
        </text>
      ))}
      {[0, 10, 20, 30].map((t) => (
        <text key={t} x={px(t)} y={base + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {t === 10 ? "R = 10" : t}
        </text>
      ))}
      <text x={X0 + 4} y={top - 6} className="fill-muted-foreground text-[10px]">
        E (10⁶ N/C)
      </text>
      <line x1={px(10)} y1={base} x2={px(10)} y2={top} strokeDasharray="3 3" className="stroke-border" />

      {/* The curve */}
      <path d={curvePath(kind, base)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
      {kind === "shell" && <line x1={px(10)} y1={base} x2={px(10)} y2={py(1.8)} strokeDasharray="2 2" strokeWidth={1.2} className="stroke-indigo-600 dark:stroke-indigo-400" />}
      {pts.map((p) => (
        <g key={p.r}>
          <circle cx={px(p.r)} cy={py(p.E)} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
          <text
            x={p.r === 20 ? px(p.r) : px(p.r) - 6}
            y={p.r === 20 ? py(p.E) - 7 : py(p.E) + (p.r === 10 ? 4 : -4)}
            textAnchor={p.r === 20 ? "middle" : "end"}
            className="fill-indigo-700 text-[10px] font-semibold tabular-nums dark:fill-indigo-300"
          >
            {p.E}
          </text>
        </g>
      ))}

      {/* What each part of the curve is */}
      <text x={282} y={py(0.27) - 9} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        kQ/r²
      </text>
      {kind === "shell" ? (
        <text x={X0 + 4} y={base - 5} className="fill-foreground text-[10px] font-semibold">
          E = 0
        </text>
      ) : (
        <text x={px(5.6)} y={py(0.55)} className="fill-foreground text-[11px] font-semibold">
          kQr/R³
        </text>
      )}
    </g>
  );
}

export default function JeeGaussFieldGraphs() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · field of a charged shell and a charged solid sphere
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Two graphs of field against distance from the centre, for a charge of 2 microcoulombs on a sphere of radius 10 centimetres. For a thin shell the field is zero inside and jumps to 1.8 million newtons per coulomb at the surface, then falls as one over r squared. For a uniformly charged solid sphere the field rises in a straight line from zero at the centre to the same peak at the surface, then falls in the same way. Dashed circles show Gaussian spheres inside and outside each body."
      >
        <text x={8} y={14} className="fill-foreground text-[11px] font-semibold">
          Thin shell, charge Q
        </text>
        <Panel kind="shell" base={106} />
        <text x={8} y={134} className="fill-foreground text-[11px] font-semibold">
          Solid sphere, Q spread through it
        </text>
        <Panel kind="solid" base={222} />
        <text x={8} y={246} className="fill-rose-700 text-[10px] dark:fill-rose-300">
          dashed: Gaussian spheres
        </text>
        <text x={X1} y={246} textAnchor="end" className="fill-muted-foreground text-[10px]">
          r (cm)
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Q = 2 μC, R = 10 cm, kQ = 1.8 × 10⁴ N m² C⁻¹. A Gaussian sphere inside the shell encloses no charge, so E = 0 there; inside the solid
        sphere it encloses Qr³/R³, so E = kQr/R³ grows with r: 9 × 10⁵ N/C at 5 cm. Both peak at the surface, 1.8 × 10⁶ N/C, and fall
        as kQ/r² outside: 4.5 × 10⁵ N/C at 20 cm.
      </p>
    </div>
  );
}
