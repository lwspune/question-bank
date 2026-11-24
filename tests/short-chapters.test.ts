/**
 * Chapters too small for a landing page, for V (2026-11-24).
 *
 * V's chapter search read only the landing list (15+ questions, landing.ts
 * MIN_QUESTIONS_FOR_LANDING). On 23 Nov a student asked for Maharashtra HSC
 * Molecular Basis of Inheritance (13 PYQs + 33 textbook questions) and V said
 * it was not in MH HSC 12. About 2,000 chapters sat below the line, among them
 * all of ISC Class 12 and IISER IAT. These rows let V find them; with no
 * landing page, V links /go/chapter/..., which opens the chapter on /browse.
 */
import { describe, it, expect } from "vitest";
import { chapterPath, findChapters, type ChapterSearchRow } from "@/lib/chat/chapterSearch";
import { goChapterTarget, shortChapterRows } from "@/lib/questions/shortChapters";
import { linkLabel } from "@/lib/chat/replyLinks";

const exam = { slug: "mh-hsc-12", examName: "Maharashtra HSC Class 12", examId: "e1", practiceOnly: false };
const subject = { id: "s1", name: "Biology" };

const rows = shortChapterRows({
  exam,
  subject,
  chapters: [
    { id: "c1", name: "Molecular Basis of Inheritance" },
    { id: "c2", name: "Inheritance and Variation" },
    { id: "c3", name: "Empty Chapter" },
  ],
  counts: new Map([
    ["c1", 13],
    ["c2", 40],
  ]),
});

describe("shortChapterRows", () => {
  it("keeps chapters with 1 to 14 questions: the landing list has the rest, and an empty chapter has nothing to show", () => {
    expect(rows.map((r) => r.chapterName)).toEqual(["Molecular Basis of Inheritance"]);
  });

  it("carries what the search and the /browse link need", () => {
    expect(rows[0]).toMatchObject({
      examSlug: "mh-hsc-12",
      examName: "Maharashtra HSC Class 12",
      subjectSlug: "biology",
      subjectName: "Biology",
      chapterSlug: "molecular-basis-of-inheritance",
      chapterId: "c1",
      examId: "e1",
      subjectId: "s1",
      questionCount: 13,
      practiceOnly: false,
      hasLanding: false,
    });
  });
});

describe("chapterPath", () => {
  it("links a chapter with no landing page through /go/chapter", () => {
    expect(chapterPath(rows[0])).toBe("/go/chapter/mh-hsc-12/biology/molecular-basis-of-inheritance");
  });

  it("keeps the landing page for every other chapter", () => {
    const landing: ChapterSearchRow = { ...rows[0], hasLanding: undefined, chapterSlug: "vectors" };
    expect(chapterPath(landing)).toBe("/questions/mh-hsc-12/biology/vectors");
  });
});

describe("linkLabel", () => {
  it("names a /go/chapter link like a landing page's, never as a long path", () => {
    expect(linkLabel("/go/chapter/mh-hsc-12/biology/molecular-basis-of-inheritance")).toBe("Molecular basis of inheritance questions");
  });
});

describe("findChapters over short chapters", () => {
  it("finds the chapter the student asked for on 23 Nov, within the exam they named", () => {
    const { hits } = findChapters(rows, { query: "molecular basis of inheritance", exam: "MH HSC 12" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Molecular Basis of Inheritance"]);
  });
});

describe("goChapterTarget", () => {
  it("opens the chapter on /browse with the same filters a landing page's link uses", () => {
    expect(goChapterTarget(rows, "mh-hsc-12", "biology", "molecular-basis-of-inheritance")).toBe(
      "/browse?examId=e1&subjectId=s1&chapterIds=c1&kind=pyq"
    );
  });

  it("matches the address case-insensitively", () => {
    expect(goChapterTarget(rows, "MH-HSC-12", "Biology", "Molecular-Basis-of-Inheritance")).toContain("chapterIds=c1");
  });

  it("falls back to /browse for an address it does not know, never a dead page", () => {
    expect(goChapterTarget(rows, "mh-hsc-12", "biology", "no-such-chapter")).toBe("/browse");
  });

  it("uses the practice bank for a practice-only exam", () => {
    const practice = shortChapterRows({
      exam: { ...exam, slug: "cbse-11", practiceOnly: true },
      subject,
      chapters: [{ id: "c9", name: "Cell" }],
      counts: new Map([["c9", 5]]),
    });
    expect(goChapterTarget(practice, "cbse-11", "biology", "cell")).toContain("kind=practice");
  });
});
