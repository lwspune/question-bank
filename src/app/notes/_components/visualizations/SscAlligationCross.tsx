/**
 * Static figure: the alligation cross (concept sscraal-cross) with the
 * concept's worked example: coffee at 400 and 520 per kg mixed to a mean of
 * 450 per kg. The cheaper price p₁ and the dearer price p₂ sit at the top, the
 * mean m in the middle, and each diagonal carries a difference to the far
 * corner: the cheaper kind gets p₂ − m = 70, the dearer kind m − p₁ = 50, so
 * cheaper : dearer = 70 : 50 = 7 : 5, and 10 kg of the dearer (5 parts) goes
 * with 14 kg of the cheaper. Prices carry no currency sign (figures never
 * price in a currency). Server component. Pinned by
 * tests/notes-ssc-visuals.test.ts.
 */

/** The worked example: cheaper p₁, dearer p₂, mean m (per kg). */
export const MIX = { p1: 400, p2: 520, m: 450 } as const;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** cheaper : dearer = (p₂ − m) : (m − p₁), as raw differences. */
export const crossDifferences = (p1: number, p2: number, m: number): [number, number] => [p2 - m, m - p1];

/** The same ratio in lowest terms. */
export function crossRatio(p1: number, p2: number, m: number): [number, number] {
  const [a, b] = crossDifferences(p1, p2, m);
  const g = gcd(a, b);
  return [a / g, b / g];
}

/** The worked example's scaling: 10 kg of the dearer kind. */
export const DEARER_KG = 10;
export function cheaperKgFor(dearerKg: number, p1: number, p2: number, m: number) {
  const [c, d] = crossRatio(p1, p2, m);
  return (dearerKg / d) * c;
}

const NODE = "fill-background stroke-indigo-500 dark:stroke-indigo-400";
const DIFF = "fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950 dark:stroke-emerald-400";

export default function SscAlligationCross() {
  const { p1, p2, m } = MIX;
  const [toCheap, toDear] = crossDifferences(p1, p2, m);
  const [rc, rd] = crossRatio(p1, p2, m);
  const left = 64;
  const right = 256;
  const top = 36;
  const mid = 100;
  const bottom = 164;
  const cx = 160;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the alligation cross
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="An alligation cross. Cheaper coffee at 400 per kg is at the top left and dearer coffee at 520 per kg at the top right, with the mean, 450 per kg, in the middle. One diagonal runs from 520 through 450 to the bottom left, where 520 minus 450 equals 70 is written under the cheaper kind. The other runs from 400 through 450 to the bottom right, where 450 minus 400 equals 50 is written under the dearer kind. So cheaper to dearer is 70 to 50, which is 7 to 5, and 10 kg of the dearer goes with 14 kg of the cheaper."
      >
        {/* Diagonals */}
        <line x1={right} y1={top} x2={left} y2={bottom} strokeDasharray="5 3" strokeWidth={1.5} className="stroke-muted-foreground" />
        <line x1={left} y1={top} x2={right} y2={bottom} strokeDasharray="5 3" strokeWidth={1.5} className="stroke-muted-foreground" />

        {/* The two prices */}
        <rect x={left - 52} y={top - 20} width={104} height={40} rx={7} strokeWidth={1.5} className={NODE} />
        <text x={left} y={top - 5} textAnchor="middle" className="fill-foreground text-[10px]">
          cheaper, p₁
        </text>
        <text x={left} y={top + 11} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {p1} per kg
        </text>
        <rect x={right - 52} y={top - 20} width={104} height={40} rx={7} strokeWidth={1.5} className={NODE} />
        <text x={right} y={top - 5} textAnchor="middle" className="fill-foreground text-[10px]">
          dearer, p₂
        </text>
        <text x={right} y={top + 11} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          {p2} per kg
        </text>

        {/* The mean */}
        <rect x={cx - 48} y={mid - 19} width={96} height={38} rx={7} strokeWidth={1.5} className="fill-amber-50 stroke-amber-500 dark:fill-amber-950 dark:stroke-amber-400" />
        <text x={cx} y={mid - 4} textAnchor="middle" className="fill-foreground text-[10px]">
          mean, m
        </text>
        <text x={cx} y={mid + 11} textAnchor="middle" className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          {m} per kg
        </text>

        {/* The crossed differences */}
        <rect x={left - 52} y={bottom - 17} width={104} height={34} rx={7} strokeWidth={1.5} className={DIFF} />
        <text x={left} y={bottom + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {p2} − {m} = {toCheap}
        </text>
        <text x={left} y={bottom + 30} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
          parts of cheaper
        </text>
        <rect x={right - 52} y={bottom - 17} width={104} height={34} rx={7} strokeWidth={1.5} className={DIFF} />
        <text x={right} y={bottom + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {m} − {p1} = {toDear}
        </text>
        <text x={right} y={bottom + 30} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
          parts of dearer
        </text>

        {/* The ratio */}
        <text x={cx} y={213} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          cheaper : dearer = {toCheap} : {toDear} = {rc} : {rd}
        </text>
        <text x={cx} y={229} textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-300">
          {DEARER_KG} kg dearer = {rd} parts: 1 part = {DEARER_KG / rd} kg, cheaper = {cheaperKgFor(DEARER_KG, p1, p2, m)} kg
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Each kind takes the OTHER kind&apos;s distance from the mean: the cheaper coffee gets p₂ − m and the dearer gets m − p₁. The mean
        450 is nearer to 400, so the cheaper kind is the larger part.
      </p>
    </div>
  );
}
