import { describe, it, expect } from "vitest";
import {
  selectAnswerCorrectEvents,
  answerCorrectDedupeKey,
  type CorrectEventQuestion,
} from "@/lib/mocks/correctEvents";

const q = (
  questionId: string,
  over: Partial<CorrectEventQuestion> = {}
): CorrectEventQuestion => ({ questionId, sectionKey: "maths", ...over });

describe("selectAnswerCorrectEvents — which correct mock answers are worth recording", () => {
  it("records a correct answer on a question the student had already missed", () => {
    const out = selectAnswerCorrectEvents([q("a")], { a: 1 }, new Set(["a"]));
    expect(out).toEqual([{ questionId: "a", sectionKey: "maths" }]);
  });

  it("STAYS SILENT on a correct answer to a never-missed question", () => {
    // The whole reason this is targeted rather than symmetric: emitting on
    // every correct answer costs 20,250 rows to change the drill pool by 484.
    // A question never missed is not in the pool and cannot leave it.
    const out = selectAnswerCorrectEvents([q("a")], { a: 1 }, new Set());
    expect(out).toEqual([]);
  });

  it("NEVER records a grace question, which verdictFor scores as correct", () => {
    // verdictFor returns 1 for grace REGARDLESS of what the student did — a
    // defective question the paper forgives. Recording that as retrieval
    // practice would climb the drill ladder on a question nobody answered,
    // and could retire it. answer_wrong skips grace for the same reason.
    const out = selectAnswerCorrectEvents(
      [q("a", { grace: true })],
      { a: 1 },
      new Set(["a"])
    );
    expect(out).toEqual([]);
  });

  it("ignores wrong and skipped verdicts — answer_wrong owns the first, nothing owns the second", () => {
    const out = selectAnswerCorrectEvents(
      [q("wrong"), q("skipped")],
      { wrong: -1, skipped: 0 },
      new Set(["wrong", "skipped"])
    );
    expect(out).toEqual([]);
  });

  it("ignores a question with no verdict at all rather than assuming one", () => {
    const out = selectAnswerCorrectEvents([q("a")], {}, new Set(["a"]));
    expect(out).toEqual([]);
  });

  it("emits at most one event per question even if the paper repeats it", () => {
    const out = selectAnswerCorrectEvents([q("a"), q("a")], { a: 1 }, new Set(["a"]));
    expect(out).toHaveLength(1);
  });

  it("carries the section through, matching what answer_wrong records", () => {
    const out = selectAnswerCorrectEvents(
      [q("a", { sectionKey: "gat-english" })],
      { a: 1 },
      new Set(["a"])
    );
    expect(out[0].sectionKey).toBe("gat-english");
  });

  it("keeps paper order, so a replay writes rows in the same sequence", () => {
    const out = selectAnswerCorrectEvents(
      [q("c"), q("a"), q("b")],
      { a: 1, b: 1, c: 1 },
      new Set(["a", "b", "c"])
    );
    expect(out.map((e) => e.questionId)).toEqual(["c", "a", "b"]);
  });

  it("handles an empty paper without inventing work", () => {
    expect(selectAnswerCorrectEvents([], {}, new Set())).toEqual([]);
  });
});

describe("answerCorrectDedupeKey", () => {
  it("is deterministic per attempt+question, so a re-run cannot double-write", () => {
    expect(answerCorrectDedupeKey("att-1", "q-1")).toBe("answer_correct:att-1:q-1");
    expect(answerCorrectDedupeKey("att-1", "q-1")).toBe(answerCorrectDedupeKey("att-1", "q-1"));
  });

  it("distinguishes the same question in a DIFFERENT attempt", () => {
    // Two sittings of the same paper are two separate pieces of evidence, and
    // collapsing them would silently drop the second correct answer — the one
    // that retires the question.
    expect(answerCorrectDedupeKey("att-1", "q-1")).not.toBe(
      answerCorrectDedupeKey("att-2", "q-1")
    );
  });
});
