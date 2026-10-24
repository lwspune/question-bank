import { describe, expect, it } from "vitest";
import { dealPracticePapers, maxPapers, type PoolRow } from "../scripts/mocks/imatPractice";

/** `perChapter` rows in each of `chapters` chapters of one section. */
function pool(section: string, chapters: number, perChapter: number): PoolRow[] {
  return Array.from({ length: chapters * perChapter }, (_, i) => ({
    id: `${section}-c${i % chapters}-q${Math.floor(i / chapters)}`,
    sectionKey: section,
    chapter: `c${i % chapters}`,
    subtopic: `s${Math.floor(i / chapters) % 3}`,
  }));
}

const chaptersOf = (ids: string[]) => new Set(ids.map((id) => id.split("-")[1]));

describe("maxPapers", () => {
  it("is set by the section that runs out first", () => {
    const rows = [...pool("a", 4, 10), ...pool("b", 5, 3)]; // a: 40 rows, b: 15
    expect(maxPapers(rows, [{ key: "a", count: 4 }, { key: "b", count: 5 }])).toBe(3);
  });
});

describe("dealPracticePapers", () => {
  const sections = [
    { key: "a", count: 4 },
    { key: "b", count: 13 },
  ];
  const rows = [...pool("a", 4, 10), ...pool("b", 14, 8)];
  const papers = dealPracticePapers(rows, sections, 7);

  it("gives every paper each section's exact count, in section order", () => {
    expect(papers).toHaveLength(7);
    for (const p of papers) {
      expect(p).toHaveLength(17);
      expect(p.slice(0, 4).every((id) => id.startsWith("a-"))).toBe(true);
      expect(p.slice(4).every((id) => id.startsWith("b-"))).toBe(true);
    }
  });

  it("never repeats a question, within a paper or across papers", () => {
    const all = papers.flat();
    expect(new Set(all).size).toBe(all.length);
  });

  it("spreads each paper across chapters rather than drawing one chapter", () => {
    for (const p of papers) {
      expect(chaptersOf(p.slice(0, 4)).size).toBe(4);
      // 14 chapters dealt to 7 papers: a plain i % 7 deal would hand each paper 2.
      expect(chaptersOf(p.slice(4)).size).toBeGreaterThanOrEqual(10);
    }
  });

  it("is deterministic and ignores the pool's order", () => {
    expect(dealPracticePapers([...rows].reverse(), sections, 7)).toEqual(papers);
  });

  it("refuses to deal more papers than the pool can fill", () => {
    expect(() => dealPracticePapers(rows, sections, 9)).toThrow(/section b/);
  });
});
