/**
 * Unit spec for the post-ingestion review record (pure).
 *
 * A review row asserts "someone checked this question and concluded X". The
 * validation here exists so a row can never make that claim loosely:
 *
 *   - `reviewedContentHash` is MANDATORY and non-blank. It is the fingerprint of
 *     the question AS REVIEWED, and it is what later makes the claim falsifiable
 *     (see staleness). A row without it would be an unfalsifiable assertion —
 *     the exact failure the whole feature exists to remove. Same reasoning as
 *     migration 0040 storing derived_model/derived_at beside a derived field.
 *   - `runLabel` is MANDATORY. An orphan review with no run cannot be audited
 *     back to the pass that produced it.
 *   - `method`/`verdict` are closed sets, mirrored by CHECK constraints in
 *     migration 0074. Validating here too means a script fails at the boundary
 *     with a readable reason rather than on a Postgres constraint violation
 *     halfway through a batch.
 *   - `source` defaults to 'live'. A reconstructed/backfilled row must opt in
 *     explicitly so it can never pass as a first-hand record.
 */
import { describe, it, expect } from "vitest";
import {
  sanitizeReviewRecord,
  sanitizeReviewRecords,
  type ReviewInput,
} from "@/lib/reviews/record";
import { REVIEW_NOTE_MAX } from "@/lib/reviews/types";

const valid: ReviewInput = {
  questionId: "f9ffc6a6-4af7-4a53-aacf-fa6f2dd80421",
  reviewedContentHash: "abc123",
  method: "textbook_answer_key",
  verdict: "defect_preserved",
  runLabel: "ncert:cbse-12:integrals:answer-key-crosscheck",
};

function expectOk(input: ReviewInput) {
  const result = sanitizeReviewRecord(input);
  if (!result.ok) throw new Error(`expected ok, got: ${result.reason}`);
  return result.row;
}

describe("sanitizeReviewRecord", () => {
  it("maps a valid input to a DB row", () => {
    expect(expectOk(valid)).toEqual({
      question_id: "f9ffc6a6-4af7-4a53-aacf-fa6f2dd80421",
      reviewed_content_hash: "abc123",
      method: "textbook_answer_key",
      verdict: "defect_preserved",
      run_label: "ncert:cbse-12:integrals:answer-key-crosscheck",
      derived_model: null,
      source: "live",
      note: null,
    });
  });

  it("defaults source to live and requires backfilled to be explicit", () => {
    expect(expectOk(valid).source).toBe("live");
    expect(expectOk({ ...valid, source: "backfilled" }).source).toBe("backfilled");
  });

  it("rejects an unknown source", () => {
    const result = sanitizeReviewRecord({
      ...valid,
      source: "reconstructed" as never,
    });
    expect(result).toMatchObject({ ok: false });
  });

  it("rejects a missing or blank reviewedContentHash", () => {
    for (const hash of ["", "   "]) {
      const result = sanitizeReviewRecord({ ...valid, reviewedContentHash: hash });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.reason).toMatch(/reviewedContentHash/);
    }
  });

  it("rejects a blank questionId", () => {
    expect(sanitizeReviewRecord({ ...valid, questionId: "  " }).ok).toBe(false);
  });

  it("rejects a blank runLabel and trims a padded one", () => {
    expect(sanitizeReviewRecord({ ...valid, runLabel: "" }).ok).toBe(false);
    expect(expectOk({ ...valid, runLabel: "  grounding:batch-7  " }).run_label).toBe(
      "grounding:batch-7"
    );
  });

  it("rejects an unknown method", () => {
    const result = sanitizeReviewRecord({ ...valid, method: "vibes" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/method/);
  });

  it("rejects an unknown verdict", () => {
    const result = sanitizeReviewRecord({ ...valid, verdict: "superseded" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/verdict/);
  });

  it("normalises an empty note to null and preserves a real one", () => {
    expect(expectOk({ ...valid, note: "   " }).note).toBeNull();
    expect(expectOk({ ...valid, note: "  key contradicts its own options  " }).note).toBe(
      "key contradicts its own options"
    );
  });

  it("rejects an over-long note rather than silently truncating it", () => {
    const result = sanitizeReviewRecord({ ...valid, note: "x".repeat(REVIEW_NOTE_MAX + 1) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/note/);
  });

  it("carries derivedModel through, defaulting to null", () => {
    expect(expectOk({ ...valid, derivedModel: "claude-opus-5" }).derived_model).toBe(
      "claude-opus-5"
    );
    expect(expectOk({ ...valid, derivedModel: null }).derived_model).toBeNull();
  });
});

describe("sanitizeReviewRecords", () => {
  it("partitions a batch into rows and errors, keeping the input index", () => {
    const { rows, errors } = sanitizeReviewRecords([
      valid,
      { ...valid, verdict: "nonsense" },
      { ...valid, questionId: "other-id" },
    ]);
    expect(rows).toHaveLength(2);
    expect(rows[1].question_id).toBe("other-id");
    expect(errors).toHaveLength(1);
    expect(errors[0].index).toBe(1);
    expect(errors[0].reason).toMatch(/verdict/);
  });

  it("returns empty arrays for an empty batch", () => {
    expect(sanitizeReviewRecords([])).toEqual({ rows: [], errors: [] });
  });
});
