"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: three mutually perpendicular unit vectors î, ĵ, k̂ from the
 * origin, with a right-angle marker in the base plane.
 *
 * Pedagogical aim: an orthonormal triple — each pair perpendicular
 * (dot product 0), each of length 1. Hand-rolled SVG, no 3D library.
 */

const W = 360;
const H = 300;
const OX = 180;
const OY = 165;
const S = 46;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (34 * Math.PI) / 180;
const DEFAULT_EL = (22 * Math.PI) / 180;
const L = 2.2; // display length of each unit vector

export default function OrthogonalTriple3D() {
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
  const I = p(L, 0, 0);
  const J = p(0, L, 0);
  const K = p(0, 0, L);
  // right-angle marker in the x–y plane
  const r1 = p(0.5, 0, 0);
  const r2 = p(0.5, 0.5, 0);
  const r3 = p(0, 0.5, 0);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · orthonormal triple î, ĵ, k̂ (drag to rotate)
        </p>
        <button type="button" onClick={() => { setAz(DEFAULT_AZ); setEl(DEFAULT_EL); }} className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent">
          Reset
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing" role="img" aria-label="Three mutually perpendicular unit vectors; drag to rotate" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <defs>
          <marker id="ot-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="ot-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="ot-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        <path d={`M${r1[0]},${r1[1]} L${r2[0]},${r2[1]} L${r3[0]},${r3[1]}`} fill="none" stroke="currentColor" className="text-rose-500/70" strokeWidth={1} />

        <line x1={O[0]} y1={O[1]} x2={I[0]} y2={I[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2.5} markerEnd="url(#ot-sky)" />
        <line x1={O[0]} y1={O[1]} x2={J[0]} y2={J[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2.5} markerEnd="url(#ot-amber)" />
        <line x1={O[0]} y1={O[1]} x2={K[0]} y2={K[1]} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} markerEnd="url(#ot-emerald)" />

        <text x={I[0] + 6} y={I[1] + 4} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">î</text>
        <text x={J[0] + 6} y={J[1] + 4} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">ĵ</text>
        <text x={K[0] + 4} y={K[1] - 4} className="fill-emerald-700 dark:fill-emerald-300 text-[12px] font-semibold">k̂</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        î, ĵ, k̂ are mutually perpendicular unit vectors: each pair has dot product 0 (î·ĵ = ĵ·k̂ = k̂·î = 0) and
        each has length 1. They form the standard basis — any vector is a unique combination x î + y ĵ + z k̂.
      </p>
    </div>
  );
}
