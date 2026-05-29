"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: vectors a, b in a plane and the UNIT normal n̂ = (a×b)/|a×b|
 * perpendicular to both, with the opposite choice −n̂ (from b×a) shown faint.
 *
 * Pedagogical aim: there are exactly two unit vectors perpendicular to a plane,
 * ±n̂, and the cross product picks one by the right-hand rule.
 */

const W = 360;
const H = 300;
const OX = 180;
const OY = 150;
const S = 34;

const A = { x: 3, y: 0.5 };
const B = { x: 0.5, y: 3 };
const N_LEN = 2.2; // display length for the unit normal

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (32 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

export default function UnitNormalVector3D() {
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
  const Pa = p(A.x, A.y, 0);
  const Pb = p(B.x, B.y, 0);
  const AB = p(A.x + B.x, A.y + B.y, 0);
  const Nup = p(0, 0, N_LEN);
  const Ndn = p(0, 0, -N_LEN);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · unit normal n̂ = (a×b)/|a×b|
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
        aria-label="Unit normal to the plane of a and b, drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="un-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="un-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="un-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        <polygon points={`${O[0]},${O[1]} ${Pa[0]},${Pa[1]} ${AB[0]},${AB[1]} ${Pb[0]},${Pb[1]}`} className="fill-indigo-500/10 stroke-indigo-400/40" strokeWidth={1} />

        {/* −n̂ (the other choice) */}
        <line x1={O[0]} y1={O[1]} x2={Ndn[0]} y2={Ndn[1]} stroke="currentColor" className="text-indigo-400/60" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#un-indigo)" />
        <line x1={O[0]} y1={O[1]} x2={Pa[0]} y2={Pa[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#un-sky)" />
        <line x1={O[0]} y1={O[1]} x2={Pb[0]} y2={Pb[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#un-amber)" />
        {/* n̂ */}
        <line x1={O[0]} y1={O[1]} x2={Nup[0]} y2={Nup[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#un-indigo)" />

        <text x={Pa[0] + 6} y={Pa[1] + 4} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">a</text>
        <text x={Pb[0] - 12} y={Pb[1] + 4} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">b</text>
        <text x={Nup[0] + 6} y={Nup[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">n̂</text>
        <text x={Ndn[0] + 6} y={Ndn[1] + 4} className="fill-indigo-500/80 text-[11px] font-semibold">−n̂</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        A plane has exactly two unit normals, <span className="font-medium text-indigo-700 dark:text-indigo-300">±n̂</span>.
        The cross product a × b picks one by the right-hand rule; b × a gives the other. Dividing by |a × b|
        rescales it to length 1.
      </p>
    </div>
  );
}
