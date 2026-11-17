/**
 * Static figure: how the European Union was built, as the IMAT concept "How
 * the European Union was built, treaty by treaty" lists it. A vertical
 * timeline (phone-friendly), one row per entry of the concept's table, in the
 * same order and with the same years, names and effects.
 *
 * The four treaties named after their city (Paris, Rome, Maastricht, Lisbon)
 * are drawn with a filled dot and the word "treaty" in the legend, so the
 * concept's trap (Paris made the ECSC, Rome the EEC) is easy to see. The list
 * is pinned by tests/notes-imat-visuals-reading.test.ts.
 *
 * Server component, no client state.
 */

export type Milestone = {
  /** The year used for ordering. */
  year: number;
  /** The year as printed in the left column. */
  yearLabel: string;
  /** A second line under the year (in force, second date), if the concept gives one. */
  yearNote?: string;
  name: string;
  /** One or two short lines on what it did. */
  note: readonly string[];
  /** A treaty named after the city where it was signed. */
  treaty: boolean;
};

export const MILESTONES: readonly Milestone[] = [
  { year: 1951, yearLabel: "1951", name: "Treaty of Paris", note: ["Created the European Coal and", "Steel Community (ECSC)"], treaty: true },
  { year: 1957, yearLabel: "1957", name: "Treaties of Rome", note: ["Created the European Economic", "Community (EEC) and Euratom"], treaty: true },
  { year: 1973, yearLabel: "1973", name: "First enlargement", note: ["United Kingdom, Ireland and", "Denmark join"], treaty: false },
  { year: 1979, yearLabel: "1979", name: "First direct elections", note: ["Citizens vote for the members", "of the European Parliament"], treaty: false },
  { year: 1985, yearLabel: "1985", yearNote: "in force 1995", name: "Schengen Agreement", note: ["Removal of internal border checks"], treaty: false },
  { year: 1992, yearLabel: "1992", yearNote: "in force 1993", name: "Treaty of Maastricht", note: ["Created the European Union", "and planned the euro"], treaty: true },
  { year: 1999, yearLabel: "1999", yearNote: "and 2002", name: "Euro launched", note: ["Electronic money in 1999; notes", "and coins on 1 January 2002"], treaty: false },
  { year: 2004, yearLabel: "2004", name: "Largest enlargement", note: ["Ten countries join, mostly from", "Central and Eastern Europe"], treaty: false },
  { year: 2007, yearLabel: "2007", yearNote: "in force 2009", name: "Treaty of Lisbon", note: ["Current rules of the EU; a permanent", "President of the European Council"], treaty: true },
  { year: 2020, yearLabel: "2020", yearNote: "31 January", name: "Brexit", note: ["The United Kingdom leaves;", "27 members remain"], treaty: false },
];

// Layout (viewBox units).
const W = 320;
const TOP = 30;
const LINE_X = 78;
const TEXT_X = 90;
const ROW_GAP = 8;
const NAME_H = 13;
const NOTE_H = 12;

/** Height of one row: its name plus its note lines. */
export function rowHeight(m: Milestone): number {
  return NAME_H + m.note.length * NOTE_H + ROW_GAP;
}

/** The y (top) of each row, stacked in order. */
export function rowTops(): number[] {
  const tops: number[] = [];
  let y = TOP;
  for (const m of MILESTONES) {
    tops.push(y);
    y += rowHeight(m);
  }
  return tops;
}

export const HEIGHT = rowTops()[MILESTONES.length - 1] + rowHeight(MILESTONES[MILESTONES.length - 1]) + 4;

export default function ImatEuTimeline() {
  const tops = rowTops();
  const lastDotY = tops[tops.length - 1] + 9;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · Building the European Union, 1951 to 2020
      </p>
      <svg
        viewBox={`0 0 ${W} ${HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Timeline of the European Union: ${MILESTONES.map((m) => `${m.yearLabel}${m.yearNote ? ` (${m.yearNote})` : ""}, ${m.name}: ${m.note.join(" ")}`).join(". ")}.`}
      >
        {/* Legend */}
        <circle cx={14} cy={12} r={4.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={24} y={15} className="fill-muted-foreground text-[10px]">
          treaty named after its city
        </text>
        <circle cx={170} cy={12} r={4} strokeWidth={1.5} className="fill-background stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={180} y={15} className="fill-muted-foreground text-[10px]">
          other step
        </text>

        {/* Spine */}
        <line x1={LINE_X} y1={TOP + 9} x2={LINE_X} y2={lastDotY} strokeWidth={2} className="stroke-indigo-300 dark:stroke-indigo-700" />

        {MILESTONES.map((m, i) => {
          const y = tops[i];
          const dotY = y + 9;
          return (
            <g key={m.name}>
              <text x={LINE_X - 10} y={y + 13} textAnchor="end" className="fill-foreground text-[12px] font-bold tabular-nums">
                {m.yearLabel}
              </text>
              {m.yearNote && (
                <text x={LINE_X - 10} y={y + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
                  {m.yearNote}
                </text>
              )}
              {m.treaty ? (
                <circle cx={LINE_X} cy={dotY} r={5} className="fill-indigo-600 dark:fill-indigo-400" />
              ) : (
                <circle cx={LINE_X} cy={dotY} r={4} strokeWidth={1.5} className="fill-background stroke-indigo-600 dark:stroke-indigo-400" />
              )}
              <text
                x={TEXT_X}
                y={y + 12}
                className={
                  m.treaty
                    ? "fill-indigo-700 text-[11px] font-bold dark:fill-indigo-300"
                    : "fill-foreground text-[11px] font-semibold"
                }
              >
                {m.name}
              </text>
              {m.note.map((line, j) => (
                <text key={j} x={TEXT_X} y={y + NAME_H + 10 + j * NOTE_H} className="fill-muted-foreground text-[10px]">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Learn each treaty with its city and the one thing it made: Paris (1951) the Coal and Steel Community, Rome
        (1957) the Economic Community and Euratom, Maastricht (1992) the European Union itself, and Lisbon (2007) the
        most recent reform. Do not swap Paris and Rome.
      </p>
    </div>
  );
}
