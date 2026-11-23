/**
 * Fenced code blocks in long-form question fields (GATE CS, 2026-11-23).
 *
 * A GATE CS stem or solution can hold C code, pseudocode or SQL. Drawn as prose it lost its
 * indentation and a pointer star (`int *p`) was read as italic, so a fence (a line of three
 * backticks, optionally with a language, through a closing line of three) is now a third
 * block kind beside prose and pipe-tables: drawn monospace with its spacing kept, and nothing
 * inside it read as maths, bold or a table.
 *
 * Only a fence on its own lines counts. Inline backticks stay plain text: the bank already
 * uses them as quote marks (`Gateway to the West') and, in some news items, for the rupee sign.
 *
 * The contract covers every surface that splits a field into blocks: the web renderer, V's
 * cards, the Word and PDF downloads and the slides.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import JSZip from "jszip";
import BlockText from "@/components/math/BlockText";
import { parseTableBlocks, stripCodeFences, tableLineRanges } from "@/components/math/parseTableBlocks";
import { hasBlockContent } from "@/lib/chat/tableText";
import { buildAnswerKey, buildQuestionPaper } from "@/lib/export/docxBuilder";
import { blocksHtml } from "@/lib/export/pdf/paperHtml";
import { buildQuestionSlides } from "@/lib/export/pptxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const CODE = ["int main() {", "    int *p = &x;", "    if (a || b) printf(\"$%d\", *p);", "    return 0;", "}"].join("\n");
const STEM = ["Consider the following C program:", "```c", CODE, "```", "What does it print?"].join("\n");

describe("parseTableBlocks: fenced code", () => {
  it("splits prose, a code block and prose, keeping the code exactly", () => {
    expect(parseTableBlocks(STEM)).toEqual([
      { kind: "text", text: "Consider the following C program:" },
      { kind: "code", lang: "c", code: CODE },
      { kind: "text", text: "What does it print?" },
    ]);
  });

  it("reads a fence with no language as lang null", () => {
    expect(parseTableBlocks("```\nx := 1\n```")).toEqual([{ kind: "code", lang: null, code: "x := 1" }]);
  });

  it("never reads pipes, dashes or $ inside a fence as a table or maths", () => {
    const sql = ["```sql", "SELECT a | b", "|---|", "FROM t WHERE c = '$1$';", "```"].join("\n");
    expect(parseTableBlocks(sql)).toEqual([{ kind: "code", lang: "sql", code: "SELECT a | b\n|---|\nFROM t WHERE c = '$1$';" }]);
  });

  it("still finds a table after a code block", () => {
    const blocks = parseTableBlocks(["```c", "x++;", "```", "| a | b |", "|---|---|", "| 1 | 2 |"].join("\n"));
    expect(blocks.map((b) => b.kind)).toEqual(["code", "table"]);
  });

  it("leaves an unclosed fence as plain text, so nothing is swallowed", () => {
    expect(parseTableBlocks("Look:\n```c\nint x;")).toEqual([{ kind: "text", text: "Look:\n```c\nint x;" }]);
  });

  it("leaves inline backticks alone", () => {
    expect(parseTableBlocks("Which city is the `Gateway to the West' ?")).toEqual([
      { kind: "text", text: "Which city is the `Gateway to the West' ?" },
    ]);
  });
});

describe("tableLineRanges with code", () => {
  it("never reports a table inside a fence, and keeps line numbers for one after it", () => {
    const text = ["```", "| a |", "|---|", "```", "| x | y |", "|---|---|", "| 1 | 2 |"].join("\n");
    expect(tableLineRanges(text)).toEqual({ ranges: [[4, 6]], lines: 7 });
  });
});

describe("stripCodeFences (the collapsed preview)", () => {
  it("drops only the fence lines", () => {
    expect(stripCodeFences(STEM)).toBe(["Consider the following C program:", CODE, "What does it print?"].join("\n"));
    expect(stripCodeFences("No code here.")).toBe("No code here.");
  });
});

describe("V's cards load the block renderer for code too", () => {
  it("says yes for a fence, a table, and no for prose", () => {
    expect(hasBlockContent(STEM)).toBe(true);
    expect(hasBlockContent("| a | b |\n|---|---|\n| 1 | 2 |")).toBe(true);
    expect(hasBlockContent("Which city is the `Gateway to the West' ?")).toBe(false);
  });
});

describe("web: BlockText draws code monospace", () => {
  it("renders a pre/code block with the spacing kept and no italics", () => {
    const html = renderToStaticMarkup(createElement(BlockText, { text: STEM }));
    expect(html).toContain("<pre");
    expect(html).toContain("    int *p = &amp;x;");
    expect(html).not.toContain("```");
    expect(html).not.toContain("<em>");
  });
  it("draws text with no fence and no table exactly as before", () => {
    const plain = "Find \\(x\\) if \\(x^2 = 4\\).";
    expect(renderToStaticMarkup(createElement(BlockText, { text: plain }))).not.toContain("<pre");
  });
});

const row = (over: Partial<QuestionRow>): QuestionRow => ({
  id: "q1",
  text: STEM,
  context: null,
  difficulty: "MODERATE",
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "GATE CS" },
  subject: { id: "s", name: "Programming and Data Structures" },
  chapter: { id: "c", name: "Programming in C" },
  subtopic: null,
  questionNumber: "12",
  pyqYear: 2026,
  pyqMonth: null,
  pyqNote: null,
  solution: ["The loop runs once:", "```c", "    x = x + 1;", "```", "So it prints 1."].join("\n"),
  options: (["A", "B", "C", "D"] as const).map((label, i) => ({ label, text: String(i), isCorrect: i === 1, imageUrl: null })),
  ...over,
});

async function zipFile(buf: Buffer, path: string): Promise<string> {
  return (await JSZip.loadAsync(buf)).file(path)!.async("text");
}

describe("Word: code exports as monospace lines", () => {
  it("prints the stem's code in a monospace font with its spaces, and no fence", async () => {
    const xml = await zipFile(await buildQuestionPaper({ title: "T", questions: [row({})] }), "word/document.xml");
    expect(xml).toContain("Consolas");
    expect(xml).toContain('<w:t xml:space="preserve">    int *p = &amp;x;</w:t>');
    expect(xml).not.toContain("```");
    expect(xml).toContain("What does it print?");
  });
  it("prints a solution's code the same way in the answer key", async () => {
    const xml = await zipFile(await buildAnswerKey({ title: "T", questions: [row({})], includeSolutions: true }), "word/document.xml");
    expect(xml).toContain('<w:t xml:space="preserve">    x = x + 1;</w:t>');
    expect(xml).not.toContain("```");
  });
});

describe("PDF: code exports as a pre block", () => {
  it("escapes the code and keeps it out of the maths parser", () => {
    const html = blocksHtml(STEM);
    expect(html).toContain('<pre class="code">');
    expect(html).toContain("    int *p = &amp;x;");
    expect(html).toContain("printf(&quot;$%d&quot;, *p);");
    expect(html).not.toContain("```");
  });
});

describe("slides: code shows in a monospace font", () => {
  it("puts the code lines on the question slide, without the fence", async () => {
    const buf = await buildQuestionSlides({ title: "T", questions: [row({})] });
    const zip = await JSZip.loadAsync(buf);
    const slides = await Promise.all(
      Object.keys(zip.files)
        .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
        .map((f) => zip.file(f)!.async("text")),
    );
    const all = slides.join("");
    expect(all).toContain("Consolas");
    expect(all).toContain("    int *p = &amp;x;");
    expect(all).not.toContain("```");
  });
});
