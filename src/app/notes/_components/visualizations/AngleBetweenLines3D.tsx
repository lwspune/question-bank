"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: two lines through the origin with direction ratios d1, d2,
 * and the angle θ between them. cos θ = (d1·d2)/(|d1||d2|). Rotating shows the
 * angle is a real spatial angle, independent of the viewing direction.
 */

const W = 360;
const H = 300;
const OX = 180;
const OY = 160;
const S = 40;

const D1 = { x: 2, y: 2, z: 1 };
const D2 = { x: 2, y: -1, z: 2 };
const dot = D1.x * D2.x + D1.y * D2.y + D1.z * D2.z;
const mag1 = Math.hypot(D1.x, D1.y, D1.z);
const mag2 = Math.hypot(D2.x, D2.y, D2.z);
const THETA = Math.acos(Math.abs(dot) / (mag1 * mag2));
const THETA_DEG = Math.round((THETA * 180) / Math.PI);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (40 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

// arc between the two unit directions
function arcPath(p: (x: number, y: number, z: number) => [number, number]) {
  const u1 = { x: D1.x / mag1, y: D1.y / mag1, z: D1.z / mag1 };
  const u2 = { x: D2.x / mag2, y: D2.y / mag2, z: D2.z / mag2 };
  const pts = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    const x = u1.x * (1 - t) + u2.x * t;
    const y = u1.y * (1 - t) + u2.y * t;
    const z = u1.z * (1 - t) + u2.z * t;
    const n = Math.hypot(x, y, z) || 1;
    return p((x / n) * 1.1, (y / n) * 1.1, (z / n) * 1.1);
  });
  return pts.map((q, i) => `${i === 0 ? "M" : "L"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
}

export default function AngleBetweenLines3D() {
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
  const L1 = p(D1.x, D1.y, D1.z);
  const L2 = p(D2.x, D2.y, D2.z);
  const Xe = p(2.8, 0, 0);
  const Ye = p(0, 2.8, 0);
  const Ze = p(0, 0, 2.8);

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · angle between two lines (drag to rotate)
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
        aria-label="Two lines through the origin and the angle between them; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="abl-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={O[0]} y1={O[1]} x2={Xe[0]} y2={Xe[1]} stroke="currentColor" className="text-muted-foreground/50" strokeWidth={1} markerEnd="url(#abl-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ye[0]} y2={Ye[1]} stroke="currentColor" className="text-muted-foreground/50" strokeWidth={1} markerEnd="url(#abl-axis)" />
        <line x1={O[0]} y1={O[1]} x2={Ze[0]} y2={Ze[1]} stroke="currentColor" className="text-muted-foreground/50" strokeWidth={1} markerEnd="url(#abl-axis)" />
        <text x={Xe[0] + 5} y={Xe[1] + 4} className="fill-muted-foreground text-[10px]">x</text>
        <text x={Ye[0] + 5} y={Ye[1] + 4} className="fill-muted-foreground text-[10px]">y</text>
        <text x={Ze[0] + 3} y={Ze[1] - 4} className="fill-muted-foreground text-[10px]">z</text>

        {/* angle arc */}
        <path d={arcPath(p)} fill="none" stroke="currentColor" className="text-amber-500/80" strokeWidth={1.5} />

        {/* the two lines */}
        <line x1={O[0]} y1={O[1]} x2={L1[0]} y2={L1[1]} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={2.5} />
        <line x1={O[0]} y1={O[1]} x2={L2[0]} y2={L2[1]} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2.5} />
        <text x={L1[0] + 5} y={L1[1] + 2} className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold">d₁</text>
        <text x={L2[0] + 5} y={L2[1] + 4} className="fill-rose-700 dark:fill-rose-300 text-[11px] font-semibold">d₂</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        d₁ = ⟨2, 2, 1⟩, d₂ = ⟨2, −1, 2⟩ · cos θ = |d₁·d₂| / (|d₁||d₂|) = {Math.abs(dot)}/{mag1 * mag2} ·
        θ ≈ <span className="font-semibold text-foreground">{THETA_DEG}°</span>.
      </p>
    </div>
  );
}
