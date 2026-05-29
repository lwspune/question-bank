"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: a vector r in 3-D with the angles α, β, γ it makes with the
 * x-, y-, z-axes, whose cosines are the direction cosines l, m, n.
 *
 * Pedagogical aim: the direction cosines are the components of the unit vector,
 * so l² + m² + n² = 1 always.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 175;
const S = 38;

const R = { x: 2.5, y: 1.8, z: 2.2 };
const MAG = Math.hypot(R.x, R.y, R.z);
const L = R.x / MAG;
const M = R.y / MAG;
const N = R.z / MAG;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const deg = (rad: number) => Math.round((rad * 180) / Math.PI);

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (38 * Math.PI) / 180;
const DEFAULT_EL = (22 * Math.PI) / 180;

// arc between the unit vector toward an axis and toward r
function arcPath(
  p: (x: number, y: number, z: number) => [number, number],
  axis: [number, number, number],
) {
  const ur: [number, number, number] = [R.x / MAG, R.y / MAG, R.z / MAG];
  const pts = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const x = axis[0] * (1 - t) + ur[0] * t;
    const y = axis[1] * (1 - t) + ur[1] * t;
    const z = axis[2] * (1 - t) + ur[2] * t;
    const n = Math.hypot(x, y, z) || 1;
    return p((x / n) * 0.9, (y / n) * 0.9, (z / n) * 0.9);
  });
  return pts.map((q, i) => `${i === 0 ? "M" : "L"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
}

export default function DirectionCosines3D() {
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
  const onUp = () => {
    drag.current = null;
  };

  const p = makeProject(az, el);
  const O = p(0, 0, 0);
  const Xe = p(3.1, 0, 0);
  const Ye = p(0, 3.1, 0);
  const Ze = p(0, 0, 3.1);
  const Pr = p(R.x, R.y, R.z);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · direction cosines (drag to rotate)
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
        aria-label="A 3-D vector and the angles it makes with the three axes; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="dc-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
          <marker id="dc-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={O[0]} y1={O[1]} x2={Xe[0]} y2={Xe[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#dc-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ye[0]} y2={Ye[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#dc-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ze[0]} y2={Ze[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#dc-axis)" />
        <text x={Xe[0] + 6} y={Xe[1] + 4} className="fill-muted-foreground text-[10px] font-medium">x</text>
        <text x={Ye[0] + 6} y={Ye[1] + 4} className="fill-muted-foreground text-[10px] font-medium">y</text>
        <text x={Ze[0] + 4} y={Ze[1] - 4} className="fill-muted-foreground text-[10px] font-medium">z</text>

        {/* angle arcs */}
        <path d={arcPath(p, [1, 0, 0])} fill="none" stroke="currentColor" className="text-sky-500/70" strokeWidth={1.25} />
        <path d={arcPath(p, [0, 1, 0])} fill="none" stroke="currentColor" className="text-amber-500/70" strokeWidth={1.25} />
        <path d={arcPath(p, [0, 0, 1])} fill="none" stroke="currentColor" className="text-emerald-500/70" strokeWidth={1.25} />

        {/* the vector */}
        <line x1={O[0]} y1={O[1]} x2={Pr[0]} y2={Pr[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#dc-r)" />
        <text x={Pr[0] + 6} y={Pr[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">r</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span className="text-sky-700 dark:text-sky-300">α ≈ {deg(Math.acos(L))}° · l = {L.toFixed(2)}</span>
        <span className="text-amber-700 dark:text-amber-300">β ≈ {deg(Math.acos(M))}° · m = {M.toFixed(2)}</span>
        <span className="text-emerald-700 dark:text-emerald-300">γ ≈ {deg(Math.acos(N))}° · n = {N.toFixed(2)}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        l, m, n are the cosines of the angles r makes with the x-, y-, z-axes — and the components of the unit
        vector along r. So l² + m² + n² = {(L * L + M * M + N * N).toFixed(2)} = 1, always.
      </p>
    </div>
  );
}
