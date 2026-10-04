import { describe, it, expect } from "vitest";
import { notesBreadcrumbs } from "@/lib/notes/breadcrumbs";

/**
 * The trail above a notes chapter or topic. It used to start at the chapter
 * ("Home › Vectors"), so a reader who landed from search could not see which
 * exam's notes they were in, or climb to the subject. It now carries the full
 * path: Notes › subject › chapter (› topic).
 */
const chapter = {
  subjectRoute: "nda-maths",
  subjectDisplay: "NDA Maths",
  chapterSlug: "vectors",
  chapter: { chapterName: "Vectors" },
};

describe("notesBreadcrumbs", () => {
  it("chapter page: Notes › subject › chapter (current, no link)", () => {
    expect(notesBreadcrumbs(chapter)).toEqual([
      { href: "/notes", label: "Notes" },
      { href: "/notes/nda-maths", label: "NDA Maths" },
      { label: "Vectors" },
    ]);
  });

  it("topic page: the chapter becomes a link and the topic is current", () => {
    expect(notesBreadcrumbs(chapter, "Dot Product and Angle")).toEqual([
      { href: "/notes", label: "Notes" },
      { href: "/notes/nda-maths", label: "NDA Maths" },
      { href: "/notes/nda-maths/vectors", label: "Vectors" },
      { label: "Dot Product and Angle" },
    ]);
  });
});
