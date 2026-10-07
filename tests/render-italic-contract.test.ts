/**
 * Markdown single-asterisk `*italics*` in a long-form field must render as
 * ITALIC on every surface (web, Word, PDF, slides) — and every asterisk that is
 * NOT intended emphasis must render exactly as it does today.
 *
 * Why: the renderer only understood `**bold**`, so `*Homo sapiens*` reached
 * students with its asterisks on the web AND in downloaded papers. A
 * 2026-10-07 inventory of every row (all visibilities, options, Marathi
 * translations, quiz atoms) plus /notes and /guide found 1,716 intended spans
 * and 904 asterisks that must stay literal (multiplication, inline bullets,
 * footnote markers, broken bold). The rule is deliberately STRICT, not
 * CommonMark: CommonMark allows intra-word emphasis, which would italicize
 * `sigma_x*sigma_y*`. Every negative below is a real row shape from that scan.
 *
 * Sibling of render-bold-contract: fixing one surface and not the others is the
 * failure mode this file exists to stop.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { parseRichSegments, parseRichText, splitItalic } from "@/components/math/parseLatex";
import { textWithMathToOmmlSegments } from "@/lib/export/ommlBuilder";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import { richHtml } from "@/lib/export/pdf/paperHtml";
import type { QuestionRow } from "@/lib/questions/query";

/** The italic spans splitItalic finds, in order. */
const italics = (s: string) => splitItalic(s).filter((p) => p.italic).map((p) => p.text);

describe("splitItalic: intended emphasis becomes italic (real row shapes)", () => {
  it.each([
    ["the substance that loses oxygen here is lead *oxide*, not lead.", ["oxide"]],
    ["*Colchicum autumnale*", ["Colchicum autumnale"]],
    ["*Hind II*, *Alu I*", ["Hind II", "Alu I"]],
    ["converted into pointed hard thorns in *Citrus* and *Bougainvillea* (b)", ["Citrus", "Bougainvillea"]],
    ["the following statements : *Statement 'A'* : The climate", ["Statement 'A'"]],
    ["योग्य पर्याय निवडा. *विधान* : काही कुत्रे", ["विधान"]],
    ["The Hatha Yogic treatise *Amrita Kunda* had lasting impact", ["Amrita Kunda"]],
    ["Asheed got a playing top (*lattu*) as his birthday", ["lattu"]],
    ["*(Either of the two above is a complete answer. Two more, for context:)*", ["(Either of the two above is a complete answer. Two more, for context:)"]],
    ["*Paramecium, Amoeba,* Caserta", ["Paramecium, Amoeba,"]],
    ['Identify the operation: *"A 23-minute set of strikes"* (2025)', ['"A 23-minute set of strikes"']],
  ])("%s", (input, expected) => {
    expect(italics(input)).toEqual(expected);
  });

  it("keeps the surrounding text verbatim", () => {
    expect(splitItalic("lead *oxide*, not lead")).toEqual([
      { italic: false, text: "lead " },
      { italic: true, text: "oxide" },
      { italic: false, text: ", not lead" },
    ]);
  });
});

describe("splitItalic: every non-emphasis asterisk stays exactly as today", () => {
  it.each([
    ["multiplication between word characters", "Angle = |30*hour - 11/2*minutes|."],
    ["multiplication between digits", "65 = 5*11 + 10, so 65 is congruent"],
    ["plain-text product", "r=cov/(sigma_x*sigma_y). 0.6=27/(sigma_x*5)."],
    ["spaced operator", "2 * 3 * 4 = 24"],
    ["inline bullets", "R = rL/A Where * R is the resistance. * r is the resistivity."],
    ["bullet at line start", "* an important objective of the scheme"],
    ["footnote marker after a number", "Q.10* (starred — optional / harder)"],
    ["footnote marker in brackets", "(6*) Which set of numbers could"],
    ["a quoted symbol", "If B stands for '-', C stands for '*', what is the value"],
    ["the Word-conversion junk", "*\\* \\(0\\) Since we are given"],
    ["broken bold left by a split", "Ans. (a) :** Given expression is"],
    ["intra-word emphasis (strict rule leaves it)", "in a *C*apacitor the current leads"],
    ["intra-word prefix", "makes silicon a *semi*conductor: too few"],
    ["a span that crosses a line break", "*(Two more, equally valid:\nthe second one)*"],
    ["a lone star", "dependent mass of 4 and R ? *"],
  ])("%s", (_label, input) => {
    expect(italics(input)).toEqual([]);
    expect(splitItalic(input).map((p) => p.text).join("")).toBe(input);
  });
});

describe("parseRichSegments carries an italic flag beside bold", () => {
  it("flags an italic text run", () => {
    expect(parseRichSegments("lead *oxide*, not lead")).toEqual([
      { type: "text", content: "lead " },
      { type: "text", content: "oxide", italic: true },
      { type: "text", content: ", not lead" },
    ]);
  });

  it("carries italic across a math zone inside the span", () => {
    const segs = parseRichSegments("so *the value of \\(x\\) is fixed* here");
    expect(segs[0]).toEqual({ type: "text", content: "so " });
    expect(segs[1]).toEqual({ type: "text", content: "the value of ", italic: true });
    expect(segs[2]).toMatchObject({ type: "inline", content: "x", italic: true });
    expect(segs[3]).toEqual({ type: "text", content: " is fixed", italic: true });
    expect(segs[4]).toEqual({ type: "text", content: " here" });
  });

  it("does not open italics inside maths", () => {
    expect(parseRichSegments("\\(a*b*c\\) holds")).toEqual([
      { type: "inline", content: "a*b*c" },
      { type: "text", content: " holds" },
    ]);
  });

  it("resolves bold and italic side by side, and leaves a star INSIDE bold as today", () => {
    expect(parseRichSegments("**Note:** *Homo sapiens*")).toEqual([
      { type: "text", content: "Note:", bold: true },
      { type: "text", content: " " },
      { type: "text", content: "Homo sapiens", italic: true },
    ]);
    // A star inside a bold span is unchanged (literal), exactly as before.
    expect(parseRichSegments("**the *cis* isomer**")).toEqual([
      { type: "text", content: "the *cis* isomer", bold: true },
    ]);
  });

  it("is a no-op on text with no asterisks", () => {
    expect(parseRichSegments("plain prose")).toEqual([{ type: "text", content: "plain prose" }]);
  });
});

describe("parseRichText (notes) gets the same italics", () => {
  it("italicises inside a list item", () => {
    const blocks = parseRichText("- **Fungi** (e.g. *Penicillium*) — not plants");
    expect(blocks[0]).toMatchObject({ type: "list" });
    const runs = (blocks[0] as { items: unknown[][] }).items[0];
    expect(runs).toContainEqual({ type: "text", content: "Penicillium", italic: true });
  });
});

describe("Word export: italic is a native italic run, never literal stars", () => {
  it("flags the segment", () => {
    expect(textWithMathToOmmlSegments("lead *oxide*, not lead")).toEqual([
      { type: "text", content: "lead " },
      { type: "text", content: "oxide", italic: true },
      { type: "text", content: ", not lead" },
    ]);
  });

  it("writes <w:i/> on the run and drops the markers", async () => {
    const Q = {
      id: "q-italic",
      text: "Which plant is *Colchicum autumnale*?",
      context: null,
      solution: null,
      difficulty: "EASY",
      imageUrl: null,
      solutionImageUrl: null,
      setId: null,
      exam: { id: "e", name: "NEET" },
      subject: { id: "s", name: "Botany" },
      chapter: { id: "c", name: "Plant Kingdom" },
      subtopic: null,
      questionNumber: null,
      pyqYear: null,
      pyqMonth: null,
      pyqNote: null,
      options: [
        { label: "A" as const, text: "*Allium cepa*", isCorrect: true, imageUrl: null },
        { label: "B" as const, text: "5*11", isCorrect: false, imageUrl: null },
        { label: "C" as const, text: "c", isCorrect: false, imageUrl: null },
        { label: "D" as const, text: "d", isCorrect: false, imageUrl: null },
      ],
    } as unknown as QuestionRow;
    const zip = await JSZip.loadAsync(await buildQuestionPaper({ title: "T", questions: [Q] }));
    const xml = await zip.file("word/document.xml")!.async("text");
    expect(xml).toMatch(/<w:i\/>[\s\S]{0,200}Colchicum autumnale/);
    expect(xml).not.toContain("*Colchicum");
    expect(xml).not.toContain("*Allium");
    expect(xml).toContain("5*11"); // multiplication untouched
  });
});

describe("PDF export: italic is <em>", () => {
  it("wraps the span and keeps a product literal", () => {
    expect(richHtml("lead *oxide*, not lead")).toContain("<em>oxide</em>");
    expect(richHtml("65 = 5*11 + 10")).toContain("5*11");
  });
});
