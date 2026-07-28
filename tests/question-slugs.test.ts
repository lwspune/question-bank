/**
 * Spec for the /questions landing-page slugs.
 *
 * These strings become PERMANENT public URLs the moment Google indexes them, so
 * the rules are pinned here against REAL taxonomy names pulled from the live
 * bank — ampersands, roman numerals, digits-first chapter names, commas and
 * parentheses all appear in the actual `chapters` / `subjects` tables.
 *
 * The other half of this file guards the thing that would silently break the
 * routing: two chapters in one subject whose names slugify identically. We must
 * never publish two URLs that resolve to the same page — one of them has to be
 * dropped, deterministically.
 */
import { describe, it, expect } from "vitest";
import { slugifyName, findBySlug, dedupeBySlug } from "@/lib/questions/slugs";

describe("slugifyName", () => {
  it("lowercases a plain subject name", () => {
    expect(slugifyName("Mathematics")).toBe("mathematics");
  });

  it("turns ampersands into a plain separator, not the word 'and'", () => {
    // "Sequence & Series" and "Sequence and Series" both exist across exams;
    // collapsing '&' to a separator keeps the URL clean and readable.
    expect(slugifyName("Sequence & Series")).toBe("sequence-series");
    expect(slugifyName("Work, Energy & Power")).toBe("work-energy-power");
    expect(slugifyName("Height & Distance")).toBe("height-distance");
  });

  it("keeps a spelled-out 'and'", () => {
    expect(slugifyName("Line and Plane")).toBe("line-and-plane");
    expect(slugifyName("Acids, Bases and Salts")).toBe("acids-bases-and-salts");
  });

  it("keeps leading digits (3D Geometry is a real chapter)", () => {
    expect(slugifyName("3D Geometry")).toBe("3d-geometry");
  });

  it("keeps trailing roman numerals distinct", () => {
    // Class 10 has 'Science and Technology I' AND '... II' — collapsing these
    // would merge two different subjects onto one URL.
    expect(slugifyName("Science and Technology I")).toBe(
      "science-and-technology-i"
    );
    expect(slugifyName("Science and Technology II")).toBe(
      "science-and-technology-ii"
    );
  });

  it("strips parentheses and other punctuation", () => {
    expect(slugifyName("Units, Measurement & Dimensions")).toBe(
      "units-measurement-dimensions"
    );
    expect(slugifyName("Probability (Distributions)")).toBe(
      "probability-distributions"
    );
  });

  it("collapses runs of separators and trims the ends", () => {
    expect(slugifyName("  Vectors  ")).toBe("vectors");
    expect(slugifyName("A -- B")).toBe("a-b");
    expect(slugifyName("-Leading and trailing-")).toBe("leading-and-trailing");
  });

  it("strips accents rather than emitting them into a URL", () => {
    expect(slugifyName("Bézier Curves")).toBe("bezier-curves");
  });

  it("yields an EMPTY slug for a name with no ASCII letters", () => {
    // Marathi/Hindi subjects exist on disk for mh-ssc-10 and may be ingested
    // later. We deliberately do NOT transliterate — an unsluggable name simply
    // gets no landing page (see the dedupeBySlug guard below), rather than a
    // guessed romanisation nobody would ever search for.
    expect(slugifyName("मराठी")).toBe("");
    expect(slugifyName("π")).toBe("");
  });

  it("is idempotent — slugifying a slug changes nothing", () => {
    const once = slugifyName("Application of Derivatives");
    expect(slugifyName(once)).toBe(once);
  });
});

describe("findBySlug", () => {
  const items = [
    { id: "1", name: "Vectors" },
    { id: "2", name: "3D Geometry" },
    { id: "3", name: "Sequence & Series" },
  ];

  it("resolves a slug back to its item", () => {
    expect(findBySlug(items, "3d-geometry")?.id).toBe("2");
    expect(findBySlug(items, "sequence-series")?.id).toBe("3");
  });

  it("returns null for an unknown slug instead of guessing", () => {
    expect(findBySlug(items, "calculus")).toBeNull();
  });

  it("is case-insensitive on the incoming slug", () => {
    expect(findBySlug(items, "VECTORS")?.id).toBe("1");
  });
});

describe("dedupeBySlug", () => {
  it("leaves a collision-free list untouched", () => {
    const items = [
      { id: "1", name: "Vectors" },
      { id: "2", name: "Circles" },
    ];
    expect(dedupeBySlug(items).map((i) => i.id)).toEqual(["1", "2"]);
  });

  it("drops a later item that would claim an already-taken URL", () => {
    // Real risk: 'Sequence & Series' and 'Sequence and Series'... would NOT
    // collide, but 'Maxima and Minima' vs 'Maxima & Minima' style pairs can.
    const items = [
      { id: "1", name: "Work, Energy & Power" },
      { id: "2", name: "Work Energy Power" },
      { id: "3", name: "Circles" },
    ];
    expect(dedupeBySlug(items).map((i) => i.id)).toEqual(["1", "3"]);
  });

  it("keeps the FIRST occurrence so the winner is deterministic", () => {
    const items = [
      { id: "keep", name: "Sets & Relations" },
      { id: "drop", name: "Sets  &  Relations" },
    ];
    expect(dedupeBySlug(items).map((i) => i.id)).toEqual(["keep"]);
  });

  it("handles an empty list", () => {
    expect(dedupeBySlug([])).toEqual([]);
  });

  it("drops an unsluggable name so no empty URL segment is ever published", () => {
    const items = [
      { id: "ok", name: "Algebra" },
      { id: "unsluggable", name: "मराठी" },
    ];
    expect(dedupeBySlug(items).map((i) => i.id)).toEqual(["ok"]);
  });
});
