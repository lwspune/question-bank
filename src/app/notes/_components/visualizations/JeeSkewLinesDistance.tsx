/**
 * Static figure: the shortest distance between two skew lines (concept
 * j3d-shortest-distance), drawn with the concept's worked example:
 * r = (1, 0, 0) + λ(1, 1, 0) and r = (0, 0, 2) + μ(0, 1, 1).
 *
 * a₁ = (1, 0, 0), d₁ = (1, 1, 0), a₂ = (0, 0, 2), d₂ = (0, 1, 1).
 * d₁ × d₂ = (1, −1, 1), of length √3; a₂ − a₁ = (−1, 0, 2), and
 * (a₂ − a₁)·(d₁ × d₂) = −1 + 0 + 2 = 1, so SD = 1/√3.
 *
 * The common perpendicular is drawn where it really is: its feet are at
 * λ = −4/3, the point (−1/3, −4/3, 0), and μ = −5/3, the point
 * (0, −5/3, 1/3); the segment between them is (1/3, −1/3, 1/3), along
 * d₁ × d₂ and of length 1/√3. The sketch is a true orthographic view
 * (camera azimuth 0.95 rad, elevation 0.6 rad), chosen so that the two lines
 * do not cross on the page. Server component. Pinned by
 * tests/notes-jee-visuals-maths.test.ts.
 */

export type V3 = [number, number, number];

export const A1: V3 = [1, 0, 0];
export const D1: V3 = [1, 1, 0];
export const A2: V3 = [0, 0, 2];
export const D2: V3 = [0, 1, 1];

export const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
export const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
export const cross = (p: V3, q: V3): V3 => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
export const norm = (p: V3) => Math.sqrt(dot(p, p));

/** SD = |(a₂ − a₁)·(d₁ × d₂)| / |d₁ × d₂|. */
export function shortestDistance(a1: V3, d1: V3, a2: V3, d2: V3): number {
  const n = cross(d1, d2);
  return Math.abs(dot(sub(a2, a1), n)) / norm(n);
}

export const pointOn = (a: V3, d: V3, t: number): V3 => [a[0] + t * d[0], a[1] + t * d[1], a[2] + t * d[2]];

/**
 * Parameters (λ, μ) of the feet of the common perpendicular: the joining
 * vector (a₂ + μd₂) − (a₁ + λd₁) is perpendicular to both d₁ and d₂.
 */
export function perpendicularFeet(a1: V3, d1: V3, a2: V3, d2: V3): { lambda: number; mu: number } {
  const w = sub(a2, a1);
  // λ(d₁·d₁) − μ(d₁·d₂) = w·d₁ and λ(d₁·d₂) − μ(d₂·d₂) = w·d₂.
  const a = dot(d1, d1);
  const b = dot(d1, d2);
  const c = dot(d2, d2);
  const e = dot(w, d1);
  const f = dot(w, d2);
  const det = -a * c + b * b;
  return { lambda: (-e * c + b * f) / det, mu: (a * f - b * e) / det };
}

// The view: orthographic, camera at azimuth AZ and elevation EL.
const AZ = 0.95;
const EL = 0.6;
const SCALE = 60;
const ORIGIN = { x: 193, y: 133 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Page position of a 3-D point. */
export function project(p: V3): { x: number; y: number } {
  const [x, y, z] = p;
  const u = -Math.sin(AZ) * x + Math.cos(AZ) * y;
  const v = -Math.sin(EL) * Math.cos(AZ) * x - Math.sin(EL) * Math.sin(AZ) * y + Math.cos(EL) * z;
  return { x: r2(ORIGIN.x + SCALE * u), y: r2(ORIGIN.y - SCALE * v) };
}

/** The parameter ranges drawn. */
export const RANGE1 = [-1.6, 1] as const;
export const RANGE2 = [-2.6, 0.7] as const;

function arrowHead(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const s = 6;
  const pts = [
    [to.x, to.y],
    [to.x - s * ux + (s / 2) * uy, to.y - s * uy - (s / 2) * ux],
    [to.x - s * ux - (s / 2) * uy, to.y - s * uy + (s / 2) * ux],
  ];
  return pts.map(([x, y]) => `${r2(x)},${r2(y)}`).join(" ");
}

export default function JeeSkewLinesDistance() {
  const feet = perpendicularFeet(A1, D1, A2, D2);
  const P = project(pointOn(A1, D1, feet.lambda));
  const Q = project(pointOn(A2, D2, feet.mu));
  const l1 = [project(pointOn(A1, D1, RANGE1[0])), project(pointOn(A1, D1, RANGE1[1]))];
  const l2 = [project(pointOn(A2, D2, RANGE2[0])), project(pointOn(A2, D2, RANGE2[1]))];
  const a1 = project(A1);
  const a2 = project(A2);
  const d1Tip = project(pointOn(A1, D1, 0.6));
  const d2Tip = project(pointOn(A2, D2, 0.6));

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the shortest distance between two skew lines
      </p>
      <svg
        viewBox="0 0 320 278"
        className="block h-auto w-full"
        role="img"
        aria-label="Two skew lines, through a₁(1, 0, 0) along d₁ = (1, 1, 0) and through a₂(0, 0, 2) along d₂ = (0, 1, 1). Their common perpendicular runs along d₁ × d₂ = (1, −1, 1) and has length 1/√3, the projection of a₂ − a₁ = (−1, 0, 2) on that direction."
      >
        {/* The two lines */}
        <line x1={l1[0].x} y1={l1[0].y} x2={l1[1].x} y2={l1[1].y} strokeWidth={2.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1={l2[0].x} y1={l2[0].y} x2={l2[1].x} y2={l2[1].y} strokeWidth={2.5} className="stroke-rose-600 dark:stroke-rose-400" />

        {/* Directions d₁ (from a₁) and d₂ (from a₂) */}
        <line x1={a1.x} y1={a1.y} x2={d1Tip.x} y2={d1Tip.y} strokeWidth={3} className="stroke-indigo-800 dark:stroke-indigo-300" />
        <polygon points={arrowHead(a1, d1Tip)} className="fill-indigo-800 dark:fill-indigo-300" />
        <line x1={a2.x} y1={a2.y} x2={d2Tip.x} y2={d2Tip.y} strokeWidth={3} className="stroke-rose-800 dark:stroke-rose-300" />
        <polygon points={arrowHead(a2, d2Tip)} className="fill-rose-800 dark:fill-rose-300" />

        {/* The joining vector a₂ − a₁ */}
        <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} strokeWidth={1.5} strokeDasharray="5 3" className="stroke-amber-600 dark:stroke-amber-400" />

        {/* The common perpendicular */}
        <line x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} strokeWidth={3} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <circle cx={P.x} cy={P.y} r={2.5} className="fill-emerald-600 dark:fill-emerald-400" />
        <circle cx={Q.x} cy={Q.y} r={2.5} className="fill-emerald-600 dark:fill-emerald-400" />

        {/* Labels */}
        <circle cx={a1.x} cy={a1.y} r={3} className="fill-foreground" />
        <text x={a1.x + 7} y={a1.y + 4} className="fill-foreground text-[10px] font-semibold tabular-nums">
          a₁(1, 0, 0)
        </text>
        <circle cx={a2.x} cy={a2.y} r={3} className="fill-foreground" />
        <text x={a2.x + 6} y={a2.y + 13} className="fill-foreground text-[10px] font-semibold tabular-nums">
          a₂(0, 0, 2)
        </text>
        <text x={d1Tip.x - 7} y={d1Tip.y + 2} textAnchor="end" className="fill-indigo-800 text-[11px] font-semibold dark:fill-indigo-300">
          d₁
        </text>
        <text x={d2Tip.x + 4} y={d2Tip.y - 4} className="fill-rose-800 text-[11px] font-semibold dark:fill-rose-300">
          d₂
        </text>
        <text x={(a1.x + a2.x) / 2 + 10} y={(a1.y + a2.y) / 2 + 12} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          a₂ − a₁
        </text>
        <text x={Q.x - 7} y={Q.y - 4} textAnchor="end" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          SD
        </text>
        <text x={Q.x - 7} y={Q.y - 17} textAnchor="end" className="fill-emerald-700 text-[9px] dark:fill-emerald-300">
          along d₁ × d₂
        </text>

        {/* The working */}
        <g className="text-[11px] tabular-nums">
          <text x={160} y={222} textAnchor="middle" className="fill-foreground">
            d₁ × d₂ = (1, −1, 1), |d₁ × d₂| = √3
          </text>
          <text x={160} y={238} textAnchor="middle" className="fill-foreground">
            a₂ − a₁ = (−1, 0, 2), dot product −1 + 0 + 2 = 1
          </text>
          <text x={160} y={258} textAnchor="middle" className="fill-emerald-700 font-semibold dark:fill-emerald-300">
            SD = |(a₂ − a₁)·(d₁ × d₂)| / |d₁ × d₂| = 1/√3
          </text>
          <text x={160} y={274} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            (about 0.577)
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The lines never meet and are not parallel. The one segment perpendicular to both runs along d₁ × d₂, and its length is the
        projection of any joining vector, here a₂ − a₁, on that direction. A dot product of 0 would mean the lines meet.
      </p>
    </div>
  );
}
