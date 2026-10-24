import { describe, expect, it } from "vitest";
import { addCatalogSubtopics, formatAuthored, repeatTargets, type Authored, type Catalog } from "../scripts/ssc-cgl/recut";
import { retagSubtopics } from "../scripts/spi/lib";

const KEPT = "aaaaaaaa-0000-0000-0000-000000000001";
const OTHER = "bbbbbbbb-0000-0000-0000-000000000002";

describe("repeatTargets", () => {
  const repeats = {
    "t1-2025-09-12-s3": [{ number: 65, questionId: KEPT, first: "SSC_CGL_T1_2025-09-16_S2 Q59" }],
    "t1-2025-09-14-s3": [{ number: 53, questionId: OTHER, first: "SSC_CGL_T1_2025-09-12_S2 Q52" }],
  };

  it("gives a repeat block the target of the row it repeats", () => {
    const got = repeatTargets(repeats, new Map([[KEPT, "Successive Discounts"]]));
    expect(got.get("t1-2025-09-12-s3")?.get(65)).toBe("Successive Discounts");
  });

  it("leaves out a repeat whose kept row is not in the chapter", () => {
    const got = repeatTargets(repeats, new Map([[KEPT, "Successive Discounts"]]));
    expect(got.has("t1-2025-09-14-s3")).toBe(false);
  });
});

describe("addCatalogSubtopics", () => {
  const catalog = (): Catalog => ({
    "Quantitative Aptitude": [{ chapter: "Number System", subtopics: ["Prime Numbers and Primality", "Divisibility Rules and Missing Digits"] }],
  });
  const authored = (): Authored => ({ subjects: {}, rename: {}, add: { "Quantitative Aptitude": [{ chapter: "Mensuration 3D", subtopics: ["Prisms and Pyramids"] }] } });

  it("adds a new name to both files and keeps every old name", () => {
    const r = addCatalogSubtopics(catalog(), authored(), "Quantitative Aptitude", "Number System", ["Remainders", "Prime Numbers and Primality"]);
    expect(r.added).toEqual(["Remainders"]);
    expect(r.catalog["Quantitative Aptitude"][0].subtopics).toEqual(["Prime Numbers and Primality", "Divisibility Rules and Missing Digits", "Remainders"]);
    expect(r.authored.add["Quantitative Aptitude"]).toContainEqual({ chapter: "Number System", subtopics: ["Remainders"] });
    expect(r.authored.add["Quantitative Aptitude"]).toContainEqual({ chapter: "Mensuration 3D", subtopics: ["Prisms and Pyramids"] });
  });

  it("appends to an existing authored entry for the chapter", () => {
    const a = authored();
    a.add["Quantitative Aptitude"].push({ chapter: "Number System", subtopics: ["Cyclicity"] });
    const r = addCatalogSubtopics(catalog(), a, "Quantitative Aptitude", "Number System", ["Remainders"]);
    expect(r.authored.add["Quantitative Aptitude"].find((c) => c.chapter === "Number System")?.subtopics).toEqual(["Cyclicity", "Remainders"]);
  });

  it("does not change its inputs", () => {
    const c = catalog(), a = authored();
    addCatalogSubtopics(c, a, "Quantitative Aptitude", "Number System", ["Remainders"]);
    expect(c).toEqual(catalog());
    expect(a).toEqual(authored());
  });

  it("refuses a chapter the catalog does not have", () => {
    expect(() => addCatalogSubtopics(catalog(), authored(), "Quantitative Aptitude", "Calculus", ["Limits"])).toThrow(/Calculus/);
  });
});

describe("formatAuthored", () => {
  it("writes one chapter per line, the hand-written file's layout", () => {
    const a = { _comment: "c", subjects: { Reasoning: [{ chapter: "Analogy", subtopics: ["Word", "Number"] }] }, rename: { Mathematics: "Quantitative Aptitude" }, add: { English: [{ chapter: "Vocabulary", subtopics: ["One-Word Substitution"] }] } };
    expect(formatAuthored(a)).toBe(
      [
        "{",
        '  "_comment": "c",',
        '  "subjects": {',
        '    "Reasoning": [',
        '      { "chapter": "Analogy", "subtopics": ["Word", "Number"] }',
        "    ]",
        "  },",
        '  "rename": { "Mathematics": "Quantitative Aptitude" },',
        '  "add": {',
        '    "English": [',
        '      { "chapter": "Vocabulary", "subtopics": ["One-Word Substitution"] }',
        "    ]",
        "  }",
        "}",
        "",
      ].join("\n")
    );
    expect(JSON.parse(formatAuthored(a))).toEqual(a);
  });
});

describe("an SSC transcript re-cut by the SPI retagger", () => {
  const block = (n: number, chapter: string, subtopic: string) =>
    `=== ${n}\nchapter: ${chapter}\nsubtopic: ${subtopic}\ndifficulty: EASY\nanswer: A\nstem:\nQ${n}?\nA: 1\nB: 2\nC: 3\nD: 4\nsolution:\nSo.\n`;

  it("moves the chapter's blocks and leaves other chapters alone", () => {
    const text = [block(51, "Number System", "Prime Numbers and Primality"), block(52, "Averages", "Sum and Mean")].join("\n");
    const r = retagSubtopics(text, "Number System", new Map([[51, "Factors and Primes"]]), ["Factors and Primes"]);
    expect(r.problems).toEqual([]);
    expect(r.changes).toBe(1);
    expect(r.text).toContain("subtopic: Factors and Primes");
    expect(r.text).toContain("subtopic: Sum and Mean");
  });

  it("leaves another subject's block of the same chapter name alone when told which blocks it owns", () => {
    // "Inequalities" is a chapter of both Reasoning and Quantitative Aptitude; the transcript names only the chapter.
    const text = [block(12, "Inequalities", "Coded Inequalities"), block(60, "Inequalities", "Linear Inequalities")].join("\n");
    const owns = (n: number) => n === 12;
    const r = retagSubtopics(text, "Inequalities", new Map([[12, "Reading a Chain"]]), ["Reading a Chain"], owns);
    expect(r.problems).toEqual([]);
    expect(r.changes).toBe(1);
    expect(r.text).toContain("subtopic: Linear Inequalities");
  });
});
