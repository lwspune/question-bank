"use client";

import { useRef, useState } from "react";

/**
 * Fleming's left-hand rule as a drag-to-rotate 3-D triad. Three MUTUALLY
 * PERPENDICULAR directions — Field (B, forefinger), Current (I, centre finger),
 * Force/Thrust (F, thumb) — recomputed live in SVG via a hand-rolled
 * orthographic turntable (no 3-D library).
 *
 * Pedagogical aim: a flat projection can't show that F, B and I are mutually
 * perpendicular; orbiting the scene makes the right angles unambiguous from
 * every viewpoint. (Field along +x, Current along +y, Force along +z.)
 */

const W = 360;
const H = 320;
const OX = 175;
const OY = 200;
const S = 34;
const L = 3.4; // arrow length in world units

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

const DEFAULT_AZ = (34 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

export default function FlemingsLeftHandRule() {
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
  const Bx = p(L, 0, 0); // Field
  const Iy = p(0, L, 0); // Current
  const Fz = p(0, 0, L); // Force
  // wire segment lies along the current axis
  const wireA = p(0, -1.2, 0);
  const wireB = p(0, L + 0.3, 0);

  // small right-angle markers in each coordinate plane at the origin
  const raBI = [p(0.55, 0, 0), p(0.55, 0.55, 0), p(0, 0.55, 0)]; // B–I (xy)
  const raIF = [p(0, 0.55, 0), p(0, 0.55, 0.55), p(0, 0, 0.55)]; // I–F (yz)
  const raBF = [p(0.55, 0, 0), p(0.55, 0, 0.55), p(0, 0, 0.55)]; // B–F (xz)
  const path = (pts: [number, number][]) =>
    pts.map((q, i) => `${i === 0 ? "M" : "L"}${q[0]},${q[1]}`).join(" ");

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · drag to rotate Fleming&apos;s left hand
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
        aria-label="Rotatable Fleming's left-hand rule: drag to orbit the mutually perpendicular Field, Current and Force directions"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="flh-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
          <marker id="flh-i" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
          <marker id="flh-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>

        {/* conductor (current-carrying wire) along the current axis */}
        <line x1={wireA[0]} y1={wireA[1]} x2={wireB[0]} y2={wireB[1]} stroke="currentColor" className="text-emerald-500/40" strokeWidth={6} strokeLinecap="round" />

        {/* right-angle markers */}
        <path d={path(raBI)} fill="none" stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1} />
        <path d={path(raIF)} fill="none" stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1} />
        <path d={path(raBF)} fill="none" stroke="currentColor" className="text-muted-foreground/60" strokeWidth={1} />

        {/* Field (B) — forefinger */}
        <line x1={O[0]} y1={O[1]} x2={Bx[0]} y2={Bx[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={2.5} markerEnd="url(#flh-b)" />
        {/* Current (I) — centre finger */}
        <line x1={O[0]} y1={O[1]} x2={Iy[0]} y2={Iy[1]} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} markerEnd="url(#flh-i)" />
        {/* Force (F) — thumb */}
        <line x1={O[0]} y1={O[1]} x2={Fz[0]} y2={Fz[1]} stroke="currentColor" className="text-rose-600 dark:text-rose-400" strokeWidth={2.5} markerEnd="url(#flh-f)" />

        <text x={Bx[0] + 6} y={Bx[1] + 4} className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">B (field)</text>
        <text x={Iy[0] + 6} y={Iy[1] + 4} className="fill-emerald-700 dark:fill-emerald-300 text-[12px] font-semibold">I (current)</text>
        <text x={Fz[0] + 6} y={Fz[1] + 2} className="fill-rose-700 dark:fill-rose-300 text-[12px] font-semibold">F (force)</text>

        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Left hand, three fingers at right angles:{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">Fore-finger = Field</span>,{" "}
        <span className="font-medium text-emerald-700 dark:text-emerald-300">Centre-finger = Current</span>,{" "}
        <span className="font-medium text-rose-700 dark:text-rose-300">Thumb = Thrust (force)</span>. Drag to
        confirm all three stay mutually perpendicular — this is the motor rule.
      </p>
    </div>
  );
}
