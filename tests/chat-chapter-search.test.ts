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

// Real names, for the searches students made on 2026-10-16 that came back empty.
const REAL: ChapterSearchRow[] = [
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology II", "Introduction to Microbiology", 51),
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology II", "Heredity and Evolution", 60),
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology I", "Gravitation", 70),
  row("nda", "NDA", "Mathematics", "Matrices and Determinants", 300),
  row("nda", "NDA", "Mathematics", "Probability", 250),
  row("nda", "NDA", "Physics", "Sound", 90),
  ...[
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics",
  ].map((name, i) => row("cbse-12", "CBSE Class 12", "Physics", name, 300 - i * 10)),
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
    const many = Array.from({ length: 40 }, (_, i) => row("nda", "NDA", "Mathematics", `Matrices ${i}`));
    expect(searchChapters(many, { query: "matrices" }).length).toBe(20);
  });
});

describe("searchChapters: what students typed (2026-10-16)", () => {
  it("reads a plain number as the roman numeral in a subject name (science 2 = Science and Technology II)", () => {
    const hits = searchChapters(REAL, { query: "introduction to microbiology science 2", exam: "MH SSC 10" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Introduction to Microbiology"]);
  });

  it("does not let Science and Technology I answer for II", () => {
    const hits = searchChapters(REAL, { query: "science 2", exam: "mh-ssc-10" });
    expect(hits.map((h) => h.subjectName)).toEqual(["Science and Technology II", "Science and Technology II"]);
  });

  it("knows maths means Mathematics", () => {
    const hits = searchChapters(REAL, { query: "maths", exam: "NDA" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Matrices and Determinants", "Probability"]);
  });

  it("ignores filler words such as chapter numbers, imp and questions", () => {
    const hits = searchChapters(REAL, {
      query: "imp questions chapter 7 introduction to microbiology",
      exam: "MH SSC 10",
    });
    expect(hits.map((h) => h.chapterName)).toEqual(["Introduction to Microbiology"]);
  });

  it("lets a query name the exam's class without failing the search", () => {
    const hits = searchChapters(REAL, { query: "class 12 physics electric charges" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Electric Charges and Fields"]);
  });

  it("lists a whole subject's chapters, so V can pick chapter 1 by name", () => {
    const hits = searchChapters(REAL, { query: "physics", exam: "CBSE Class 12" });
    expect(hits.length).toBe(14);
    expect(hits.map((h) => h.chapterName)).toContain("Electric Charges and Fields");
  });

  it("still needs a chapter or subject word: an exam alone finds nothing", () => {
    expect(searchChapters(REAL, { query: "class 12" })).toEqual([]);
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
