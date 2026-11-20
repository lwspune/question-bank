/**
 * Static figure: polarisation by reflection at the polarising angle (concept
 * nphwo-brewster), drawn with the concept's worked example: light meets glass
 * at the polarising angle and the refracted ray makes 33° with the normal, so
 * i_B = 90° − 33° = 57° and μ = tan 57° ≈ 1.54.
 *
 * Incident and reflected rays at 57° to the normal, the refracted ray at 33°;
 * the reflected and refracted rays meet at a right angle (marked). The
 * reflected light is completely plane polarised, the refracted light only
 * partly, as the concept says. Angles are drawn true.
 * Server component, pure SVG. Pinned by tests/notes-w2-19.test.ts.
 */

/** The worked example, degrees. */
export const REFRACTED_DEG = 33;
export const brewsterDeg = (r: number) => 90 - r;
export const INCIDENT_DEG = brewsterDeg(REFRACTED_DEG);

const rad = (d: number) => (d * Math.PI) / 180;

/** μ = tan i_B. */
export const refractiveIndex = (iDeg: number) => Math.tan(rad(iDeg));

// Geometry (viewBox units).
export const O = { x: 150, y: 108 } as const;
export const RAY = 92;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Unit directions from O (y down): reflected goes up-right, refracted goes down-right. */
export const DIR = {
  incidentFrom: { x: -Math.sin(rad(INCIDENT_DEG)), y: -Math.cos(rad(INCIDENT_DEG)) },
  reflected: { x: Math.sin(rad(INCIDENT_DEG)), y: -Math.cos(rad(INCIDENT_DEG)) },
  refracted: { x: Math.sin(rad(REFRACTED_DEG)), y: Math.cos(rad(REFRACTED_DEG)) },
} as const;

/** Angle in degrees between two directions. */
export function angleBetween(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dot = a.x * b.x + a.y * b.y;
  return (Math.acos(dot / (Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y))) * 180) / Math.PI;
}

const at = (d: { x: number; y: number }, len: number) => ({ x: r2(O.x + d.x * len), y: r2(O.y + d.y * len) });

/** An arc of radius r from the vertical (up if dir = −1, down if 1) turning to the given angle, toward +x or −x. */
function arc(r: number, deg: number, down: boolean, side: 1 | -1): string {
  const sy = down ? 1 : -1;
  const start = { x: O.x, y: O.y + sy * r };
  const end = { x: r2(O.x + side * r * Math.sin(rad(deg))), y: r2(O.y + sy * r * Math.cos(rad(deg))) };
  const sweep = (side === 1) === !down ? 1 : 0;
  return `M ${start.x} ${r2(start.y)} A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`;
}

function Ray({ from, to, tone }: { from: { x: number; y: number }; to: { x: number; y: number }; tone: string }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Arrowhead half way along.
  const m = { x: from.x + dx * 0.55, y: from.y + dy * 0.55 };
  const tip = `${r2(m.x + ux * 5)},${r2(m.y + uy * 5)} ${r2(m.x - ux * 4 - uy * 4)},${r2(m.y - uy * 4 + ux * 4)} ${r2(m.x - ux * 4 + uy * 4)},${r2(m.y - uy * 4 - ux * 4)}`;
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={2.2} className={`stroke-current ${tone}`} />
      <polygon points={tip} className={`fill-current ${tone}`} />
    </g>
  );
}

export default function NeetBrewsterAngle() {
  const start = at(DIR.incidentFrom, RAY);
  const refl = at(DIR.reflected, RAY);
  const refr = at(DIR.refracted, RAY);
  const k = 13;
  const c1 = at(DIR.reflected, k);
  const c3 = at(DIR.refracted, k);
  const c2 = { x: r2(O.x + (DIR.reflected.x + DIR.refracted.x) * k), y: r2(O.y + (DIR.reflected.y + DIR.refracted.y) * k) };
  const mu = Math.round(refractiveIndex(INCIDENT_DEG) * 100) / 100;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reflection at the polarising angle
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="Light in air meets glass at 57 degrees to the normal. It is reflected at 57 degrees and refracted at 33 degrees, and the reflected and refracted rays are at right angles. The reflected light is completely plane polarised; the refracted light is partly polarised. The refractive index is tan 57 degrees, about 1.54."
      >
        {/* Glass */}
        <rect x={10} y={O.y} width={300} height={100} className="fill-sky-100/70 dark:fill-sky-950/50" />
        <line x1={10} y1={O.y} x2={310} y2={O.y} strokeWidth={1.5} className="stroke-sky-600 dark:stroke-sky-400" />
        <text x={16} y={O.y - 6} className="fill-muted-foreground text-[10px]">
          air
        </text>
        <text x={16} y={O.y + 16} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
          glass
        </text>

        {/* Normal */}
        <line x1={O.x} y1={O.y - 100} x2={O.x} y2={O.y + 98} strokeDasharray="4 3" className="stroke-muted-foreground" />
        <text x={O.x + 4} y={O.y - 92} className="fill-muted-foreground text-[10px]">
          normal
        </text>

        {/* Rays */}
        <Ray from={start} to={O} tone="text-amber-500 dark:text-amber-400" />
        <Ray from={O} to={refl} tone="text-rose-600 dark:text-rose-400" />
        <Ray from={O} to={refr} tone="text-emerald-600 dark:text-emerald-400" />

        {/* Angles */}
        <path d={arc(26, INCIDENT_DEG, false, -1)} fill="none" className="stroke-amber-600 dark:stroke-amber-400" />
        <text x={O.x - 4} y={O.y - 36} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          <tspan>i</tspan>
          <tspan dy={3} className="text-[8px]">
            B
          </tspan>
          <tspan dy={-3}> = {INCIDENT_DEG}°</tspan>
        </text>
        <path d={arc(26, INCIDENT_DEG, false, 1)} fill="none" className="stroke-rose-600 dark:stroke-rose-400" />
        <text x={O.x + 5} y={O.y - 36} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          {INCIDENT_DEG}°
        </text>
        <path d={arc(30, REFRACTED_DEG, true, 1)} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={O.x + 4} y={O.y + 44} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          {REFRACTED_DEG}°
        </text>

        {/* Right angle between reflected and refracted rays */}
        <polyline points={`${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`} fill="none" className="stroke-foreground" />
        <text x={c2.x + 6} y={c2.y + 4} className="fill-foreground text-[10px] font-semibold">
          90°
        </text>

        {/* Ray labels */}
        <text x={start.x - 2} y={start.y - 6} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          light from air
        </text>
        <text x={refl.x + 4} y={refl.y - 22} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          reflected:
        </text>
        <text x={refl.x + 4} y={refl.y - 10} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          completely plane polarised
        </text>
        <text x={refr.x + 6} y={refr.y + 2} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          refracted:
        </text>
        <text x={refr.x + 6} y={refr.y + 14} className="fill-emerald-700 text-[10px] dark:fill-emerald-300">
          partly polarised
        </text>

        {/* The sum */}
        <text x={160} y={226} textAnchor="middle" className="fill-foreground text-[11px] tabular-nums">
          i + r = {INCIDENT_DEG}° + {REFRACTED_DEG}° = 90°
        </text>
        <text x={160} y={240} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          μ = tan {INCIDENT_DEG}° ≈ {mu}
        </text>
      </svg>
      <p className="mt-2 text-sm text-foreground">
        At the polarising angle the reflected and refracted rays are at right angles, so i + r = 90°, and Brewster&apos;s law gives
        μ = tan i.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tangent, not sine: the sine belongs to the critical angle. At any other angle the reflected light is only partly polarised.
      </p>
    </div>
  );
}
