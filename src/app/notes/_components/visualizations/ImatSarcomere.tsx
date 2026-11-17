"use client";

import { useState } from "react";

/**
 * Interactive: one sarcomere, Z line to Z line, with the sliding filament
 * model of the IMAT concept "Muscle types, skeletal muscle structure and the
 * sarcomere bands". A "contraction" slider slides the thin (actin) filaments
 * over the thick (myosin) ones; the bands are read off live.
 *
 * The concept's band rules, which tests/notes-imat-visuals-physio.test.ts pins:
 * - A band = the length of the thick filaments: the same at every contraction.
 * - I band (thin only) and H zone (thick only) get shorter; the H zone may
 *   disappear.
 * - Z lines move closer, so the sarcomere shortens; no filament changes length.
 *
 * Lengths are typical values for human skeletal muscle: thick filaments
 * 1.6 µm, thin filaments 1.0 µm from each Z line, sarcomere 3.0 µm relaxed and
 * stretched down to 2.0 µm, where the thin filaments meet at the centre.
 */

export const THICK_UM = 1.6;
export const THIN_UM = 1.0;
export const RELAXED_UM = 3.0;
export const CONTRACTED_UM = 2 * THIN_UM; // thin filaments meet: H zone gone

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Sarcomere length (µm) at a contraction of c percent (0 to 100). */
export function sarcomereLength(c: number): number {
  return r2(RELAXED_UM - ((RELAXED_UM - CONTRACTED_UM) * c) / 100);
}

/** The concept's bands for a sarcomere of length s (µm). */
export function bands(s: number) {
  return {
    sarcomere: r2(s),
    aBand: THICK_UM,
    iBand: r2(s - THICK_UM),
    hZone: r2(Math.max(0, s - 2 * THIN_UM)),
  };
}

// Drawing scale (viewBox 320 wide): 90 units per µm, centred on x = 160.
export const K = 90;
export const CX = 160;

/** x positions (viewBox units) of the Z lines and filament ends. */
export function geometry(s: number) {
  const zLeft = r2(CX - (s / 2) * K);
  const zRight = r2(CX + (s / 2) * K);
  return {
    zLeft,
    zRight,
    thickStart: r2(CX - (THICK_UM / 2) * K),
    thickEnd: r2(CX + (THICK_UM / 2) * K),
    /** Where the left thin filaments end, and where the right ones start. */
    thinLeftEnd: r2(zLeft + THIN_UM * K),
    thinRightStart: r2(zRight - THIN_UM * K),
  };
}

const THICK_ROWS = [64, 88, 112];
const THIN_ROWS = [52, 76, 100, 124];
const TOP = 40;
const BOTTOM = 136;

function Bracket({ x1, x2, y, label, tone }: { x1: number; x2: number; y: number; label: string; tone: string }) {
  if (x2 - x1 < 1) return null;
  return (
    <g>
      <path d={`M ${x1} ${y - 4} L ${x1} ${y} L ${x2} ${y} L ${x2} ${y - 4}`} fill="none" strokeWidth={1.2} className={tone} />
      <text x={(x1 + x2) / 2} y={y + 12} textAnchor="middle" className="fill-foreground text-[10px]">
        {label}
      </text>
    </g>
  );
}

export default function ImatSarcomere() {
  const [c, setC] = useState(40);
  const s = sarcomereLength(c);
  const b = bands(s);
  const g = geometry(s);
  const heads: number[] = [];
  for (let x = g.thickStart + 6; x < g.thickEnd - 4; x += 8) if (Math.abs(x - CX) > 10) heads.push(r2(x));

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · the sliding filaments of a sarcomere
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label={`One sarcomere ${b.sarcomere} micrometres long: A band ${b.aBand}, I band ${b.iBand}, H zone ${b.hZone} micrometres`}
      >
        {/* H zone, above. */}
        {b.hZone > 0 && (
          <g>
            <path
              d={`M ${g.thinLeftEnd} ${TOP - 4} L ${g.thinLeftEnd} ${TOP - 8} L ${g.thinRightStart} ${TOP - 8} L ${g.thinRightStart} ${TOP - 4}`}
              fill="none"
              strokeWidth={1.2}
              className="stroke-amber-600 dark:stroke-amber-400"
            />
            <text x={CX} y={TOP - 12} textAnchor="middle" className="fill-foreground text-[10px]">
              H zone
            </text>
          </g>
        )}
        {b.hZone === 0 && (
          <text x={CX} y={TOP - 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            H zone gone
          </text>
        )}

        {/* Thin (actin) filaments, anchored on the Z lines. */}
        {THIN_ROWS.map((y) => (
          <g key={y}>
            <line x1={g.zLeft} y1={y} x2={g.thinLeftEnd} y2={y} strokeWidth={3} strokeLinecap="round" className="stroke-sky-500 dark:stroke-sky-400" />
            <line x1={g.thinRightStart} y1={y} x2={g.zRight} y2={y} strokeWidth={3} strokeLinecap="round" className="stroke-sky-500 dark:stroke-sky-400" />
          </g>
        ))}

        {/* Thick (myosin) filaments with their heads, held at the M line. */}
        {THICK_ROWS.map((y) => (
          <g key={y}>
            <rect x={g.thickStart} y={y - 4} width={g.thickEnd - g.thickStart} height={8} rx={4} className="fill-rose-500 dark:fill-rose-400" />
            {heads.map((x) => (
              <g key={x}>
                <line x1={x} y1={y - 4} x2={x + (x < CX ? -3 : 3)} y2={y - 8} strokeWidth={1.5} className="stroke-rose-700 dark:stroke-rose-300" />
                <line x1={x} y1={y + 4} x2={x + (x < CX ? -3 : 3)} y2={y + 8} strokeWidth={1.5} className="stroke-rose-700 dark:stroke-rose-300" />
              </g>
            ))}
          </g>
        ))}

        {/* M line and Z lines. */}
        <line x1={CX} y1={TOP + 6} x2={CX} y2={BOTTOM - 6} strokeWidth={1.5} strokeDasharray="3 3" className="stroke-foreground" />
        {[g.zLeft, g.zRight].map((x) => (
          <g key={x}>
            <line x1={x} y1={TOP} x2={x} y2={BOTTOM} strokeWidth={3} className="stroke-indigo-700 dark:stroke-indigo-300" />
            <text x={x} y={TOP - 12} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
              Z
            </text>
          </g>
        ))}
        <text x={CX + 4} y={BOTTOM + 2} className="fill-muted-foreground text-[10px]">
          M
        </text>

        {/* Bands, below. */}
        <Bracket x1={g.zLeft} x2={g.thickStart} y={BOTTOM + 14} label="½ I" tone="stroke-sky-600 dark:stroke-sky-400" />
        <Bracket x1={g.thickStart} x2={g.thickEnd} y={BOTTOM + 14} label="A band" tone="stroke-rose-600 dark:stroke-rose-400" />
        <Bracket x1={g.thickEnd} x2={g.zRight} y={BOTTOM + 14} label="½ I" tone="stroke-sky-600 dark:stroke-sky-400" />
        <Bracket x1={g.zLeft} x2={g.zRight} y={BOTTOM + 44} label={`sarcomere ${s.toFixed(2)} µm`} tone="stroke-indigo-600 dark:stroke-indigo-400" />
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          Contraction: <span className="tabular-nums">{c}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={c}
          onChange={(e) => setC(Number(e.target.value))}
          className="accent-indigo-600"
          aria-label="Contraction"
        />
      </label>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs text-muted-foreground">Sarcomere</dt>
          <dd className="font-medium tabular-nums text-foreground">{b.sarcomere.toFixed(2)} µm</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">A band</dt>
          <dd className="font-medium tabular-nums text-foreground">{b.aBand.toFixed(2)} µm</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">I band</dt>
          <dd className="font-medium tabular-nums text-foreground">{b.iBand.toFixed(2)} µm</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">H zone</dt>
          <dd className="font-medium tabular-nums text-foreground">{b.hZone.toFixed(2)} µm</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">
        Blue: thin filaments (actin). Red: thick filaments (myosin). Slide it: the A band never changes, because it is the
        length of a myosin filament. The I band and H zone shrink and the Z lines move closer. Each I band is split by a Z
        line, half in this sarcomere and half in the next. Lengths are typical values.
      </p>
    </div>
  );
}
