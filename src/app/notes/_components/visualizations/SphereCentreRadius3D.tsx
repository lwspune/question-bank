"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: a sphere placed off the origin, drawn with its outline plus
 * two orientation rings (equator + a meridian) so the rotation reads, its
 * centre C, and a radius arrow to the surface. Reinforces that the general
 * equation gives centre (-u,-v,-w) and radius √(u²+v²+w²-d).
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 165;
const S = 34;

const C = { x: 0.8, y: 0.6, z: 0.9 }; // centre
const R = 1.6; // radius

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (38 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

// Ring of radius R about centre C in a given plane (two orthonormal vectors)
function ringPath(
  p: (x: number, y: number, z: number) => [number, number],
  u: [number, number, number],
  v: [number, number, number],
) {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const a = (i / 40) * 2 * Math.PI;
    const x = C.x + R * (u[0] * Math.cos(a) + v[0] * Math.sin(a));
    const y = C.y + R * (u[1] * Math.cos(a) + v[1] * Math.sin(a));
    const z = C.z + R * (u[2] * Math.cos(a) + v[2] * Math.sin(a));
    return p(x, y, z);
  });
  return pts.map((q, i) => `${i === 0 ? "M" : "L"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ") + " Z";
}

export default function SphereCentreRadius3D() {
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
  const O = p(0, 0, 0);
  const Cc = p(C.x, C.y, C.z);
  const Surf = p(C.x + R, C.y, C.z); // a point on the surface along +x

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · sphere centre & radius (drag to rotate)
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
        aria-label="A sphere with its centre and radius placed in 3-D space; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="scr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* sphere silhouette (centre projects to Cc; outline ≈ circle of radius R·S) */}
        <circle cx={Cc[0]} cy={Cc[1]} r={R * S} className="fill-indigo-400/12 stroke-indigo-500/50" strokeWidth={1.25} />
        {/* orientation rings */}
        <path d={ringPath(p, [1, 0, 0], [0, 1, 0])} className="fill-none stroke-indigo-500/55" strokeWidth={1} />
        <path d={ringPath(p, [0, 1, 0], [0, 0, 1])} className="fill-none stroke-indigo-400/45" strokeWidth={1} />

        {/* line from origin to centre */}
        <line x1={O[0]} y1={O[1]} x2={Cc[0]} y2={Cc[1]} className="stroke-muted-foreground/50" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
        <text x={O[0] - 12} y={O[1] + 12} className="fill-muted-foreground text-[10px]">O</text>

        {/* radius */}
        <line x1={Cc[0]} y1={Cc[1]} x2={Surf[0]} y2={Surf[1]} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.5} markerEnd="url(#scr-r)" />
        <text x={(Cc[0] + Surf[0]) / 2} y={(Cc[1] + Surf[1]) / 2 - 6} className="fill-rose-700 dark:fill-rose-300 text-[11px] font-semibold">r</text>

        {/* centre */}
        <circle cx={Cc[0]} cy={Cc[1]} r={4} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={Cc[0] + 7} y={Cc[1] - 5} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-bold">C</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        From x² + y² + z² + 2ux + 2vy + 2wz + d = 0: centre <span className="font-semibold text-foreground">C = (−u, −v, −w)</span>,
        radius <span className="font-semibold text-foreground">r = √(u² + v² + w² − d)</span>.
      </p>
    </div>
  );
}
