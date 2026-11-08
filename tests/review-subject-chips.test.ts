/**
 * Review's subject chips (2026-11-09, step 4): shown when the waiting
 * questions span more than one subject, each with its count; a chip narrows
 * the list, and the lead button then starts with that subject's biggest
 * chapter (the drill narrows to a chapter, not a subject).
 */
import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FixOverview from "@/app/review/FixOverview";
import type { FixList } from "@/lib/review/fixList";

const list: FixList = {
  total: 9,
  inPlan: 0,
  chapters: [
    { chapterId: "c1", name: "Probability", place: "Mathematics · NDA", count: 6, wrong: 6, reviewLater: 0, vUnclear: 0, inPlan: 0 },
    { chapterId: "c2", name: "Vectors", place: "Mathematics · NDA", count: 3, wrong: 3, reviewLater: 0, vUnclear: 0, inPlan: 0 },
  ],
};
const subjects = [
  { subject: "Mathematics", count: 9 },
  { subject: "Physics", count: 4 },
];

const html = (subject: string | null, subs = subjects) =>
  renderToStaticMarkup(createElement(FixOverview, { list, focusExam: null, savedCount: 0, subjects: subs, subject, allCount: 13 }));

describe("Review's subject chips", () => {
  it("lists All and each subject with its count, All marked by default", () => {
    const out = html(null);
    expect(out).toMatch(/aria-current="page"[^>]*href="\/review"|href="\/review"[^>]*aria-current="page"/);
    expect(out).toContain('href="/review?subject=Mathematics"');
    expect(out).toContain('href="/review?subject=Physics"');
    expect(out).toContain("13");
  });

  it("marks the chosen subject, and the lead button starts with its biggest chapter", () => {
    const out = html("Mathematics");
    expect(out).toMatch(/aria-current="page"[^>]*href="\/review\?subject=Mathematics"|href="\/review\?subject=Mathematics"[^>]*aria-current="page"/);
    expect(out).toContain("Start with Probability");
    expect(out).toContain("/drill?chapter=c1&amp;from=review_tab");
  });

  it("shows no chips when everything waiting is one subject", () => {
    const out = html(null, [{ subject: "Mathematics", count: 9 }]);
    expect(out).not.toContain("?subject=");
  });
});
