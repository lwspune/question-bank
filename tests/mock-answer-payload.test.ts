import { describe, expect, it } from "vitest";
import { AnswerBodySchema } from "@/lib/mocks/answerPayload";

const body = (selectedLabel: unknown) => ({
  questionId: "3f1c2a8e-5b7d-4e2f-9a1b-0c3d4e5f6a7b",
  selectedLabel,
  isFlagged: false,
  timeSpentSecs: 12,
});

describe("AnswerBodySchema (PATCH /api/mock/attempt/[id]/answer)", () => {
  it("accepts A to E, since IMAT prints five options", () => {
    for (const label of ["A", "B", "C", "D", "E"]) {
      expect(AnswerBodySchema.safeParse(body(label)).success).toBe(true);
    }
  });

  it("rejects a letter past E and a lowercase letter", () => {
    expect(AnswerBodySchema.safeParse(body("F")).success).toBe(false);
    expect(AnswerBodySchema.safeParse(body("e")).success).toBe(false);
  });

  it("still refuses an option and a value together", () => {
    expect(AnswerBodySchema.safeParse({ ...body("E"), numericResponse: 4 }).success).toBe(false);
  });

  it("accepts a cleared answer", () => {
    expect(AnswerBodySchema.safeParse(body(null)).success).toBe(true);
  });
});
