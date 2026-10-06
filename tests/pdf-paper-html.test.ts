/**
 * The PDF paper + key (2026-10-05): built as one HTML page, then printed by a
 * headless Chromium. These tests pin the HTML, which is the part we own; the
 * printing is Chromium's. What they do NOT prove is how a page LOOKS — open a
 * generated PDF for that (`npm run pdf:sample`).
 */
import { describe, it, expect } from "vitest";
import {
  buildPaperHtml,
  buildKeyHtml,
  optionLayout,
  richHtml,
} from "@/lib/export/pdf/paperHtml";
import type { OptionRow, QuestionRow } from "@/lib/questions/query";
import { imagePathsFor } from "@/lib/export/pdf/images";

function q(over: Partial<QuestionRow> = {}): QuestionRow {
  return {
    id: "q1",
    text: "What is \\(2 + 2\\)?",
    context: null,
    solution: "Add them: \\(2+2=4\\).",
    difficulty: "EASY",
    imageUrl: null,
    solutionImageUrl: null,
    setId: null,
    exam: { id: "e", name: "JEE Mains" },
    subject: { id: "s", name: "Maths" },
    chapter: { id: "c", name: "Arithmetic" },
    subtopic: { id: "t", name: "Addition" },
    questionNumber: null,
    pyqYear: 2016,
    pyqMonth: null,
    pyqNote: null,
    options: [
      { label: "A", text: "3", isCorrect: false, imageUrl: null },
      { label: "B", text: "4", isCorrect: true, imageUrl: null },
      { label: "C", text: "5", isCorrect: false, imageUrl: null },
      { label: "D", text: "6", isCorrect: false, imageUrl: null },
    ],
    ...over,
  };
}

const base = { title: "Test Paper", head: "" };

describe("richHtml", () => {
  it("escapes HTML in prose, so a stem can never inject markup", () => {
    const html = richHtml("a <script>alert(1)</script> & b");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp; b");
  });

  it("typesets math with KaTeX on the server", () => {
    const html = richHtml("Find \\(\\int_0^1 x^2\\,dx\\).");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("\\int");
  });

  it("typesets reaction arrows", () => {
    const html = richHtml("\\(\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3}\\)");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
  });

  it("typesets mhchem \\ce{}", () => {
    const html = richHtml("\\(\\ce{CH3COOH -> CH3COO- + H+}\\)");
    expect(html).not.toContain("katex-error");
  });

  it("keeps bad LaTeX visible instead of throwing", () => {
    expect(() => richHtml("\\(\\frac{1}{\\)")).not.toThrow();
  });

  it("renders **bold** and line breaks", () => {
    const html = richHtml("**Assertion** one\ntwo");
    expect(html).toContain("<strong>Assertion</strong>");
    expect(html).toContain("<br>");
  });

  it("prints an underlined word in the body font, like the site", () => {
    const html = richHtml("The word \\(\\underline{\\text{absently}}\\) means");
    expect(html).toContain('<u>absently</u>');
    expect(html).not.toContain('class="katex"');
  });

  it("prints the cross-mark emoji as a glyph the bundled fonts carry", () => {
    expect(richHtml("Wrong ❌")).toContain("✗");
  });
});

describe("optionLayout", () => {
  const opts = (texts: string[]) =>
    texts.map(
      (text, i): OptionRow => ({
        label: "ABCD"[i] as OptionRow["label"],
        text,
        isCorrect: i === 0,
        imageUrl: null as string | null,
      })
    );

  it("puts four short options on one line", () => {
    expect(optionLayout(opts(["3", "4", "5", "6"]))).toBe("row");
  });

  it("measures math by what prints, not by its LaTeX", () => {
    expect(optionLayout(opts(["\\(\\frac{\\pi}{2}\\)", "\\(\\frac{\\pi}{3}\\)", "\\(\\pi\\)", "\\(2\\pi\\)"]))).toBe("row");
  });

  it("uses two columns for medium options", () => {
    expect(
      optionLayout(opts(["Sodium chloride solution", "Potassium nitrate", "Copper sulphate", "Zinc oxide powder"]))
    ).toBe("grid");
  });

  it("stacks long options", () => {
    const long = "Both Assertion and Reason are true and Reason is the correct explanation";
    expect(optionLayout(opts([long, "b", "c", "d"]))).toBe("stack");
  });

  it("stacks options that carry a picture", () => {
    const o = opts(["1", "2", "3", "4"]);
    o[1].imageUrl = "x.png";
    expect(optionLayout(o)).toBe("stack");
  });
});

describe("buildPaperHtml", () => {
  it("numbers questions and lowercases option labels", () => {
    const html = buildPaperHtml({ ...base, questions: [q(), q({ id: "q2" })] });
    expect(html).toMatch(/class="qn">1\.</);
    expect(html).toMatch(/class="qn">2\.</);
    expect(html).toContain("(a)");
    expect(html).not.toContain("(A)");
  });

  it("never prints which option is correct", () => {
    const html = buildPaperHtml({ ...base, questions: [q()] });
    expect(html).not.toMatch(/correct/i);
  });

  it("prints a shared passage once, naming its questions", () => {
    const sib = (id: string) => q({ id, setId: "s1", context: "Read the passage." });
    const html = buildPaperHtml({ ...base, questions: [q(), sib("a"), sib("b")] });
    expect(html).toContain("Common context for questions 2-3");
    expect(html.match(/Read the passage\./g)).toHaveLength(1);
  });

  it("renders a pipe-table as a real table", () => {
    const html = buildPaperHtml({
      ...base,
      questions: [q({ text: "Match:\n| A | B |\n|---|---|\n| x | y |" })],
    });
    expect(html).toContain("<table");
    expect(html).not.toContain("|---|");
  });

  it("embeds a question picture it was given and skips one it was not", () => {
    const html = buildPaperHtml({
      ...base,
      questions: [q({ imageUrl: "a.png" }), q({ id: "q2", imageUrl: "missing.png" })],
      images: new Map([["a.png", "data:image/png;base64,AAAA"]]),
    });
    expect(html).toContain('src="data:image/png;base64,AAAA"');
    expect(html).not.toContain("missing.png");
  });

  it("cites the source only when asked", () => {
    expect(buildPaperHtml({ ...base, questions: [q()] })).not.toContain("[JEE Mains 2016]");
    expect(buildPaperHtml({ ...base, questions: [q()], includeSourceTag: true })).toContain(
      "[JEE Mains 2016]"
    );
  });

  it("heads each subtopic run when grouping", () => {
    const html = buildPaperHtml({ ...base, questions: [q(), q({ id: "q2" })], groupBySubtopic: true });
    expect(html.match(/class="subtopic"/g)).toHaveLength(1);
  });

  it("heads a past paper by its own sections, on paper and key", () => {
    const qs = [q({ id: "p1" }), q({ id: "p2" }), q({ id: "c1" })];
    const sectionOf = new Map([
      ["p1", "Physics"],
      ["p2", "Physics"],
      ["c1", "Chemistry"],
    ]);
    const paper = buildPaperHtml({ ...base, questions: qs, sectionOf });
    expect(paper.match(/class="subtopic"/g)).toHaveLength(2);
    expect(paper.indexOf(">Physics<")).toBeLessThan(paper.indexOf(">Chemistry<"));
    expect(paper).not.toContain(">Addition<");
    const key = buildKeyHtml({ ...base, questions: qs, sectionOf, includeSolutions: true });
    expect(key.match(/class="subtopic"/g)).toHaveLength(2);
    expect(key).toContain(">Chemistry<");
  });

  it("brands a pass paper and leaves an unbranded one clean", () => {
    expect(buildPaperHtml({ ...base, questions: [q()], branded: true })).toContain('class="watermark"');
    expect(buildPaperHtml({ ...base, questions: [q()], branded: false })).not.toContain(
      'class="watermark"'
    );
  });

  it("numbers every page, with the site address on a pass paper only", () => {
    const branded = buildPaperHtml({ ...base, questions: [q()], branded: true });
    const plain = buildPaperHtml({ ...base, questions: [q()], branded: false });
    for (const html of [branded, plain]) expect(html).toMatch(/@bottom-center\s*\{[^}]*counter\(page\)/);
    expect(branded).toContain("www.pyqvault.com");
    expect(plain).not.toContain("www.pyqvault.com");
  });

  it("escapes the title", () => {
    const html = buildPaperHtml({ ...base, title: "<b>x</b>", questions: [q()] });
    expect(html).toContain("&lt;b&gt;x&lt;/b&gt;");
  });
});

describe("buildKeyHtml", () => {
  const key = (questions: QuestionRow[], includeSolutions = true) =>
    buildKeyHtml({ ...base, questions, includeSolutions });

  it("lists every answer in a grid", () => {
    const html = key([q(), q({ id: "q2" })], false);
    expect(html).toMatch(/class="kn">1</);
    expect(html).toMatch(/class="ka">\(b\)</);
  });

  it("prints solutions only when asked", () => {
    expect(key([q()], true)).toContain("Add them");
    expect(key([q()], false)).not.toContain("Add them");
  });

  it("prints a numeric answer as its value", () => {
    const html = key([q({ questionFormat: "numeric", options: [], numericAnswer: 12.5 })]);
    expect(html).toMatch(/class="ka">12\.5</);
  });

  it("says a cancelled question was cancelled", () => {
    const html = key([q({ cancelledNote: "Dropped by MPSC." })]);
    expect(html).toContain("Cancelled");
    expect(html).toContain("Dropped by MPSC.");
  });

  it("always prints a subjective model answer, even without solutions", () => {
    const html = key([q({ questionFormat: "subjective", options: [], solution: "Model text." })], false);
    expect(html).toContain("Model text.");
  });
});

describe("imagePathsFor", () => {
  const withPics = q({
    imageUrl: "stem.png",
    solutionImageUrl: "solution.png",
    options: q().options.map((o, i) => ({ ...o, imageUrl: i === 0 ? "opt.png" : null })),
  });

  it("gives a paper its question and option pictures, never the solution's", () => {
    expect(imagePathsFor("paper", [withPics]).sort()).toEqual(["opt.png", "stem.png"]);
  });

  it("gives a key only the solution pictures", () => {
    expect(imagePathsFor("key", [withPics])).toEqual(["solution.png"]);
  });
});
