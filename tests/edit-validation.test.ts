import { describe, it, expect } from "vitest";
import { validateEditPayload } from "@/lib/questions/edit";
import { contentHash } from "@/lib/upload/hash";

const VALID = {
  text: "What is 1+1?",
  context: null,
  difficulty: "EASY" as const,
  solution: "Two.",
  imageUrl: null,
  subjectId: "11111111-1111-1111-1111-111111111111",
  chapterId: "22222222-2222-2222-2222-222222222222",
  subtopicId: "33333333-3333-3333-3333-333333333333",
  visibility: "PRIVATE" as const,
  correct: "A" as const,
  options: [
    { label: "A" as const, text: "2", imageUrl: null },
    { label: "B" as const, text: "3", imageUrl: null },
    { label: "C" as const, text: "1", imageUrl: null },
    { label: "D" as const, text: "0", imageUrl: null },
  ],
};

describe("validateEditPayload", () => {
  it("accepts a fully valid payload", () => {
    const result = validateEditPayload(VALID);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.contentHash).toMatch(/^[0-9a-f]{64}$/);
      expect(result.payload.text).toBe(VALID.text);
    }
  });

  it("computes the same hash as the upload pipeline", () => {
    const result = validateEditPayload(VALID);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const expected = contentHash(
        VALID.text,
        VALID.options.map((o) => o.text),
        VALID.correct
      );
      expect(result.contentHash).toBe(expected);
    }
  });

  it("rejects empty question text", () => {
    const result = validateEditPayload({ ...VALID, text: "" });
    expect(result.ok).toBe(false);
  });

  it("rejects whitespace-only question text", () => {
    const result = validateEditPayload({ ...VALID, text: "   " });
    expect(result.ok).toBe(false);
  });

  it("rejects an unsupported difficulty", () => {
    const result = validateEditPayload({ ...VALID, difficulty: "EXTREME" });
    expect(result.ok).toBe(false);
  });

  it("rejects when there are not exactly 4 options", () => {
    const result = validateEditPayload({
      ...VALID,
      options: VALID.options.slice(0, 3),
    });
    expect(result.ok).toBe(false);
  });

  it("rejects when option labels are not exactly A/B/C/D", () => {
    const result = validateEditPayload({
      ...VALID,
      options: [
        { label: "A" as const, text: "x", imageUrl: null },
        { label: "A" as const, text: "y", imageUrl: null },
        { label: "B" as const, text: "z", imageUrl: null },
        { label: "C" as const, text: "w", imageUrl: null },
      ],
    });
    expect(result.ok).toBe(false);
  });

  it("rejects empty option text", () => {
    const opts = VALID.options.map((o) => ({ ...o }));
    opts[2].text = "";
    const result = validateEditPayload({ ...VALID, options: opts });
    expect(result.ok).toBe(false);
  });

  it("rejects when subjectId is not a UUID", () => {
    const result = validateEditPayload({ ...VALID, subjectId: "not-a-uuid" });
    expect(result.ok).toBe(false);
  });

  it("accepts null context, solution, imageUrl, and subtopicId", () => {
    const result = validateEditPayload({
      ...VALID,
      context: null,
      solution: null,
      imageUrl: null,
      subtopicId: null,
    });
    expect(result.ok).toBe(true);
  });

  it("trims question and option text in the validated payload", () => {
    const result = validateEditPayload({
      ...VALID,
      text: "  What is 1+1?  ",
      options: VALID.options.map((o) => ({ ...o, text: ` ${o.text} ` })),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.text).toBe("What is 1+1?");
      expect(result.payload.options[0].text).toBe("2");
    }
  });
});
