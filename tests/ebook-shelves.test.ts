/**
 * The store's shelves (2026-10-26): one per exam, in a fixed order, each
 * book with its subject, so 24+ books read as a few shelves rather than one
 * section per book. The shelf comes from the catalog by slug, never from the
 * title, and a book the catalog does not know lands on a last "More books"
 * shelf, so no book on sale can vanish from the page.
 */
import { describe, it, expect } from "vitest";
import { SHELVES, storeShelves, shelfOf, shelfExamSlugs } from "@/lib/ebooks/shelves";
import { isExamSlug } from "@/lib/exam/examContext";

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

  it("puts a Repeated PYQs book on its board's shelf, beside the same subject's Solved Papers", () => {
    expect(shelfOf(book("cbse-12-physics-repeated-pyqs"))).toEqual({ shelf: "cbse-12", subject: "Physics" });
    const shelf = storeShelves([
      book("cbse-12-physics-solved-papers"),
      book("cbse-12-chemistry-solved-papers"),
      book("cbse-12-physics-repeated-pyqs"),
    ])[0];
    expect(shelf.books.map((b) => b.book.slug)).toEqual([
      "cbse-12-physics-solved-papers",
      "cbse-12-physics-repeated-pyqs",
      "cbse-12-chemistry-solved-papers",
    ]);
  });

  // Competitive-exam Repeated PYQs (2026-11-16): JEE and SSC get shelves of their
  // own, and a CET book sits beside that subject's Formula and Notes books.
  it("puts a competitive-exam Repeated PYQs book on its exam's shelf", () => {
    expect(shelfOf(book("jee-mains-physics-repeated-pyqs"))).toEqual({ shelf: "jee-mains", subject: "Physics" });
    expect(shelfOf(book("ssc-cgl-general-awareness-repeated-pyqs"))).toEqual({ shelf: "ssc-cgl", subject: "General Awareness" });
    expect(shelfOf(book("mht-cet-maths-repeated-pyqs"))).toEqual({ shelf: "mht-cet", subject: "Mathematics" });
    expect(shelfOf(book("mht-cet-maths-formulas", "MHT-CET Mathematics Formula Book")).subject).toBe("Mathematics");
  });

  it("orders the JEE and SSC shelves after MHT-CET, before the boards", () => {
    const keys = storeShelves([
      book("cbse-12-physics-repeated-pyqs"),
      book("ssc-cgl-reasoning-repeated-pyqs"),
      book("jee-mains-maths-repeated-pyqs"),
      book("mht-cet-physics-repeated-pyqs"),
    ]).map((s) => s.key);
    expect(keys).toEqual(["mht-cet", "jee-mains", "ssc-cgl", "cbse-12"]);
  });

  // Homi Bhabha Class 9 (2026-11-21): both its books on a shelf of their own, under Science.
  it("puts both Homi Bhabha books on the Homi Bhabha shelf, before More books", () => {
    expect(shelfOf(book("homi-bhabha-9-chapterwise-pyqs"))).toEqual({ shelf: "homi-bhabha-9", subject: "Science" });
    expect(shelfOf(book("homi-bhabha-9-notes", "Homi Bhabha Class 9 Science Notes Book"))).toEqual({
      shelf: "homi-bhabha-9",
      subject: "Science",
    });
    const keys = storeShelves([book("mystery", "Mystery"), book("homi-bhabha-9-notes"), book("cbse-10-science-solved-papers")]).map(
      (s) => s.key
    );
    expect(keys).toEqual(["cbse-10", "homi-bhabha-9", "more"]);
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

describe("shelfExamSlugs", () => {
  // The store puts a student's own exams first by these slugs (ExamFeedList), so a
  // shelf key that stops being an exam slug would quietly fold that shelf away.
  it("is the shelf's own exam for every exam shelf", () => {
    for (const s of SHELVES.filter((s) => s.key !== "more")) {
      expect(isExamSlug(s.key), s.key).toBe(true);
      expect(shelfExamSlugs(s.key)).toEqual([s.key]);
    }
  });

  it("is no exam for More books", () => {
    expect(shelfExamSlugs("more")).toEqual([]);
  });
});
