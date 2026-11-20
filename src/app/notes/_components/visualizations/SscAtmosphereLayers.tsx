/**
 * Static figure: the layers of the atmosphere from the ground up, each with
 * the one thing it is known for, and the make-up of dry air (concept
 * sscgclat-layers). Exactly what the concept states: troposphere (weather and
 * clouds), stratosphere (ozone layer, absorbs ultraviolet), mesosphere
 * (meteors burn up), thermosphere (heated by ultraviolet and X-rays; the ISS
 * orbits here), exosphere (the thin outer edge); the Karman line, about
 * 100 km up, taken as the edge of space; dry air 78% nitrogen, 21% oxygen,
 * about 0.93% argon and a little carbon dioxide. Layers are not to scale.
 * Server component. Pinned by tests/notes-w2-20.test.ts.
 */

/** The layers, ground first, with the one thing each is known for. */
export const LAYERS = [
  { name: "Troposphere", fact: "weather and clouds" },
  { name: "Stratosphere", fact: "ozone layer: absorbs ultraviolet" },
  { name: "Mesosphere", fact: "meteors burn up" },
  { name: "Thermosphere", fact: "ultraviolet and X-rays; the ISS" },
  { name: "Exosphere", fact: "thin outer edge" },
] as const;

/** Dry air, percent by volume, as the concept gives it. */
export const AIR = { nitrogen: 78, oxygen: 21, argon: 0.93 } as const;
export const KARMAN_KM = 100;

// Geometry (viewBox units).
export const GROUND_Y = 196;
export const BAND_H = 36;
export const LEFT = 16;
export const RIGHT = 304;
/** Top edge of band i (0 = troposphere). */
export const bandTop = (i: number) => GROUND_Y - (i + 1) * BAND_H;
/** The Karman line sits in the lower thermosphere. */
export const KARMAN_Y = bandTop(3) + BAND_H - 6;

/** Text line of band i: the thermosphere keeps its lower part for the Karman line. */
export const textY = (i: number) => bandTop(i) + (i === 3 ? 14 : 22);

/** Composition bar. */
export const BAR = { x: 16, y: 226, w: 288, h: 16 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const barWidth = (pct: number) => r2((BAR.w * pct) / 100);

const BAND_FILL = [
  "fill-sky-200/80 dark:fill-sky-900/60",
  "fill-violet-200/70 dark:fill-violet-900/50",
  "fill-indigo-200/60 dark:fill-indigo-900/50",
  "fill-amber-200/60 dark:fill-amber-900/40",
  "fill-slate-200/60 dark:fill-slate-800/50",
] as const;

export default function SscAtmosphereLayers() {
  const nW = barWidth(AIR.nitrogen);
  const oW = barWidth(AIR.oxygen);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the layers of the air, ground to space
      </p>
      <svg
        viewBox="0 0 320 266"
        className="block h-auto w-full"
        role="img"
        aria-label="The atmosphere in five layers from the ground up. Troposphere: weather and clouds. Stratosphere: the ozone layer, which absorbs ultraviolet. Mesosphere: meteors burn up. Thermosphere: heated by ultraviolet and X-rays, where the International Space Station orbits. Exosphere: the thin outer edge. The Karman line, about 100 kilometres up, is taken as the edge of space. Below, dry air: nitrogen 78 percent, oxygen 21 percent, argon about 0.93 percent and a little carbon dioxide."
      >
        {LAYERS.map((l, i) => (
          <g key={l.name}>
            <rect x={LEFT} y={bandTop(i)} width={RIGHT - LEFT} height={BAND_H} className={BAND_FILL[i]} />
            <text x={LEFT + 8} y={textY(i)} className="fill-foreground text-[11px] font-semibold">
              {l.name}
            </text>
            <text x={122} y={textY(i)} className="fill-foreground text-[10.5px]">
              {l.fact}
            </text>
          </g>
        ))}

        {/* A cloud in the troposphere */}
        <g className="fill-white stroke-slate-400 dark:fill-slate-300 dark:stroke-slate-500" strokeWidth={1}>
          <ellipse cx={282} cy={GROUND_Y - 18} rx={12} ry={6} />
          <ellipse cx={276} cy={GROUND_Y - 22} rx={7} ry={5} />
        </g>
        {/* A meteor streak in the mesosphere */}
        <line x1={262} y1={bandTop(2) + 8} x2={286} y2={bandTop(2) + 24} strokeWidth={1.5} className="stroke-amber-600 dark:stroke-amber-400" />
        <circle cx={287} cy={bandTop(2) + 25} r={2.5} className="fill-amber-600 dark:fill-amber-400" />

        {/* Karman line */}
        <line
          x1={LEFT}
          y1={KARMAN_Y}
          x2={RIGHT}
          y2={KARMAN_Y}
          strokeWidth={1.4}
          strokeDasharray="5 3"
          className="stroke-rose-600 dark:stroke-rose-400"
        />
        <text x={RIGHT - 4} y={KARMAN_Y - 3} textAnchor="end" className="fill-rose-700 text-[9.5px] font-semibold dark:fill-rose-300">
          Karman line, about 100 km: edge of space
        </text>

        {/* Ground */}
        <line x1={LEFT} y1={GROUND_Y} x2={RIGHT} y2={GROUND_Y} strokeWidth={2} className="stroke-foreground" />
        <text x={LEFT} y={GROUND_Y + 13} className="fill-muted-foreground text-[10px]">
          ground
        </text>

        {/* Dry air */}
        <text x={RIGHT} y={GROUND_Y + 13} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          Dry air near the ground
        </text>
        <rect x={BAR.x} y={BAR.y} width={nW} height={BAR.h} className="fill-sky-700 dark:fill-sky-700" />
        <rect x={BAR.x + nW} y={BAR.y} width={oW} height={BAR.h} className="fill-emerald-700 dark:fill-emerald-700" />
        <rect
          x={BAR.x + nW + oW}
          y={BAR.y}
          width={BAR.w - nW - oW}
          height={BAR.h}
          className="fill-slate-500 dark:fill-slate-400"
        />
        <rect x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} fill="none" strokeWidth={1} className="stroke-foreground" />
        <text x={BAR.x + nW / 2} y={BAR.y + 11.5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
          nitrogen 78%
        </text>
        <text x={BAR.x + nW + oW / 2} y={BAR.y + 11.5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
          oxygen 21%
        </text>
        <text x={RIGHT} y={BAR.y + BAR.h + 13} textAnchor="end" className="fill-muted-foreground text-[10px]">
          argon about 0.93%, a little carbon dioxide
        </text>
      </svg>
    </div>
  );
}
