/**
 * The item-statistics pure core — pooling per-sitting evidence into the one
 * number a card shows, and turning it into a wrong-key LEAD.
 *
 * Two invariants carry most of the weight here and both have a test that fails
 * on the obvious wrong implementation:
 *
 *  1. A row measured against a DIFFERENT version of the question is stale and
 *     must not contribute. This bank flips keys in place and reshuffles option
 *     order, after which a stored {"B": 31} describes a different question.
 *     Same role as question_reviews.reviewed_content_hash (0074).
 *
 *  2. Discrimination pools as COUNTS, never as a mean of per-sitting rates.
 *     Averaging rates lets a 10-student sitting outweigh a 100-student one.
 *
 * See ITEM_STATS.md.
 */
import { describe, it, expect } from "vitest";
import { aggregateItemStats } from "@/lib/itemStats/aggregate";
import { parseCohortLabel } from "@/lib/itemStats/exposure";
import {
  computeLead,
  rankLeads,
  itemStatChip,
  MIN_N_CHIP,
  MIN_N_HEADLINE,
  MIN_N_LEAD,
} from "@/lib/itemStats/leads";
import type { ItemStatRow } from "@/lib/itemStats/types";

const HASH = "hash-current";

function row(over: Partial<ItemStatRow> = {}): ItemStatRow {
  return {
    questionId: "q1",
    source: "vault_mock",
    sourceRef: "sitting-1",
    orgId: null,
    cohortLabel: null,
    seen: 10,
    attempted: 10,
    correct: 5,
    skipped: 0,
    choiceCounts: { A: 5, B: 3, C: 1, D: 1 },
    discTopCorrect: null,
    discTopN: null,
    discBottomCorrect: null,
    discBottomN: null,
    keyAtMeasurement: "A",
    verdictMismatch: null,
    measuredContentHash: HASH,
    measuredAt: "2026-09-01T00:00:00Z",
    ...over,
  };
}

describe("aggregateItemStats", () => {
  it("returns null for no rows", () => {
    expect(aggregateItemStats([], HASH)).toBeNull();
  });

  it("sums across sittings and divides by ATTEMPTED, not seen", () => {
    const agg = aggregateItemStats(
      [
        row({ sourceRef: "s1", seen: 30, attempted: 20, correct: 5, skipped: 10 }),
        row({ sourceRef: "s2", seen: 30, attempted: 20, correct: 15, skipped: 10 }),
      ],
      HASH
    );
    expect(agg?.attempted).toBe(40);
    expect(agg?.correct).toBe(20);
    // 20/40, NOT 20/60 — skipping is a separate behaviour and must not depress p.
    expect(agg?.pValue).toBeCloseTo(0.5, 10);
    expect(agg?.sittings).toBe(2);
  });

  it("drops rows measured against a different version of the question", () => {
    const agg = aggregateItemStats(
      [
        row({ sourceRef: "s1", attempted: 10, correct: 9 }),
        row({ sourceRef: "s2", attempted: 10, correct: 0, measuredContentHash: "hash-old" }),
      ],
      HASH
    );
    expect(agg?.attempted).toBe(10);
    expect(agg?.correct).toBe(9);
    expect(agg?.staleDropped).toBe(1);
  });

  it("returns null when every row is stale", () => {
    const agg = aggregateItemStats(
      [row({ measuredContentHash: "hash-old" })],
      HASH
    );
    expect(agg).toBeNull();
  });

  it("returns null when nobody attempted — an undefined p-value is not zero", () => {
    const agg = aggregateItemStats(
      [row({ seen: 12, attempted: 0, correct: 0, skipped: 12, choiceCounts: {} })],
      HASH
    );
    expect(agg).toBeNull();
  });

  it("pools the choice distribution", () => {
    const agg = aggregateItemStats(
      [
        row({ sourceRef: "s1", choiceCounts: { A: 2, B: 1 } }),
        row({ sourceRef: "s2", choiceCounts: { A: 3, C: 4 } }),
      ],
      HASH
    );
    expect(agg?.choiceCounts).toEqual({ A: 5, B: 1, C: 4, D: 0 });
  });

  it("pools discrimination as COUNTS, not as a mean of per-sitting rates", () => {
    // Sitting 1 discriminates perfectly on 10 students; sitting 2 not at all on 100.
    // Mean-of-rates gives 0.40. Count-pooled gives 10/110 - 2/110 = 0.0727.
    const agg = aggregateItemStats(
      [
        row({
          sourceRef: "s1",
          attempted: 10,
          seen: 10,
          correct: 5,
          discTopCorrect: 9,
          discTopN: 10,
          discBottomCorrect: 1,
          discBottomN: 10,
        }),
        row({
          sourceRef: "s2",
          attempted: 100,
          seen: 100,
          correct: 50,
          discTopCorrect: 1,
          discTopN: 100,
          discBottomCorrect: 1,
          discBottomN: 100,
        }),
      ],
      HASH
    );
    expect(agg?.discrimination).toBeCloseTo(10 / 110 - 2 / 110, 10);
    expect(agg?.discrimination).not.toBeCloseTo(0.4, 2);
  });

  it("leaves discrimination null when no sitting carried the split", () => {
    expect(aggregateItemStats([row()], HASH)?.discrimination).toBeNull();
  });

  it("breaks the total down by source", () => {
    const agg = aggregateItemStats(
      [
        row({ source: "vault_mock", sourceRef: "m1", attempted: 10, seen: 10, correct: 2 }),
        row({
          source: "tracker",
          sourceRef: "e1",
          orgId: "org-1",
          attempted: 40,
          seen: 40,
          correct: 20,
        }),
      ],
      HASH
    );
    const tracker = agg?.bySource.find((s) => s.source === "tracker");
    const vault = agg?.bySource.find((s) => s.source === "vault_mock");
    expect(tracker?.attempted).toBe(40);
    expect(tracker?.pValue).toBeCloseTo(0.5, 10);
    expect(vault?.attempted).toBe(10);
    expect(vault?.pValue).toBeCloseTo(0.2, 10);
    // The pooled number is weighted by n, which is what makes precedence
    // unnecessary: the bigger cohort dominates on its own.
    expect(agg?.pValue).toBeCloseTo(22 / 50, 10);
  });
});

describe("itemStatChip", () => {
  it("shows nothing below the chip threshold", () => {
    const agg = aggregateItemStats([row({ seen: 9, attempted: 9, correct: 4 })], HASH);
    expect(itemStatChip(agg)).toBeNull();
  });

  it("is provisional between the chip and headline thresholds", () => {
    const agg = aggregateItemStats(
      [row({ seen: MIN_N_CHIP, attempted: MIN_N_CHIP, correct: 4 })],
      HASH
    );
    expect(itemStatChip(agg)?.provisional).toBe(true);
  });

  it("is firm at the headline threshold", () => {
    const agg = aggregateItemStats(
      [row({ seen: MIN_N_HEADLINE, attempted: MIN_N_HEADLINE, correct: 4 })],
      HASH
    );
    const chip = itemStatChip(agg);
    expect(chip?.provisional).toBe(false);
    expect(chip?.n).toBe(MIN_N_HEADLINE);
    expect(chip?.pct).toBe(20);
  });

  it("shows nothing for a null aggregate", () => {
    expect(itemStatChip(null)).toBeNull();
  });
});

describe("computeLead", () => {
  const many = (counts: Record<string, number>, correct: number) =>
    aggregateItemStats(
      [
        row({
          seen: Object.values(counts).reduce((a, b) => a + b, 0),
          attempted: Object.values(counts).reduce((a, b) => a + b, 0),
          correct,
          choiceCounts: counts,
        }),
      ],
      HASH
    );

  it("is silent below the lead threshold", () => {
    const agg = many({ A: 1, B: 8 }, 1);
    expect(agg!.attempted).toBeLessThan(MIN_N_LEAD);
    expect(computeLead("q1", agg, "A")).toBeNull();
  });

  it("is silent when the key outpulls every distractor", () => {
    const agg = many({ A: 12, B: 3, C: 2, D: 1 }, 12);
    expect(computeLead("q1", agg, "A")).toBeNull();
  });

  it("flags a distractor that outpulls the key, with its ratio", () => {
    const agg = many({ A: 4, B: 12, C: 2, D: 2 }, 4);
    const lead = computeLead("q1", agg, "A");
    expect(lead?.topDistractor).toEqual({ label: "B", count: 12 });
    expect(lead?.keyCount).toBe(4);
    expect(lead?.ratio).toBeCloseTo(3, 10);
  });

  it("does not divide by zero when the key was chosen by nobody", () => {
    const agg = many({ B: 12, C: 8 }, 0);
    const lead = computeLead("q1", agg, "A");
    expect(lead?.keyCount).toBe(0);
    // null ratio, not Infinity and not a crash — this is the sharpest signal
    // in the dataset and it must sort FIRST rather than fail to compute.
    expect(lead?.ratio).toBeNull();
  });

  it("is silent for a numeric item, which has no options to compare", () => {
    const agg = aggregateItemStats(
      [row({ seen: 30, attempted: 30, correct: 3, choiceCounts: {} })],
      HASH
    );
    expect(computeLead("q1", agg, null)).toBeNull();
  });

  it("is silent when the question has no key at all", () => {
    const agg = many({ A: 4, B: 12, C: 2, D: 2 }, 4);
    expect(computeLead("q1", agg, null)).toBeNull();
  });
});

describe("rankLeads", () => {
  it("puts key-never-chosen first, then the highest ratio, deterministically", () => {
    const mk = (id: string, keyCount: number, top: number, attempted: number) => ({
      questionId: id,
      attempted,
      keyCount,
      topDistractor: { label: "B" as const, count: top },
      ratio: keyCount === 0 ? null : top / keyCount,
      discrimination: null,
      verdictMismatch: 0,
      reason: (keyCount === 0 ? "key-never-chosen" : "distractor") as
        | "key-never-chosen"
        | "distractor",
    });
    const ranked = rankLeads([
      mk("ratio2", 5, 10, 20),
      mk("nokey", 0, 9, 20),
      mk("ratio3", 3, 9, 20),
      mk("ratio2-bigger-n", 5, 10, 40),
    ]);
    expect(ranked.map((l) => l.questionId)).toEqual([
      "nokey",
      "ratio3",
      "ratio2-bigger-n",
      "ratio2",
    ]);
  });
});

describe("verdict mismatch — the one signal that is not ambiguous", () => {
  const withMismatch = (mismatch: number | null, counts: Record<string, number>, correct: number) =>
    aggregateItemStats(
      [
        row({
          source: "tracker",
          orgId: "org-1",
          seen: Object.values(counts).reduce((a, b) => a + b, 0),
          attempted: Object.values(counts).reduce((a, b) => a + b, 0),
          correct,
          choiceCounts: counts,
          verdictMismatch: mismatch,
        }),
      ],
      HASH
    );

  it("sums across the rows that carry one", () => {
    const agg = aggregateItemStats(
      [
        row({ sourceRef: "s1", source: "tracker", orgId: "o", verdictMismatch: 3 }),
        row({ sourceRef: "s2", source: "tracker", orgId: "o", verdictMismatch: 4 }),
      ],
      HASH
    );
    expect(agg?.verdictMismatch).toBe(7);
  });

  it("stays NULL when no source could measure it — null is not zero", () => {
    // The vault stores responses, not marks, so it has nothing to disagree with.
    // Reporting 0 would claim "compared, none found".
    const agg = aggregateItemStats([row({ verdictMismatch: null })], HASH);
    expect(agg?.verdictMismatch).toBeNull();
  });

  it("counts a real zero as measured", () => {
    const agg = aggregateItemStats(
      [
        row({ sourceRef: "s1", source: "tracker", orgId: "o", verdictMismatch: 0 }),
        row({ sourceRef: "s2", verdictMismatch: null }),
      ],
      HASH
    );
    expect(agg?.verdictMismatch).toBe(0);
  });

  it("raises a lead even when the key outpulls every distractor", () => {
    // THE POINT. Without this the row never surfaces: its distribution looks
    // healthy and only the mark/key disagreement says anything is wrong.
    const agg = withMismatch(2, { A: 14, B: 3, C: 2, D: 1 }, 14);
    const lead = computeLead("q1", agg, "A");
    expect(lead).not.toBeNull();
    expect(lead?.reason).toBe("verdict-mismatch");
    expect(lead?.verdictMismatch).toBe(2);
  });

  it("is not gated on the attempt threshold — one mis-marked student is one too many", () => {
    const agg = withMismatch(1, { A: 3 }, 3);
    expect(agg!.attempted).toBeLessThan(MIN_N_LEAD);
    expect(computeLead("q1", agg, "A")?.reason).toBe("verdict-mismatch");
  });

  it("still raises one when the question has no current key to compare against", () => {
    // The key was there when it was measured (that is how a mismatch arose) and
    // is gone or ambiguous now. The defect does not stop existing.
    const agg = withMismatch(2, { A: 6, B: 4 }, 6);
    expect(computeLead("q1", agg, null)?.reason).toBe("verdict-mismatch");
  });

  it("outranks key-never-chosen and every ratio", () => {
    const base = {
      attempted: 20,
      topDistractor: { label: "B" as const, count: 10 },
      discrimination: null,
    };
    const ranked = rankLeads([
      { ...base, questionId: "ratio5", keyCount: 2, ratio: 5, verdictMismatch: 0, reason: "distractor" },
      { ...base, questionId: "nokey", keyCount: 0, ratio: null, verdictMismatch: 0, reason: "key-never-chosen" },
      { ...base, questionId: "mismatch1", keyCount: 9, ratio: null, verdictMismatch: 1, reason: "verdict-mismatch" },
      { ...base, questionId: "mismatch9", keyCount: 9, ratio: null, verdictMismatch: 9, reason: "verdict-mismatch" },
    ]);
    expect(ranked.map((l) => l.questionId)).toEqual(["mismatch9", "mismatch1", "nokey", "ratio5"]);
  });
});

describe("exposure — which cohorts have already sat this", () => {
  it("splits the tracker's comma-separated batch list", () => {
    // One exam record is routinely conducted for several batches at once, and
    // `exams.batch` is free text carrying all of them.
    expect(parseCohortLabel("APJ_NDA_12th_(26-27), APJ_NDA_6M_(Sep26)")).toEqual([
      "APJ_NDA_12th_(26-27)",
      "APJ_NDA_6M_(Sep26)",
    ]);
  });

  it("tolerates ragged spacing, empties and a null", () => {
    expect(parseCohortLabel("  A ,, B  ,")).toEqual(["A", "B"]);
    expect(parseCohortLabel(null)).toEqual([]);
    expect(parseCohortLabel("   ")).toEqual([]);
  });

  it("collects the distinct cohorts and the most recent sitting", () => {
    const agg = aggregateItemStats(
      [
        row({
          sourceRef: "e1",
          source: "tracker",
          orgId: "o",
          cohortLabel: "B1, B2",
          measuredAt: "2026-08-01T00:00:00Z",
        }),
        row({
          sourceRef: "e2",
          source: "tracker",
          orgId: "o",
          cohortLabel: "B2, B3",
          measuredAt: "2026-09-07T00:00:00Z",
        }),
      ],
      HASH
    );
    expect(agg?.exposure?.cohorts).toEqual(["B1", "B2", "B3"]);
    expect(agg?.exposure?.lastSatAt).toBe("2026-09-07T00:00:00Z");
  });

  it("is null when no sitting names a cohort — online mocks have none", () => {
    // NOT an empty list: "nobody has sat it in a class" and "we do not record
    // who sat it" are different claims.
    expect(aggregateItemStats([row()], HASH)?.exposure).toBeNull();
  });
});
