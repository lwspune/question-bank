/**
 * Item statistics — the per-sitting evidence row and the pooled view of it.
 *
 * See ITEM_STATS.md. The one rule that governs this whole module: rows are
 * stored at SITTING grain and pooled at READ time. Nothing here writes a pooled
 * number, because a pooled number cannot be un-pooled when one sitting turns out
 * to be bad.
 */

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;
export type OptionLabel = (typeof OPTION_LABELS)[number];

export type ItemStatSource = "tracker" | "vault_mock";

/** One sitting's response evidence for one question — a `question_item_stats` row. */
export type ItemStatRow = {
  questionId: string;
  source: ItemStatSource;
  /** The sitting: a tracker `exams.id` or a vault `mock_tests.id`. Opaque. */
  sourceRef: string;
  /** Non-null for `tracker` (whose cohort), null for `vault_mock` (the public population). */
  orgId: string | null;
  cohortLabel: string | null;
  seen: number;
  attempted: number;
  correct: number;
  skipped: number;
  /** Over ATTEMPTED responses only. Empty for numeric (NAT) items, which have no options. */
  choiceCounts: Partial<Record<OptionLabel, number>>;
  discTopCorrect: number | null;
  discTopN: number | null;
  discBottomCorrect: number | null;
  discBottomN: number | null;
  keyAtMeasurement: OptionLabel | null;
  /** The question AS MEASURED. A mismatch against the live hash makes this row STALE. */
  measuredContentHash: string;
  measuredAt: string;
};

export type SourceBreakdown = {
  source: ItemStatSource;
  sittings: number;
  attempted: number;
  correct: number;
  pValue: number;
};

/**
 * The pooled view.
 *
 * Note what is NOT here: a pooled `skipRate`. It does not pool — MHT-CET mocks
 * carry zero negative marking so skipping there is irrational, NDA costs -0.83,
 * and online 42% of rows are blank at 57.4% mean engagement. Pooling a deliberate
 * skip under penalty with an abandoned browser tab produces a number that means
 * nothing. Per-source skip counts stay on the rows for anyone who wants them.
 */
export type ItemStatAggregate = {
  attempted: number;
  correct: number;
  /** correct / attempted. NEVER correct / seen — that makes an easy-but-avoided item read as hard. */
  pValue: number;
  choiceCounts: Record<OptionLabel, number>;
  /** Top-27% rate minus bottom-27%, pooled as counts. Null when no sitting carried the split. */
  discrimination: number | null;
  sittings: number;
  bySource: SourceBreakdown[];
  /** Rows excluded because the question has changed since they were measured. */
  staleDropped: number;
};
