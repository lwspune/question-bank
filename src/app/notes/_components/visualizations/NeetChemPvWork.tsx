/**
 * Static figure: work of expansion as an area on a p-V graph (concept
 * ncht-work), in chemistry's sign convention: w is work done ON the system,
 * so w = −pₑₓΔV and an expansion gives negative w.
 *
 * Drawn with the concept's self-check: a gas expands from 2 L to 5 L against a
 * constant external pressure of 1 atm. The shaded rectangle is pₑₓΔV =
 * 1 × 3 = 3 L atm, so w = −3 L atm = −3 × 101.3 = −303.9 J.
 * The concept also compares this with a reversible isothermal expansion
 * between the same two volumes. To draw that curve the figure assumes the
 * gas ends at the external pressure, 1 atm at 5 L, so the isotherm is
 * pV = 5 L atm and starts at 2.5 atm at 2 L. The concept gives no number for
 * that case, so the figure shows only that its area (5 ln 2.5 ≈ 4.58 L atm) is
 * larger, as the concept says. Pinned by tests/notes-neet-visuals-pc.test.ts.
 * Server component.
 */

/** The self-check: litres and atm. */
export const SELF_CHECK = { Vi: 2, Vf: 5, pex: 1 } as const;

/** 1 L atm in joules (the concept's value). */
export const L_ATM_IN_J = 101.3;

/** w = −pₑₓ(V_f − V_i): work done on the gas against a constant external pressure. */
export function workAgainstConstant(pex: number, Vi: number, Vf: number): number {
  return -pex * (Vf - Vi) + 0; // + 0 turns −0 (free expansion) into 0
}

/** Reversible isothermal work on an ideal gas, w = −2.303 nRT log(V_f/V_i). */
export function reversibleIsothermalWork(n: number, R: number, T: number, Vi: number, Vf: number): number {
  return -2.303 * n * R * T * Math.log10(Vf / Vi);
}

/** The drawn isotherm: pV = const, through the end state (V_f, pₑₓ). */
export const ISOTHERM_PV = SELF_CHECK.pex * SELF_CHECK.Vf;
export const isothermP = (V: number) => ISOTHERM_PV / V;

/** Work on the gas along the drawn isotherm, L atm: −(pV) ln(V_f/V_i). */
export function isothermWorkLatm(Vi: number = SELF_CHECK.Vi, Vf: number = SELF_CHECK.Vf): number {
  return -ISOTHERM_PV * Math.log(Vf / Vi);
}

const r2 = (v: number) => Math.round(v * 100) / 100;
/** A number with a true minus sign. */
const signed = (v: number) => (v < 0 ? `−${Math.abs(v)}` : String(v));

// Axes: V 0 to 6 L across, p 0 to 3 atm up.
export const AXES = { x0: 50, x1: 266, y0: 180, y1: 60, vMax: 6, pMax: 3 } as const;
export const sx = (V: number) => r2(AXES.x0 + (V / AXES.vMax) * (AXES.x1 - AXES.x0));
export const sy = (p: number) => r2(AXES.y0 - (p / AXES.pMax) * (AXES.y0 - AXES.y1));

function isothermPoints(step = 0.1): string {
  const pts: string[] = [];
  for (let V = SELF_CHECK.Vi; V <= SELF_CHECK.Vf + 1e-9; V += step) pts.push(`${sx(V)},${sy(isothermP(V))}`);
  return pts.join(" ");
}

function Head({ x, y, angle, className }: { x: number; y: number; angle: number; className: string }) {
  const a = (angle * Math.PI) / 180;
  const back = (s: number) => ({ x: x - 8 * Math.cos(a) + s * 4 * Math.sin(a), y: y - 8 * Math.sin(a) - s * 4 * Math.cos(a) });
  const l = back(1);
  const r = back(-1);
  return <polygon points={`${r2(x)},${r2(y)} ${r2(l.x)},${r2(l.y)} ${r2(r.x)},${r2(r.y)}`} className={className} />;
}

export default function NeetChemPvWork() {
  const { Vi, Vf, pex } = SELF_CHECK;
  const w = workAgainstConstant(pex, Vi, Vf);
  const curve = isothermPoints();
  const extra = `${curve} ${sx(Vf)},${sy(pex)} ${sx(Vi)},${sy(pex)}`;
  // Tangent of the isotherm at V = 3.5 L, for its arrow head.
  const vMid = 3.5;
  const slope = (sy(isothermP(vMid + 0.05)) - sy(isothermP(vMid - 0.05))) / (sx(vMid + 0.05) - sx(vMid - 0.05));
  const midAngle = (Math.atan(slope) * 180) / Math.PI;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · work of expansion as an area
      </p>
      <svg
        viewBox="0 0 320 222"
        className="block h-auto w-full"
        role="img"
        aria-label="Pressure against volume. A gas expands from 2 litres to 5 litres against a constant external pressure of 1 atmosphere: the rectangle under that line is 3 litre atmospheres, so the work done on the gas is minus 3 litre atmospheres, minus 303.9 joules. A reversible isothermal expansion between the same two volumes follows a curve at higher pressure, with more area under it, so the gas does more work."
      >
        {/* Grid and axes */}
        {[1, 2, 3].map((p) => (
          <g key={p}>
            <line x1={AXES.x0} y1={sy(p)} x2={AXES.x1} y2={sy(p)} strokeDasharray="2 3" className="stroke-border" />
            <text x={AXES.x0 - 5} y={sy(p) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {p}
            </text>
          </g>
        ))}
        <line x1={AXES.x0} y1={AXES.y0} x2={AXES.x1 + 6} y2={AXES.y0} className="stroke-muted-foreground" />
        <line x1={AXES.x0} y1={AXES.y0} x2={AXES.x0} y2={AXES.y1 - 12} className="stroke-muted-foreground" />
        <text x={8} y={AXES.y1 - 18} className="fill-muted-foreground text-[10px]">
          p (atm)
        </text>
        <text x={AXES.x1 + 10} y={AXES.y0 + 4} className="fill-muted-foreground text-[10px]">
          V (L)
        </text>

        {/* Area: the reversible path's extra, then pₑₓΔV */}
        <polygon points={extra} className="fill-indigo-500/20 dark:fill-indigo-400/20" />
        <rect
          x={sx(Vi)}
          y={sy(pex)}
          width={r2(sx(Vf) - sx(Vi))}
          height={r2(sy(0) - sy(pex))}
          className="fill-rose-500/30 dark:fill-rose-400/25"
        />
        <text x={sx(3.5)} y={sy(0.45)} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          p<tspan dy={3} className="text-[8px]">ex</tspan>
          <tspan dy={-3}>ΔV = 3 L atm</tspan>
        </text>

        {/* Guides at the two volumes */}
        <line x1={sx(Vi)} y1={sy(isothermP(Vi))} x2={sx(Vi)} y2={AXES.y0} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <line x1={sx(Vf)} y1={sy(pex)} x2={sx(Vf)} y2={AXES.y0} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <text x={sx(Vi)} y={AXES.y0 + 13} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          V<tspan dy={3} className="text-[8px]">i</tspan>
          <tspan dy={-3}> = 2</tspan>
        </text>
        <text x={sx(Vf)} y={AXES.y0 + 13} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          V<tspan dy={3} className="text-[8px]">f</tspan>
          <tspan dy={-3}> = 5</tspan>
        </text>

        {/* One step against pₑₓ */}
        <line x1={sx(Vi)} y1={sy(pex)} x2={sx(Vf)} y2={sy(pex)} strokeWidth={2.2} className="stroke-rose-600 dark:stroke-rose-400" />
        <Head x={sx(3.6)} y={sy(pex)} angle={0} className="fill-rose-600 dark:fill-rose-400" />
        <text x={sx(Vf) + 4} y={sy(pex) - 4} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          p<tspan dy={3} className="text-[8px]">ex</tspan>
          <tspan dy={-3}> = 1 atm</tspan>
        </text>

        {/* Reversible isothermal path */}
        <polyline points={curve} fill="none" strokeWidth={2.2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <Head x={sx(vMid) + 4 * Math.cos((midAngle * Math.PI) / 180)} y={sy(isothermP(vMid)) + 4 * Math.sin((midAngle * Math.PI) / 180)} angle={midAngle} className="fill-indigo-600 dark:fill-indigo-400" />
        <circle cx={sx(Vi)} cy={sy(isothermP(Vi))} r={3} className="fill-foreground" />
        <circle cx={sx(Vf)} cy={sy(pex)} r={3} className="fill-foreground" />
        <text x={sx(2.85)} y={sy(2.55)} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          reversible, isothermal:
        </text>
        <text x={sx(2.85)} y={sy(2.55) + 12} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          more area, more work
        </text>

        {/* The work */}
        <text x={160} y={214} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          w = −p<tspan dy={3} className="text-[8px]">ex</tspan>
          <tspan dy={-3}>ΔV = {signed(w)} L atm = {signed(Number((w * L_ATM_IN_J).toFixed(1)))} J</tspan>
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        w is the work done on the gas. In an expansion the gas pushes the surroundings back, so w is negative: here w = −3 × 101.3 = −303.9 J. Between the
        same two volumes the reversible path runs at higher pressure, so it encloses more area and the gas does more work.
      </p>
    </div>
  );
}
