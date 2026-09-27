import { describe, it, expect } from "vitest";
import {
  RATINGS,
  isRating,
  validateFeedback,
  ratingDistribution,
  summarizeMockRatings,
} from "@/lib/mocks/feedback";

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

describe("ratingDistribution", () => {
  it("counts each rating and ignores an unknown value", () => {
    expect(ratingDistribution(["too_hard", "just_right", "too_hard", "meh"])).toEqual({
      too_easy: 0,
      just_right: 1,
      too_hard: 2,
    });
  });
});

describe("summarizeMockRatings", () => {
  const row = (
    rating: string,
    mockSlug: string,
    createdAt: string,
    comment: string | null = null
  ) => ({ rating, comment, createdAt, mockSlug, mockTitle: `Title ${mockSlug}`, who: "x" });

  it("rolls every row into one distribution, across mocks", () => {
    const s = summarizeMockRatings([
      row("too_hard", "a", "2026-09-01T00:00:00Z"),
      row("just_right", "b", "2026-09-02T00:00:00Z"),
      row("too_hard", "b", "2026-09-03T00:00:00Z"),
    ]);
    expect(s.count).toBe(3);
    expect(s.distribution).toEqual({ too_easy: 0, just_right: 1, too_hard: 2 });
  });

  it("groups by mock, most-rated first, ties by title", () => {
    const s = summarizeMockRatings([
      row("too_hard", "c", "2026-09-01T00:00:00Z"),
      row("just_right", "b", "2026-09-02T00:00:00Z"),
      row("too_hard", "b", "2026-09-03T00:00:00Z"),
      row("too_easy", "a", "2026-09-04T00:00:00Z"),
    ]);
    expect(s.byMock.map((m) => m.slug)).toEqual(["b", "a", "c"]);
    expect(s.byMock[0]).toEqual({
      slug: "b",
      title: "Title b",
      count: 2,
      distribution: { too_easy: 0, just_right: 1, too_hard: 1 },
    });
  });

  it("lists only rows with a comment, newest first, capped", () => {
    const rows = [
      row("too_hard", "a", "2026-09-01T00:00:00Z", "old"),
      row("just_right", "a", "2026-09-03T00:00:00Z", null),
      row("too_easy", "b", "2026-09-05T00:00:00Z", "new"),
    ];
    expect(summarizeMockRatings(rows).comments.map((c) => c.comment)).toEqual(["new", "old"]);
    expect(summarizeMockRatings(rows, { maxComments: 1 }).comments).toHaveLength(1);
  });

  it("is empty for no rows", () => {
    expect(summarizeMockRatings([])).toEqual({
      count: 0,
      distribution: { too_easy: 0, just_right: 0, too_hard: 0 },
      byMock: [],
      comments: [],
    });
  });
});
