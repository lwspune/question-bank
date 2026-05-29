"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: a vector resolved into its î, ĵ, k̂ components, drawn as a
 * dashed staircase from the origin out to the tip.
 *
 * Pedagogical aim: every vector is the sum of its axis components,
 * v = x î + y ĵ + z k̂. Hand-rolled SVG, no 3D library.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 178;
const S = 40;

const V = { x: 2.4, y: 1.6, z: 2.0 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (36 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

export default function ComponentFormBasis3D() {
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
  const Xe = p(3, 0, 0);
  const Ye = p(0, 3, 0);
  const Ze = p(0, 0, 3);
  const Px = p(V.x, 0, 0);
  const Pxy = p(V.x, V.y, 0);
  const Pv = p(V.x, V.y, V.z);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · component form (drag to rotate)
        </p>
        <button type="button" onClick={() => { setAz(DEFAULT_AZ); setEl(DEFAULT_EL); }} className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent">
          Reset
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing" role="img" aria-label="A vector resolved into its three axis components; drag to rotate" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <defs>
          <marker id="cf-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
          <marker id="cf-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        <line x1={O[0]} y1={O[1]} x2={Xe[0]} y2={Xe[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#cf-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ye[0]} y2={Ye[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#cf-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ze[0]} y2={Ze[1]} stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1.25} markerEnd="url(#cf-axis)" />
        <text x={Xe[0] + 6} y={Xe[1] + 4} className="fill-muted-foreground text-[10px] font-medium">x</text>
        <text x={Ye[0] + 6} y={Ye[1] + 4} className="fill-muted-foreground text-[10px] font-medium">y</text>
        <text x={Ze[0] + 4} y={Ze[1] - 4} className="fill-muted-foreground text-[10px] font-medium">z</text>

        {/* component staircase */}
        <line x1={O[0]} y1={O[1]} x2={Px[0]} y2={Px[1]} stroke="currentColor" className="text-sky-600/80 dark:text-sky-400/80" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={Px[0]} y1={Px[1]} x2={Pxy[0]} y2={Pxy[1]} stroke="currentColor" className="text-amber-600/80 dark:text-amber-400/80" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={Pxy[0]} y1={Pxy[1]} x2={Pv[0]} y2={Pv[1]} stroke="currentColor" className="text-emerald-600/80 dark:text-emerald-400/80" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* the vector */}
        <line x1={O[0]} y1={O[1]} x2={Pv[0]} y2={Pv[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#cf-v)" />
        <text x={Pv[0] + 6} y={Pv[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">v</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Step along x (<span className="text-sky-700 dark:text-sky-300">2.4 î</span>), then y
        (<span className="text-amber-700 dark:text-amber-300"> 1.6 ĵ</span>), then z
        (<span className="text-emerald-700 dark:text-emerald-300"> 2.0 k̂</span>) to reach the tip:
        v = 2.4 î + 1.6 ĵ + 2.0 k̂. Any vector is the sum of its axis components, and
        |v| = √(x² + y² + z²).
      </p>
    </div>
  );
}
