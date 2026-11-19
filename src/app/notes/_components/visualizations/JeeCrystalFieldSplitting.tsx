/**
 * Static figure: crystal field splitting of the five d orbitals (concept
 * jccoord-splitting), drawn to scale with the concept's worked example,
 * Δo = 18 000 cm⁻¹.
 *
 * - Middle: the free ion, five d orbitals of one energy (the barycentre).
 * - Left, octahedral: eg (dx²−y², dz²) rises to +0.6Δo = +10 800 cm⁻¹ and
 *   t₂g (dxy, dxz, dyz) falls to −0.4Δo = −7200 cm⁻¹; the gap is Δo.
 * - Right, tetrahedral, upside down: t₂ (dxy, dxz, dyz) above at +0.4Δt and
 *   e (dx²−y², dz²) below at −0.6Δt, with Δt = (4/9)Δo = 8000 cm⁻¹, so
 *   t₂ at +3200 and e at −4800 cm⁻¹.
 *
 * Server component, pure SVG. Pinned by tests/notes-jee-visuals-chem.test.ts.
 */

/** The worked example's octahedral splitting, in cm⁻¹. */
export const DELTA_O = 18000;

/** Δt = (4/9)Δo for the same metal, ligands and distance. */
export function tetrahedralDelta(deltaO: number): number {
  return (4 / 9) * deltaO;
}

export const DELTA_T = tetrahedralDelta(DELTA_O);

export type OrbitalName = "xy" | "xz" | "yz" | "x2y2" | "z2";

export type DSet = {
  id: "eg" | "t2g" | "t2" | "e";
  label: string;
  /** Energy relative to the barycentre, as a multiple of the field's Δ. */
  factor: number;
  field: "octahedral" | "tetrahedral";
  orbitals: readonly OrbitalName[];
};

export const SETS: readonly DSet[] = [
  { id: "eg", label: "eg", factor: 0.6, field: "octahedral", orbitals: ["x2y2", "z2"] },
  { id: "t2g", label: "t₂g", factor: -0.4, field: "octahedral", orbitals: ["xy", "xz", "yz"] },
  { id: "t2", label: "t₂", factor: 0.4, field: "tetrahedral", orbitals: ["xy", "xz", "yz"] },
  { id: "e", label: "e", factor: -0.6, field: "tetrahedral", orbitals: ["x2y2", "z2"] },
];

/** Energy of a set in cm⁻¹ relative to the barycentre. */
export function setEnergy(s: DSet, deltaO = DELTA_O): number {
  return Math.round(s.factor * (s.field === "octahedral" ? deltaO : tetrahedralDelta(deltaO)));
}

/** Sum over all five orbitals of each one's energy: zero for both fields (the barycentre is unchanged). */
export function barycentreShift(field: DSet["field"], deltaO = DELTA_O): number {
  return SETS.filter((s) => s.field === field).reduce((sum, s) => sum + s.orbitals.length * setEnergy(s, deltaO), 0);
}

// Geometry (viewBox units).
export const BARY_Y = 128;
/** viewBox units per cm⁻¹. */
export const E_SCALE = 0.0075;
export const COLUMN_X = { octahedral: 62, free: 160, tetrahedral: 258 } as const;

export function energyY(e: number): number {
  return Math.round((BARY_Y - e * E_SCALE) * 100) / 100;
}

/** x ranges of the orbital dashes of a set of n orbitals centred on cx. */
export function dashes(cx: number, n: number): { x1: number; x2: number }[] {
  const w = n === 2 ? 22 : n === 3 ? 20 : 14;
  const gap = n === 2 ? 22 : n === 3 ? 6 : 4;
  const total = n * w + (n - 1) * gap;
  const left = cx - total / 2;
  return Array.from({ length: n }, (_, i) => ({ x1: left + i * (w + gap), x2: left + i * (w + gap) + w }));
}

const fmtCm = (n: number) => {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  const a = Math.abs(n);
  return `${sign}${a >= 10000 ? `${Math.floor(a / 1000)} ${String(a % 1000).padStart(3, "0")}` : a}`;
};

function OrbitalLabel({ name, x, y }: { name: OrbitalName; x: number; y: number }) {
  const sub = name === "x2y2" ? "x²−y²" : name === "z2" ? "z²" : name;
  return (
    <text x={x} y={y} textAnchor="middle" className="fill-muted-foreground text-[10px]">
      d
      <tspan dy={3} className="text-[8px]">
        {sub}
      </tspan>
    </text>
  );
}

function SetDrawing({ set }: { set: DSet }) {
  const cx = COLUMN_X[set.field];
  const y = energyY(setEnergy(set));
  const upper = set.factor > 0;
  const deltaName = set.field === "octahedral" ? "Δₒ" : "Δₜ";
  const tone =
    set.field === "octahedral"
      ? "stroke-indigo-600 dark:stroke-indigo-400"
      : "stroke-emerald-600 dark:stroke-emerald-400";
  const textTone =
    set.field === "octahedral"
      ? "fill-indigo-700 dark:fill-indigo-300"
      : "fill-emerald-700 dark:fill-emerald-300";
  const ds = dashes(cx, set.orbitals.length);
  const factorText = `${set.factor > 0 ? "+" : "−"}${Math.abs(set.factor)}${deltaName}`;
  const line1Y = upper ? y - 21 : y + 25;
  const line2Y = upper ? y - 10 : y + 36;
  return (
    <g>
      {ds.map((d, i) => (
        <g key={i}>
          <line x1={d.x1} y1={y} x2={d.x2} y2={y} strokeWidth={2.5} className={tone} />
          <OrbitalLabel name={set.orbitals[i]} x={(d.x1 + d.x2) / 2} y={y + 11} />
        </g>
      ))}
      <text x={cx} y={line1Y} textAnchor="middle" className={`${textTone} text-[11px] font-semibold`}>
        {set.label}: {factorText}
      </text>
      <text x={cx} y={line2Y} textAnchor="middle" className={`${textTone} text-[10px] tabular-nums`}>
        {fmtCm(setEnergy(set))} cm⁻¹
      </text>
    </g>
  );
}

export default function JeeCrystalFieldSplitting() {
  const [eg, t2g, t2, e] = SETS;
  const freeDashes = dashes(COLUMN_X.free, 5);
  const yEg = energyY(setEnergy(eg));
  const yT2g = energyY(setEnergy(t2g));
  const yT2 = energyY(setEnergy(t2));
  const yE = energyY(setEnergy(e));
  const octDashes = dashes(COLUMN_X.octahedral, 3);
  const tetDashes = dashes(COLUMN_X.tetrahedral, 3);
  const octRight = octDashes[2].x2;
  const tetLeft = tetDashes[0].x1;
  const freeLeft = freeDashes[0].x1;
  const freeRight = freeDashes[4].x2;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · how ligands split the five d orbitals
      </p>

      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label="Energy levels to scale. Middle: a free ion with five d orbitals of equal energy. Left, octahedral field with splitting 18 000 per centimetre: the eg pair, dx2-y2 and dz2, rises to plus 0.6 delta o, plus 10 800; the t2g trio, dxy, dxz and dyz, falls to minus 0.4 delta o, minus 7200. Right, tetrahedral field, upside down: t2 trio above at plus 0.4 delta t, plus 3200, and e pair below at minus 0.6 delta t, minus 4800, with delta t equal to 4/9 of delta o, 8000."
      >
        {/* Column titles */}
        <text x={COLUMN_X.octahedral} y={12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Octahedral
        </text>
        <text x={COLUMN_X.free} y={12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Free ion
        </text>
        <text x={COLUMN_X.tetrahedral} y={12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Tetrahedral
        </text>

        {/* Barycentre */}
        <line x1={20} y1={BARY_Y} x2={300} y2={BARY_Y} strokeDasharray="2 3" strokeWidth={0.8} className="stroke-muted-foreground" />

        {/* Correlation lines from the free ion to each set */}
        {[
          { x1: freeLeft, x2: octRight, y: yEg },
          { x1: freeLeft, x2: octRight, y: yT2g },
          { x1: freeRight, x2: tetLeft, y: yT2 },
          { x1: freeRight, x2: tetLeft, y: yE },
        ].map((c, i) => (
          <line key={i} x1={c.x1} y1={BARY_Y} x2={c.x2} y2={c.y} strokeDasharray="3 3" strokeWidth={0.8} className="stroke-muted-foreground" />
        ))}

        {/* Free ion: five degenerate d orbitals */}
        {freeDashes.map((d, i) => (
          <line key={i} x1={d.x1} y1={BARY_Y} x2={d.x2} y2={BARY_Y} strokeWidth={2.5} className="stroke-foreground" />
        ))}
        <text x={COLUMN_X.free} y={BARY_Y + 14} textAnchor="middle" className="fill-foreground text-[10px]">
          five d orbitals,
        </text>
        <text x={COLUMN_X.free} y={BARY_Y + 25} textAnchor="middle" className="fill-foreground text-[10px]">
          one energy
        </text>
        <text x={COLUMN_X.free} y={BARY_Y - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          barycentre
        </text>

        {SETS.map((s) => (
          <SetDrawing key={s.id} set={s} />
        ))}

        {/* Δo arrow */}
        <line x1={14} y1={yEg + 4} x2={14} y2={yT2g - 4} strokeWidth={1.4} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polygon points={`14,${yEg} 10.5,${yEg + 7} 17.5,${yEg + 7}`} className="fill-indigo-600 dark:fill-indigo-400" />
        <polygon points={`14,${yT2g} 10.5,${yT2g - 7} 17.5,${yT2g - 7}`} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={COLUMN_X.octahedral + 4} y={BARY_Y - 16} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300 tabular-nums">
          Δₒ = 18 000 cm⁻¹
        </text>

        {/* Δt arrow */}
        <line x1={306} y1={yT2 + 4} x2={306} y2={yE - 4} strokeWidth={1.4} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <polygon points={`306,${yT2} 302.5,${yT2 + 7} 309.5,${yT2 + 7}`} className="fill-emerald-600 dark:fill-emerald-400" />
        <polygon points={`306,${yE} 302.5,${yE - 7} 309.5,${yE - 7}`} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={COLUMN_X.tetrahedral} y={BARY_Y + 15} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 tabular-nums">
          Δₜ = 8000 cm⁻¹
        </text>

        <text x={160} y={232} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          Δₜ = 4/9 × 18 000 = 8000 cm⁻¹
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground tabular-nums">
        Octahedral: eg rises by 0.6Δₒ and t₂g falls by 0.4Δₒ, and 2(+0.6) + 3(−0.4) = 0, so the average energy is unchanged.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        In a tetrahedron the ligands come in between the axes, so the pattern is upside down: dxy, dxz and dyz (t₂) lie above
        dx²−y² and dz² (e), and the gap is only 4/9 as large.
      </p>
    </div>
  );
}
