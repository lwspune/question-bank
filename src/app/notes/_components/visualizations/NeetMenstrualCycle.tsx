/**
 * Static figure: one 28-day menstrual cycle, in the words of the NEET concept
 * "Phases of the menstrual cycle" (nzohr-cycle-phases).
 *
 * - The phases on the concept's own days: menstrual (days 1 to 5), follicular
 *   or proliferative (days 6 to 13), ovulation (about day 14), luteal or
 *   secretory (days 15 to 28).
 * - LH and FSH rise gradually through the follicular phase and both peak in the
 *   middle of the cycle, LH to its maximum (the LH surge).
 * - Estrogens rise as the growing follicles secrete them, fall after ovulation
 *   and show a second, smaller rise in the luteal phase; progesterone is high in
 *   the luteal phase, from the corpus luteum. Both fall near day 28 as the
 *   corpus luteum degenerates. LH and FSH stay low after the surge.
 * - The ovary: primary follicles, a Graafian follicle, the ovum released at
 *   ovulation, the corpus luteum, which degenerates without fertilisation.
 * - The endometrium: breaks down (menstrual flow), regenerates, is maintained.
 *
 * Curve shapes are qualitative; the days and names are the concept's. Data
 * exported and pinned by tests/notes-neet-visuals-bio-b.test.ts. Server
 * component, no client state.
 */

export type Phase = { id: "menstrual" | "follicular" | "ovulatory" | "luteal"; name: string; sub?: string; firstDay: number; lastDay: number };

export const CYCLE_DAYS = 28;

/** The concept's table, "Days in a 28-day cycle". */
export const PHASES: readonly Phase[] = [
  { id: "menstrual", name: "Menstrual", firstDay: 1, lastDay: 5 },
  { id: "follicular", name: "Follicular", sub: "(proliferative)", firstDay: 6, lastDay: 13 },
  { id: "ovulatory", name: "Ovulation", firstDay: 14, lastDay: 14 },
  { id: "luteal", name: "Luteal", sub: "(secretory)", firstDay: 15, lastDay: 28 },
];

/**
 * Time t runs from 0 (start of day 1) to 28 (end of day 28); day n is the
 * stretch from t = n - 1 to t = n, so day 14 is centred on t = 13.5.
 */
export const OVULATION_T = 13.5;

const gauss = (t: number, mid: number, w: number) => Math.exp(-(((t - mid) / w) ** 2));
const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

/** Qualitative hormone levels, 0 to 1. */
export const HORMONES = {
  LH: (t: number) => 0.1 + 0.1 * smooth(5, 13, t) * (1 - smooth(14, 16, t)) + 0.78 * gauss(t, OVULATION_T, 0.6),
  FSH: (t: number) => 0.14 + 0.1 * smooth(5, 13, t) * (1 - smooth(14, 16, t)) + 0.4 * gauss(t, OVULATION_T, 0.7),
  // Mid-cycle peak, a fall after ovulation, then a smaller luteal rise beside progesterone.
  estrogens: (t: number) =>
    0.08 + 0.7 * smooth(5, 13, t) * (1 - smooth(13.5, 15.5, t)) + 0.3 * smooth(16, 20, t) * (1 - smooth(24, 28, t)),
  progesterone: (t: number) => 0.06 + 0.76 * smooth(14, 19, t) * (1 - smooth(24, 28, t)),
} as const;

/** The ovary, in order through the cycle. */
export type OvaryEvent = { id: string; t: number; label?: string };
export const OVARY: readonly OvaryEvent[] = [
  { id: "primary", t: 2.5, label: "primary follicles" },
  { id: "growing", t: 7.5 },
  { id: "graafian", t: 11.5, label: "Graafian follicle" },
  { id: "ovum", t: OVULATION_T, label: "ovum released" },
  { id: "corpus-luteum", t: 19 },
  { id: "corpus-luteum-2", t: 24, label: "corpus luteum" },
  { id: "degenerates", t: 27.3, label: "degenerates" },
];

/** Endometrium thickness, 0 to 1: breaks down, regenerates, maintained. */
export function endometrium(t: number): number {
  if (t <= 5) return 0.9 - (0.7 * t) / 5;
  if (t <= 13) return 0.2 + (0.55 * (t - 5)) / 8;
  if (t <= 25) return 0.75 + (0.25 * (t - 13)) / 12;
  return 1;
}

// Geometry.
export const X0 = 30;
export const DAY_W = 10;
export const X = (t: number) => X0 + t * DAY_W;
const r1 = (n: number) => Math.round(n * 10) / 10;

const PANEL_A = { top: 56, base: 112 };
const PANEL_B = { top: 120, base: 178 };
const OVARY_Y = 200;
const UTERUS_BASE = 282;
const AXIS_Y = 304;

function curve(f: (t: number) => number, panel: { top: number; base: number }): string {
  const h = panel.base - panel.top;
  const pts: string[] = [];
  for (let i = 0; i <= CYCLE_DAYS * 4; i++) {
    const t = i / 4;
    pts.push(`${i === 0 ? "M" : "L"} ${r1(X(t))} ${r1(panel.base - f(t) * h)}`);
  }
  return pts.join(" ");
}

function endometriumArea(): string {
  const pts: string[] = [`M ${X(0)} ${UTERUS_BASE}`];
  for (let i = 0; i <= CYCLE_DAYS * 2; i++) {
    const t = i / 2;
    pts.push(`L ${r1(X(t))} ${r1(UTERUS_BASE - endometrium(t) * 26)}`);
  }
  pts.push(`L ${X(CYCLE_DAYS)} ${UTERUS_BASE} Z`);
  return pts.join(" ");
}

const BAND: Record<Phase["id"], string> = {
  menstrual: "fill-rose-200 dark:fill-rose-900/60",
  follicular: "fill-sky-200 dark:fill-sky-900/60",
  ovulatory: "fill-amber-300 dark:fill-amber-700",
  luteal: "fill-emerald-200 dark:fill-emerald-900/60",
};
const LABEL = "fill-foreground text-[10px]";
const SIDE = "fill-muted-foreground text-[10px] font-semibold";

export default function NeetMenstrualCycle() {
  const ovX = X(OVULATION_T);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one 28-day menstrual cycle
      </p>
      <svg
        viewBox="0 0 320 320"
        className="block h-auto w-full"
        role="img"
        aria-label="A 28-day menstrual cycle: the menstrual phase on days 1 to 5, the follicular phase on days 6 to 13, ovulation about day 14 when LH and FSH peak, and the luteal phase on days 15 to 28 when the corpus luteum secretes progesterone. Below, the ovary and the endometrium through the same days."
      >
        {/* Phases. */}
        {PHASES.map((p) => {
          const x1 = X(p.firstDay - 1);
          const x2 = X(p.lastDay);
          return (
            <g key={p.id}>
              <rect x={x1} y={18} width={x2 - x1} height={30} className={BAND[p.id]} />
              {p.id !== "ovulatory" && (
                <>
                  <text x={(x1 + x2) / 2} y={p.sub ? 31 : 37} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                    {p.name}
                  </text>
                  {p.sub && (
                    <text x={(x1 + x2) / 2} y={43} textAnchor="middle" className={LABEL}>
                      {p.sub}
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}
        <text x={ovX} y={12} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
          Ovulation (about day 14)
        </text>
        <line x1={ovX} y1={48} x2={ovX} y2={222} strokeWidth={1} strokeDasharray="3 3" className="stroke-amber-600 dark:stroke-amber-400" />

        {/* Row names. */}
        <text x={12} y={117} textAnchor="middle" transform="rotate(-90 12 117)" className={SIDE}>Hormones</text>
        <text x={12} y={210} textAnchor="middle" transform="rotate(-90 12 210)" className={SIDE}>Ovary</text>
        <text x={12} y={272} textAnchor="middle" transform="rotate(-90 12 272)" className={SIDE}>Uterus</text>

        {/* LH and FSH. */}
        <line x1={X0} y1={PANEL_A.base} x2={X(CYCLE_DAYS)} y2={PANEL_A.base} strokeWidth={1} className="stroke-border" />
        <path d={curve(HORMONES.FSH, PANEL_A)} strokeWidth={1.75} className="fill-none stroke-sky-600 dark:stroke-sky-400" />
        <path d={curve(HORMONES.LH, PANEL_A)} strokeWidth={2} className="fill-none stroke-indigo-600 dark:stroke-indigo-300" />
        <text x={ovX + 7} y={68} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">LH surge</text>
        <text x={ovX + 15} y={84} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">FSH</text>
        <text x={X(7.5)} y={94} textAnchor="middle" className="fill-muted-foreground text-[10px]">LH and FSH rise</text>

        {/* Estrogens and progesterone. */}
        <line x1={X0} y1={PANEL_B.base} x2={X(CYCLE_DAYS)} y2={PANEL_B.base} strokeWidth={1} className="stroke-border" />
        <path d={curve(HORMONES.estrogens, PANEL_B)} strokeWidth={1.75} className="fill-none stroke-rose-600 dark:stroke-rose-400" />
        <path d={curve(HORMONES.progesterone, PANEL_B)} strokeWidth={2} className="fill-none stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={X(12.2) - 4} y={132} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">estrogens</text>
        <text x={X(21.5)} y={125} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">progesterone</text>

        {/* The ovary. */}
        <line x1={X0} y1={OVARY_Y} x2={X(CYCLE_DAYS)} y2={OVARY_Y} strokeWidth={1} strokeDasharray="1 3" className="stroke-muted-foreground" />
        {[-6, 0, 6].map((dx) => (
          <circle key={dx} cx={X(2.5) + dx} cy={OVARY_Y + (dx === 0 ? -4 : 3)} r={3} strokeWidth={1} className="fill-sky-100 stroke-sky-700 dark:fill-sky-950 dark:stroke-sky-300" />
        ))}
        <circle cx={X(7.5)} cy={OVARY_Y} r={7} strokeWidth={1.25} className="fill-sky-100 stroke-sky-700 dark:fill-sky-950 dark:stroke-sky-300" />
        <circle cx={X(7.5) - 2} cy={OVARY_Y - 1} r={2} className="fill-rose-500 dark:fill-rose-400" />
        <circle cx={X(11.5)} cy={OVARY_Y} r={11} strokeWidth={1.5} className="fill-sky-100 stroke-sky-700 dark:fill-sky-950 dark:stroke-sky-300" />
        <circle cx={X(11.5) - 4} cy={OVARY_Y - 2} r={2.5} className="fill-rose-500 dark:fill-rose-400" />
        {/* Ruptured follicle and the released ovum. */}
        <path d={`M ${ovX - 5} ${OVARY_Y - 7} A 8 8 0 1 0 ${ovX + 5} ${OVARY_Y - 7}`} strokeWidth={1.5} className="fill-none stroke-sky-700 dark:stroke-sky-300" />
        <circle cx={ovX + 5} cy={OVARY_Y - 16} r={3} className="fill-rose-500 dark:fill-rose-400" />
        {[19, 24].map((t) => (
          <circle key={t} cx={X(t)} cy={OVARY_Y} r={11} strokeWidth={1.5} className="fill-amber-300 stroke-amber-700 dark:fill-amber-600 dark:stroke-amber-300" />
        ))}
        <circle cx={X(27.3)} cy={OVARY_Y} r={6} strokeWidth={1} strokeDasharray="2 2" className="fill-amber-100 stroke-amber-700 dark:fill-amber-900/50 dark:stroke-amber-300" />
        <text x={X(2.5)} y={232} textAnchor="middle" className={LABEL}>primary follicles</text>
        <text x={X(11.5)} y={244} textAnchor="middle" className={LABEL}>Graafian follicle</text>
        <text x={X(OVULATION_T) + 5} y={232} textAnchor="middle" className={LABEL}>ovum released</text>
        <text x={X(21.5)} y={232} textAnchor="middle" className={LABEL}>corpus luteum</text>
        <text x={316} y={244} textAnchor="end" className={LABEL}>degenerates</text>

        {/* The endometrium. */}
        <path d={endometriumArea()} className="fill-rose-300 dark:fill-rose-800" />
        <line x1={X0} y1={UTERUS_BASE} x2={X(CYCLE_DAYS)} y2={UTERUS_BASE} strokeWidth={1.5} className="stroke-rose-800 dark:stroke-rose-300" />
        {[1, 2.5, 4].map((t) => (
          <circle key={t} cx={X(t)} cy={UTERUS_BASE + 5} r={1.8} className="fill-rose-600 dark:fill-rose-400" />
        ))}
        <text x={X(2.5)} y={298} textAnchor="middle" className={LABEL}>breaks down</text>
        <text x={X(9)} y={298} textAnchor="middle" className={LABEL}>regenerates</text>
        <text x={X(21)} y={298} textAnchor="middle" className={LABEL}>maintained</text>
        <text x={X(9)} y={262} textAnchor="middle" className="fill-muted-foreground text-[10px]">endometrium</text>

        {/* Day axis. */}
        <line x1={X0} y1={AXIS_Y} x2={X(CYCLE_DAYS)} y2={AXIS_Y} strokeWidth={1} className="stroke-muted-foreground" />
        {[1, 5, 14, 28].map((d) => (
          <g key={d}>
            <line x1={X(d - 0.5)} y1={AXIS_Y} x2={X(d - 0.5)} y2={AXIS_Y + 3} strokeWidth={1} className="stroke-muted-foreground" />
            <text x={X(d - 0.5)} y={AXIS_Y + 13} textAnchor="middle" className={LABEL}>
              {d === 1 ? "Day 1" : d}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-xs text-muted-foreground">
        The LH surge ruptures the Graafian follicle and releases the ovum. The corpus luteum secretes large amounts of
        progesterone, which maintains the endometrium. Without fertilisation the corpus luteum degenerates, progesterone
        falls, the endometrium disintegrates and menstruation begins a new cycle. Curve shapes are only a sketch.
      </p>
    </div>
  );
}
