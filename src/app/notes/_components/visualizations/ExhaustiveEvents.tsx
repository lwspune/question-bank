/**
 * Static figure: a set of exhaustive, mutually exclusive events tiling the
 * sample space — a partition whose probabilities sum to 1.
 *
 * Pedagogical aim: "exhaustive" means the events together cover all of S; if
 * they're also disjoint they form a partition and their probabilities add to 1.
 * Server component — no client state.
 */

const PARTS = [
  { label: "E₁", p: 0.5, fill: "fill-sky-500/35", text: "fill-sky-700 dark:fill-sky-300" },
  { label: "E₂", p: 0.3, fill: "fill-amber-500/35", text: "fill-amber-700 dark:fill-amber-300" },
  { label: "E₃", p: 0.2, fill: "fill-emerald-500/35", text: "fill-emerald-700 dark:fill-emerald-300" },
];

const X0 = 10;
const Y0 = 16;
const WIDTH = 300;
const HEIGHT = 96;

export default function ExhaustiveEvents() {
  let acc = X0;
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · exhaustive events tile the sample space
      </p>

      <svg viewBox="0 0 320 140" className="block w-full h-auto" role="img" aria-label="Sample space partitioned into three exhaustive mutually exclusive events">
        <text x={X0 + WIDTH} y={12} textAnchor="end" className="fill-muted-foreground text-[10px]">S</text>
        {PARTS.map((part) => {
          const w = part.p * WIDTH;
          const x = acc;
          acc += w;
          return (
            <g key={part.label}>
              <rect x={x} y={Y0} width={w} height={HEIGHT} className={`${part.fill} stroke-background`} strokeWidth={2} />
              <text x={x + w / 2} y={Y0 + HEIGHT / 2} textAnchor="middle" className={`${part.text} text-[13px] font-semibold`}>{part.label}</text>
              <text x={x + w / 2} y={Y0 + HEIGHT + 16} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">{part.p}</text>
            </g>
          );
        })}
        <rect x={X0} y={Y0} width={WIDTH} height={HEIGHT} className="fill-none stroke-border" strokeWidth={1} />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The three events leave no gap and no overlap — they exhaust S. When events are both exhaustive and
        mutually exclusive (a partition), their probabilities add to exactly 1: 0.5 + 0.3 + 0.2 = 1. This is the
        backbone of the total-probability rule.
      </p>
    </div>
  );
}
