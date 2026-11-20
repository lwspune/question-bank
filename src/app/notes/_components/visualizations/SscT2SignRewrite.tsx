/**
 * Static figure: signs with new meanings (concept ssc2rmoop-symbol), with the
 * concept's own example. + means ×, × means −, − means ÷ and ÷ means +, so
 * 8 + 3 × 12 − 4 ÷ 2 is rewritten 8 × 3 − 12 ÷ 4 + 2. Division and
 * multiplication first: 24 − 3 + 2 = 23.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type Sign = "+" | "−" | "×" | "÷";
export type Token = number | Sign;

/** What each printed sign now means. */
export const MEANING: Record<Sign, Sign> = { "+": "×", "×": "−", "−": "÷", "÷": "+" };

export const GIVEN: readonly Token[] = [8, "+", 3, "×", 12, "−", 4, "÷", 2];

export const rewrite = (tokens: readonly Token[]): Token[] => tokens.map((t) => (typeof t === "number" ? t : MEANING[t]));

/** The usual order: × and ÷ left to right first, then + and − left to right. */
export function evaluate(tokens: readonly Token[]): number {
  const stack: Token[] = [tokens[0]];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i] as Sign;
    const n = tokens[i + 1] as number;
    if (op === "×" || op === "÷") {
      const prev = stack.pop() as number;
      stack.push(op === "×" ? prev * n : prev / n);
    } else {
      stack.push(op, n);
    }
  }
  let total = stack[0] as number;
  for (let i = 1; i < stack.length; i += 2) {
    const n = stack[i + 1] as number;
    total = stack[i] === "+" ? total + n : total - n;
  }
  return total;
}

/** The trap: working strictly left to right, ignoring the order. */
export function leftToRight(tokens: readonly Token[]): number {
  let total = tokens[0] as number;
  for (let i = 1; i < tokens.length; i += 2) {
    const n = tokens[i + 1] as number;
    const op = tokens[i] as Sign;
    total = op === "+" ? total + n : op === "−" ? total - n : op === "×" ? total * n : total / n;
  }
  return total;
}

const REWRITTEN = rewrite(GIVEN);
const ANSWER = evaluate(REWRITTEN);
const WRONG = leftToRight(REWRITTEN);

const X0 = 64;
const DX = 28;
const tx = (i: number) => X0 + i * DX;
const SIGNS: readonly Sign[] = ["+", "×", "−", "÷"];

function Row({ tokens, y, signClass }: { tokens: readonly Token[]; y: number; signClass: string }) {
  return (
    <g>
      {tokens.map((t, i) => (
        <text key={i} x={tx(i)} y={y} textAnchor="middle" className={`text-[14px] font-semibold ${typeof t === "number" ? "fill-foreground" : signClass}`}>
          {t}
        </text>
      ))}
    </g>
  );
}

export default function SscT2SignRewrite() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · rewrite every sign, then calculate
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label="A key: plus means times, times means minus, minus means divide, divide means plus. The given line 8 plus 3 times 12 minus 4 divide 2 is rewritten sign by sign as 8 times 3 minus 12 divided by 4 plus 2. Multiplication and division first: 8 times 3 is 24 and 12 divided by 4 is 3, then 24 minus 3 plus 2 is 23."
      >
        {/* The key */}
        {SIGNS.map((s, i) => (
          <g key={s}>
            <rect x={10 + i * 76} y={6} width={70} height={22} rx={4} className="fill-background stroke-border" />
            <text x={45 + i * 76} y={21} textAnchor="middle" className="fill-foreground text-[11px]">
              <tspan className="fill-amber-700 font-semibold dark:fill-amber-300">{s}</tspan> means{" "}
              <tspan className="fill-sky-700 font-semibold dark:fill-sky-300">{MEANING[s]}</tspan>
            </text>
          </g>
        ))}

        <text x={6} y={60} className="fill-muted-foreground text-[10px]">
          given
        </text>
        <Row tokens={GIVEN} y={60} signClass="fill-amber-700 dark:fill-amber-300" />
        {GIVEN.map((t, i) =>
          typeof t === "number" ? null : (
            <g key={i} className="stroke-muted-foreground">
              <line x1={tx(i)} y1={67} x2={tx(i)} y2={82} strokeWidth={1.2} />
              <polygon points={`${tx(i)},86 ${tx(i) - 3},80 ${tx(i) + 3},80`} className="fill-muted-foreground stroke-none" />
            </g>
          ),
        )}
        <text x={6} y={102} className="fill-muted-foreground text-[10px]">
          rewritten
        </text>
        <Row tokens={REWRITTEN} y={102} signClass="fill-sky-700 dark:fill-sky-300" />

        {/* × and ÷ first */}
        <path d={`M ${tx(0) - 6} 110 v 5 h ${tx(2) - tx(0) + 12} v -5`} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={tx(1)} y={129} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          24
        </text>
        <path d={`M ${tx(4) - 8} 110 v 5 h ${tx(6) - tx(4) + 16} v -5`} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" />
        <text x={tx(5)} y={129} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          3
        </text>
        <text x={160} y={150} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          × and ÷ first, wherever they sit
        </text>
        <text x={160} y={174} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
          24 − 3 + 2 = {ANSWER}
        </text>
        <text x={160} y={200} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Working strictly left to right gives {WRONG}: wrong.
        </text>
      </svg>
    </div>
  );
}
