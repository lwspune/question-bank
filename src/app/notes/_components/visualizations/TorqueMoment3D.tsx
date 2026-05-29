"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: torque τ = r × F. Position vector r to the point of
 * application, force F there, and the torque rising perpendicular to their
 * plane by the right-hand rule.
 *
 * Pedagogical aim: torque is a cross product — perpendicular to both r and F,
 * magnitude r·F·sinθ. Hand-rolled SVG, no 3D library.
 */

const W = 360;
const H = 300;
const OX = 150;
const OY = 200;
const S = 34;

const Rv = { x: 2.6, y: 0.6, z: 0 };
const Fv = { x: 0, y: 1.9, z: 0 }; // force at the point of application
const TAU_LEN = 3.4; // display length of τ (direction only)

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
const DEFAULT_EL = (18 * Math.PI) / 180;

export default function TorqueMoment3D() {
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
  const P = p(Rv.x, Rv.y, Rv.z); // point of application
  const Fend = p(Rv.x + Fv.x, Rv.y + Fv.y, Rv.z + Fv.z);
  const Tau = p(0, 0, TAU_LEN); // r × F points +z here

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · torque τ = r × F (drag to rotate)
        </p>
        <button type="button" onClick={() => { setAz(DEFAULT_AZ); setEl(DEFAULT_EL); }} className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent">
          Reset
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing" role="img" aria-label="Torque as the cross product of r and F; drag to rotate" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <defs>
          <marker id="tq-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="tq-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="tq-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* r */}
        <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2.5} markerEnd="url(#tq-sky)" />
        {/* F at P */}
        <line x1={P[0]} y1={P[1]} x2={Fend[0]} y2={Fend[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2.5} markerEnd="url(#tq-amber)" />
        {/* τ */}
        <line x1={O[0]} y1={O[1]} x2={Tau[0]} y2={Tau[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#tq-indigo)" />

        <text x={(O[0] + P[0]) / 2} y={(O[1] + P[1]) / 2 + 14} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">r</text>
        <text x={Fend[0] + 6} y={Fend[1] + 4} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">F</text>
        <text x={Tau[0] + 6} y={Tau[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">τ = r × F</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Torque about the pivot is τ = r × F, where r reaches the point where the force F acts. It points
        perpendicular to the plane of r and F (right-hand rule, here out of that plane), with magnitude
        |τ| = r·F·sinθ — largest when the force is perpendicular to the arm, zero when it&apos;s along it.
      </p>
    </div>
  );
}
