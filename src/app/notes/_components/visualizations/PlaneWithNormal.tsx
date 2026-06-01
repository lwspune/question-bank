"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: a tilted plane, the origin O off the plane, the foot of the
 * perpendicular N on the plane, and the normal vector standing off N. The
 * length ON is the perpendicular distance |d|/√(a²+b²+c²). Rotating shows the
 * normal is genuinely perpendicular to the surface.
 */

const W = 360;
const H = 320;
const OX = 175;
const OY = 175;
const S = 34;
const A = 2.1; // plane half-extent

// Plane: 0.3x + 0.2y - z + 1 = 0  →  z = 0.3x + 0.2y + 1
const NA = 0.3, NB = 0.2, NC = -1, ND = 1; // a x + b y + c z + d = 0
const planeZ = (x: number, y: number) => 0.3 * x + 0.2 * y + 1;
const NLEN = Math.hypot(NA, NB, NC);
// Foot of perpendicular from O=(0,0,0): N = O - (a·0+b·0+c·0+d)/|n|² · n
const k = ND / (NLEN * NLEN);
const FOOT = { x: -k * NA, y: -k * NB, z: -k * NC };
const unitN = { x: NA / NLEN, y: NB / NLEN, z: NC / NLEN };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (42 * Math.PI) / 180;
const DEFAULT_EL = (16 * Math.PI) / 180;

export default function PlaneWithNormal() {
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
  const O = p(0, 0, 0);
  const N = p(FOOT.x, FOOT.y, FOOT.z);
  const Ntip = p(FOOT.x + unitN.x * 1.6, FOOT.y + unitN.y * 1.6, FOOT.z + unitN.z * 1.6);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · plane, normal & distance from origin (drag to rotate)
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
        aria-label="A plane, its normal vector, and the perpendicular from the origin; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="pwn-n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* plane */}
        <polygon points={poly(planeCorners)} className="fill-indigo-400/18 stroke-indigo-500/60" strokeWidth={1.25} />

        {/* perpendicular O -> N */}
        <line x1={O[0]} y1={O[1]} x2={N[0]} y2={N[1]} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} strokeDasharray="5 4" />

        {/* normal at N */}
        <line x1={N[0]} y1={N[1]} x2={Ntip[0]} y2={Ntip[1]} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={2.5} markerEnd="url(#pwn-n)" />
        <text x={Ntip[0] + 5} y={Ntip[1]} className="fill-emerald-700 dark:fill-emerald-300 text-[11px] font-semibold">n⃗</text>

        {/* points */}
        <circle cx={O[0]} cy={O[1]} r={4} className="fill-foreground" />
        <text x={O[0] - 14} y={O[1] + 6} className="fill-muted-foreground text-[12px] font-semibold">O</text>
        <circle cx={N[0]} cy={N[1]} r={4.5} className="fill-amber-500 stroke-amber-700" strokeWidth={1.5} />
        <text x={N[0] + 7} y={N[1] + 12} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-bold">N</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Shortest path from <span className="font-semibold text-foreground">O</span> to the plane runs along the
        normal to the foot <span className="font-semibold text-foreground">N</span>; its length is
        |d| / √(a²+b²+c²).
      </p>
    </div>
  );
}
