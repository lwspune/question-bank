/**
 * Static figure: the three measuring parts of a vernier calliper
 * (concept sscfunun-dimensions).
 *
 * Internal jaws (on top): the inside diameter of a hollow cylinder or pipe.
 * External jaws (below): the length of a rod or the diameter of a sphere.
 * Depth bar (sliding out of the end): the depth of a beaker. No reading or
 * least count is drawn: the concept gives none. Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export type CalliperPart = { part: string; measures: string };

export const CALLIPER_PARTS: readonly CalliperPart[] = [
  { part: "Internal jaws", measures: "inside diameter of a pipe" },
  { part: "External jaws", measures: "length of a rod, diameter of a sphere" },
  { part: "Depth bar", measures: "depth of a beaker" },
];

const BAR = { x: 30, y: 86, w: 250, h: 18 };
const SLIDER = { x: 100, w: 52 };
/** The sphere touches the fixed jaw's face (x = 48) and the sliding jaw's face (x = 100). */
export const JAW_FACES = { fixed: 48, sliding: 100 } as const;
export const SPHERE = { x: (JAW_FACES.fixed + JAW_FACES.sliding) / 2, y: 132, r: (JAW_FACES.sliding - JAW_FACES.fixed) / 2 };

export default function SscVernierParts() {
  const fixed = "fill-slate-300 stroke-slate-500 dark:fill-slate-600 dark:stroke-slate-400";
  const moving = "fill-indigo-200 stroke-indigo-500 dark:fill-indigo-800 dark:stroke-indigo-400";
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the parts of a vernier calliper
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="A vernier calliper. The small internal jaws on top measure the inside diameter of a pipe. The large external jaws below measure the length of a rod or the diameter of a sphere. The thin depth bar that slides out of the end measures the depth of a beaker."
      >
        {/* main bar with scale marks */}
        <rect x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} className={fixed} strokeWidth={1} />
        {Array.from({ length: 23 }, (_, i) => i).map((i) => (
          <line
            key={i}
            x1={BAR.x + 22 + i * 10}
            y1={BAR.y}
            x2={BAR.x + 22 + i * 10}
            y2={BAR.y + (i % 5 === 0 ? 8 : 5)}
            className="stroke-slate-700 dark:stroke-slate-200"
            strokeWidth={0.8}
          />
        ))}
        {/* fixed jaws: external down, internal up */}
        <path d="M 30 104 L 30 160 L 40 160 L 48 150 L 48 104 Z" className={fixed} strokeWidth={1} />
        <path d="M 32 86 L 36 52 L 44 52 L 46 86 Z" className={fixed} strokeWidth={1} />

        {/* sliding part, its jaws and the depth bar */}
        <rect x={SLIDER.x} y={BAR.y - 6} width={SLIDER.w} height={BAR.h + 12} rx={2} className={moving} strokeWidth={1} />
        <path d="M 100 110 L 100 150 L 108 160 L 118 160 L 118 110 Z" className={moving} strokeWidth={1} />
        <path d="M 102 80 L 104 52 L 112 52 L 116 80 Z" className={moving} strokeWidth={1} />
        <rect x={BAR.x + BAR.w} y={BAR.y + 7} width={30} height={4} className={moving} strokeWidth={1} />

        {/* a sphere held between the external jaws */}
        <circle cx={SPHERE.x} cy={SPHERE.y} r={SPHERE.r} className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-400" strokeWidth={1} />
        <text x={SPHERE.x} y={SPHERE.y + 4} textAnchor="middle" className="fill-amber-800 text-[10px] dark:fill-amber-200">
          sphere
        </text>

        {/* labels */}
        <text x={BAR.x + 20} y={22} className="fill-foreground text-[11px] font-bold">
          {CALLIPER_PARTS[0].part}
        </text>
        <text x={BAR.x + 20} y={35} className="fill-muted-foreground text-[10px]">
          {CALLIPER_PARTS[0].measures}
        </text>
        <line x1={60} y1={40} x2={42} y2={52} className="stroke-muted-foreground" strokeWidth={0.8} />
        <line x1={92} y1={40} x2={107} y2={52} className="stroke-muted-foreground" strokeWidth={0.8} />

        <text x={BAR.x + 20} y={190} className="fill-foreground text-[11px] font-bold">
          {CALLIPER_PARTS[1].part}
        </text>
        <text x={BAR.x + 20} y={203} className="fill-muted-foreground text-[10px]">
          {CALLIPER_PARTS[1].measures}
        </text>
        <line x1={50} y1={180} x2={36} y2={161} className="stroke-muted-foreground" strokeWidth={0.8} />
        <line x1={96} y1={180} x2={112} y2={161} className="stroke-muted-foreground" strokeWidth={0.8} />

        <text x={312} y={140} textAnchor="end" className="fill-foreground text-[11px] font-bold">
          {CALLIPER_PARTS[2].part}
        </text>
        <text x={312} y={153} textAnchor="end" className="fill-muted-foreground text-[10px]">
          {CALLIPER_PARTS[2].measures}
        </text>
        <line x1={298} y1={129} x2={302} y2={BAR.y + 12} className="stroke-muted-foreground" strokeWidth={0.8} />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The internal jaws grip from inside, the external jaws from outside, and the depth bar reaches down into a beaker.
      </p>
    </div>
  );
}
