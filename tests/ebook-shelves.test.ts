/**
 * The store's shelves (2026-10-26): one per exam, in a fixed order, each
 * book with its subject, so 24+ books read as a few shelves rather than one
 * section per book. The shelf comes from the catalog by slug, never from the
 * title, and a book the catalog does not know lands on a last "More books"
 * shelf, so no book on sale can vanish from the page.
 */
import { describe, it, expect } from "vitest";
import { storeShelves, shelfOf } from "@/lib/ebooks/shelves";

const book = (slug: string, title = slug) => ({ slug, title });

describe("shelfOf", () => {
  it("puts a CET book on the MHT-CET shelf under its subject", () => {
    expect(shelfOf(book("mht-cet-maths-formulas", "MHT-CET Mathematics Formula Book"))).toEqual({
      shelf: "mht-cet",
      subject: "Mathematics",
    });
    expect(shelfOf(book("mht-cet-maths-pyq", "MHT-CET Mathematics PYQ Book")).subject).toBe("Mathematics");
  });

  it("puts a board book on its board's shelf under its subject", () => {
    expect(shelfOf(book("mh-hsc-12-physics-solved-papers"))).toEqual({ shelf: "mh-hsc-12", subject: "Physics" });
    expect(shelfOf(book("mh-ssc-10-history-solved-papers"))).toEqual({ shelf: "mh-ssc-10", subject: "History and Political Science" });
    expect(shelfOf(book("cbse-12-biology-solved-papers"))).toEqual({ shelf: "cbse-12", subject: "Biology" });
  });

  it("sends a book the catalog does not know to More books, titled as stored", () => {
    expect(shelfOf(book("nda-maths-pyq", "NDA Mathematics PYQ Book"))).toEqual({ shelf: "more", subject: "NDA Mathematics PYQ Book" });
  });
});

describe("storeShelves", () => {
  const books = [
    book("cbse-10-science-solved-papers"),
    book("mht-cet-maths-formulas", "MHT-CET Mathematics Formula Book"),
    book("mh-hsc-12-physics-solved-papers"),
    book("mht-cet-physics-formulas", "MHT-CET Physics Formula Book"),
    book("mystery-book", "Mystery"),
    book("mht-cet-maths-notes", "MHT-CET Mathematics Notes Book"),
  ];

  it("orders shelves MHT-CET, HSC 12, SSC 10, CBSE 12, CBSE 10, then More books, dropping empty ones", () => {
    expect(storeShelves(books).map((s) => s.key)).toEqual(["mht-cet", "mh-hsc-12", "cbse-10", "more"]);
  });

  it("labels each shelf, with a short name for the jump chips", () => {
    const hsc = storeShelves(books).find((s) => s.key === "mh-hsc-12")!;
    expect(hsc.label).toBe("Maharashtra HSC Class 12");
    expect(hsc.short).toBe("HSC 12");
  });

  it("keeps a subject's books side by side, in the order the store lists them", () => {
    const cet = storeShelves(books).find((s) => s.key === "mht-cet")!;
    expect(cet.books.map((b) => b.book.slug)).toEqual(["mht-cet-maths-formulas", "mht-cet-maths-notes", "mht-cet-physics-formulas"]);
    expect(cet.books.map((b) => b.subject)).toEqual(["Mathematics", "Mathematics", "Physics"]);
  });

  it("shows every book exactly once", () => {
    expect(storeShelves(books).flatMap((s) => s.books.map((b) => b.book.slug)).sort()).toEqual(books.map((b) => b.slug).sort());
  });
});
