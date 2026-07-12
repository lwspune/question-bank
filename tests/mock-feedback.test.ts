import { describe, it, expect } from "vitest";
import { RATINGS, isRating, validateFeedback } from "@/lib/mocks/feedback";

describe("isRating / RATINGS", () => {
  it("accepts the three difficulty ratings, rejects the rest", () => {
    for (const r of RATINGS) expect(isRating(r)).toBe(true);
    expect(isRating("just_right")).toBe(true);
    expect(isRating("meh")).toBe(false);
    expect(isRating("")).toBe(false);
    expect(isRating(null)).toBe(false);
    expect(isRating(3 as unknown)).toBe(false);
  });
});

describe("validateFeedback", () => {
  it("accepts a rating with no comment (comment → null)", () => {
    expect(validateFeedback({ rating: "too_hard" })).toEqual({
      ok: true,
      rating: "too_hard",
      comment: null,
    });
  });

  it("trims a comment and keeps it", () => {
    expect(validateFeedback({ rating: "just_right", comment: "  loved it  " })).toEqual({
      ok: true,
      rating: "just_right",
      comment: "loved it",
    });
  });

  it("collapses a blank comment to null", () => {
    expect(validateFeedback({ rating: "too_easy", comment: "   " })).toEqual({
      ok: true,
      rating: "too_easy",
      comment: null,
    });
  });

  it("caps an over-long comment", () => {
    const r = validateFeedback({ rating: "too_hard", comment: "x".repeat(1000) });
    expect(r.ok).toBe(true);
    if (r.ok) expect((r.comment as string).length).toBeLessThanOrEqual(500);
  });

  it("rejects an invalid rating", () => {
    const r = validateFeedback({ rating: "nope", comment: "hi" });
    expect(r).toEqual({ ok: false, message: expect.any(String) });
  });
});
