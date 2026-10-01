import { describe, it, expect } from "vitest";
import { findChapterLanding } from "@/lib/questions/findLanding";
import type { ChapterLanding } from "@/lib/questions/landing";

function landing(examName: string, subjectName: string, chapterName: string): ChapterLanding {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    examSlug: slug(examName),
    subjectSlug: slug(subjectName),
    chapterSlug: slug(chapterName),
    examName,
    subjectName,
    chapterName,
    examId: "e",
    subjectId: "s",
    chapterId: "c",
    questionCount: 40,
    practiceOnly: false,
    lastAdded: null,
    profile: null,
  } as ChapterLanding;
}

const LANDINGS = [
  landing("NDA", "Mathematics", "Conic Sections"),
  landing("JEE Mains", "Mathematics", "Conic Sections"),
  landing("MHT-CET", "Physics", "Circular Motion"),
  landing("MHT-CET", "Chemistry", "Solutions"),
];

describe("findChapterLanding", () => {
  it("finds the landing whose exam, subject and chapter names all match", () => {
    const hit = findChapterLanding(LANDINGS, {
      examName: "MHT-CET",
      subjectName: "Physics",
      chapterName: "Circular Motion",
    });
    expect(hit?.chapterSlug).toBe("circular-motion");
  });

  it("does not cross exams when two exams share a chapter name", () => {
    const hit = findChapterLanding(LANDINGS, {
      examName: "JEE Mains",
      subjectName: "Mathematics",
      chapterName: "Conic Sections",
    });
    expect(hit?.examName).toBe("JEE Mains");
  });

  it("does not cross subjects inside one exam", () => {
    expect(
      findChapterLanding(LANDINGS, {
        examName: "MHT-CET",
        subjectName: "Physics",
        chapterName: "Solutions",
      })
    ).toBeNull();
  });

  it("returns null when the chapter has no landing page (too few questions)", () => {
    expect(
      findChapterLanding(LANDINGS, {
        examName: "NDA",
        subjectName: "Mathematics",
        chapterName: "Vectors",
      })
    ).toBeNull();
  });
});
