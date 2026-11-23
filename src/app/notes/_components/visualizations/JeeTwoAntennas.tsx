/**
 * Static figure: the line-of-sight range of two antennas on a round earth
 * (concept jpcomm-two-towers), drawn with the concept's worked example: a
 * 405 m transmitting antenna and a 5 m receiving antenna, R = 6400 km.
 *
 * Each antenna sees to its own horizon, and the largest distance is reached
 * when the two horizons meet: d_M = √(2Rh_T) + √(2Rh_R).
 * √(2 × 6.4 × 10⁶ × 405) = 72 000 m = 72 km, √(2 × 6.4 × 10⁶ × 5) = 8000 m
 * = 8 km, so d_M = 80 km. Adding the heights first gives
 * √(2 × 6.4 × 10⁶ × 410) ≈ 72.4 km, the trap. The earth and the towers are
 * drawn as a schematic: the line of sight touches the circle at the point
 * where the horizons meet, and each tower stands along a radius.
 * Server component. Pinned by tests/notes-w2-12.test.ts.
 */

export const EARTH_R_M = 6.4e6;

/** One antenna's range √(2Rh), in km, for a height in metres. */
export const rangeKm = (hM: number) => Math.sqrt(2 * EARTH_R_M * hM) / 1000;

/** d_M = √(2Rh_T) + √(2Rh_R), in km. */
export const maxDistanceKm = (hT: number, hR: number) => rangeKm(hT) + rangeKm(hR);

/** Two identical antennas d km apart: h = d²/(8R), in km. */
export const identicalHeightKm = (dKm: number) => (dKm * dKm) / (8 * (EARTH_R_M / 1000));

export const ANTENNAS = { hT: 405, hR: 5 } as const;

// Schematic (viewBox units): circle centre C, radius RP; the horizons meet at H.
export const C = { x: 160, y: 330 } as const;
export const RP = 230;
export const H = { x: C.x, y: C.y - RP } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Tower tops on the line of sight (the tangent at H), left and right of H. */
export const T_TOP = { x: H.x - 140, y: H.y } as const;
export const R_TOP = { x: H.x + 70, y: H.y } as const;

/** Where a tower whose top is p meets the ground: along the radius to p. */
export function towerFoot(p: { x: number; y: number }) {
  const dx = p.x - C.x;
  const dy = p.y - C.y;
  const k = RP / Math.hypot(dx, dy);
  return { x: r2(C.x + dx * k), y: r2(C.y + dy * k) };
}

function Sub({ s }: { s: string }) {
  return (
    <tspan dy={3} className="text-[8px]">
      {s}
    </tspan>
  );
}

export default function JeeTwoAntennas() {
  const fT = towerFoot(T_TOP);
  const fR = towerFoot(R_TOP);
  const edgeY = r2(C.y - Math.sqrt(RP * RP - C.x * C.x));
  const dT = Math.round(rangeKm(ANTENNAS.hT) * 10) / 10;
  const dR = Math.round(rangeKm(ANTENNAS.hR) * 10) / 10;
  const wrong = Math.round(rangeKm(ANTENNAS.hT + ANTENNAS.hR) * 10) / 10;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two antennas, each seeing to its own horizon
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="A 405 m transmitting antenna and a 5 m receiving antenna on the curved earth, R = 6400 km. The line of sight from each top touches the earth where the two horizons meet. The transmitter's range is 72 km, the receiver's 8 km, so the largest distance is 72 + 8 = 80 km. Adding the heights first would give about 72.4 km, which is wrong."
      >
        {/* The earth */}
        <path
          d={`M 0 ${edgeY} A ${RP} ${RP} 0 0 1 320 ${edgeY} L 320 252 L 0 252 Z`}
          strokeWidth={1.5}
          className="fill-emerald-500/10 stroke-emerald-700 dark:fill-emerald-400/10 dark:stroke-emerald-400"
        />
        <line x1={H.x} y1={H.y + 22} x2={H.x} y2={170} strokeWidth={1} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <text x={H.x + 5} y={162} className="fill-muted-foreground text-[10px]">
          R, to the centre
        </text>

        {/* Line of sight, in two parts */}
        <line x1={T_TOP.x} y1={T_TOP.y} x2={H.x} y2={H.y} strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={H.x} y1={H.y} x2={R_TOP.x} y2={R_TOP.y} strokeWidth={2} className="stroke-sky-600 dark:stroke-sky-400" />

        {/* Towers */}
        <line x1={fT.x} y1={fT.y} x2={T_TOP.x} y2={T_TOP.y} strokeWidth={3.5} className="stroke-foreground" />
        <line x1={fR.x} y1={fR.y} x2={R_TOP.x} y2={R_TOP.y} strokeWidth={3.5} className="stroke-foreground" />
        <circle cx={T_TOP.x} cy={T_TOP.y} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <circle cx={R_TOP.x} cy={R_TOP.y} r={3.5} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={H.x} cy={H.y} r={3.5} className="fill-emerald-600 dark:fill-emerald-400" />

        {/* Labels */}
        <g className="text-[11px]">
          <text x={6} y={84} className="fill-foreground font-semibold">
            transmitter
          </text>
          <text x={36} y={112} className="fill-muted-foreground">
            405 m
          </text>
          <text x={R_TOP.x + 10} y={84} textAnchor="middle" className="fill-foreground font-semibold">
            receiver
          </text>
          <text x={R_TOP.x + 7} y={R_TOP.y + 4} className="fill-muted-foreground">
            5 m
          </text>
          <text x={(T_TOP.x + H.x) / 2 + 12} y={H.y - 6} textAnchor="middle" className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            72 km
          </text>
          <text x={(H.x + R_TOP.x) / 2} y={H.y - 6} textAnchor="middle" className="fill-sky-700 font-semibold dark:fill-sky-300">
            8 km
          </text>
          <text x={H.x} y={H.y + 16} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
            the horizons meet
          </text>
        </g>

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={188} textAnchor="middle" className="fill-foreground">
            √(2Rh
            <Sub s="T" />
            <tspan dy={-3}>) = {dT} km, √(2Rh</tspan>
            <Sub s="R" />
            <tspan dy={-3}>) = {dR} km</tspan>
          </text>
          <text x={160} y={206} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            d
            <Sub s="M" />
            <tspan dy={-3}>
              {" "}
              = {dT} + {dR} = {dT + dR} km
            </tspan>
          </text>
          <text x={160} y={224} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300">
            heights added first: √(2R × 410 m) ≈ {wrong} km, wrong
          </text>
          <text x={160} y={242} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            R = 6400 km. The earth and towers are not to scale.
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each antenna reaches its own horizon, so the largest distance is the sum of the two ranges: √(2Rh) for each height, then add.
        Add the ranges, never the heights.
      </p>
    </div>
  );
}
