/**
 * Static figure: four letter clusters turned into lists of gaps (concept
 * sscrclga-growing). The concept's worked example: CDGL, KLOT, MNQV, RSVZ.
 * Positions C3 D4 G7 L12; K11 L12 O15 T20; M13 N14 Q17 V22; R18 S19 V22 Z26.
 * The first three go +1, +3, +5; RSVZ goes +1, +3, +4, so (d) is the odd one.
 * Server component. Pinned by tests/notes-w2-18.test.ts.
 */

/** The worked example's options. */
export const OPTIONS = [
  { label: "(a)", word: "CDGL" },
  { label: "(b)", word: "KLOT" },
  { label: "(c)", word: "MNQV" },
  { label: "(d)", word: "RSVZ" },
] as const;

/** A1 to Z26. */
export const pos = (letter: string) => letter.charCodeAt(0) - 64;
/** The gap from each letter to the next, wrapping round after Z. */
export function gapsOf(word: string): number[] {
  const out: number[] = [];
  for (let i = 1; i < word.length; i++) out.push((((pos(word[i]) - pos(word[i - 1])) % 26) + 26) % 26);
  return out;
}

export const GAP_LISTS = OPTIONS.map((o) => gapsOf(o.word));

/** The option whose gap list differs from the list the other three share. */
export function oddOneIndex(lists: readonly number[][]): number {
  const key = lists.map((l) => l.join(","));
  return key.findIndex((k) => key.filter((x) => x === k).length === 1);
}
export const ODD = oddOneIndex(GAP_LISTS);

// Geometry (viewBox units).
export const LETTER_X = [76, 130, 184, 238] as const;
export const ROW_Y = [52, 102, 152, 202] as const;

export default function SscLetterGaps() {
  const common = GAP_LISTS[ODD === 0 ? 1 : 0];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · turn each cluster into its list of gaps
      </p>
      <svg
        viewBox="0 0 320 256"
        className="block h-auto w-full"
        role="img"
        aria-label="The four options CDGL, KLOT, MNQV and RSVZ, each letter with its position under it and the gap to the next letter above. CDGL, KLOT and MNQV all go plus 1, plus 3, plus 5. RSVZ goes plus 1, plus 3, plus 4: its last gap is one short, so it is the odd one out."
      >
        <rect x={10} y={ROW_Y[ODD] - 34} width={300} height={52} rx={6} className="fill-rose-100/70 dark:fill-rose-950/50" />
        {OPTIONS.map((o, r) => {
          const y = ROW_Y[r];
          const gaps = GAP_LISTS[r];
          return (
            <g key={o.word}>
              <text x={20} y={y} className="fill-muted-foreground text-[11px]">
                {o.label}
              </text>
              {Array.from(o.word, (ch, i) => (
                <g key={i}>
                  <text x={LETTER_X[i]} y={y} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
                    {ch}
                  </text>
                  <text x={LETTER_X[i]} y={y + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    {pos(ch)}
                  </text>
                </g>
              ))}
              {gaps.map((g, i) => {
                const x1 = LETTER_X[i] + 7;
                const x2 = LETTER_X[i + 1] - 7;
                const off = g !== common[i];
                return (
                  <g key={i}>
                    <path
                      d={`M ${x1} ${y - 12} Q ${(x1 + x2) / 2} ${y - 24} ${x2} ${y - 12}`}
                      fill="none"
                      strokeWidth={1.2}
                      className={off ? "stroke-rose-600 dark:stroke-rose-400" : "stroke-sky-600 dark:stroke-sky-400"}
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={y - 22}
                      textAnchor="middle"
                      className={off ? "fill-rose-700 text-[11px] font-bold dark:fill-rose-300" : "fill-sky-800 text-[10px] font-semibold dark:fill-sky-200"}
                    >
                      +{g}
                    </text>
                  </g>
                );
              })}
              {r === ODD && (
                <text x={300} y={y + 4} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
                  odd one
                </text>
              )}
            </g>
          );
        })}
        <text x={160} y={240} textAnchor="middle" className="fill-foreground text-[10.5px]">
          Three lists read +1, +3, +5. RSVZ ends +4: one short
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Write every letter&apos;s position, then the gap to the next letter. Put the four gap lists side by side: three are the
        same, and the odd one differs in just one place, here the last gap.
      </p>
    </div>
  );
}
