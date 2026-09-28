import { describe, it, expect } from "vitest";
import { NOTES_CHAPTERS, getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { BOOK_POSITION } from "@/lib/notes/bookOrder";
import { topicNav } from "@/lib/notes/keepGoing";

const slugs = (route: string) => getNotesChaptersForSubject(route).map((c) => c.chapterSlug);

describe("MHT-CET notes follow the Balbharati book order (Class XI, then XII)", () => {
  it("Maths", () => {
    expect(slugs("mht-cet-maths")).toEqual([
      // Class XI
      "determinants-and-matrices",
      "straight-line",
      "circle",
      "measures-of-dispersion",
      "complex-numbers",
      "permutations-and-combinations",
      "sets-relations-and-functions",
      "limits",
      // Class XII
      "mathematical-logic",
      "trigonometric-functions",
      "pair-of-straight-lines",
      "vectors",
      "line-and-plane",
      "linear-programming",
      "differentiation",
      "applications-of-derivative",
      "indefinite-integration",
      "definite-integration",
      "applications-of-definite-integral",
      "differential-equations",
      "probability-distribution",
      "binomial-distribution",
    ]);
  });

  it("Chemistry", () => {
    expect(slugs("mht-cet-chemistry")).toEqual([
      // Class XI
      "some-basic-concepts",
      "structure-of-atom",
      "chemical-bonding",
      "redox-reactions",
      "modern-periodic-table",
      "elements-of-group-1-and-2",
      "states-of-matter",
      "surface-chemistry",
      "basic-principles-of-organic-chemistry",
      "alkanes",
      "alkenes",
      "alkynes",
      "aromatic-compounds",
      // Class XII
      "solid-state",
      "solutions",
      "ionic-equilibria",
      "chemical-thermodynamics",
      "electrochemistry",
      "chemical-kinetics",
      "elements-of-group-16-17-and-18",
      "transition-and-inner-transition-elements",
      "coordination-compounds",
      "halogen-derivatives",
      "alcohols-phenols-and-ethers",
      "aldehydes-ketones-and-carboxylic-acids",
      "amines",
      "biomolecules",
      "introduction-to-polymer-chemistry",
      "green-chemistry-and-nanochemistry",
    ]);
  });

  it("Physics", () => {
    expect(slugs("mht-cet-physics")).toEqual([
      // Class XI
      "thermal-properties-of-matter",
      // Class XII
      "rotational-dynamics",
      "mechanical-properties-of-fluids",
      "thermodynamics",
      "oscillations",
      "superposition-of-waves",
      "wave-optics",
      "electrostatics",
      "current-electricity",
      "magnetic-fields-due-to-electric-current",
      "electromagnetic-induction",
      "ac-circuits",
      "dual-nature-of-radiation-and-matter",
      "structure-of-atoms-and-nuclei",
      "semiconductor-devices",
    ]);
  });

  it("places every MHT-CET chapter — a new one cannot ship unplaced", () => {
    const unplaced = NOTES_CHAPTERS.filter(
      (c) => c.subjectRoute.startsWith("mht-cet-") && !BOOK_POSITION[c.subjectRoute]?.[c.chapterSlug]
    ).map((c) => `${c.subjectRoute}/${c.chapterSlug}`);
    expect(unplaced).toEqual([]);
  });

  it("has no position for a chapter that does not exist", () => {
    const stale: string[] = [];
    for (const [route, chapters] of Object.entries(BOOK_POSITION))
      for (const slug of Object.keys(chapters))
        if (!NOTES_CHAPTERS.some((c) => c.subjectRoute === route && c.chapterSlug === slug)) stale.push(`${route}/${slug}`);
    expect(stale).toEqual([]);
  });

  it("gives no two chapters of a subject the same position", () => {
    for (const [route, chapters] of Object.entries(BOOK_POSITION)) {
      const keys = Object.values(chapters).map((p) => `${p.cls}.${p.chapterNo}.${p.within ?? 0}`);
      expect(new Set(keys).size, route).toBe(keys.length);
    }
  });

  it("sends Differentiation on to Applications of Derivative", () => {
    const diff = NOTES_CHAPTERS.find((c) => c.subjectRoute === "mht-cet-maths" && c.chapterSlug === "differentiation")!;
    const order = diff.chapter.subtopicOrder;
    expect(topicNav(diff, order[order.length - 1]).next!.href).toBe("/notes/mht-cet-maths/applications-of-derivative");
  });
});

describe("subjects without a book order", () => {
  it("keep the registry order", () => {
    expect(slugs("nda-maths")).toEqual(
      NOTES_CHAPTERS.filter((c) => c.subjectRoute === "nda-maths").map((c) => c.chapterSlug)
    );
  });
});
