import { describe, it, expect } from "vitest";
import { pickStarter, type StarterChapterTest, type StarterPaper } from "@/lib/performance/starter";

/**
 * Spec for the empty /performance page's one offer (owner, 2026-10-06):
 * a student with no graded paper gets ONE short test, chosen from the chapter
 * they last practised, else from their exam, else a full past paper, else an
 * honest "not live yet", else the exam picker.
 */

const ct = (examSlug: string, chapterId: string, slug: string): StarterChapterTest => ({
  examSlug,
  chapterId,
  slug,
  title: `${slug} — Chapter test`,
  minutes: 20,
  questions: 15,
});
const paper = (examSlug: string, slug: string): StarterPaper => ({
  examSlug,
  slug,
  title: slug,
  minutes: 150,
  questions: 120,
});

const TESTS = [
  ct("nda", "ch-bio", "nda-chapter-biology-01-human-physiology"),
  ct("nda", "ch-trig", "nda-chapter-maths-05-trigonometry"),
  ct("jee-mains", "ch-kin", "jee-mains-chapter-physics-02-kinematics"),
  ct("mht-cet", "ch-lim", "mht-cet-chapter-maths-03-limits"),
];
const PAPERS = [
  paper("nda", "nda-2026-i-maths"),
  paper("nda", "nda-2025-ii-maths"),
  paper("jee-mains", "jee-2026-jan-22-s1"),
  paper("neet", "neet-2026"),
];

describe("pickStarter", () => {
  it("offers the test for the chapter the student last practised", () => {
    const s = pickStarter({ targetExams: ["nda"], lastChapterId: "ch-trig", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", why: "last-read", test: { slug: "nda-chapter-maths-05-trigonometry" } });
  });

  it("also offers that exam's newest full paper as the second link", () => {
    const s = pickStarter({ targetExams: ["nda"], lastChapterId: "ch-trig", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s.kind === "chapter" && s.paper?.slug).toBe("nda-2026-i-maths");
  });

  it("ignores a last-read chapter from an exam the student does not target", () => {
    const s = pickStarter({ targetExams: ["nda"], lastChapterId: "ch-kin", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", why: "exam", test: { examSlug: "nda" } });
  });

  it("uses the last-read chapter when the student has set no exam", () => {
    const s = pickStarter({ targetExams: [], lastChapterId: "ch-kin", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", why: "last-read", test: { examSlug: "jee-mains" } });
  });

  it("falls back to the exam's first chapter test in catalogue order", () => {
    const s = pickStarter({ targetExams: ["nda"], lastChapterId: null, chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", why: "exam", test: { slug: "nda-chapter-biology-01-human-physiology" } });
  });

  it("walks the target exams in the student's order to the first with a test", () => {
    const s = pickStarter({ targetExams: ["mh-hsc-12", "jee-mains"], lastChapterId: null, chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", test: { examSlug: "jee-mains" } });
  });

  it("offers the newest full paper when the exam has no chapter tests", () => {
    const s = pickStarter({ targetExams: ["neet"], lastChapterId: null, chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toEqual({ kind: "paper", paper: PAPERS[3] });
  });

  it("says 'not live yet' for an exam with no published test of any kind", () => {
    const s = pickStarter({ targetExams: ["mh-hsc-12"], lastChapterId: "ch-board", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toEqual({ kind: "not-yet", examSlug: "mh-hsc-12" });
  });

  it("asks for an exam when none is set and nothing was practised", () => {
    const s = pickStarter({ targetExams: [], lastChapterId: null, chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toEqual({ kind: "pick-exam" });
  });

  it("asks for an exam when none is set and the last chapter has no test", () => {
    const s = pickStarter({ targetExams: [], lastChapterId: "ch-board", chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toEqual({ kind: "pick-exam" });
  });

  it("returns a null second link when the exam has chapter tests but no full paper", () => {
    const s = pickStarter({ targetExams: ["mht-cet"], lastChapterId: null, chapterTests: TESTS, fullPapers: PAPERS });
    expect(s).toMatchObject({ kind: "chapter", paper: null });
  });
});
