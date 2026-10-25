/**
 * Which stored board papers a Solved Papers book prints, and in what order
 * (2026-10-26).
 *
 * - Maharashtra prints one paper per sitting, so the book carries EVERY
 *   paper, supplementary sittings (June/July) included.
 * - CBSE prints about fifteen papers a year (paper codes 55/1 .. 55/7, three
 *   sets each). Every one would make a 1,300-3,500 page book, so it carries
 *   ONE per year (owner, 2026-10-25): the lowest paper code, its set 1.
 * - Newest first, as solved-paper books are read: the latest paper is the
 *   one a student sits first.
 */
import { describe, it, expect } from "vitest";
import { pickBookPapers } from "@/lib/ebooks/boardPapers";
import type { PaperListing } from "@/lib/questionPapers/listing";

function paper(over: Partial<PaperListing> & Pick<PaperListing, "slug" | "year">): PaperListing {
  return {
    id: over.slug,
    examId: "e",
    subjectId: "s",
    subjectName: "Physics",
    groupSlug: over.slug,
    setNumber: null,
    sitting: null,
    paperCode: null,
    title: over.slug,
    totalMarks: 70,
    durationMinutes: 180,
    ...over,
  };
}

const cbse = (year: number, code: number, set: number) =>
  paper({ slug: `${year}-55-${code}-${set}`, groupSlug: `${year}-55-${code}`, year, setNumber: set, paperCode: `55/${code}/${set}` });

describe("pickBookPapers", () => {
  it("keeps every Maharashtra paper, newest sitting first", () => {
    const papers = [
      paper({ slug: "physics-2024-february", year: 2024, sitting: "February" }),
      paper({ slug: "physics-2026-june", year: 2026, sitting: "June" }),
      paper({ slug: "physics-2024-july", year: 2024, sitting: "July" }),
      paper({ slug: "physics-2026-february", year: 2026, sitting: "February" }),
      paper({ slug: "physics-2023-february", year: 2023, sitting: "February" }),
    ];
    expect(pickBookPapers(papers, "every").map((p) => p.slug)).toEqual([
      "physics-2026-june",
      "physics-2026-february",
      "physics-2024-july",
      "physics-2024-february",
      "physics-2023-february",
    ]);
  });

  it("orders a March main sitting after the same year's July supplementary (SSC)", () => {
    const papers = [
      paper({ slug: "algebra-2025", year: 2025, sitting: "March" }),
      paper({ slug: "algebra-2025-july", year: 2025, sitting: "July" }),
    ];
    expect(pickBookPapers(papers, "every").map((p) => p.slug)).toEqual(["algebra-2025-july", "algebra-2025"]);
  });

  it("takes one CBSE paper a year: the lowest paper code, set 1", () => {
    const papers = [cbse(2025, 2, 1), cbse(2025, 1, 3), cbse(2025, 1, 1), cbse(2025, 1, 2), cbse(2024, 4, 1), cbse(2024, 1, 2), cbse(2024, 1, 1)];
    expect(pickBookPapers(papers, "first-set-per-year").map((p) => p.slug)).toEqual(["2025-55-1-1", "2024-55-1-1"]);
  });

  it("compares paper codes as numbers, so 55/10 does not sort before 55/2", () => {
    const papers = [cbse(2025, 10, 1), cbse(2025, 2, 1)];
    expect(pickBookPapers(papers, "first-set-per-year").map((p) => p.slug)).toEqual(["2025-55-2-1"]);
  });

  it("falls back to the lowest set when a year's first code has no set 1", () => {
    const papers = [cbse(2023, 1, 2), cbse(2023, 1, 3), cbse(2023, 2, 1)];
    expect(pickBookPapers(papers, "first-set-per-year").map((p) => p.slug)).toEqual(["2023-55-1-2"]);
  });

  it("returns nothing for nothing", () => {
    expect(pickBookPapers([], "every")).toEqual([]);
    expect(pickBookPapers([], "first-set-per-year")).toEqual([]);
  });
});
