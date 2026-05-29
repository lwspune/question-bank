"use client";

import { useRef, useState } from "react";

/**
 * Scalar triple product as the volume of a parallelepiped, rendered in
 * hand-rolled SVG with painter's-order face shading and drag-to-rotate.
 * Comparison piece against the three.js version (TripleProductBoxWebgl).
 *
 * Pedagogical aim: [a b c] = a · (b × c) is the SIGNED volume of the box on
 * a, b, c; coplanar vectors flatten the box to zero volume.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 160;
const S = 34;

const A = { x: 2.6, y: 0.4, z: 0.3 };
const B = { x: 0.5, y: 2.4, z: 0.4 };
const C = { x: 0.4, y: 0.5, z: 2.3 };

const CENTROID = {
  x: (A.x + B.x + C.x) / 2,
  y: (A.y + B.y + C.y) / 2,
  z: (A.z + B.z + C.z) / 2,
};

const VOLUME =
  A.x * (B.y * C.z - B.z * C.y) -
  A.y * (B.x * C.z - B.z * C.x) +
  A.z * (B.x * C.y - B.y * C.x);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const vert = (s: number, t: number, u: number) => ({
  x: s * A.x + t * B.x + u * C.x,
  y: s * A.y + t * B.y + u * C.y,
  z: s * A.z + t * B.z + u * C.z,
});

// 6 faces as ordered [s,t,u] quads.
const FACES: [number, number, number][][] = [
  [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]],
  [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
  [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]],
  [[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]],
  [[0, 0, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1]],
  [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]],
];

function makeView(az: number, el: number) {
  const sa = Math.sin(az);
  const ca = Math.cos(az);
  const se = Math.sin(el);
  const ce = Math.cos(el);
  const project = (x: number, y: number, z: number): [number, number] => {
    const dx = x - CENTROID.x;
    const dy = y - CENTROID.y;
    const dz = z - CENTROID.z;
    const sx = -dx * sa + dy * ca;
    const sy = -dx * se * ca - dy * se * sa + dz * ce;
    return [OX + sx * S, OY - sy * S];
  };
  // Depth toward camera (larger = nearer).
  const depth = (x: number, y: number, z: number) =>
    (x - CENTROID.x) * ce * ca + (y - CENTROID.y) * ce * sa + (z - CENTROID.z) * se;
  return { project, depth };
}

const DEFAULT_AZ = (35 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

export default function TripleProductBoxSvg() {
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

  const { project, depth } = makeView(az, el);

  const faces = FACES.map((f) => {
    const pts = f.map(([s, t, u]) => {
      const v = vert(s, t, u);
      return project(v.x, v.y, v.z);
    });
    const d =
      f.reduce((acc, [s, t, u]) => {
        const v = vert(s, t, u);
        return acc + depth(v.x, v.y, v.z);
      }, 0) / f.length;
    return { pts, d };
  });
  faces.sort((p, q) => p.d - q.d); // far first

  const O = project(0, 0, 0);
  const Pa = project(A.x, A.y, A.z);
  const Pb = project(B.x, B.y, B.z);
  const Pc = project(C.x, C.y, C.z);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · triple product = box volume (SVG, drag to rotate)
        </p>
        <button
          type="button"
          onClick={() => {
            setAz(DEFAULT_AZ);
            setEl(DEFAULT_EL);
          }}
          className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent"
        >
          Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label="Parallelepiped on vectors a, b, c — drag to rotate; its volume is the scalar triple product"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="tp-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="tp-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="tp-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* faces, far-to-near */}
        {faces.map((f, i) => (
          <polygon
            key={i}
            points={f.pts.map((p) => `${p[0]},${p[1]}`).join(" ")}
            className="fill-indigo-500/15 stroke-indigo-500/50 dark:fill-indigo-400/15"
            strokeWidth={1}
          />
        ))}

        {/* defining vectors a, b, c from the origin corner */}
        <line x1={O[0]} y1={O[1]} x2={Pa[0]} y2={Pa[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2.5} markerEnd="url(#tp-sky)" />
        <line x1={O[0]} y1={O[1]} x2={Pb[0]} y2={Pb[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2.5} markerEnd="url(#tp-amber)" />
        <line x1={O[0]} y1={O[1]} x2={Pc[0]} y2={Pc[1]} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} markerEnd="url(#tp-emerald)" />

        <text x={Pa[0] + 5} y={Pa[1] + 4} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">a</text>
        <text x={Pb[0] + 5} y={Pb[1] + 4} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">b</text>
        <text x={Pc[0] + 5} y={Pc[1] + 4} className="fill-emerald-700 dark:fill-emerald-300 text-[12px] font-semibold">c</text>
      </svg>

      <div className="mt-3 text-sm">
        <span className="font-medium text-foreground">[a b c] = a · (b × c) = </span>
        <span className="tabular-nums">{VOLUME.toFixed(2)}</span>
        <span className="text-muted-foreground"> (signed volume of the box)</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        The box spanned by a, b, c has volume |[a b c]|. Painter&apos;s-ordered faces fake the solidity —
        edges don&apos;t truly hide behind nearer faces, which is the SVG limit this comparison is testing.
      </p>
    </div>
  );
}
