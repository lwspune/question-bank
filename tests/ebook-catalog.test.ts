/**
 * The ebook catalog (2026-10-20, split into three kinds the same day): a
 * Formula Book and a Notes Book per subject, built from the /notes chapters,
 * and a PYQ Book built from a compiled /books definition. A chapter missing
 * from a book would silently vanish from something a student paid for, so
 * each book must carry every chapter of its source exactly once, in the
 * textbook's order.
 */
import { describe, it, expect } from "vitest";
import { EBOOKS, PAPERS_EBOOKS, getEbook, ebookChapters, chapterClassLabel } from "@/lib/ebooks/catalog";
import { getExamBySlug } from "@/lib/exam/examContext";
import { getBookBySlug } from "@/lib/books/registry";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";

describe("ebook catalog", () => {
  it("sells seven CET books: formulas and notes for three subjects, and the Maths PYQ book", () => {
    expect(EBOOKS.filter((e) => e.kind !== "papers").map((e) => e.slug).sort()).toEqual([
      "mht-cet-chemistry-formulas",
      "mht-cet-chemistry-notes",
      "mht-cet-maths-formulas",
      "mht-cet-maths-notes",
      "mht-cet-maths-pyq",
      "mht-cet-physics-formulas",
      "mht-cet-physics-notes",
    ]);
  });

  it.each(EBOOKS.filter((e) => e.kind === "pyq").map((e) => [e.slug, e] as const))(
    "%s prints every chapter of its compiled book exactly once",
    (_slug, ebook) => {
      if (ebook.kind !== "pyq") throw new Error("unreachable");
      const book = getBookBySlug(ebook.bookSlug)!;
      expect([...ebook.chapterOrder].sort()).toEqual(book.chapters.map((c) => c.slug).sort());
      expect(new Set(ebook.chapterOrder).size).toBe(ebook.chapterOrder.length);
    }
  );

  it.each(EBOOKS.flatMap((e) => (e.kind === "notes" ? [[e.slug, e] as const] : [])))(
    "%s carries every notes chapter of its subject, in book order",
    (_slug, ebook) => {
      const expected = getNotesChaptersForSubject(ebook.notesRoute!).map((c) => c.chapterSlug);
      expect(ebookChapters(ebook).map((c) => c.slug)).toEqual(expected);
    }
  );

  it.each(EBOOKS.flatMap((e) => (e.kind === "formula" ? [[e.slug, e] as const] : [])))(
    "%s carries every notes chapter that has a formula, table or trap, in book order",
    (_slug, ebook) => {
      const chapters = ebookChapters(ebook);
      expect(chapters.length).toBeGreaterThan(15);
      const all = getNotesChaptersForSubject(ebook.notesRoute!).map((c) => c.chapterSlug);
      const order = chapters.map((c) => all.indexOf(c.slug));
      expect(order).toEqual([...order].sort((a, b) => a - b));
      expect(chapters.every((c) => c.notes)).toBe(true);
    }
  );

  it.each(EBOOKS.flatMap((e) => (e.kind === "papers" ? [] : [[e.slug, e] as const])))(
    "%s has a sample chapter inside the book",
    (_slug, ebook) => {
      expect(ebookChapters(ebook).map((c) => c.slug)).toContain(ebook.sampleChapter);
    }
  );

  // Solved Papers (2026-10-26): one book per board subject with stored papers.
  // Their papers come from the database at build time; what is pinned here is
  // which subjects get a book and the rule each follows.
  it("has a Solved Papers book for each of the 17 board subjects with stored papers", () => {
    expect(PAPERS_EBOOKS).toHaveLength(17);
    expect(new Set(EBOOKS.map((e) => e.slug)).size).toBe(EBOOKS.length);
    for (const b of PAPERS_EBOOKS) expect(getExamBySlug(b.examSlug)?.boardExam, b.slug).toBe(true);
  });

  it("seeds a store row (0186) for exactly the Solved Papers books in the catalog", async () => {
    const { readFileSync } = await import("node:fs");
    const sql = readFileSync("supabase/migrations/0186_ebook_solved_papers.sql", "utf8");
    const seeded = Array.from(sql.matchAll(/\('([a-z0-9-]+-solved-papers)'/g)).map((m) => m[1]);
    expect(seeded.sort()).toEqual(PAPERS_EBOOKS.map((b) => b.slug).sort());
  });

  it("carries every Maharashtra paper, and one CBSE paper a year", () => {
    for (const b of PAPERS_EBOOKS) expect(b.rule, b.slug).toBe(b.examSlug.startsWith("cbse") ? "first-set-per-year" : "every");
  });

  it("names the SSC History book for both parts of its paper", () => {
    expect(getEbook("mh-ssc-10-history-solved-papers")?.title).toBe("Maharashtra SSC Class 10 History and Political Science");
    expect(getEbook("mh-hsc-12-physics-solved-papers")?.title).toBe("Maharashtra HSC Class 12 Physics");
  });

  it("the PYQ book opens with Class XI and closes with Class XII", () => {
    const book = getEbook("mht-cet-maths-pyq");
    if (!book || book.kind === "papers") throw new Error("the CET PYQ book is missing");
    const chapters = ebookChapters(book);
    expect(chapters[0].slug).toBe("trigonometry-ii");
    expect(chapters[chapters.length - 1].slug).toBe("binomial-distribution");
    expect(chapters.filter((c) => !c.notes).map((c) => c.slug).sort()).toEqual(["quadratic-equations", "sequences-and-series"]);
  });

  it("labels each chapter with its class, including the two PYQ chapters without notes", () => {
    expect(chapterClassLabel("mht-cet-maths", "circle")).toBe("Class XI");
    expect(chapterClassLabel("mht-cet-maths", "vectors")).toBe("Class XII");
    expect(chapterClassLabel("mht-cet-maths", "quadratic-equations")).toBe("Class XI");
    expect(chapterClassLabel("mht-cet-maths", "sequences-and-series")).toBe("Class XI");
    expect(chapterClassLabel("mht-cet-physics", "no-such-chapter")).toBeNull();
  });
});
