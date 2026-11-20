/**
 * Static figure: the outline of the periodic table with the families the
 * concept names (concept ssccatpe-groups).
 *
 * Group 1 alkali metals (hydrogen sits above them but is not one), Group 2
 * alkaline earth metals, Groups 3 to 12 the transition elements (d-block),
 * Group 16 chalcogens, Group 17 halogens, Group 18 noble gases, and the
 * lanthanides (rare earths, f-block) drawn as the row below. Marked cells are
 * the concept's own: Mg (period 3, group 2: 2, 8, 2 = 12), F (period 2,
 * group 17: 2, 7 = 9) and Xe, where period 5 ends. Values pinned by
 * tests/notes-w2-10.test.ts. Server component.
 */

export type Family = "alkali" | "alkaline-earth" | "transition" | "chalcogen" | "halogen" | "noble" | "other";

/** Which groups (columns) a period (row) of the table fills. */
export function groupsInPeriod(period: number): number[] {
  if (period === 1) return [1, 18];
  if (period === 2 || period === 3) return [1, 2, 13, 14, 15, 16, 17, 18];
  return Array.from({ length: 18 }, (_, i) => i + 1);
}

export function familyOf(group: number, period: number): Family {
  if (group === 1) return period === 1 ? "other" : "alkali"; // hydrogen is not an alkali metal
  if (group === 2) return "alkaline-earth";
  if (group >= 3 && group <= 12) return "transition";
  if (group === 16) return "chalcogen";
  if (group === 17) return "halogen";
  if (group === 18) return "noble";
  return "other";
}

/** Electrons shell by shell for a period and a group of the concept's kind (groups 1, 2, 13 to 18). */
export function shellsFor(period: number, group: number): number[] {
  const outer = group <= 2 ? group : group - 10;
  const inner = [2, 8, 8].slice(0, period - 1);
  return [...inner, outer];
}

export const MARKED = [
  { symbol: "Mg", period: 3, group: 2 },
  { symbol: "F", period: 2, group: 17 },
  { symbol: "Xe", period: 5, group: 18 },
] as const;

export const LEGEND: readonly { family: Family; text: string }[] = [
  { family: "alkali", text: "Group 1: alkali metals" },
  { family: "alkaline-earth", text: "Group 2: alkaline earth metals" },
  { family: "transition", text: "Groups 3 to 12: transition elements, d-block" },
  { family: "chalcogen", text: "Group 16: chalcogens" },
  { family: "halogen", text: "Group 17: halogens" },
  { family: "noble", text: "Group 18: noble gases" },
  { family: "other", text: "Lanthanides: rare earths, f-block" },
];

const FILL: Record<Family, string> = {
  alkali: "fill-rose-300 dark:fill-rose-700",
  "alkaline-earth": "fill-amber-300 dark:fill-amber-700",
  transition: "fill-sky-300 dark:fill-sky-700",
  chalcogen: "fill-violet-300 dark:fill-violet-700",
  halogen: "fill-emerald-300 dark:fill-emerald-700",
  noble: "fill-indigo-400 dark:fill-indigo-600",
  other: "fill-muted",
};
const LANTH_FILL = "fill-lime-200 dark:fill-lime-800";

const CW = 16;
const CH = 15;
const X0 = 28;
const Y0 = 34;
const LANTH_Y = Y0 + 7 * CH + 10;
const LEGEND_Y = LANTH_Y + CH + 18;

const cx = (group: number) => X0 + (group - 1) * CW;
const cy = (period: number) => Y0 + (period - 1) * CH;

export default function SscPeriodicGroups() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the families of the periodic table
      </p>
      <svg
        viewBox={`0 0 320 ${LEGEND_Y + LEGEND.length * 13 + 4}`}
        className="block h-auto w-full"
        role="img"
        aria-label="The outline of the periodic table, 18 groups and 7 periods. Group 1 below hydrogen: alkali metals. Group 2: alkaline earth metals. Groups 3 to 12: transition elements, the d-block. Group 16: chalcogens. Group 17: halogens. Group 18: noble gases. The lanthanides, the rare earths of the f-block, sit in a row below. Magnesium is marked at period 3, group 2, atomic number 12. Fluorine is at period 2, group 17. Xenon ends period 5. Atomic size grows down a group."
      >
        {/* group numbers */}
        {[1, 2, 16, 17, 18].map((g) => (
          <text key={g} x={cx(g) + CW / 2} y={Y0 - 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
            {g}
          </text>
        ))}
        <text x={(cx(3) + cx(13)) / 2} y={Y0 + 3 * CH - 3} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          3 to 12
        </text>

        {/* cells */}
        {Array.from({ length: 7 }, (_, i) => i + 1).map((p) => (
          <g key={p}>
            <text x={X0 - 5} y={cy(p) + 11} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {p}
            </text>
            {groupsInPeriod(p).map((g) => (
              <rect key={g} x={cx(g)} y={cy(p)} width={CW} height={CH} className={`${FILL[familyOf(g, p)]} stroke-background`} strokeWidth={1} />
            ))}
          </g>
        ))}

        {/* marked elements */}
        {MARKED.map((m) => (
          <g key={m.symbol}>
            <rect x={cx(m.group)} y={cy(m.period)} width={CW} height={CH} className="fill-none stroke-foreground" strokeWidth={1.6} />
            <text x={cx(m.group) + CW / 2} y={cy(m.period) + 11} textAnchor="middle" className="fill-foreground text-[10px] font-bold">
              {m.symbol}
            </text>
          </g>
        ))}

        {/* the self-check, in the empty space above the transition elements */}
        <text x={cx(3) + 2} y={Y0 + 10} className="fill-foreground text-[10px]">
          Mg: period 3, group 2
        </text>
        <text x={cx(3) + 2} y={Y0 + 23} className="fill-muted-foreground text-[10px]">
          2, 8, 2: atomic number 12
        </text>

        {/* size grows down a group */}
        <line x1={14} y1={cy(1) + 2} x2={14} y2={cy(7) + 6} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.4} />
        <polygon points={`14,${cy(7) + 12} 11,${cy(7) + 5} 17,${cy(7) + 5}`} className="fill-rose-600 dark:fill-rose-400" />
        <text transform={`translate(3, ${cy(2)}) rotate(90)`} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          size grows down a group
        </text>

        {/* lanthanides */}
        {Array.from({ length: 14 }, (_, i) => i + 4).map((g) => (
          <rect key={g} x={cx(g)} y={LANTH_Y} width={CW} height={CH} className={`${LANTH_FILL} stroke-background`} strokeWidth={1} />
        ))}
        <line x1={cx(3) + CW / 2} y1={cy(6) + CH} x2={cx(4)} y2={LANTH_Y + CH / 2} className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="2 2" />

        {/* legend */}
        {LEGEND.map((l, i) => (
          <g key={l.text}>
            <rect x={X0} y={LEGEND_Y + i * 13 - 8} width={10} height={9} className={l.family === "other" ? LANTH_FILL : FILL[l.family]} />
            <text x={X0 + 15} y={LEGEND_Y + i * 13} className="fill-foreground text-[10px]">
              {l.text}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Rows are periods and columns are groups. Every period ends in a noble gas: period 5 ends at xenon. Fluorine is in
        period 2, group 17: shells 2, 7, atomic number 9.
      </p>
    </div>
  );
}
