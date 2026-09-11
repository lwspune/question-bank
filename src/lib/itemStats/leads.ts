import {
  OPTION_LABELS,
  type ItemStatAggregate,
  type OptionLabel,
} from "./types";

/**
 * Thresholds, set from the measured distribution rather than a borrowed
 * convention. See ITEM_STATS.md.
 *
 * The tracker's own spec publishes nothing below 20 attempts. That is right for
 * a difficulty MEASUREMENT and slightly wrong for a teacher choosing between two
 * questions, for whom "42% of 14" beats nothing as long as `n` is on screen — so
 * the chip appears from 10 and is marked provisional until 20. A deliberate
 * divergence, not an oversight.
 */
export const MIN_N_CHIP = 10;
export const MIN_N_HEADLINE = 20;
export const MIN_N_LEAD = 10;

/**
 * Default cut for the leads view. Measured: ratio >= 1 yields ~179 items across
 * both sources — a pile nobody works through — while >= 2 yields ~80, about a
 * week at 10-15 a day. Below 2 at n ~ 12 you are looking at six responses
 * against five, which is noise.
 */
export const LEAD_RATIO_DEFAULT = 2;

export type ItemStatChip = {
  /** Whole percent, for display. */
  pct: number;
  n: number;
  /** True between MIN_N_CHIP and MIN_N_HEADLINE — render it muted. */
  provisional: boolean;
};

export function itemStatChip(agg: ItemStatAggregate | null): ItemStatChip | null {
  if (!agg || agg.attempted < MIN_N_CHIP) return null;
  return {
    pct: Math.round(agg.pValue * 100),
    n: agg.attempted,
    provisional: agg.attempted < MIN_N_HEADLINE,
  };
}

/**
 * A question where a distractor outpulled the keyed answer.
 *
 * A LEAD, never a verdict. It means one of three things and the data cannot
 * separate them: the key is wrong; the question is hard and the distractor is a
 * well-built trap (which is what a good PYQ does); or a systematic misconception
 * worth teaching to. Adjudication is a human reading the question, and the
 * outcome belongs in `question_reviews` (migration 0074).
 */
export type Lead = {
  questionId: string;
  attempted: number;
  keyCount: number;
  topDistractor: { label: OptionLabel; count: number } | null;
  /**
   * topDistractor / keyCount. NULL when the key was chosen by NOBODY — the
   * sharpest signal in the dataset, and the reason this is not a number: an
   * infinite ratio must sort first rather than divide by zero.
   */
  ratio: number | null;
  discrimination: number | null;
};

export function computeLead(
  questionId: string,
  agg: ItemStatAggregate | null,
  keyLabel: OptionLabel | null
): Lead | null {
  if (!agg) return null;
  // No key, nothing to outpull. Covers numeric (NAT) items, which have no
  // options at all, and any row where no option is flagged correct.
  if (keyLabel === null) return null;
  if (agg.attempted < MIN_N_LEAD) return null;

  const keyCount = agg.choiceCounts[keyLabel];

  let top: { label: OptionLabel; count: number } | null = null;
  for (const label of OPTION_LABELS) {
    if (label === keyLabel) continue;
    const count = agg.choiceCounts[label];
    if (count > 0 && (top === null || count > top.count)) {
      top = { label, count };
    }
  }

  // Also the numeric case: an empty distribution leaves `top` null.
  if (top === null) return null;
  if (top.count <= keyCount) return null;

  return {
    questionId,
    attempted: agg.attempted,
    keyCount,
    topDistractor: top,
    ratio: keyCount === 0 ? null : top.count / keyCount,
    discrimination: agg.discrimination,
  };
}

/**
 * Work-list order: key-never-chosen first, then hardest-pulling ratio, then the
 * best-evidenced. The final tiebreak on id exists so the queue does not reshuffle
 * between page loads.
 */
export function rankLeads(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => {
    const aNoKey = a.ratio === null;
    const bNoKey = b.ratio === null;
    if (aNoKey !== bNoKey) return aNoKey ? -1 : 1;
    if (!aNoKey && !bNoKey && a.ratio !== b.ratio) {
      return (b.ratio as number) - (a.ratio as number);
    }
    if (a.attempted !== b.attempted) return b.attempted - a.attempted;
    return a.questionId.localeCompare(b.questionId);
  });
}
