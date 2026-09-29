/**
 * /exams/<slug> — one home page per exam, built from the registry and the
 * chapter-landing index rather than hand-authored (only NDA had one, at /nda,
 * and 17 exams had none). The pure builder is what this specs: subject
 * grouping, the years rollup from the per-chapter profiles, the links each
 * flag unlocks, and the one-sentence description a search engine quotes.
 */
import { describe, it, expect } from "vitest";
import {
  buildExamHome,
  examHomeDescription,
  examHomeHref,
} from "../src/lib/exam/examHome";
import { getExamBySlug } from "../src/lib/exam/examContext";
import type { ChapterLanding } from "../src/lib/questions/landing";

function landing(
  over: Partial<ChapterLanding> & { chapterName: string; subjectName: string }
): ChapterLanding {
  return {
    examSlug: "jee-mains",
    subjectSlug: over.subjectName.toLowerCase(),
    chapterSlug: over.chapterName.toLowerCase().replace(/\s+/g, "-"),
    examName: "JEE Mains",
    examId: "exam-uuid",
    subjectId: `${over.subjectName}-uuid`,
    chapterId: `${over.chapterName}-uuid`,
    questionCount: 20,
    practiceOnly: false,
    lastAdded: null,
    profile: null,
    ...over,
  };
}

const jee = getExamBySlug("jee-mains")!;
const cbse10 = getExamBySlug("cbse-10")!;

const landings = [
  landing({
    subjectName: "Maths",
    chapterName: "Matrices",
    questionCount: 115,
    profile: { minYear: 2021, maxYear: 2026, sittings: 76, easy: 0, moderate: 115, hard: 0 },
  }),
  landing({
    subjectName: "Maths",
    chapterName: "Vectors",
    questionCount: 130,
    profile: { minYear: 2022, maxYear: 2025, sittings: 50, easy: 10, moderate: 100, hard: 20 },
  }),
  landing({
    subjectName: "Physics",
    chapterName: "Optics",
    questionCount: 90,
    profile: null,
  }),
  // Another exam's chapter must never leak in.
  landing({ examSlug: "neet", examName: "NEET", subjectName: "Biology", chapterName: "Cells" }),
];

describe("examHomeHref", () => {
  it("keeps NDA on its hand-built home and routes every other exam to /exams/<slug>", () => {
    expect(examHomeHref("nda")).toBe("/nda");
    expect(examHomeHref("jee-mains")).toBe("/exams/jee-mains");
  });
});

describe("buildExamHome", () => {
  const model = buildExamHome(jee, landings, {
    examId: "exam-uuid",
    totalPublicQuestions: 10667,
    hasShippedNotes: true,
  });

  it("groups this exam's chapters by subject, biggest chapter first", () => {
    expect(model.subjects.map((s) => s.name)).toEqual(["Maths", "Physics"]);
    expect(model.subjects[0].chapters.map((c) => c.name)).toEqual(["Vectors", "Matrices"]);
    expect(model.subjects[0].chapters[0].href).toBe("/questions/jee-mains/maths/vectors");
    expect(model.subjects[0].questionCount).toBe(245);
    expect(model.subjects[1].chapters).toHaveLength(1);
  });

  it("rolls the years up across every chapter that has a profile", () => {
    expect(model.years).toEqual({ min: 2021, max: 2026 });
  });

  it("counts chapters and carries the catalogue total, not a sum of landings", () => {
    // The landing index only lists chapters with ≥15 questions, so summing it
    // would under-count the exam. The catalogue head-count is the honest total.
    expect(model.chapterCount).toBe(3);
    expect(model.totalQuestions).toBe(10667);
  });

  it("links what the registry flags unlock, and nothing else", () => {
    expect(model.links.bank).toBe("/browse?examId=exam-uuid");
    expect(model.links.guide).toBeNull(); // JEE has no /guide subtree
    expect(model.links.notes).toBe("/notes/jee-mains");
    expect(model.links.mocks).toBe("/mock/exam/jee-mains");
    expect(model.links.board).toBeNull();
  });

  it("hides the notes link when nothing has shipped, and years for a practice-only exam", () => {
    const m = buildExamHome(cbse10, [], {
      examId: null,
      totalPublicQuestions: 1008,
      hasShippedNotes: false,
    });
    expect(m.links.notes).toBeNull();
    expect(m.links.board).toBe("/board/cbse-10");
    expect(m.links.mocks).toBeNull();
    expect(m.links.bank).toBe("/browse");
    expect(m.years).toBeNull();
    expect(m.practiceOnly).toBe(true);
  });
});

describe("examHomeDescription", () => {
  it("states count, years, subjects and chapters in one quotable sentence", () => {
    const model = buildExamHome(jee, landings, {
      examId: "exam-uuid",
      totalPublicQuestions: 10667,
      hasShippedNotes: true,
    });
    expect(examHomeDescription(model)).toBe(
      "JEE Mains on PYQ Vault: 10,667 past-year questions from 2021 to 2026 across 2 subjects and 3 chapters, with answers and worked solutions, timed mocks of real papers, and chapter notes. Free to browse."
    );
  });

  it("says 'practice questions' and names the textbook reader for a practice-only board exam", () => {
    const m = buildExamHome(cbse10, [], {
      examId: null,
      totalPublicQuestions: 1008,
      hasShippedNotes: false,
    });
    expect(examHomeDescription(m)).toBe(
      "CBSE Class 10 on PYQ Vault: 1,008 practice questions, with answers and worked solutions and a textbook-solutions reader. Free to browse."
    );
  });
});
