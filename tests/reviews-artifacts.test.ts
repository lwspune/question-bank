/**
 * Unit spec for reading the committed review artifacts into review verdicts.
 *
 * These files (*.crosscheck.json, *.mcq-verify.json) record what an AGENT
 * concluded at the time — not necessarily what was finally adjudicated. Two of
 * the rules below exist because of that gap:
 *
 *   - OUR-ANSWER-WRONG never maps automatically. The artifact says our answer
 *     was wrong; it does NOT say what happened next (key flipped? solution
 *     rewritten? or the finding itself overturned?). The one real instance —
 *     NCERT Ex 7.9 Q9 — was OVERTURNED: source-verification showed our (A) was
 *     right and the NCERT key wrong. Mapping it mechanically would write the
 *     exact opposite of the record. So it demands an override.
 *   - An mcq-verify row whose derived answer disagrees with the LIVE key demands
 *     an override too. Silence is not available: either the key was fixed after
 *     the artifact was written, or the question is defective and the official
 *     key was deliberately kept. Both are real; guessing between them is not.
 *
 * Everything else maps deterministically, and the mapping is total — an
 * unrecognised verdict string is reported, never silently dropped.
 */
import { describe, it, expect } from "vitest";
import {
  resolveCrosscheckVerdict,
  resolveMcqVerdict,
  artifactRunLabel,
  normalizeOptionLabel,
  overrideKey,
  findVerdictConflicts,
  liveRunLabel,
  resolveErratumVerdict,
} from "@/lib/reviews/artifacts";

describe("resolveCrosscheckVerdict", () => {
  it("maps agreement to confirmed", () => {
    expect(resolveCrosscheckVerdict("AGREE")).toEqual({ kind: "verdict", verdict: "confirmed" });
  });

  it("maps both book-error spellings to defect_preserved", () => {
    for (const raw of ["BOOK-WRONG", "BOOK-KEY-WRONG"]) {
      expect(resolveCrosscheckVerdict(raw)).toEqual({
        kind: "verdict",
        verdict: "defect_preserved",
      });
    }
  });

  it("maps every could-not-settle outcome to unverifiable", () => {
    for (const raw of ["CANT-READ-KEY", "NO-BOOK-ANSWER", "BOTH-DEFENSIBLE"]) {
      expect(resolveCrosscheckVerdict(raw)).toEqual({ kind: "verdict", verdict: "unverifiable" });
    }
  });

  it("refuses to map OUR-ANSWER-WRONG without an adjudication", () => {
    expect(resolveCrosscheckVerdict("OUR-ANSWER-WRONG")).toEqual({ kind: "needs_override" });
  });

  it("reports an unrecognised verdict rather than dropping the row", () => {
    expect(resolveCrosscheckVerdict("MAYBE?")).toEqual({ kind: "unknown", raw: "MAYBE?" });
  });

  it("is tolerant of surrounding whitespace and case", () => {
    expect(resolveCrosscheckVerdict("  agree ")).toEqual({ kind: "verdict", verdict: "confirmed" });
  });
});

describe("resolveMcqVerdict", () => {
  it("confirms when the blind derivation matches the live key", () => {
    expect(resolveMcqVerdict({ derivedAnswer: "C", liveCorrectLabel: "C" })).toEqual({
      kind: "verdict",
      verdict: "confirmed",
    });
  });

  it("demands an override when the derivation disagrees with the live key", () => {
    expect(resolveMcqVerdict({ derivedAnswer: "A", liveCorrectLabel: "B" })).toMatchObject({
      kind: "needs_override",
    });
  });

  it("demands an override when the live key cannot be read", () => {
    expect(resolveMcqVerdict({ derivedAnswer: "A", liveCorrectLabel: null })).toMatchObject({
      kind: "needs_override",
    });
  });

  it("normalises the derived answer before comparing", () => {
    for (const derived of ["b", " B ", "(B)", "B."]) {
      expect(resolveMcqVerdict({ derivedAnswer: derived, liveCorrectLabel: "B" })).toEqual({
        kind: "verdict",
        verdict: "confirmed",
      });
    }
  });

  it("does not treat a missing derived answer as agreement", () => {
    expect(resolveMcqVerdict({ derivedAnswer: null, liveCorrectLabel: "B" })).toMatchObject({
      kind: "needs_override",
    });
  });
});

describe("resolveErratumVerdict", () => {
  it("treats both bracket conventions as a preserved source defect", () => {
    // "answer-key error" = the book's key is wrong and our answer stands.
    // "misprint" = the question or the book's printed solution is broken and we
    // preserve and explain it. Neither means WE were wrong, so neither may land
    // in a corrective verdict.
    for (const bracket of [
      "[Textbook answer-key error: the printed key contradicts its own options]",
      "[Textbook misprint: the stem prints (2x+3) where expanding gives (3x+2)]",
      "  [Textbook note: the key omits the second branch]",
    ]) {
      expect(resolveErratumVerdict(bracket)).toEqual({
        kind: "verdict",
        verdict: "defect_preserved",
      });
    }
  });

  it("reports a bracket that is not an erratum rather than assuming one", () => {
    expect(resolveErratumVerdict("our answer was wrong")).toMatchObject({ kind: "unknown" });
    expect(resolveErratumVerdict("")).toMatchObject({ kind: "unknown" });
  });
});

describe("normalizeOptionLabel", () => {
  it("strips decoration and upper-cases", () => {
    expect(normalizeOptionLabel("(c)")).toBe("C");
    expect(normalizeOptionLabel(" d. ")).toBe("D");
  });
  it("returns null for nothing usable", () => {
    expect(normalizeOptionLabel(null)).toBeNull();
    expect(normalizeOptionLabel("  ")).toBeNull();
    expect(normalizeOptionLabel("both A and B")).toBeNull();
  });
});

describe("findVerdictConflicts", () => {
  // Two agent batches with overlapping ranges reviewed NCERT Ex 7.8 Q13-22 and
  // reached DIFFERENT verdicts (one found the key under the old numbering and
  // said AGREE; the other said the key wasn't on its page). Both rows carry the
  // same question + run label, so the dedupe constraint collapsed them and kept
  // whichever landed first — i.e. resolved a genuine disagreement by readdir
  // order. That must block, exactly like every other ambiguity here.
  const row = (questionId: string, verdict: string, ref = "r") => ({
    questionId,
    runLabel: "backfill:ncert:integrals:answer-key-crosscheck",
    verdict,
    ref,
  });

  it("finds a question given two different verdicts within one run", () => {
    const conflicts = findVerdictConflicts([
      row("q1", "unverifiable", "Ex 7.8 Q13"),
      row("q1", "confirmed", "Ex 7.8 Q13"),
      row("q2", "confirmed"),
    ]);
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0]).toMatchObject({ questionId: "q1", ref: "Ex 7.8 Q13" });
    expect([...conflicts[0].verdicts].sort()).toEqual(["confirmed", "unverifiable"]);
  });

  it("does not flag a repeated row that agrees with itself", () => {
    // Same verdict twice is the dedupe constraint doing its job — one fact.
    expect(findVerdictConflicts([row("q1", "confirmed"), row("q1", "confirmed")])).toEqual([]);
  });

  it("does not flag the same question reviewed by two DIFFERENT runs", () => {
    // Two independent passes disagreeing is real history, not a conflict to
    // resolve — both rows land and the newest wins as current belief.
    expect(
      findVerdictConflicts([
        { questionId: "q1", runLabel: "run-a", verdict: "confirmed", ref: "r" },
        { questionId: "q1", runLabel: "run-b", verdict: "defect_preserved", ref: "r" },
      ])
    ).toEqual([]);
  });

  it("returns nothing for an empty batch", () => {
    expect(findVerdictConflicts([])).toEqual([]);
  });
});

describe("artifactRunLabel + overrideKey", () => {
  it("names the pipeline, artifact and kind so a row traces back to its file", () => {
    expect(artifactRunLabel("ncert", "integrals", "crosscheck")).toBe(
      "backfill:ncert:integrals:answer-key-crosscheck"
    );
    expect(artifactRunLabel("stateboard", "vectors-12", "mcq-verify")).toBe(
      "backfill:stateboard:vectors-12:blind-mcq-verify"
    );
  });

  it("keys an override by pipeline, artifact and ref", () => {
    expect(overrideKey("ncert", "integrals", "Ex 7.9 Q9")).toBe("ncert/integrals::Ex 7.9 Q9");
  });

  it("distinguishes a live emission from a backfilled one", () => {
    // Live and backfilled rows for the same chapter must NOT share a run label:
    // they are separate passes, and merging them would let the dedupe key drop
    // one. Same suffix vocabulary so both read the same way in the report.
    expect(liveRunLabel("stateboard", "vectors-12", "mcq-verify")).toBe(
      "stateboard:vectors-12:blind-mcq-verify"
    );
    expect(liveRunLabel("stateboard", "vectors-12", "mcq-verify")).not.toBe(
      artifactRunLabel("stateboard", "vectors-12", "mcq-verify")
    );
  });
});
