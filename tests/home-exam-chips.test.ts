import { describe, it, expect } from "vitest";
import { homeExamChips, examCardAnchor } from "@/lib/exam/homeChips";
import { groupExamFamilies } from "@/lib/exam/examFamily";
import { getExamBySlug } from "@/lib/exam/examContext";

// UX_REVIEW_TRIAGE.md A8 (2026-10-02): on a 390 px phone the homepage put the
// exam choice behind ~1,500 px of cards. A row of chips under the hero lets a
// visitor pick an exam without scrolling.

type Item = { slug: string; displayName: string; href: string; counts: { pyq: number; practice: number } };

const item = (slug: string, displayName: string, pyq: number, practice = 0): Item => ({
  slug,
  displayName,
  href: `/exams/${slug}`,
  counts: { pyq, practice },
});

const nodes = (items: Item[]) => groupExamFamilies(items, (e) => getExamBySlug(e.slug));

describe("homeExamChips", () => {
  it("gives a single exam a chip that goes where its card goes and remembers the exam", () => {
    const chips = homeExamChips(nodes([item("nda", "NDA", 5130, 8894)]));
    expect(chips).toEqual([
      { key: "nda", label: "NDA", href: "/exams/nda", cookieSlug: "nda" },
    ]);
  });

  it("gives a family one chip that jumps to its card, and remembers no exam — a family names none", () => {
    const chips = homeExamChips(
      nodes([item("cbse-10", "CBSE Class 10", 0, 1416), item("cbse-12", "CBSE Class 12", 1766, 5396)])
    );
    expect(chips).toHaveLength(1);
    expect(chips[0].href).toBe(`#${examCardAnchor(chips[0].key)}`);
    expect(chips[0].cookieSlug).toBeNull();
  });

  it("leaves out an exam with no questions yet — a chip must not lead to 'coming soon'", () => {
    const chips = homeExamChips(nodes([item("nda", "NDA", 5130), item("neet", "NEET", 0)]));
    expect(chips.map((c) => c.key)).toEqual(["nda"]);
  });

  it("keeps registry order", () => {
    const chips = homeExamChips(nodes([item("nda", "NDA", 1), item("mht-cet", "MHT-CET", 1), item("jee-mains", "JEE Mains", 1)]));
    expect(chips.map((c) => c.key)).toEqual(["nda", "mht-cet", "jee-mains"]);
  });

  it("makes anchors that are valid ids even for a family name with spaces", () => {
    expect(examCardAnchor("Maharashtra State Board")).toBe("exam-maharashtra-state-board");
  });
});
