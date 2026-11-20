/**
 * Static figure: the three kinds of rainfall by why the air rises (concept
 * sscgclcl-rain).
 *
 * Exactly the concept's table: convectional (heated by the ground), orographic
 * (pushed up a mountain: the windward side gets the rain, the leeward side
 * lies in the rain shadow) and frontal or cyclonic (warm air lifted over
 * colder air at a front). In each, moist air rises, cools and rains, the
 * concept's intuition. Values pinned by tests/notes-ssc-visuals-gk.test.ts.
 * Server component, no client state.
 */

export type RainType = { name: string; whyAirRises: string };

export const RAIN_TYPES: readonly RainType[] = [
  { name: "Convectional", whyAirRises: "Heated by the ground" },
  { name: "Orographic", whyAirRises: "Pushed up a mountain" },
  { name: "Frontal (cyclonic)", whyAirRises: "Lifted over colder air" },
];

/** Which side of the mountain gets the rain (the concept's self-check). */
export const OROGRAPHIC_SIDES = { windward: "rain", leeward: "rain shadow" } as const;

const PANEL_H = 100;
const RAIN = "stroke-sky-600 dark:stroke-sky-400";
const AIR = "stroke-rose-600 dark:stroke-rose-400";
const AIR_FILL = "fill-rose-600 dark:fill-rose-400";
const GROUND = "stroke-amber-800 dark:stroke-amber-500";

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <g className="fill-slate-300 dark:fill-slate-600">
      <circle cx={x - 12} cy={y + 2} r={9} />
      <circle cx={x} cy={y - 3} r={11} />
      <circle cx={x + 12} cy={y + 2} r={9} />
      <rect x={x - 20} y={y} width={40} height={10} rx={5} />
    </g>
  );
}

function Drops({ xs, y1, len }: { xs: readonly number[]; y1: number; len: number }) {
  return (
    <g>
      {xs.map((x) => (
        <line key={x} x1={x} y1={y1} x2={x - 3} y2={y1 + len} className={RAIN} strokeWidth={1.4} strokeLinecap="round" />
      ))}
    </g>
  );
}

function Head({ x, y, angle }: { x: number; y: number; angle: number }) {
  return <polygon points={`${x},${y} ${x - 7},${y - 3.5} ${x - 7},${y + 3.5}`} transform={`rotate(${angle} ${x} ${y})`} className={AIR_FILL} />;
}

function PanelTitle({ top, i }: { top: number; i: number }) {
  const t = RAIN_TYPES[i];
  return (
    <g>
      <text x={8} y={top + 12} className="fill-foreground text-[11px] font-bold">
        {i + 1}. {t.name}
      </text>
      <text x={312} y={top + 12} textAnchor="end" className="fill-muted-foreground text-[10px]">
        air rises: {t.whyAirRises.toLowerCase()}
      </text>
    </g>
  );
}

function Convectional({ top }: { top: number }) {
  const g = top + 90;
  return (
    <g>
      <PanelTitle top={top} i={0} />
      <line x1={8} y1={g} x2={312} y2={g} className={GROUND} strokeWidth={2} />
      <circle cx={34} cy={top + 38} r={8} className="fill-amber-400 dark:fill-amber-300" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={(34 + 11 * Math.cos(r)).toFixed(2)}
            y1={(top + 38 + 11 * Math.sin(r)).toFixed(2)}
            x2={(34 + 15 * Math.cos(r)).toFixed(2)}
            y2={(top + 38 + 15 * Math.sin(r)).toFixed(2)}
            className="stroke-amber-500 dark:stroke-amber-300"
            strokeWidth={1.2}
          />
        );
      })}
      <text x={34} y={g - 4} textAnchor="middle" className="fill-amber-900 text-[10px] dark:fill-amber-300">
        hot ground
      </text>
      {[104, 126].map((x) => (
        <g key={x}>
          <path d={`M ${x} ${g - 3} q 5 -8 0 -16 q -5 -8 0 -16`} fill="none" className={AIR} strokeWidth={1.6} />
          <Head x={x} y={g - 38} angle={-90} />
        </g>
      ))}
      <Cloud x={150} y={top + 38} />
      <Drops xs={[150, 160, 170]} y1={top + 54} len={30} />
      <text x={96} y={top + 60} textAnchor="end" className="fill-rose-800 text-[10px] dark:fill-rose-300">
        air rises
      </text>
      <text x={96} y={top + 71} textAnchor="end" className="fill-rose-800 text-[10px] dark:fill-rose-300">
        and cools
      </text>
      <text x={178} y={top + 76} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        rain
      </text>
    </g>
  );
}

function Orographic({ top }: { top: number }) {
  const g = top + 90;
  const peak = { x: 176, y: top + 30 };
  const left = 96;
  const right = 236;
  return (
    <g>
      <PanelTitle top={top} i={1} />
      <line x1={8} y1={g} x2={312} y2={g} className={GROUND} strokeWidth={2} />
      <polygon
        points={`${left},${g} ${peak.x},${peak.y} ${right},${g}`}
        className="fill-stone-300 stroke-stone-600 dark:fill-stone-700 dark:stroke-stone-400"
        strokeWidth={1.2}
      />
      <path d={`M 10 ${top + 82} L 96 ${top + 82} L 146 ${top + 50}`} fill="none" className={AIR} strokeWidth={1.6} />
      <Head x={146} y={top + 50} angle={-32.6} />
      <text x={10} y={top + 76} className="fill-rose-800 text-[10px] dark:fill-rose-300">
        moist wind
      </text>
      <Cloud x={128} y={top + 32} />
      <Drops xs={[114, 122, 130]} y1={top + 46} len={8} />
      <text x={10} y={top + 40} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        windward side:
      </text>
      <text x={10} y={top + 51} className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        gets the {OROGRAPHIC_SIDES.windward}
      </text>
      <text x={312} y={top + 60} textAnchor="end" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        leeward side:
      </text>
      <text x={312} y={top + 72} textAnchor="end" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-300">
        {OROGRAPHIC_SIDES.leeward}, dry
      </text>
    </g>
  );
}

function Frontal({ top }: { top: number }) {
  const g = top + 90;
  const frontEnd = { x: 312, y: top + 52 };
  const frontStart = 120;
  return (
    <g>
      <PanelTitle top={top} i={2} />
      <line x1={8} y1={g} x2={312} y2={g} className={GROUND} strokeWidth={2} />
      <polygon
        points={`${frontStart},${g} ${frontEnd.x},${frontEnd.y} ${frontEnd.x},${g}`}
        className="fill-sky-100 stroke-sky-500 dark:fill-sky-950/40 dark:stroke-sky-500"
        strokeWidth={1.4}
      />
      <text x={300} y={g - 6} textAnchor="end" className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-300">
        cold air
      </text>
      <text x={310} y={top + 46} textAnchor="end" className="fill-sky-800 text-[10px] dark:fill-sky-300">
        front
      </text>
      <path d={`M 16 ${top + 80} L 112 ${top + 80} L 236 ${top + 58}`} fill="none" className={AIR} strokeWidth={1.6} />
      <Head x={236} y={top + 58} angle={-10} />
      <text x={16} y={top + 74} className="fill-rose-800 text-[10px] font-semibold dark:fill-rose-300">
        warm air
      </text>
      <Cloud x={190} y={top + 32} />
      <Drops xs={[180, 190, 200]} y1={top + 48} len={10} />
    </g>
  );
}

export default function SscRainfallTypes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three kinds of rainfall
      </p>
      <svg
        viewBox={`0 0 320 ${3 * PANEL_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Three kinds of rainfall. Convectional: the hot ground heats the air, which rises, cools and rains. Orographic: moist wind is pushed up a mountain; the windward side gets the rain and the leeward side is dry, in the rain shadow. Frontal or cyclonic: warm air is lifted over cold air at a front, and rain falls."
      >
        <Convectional top={0} />
        <line x1={8} y1={PANEL_H - 4} x2={312} y2={PANEL_H - 4} className="stroke-border" strokeWidth={1} />
        <Orographic top={PANEL_H} />
        <line x1={8} y1={2 * PANEL_H - 4} x2={312} y2={2 * PANEL_H - 4} className="stroke-border" strokeWidth={1} />
        <Frontal top={2 * PANEL_H} />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Rain needs moist air that rises and cools. The ground heats it, a mountain pushes it up, or a mass of colder air lifts it.
      </p>
    </div>
  );
}
