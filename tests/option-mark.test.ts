/**
 * How an option looks once a question's answer is showing, shared by the
 * /browse card and the /board reader (2026-10-04) so the two cannot drift:
 * board readers had learned tap-to-check on /browse and tapped board options
 * that did nothing.
 */
import { describe, it, expect } from "vitest";
import { optionMark } from "@/lib/questions/optionMark";

describe("optionMark", () => {
  it("marks nothing before the answer shows", () => {
    expect(optionMark({ revealed: false, picked: true, isCorrect: true })).toBe("none");
    expect(optionMark({ revealed: false, picked: true, isCorrect: false })).toBe("none");
  });

  it("marks the right option, picked or not", () => {
    expect(optionMark({ revealed: true, picked: false, isCorrect: true })).toBe("correct");
    expect(optionMark({ revealed: true, picked: true, isCorrect: true })).toBe("correct");
  });

  it("marks a wrong pick", () => {
    expect(optionMark({ revealed: true, picked: true, isCorrect: false })).toBe("wrong");
  });

  it("leaves unpicked wrong options plain", () => {
    expect(optionMark({ revealed: true, picked: false, isCorrect: false })).toBe("none");
  });

  it("never paints a pick wrong on a cancelled question", () => {
    expect(optionMark({ revealed: true, picked: true, isCorrect: false, cancelled: true })).toBe("none");
  });
});
