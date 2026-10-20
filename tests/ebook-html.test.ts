/**
 * An ebook chapter as one HTML page for the printer (2026-10-20): formulas,
 * then every past question grouped by topic in the order it was asked, then
 * the answer key and full solutions.
 *
 * The properties pinned here are the ones a reader cannot check: the key and
 * the solutions point at the SAME numbers as the questions (one numbering
 * pass, lib/books/print numberChapter), a question collapsed into a repeat is
 * absent and unnumbered, and a repeat names every sitting it was asked in.
 * How the page LOOKS is the printer's; open a built PDF for that.
 */
import { describe, it, expect } from "vitest";
import { buildEbookChapterHtml, buildEbookFrontHtml } from "@/lib/ebooks/bookHtml";
import type { BookSection } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";
import type { FormulaSheetChapter } from "@/lib/export/pdf/formulaSheetHtml";

function q(id: string, correct: "A" | "B" | "C" | "D", over: Partial<QuestionRow> = {}): QuestionRow {
  return {
    id,
    text: `Stem of ${id}?`,
    context: null,
    solution: `Solution of ${id}.`,
    difficulty: "EASY",
    imageUrl: null,
    solutionImageUrl: null,
    setId: null,
    exam: { id: "e", name: "MHT-CET" },
    subject: { id: "s", name: "Maths" },
    chapter: { id: "c", name: "Vectors" },
    subtopic: { id: "t", name: "Dot Product" },
    questionNumber: null,
    pyqYear: 2024,
    pyqMonth: null,
    pyqNote: null,
    options: (["A", "B", "C", "D"] as const).map((label) => ({
      label,
      text: `opt ${label}`,
      isCorrect: label === correct,
      imageUrl: null,
    })),
    ...over,
  };
}

const set = (id: string, label: string) => ({ setId: null, key: id, questionIds: [id], year: 2024, sitting: 1, label });

const SECTIONS: BookSection[] = [
  {
    key: "cet",
    exam: "MHT-CET",
    title: "MHT-CET PYQ",
    sets: [set("q1", "2021 - 22 Sep Shift 1"), set("q2", "2022 - 5 Aug Shift 2"), set("q3", "2023 - 9 May Shift 1"), set("q4", "2024 - 2 May Shift 1")],
    blocks: [
      { name: "Dot Product", sets: [set("q1", "2021 - 22 Sep Shift 1"), set("q2", "2022 - 5 Aug Shift 2")], questionCount: 2 },
      { name: "Cross Product", sets: [set("q3", "2023 - 9 May Shift 1"), set("q4", "2024 - 2 May Shift 1")], questionCount: 2 },
    ],
    questionCount: 4,
  },
];

const QUESTIONS = new Map([
  ["q1", q("q1", "B")],
  ["q2", q("q2", "C")],
  ["q3", q("q3", "A")],
  ["q4", q("q4", "D")],
]);

const FORMULAS: FormulaSheetChapter = {
  subjectDisplay: "MHT-CET Maths",
  chapter: { chapterName: "Vectors" } as FormulaSheetChapter["chapter"],
  slugs: ["dot"],
  notes: {
    dot: {
      title: "Dot product",
      concepts: [
        {
          kind: "formula",
          slug: "dot-product",
          name: "Dot product",
          formula: { label: "Scalar product", latex: "\\vec a\\cdot\\vec b = |a||b|\\cos\\theta" },
          traps: [],
        },
      ],
    },
  } as unknown as FormulaSheetChapter["notes"],
};

const base = {
  number: 3,
  name: "Vectors",
  bookTitle: "MHT-CET Mathematics",
  sections: SECTIONS,
  questionsById: QUESTIONS,
  excludedIds: new Set<string>(),
  recurrence: new Map<string, string[]>(),
  head: "",
};

/** The text between two markers of the page. */
function between(html: string, from: string, to?: string): string {
  const start = html.indexOf(from);
  expect(start).toBeGreaterThan(-1);
  const end = to ? html.indexOf(to, start) : html.length;
  return html.slice(start, end);
}

describe("buildEbookChapterHtml", () => {
  it("heads the chapter with its number and name", () => {
    const html = buildEbookChapterHtml({ ...base, formulas: null });
    expect(html).toContain("Chapter 3");
    expect(html).toContain("Vectors");
  });

  it("prints the chapter's formulas when it has notes, and none when it does not", () => {
    const withF = buildEbookChapterHtml({ ...base, formulas: FORMULAS });
    expect(withF).toContain('id="formulas"');
    expect(withF).toContain("Dot product");
    expect(withF).toContain("fitFormulaSheet");
    const without = buildEbookChapterHtml({ ...base, formulas: null });
    expect(without).not.toContain('id="formulas"');
  });

  it("groups questions under their topic headings, numbered down the page", () => {
    const qs = between(buildEbookChapterHtml({ ...base, formulas: null }), 'id="questions"', 'id="key"');
    expect(qs.indexOf("Dot Product")).toBeLessThan(qs.indexOf("Stem of q1"));
    expect(qs.indexOf("Stem of q2")).toBeLessThan(qs.indexOf("Cross Product"));
    expect(qs.indexOf("Cross Product")).toBeLessThan(qs.indexOf("Stem of q3"));
    expect(qs).toMatch(/>1\.<\/div>[\s\S]*Stem of q1/);
    expect(qs).toMatch(/>4\.<\/div>[\s\S]*Stem of q4/);
  });

  it("names the sitting each question was asked in", () => {
    const qs = between(buildEbookChapterHtml({ ...base, formulas: null }), 'id="questions"', 'id="key"');
    expect(qs).toContain("2023 - 9 May Shift 1");
  });

  it("drops a collapsed repeat from the page and the numbering, and lists every sitting on the one kept", () => {
    const html = buildEbookChapterHtml({
      ...base,
      formulas: null,
      excludedIds: new Set(["q2"]),
      recurrence: new Map([["q1", ["2021 - 22 Sep Shift 1", "2022 - 5 Aug Shift 2"]]]),
    });
    expect(html).not.toContain("Stem of q2");
    expect(html).toContain("Asked in 2 sittings");
    const qs = between(html, 'id="questions"', 'id="key"');
    expect(qs).toMatch(/>2\.<\/div>[\s\S]*Stem of q3/);
    expect(qs).not.toMatch(/>4\.<\/div>/);
  });

  it("keys every question by the number it carries in the paper", () => {
    const key = between(buildEbookChapterHtml({ ...base, formulas: null }), 'id="key"', 'id="solutions"');
    const pairs = Array.from(key.matchAll(/class="kn">(\d+)<\/span><span class="ka">\(([a-d])\)/g)).map((m) => `${m[1]}${m[2]}`);
    expect(pairs).toEqual(["1b", "2c", "3a", "4d"]);
  });

  it("prints a full solution for every question, under the same number", () => {
    const sol = between(buildEbookChapterHtml({ ...base, formulas: null }), 'id="solutions"');
    expect(sol).toMatch(/>3\.<\/div>[\s\S]*Answer: \(a\)[\s\S]*Solution of q3/);
  });

  it("escapes stem text, so a question cannot inject markup", () => {
    const html = buildEbookChapterHtml({
      ...base,
      formulas: null,
      questionsById: new Map([...QUESTIONS, ["q1", q("q1", "B", { text: "<script>x</script>" })]]),
    });
    expect(html).not.toContain("<script>x</script>");
  });
});

describe("buildEbookFrontHtml", () => {
  const front = buildEbookFrontHtml({
    title: "MHT-CET Mathematics",
    subtitle: "Formula Book + Chapter-wise PYQs",
    years: "2021-2026",
    totalQuestions: 3250,
    chapters: [
      { number: 1, name: "Sets, Relations and Functions", questions: 66, page: 3 },
      { number: 2, name: "Vectors", questions: 320, page: 21 },
    ],
    head: "",
  });

  it("puts the title and the size of the book on the cover", () => {
    expect(front).toContain("MHT-CET Mathematics");
    expect(front).toContain("3,250");
    expect(front).toContain("2021-2026");
  });

  it("lists every chapter with its page", () => {
    expect(front).toMatch(/Sets, Relations and Functions[\s\S]*>3</);
    expect(front).toMatch(/Vectors[\s\S]*>21</);
  });
});
