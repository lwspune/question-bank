/**
 * Questions defective as printed are grace in every mock (owner, 2026-10-29):
 * one committed list, applied by the one row builder every mock builder uses.
 */
import { describe, expect, it } from "vitest";
import { FLAWED_QUESTIONS, withFlawedGrace } from "@/lib/mocks/flawed";
import { mockTestRow } from "@/lib/mocks/row";
import type { MockPaperSnapshot, MockQuestionSnapshot } from "@/lib/mocks/reconstruct";

const q = (questionId: string, extra: Partial<MockQuestionSnapshot> = {}): MockQuestionSnapshot => ({
  position: 1,
  questionId,
  sectionKey: "maths",
  marks: 2,
  negMarks: 0,
  ...extra,
});

describe("withFlawedGrace", () => {
  const flawed = new Set(["bad"]);

  it("makes a listed question grace", () => {
    expect(withFlawedGrace([q("bad")], flawed)).toEqual([q("bad", { grace: true })]);
  });

  it("leaves every other question exactly as it was", () => {
    const ok = q("ok");
    expect(withFlawedGrace([ok], flawed)[0]).toStrictEqual(ok);
    expect("grace" in withFlawedGrace([ok], flawed)[0]).toBe(false);
  });

  it("keeps an existing grace and is idempotent", () => {
    const once = withFlawedGrace([q("bad"), q("x", { grace: true })], flawed);
    expect(once).toEqual([q("bad", { grace: true }), q("x", { grace: true })]);
    expect(withFlawedGrace(once, flawed)).toEqual(once);
  });

  it("does not mutate its input", () => {
    const input = [q("bad")];
    withFlawedGrace(input, flawed);
    expect(input[0].grace).toBeUndefined();
  });
});

describe("FLAWED_QUESTIONS", () => {
  it("lists each question once, by full id, with a reason", () => {
    const ids = FLAWED_QUESTIONS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of FLAWED_QUESTIONS) {
      expect(f.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(f.reason.trim().length).toBeGreaterThan(10);
    }
  });
});

describe("mockTestRow applies the flawed list", () => {
  it("writes grace for a listed question", () => {
    const listed = FLAWED_QUESTIONS[0]?.id;
    if (!listed) return; // an empty list has nothing to apply
    const snap: MockPaperSnapshot = {
      slug: "s",
      id: "00000000-0000-0000-0000-000000000001",
      examName: "E",
      examSlug: "e",
      paperCode: "p",
      title: "T",
      pyqYear: 2024,
      pyqMonth: null,
      durationSecs: 60,
      marking: { correct: 1, wrong: 0 },
      totalQuestions: 1,
      totalMarks: 1,
      sections: [{ key: "maths", label: "Maths", count: 1 }],
      questions: [q(listed)],
    };
    const row = mockTestRow(snap, {
      examId: "e",
      source: "pyq",
      scope: "full",
      pyqYear: null,
      pyqMonth: null,
      publish: false,
      now: new Date(0),
    });
    expect(row.questions[0].grace).toBe(true);
  });
});
