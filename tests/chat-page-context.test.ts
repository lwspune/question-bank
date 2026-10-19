/**
 * What V is told about the page a student asks from (2026-10-19, study-partner
 * Phase 0). On 2026-10-19 a student on the HSC 12 Solid State page asked for
 * "the pe pyqs ... 2022 to 2026" and V searched Physical Education: it knew the
 * path but not that the path IS a chapter.
 */
import { describe, it, expect } from "vitest";
import { pageContext } from "@/lib/chat/pageContext";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";

const ROWS: ChapterSearchRow[] = [
  {
    examSlug: "mh-hsc-12",
    examName: "Maharashtra HSC Class 12",
    subjectSlug: "chemistry",
    subjectName: "Chemistry",
    chapterSlug: "solid-state",
    chapterName: "Solid State",
    questionCount: 60,
    practiceOnly: false,
  },
  {
    examSlug: "mht-cet",
    examName: "MHT-CET",
    subjectSlug: "physics",
    subjectName: "Physics",
    chapterSlug: "motion-in-a-plane",
    chapterName: "Motion in a Plane",
    questionCount: 109,
    practiceOnly: false,
  },
];

describe("pageContext", () => {
  it("names the chapter, subject and exam of a /board chapter page", () => {
    expect(pageContext("/board/mh-hsc-12/chemistry/solid-state", ROWS)).toEqual({
      examName: "MH HSC 12",
      subjectName: "Chemistry",
      chapterName: "Solid State",
    });
  });

  it("names the chapter of a /questions chapter page", () => {
    expect(pageContext("/questions/mht-cet/physics/motion-in-a-plane", ROWS)).toMatchObject({
      chapterName: "Motion in a Plane",
      subjectName: "Physics",
    });
  });

  it("names only the exam of an exam page", () => {
    expect(pageContext("/exams/mh-ssc-10", ROWS)).toEqual({ examName: "MH SSC 10" });
    expect(pageContext("/board/mh-hsc-12", ROWS)).toEqual({ examName: "MH HSC 12" });
    expect(pageContext("/guide/nda", ROWS)).toEqual({ examName: "NDA" });
  });

  it("names the exam of a subject guide, whose slug is not an exam slug", () => {
    expect(pageContext("/guide/mht-cet-physics", ROWS)).toEqual({ examName: "MHT-CET" });
  });

  it("falls back to the exam when the chapter is not in the search list", () => {
    expect(pageContext("/questions/mht-cet/physics/no-such-chapter", ROWS)).toEqual({ examName: "MHT-CET" });
  });

  it("knows nothing about a page that is not about one exam", () => {
    expect(pageContext("/browse", ROWS)).toBeNull();
    expect(pageContext("/pricing", ROWS)).toBeNull();
    expect(pageContext("/questions", ROWS)).toBeNull();
    expect(pageContext("/exams/not-an-exam", ROWS)).toBeNull();
    expect(pageContext(null, ROWS)).toBeNull();
  });
});
