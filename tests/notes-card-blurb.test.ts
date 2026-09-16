import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { firstSentence, chapterCardBlurb } from "@/lib/notes/cardBlurb";

/**
 * The /notes card blurb — the short line that stands in for a chapter's full
 * `intro` on the SUBJECT-LANDING CARD, the chapter `<meta description>` and its
 * JSON-LD description.
 *
 * Why it exists: one `intro` string was doing four jobs. It is written for the
 * chapter page's hero (mean 171 words, max 267), which made the listing card a
 * wall of prose — `/notes/nda-maths` alone rendered ~5,100 words of intro across
 * 30 cards — and shipped a ~1,100-char `<meta description>` on all 84 chapter
 * pages against Google's ~155-char truncation.
 *
 * Worse than long, it was WRONG on the card: 18 of 84 intros point at something
 * ("each note BELOW", "the subtopics that follow") that is true on the chapter
 * page and false on a listing card, where what sits below is the NEXT chapter.
 *
 * The band below is the guard. A first sentence outside 8-40 words means the
 * automatic fallback is not card-sized, and that chapter must author its own
 * `cardBlurb` — so a future 267-word intro cannot silently become a card again.
 */
describe("firstSentence", () => {
  it("cuts at the first sentence terminator", () => {
    expect(firstSentence("One thing. Two thing.")).toBe("One thing.");
  });

  it("returns the whole string when there is no terminator", () => {
    expect(firstSentence("No terminator here")).toBe("No terminator here");
  });

  it("keeps a single trailing-period sentence whole", () => {
    expect(firstSentence("Only one sentence.")).toBe("Only one sentence.");
  });

  it("cuts at a question mark", () => {
    expect(firstSentence("Why is the outer core liquid? Because.")).toBe(
      "Why is the outer core liquid?"
    );
  });

  it("does NOT cut inside a decimal (no space follows the point)", () => {
    expect(firstSentence("It runs 2.5 metres long. Next.")).toBe(
      "It runs 2.5 metres long."
    );
  });

  it("trims surrounding whitespace", () => {
    expect(firstSentence("  Padded.  Next.  ")).toBe("Padded.");
  });
});

describe("chapterCardBlurb", () => {
  it("prefers an authored cardBlurb over the intro", () => {
    expect(
      chapterCardBlurb({ intro: "Long intro. More.", cardBlurb: "Authored." })
    ).toBe("Authored.");
  });

  it("falls back to the intro's first sentence", () => {
    expect(chapterCardBlurb({ intro: "Long intro. More." })).toBe("Long intro.");
  });

  it("treats a blank cardBlurb as absent rather than shipping an empty card", () => {
    expect(chapterCardBlurb({ intro: "Long intro. More.", cardBlurb: "   " })).toBe(
      "Long intro."
    );
  });
});

describe("every shipped chapter has a card-sized blurb", () => {
  for (const c of NOTES_CHAPTERS) {
    it(`${c.subjectRoute}/${c.chapterSlug} blurb is 8-40 words`, () => {
      const words = chapterCardBlurb(c.chapter).split(/\s+/).filter(Boolean).length;
      expect(words).toBeGreaterThanOrEqual(8);
      expect(words).toBeLessThanOrEqual(40);
    });
  }

  it("no blurb points at something only the chapter page has below it", () => {
    // A deictic reference is true in the hero and false on a listing card.
    const deictic = /\b(below|that follow|follows below|on this page)\b/i;
    const bad = NOTES_CHAPTERS.filter((c) => deictic.test(chapterCardBlurb(c.chapter)))
      .map((c) => `${c.subjectRoute}/${c.chapterSlug}`);
    expect(bad).toEqual([]);
  });
});
