/**
 * V's find_chapters tool (2026-10-15): the chapter pages a student's typed
 * request points at, searched over the cached /questions landing list.
 */
import { describe, it, expect } from "vitest";
import { searchChapters, formatChapterHits, type ChapterSearchRow } from "@/lib/chat/chapterSearch";

function row(examSlug: string, examName: string, subjectName: string, chapterName: string, questionCount = 50): ChapterSearchRow {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    examSlug,
    examName,
    subjectSlug: slug(subjectName),
    subjectName,
    chapterSlug: slug(chapterName),
    chapterName,
    questionCount,
    practiceOnly: false,
  };
}

const ROWS: ChapterSearchRow[] = [
  row("cbse-12", "CBSE Class 12", "Physics", "Atoms", 120),
  row("cbse-12", "CBSE Class 12", "Physics", "Nuclei", 90),
  row("neet", "NEET", "Physics", "Atoms", 40),
  row("neet", "NEET", "Physics", "Laws of Motion", 200),
  row("jee-mains", "JEE Mains", "Physics", "Laws of Motion", 300),
  row("mht-cet", "MHT-CET", "Mathematics", "Binomial Distribution", 80),
  row("mh-ssc-10", "MH State Board Class 10", "Science 2", "Heredity and Evolution", 60),
  row("mh-ssc-10", "MH State Board Class 10", "Science 2", "Life Processes in Living Organisms Part 1", 70),
];

describe("searchChapters", () => {
  it("finds a chapter by its name", () => {
    const hits = searchChapters(ROWS, { query: "binomial distribution" });
    expect(hits[0].chapterName).toBe("Binomial Distribution");
  });

  it("narrows to the exam when one is given", () => {
    const hits = searchChapters(ROWS, { query: "atoms", exam: "cbse 12" });
    expect(hits.map((h) => h.examSlug)).toEqual(["cbse-12"]);
  });

  it("matches the exam by slug as well as by name", () => {
    const hits = searchChapters(ROWS, { query: "laws of motion", exam: "neet" });
    expect(hits.map((h) => h.examSlug)).toEqual(["neet"]);
  });

  it("ignores an exam that matches nothing rather than returning nothing", () => {
    const hits = searchChapters(ROWS, { query: "atoms", exam: "clat" });
    expect(hits.length).toBe(2);
  });

  it("puts the bigger chapter first when two match equally", () => {
    const hits = searchChapters(ROWS, { query: "laws of motion" });
    expect(hits.map((h) => h.examSlug)).toEqual(["jee-mains", "neet"]);
  });

  it("lists a subject's chapters when the query names only the subject", () => {
    const hits = searchChapters(ROWS, { query: "science 2", exam: "mh-ssc-10" });
    expect(hits.length).toBe(2);
  });

  it("matches a word start, so a short form of a word still finds it", () => {
    const hits = searchChapters(ROWS, { query: "binomial dist" });
    expect(hits[0].chapterName).toBe("Binomial Distribution");
  });

  it("returns nothing for a query with no real words", () => {
    expect(searchChapters(ROWS, { query: "  ?? " })).toEqual([]);
  });

  it("returns nothing when no chapter matches", () => {
    expect(searchChapters(ROWS, { query: "photosynthesis" })).toEqual([]);
  });

  it("caps the number of results", () => {
    const many = Array.from({ length: 30 }, (_, i) => row("nda", "NDA", "Mathematics", `Matrices ${i}`));
    expect(searchChapters(many, { query: "matrices" }).length).toBe(10);
  });
});

describe("formatChapterHits", () => {
  it("gives each chapter one line with its page address", () => {
    const text = formatChapterHits(searchChapters(ROWS, { query: "atoms", exam: "cbse-12" }));
    expect(text).toContain("CBSE Class 12");
    expect(text).toContain("Atoms");
    expect(text).toContain("/questions/cbse-12/physics/atoms");
  });

  it("says plainly when nothing was found", () => {
    expect(formatChapterHits([])).toMatch(/no chapter/i);
  });
});
