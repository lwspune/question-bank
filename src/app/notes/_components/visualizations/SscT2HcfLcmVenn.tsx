/**
 * Static figure: the prime factors of two numbers in two overlapping circles
 * (concept ssc2nshl-laws, its worked example 2³ × 3² × 5 and 2² × 3³ × 7,
 * that is 360 and 756). The overlap holds the factors both share, the lowest
 * power of each common prime: 2 × 2 × 3 × 3 = 36, the HCF. Everything in
 * either circle, each shared factor counted once, is the highest power of
 * every prime: 36 × 2 × 5 × 3 × 7 = 7560, the LCM. And 36 × 7560 = 360 × 756.
 * Server component. Pinned by tests/notes-w2-20.test.ts.
 */

/** The worked example, as prime powers. */
export const A_POWERS: Readonly<Record<number, number>> = { 2: 3, 3: 2, 5: 1 };
export const B_POWERS: Readonly<Record<number, number>> = { 2: 2, 3: 3, 7: 1 };

export const valueOf = (powers: Readonly<Record<number, number>>) =>
  Object.entries(powers).reduce((v, [p, e]) => v * Number(p) ** e, 1);

/** Expand prime powers into a sorted list of prime factors. */
export function factorList(powers: Readonly<Record<number, number>>): number[] {
  const out: number[] = [];
  for (const [p, e] of Object.entries(powers)) for (let i = 0; i < e; i++) out.push(Number(p));
  return out.sort((x, y) => x - y);
}

/** The factors both share (lowest power of each common prime). */
export function sharedFactors(a: Readonly<Record<number, number>>, b: Readonly<Record<number, number>>): number[] {
  const out: number[] = [];
  for (const [p, e] of Object.entries(a)) {
    const f = b[Number(p)] ?? 0;
    for (let i = 0; i < Math.min(e, f); i++) out.push(Number(p));
  }
  return out.sort((x, y) => x - y);
}

/** The factors left in one number once the shared ones are taken out. */
export function onlyFactors(own: Readonly<Record<number, number>>, other: Readonly<Record<number, number>>): number[] {
  const out: number[] = [];
  for (const [p, e] of Object.entries(own)) {
    const f = other[Number(p)] ?? 0;
    for (let i = 0; i < e - Math.min(e, f); i++) out.push(Number(p));
  }
  return out.sort((x, y) => x - y);
}

const product = (xs: number[]) => xs.reduce((v, x) => v * x, 1);

export const A = valueOf(A_POWERS);
export const B = valueOf(B_POWERS);
export const SHARED = sharedFactors(A_POWERS, B_POWERS);
export const A_ONLY = onlyFactors(A_POWERS, B_POWERS);
export const B_ONLY = onlyFactors(B_POWERS, A_POWERS);
export const HCF = product(SHARED);
export const LCM = product([...A_ONLY, ...SHARED, ...B_ONLY]);

// Geometry (viewBox units).
export const LEFT_C = { x: 118, y: 112 } as const;
export const RIGHT_C = { x: 202, y: 112 } as const;
export const R = 70;

/** Places a column of factor tokens centred at x. */
function tokens(xs: number[], x: number, cls: string) {
  const top = LEFT_C.y - ((xs.length - 1) * 20) / 2;
  return xs.map((p, i) => (
    <text key={i} x={x} y={top + i * 20 + 5} textAnchor="middle" className={`text-[13px] font-semibold ${cls}`}>
      {p}
    </text>
  ));
}

export default function SscT2HcfLcmVenn() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · shared factors and all factors
      </p>
      <svg
        viewBox="0 0 320 266"
        className="block h-auto w-full"
        role="img"
        aria-label="Two overlapping circles hold the prime factors of 360, which is 2 cubed times 3 squared times 5, and 756, which is 2 squared times 3 cubed times 7. The overlap holds the shared factors 2, 2, 3 and 3. The left part holds 2 and 5, the right part holds 3 and 7. The HCF is the overlap, 2 times 2 times 3 times 3, which is 36. The LCM is everything in either circle, 36 times 2 times 5 times 3 times 7, which is 7560. And 36 times 7560 equals 360 times 756."
      >
        <text x={LEFT_C.x - 22} y={28} textAnchor="middle" className="fill-sky-700 text-[10.5px] font-semibold dark:fill-sky-300">
          360 = 2³ × 3² × 5
        </text>
        <text x={RIGHT_C.x + 22} y={28} textAnchor="middle" className="fill-amber-700 text-[10.5px] font-semibold dark:fill-amber-300">
          756 = 2² × 3³ × 7
        </text>

        <circle cx={LEFT_C.x} cy={LEFT_C.y} r={R} strokeWidth={1.6} className="fill-sky-200/50 stroke-sky-600 dark:fill-sky-900/40 dark:stroke-sky-400" />
        <circle cx={RIGHT_C.x} cy={RIGHT_C.y} r={R} strokeWidth={1.6} className="fill-amber-200/50 stroke-amber-600 dark:fill-amber-900/40 dark:stroke-amber-400" />

        {tokens(A_ONLY, LEFT_C.x - 36, "fill-sky-800 dark:fill-sky-200")}
        {tokens(SHARED, (LEFT_C.x + RIGHT_C.x) / 2, "fill-foreground")}
        {tokens(B_ONLY, RIGHT_C.x + 36, "fill-amber-800 dark:fill-amber-200")}

        <text x={LEFT_C.x - 36} y={198} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          360 only
        </text>
        <text x={(LEFT_C.x + RIGHT_C.x) / 2} y={198} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          both
        </text>
        <text x={RIGHT_C.x + 36} y={198} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          756 only
        </text>

        <g className="text-[10.5px]">
          <text x={160} y={220} textAnchor="middle" className="fill-foreground">
            <tspan className="font-semibold">HCF</tspan> (the overlap): 2 × 2 × 3 × 3 = 36
          </text>
          <text x={160} y={236} textAnchor="middle" className="fill-foreground">
            <tspan className="font-semibold">LCM</tspan> (everything): 36 × 2 × 5 × 3 × 7 = 7560
          </text>
          <text x={160} y={256} textAnchor="middle" className="fill-indigo-700 font-semibold dark:fill-indigo-300">
            36 × 7560 = 360 × 756 = 272160
          </text>
        </g>
      </svg>
    </div>
  );
}
