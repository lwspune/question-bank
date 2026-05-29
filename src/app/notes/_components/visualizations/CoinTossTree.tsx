/**
 * Static figure: the outcome tree for tossing a coin twice — 2² = 4 equally
 * likely leaves, each with probability 1/4.
 *
 * Pedagogical aim: independent stages multiply, and n tosses give 2ⁿ equally
 * likely outcomes. Server component — no client state.
 */

const root: [number, number] = [26, 100];
const h: [number, number] = [150, 56];
const t: [number, number] = [150, 144];
const leaves: { p: [number, number]; label: string }[] = [
  { p: [290, 30], label: "HH" },
  { p: [290, 82], label: "HT" },
  { p: [290, 118], label: "TH" },
  { p: [290, 170], label: "TT" },
];
const edge = (a: [number, number], b: [number, number]) => (
  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="currentColor" className="text-sky-600/70 dark:text-sky-400/70" strokeWidth={1.5} />
);

export default function CoinTossTree() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · two coin tosses → 2² = 4 outcomes
      </p>

      <svg viewBox="0 0 340 200" className="block w-full h-auto" role="img" aria-label="Probability tree for two coin tosses with four equally likely leaves">
        {edge(root, h)}
        {edge(root, t)}
        {edge(h, leaves[0].p)}
        {edge(h, leaves[1].p)}
        {edge(t, leaves[2].p)}
        {edge(t, leaves[3].p)}

        <text x={80} y={68} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">H · ½</text>
        <text x={80} y={132} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">T · ½</text>
        <text x={224} y={38} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">½</text>
        <text x={224} y={78} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">½</text>
        <text x={224} y={122} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">½</text>
        <text x={224} y={162} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[10px]">½</text>

        <circle cx={root[0]} cy={root[1]} r={4} className="fill-foreground" />
        <circle cx={h[0]} cy={h[1]} r={4} className="fill-sky-600 dark:fill-sky-400" />
        <circle cx={t[0]} cy={t[1]} r={4} className="fill-sky-600 dark:fill-sky-400" />

        {leaves.map((lf) => (
          <text key={lf.label} x={lf.p[0] + 8} y={lf.p[1] + 4} className="fill-foreground text-[11px] font-semibold">
            {lf.label} <tspan className="fill-indigo-700 dark:fill-indigo-300">¼</tspan>
          </text>
        ))}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Each toss branches into H or T with probability ½, and the branches multiply: every leaf is ½ × ½ = ¼.
        Tossing n coins gives 2ⁿ equally likely outcomes — so &quot;at least one head&quot; is easiest via the
        complement, 1 − P(all tails).
      </p>
    </div>
  );
}
