/**
 * Static figure: a letter-cluster analogy read as steps through the alphabet
 * (concept ssc2ranan-letter), with the concept's own example
 * ACE : BDF :: KMO : ?. Each letter is turned into its position (A = 1), the
 * step under each letter of the first pair is +1, and the same steps take KMO
 * to LNP. Past Z the count wraps to A.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const pos = (c: string) => c.toUpperCase().charCodeAt(0) - 64;
export const letterAt = (p: number) => String.fromCharCode(64 + (((p - 1) % 26) + 26) % 26 + 1);
export const shift = (c: string, n: number) => letterAt(pos(c) + n);

/** The step under each letter, from one cluster to the other. */
export const steps = (from: string, to: string) => [...from].map((c, i) => pos(to[i]) - pos(c));
export const applySteps = (from: string, st: readonly number[]) => [...from].map((c, i) => shift(c, st[i])).join("");

export const PAIR = { a: "ACE", b: "BDF" } as const;
export const THIRD = "KMO";

const STEPS = steps(PAIR.a, PAIR.b);
const ANSWER = applySteps(THIRD, STEPS);

const TOP_Y = 52;
const LOW_Y = 132;
const sign = (n: number) => (n >= 0 ? `+${n}` : `−${-n}`);

function Cluster({ word, x0, y, answer }: { word: string; x0: number; y: number; answer?: boolean }) {
  return (
    <g>
      {[...word].map((c, i) => (
        <g key={i}>
          <rect
            x={x0 + i * 34 - 13}
            y={y - 17}
            width={26}
            height={24}
            rx={4}
            className={answer ? "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400" : "fill-background stroke-border"}
          />
          <text
            x={x0 + i * 34}
            y={y}
            textAnchor="middle"
            className={`text-[14px] font-semibold ${answer ? "fill-emerald-700 dark:fill-emerald-300" : "fill-foreground"}`}
          >
            {c}
          </text>
          <text x={x0 + i * 34} y={y + 20} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {pos(c)}
          </text>
        </g>
      ))}
    </g>
  );
}

function Arrows({ x0 }: { x0: number }) {
  return (
    <g>
      {STEPS.map((s, i) => {
        const x = x0 + i * 34;
        return (
          <g key={i}>
            <line x1={x} y1={TOP_Y + 26} x2={x} y2={LOW_Y - 24} strokeWidth={1.3} className="stroke-amber-600 dark:stroke-amber-400" />
            <polygon points={`${x},${LOW_Y - 19} ${x - 3.5},${LOW_Y - 25} ${x + 3.5},${LOW_Y - 25}`} className="fill-amber-600 dark:fill-amber-400" />
            <text x={x + 5} y={(TOP_Y + LOW_Y) / 2 + 2} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
              {sign(s)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function SscT2LetterSteps() {
  const left = 36;
  const right = 202;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the same steps on both pairs
      </p>
      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="ACE is to BDF as KMO is to what? Under each letter is its position in the alphabet: A 1, C 3, E 5 become B 2, D 4, F 6, a step of plus 1 under every letter. The same steps take K 11, M 13, O 15 to L 12, N 14, P 16, so the answer is LNP."
      >
        <text x={left + 34} y={14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          the given pair
        </text>
        <text x={right + 34} y={14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          the same steps
        </text>
        <Cluster word={PAIR.a} x0={left} y={TOP_Y} />
        <Arrows x0={left} />
        <Cluster word={PAIR.b} x0={left} y={LOW_Y} />

        <text x={160} y={(TOP_Y + LOW_Y) / 2 + 6} textAnchor="middle" className="fill-foreground text-[18px] font-semibold">
          ::
        </text>

        <Cluster word={THIRD} x0={right} y={TOP_Y} />
        <Arrows x0={right} />
        <Cluster word={ANSWER} x0={right} y={LOW_Y} answer />

        <text x={160} y={180} textAnchor="middle" className="fill-foreground text-[11px]">
          Small numbers: each letter&apos;s place in the alphabet (A is 1).
        </text>
        <text x={160} y={198} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          {PAIR.a} : {PAIR.b} :: {THIRD} : {ANSWER}
        </text>
      </svg>
    </div>
  );
}
