import { describe, expect, it } from "vitest";
import { requiredStampRefs, unstampedProblem } from "../scripts/ncert/provenance";

// 2026-11-17 (SUGGESTIONS 2026-09-09): the State Board lane refuses to publish an
// unstamped derived answer; the NCERT lane had the stamp script but no refusal, and
// stamping was forgotten on 28 of 48 cross-checked chapters.
describe("requiredStampRefs", () => {
  it("a book with no answer key: every row except worked examples needs the stamp", () => {
    const r = requiredStampRefs({ hasAnswerKey: false, questionRefs: ["Eg 1.1", "Ex 1.1", "Ex 1.2"], crosscheck: null });
    expect(r.refs).toEqual(["Ex 1.1", "Ex 1.2"]);
  });

  it("a keyed book: only the rows the cross-check recorded as NO-KEY-ENTRY", () => {
    const r = requiredStampRefs({
      hasAnswerKey: true,
      questionRefs: [],
      crosscheck: [
        { ref: "Ex 1.1", verdict: "AGREE" },
        { ref: "Ex 1.3", verdict: "NO-KEY-ENTRY" },
        { ref: "Ex 1.4", verdict: "BOOK-KEY-WRONG" },
      ],
    });
    expect(r.refs).toEqual(["Ex 1.3"]);
  });

  it("a keyed book with no cross-check on disk cannot be judged, so it throws", () => {
    expect(() => requiredStampRefs({ hasAnswerKey: true, questionRefs: [], crosscheck: null })).toThrow(/cross-check/);
  });

  it("refuses a worked example recorded as NO-KEY-ENTRY", () => {
    expect(() =>
      requiredStampRefs({ hasAnswerKey: true, questionRefs: [], crosscheck: [{ ref: "Eg 2.1", verdict: "NO-KEY-ENTRY" }] })
    ).toThrow(/worked example/);
  });
});

describe("unstampedProblem", () => {
  const rows = [
    { question_number: "Ex 1.1", derived_model: "m" },
    { question_number: "Ex 1.2", derived_model: null },
  ];
  it("names the required rows still unstamped", () => {
    expect(unstampedProblem(["Ex 1.1", "Ex 1.2"], rows)).toMatch(/1 of 2.*Ex 1\.2/);
  });
  it("passes when every required row is stamped", () => {
    expect(unstampedProblem(["Ex 1.1"], rows)).toBeNull();
  });
  it("ignores a required ref the bank does not hold (not committed yet)", () => {
    expect(unstampedProblem(["Ex 9.9"], rows)).toBeNull();
  });
});
