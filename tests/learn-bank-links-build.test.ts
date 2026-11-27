/**
 * buildLearnBankChapters: which bank chapter (exam, subject, chapter, as the database names them)
 * each Learn course chapter teaches. `npm run learn:links` runs it over the bundle and the live
 * taxonomy and writes src/lib/learn/bankLinks.generated.ts; it refuses to write while anything fails.
 */
import { describe, expect, it } from "vitest";
import { type BankChapterRow, buildLearnBankChapters, renderBankLinksFile } from "@/lib/learn/bankLinksBuild";

const EXAM_NAMES: Record<string, string> = { "cbse-12": "CBSE Class 12", "mh-ssc-10": "Maharashtra State Board Class 10", "jee-mains": "JEE Mains", "mh-hsc-12": "Maharashtra HSC Class 12" };
const examNameOf = (slug: string) => EXAM_NAMES[slug];

const BANK: BankChapterRow[] = [
  { exam: "CBSE Class 12", subject: "Mathematics", chapter: "Matrices" },
  { exam: "CBSE Class 12", subject: "Physics", chapter: "Electrostatics" },
  { exam: "CBSE Class 12", subject: "Chemistry", chapter: "Solutions" },
  { exam: "Maharashtra State Board Class 10", subject: "Algebra", chapter: "Quadratic Equations" },
  { exam: "Maharashtra State Board Class 10", subject: "Geometry", chapter: "Similarity" },
  { exam: "Maharashtra State Board Class 10", subject: "Science and Technology I", chapter: "Similarity" },
  { exam: "JEE Mains", subject: "Maths", chapter: "Matrices" },
  { exam: "Maharashtra HSC Class 12", subject: "Mathematics", chapter: "Line and Planes" },
];

const course = (slug: string, exam: string, subject: string, chapters: [string, string][]) => ({
  slug,
  exam,
  subject,
  chapters: chapters.map(([s, title]) => ({ slug: s, title })),
});

describe("buildLearnBankChapters", () => {
  it("names each chapter's bank exam, subject and chapter, by the chapter's title", () => {
    const { links, errors } = buildLearnBankChapters(
      [course("cbse-12-physics", "cbse-12", "physics", [["electrostatics", "Electrostatics"]]), course("jee-mains-maths", "jee-mains", "maths", [["matrices", "Matrices"]])],
      BANK,
      examNameOf,
    );
    expect(errors).toEqual([]);
    expect(links).toEqual({
      "cbse-12-physics/electrostatics": { exam: "CBSE Class 12", subject: "Physics", chapter: "Electrostatics" },
      "jee-mains-maths/matrices": { exam: "JEE Mains", subject: "Maths", chapter: "Matrices" },
    });
  });

  it("finds a maths chapter in whichever maths subject the bank files it under (SSC 10: Algebra, Geometry), never another subject", () => {
    const { links, errors } = buildLearnBankChapters(
      [course("mh-ssc-10-maths", "mh-ssc-10", "maths", [["quadratic-equations", "Quadratic Equations"], ["similarity", "Similarity"]])],
      BANK,
      examNameOf,
    );
    expect(errors).toEqual([]);
    expect(links["mh-ssc-10-maths/quadratic-equations"].subject).toBe("Algebra");
    expect(links["mh-ssc-10-maths/similarity"].subject).toBe("Geometry");
  });

  it("uses an alias where the bank's name differs from the title", () => {
    const { links, errors } = buildLearnBankChapters([course("mh-hsc-12-maths", "mh-hsc-12", "maths", [["line-and-plane", "Line and Plane"]])], BANK, examNameOf);
    expect(errors).toEqual([]);
    expect(links["mh-hsc-12-maths/line-and-plane"].chapter).toBe("Line and Planes");
  });

  it("reports a chapter with no bank chapter, an unknown exam, and two Learn chapters on one bank chapter", () => {
    const { errors } = buildLearnBankChapters(
      [
        course("cbse-12-chemistry", "cbse-12", "chemistry", [["solutions", "Solutions"], ["solutions-again", "Solutions"], ["nowhere", "No Such Chapter"]]),
        course("xyz-maths", "xyz", "maths", [["matrices", "Matrices"]]),
      ],
      BANK,
      examNameOf,
    );
    expect(errors).toHaveLength(3);
    expect(errors.join("\n")).toMatch(/cbse-12-chemistry\/nowhere.*No Such Chapter/);
    expect(errors.join("\n")).toMatch(/cbse-12-chemistry\/solutions-again.*Solutions/);
    expect(errors.join("\n")).toMatch(/xyz-maths.*xyz/);
  });

  it("does not match across subjects of one exam", () => {
    const { errors } = buildLearnBankChapters([course("cbse-12-chemistry", "cbse-12", "chemistry", [["electrostatics", "Electrostatics"]])], BANK, examNameOf);
    expect(errors).toHaveLength(1);
  });
});

describe("renderBankLinksFile", () => {
  it("writes the links sorted, as a typed constant, and says how it was made", () => {
    const file = renderBankLinksFile(
      {
        "jee-mains-maths/matrices": { exam: "JEE Mains", subject: "Maths", chapter: "Matrices" },
        "cbse-12-physics/electrostatics": { exam: "CBSE Class 12", subject: "Physics", chapter: "Electrostatics" },
      },
      "6da3085",
    );
    expect(file).toContain("npm run learn:links");
    expect(file).toContain("Concept Ladder 6da3085");
    expect(file.indexOf("cbse-12-physics/electrostatics")).toBeLessThan(file.indexOf("jee-mains-maths/matrices"));
    expect(file).toMatch(/export const LEARN_BANK_CHAPTERS: Readonly<Record<string, LearnBankChapter>> = \{/);
    expect(file).not.toMatch(/—/);
  });
});
