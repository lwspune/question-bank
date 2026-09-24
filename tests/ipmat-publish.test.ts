/**
 * The IPMAT publish rule. This decides what becomes student-visible, so the
 * grace allowance is spec'd against the REAL sitting registry rather than a
 * stub — a declaration that drifts from the registry is the whole failure mode.
 */
import { describe, it, expect } from "vitest";
import { publishVerdict, isAnswered, type PublishCandidate } from "../scripts/ipmat/publish";
import { isGrace, ipmatIndoreSittings } from "../scripts/mocks/ipmatSittings";
import { sourceFileFor } from "../scripts/ipmat/config";

/** The 2024 sitting's declared grace map, straight from the registry. */
const grace2024 = ipmatIndoreSittings().find((s) => s.year === 2024)!.grace;
const isGrace2024 = (f: string | undefined, n: string | null) => isGrace(grace2024, f, n);
/** A sitting with no cancelled question. */
const grace2023 = ipmatIndoreSittings().find((s) => s.year === 2023)!.grace;
const isGrace2023 = (f: string | undefined, n: string | null) => isGrace(grace2023, f, n);

function row(over: Partial<PublishCandidate> = {}): PublishCandidate {
  return {
    questionNumber: "1",
    sourceFile: sourceFileFor("ipmat-indore", 2024, "MCQ"),
    questionFormat: "mcq",
    numericAnswer: null,
    hasCorrectOption: true,
    ...over,
  };
}

describe("isAnswered — the format decides which column carries the answer", () => {
  it("reads options for an mcq", () => {
    expect(isAnswered(row({ hasCorrectOption: true }))).toBe(true);
    expect(isAnswered(row({ hasCorrectOption: false }))).toBe(false);
  });

  it("reads numeric_answer for a numeric row, IGNORING options", () => {
    // A numeric row carries zero option rows, so an options-only test would
    // call all 148 of Indore's short-answer rows unanswered and hold them back.
    const n = { questionFormat: "numeric", hasCorrectOption: false } as const;
    expect(isAnswered(row({ ...n, numericAnswer: 7 }))).toBe(true);
    expect(isAnswered(row({ ...n, numericAnswer: 0 }))).toBe(true); // 0 is an answer
    expect(isAnswered(row({ ...n, numericAnswer: null }))).toBe(false);
  });
});

describe("publishVerdict", () => {
  it("publishes an answered row", () => {
    expect(publishVerdict(row(), isGrace2024)).toEqual({ publish: true, reason: "answered" });
  });

  it("publishes the DECLARED grace question even with no key", () => {
    // Indore 2024 MCQ Q7 — cancelled by the exam. It must be PUBLIC or the 2024
    // mock reconstructs at 89 and fails its own count check.
    const v = publishVerdict(
      row({ questionNumber: "7", hasCorrectOption: false }),
      isGrace2024
    );
    expect(v).toEqual({ publish: true, reason: "declared-grace" });
  });

  it("HOLDS an unkeyed row that is not declared grace", () => {
    // The property that makes this a rule rather than a rubber stamp: an
    // accidentally-unkeyed row must not ride out on the grace exception.
    expect(publishVerdict(row({ questionNumber: "8", hasCorrectOption: false }), isGrace2024))
      .toEqual({ publish: false, reason: "unanswered" });
  });

  it("scopes grace to the SECTION, not just the number", () => {
    // Question numbers restart at 1 per section, so a bare [7] would also grace
    // SA Q7 and VA Q7 — two perfectly good questions.
    for (const suffix of ["SA", "VA"] as const) {
      const v = publishVerdict(
        row({
          questionNumber: "7",
          hasCorrectOption: false,
          sourceFile: sourceFileFor("ipmat-indore", 2024, suffix),
        }),
        isGrace2024
      );
      expect(v.publish, `${suffix} Q7 must not inherit MCQ's grace`).toBe(false);
    }
  });

  it("scopes grace to the SITTING — 2023 MCQ Q7 is a normal question", () => {
    expect(
      publishVerdict(row({ questionNumber: "7", hasCorrectOption: false }), isGrace2023).publish
    ).toBe(false);
  });

  it("holds a numeric row whose answer never landed", () => {
    expect(
      publishVerdict(
        row({ questionFormat: "numeric", hasCorrectOption: false, numericAnswer: null, questionNumber: "3" }),
        isGrace2024
      )
    ).toEqual({ publish: false, reason: "unanswered" });
  });
});
