/**
 * Static figure: a code found from what two coded sentences share (concept
 * ssc2rcdco-common), with the concept's own example: 'red apple sweet' is
 * 'la pi to' and 'sweet mango' is 'to ru'. 'sweet' is the only word in both
 * sentences and 'to' the only code in both, so sweet is coded 'to'. The match
 * is made by what is shared, never by position in the line.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const SENTENCE_1 = { words: ["red", "apple", "sweet"], codes: ["la", "pi", "to"] } as const;
export const SENTENCE_2 = { words: ["sweet", "mango"], codes: ["to", "ru"] } as const;

export const shared = (a: readonly string[], b: readonly string[]) => a.filter((x) => b.includes(x));

const WORD = shared(SENTENCE_1.words, SENTENCE_2.words);
const CODE = shared(SENTENCE_1.codes, SENTENCE_2.codes);

const HIT = "fill-emerald-100 stroke-emerald-600 dark:fill-emerald-950 dark:stroke-emerald-400";
const PLAIN = "fill-background stroke-border";

function Line({ items, y, x0, hits }: { items: readonly string[]; y: number; x0: number; hits: readonly string[] }) {
  return (
    <g>
      {items.map((w, i) => {
        const hit = hits.includes(w);
        return (
          <g key={w}>
            <rect x={x0 + i * 62} y={y} width={56} height={22} rx={4} strokeWidth={hit ? 1.5 : 1} className={hit ? HIT : PLAIN} />
            <text
              x={x0 + i * 62 + 28}
              y={y + 15}
              textAnchor="middle"
              className={`text-[11px] ${hit ? "fill-emerald-800 font-semibold dark:fill-emerald-200" : "fill-foreground"}`}
            >
              {w}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function SscT2SharedCode() {
  const x1 = 116;
  const x2 = 116;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · match what the two sentences share
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="Sentence 1: red apple sweet, coded la pi to. Sentence 2: sweet mango, coded to ru. The word sweet is the only word in both sentences, and the code to is the only code in both, so sweet is coded to."
      >
        <text x={8} y={16} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          Sentence 1
        </text>
        <text x={8} y={42} className="fill-muted-foreground text-[10px]">
          words
        </text>
        <Line items={SENTENCE_1.words} y={28} x0={x1} hits={WORD} />
        <text x={8} y={70} className="fill-muted-foreground text-[10px]">
          code
        </text>
        <Line items={SENTENCE_1.codes} y={56} x0={x1} hits={CODE} />

        <text x={8} y={124} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          Sentence 2
        </text>
        <text x={8} y={150} className="fill-muted-foreground text-[10px]">
          words
        </text>
        <Line items={SENTENCE_2.words} y={136} x0={x2} hits={WORD} />
        <text x={8} y={178} className="fill-muted-foreground text-[10px]">
          code
        </text>
        <Line items={SENTENCE_2.codes} y={164} x0={x2} hits={CODE} />

        <text x={160} y={104} textAnchor="middle" className="fill-emerald-700 text-[11px] dark:fill-emerald-300">
          green: in both sentences (one word, one code)
        </text>

        <text x={160} y={206} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          {WORD[0]} is coded {CODE[0]}
        </text>
        <text x={160} y={222} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Match by what is shared, not by place in the line.
        </text>
      </svg>
    </div>
  );
}
