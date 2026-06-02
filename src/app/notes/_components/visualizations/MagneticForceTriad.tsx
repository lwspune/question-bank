"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate triad for the magnetic force on a moving charge, F = qv × B.
 * Velocity v, field B and force F are mutually perpendicular; when v ⊥ B the
 * charge follows a circle in the plane perpendicular to B, with F pointing to
 * the centre (centripetal). Hand-rolled orthographic turntable, no 3-D library.
 *
 * (v along +x, B along +z; circular path in the xy-plane, centre at (0,−r).)
 */

const W = 360;
const H = 320;
const OX = 185;
const OY = 175;
const S = 30;
const R = 2; // circle radius (world units)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az);
  const ca = Math.cos(az);
  const se = Math.sin(el);
  const ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (36 * Math.PI) / 180;
const DEFAULT_EL = (24 * Math.PI) / 180;

export default function MagneticForceTriad() {
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
    setEl((v) => clamp(v + dy * 0.01, 0.1, 1.45));
  };
  const onUp = () => {
    drag.current = null;
  };

  const p = makeProject(az, el);
  const O = p(0, 0, 0); // charge position
  const Vx = p(2.4, 0, 0); // velocity (tangent, +x)
  const Bz = p(0, 0, 3); // field (+z)
  const Fy = p(0, -2, 0); // force (centripetal, toward centre at (0,-R))

  // circular path in the xy-plane, centre (0, -R, 0), passing through origin
  const circle = Array.from({ length: 49 }, (_, i) => {
    const t = (i / 48) * 2 * Math.PI;
    return p(R * Math.cos(t), -R + R * Math.sin(t), 0);
  });
  const circlePath = circle.map((q, i) => `${i === 0 ? "M" : "L"}${q[0]},${q[1]}`).join(" ");

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · drag to rotate F = qv × B
        </p>
        <button
          type="button"
          onClick={() => {
            setAz(DEFAULT_AZ);
            setEl(DEFAULT_EL);
          }}
          className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent"
        >
          Reset view
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label="Rotatable triad: velocity, magnetic field and force are mutually perpendicular; the charge circles in the plane perpendicular to the field"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="mft-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="mft-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="mft-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* circular path in the plane perpendicular to B */}
        <path d={circlePath} fill="none" stroke="currentColor" className="text-muted-foreground/40" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* B field */}
        <line x1={O[0]} y1={O[1]} x2={Bz[0]} y2={Bz[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#mft-b)" />
        {/* velocity (tangent) */}
        <line x1={O[0]} y1={O[1]} x2={Vx[0]} y2={Vx[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2.5} markerEnd="url(#mft-v)" />
        {/* force (centripetal) */}
        <line x1={O[0]} y1={O[1]} x2={Fy[0]} y2={Fy[1]} stroke="currentColor" className="text-rose-600 dark:text-rose-400" strokeWidth={2.5} markerEnd="url(#mft-f)" />

        <text x={Vx[0] + 6} y={Vx[1] + 4} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">v</text>
        <text x={Bz[0] + 6} y={Bz[1] + 2} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">B</text>
        <text x={Fy[0] + 6} y={Fy[1] + 4} className="fill-rose-700 dark:fill-rose-300 text-[12px] font-semibold">F</text>

        {/* the charge */}
        <circle cx={O[0]} cy={O[1]} r={4} className="fill-amber-500 stroke-amber-700 dark:stroke-amber-300" strokeWidth={1.5} />
        <text x={O[0] - 12} y={O[1] - 6} className="fill-amber-700 dark:fill-amber-300 text-[11px] font-semibold">+q</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        <span className="font-medium text-sky-700 dark:text-sky-300">v</span>,{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">B</span> and{" "}
        <span className="font-medium text-rose-700 dark:text-rose-300">F = qv × B</span> are mutually
        perpendicular. When v ⊥ B the charge circles in the plane perpendicular to B, with F pointing to the
        centre. If v ∥ B, F = 0 and it goes straight.
      </p>
    </div>
  );
}
