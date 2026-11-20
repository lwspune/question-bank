/**
 * Static figure: the three ways two events can be linked (concept
 * ssc2rstlg-cause), each drawn with one of the concept's own examples.
 * - One causes the other: heavy rain destroyed the onion crop (II), so the
 *   price of onions doubled (I). II is the cause, I the effect.
 * - Common cause: crowded hospitals and closed schools, both from a flu
 *   outbreak.
 * - Independent causes: two events, each with its own separate reason, and
 *   neither explains the other (drawn without an example, so the practice
 *   question on wheat and car sales keeps its answer).
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type LinkKind = "one causes the other" | "common cause" | "independent causes";

export const ONION = { cause: "II: crop destroyed by rain", effect: "I: onion price doubled" } as const;
export const COMMON = { source: "flu outbreak", effects: ["crowded hospitals", "closed schools"] } as const;
export const INDEPENDENT = [
  { cause: "cause A", event: "event 1" },
  { cause: "cause B", event: "event 2" },
] as const;

export const KINDS: readonly LinkKind[] = ["one causes the other", "common cause", "independent causes"];

const BOX = "fill-background stroke-border";
const SRC = "fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400";
const ARROW = "stroke-sky-600 dark:stroke-sky-400";
const HEAD = "fill-sky-600 dark:fill-sky-400";

function Box({ x, y, w, text, cls = BOX }: { x: number; y: number; w: number; text: string; cls?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={22} rx={4} className={cls} />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" className="fill-foreground text-[10.5px]">
        {text}
      </text>
    </g>
  );
}

/** A straight arrow from (x1, y1) to (x2, y2). */
function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const l = 6;
  const p1 = `${x2 - l * Math.cos(a - 0.45)},${y2 - l * Math.sin(a - 0.45)}`;
  const p2 = `${x2 - l * Math.cos(a + 0.45)},${y2 - l * Math.sin(a + 0.45)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.5} className={ARROW} />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} className={HEAD} />
    </g>
  );
}

function Title({ y, n, text }: { y: number; n: number; text: string }) {
  return (
    <text x={8} y={y} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
      {n}. {text}
    </text>
  );
}

export default function SscT2CauseLinks() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three ways two events can be linked
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="Three panels. One: rain destroyed the onion crop, an arrow to the onion price doubled; the rain is the cause, the price rise its effect. Two: a flu outbreak with arrows to crowded hospitals and to closed schools; both are effects of one common cause. Three: cause A leads to event 1 and cause B to event 2; each event has its own separate cause and there is no link between them."
      >
        <Title y={14} n={1} text="One causes the other" />
        <Box x={8} y={24} w={152} text={ONION.cause} cls={SRC} />
        <Arrow x1={162} y1={35} x2={178} y2={35} />
        <Box x={180} y={24} w={134} text={ONION.effect} />
        <text x={8} y={62} className="fill-muted-foreground text-[10px]">
          less crop, less supply, higher price: II causes I
        </text>
        <line x1={0} y1={74} x2={320} y2={74} className="stroke-border" />

        <Title y={92} n={2} text="Common cause" />
        <Box x={110} y={100} w={100} text={COMMON.source} cls={SRC} />
        <Arrow x1={140} y1={123} x2={84} y2={143} />
        <Arrow x1={180} y1={123} x2={236} y2={143} />
        <Box x={20} y={144} w={120} text={COMMON.effects[0]} />
        <Box x={180} y={144} w={120} text={COMMON.effects[1]} />
        <text x={160} y={182} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          neither causes the other: both come from one event
        </text>
        <line x1={0} y1={194} x2={320} y2={194} className="stroke-border" />

        <Title y={212} n={3} text="Independent causes" />
        {/* cause A → event 1 · · · event 2 ← cause B */}
        <Box x={20} y={222} w={52} text={INDEPENDENT[0].cause} cls={SRC} />
        <Arrow x1={74} y1={233} x2={86} y2={233} />
        <Box x={88} y={222} w={52} text={INDEPENDENT[0].event} />
        <Box x={180} y={222} w={52} text={INDEPENDENT[1].event} />
        <Arrow x1={246} y1={233} x2={234} y2={233} />
        <Box x={248} y={222} w={52} text={INDEPENDENT[1].cause} cls={SRC} />
        <line x1={144} y1={233} x2={176} y2={233} strokeDasharray="3 3" className="stroke-muted-foreground" />
        <text x={160} y={254} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          each event has its own reason: no link between them
        </text>
      </svg>
    </div>
  );
}
