/**
 * Ebook chapters as HTML for the printer (2026-10-20), three kinds:
 *
 * - PYQ: a chapter opener (number, class, topics with counts), every past
 *   question by topic, the answer key, a full solution to each. The key and
 *   the solutions point at the SAME numbers as the questions (one numbering
 *   pass), a collapsed repeat is absent and unnumbered, and the copy kept
 *   lists every sitting it was asked in.
 * - Formula: each subtopic's formulas with their symbol legends, reference
 *   tables, and traps WITH their explanations.
 * - Notes: each concept taught in full: idea, definition (bullets kept),
 *   formula, worked example, traps; a "Try it" problem whose answer waits at
 *   the end of the chapter.
 *
 * How a page LOOKS is the printer's; open a built PDF for that.
 */
import { describe, it, expect } from "vitest";
import {
  buildEbookFrontHtml,
  buildFormulaChapterHtml,
  buildNotesChapterHtml,
  buildPyqChapterHtml,
} from "@/lib/ebooks/bookHtml";
import type { BookSection } from "@/lib/books/order";
import type { QuestionRow } from "@/lib/questions/query";
import type { NotesChapterRegistration } from "@/lib/notes/chapters";

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
    options: (["A", "B", "C", "D"] as const).map((label) => ({ label, text: `opt ${label}`, isCorrect: label === correct, imageUrl: null })),
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

const pyq = {
  number: 16,
  name: "Vectors",
  classLabel: "Class XII",
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

describe("buildPyqChapterHtml", () => {
  it("opens the chapter with its number, class and topics with their question counts", () => {
    const opener = between(buildPyqChapterHtml(pyq), 'class="opener', 'id="questions"');
    expect(opener).toContain("Chapter 16 · Class XII");
    expect(opener).toContain(">16<");
    expect(opener).toContain("Vectors");
    expect(opener).toMatch(/Dot Product[\s\S]*2 q[\s\S]*Cross Product[\s\S]*2 q/);
  });

  it("carries no formulas: those are the Formula Book's", () => {
    expect(buildPyqChapterHtml(pyq)).not.toContain('class="fcard');
  });

  it("groups questions under their topic headings, numbered down the page in pills", () => {
    const qs = between(buildPyqChapterHtml(pyq), 'id="questions"', 'id="key"');
    expect(qs.indexOf("Dot Product")).toBeLessThan(qs.indexOf("Stem of q1"));
    expect(qs.indexOf("Stem of q2")).toBeLessThan(qs.indexOf("Cross Product"));
    expect(qs).toMatch(/class="qn">1<\/div>[\s\S]*Stem of q1/);
    expect(qs).toMatch(/class="qn">4<\/div>[\s\S]*Stem of q4/);
  });

  it("tags each question with the sitting it was asked in", () => {
    const qs = between(buildPyqChapterHtml(pyq), 'id="questions"', 'id="key"');
    expect(qs).toMatch(/class="src">2023 - 9 May Shift 1</);
  });

  it("drops a collapsed repeat from the page and the numbering, and lists every sitting on the one kept", () => {
    const html = buildPyqChapterHtml({
      ...pyq,
      excludedIds: new Set(["q2"]),
      recurrence: new Map([["q1", ["2021 - 22 Sep Shift 1", "2022 - 5 Aug Shift 2"]]]),
    });
    expect(html).not.toContain("Stem of q2");
    expect(html).toContain("Asked in 2 sittings");
    const qs = between(html, 'id="questions"', 'id="key"');
    expect(qs).toMatch(/class="qn">2<\/div>[\s\S]*Stem of q3/);
    expect(qs).not.toMatch(/class="qn">4<\/div>/);
  });

  it("keys every question by the number it carries in the paper", () => {
    const key = between(buildPyqChapterHtml(pyq), 'id="key"', 'id="solutions"');
    const pairs = Array.from(key.matchAll(/class="kn">(\d+)<\/span><span class="ka">\(([a-d])\)/g)).map((m) => `${m[1]}${m[2]}`);
    expect(pairs).toEqual(["1b", "2c", "3a", "4d"]);
  });

  it("prints a full solution under each number, the answer as a chip", () => {
    const sol = between(buildPyqChapterHtml(pyq), 'id="solutions"');
    expect(sol).toMatch(/class="qn">3<\/div>[\s\S]*class="chip">Answer \(a\)<[\s\S]*Solution of q3/);
  });

  it("escapes stem text, so a question cannot inject markup", () => {
    const html = buildPyqChapterHtml({ ...pyq, questionsById: new Map([...QUESTIONS, ["q1", q("q1", "B", { text: "<script>x</script>" })]]) });
    expect(html).not.toContain("<script>x</script>");
  });
});

const NOTES = {
  subjectRoute: "mht-cet-maths",
  subjectDisplay: "MHT-CET Maths",
  chapterSlug: "circle",
  chapter: { chapterName: "Circle" },
  slugs: ["eq", "tan"],
  notes: {
    eq: {
      title: "Equation of a Circle",
      concepts: [
        {
          kind: "formula",
          slug: "centre-radius",
          name: "Centre-radius form",
          intuition: "Every point sits at the same distance from the centre.",
          definition: "A circle is a set of points:\n- at distance **r**\n- from a centre",
          formula: { label: "Standard form", latex: "(x-h)^2+(y-k)^2=r^2", symbols: [{ symbol: "r", meaning: "the radius" }] },
          authoredExample: { prompt: "Find the centre of x^2+y^2=9.", steps: ["Compare with the form.", "Read off h and k."], answer: "Centre (0, 0)" },
          selfCheckExample: { prompt: "Radius of x^2+y^2=16?", steps: ["r^2 = 16"], answer: "r = 4" },
          traps: [{ title: "Sign of the centre", body: "The signs flip when you read the centre." }],
        },
      ],
    },
    tan: {
      title: "Tangents",
      concepts: [
        {
          kind: "reference",
          slug: "tangent-table",
          name: "Tangent conditions",
          intuition: "Each form has its own tangency condition.",
          definition: "Conditions by form.",
          table: { columns: ["Form", "Condition"], rows: [{ cells: ["y = mx + c", "c² = a²(1+m²)"], noteAmber: "Square both sides." }], caption: "For a circle at the origin." },
          traps: [],
        },
      ],
    },
  },
} as unknown as NotesChapterRegistration;

describe("buildFormulaChapterHtml", () => {
  const html = buildFormulaChapterHtml({ number: 4, classLabel: "Class XI", bookTitle: "MHT-CET Mathematics", chapter: NOTES, head: "" });

  it("heads the chapter with its number, class and name", () => {
    expect(html).toContain("Chapter 4 · Class XI");
    expect(html).toContain("Circle");
  });

  it("gives each subtopic a card with its formulas and what each symbol means", () => {
    expect(html).toMatch(/class="card fcard"[\s\S]*Equation of a Circle[\s\S]*Standard form/);
    expect(html).toMatch(/class="sym"[\s\S]*the radius/);
  });

  it("prints reference tables with their notes and caption", () => {
    expect(html).toMatch(/<table class="ref">[\s\S]*y = mx \+ c[\s\S]*Square both sides[\s\S]*For a circle at the origin/);
  });

  it("explains every trap, not only its title", () => {
    expect(html).toMatch(/class="trap"[\s\S]*Sign of the centre[\s\S]*The signs flip/);
  });

  it("leaves out the teaching: no worked examples", () => {
    expect(html).not.toContain("Worked example");
  });
});

describe("buildNotesChapterHtml", () => {
  const html = buildNotesChapterHtml({ number: 4, classLabel: "Class XI", bookTitle: "MHT-CET Mathematics", chapter: NOTES, head: "" });

  it("teaches each concept: idea, definition with its bullets, formula, worked example", () => {
    expect(html).toMatch(/Centre-radius form[\s\S]*class="intu">Every point sits[\s\S]*<li>at distance <strong>r<\/strong><\/li>[\s\S]*Standard form[\s\S]*Worked example[\s\S]*<li>Compare with the form\.<\/li>[\s\S]*Centre \(0, 0\)/);
  });

  it("prints a reference concept's table", () => {
    expect(html).toMatch(/Tangent conditions[\s\S]*<table class="ref">/);
  });

  it("explains the traps", () => {
    expect(html).toMatch(/Sign of the centre[\s\S]*The signs flip/);
  });

  it("asks the Try it problem in the concept and keeps its answer for the end of the chapter", () => {
    const body = between(html, 'id="concepts"', 'id="answers"');
    expect(body).toContain("Radius of x^2+y^2=16?");
    expect(body).not.toContain("r = 4");
    expect(between(html, 'id="answers"')).toMatch(/Radius of x\^2\+y\^2=16\?[\s\S]*r = 4/);
  });
});

describe("buildEbookFrontHtml", () => {
  const front = buildEbookFrontHtml({
    kind: "pyq",
    title: "MHT-CET Mathematics",
    subtitle: "Every past question 2021-2026.",
    stats: [
      { value: "3,362", label: "past questions" },
      { value: "26", label: "chapters" },
    ],
    preview: "<p>preview</p>",
    chapters: [
      { number: 1, name: "Trigonometry - II", detail: "60 q", page: 3 },
      { number: 2, name: "Vectors", detail: "332 q", page: 21 },
    ],
    head: "",
  });

  it("names the kind of book and its subject on the cover, in the kind's colour", () => {
    expect(front).toContain("PYQ Book");
    expect(front).toContain("MHT-CET Mathematics");
    expect(front).toContain("--acc:#2a736e");
    expect(front).toContain("3,362");
    expect(front).toContain("<p>preview</p>");
  });

  it("colours a Formula Book blue and a Notes Book amber", () => {
    const base = { title: "T", subtitle: "S", stats: [], preview: "", chapters: [], head: "" };
    expect(buildEbookFrontHtml({ ...base, kind: "formula" })).toContain("--acc:#3f56a0");
    expect(buildEbookFrontHtml({ ...base, kind: "notes" })).toContain("--acc:#a94f28");
  });

  it("lists every chapter with its page", () => {
    expect(front).toMatch(/Trigonometry - II[\s\S]*>3</);
    expect(front).toMatch(/Vectors[\s\S]*>21</);
  });
});

describe("THEME_CSS", () => {
  // Measured 2026-10-20: a box-shadow on a card that breaks across pages sent
  // Chrome's print layout into a near-endless loop (the Maths Notes Book's
  // Limits chapter: 6 s without the shadow, over 15 minutes with it). Cards
  // that flow across pages carry a hairline border instead.
  it("gives the cards that break across pages no shadow", async () => {
    const { THEME_CSS } = await import("@/lib/ebooks/theme");
    const rule = THEME_CSS.match(/\.fcard, \.ncard \{[^}]*\}/)?.[0] ?? "";
    expect(rule).toContain("box-shadow: none");
    expect(rule).toMatch(/border: [^;]+solid/);
  });
});
