/**
 * The ebook catalog names which compiled book each ebook prints, in which
 * chapter order, and which /notes subject supplies its formulas. A chapter
 * missing from the order would silently vanish from a book someone paid for,
 * so the order must hold every chapter of the book exactly once.
 */
import { describe, it, expect } from "vitest";
import { EBOOKS, getEbook, ebookChapters } from "@/lib/ebooks/catalog";
import { getBookBySlug } from "@/lib/books/registry";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";

describe("ebook catalog", () => {
  it.each(EBOOKS.map((e) => [e.slug, e] as const))("%s prints every chapter of its book exactly once", (_slug, ebook) => {
    const book = getBookBySlug(ebook.bookSlug);
    expect(book).not.toBeNull();
    const inBook = book!.chapters.map((c) => c.slug).sort();
    expect([...ebook.chapterOrder].sort()).toEqual(inBook);
    expect(new Set(ebook.chapterOrder).size).toBe(ebook.chapterOrder.length);
  });

  it.each(EBOOKS.map((e) => [e.slug, e] as const))("%s has a sample chapter inside the book", (_slug, ebook) => {
    expect(ebook.chapterOrder).toContain(ebook.sampleChapter);
  });

  it("finds the formulas of every MHT-CET Maths chapter that has notes", () => {
    const chapters = ebookChapters(getEbook("mht-cet-maths")!);
    const withNotes = chapters.filter((c) => c.formulas);
    expect(withNotes.length).toBe(24);
    for (const c of withNotes) {
      expect(getNotesChapterBySlug("mht-cet-maths", c.chapter.slug)).not.toBeNull();
    }
    expect(chapters.filter((c) => !c.formulas).map((c) => c.chapter.slug).sort()).toEqual([
      "quadratic-equations",
      "sequences-and-series",
    ]);
  });

  it("opens with Class XI and closes with Class XII, in the textbook's order", () => {
    const order = getEbook("mht-cet-maths")!.chapterOrder;
    expect(order[0]).toBe("trigonometry-ii");
    expect(order.indexOf("limits")).toBeLessThan(order.indexOf("mathematical-logic"));
    expect(order[order.length - 1]).toBe("binomial-distribution");
  });
});
