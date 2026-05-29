"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate version of the right-hand-rule figure. Same scene as the
 * static RightHandRuleCrossProduct, but the orthographic camera (azimuth +
 * elevation) is driven by pointer/touch drag — a turntable view recomputed
 * live in SVG. No 3-D library: the projection is hand-rolled.
 *
 * Pedagogical aim: let the student orbit the scene and confirm a × b stays
 * perpendicular to the plane of a and b from every angle.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 235;
const S = 38;

const A_VEC = { x: 3, y: 0.5 };
const B_VEC = { x: 0.5, y: 3 };
const Z_CROSS = 4; // display length of a×b (direction only, not to scale)

const A_ANG = Math.atan2(A_VEC.y, A_VEC.x);
const B_ANG = Math.atan2(B_VEC.y, B_VEC.x);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Orthographic camera: azimuth az (about world z), elevation el (above plane).
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

const DEFAULT_AZ = (32 * Math.PI) / 180;
const DEFAULT_EL = (22 * Math.PI) / 180;

export default function RightHandRuleCrossProduct3D() {
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
  const O = p(0, 0, 0);
  const A = p(A_VEC.x, A_VEC.y, 0);
  const B = p(B_VEC.x, B_VEC.y, 0);
  const AB = p(A_VEC.x + B_VEC.x, A_VEC.y + B_VEC.y, 0);
  const C = p(0, 0, Z_CROSS);
  const XEND = p(4.2, 0, 0);
  const YEND = p(0, 4.2, 0);

  const curl = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const ang = A_ANG + (B_ANG - A_ANG) * t;
    return p(1.2 * Math.cos(ang), 1.2 * Math.sin(ang), 0);
  });
  const curlPath = curl.map((q, i) => `${i === 0 ? "M" : "L"}${q[0]},${q[1]}`).join(" ");

  const ra = [p(0.5, 0, 0), p(0.5, 0, 0.5), p(0, 0, 0.5)];
  const raPath = ra.map((q, i) => `${i === 0 ? "M" : "L"}${q[0]},${q[1]}`).join(" ");

  const TH = p(
    1.75 * Math.cos((A_ANG + B_ANG) / 2),
    1.75 * Math.sin((A_ANG + B_ANG) / 2),
    0,
  );

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · drag to rotate a × b
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
        aria-label="Rotatable right-hand-rule scene: drag to orbit the vectors a, b and their cross product"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="rh3-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-sky-600 dark:fill-sky-400" />
          </marker>
          <marker id="rh3-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
          <marker id="rh3-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="rh3-curl" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
          </marker>
        </defs>

        {/* faint in-plane axis guides */}
        <line x1={O[0]} y1={O[1]} x2={XEND[0]} y2={XEND[1]} stroke="currentColor" className="text-muted-foreground/30" strokeDasharray="3 3" />
        <line x1={O[0]} y1={O[1]} x2={YEND[0]} y2={YEND[1]} stroke="currentColor" className="text-muted-foreground/30" strokeDasharray="3 3" />
        <text x={XEND[0] + 4} y={XEND[1] + 10} className="fill-muted-foreground text-[9px]">x</text>
        <text x={YEND[0] - 10} y={YEND[1] + 10} className="fill-muted-foreground text-[9px]">y</text>

        {/* parallelogram spanned by a and b — the plane */}
        <polygon
          points={`${O[0]},${O[1]} ${A[0]},${A[1]} ${AB[0]},${AB[1]} ${B[0]},${B[1]}`}
          className="fill-indigo-500/10 stroke-indigo-400/40"
          strokeWidth={1}
        />

        {/* right-angle marker between the plane and a×b */}
        <path d={raPath} fill="none" stroke="currentColor" className="text-rose-500/70" strokeWidth={1} />

        {/* curl arc a -> b */}
        <path d={curlPath} fill="none" stroke="currentColor" className="text-foreground/70" strokeWidth={1.5} markerEnd="url(#rh3-curl)" />

        {/* a and b in the plane */}
        <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke="currentColor" className="text-sky-600 dark:text-sky-400" strokeWidth={2} markerEnd="url(#rh3-sky)" />
        <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2} markerEnd="url(#rh3-amber)" />

        {/* a × b — perpendicular to the plane */}
        <line x1={O[0]} y1={O[1]} x2={C[0]} y2={C[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#rh3-indigo)" />

        {/* labels */}
        <text x={A[0] + 6} y={A[1] + 4} className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">a</text>
        <text x={B[0] - 14} y={B[1] + 4} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">b</text>
        <text x={C[0] + 8} y={C[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">a × b</text>
        <text x={TH[0]} y={TH[1]} textAnchor="middle" className="fill-foreground text-[11px] font-medium">θ</text>

        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Drag to orbit the scene. However you turn it,{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">a × b</span> stays perpendicular to
        the plane of <span className="font-medium text-sky-700 dark:text-sky-300">a</span> and{" "}
        <span className="font-medium text-amber-700 dark:text-amber-300">b</span>, on the side your right-hand
        fingers (curling a → b) point your thumb. Length is schematic; magnitude is |a||b| sin θ.
      </p>
    </div>
  );
}
