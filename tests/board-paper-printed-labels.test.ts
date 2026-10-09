/**
 * A board past paper downloads with its OWN numbers, marks and "OR" lines
 * (2026-10-09, /question-papers), in Word and in PDF alike.
 *
 * Both builders number questions 1, 2, 3 on their own; a board paper prints
 * "18 (a)", "OR", "18 (b)" and its marks, so the builders take `printedOf`.
 * This is a CONTRACT test: the same paper through both surfaces, because a
 * change to one builder and not the other is how the two drift apart (the
 * solution-table bug, tests/docx-solution-table.test.ts).
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildAnswerKey, buildQuestionPaper } from "@/lib/export/docxBuilder";
import { buildKeyHtml, buildPaperHtml } from "@/lib/export/pdf/paperHtml";
import type { QuestionRow } from "@/lib/questions/query";
import type { PrintedLabel } from "@/lib/questionPapers/exportPlan";

const base = {
  context: null,
  difficulty: "EASY" as const,
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "CBSE Class 12" },
  subject: { id: "s", name: "Physics" },
  chapter: { id: "c", name: "Electrostatics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: 2025,
  pyqMonth: null,
  pyqNote: null,
};
const opts = (correct: string) =>
  (["A", "B", "C", "D"] as const).map((l) => ({ label: l, text: `opt ${l}`, isCorrect: l === correct, imageUrl: null }));

const QUESTIONS: QuestionRow[] = [
  { ...base, id: "q1", text: "First stem.", solution: "Because.", options: opts("B") },
  { ...base, id: "q4", text: "Derive the field.", solution: "Model four a.", options: [], questionFormat: "subjective" },
  { ...base, id: "q5", text: "State Gauss law.", solution: "Model four b.", options: [], questionFormat: "subjective" },
  { ...base, id: "q6", text: "Case part one.", solution: null, options: opts("A"), setId: "case:CS1", context: "The case passage." },
  { ...base, id: "q7", text: "Case part two.", solution: null, options: opts("C"), setId: "case:CS1", context: "The case passage." },
];
const PRINTED = new Map<string, PrintedLabel>([
  ["q1", { number: "1", marks: 1, orBefore: false }],
  ["q4", { number: "4 (a)", marks: 2, orBefore: false }],
  ["q5", { number: "4 (b)", marks: 2, orBefore: true }],
  ["q6", { number: "5 (i)", marks: 1, orBefore: false }],
  ["q7", { number: "5 (ii)", marks: 1, orBefore: false }],
]);
const SECTION = new Map([
  ["q1", "Section A · 1 mark each"],
  ["q4", "Section B · 2 marks each"],
  ["q5", "Section B · 2 marks each"],
  ["q6", "Section C"],
  ["q7", "Section C"],
]);

async function docxText(buf: Buffer): Promise<{ text: string; numbered: number }> {
  const xml = await (await JSZip.loadAsync(buf)).file("word/document.xml")!.async("string");
  const paras = xml.match(/<w:p[ >][\s\S]*?<\/w:p>/g) ?? [];
  const text = paras
    .map((p) => (p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) ?? []).map((t) => t.replace(/<[^>]+>/g, "")).join(""))
    .join("\n");
  return { text, numbered: (xml.match(/<w:numPr>/g) ?? []).length };
}
function htmlText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<\/(div|section|h1|h2|p)>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ");
}
/** The needles appear in this order. */
function inOrder(text: string, needles: string[]) {
  let from = 0;
  for (const n of needles) {
    const at = text.indexOf(n, from);
    expect(at, `"${n}" after position ${from}`).toBeGreaterThanOrEqual(0);
    from = at + n.length;
  }
}

const common = { title: "CBSE Class 12 Physics 2025 (55/1/1)", questions: QUESTIONS, sectionOf: SECTION, printedOf: PRINTED };

describe("a board paper prints its own numbers, marks and OR, in both formats", () => {
  const paperOrder = [
    "Section A · 1 mark each",
    "1.", "First stem.", "[1]",
    "Section B · 2 marks each",
    "4 (a).", "Derive the field.", "[2]",
    "OR",
    "4 (b).", "State Gauss law.", "[2]",
    "Section C",
    "Common context for questions 5 (i)-5 (ii)", "The case passage.",
    "5 (i).", "Case part one.", "[1]",
    "5 (ii).", "Case part two.", "[1]",
  ];

  it("Word paper", async () => {
    const { text, numbered } = await docxText(await buildQuestionPaper(common));
    inOrder(text, paperOrder);
    expect(numbered, "no Word auto-numbering when the paper prints its own numbers").toBe(0);
  });

  it("PDF paper", () => {
    inOrder(htmlText(buildPaperHtml({ ...common, head: "" })), paperOrder);
  });

  const keyOrder = ["1.", "(b)", "4 (a).", "Model four a.", "4 (b).", "Model four b.", "5 (i).", "(a)", "5 (ii).", "(c)"];

  it("Word answer key", async () => {
    const { text, numbered } = await docxText(await buildAnswerKey({ ...common, includeSolutions: false }));
    inOrder(text, keyOrder);
    expect(numbered).toBe(0);
  });

  it("PDF answer key", () => {
    inOrder(htmlText(buildKeyHtml({ ...common, includeSolutions: false, head: "" })), [
      // The grid first, then the written answers.
      "1", "(b)", "4 (a)", "Written", "4 (b)", "Written", "5 (i)", "(a)", "5 (ii)", "(c)",
      "4 (a).", "Model four a.", "4 (b).", "Model four b.",
    ]);
  });

  it("leaves an ordinary download numbered 1, 2, 3 as before", async () => {
    const { numbered } = await docxText(await buildQuestionPaper({ title: "x", questions: QUESTIONS }));
    expect(numbered).toBeGreaterThan(0);
    const html = htmlText(buildPaperHtml({ title: "x", questions: QUESTIONS, head: "" }));
    expect(html).not.toContain("[2]");
    expect(html).not.toMatch(/\nOR\n/);
  });
});

describe("a question in parts prints its marks once, in both formats (0147)", () => {
  const parts = [
    { ...base, id: "p1", text: "Derive the expression.", solution: "Model one.", options: [], questionFormat: "subjective" as const },
    { ...base, id: "p2", text: "Calculate the value.", solution: "Model two.", options: [], questionFormat: "subjective" as const },
  ];
  const printed = new Map<string, PrintedLabel>([
    ["p1", { number: "31 (i)", marks: 4, orBefore: false }],
    ["p2", { number: "31 (ii)", marks: null, orBefore: false }],
  ]);
  const input = { title: "x", questions: parts, printedOf: printed, sectionOf: new Map([["p1", "Section D"], ["p2", "Section D"]]) };

  it("Word", async () => {
    const { text } = await docxText(await buildQuestionPaper(input));
    inOrder(text, ["31 (i).", "Derive the expression.", "[4]", "31 (ii).", "Calculate the value."]);
    expect(text.split("31 (ii).")[1]).not.toContain("[");
  });

  it("PDF", () => {
    const text = htmlText(buildPaperHtml({ ...input, head: "" }));
    inOrder(text, ["31 (i).", "Derive the expression.", "[4]", "31 (ii).", "Calculate the value."]);
    expect(text.split("31 (ii).")[1]).not.toContain("[");
  });
});
