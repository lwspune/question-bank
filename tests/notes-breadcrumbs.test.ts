import { describe, it, expect } from "vitest";
import { notesBreadcrumbs, notesExamCrumbs } from "@/lib/notes/breadcrumbs";

/**
 * The trail above a notes chapter or topic. It used to start at the chapter
 * ("Home › Vectors"), so a reader who landed from search could not see which
 * exam's notes they were in, or climb to the subject. It now carries the full
 * path: Notes › exam › subject › chapter (› topic). The exam crumb (2026-10-07)
 * leads back to the exam's notes page, which lists every chapter of every
 * subject and the reader's Continue card.
 */
const chapter = {
  examName: "NDA",
  subjectRoute: "nda-maths",
  subjectDisplay: "NDA Maths",
  chapterSlug: "vectors",
  chapter: { chapterName: "Vectors" },
};

describe("notesBreadcrumbs", () => {
  it("chapter page: Notes › exam › subject › chapter (current, no link)", () => {
    expect(notesBreadcrumbs(chapter)).toEqual([
      { href: "/notes", label: "Notes" },
      { href: "/notes/nda", label: "NDA" },
      { href: "/notes/nda-maths", label: "NDA Maths" },
      { label: "Vectors" },
    ]);
  });

  it("topic page: the chapter becomes a link and the topic is current", () => {
    expect(notesBreadcrumbs(chapter, "Dot Product and Angle")).toEqual([
      { href: "/notes", label: "Notes" },
      { href: "/notes/nda", label: "NDA" },
      { href: "/notes/nda-maths", label: "NDA Maths" },
      { href: "/notes/nda-maths/vectors", label: "Vectors" },
      { label: "Dot Product and Angle" },
    ]);
  });

  it("uses the exam's short name and slug, not its full name", () => {
    const cet = { ...chapter, examName: "MHT-CET", subjectRoute: "mht-cet-maths", subjectDisplay: "MHT-CET Maths" };
    expect(notesBreadcrumbs(cet)[1]).toEqual({ href: "/notes/mht-cet", label: "MHT-CET" });
  });

  it("leaves the exam crumb out when the exam is not in the registry", () => {
    expect(notesBreadcrumbs({ ...chapter, examName: "Retired Exam" }).map((c) => c.label)).toEqual([
      "Notes",
      "NDA Maths",
      "Vectors",
    ]);
  });

  it("subject page head: Notes › exam", () => {
    expect(notesExamCrumbs("NDA")).toEqual([
      { href: "/notes", label: "Notes" },
      { href: "/notes/nda", label: "NDA" },
    ]);
  });
});
