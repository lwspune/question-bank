/**
 * Static figure: the perpendicular-axis and parallel-axis theorems on the
 * concept's worked example, a uniform disc of mass 2 kg and radius 0.3 m
 * (concept jprot-parallel-axis).
 *
 * Left: the disc face on, with two diameters x and y in its plane and the
 * axis z normal to it through the centre. I about the normal axis is ½MR² =
 * 0.09 kg m², and I about each diameter is ¼MR² = 0.045 kg m², so
 * Iz = Ix + Iy (flat bodies only).
 * Right: a tangent in the plane, parallel to a diameter and d = R = 0.3 m from
 * it. I = 0.045 + Md² = 0.045 + 2 × 0.09 = 0.225 kg m² = (5/4)MR².
 * Values pinned by tests/notes-jee-visuals-phys-a.test.ts. Server component.
 */
import type { ReactNode } from "react";

/** The worked example's disc: mass in kg, radius in m. */
export const DISC = { M: 2, R: 0.3 } as const;

/** Disc about its normal axis through the centre: ½MR². */
export const discNormal = (M: number, R: number) => 0.5 * M * R * R;
/** Disc about a diameter: ¼MR² (half the normal-axis value, by the perpendicular-axis theorem). */
export const discDiameter = (M: number, R: number) => 0.25 * M * R * R;
/** Parallel-axis theorem: I = I about the centre of mass + Md². */
export const parallelAxis = (Icm: number, M: number, d: number) => Icm + M * d * d;
/** Radius of gyration form: k² = k² about the centre of mass + d². */
export const gyrationSquared = (kcmSq: number, d: number) => kcmSq + d * d;

export const I_DIAMETER = discDiameter(DISC.M, DISC.R);
export const I_NORMAL = discNormal(DISC.M, DISC.R);
export const I_TANGENT = parallelAxis(I_DIAMETER, DISC.M, DISC.R);

const fmt = (n: number) => String(Math.round(n * 1000) / 1000);

/** "I" with a subscript, for SVG text. */
function Isub({ s }: { s: string }) {
  return (
    <>
      I<tspan dy={3} className="text-[8px]">{s}</tspan>
      <tspan dy={-3}> </tspan>
    </>
  );
}

const LEFT = { cx: 82, cy: 96, r: 52 } as const;
const RIGHT = { cx: 222, cy: 96, r: 52 } as const;
const AXIS = "stroke-indigo-600 dark:stroke-indigo-400";
const AXIS_T = "fill-indigo-700 dark:fill-indigo-300";
const TAN = "stroke-emerald-600 dark:stroke-emerald-400";
const TAN_T = "fill-emerald-700 dark:fill-emerald-300";

function Disc({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} strokeWidth={1.5} className="fill-sky-500/15 stroke-sky-600 dark:fill-sky-400/15 dark:stroke-sky-400" />;
}

function Line({ x1, y1, x2, y2, cls, dash }: { x1: number; y1: number; x2: number; y2: number; cls: string; dash?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.8} strokeDasharray={dash} className={cls} />;
}

function Label({ x, y, cls, children, anchor }: { x: number; y: number; cls: string; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${cls} text-[11px] font-semibold`}>
      {children}
    </text>
  );
}

export default function JeeParallelAxis() {
  const L = LEFT;
  const R = RIGHT;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · perpendicular and parallel axes for a disc
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="A uniform disc of mass 2 kilograms and radius 0.3 metres, seen face on. Left: two diameters x and y in its plane and the axis z through the centre, normal to the disc. About each diameter I is 0.045 kilogram metre squared; about z it is 0.09, the sum of the two. Right: a tangent in the plane of the disc, parallel to a diameter and 0.3 metres from it. Its moment of inertia is 0.045 plus 2 times 0.3 squared, which is 0.225 kilogram metre squared."
      >
        <text x={L.cx} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          axes through the centre
        </text>
        <text x={R.cx + 20} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          move to a tangent
        </text>

        {/* Left: perpendicular-axis theorem */}
        <Disc {...L} />
        <Line x1={L.cx - L.r - 10} y1={L.cy} x2={L.cx + L.r + 10} y2={L.cy} cls={AXIS} />
        <Line x1={L.cx} y1={L.cy + L.r + 10} x2={L.cx} y2={L.cy - L.r - 10} cls={AXIS} />
        <Label x={L.cx + L.r + 6} y={L.cy - 5} cls={AXIS_T}>
          x
        </Label>
        <Label x={L.cx + 5} y={L.cy - L.r - 6} cls={AXIS_T}>
          y
        </Label>
        {/* z: out of the page, drawn as a dot in a ring */}
        <circle cx={L.cx} cy={L.cy} r={5} fill="none" strokeWidth={1.5} className="stroke-rose-600 dark:stroke-rose-400" />
        <circle cx={L.cx} cy={L.cy} r={1.8} className="fill-rose-600 dark:fill-rose-400" />
        <Label x={L.cx + 8} y={L.cy + 16} cls="fill-rose-700 dark:fill-rose-300">
          z
        </Label>
        <text x={L.cx} y={L.cy + L.r + 18} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          z points out of the page
        </text>

        {/* Right: parallel-axis theorem, diameter to tangent */}
        <Disc {...R} />
        <Line x1={R.cx} y1={R.cy + R.r + 10} x2={R.cx} y2={R.cy - R.r - 10} cls={AXIS} dash="5 3" />
        <Line x1={R.cx + R.r} y1={R.cy + R.r + 10} x2={R.cx + R.r} y2={R.cy - R.r - 10} cls={TAN} />
        <circle cx={R.cx} cy={R.cy} r={2.5} className="fill-foreground" />
        <text x={R.cx - 5} y={R.cy - 4} textAnchor="end" className="fill-foreground text-[10px]">
          centre
        </text>
        <Label x={R.cx - 4} y={R.cy - R.r - 2} cls={AXIS_T} anchor="end">
          diameter
        </Label>
        <Label x={R.cx + R.r - 4} y={R.cy - R.r - 2} cls={TAN_T} anchor="end">
          tangent
        </Label>
        {/* d = R */}
        <line x1={R.cx + 3} y1={R.cy + 22} x2={R.cx + R.r - 3} y2={R.cy + 22} strokeWidth={1.2} className="stroke-foreground" />
        <polygon points={`${R.cx},${R.cy + 22} ${R.cx + 6},${R.cy + 19} ${R.cx + 6},${R.cy + 25}`} className="fill-foreground" />
        <polygon points={`${R.cx + R.r},${R.cy + 22} ${R.cx + R.r - 6},${R.cy + 19} ${R.cx + R.r - 6},${R.cy + 25}`} className="fill-foreground" />
        <text x={R.cx + 23} y={R.cy + 15} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          d = R
        </text>

        {/* The numbers */}
        <g className="text-[11px] tabular-nums">
          <text x={L.cx} y={186} textAnchor="middle" className={AXIS_T}>
            <Isub s="x" />= <Isub s="y" />= ¼MR² = {fmt(I_DIAMETER)}
          </text>
          <text x={L.cx} y={202} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300">
            <Isub s="z" />= ½MR² = {fmt(I_NORMAL)}
          </text>
          <text x={L.cx} y={220} textAnchor="middle" className="fill-foreground font-semibold">
            <Isub s="z" />= <Isub s="x" />+ <Isub s="y" />
          </text>
          <text x={R.cx + 20} y={186} textAnchor="middle" className={AXIS_T}>
            <Isub s="cm" />= ¼MR² = {fmt(I_DIAMETER)}
          </text>
          <text x={R.cx + 20} y={202} textAnchor="middle" className={TAN_T}>
            + Md² = 2 × 0.3² = {fmt(DISC.M * DISC.R * DISC.R)}
          </text>
          <text x={R.cx + 20} y={220} textAnchor="middle" className="fill-foreground font-semibold">
            I = {fmt(I_TANGENT)} = (5/4)MR²
          </text>
        </g>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Disc of mass 2 kg, radius 0.3 m; I in kg m². Left: x and y lie in the disc, z is normal to it, all through one point, so the normal
        axis carries the sum of the two diameters (flat bodies only). Right: the parallel-axis theorem starts from the axis through the centre
        of mass, here a diameter, and adds the whole mass moved a distance d: 0.045 + 0.18 = 0.225 kg m².
      </p>
    </div>
  );
}
