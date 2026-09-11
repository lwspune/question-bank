import {
  OPTION_LABELS,
  type ItemStatAggregate,
  type ItemStatRow,
  type ItemStatSource,
  type OptionLabel,
  type SourceBreakdown,
} from "./types";

/**
 * Pool per-sitting evidence into the one number a card shows.
 *
 * Aggregation happens HERE, at read time, never in the database. Rows are stored
 * at sitting grain precisely so a bad sitting can be deleted, an institute that
 * leaves can be removed, and "did the key fix work" stays answerable. A pooled
 * number cannot be un-pooled — that is the `questions.attempt_stats` mistake
 * (migration 0010), which is why this module exists rather than that column.
 *
 * `currentContentHash` is REQUIRED rather than optional, and rows that disagree
 * with it are dropped. Statistics describe the question AS IT WAS; this bank
 * flips keys in place and reshuffles option order, after which a stored
 * {"B": 31} is measuring something else. Making the caller pass the hash is what
 * stops the staleness rule being forgotten at a call site.
 */
export function aggregateItemStats(
  rows: ItemStatRow[],
  currentContentHash: string
): ItemStatAggregate | null {
  let staleDropped = 0;
  const live: ItemStatRow[] = [];
  for (const r of rows) {
    if (r.measuredContentHash !== currentContentHash) {
      staleDropped++;
      continue;
    }
    live.push(r);
  }
  if (live.length === 0) return null;

  let attempted = 0;
  let correct = 0;
  const choiceCounts = { A: 0, B: 0, C: 0, D: 0 } as Record<OptionLabel, number>;

  let topCorrect = 0;
  let topN = 0;
  let bottomCorrect = 0;
  let bottomN = 0;
  let discSittings = 0;

  // Summed only over rows that could measure it. If none could, the result is
  // NULL rather than 0 — "not measurable" and "compared, none found" are
  // different claims, and a 0 here would assert the second.
  let mismatch: number | null = null;

  const bySourceMap = new Map<
    ItemStatSource,
    { sittings: number; attempted: number; correct: number }
  >();

  for (const r of live) {
    attempted += r.attempted;
    correct += r.correct;
    for (const label of OPTION_LABELS) {
      choiceCounts[label] += r.choiceCounts[label] ?? 0;
    }

    // Discrimination pools as COUNTS, never as a mean of per-sitting rates —
    // averaging rates lets a 10-student sitting outweigh a 100-student one. The
    // split itself is computed within a sitting (against that sitting's own
    // totals), because ranking students across cohorts of differing ability
    // would be meaningless.
    if (
      r.discTopCorrect !== null &&
      r.discTopN !== null &&
      r.discBottomCorrect !== null &&
      r.discBottomN !== null
    ) {
      topCorrect += r.discTopCorrect;
      topN += r.discTopN;
      bottomCorrect += r.discBottomCorrect;
      bottomN += r.discBottomN;
      discSittings++;
    }

    if (r.verdictMismatch !== null) mismatch = (mismatch ?? 0) + r.verdictMismatch;

    const bucket = bySourceMap.get(r.source) ?? {
      sittings: 0,
      attempted: 0,
      correct: 0,
    };
    bucket.sittings += 1;
    bucket.attempted += r.attempted;
    bucket.correct += r.correct;
    bySourceMap.set(r.source, bucket);
  }

  // An undefined p-value is not zero. A question every one of 30 students
  // skipped has no difficulty reading at all, and rendering "0%" would assert
  // one — the absence-becomes-an-assertion shape.
  if (attempted === 0) return null;

  const discrimination =
    discSittings > 0 && topN > 0 && bottomN > 0
      ? topCorrect / topN - bottomCorrect / bottomN
      : null;

  const bySource: SourceBreakdown[] = [...bySourceMap.entries()]
    .map(([source, b]) => ({
      source,
      sittings: b.sittings,
      attempted: b.attempted,
      correct: b.correct,
      // Cannot be reached with attempted === 0 unless another source carried
      // the total; guarded so the breakdown can never emit NaN.
      pValue: b.attempted > 0 ? b.correct / b.attempted : 0,
    }))
    .sort((a, b) => a.source.localeCompare(b.source));

  return {
    attempted,
    correct,
    // correct / ATTEMPTED. Never correct / seen: mixing them makes an
    // easy-but-avoided item read as hard, and skipping deserves its own number.
    pValue: correct / attempted,
    choiceCounts,
    discrimination,
    sittings: live.length,
    verdictMismatch: mismatch,
    bySource,
    staleDropped,
  };
}
