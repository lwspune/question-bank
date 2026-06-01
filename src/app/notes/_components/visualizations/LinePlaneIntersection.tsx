"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: a tilted plane and a straight line piercing it at a single
 * point P. The line is the parametric point (x0+at, y0+bt, z0+ct); the pierce
 * point is found by substituting into the plane equation and solving for t.
 * Rotating shows that P is a genuine point in space, not an artefact of the
 * 2-D projection.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 170;
const S = 32;
const A = 2.2; // plane half-extent

// Plane: z = 0.3x + 0.2y + 0.4  →  0.3x + 0.2y - z + 0.4 = 0
const PA = 0.3, PB = 0.2, PC = 0.4;
const planeZ = (x: number, y: number) => PA * x + PB * y + PC;

// Line: P0 + t·d
const P0 = { x: -1.4, y: -1.0, z: 1.9 };
const D = { x: 0.45, y: 0.35, z: -1 };
// Solve P0.z + t·d.z = PA(P0.x+t·d.x) + PB(P0.y+t·d.y) + PC
const tStar =
  (PA * P0.x + PB * P0.y + PC - P0.z) / (D.z - PA * D.x - PB * D.y);
const PIERCE = {
  x: P0.x + tStar * D.x,
  y: P0.y + tStar * D.y,
  z: P0.z + tStar * D.z,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (40 * Math.PI) / 180;
const DEFAULT_EL = (18 * Math.PI) / 180;

export default function LinePlaneIntersection() {
  const [az, setAz] = useState(DEFAULT_AZ);
  const [el, setEl] = useState(DEFAULT_EL);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setAz((a) => a - dx * 0.01);
    setEl((v) => clamp(v + dy * 0.01, -1.45, 1.45));
  };
  const onUp = () => { drag.current = null; };

  const p = makeProject(az, el);
  const poly = (pts: [number, number, number][]) =>
    pts.map(([x, y, z]) => p(x, y, z).join(",")).join(" ");

  const planeCorners: [number, number, number][] = [
    [A, A, planeZ(A, A)], [-A, A, planeZ(-A, A)], [-A, -A, planeZ(-A, -A)], [A, -A, planeZ(A, -A)],
  ];
  // Line endpoints either side of the pierce point
  const lineEnd = (t: number) => p(P0.x + t * D.x, P0.y + t * D.y, P0.z + t * D.z);
  const Lin = lineEnd(tStar - 1.8); // in front of plane
  const Lout = lineEnd(tStar + 1.8); // behind plane
  const Pp = p(PIERCE.x, PIERCE.y, PIERCE.z);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · line piercing a plane (drag to rotate)
        </p>
        <button
          type="button"
          onClick={() => { setAz(DEFAULT_AZ); setEl(DEFAULT_EL); }}
          className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent"
        >
          Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label="A line piercing a tilted plane at one point; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="lpi-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* plane */}
        <polygon points={poly(planeCorners)} className="fill-indigo-400/18 stroke-indigo-500/60" strokeWidth={1.25} />

        {/* line: solid before pierce, dashed after (behind the plane) */}
        <line x1={Lin[0]} y1={Lin[1]} x2={Pp[0]} y2={Pp[1]} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.5} />
        <line x1={Pp[0]} y1={Pp[1]} x2={Lout[0]} y2={Lout[1]} className="stroke-rose-600/70 dark:stroke-rose-400/70" strokeWidth={2.5} strokeDasharray="5 4" markerEnd="url(#lpi-r)" />

        {/* pierce point */}
        <circle cx={Pp[0]} cy={Pp[1]} r={5} className="fill-amber-500 stroke-amber-700" strokeWidth={1.5} />
        <text x={Pp[0] + 8} y={Pp[1] - 5} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-bold">P</text>
        <text x={Lin[0] - 4} y={Lin[1] + 14} className="fill-rose-700 dark:fill-rose-300 text-[11px] font-semibold">L</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Substitute the line&apos;s point <span className="font-mono">(x₀+at, y₀+bt, z₀+ct)</span> into the plane
        equation → one equation in t → solve → back-substitute to get the pierce point <span className="font-semibold text-foreground">P</span>.
      </p>
    </div>
  );
}
