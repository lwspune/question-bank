/**
 * The .pptx export hand-authors its own OOXML (unlike the .docx path, which
 * delegates serialisation to the `docx` library). PowerPoint validates every
 * part strictly and refuses to open the WHOLE FILE on a single fault, with an
 * error that names neither the part nor the reason.
 *
 * Every guard below was earned by a file PowerPoint actually rejected:
 *   - `sz="undefined"` from a helper called without its optional argument;
 *   - a duplicate `xmlns:m`, because mml2omml ALREADY declares it;
 *   - `cy="3147060.0000000005"`, a fractional value in an integer-typed
 *     coordinate — invisible to a well-formedness check, so it survived a
 *     fully green suite and was caught only by opening the deck;
 *   - a form-feed control character, illegal in XML 1.0.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionSlides } from "@/lib/export/pptxBuilder";
import { attr, escapeXml, xmlFaults } from "@/lib/export/pptxXml";
import type { QuestionRow } from "@/lib/questions/query";

const base = {
  context: null,
  difficulty: "EASY" as const,
  solution: null,
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Statistics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A" as const, text: "20", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "25", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "30", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "35", isCorrect: false, imageUrl: null },
  ],
};

function q(id: string, text: string, extra: Partial<QuestionRow> = {}): QuestionRow {
  return { ...base, id, text, ...extra } as QuestionRow;
}

/** Written as an escape, never a literal — a literal would not survive editing. */
const FORM_FEED = "\u000C";
// eslint-disable-next-line no-control-regex
const ILLEGAL_XML_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
const FRACTIONAL_ATTR = /\b(?:cx|cy|x|y|sz|val|w|h)="-?\d+\.\d+"/;

describe("xmlFaults — the guard itself", () => {
  it("passes well-formed XML", () => {
    expect(xmlFaults(`<a:p><a:r><a:t>hi</a:t></a:r></a:p>`)).toEqual([]);
  });

  it("catches an unclosed tag", () => {
    expect(xmlFaults(`<a:p><a:r></a:p>`).join(" ")).toMatch(/a:r|closes/);
  });

  it("catches a duplicate attribute — the xmlns:m hazard", () => {
    const fault = xmlFaults(
      `<m:oMath xmlns:m="urn:one" xmlns:m="urn:two"><m:t>x</m:t></m:oMath>`
    );
    expect(fault.join(" ")).toMatch(/duplicate/i);
    expect(fault.join(" ")).toMatch(/xmlns:m/);
  });

  it("catches undefined/NaN attribute values", () => {
    expect(xmlFaults(`<a:rPr sz="undefined"/>`).join(" ")).toMatch(/undefined/);
    expect(xmlFaults(`<a:rPr sz="NaN"/>`).join(" ")).toMatch(/NaN/);
  });

  it("catches a raw & or < in text content", () => {
    expect(xmlFaults(`<a:t>a & b</a:t>`).join(" ")).toMatch(/unescaped/i);
    expect(xmlFaults(`<a:t>a &amp; b</a:t>`)).toEqual([]);
  });

  it("self-closing tags do not unbalance the stack", () => {
    expect(xmlFaults(`<a:p><a:noFill/><a:r><a:t>x</a:t></a:r></a:p>`)).toEqual([]);
  });
});

describe("integer-typed attributes", () => {
  it("xmlFaults rejects a fractional coordinate", () => {
    expect(
      xmlFaults(`<a:ext cx="11277600" cy="3147060.0000000005"/>`).join(" ")
    ).toMatch(/fractional|integer/i);
    expect(xmlFaults(`<a:off x="457200" y="1.5"/>`).join(" ")).toMatch(
      /fractional|integer/i
    );
    expect(xmlFaults(`<a:ext cx="11277600" cy="3147060"/>`)).toEqual([]);
  });

  it("attr() refuses a non-integer number at the source", () => {
    expect(() => attr("cy", 3147060.0000000005)).toThrow(/integer/i);
    expect(() => attr("cy", Number.NaN)).toThrow();
    expect(attr("cy", 3147060)).toBe(` cy="3147060"`);
  });

  it("every coordinate in a math-heavy deck is an integer", async () => {
    // The exact shape that failed: a stem with NO math plus four math options,
    // so the fractional math-zone allowance does not happen to cancel.
    const buf = await buildQuestionSlides({
      title: "Fractional regression",
      questions: [
        q("q1", "Plain stem", {
          options: [
            { label: "A", text: "\\(\\frac{1}{2}\\)", isCorrect: true, imageUrl: null },
            { label: "B", text: "\\(\\frac{2}{3}\\)", isCorrect: false, imageUrl: null },
            { label: "C", text: "\\(\\frac{3}{4}\\)", isCorrect: false, imageUrl: null },
            { label: "D", text: "\\(\\frac{4}{5}\\)", isCorrect: false, imageUrl: null },
          ],
        } as Partial<QuestionRow>),
      ],
    });
    const zip = await JSZip.loadAsync(buf);
    const slide = await zip.file("ppt/slides/slide1.xml")!.async("text");
    expect(slide).not.toMatch(FRACTIONAL_ATTR);
  });
});

describe("illegal XML characters", () => {
  // XML 1.0 permits only #x9, #xA, #xD and >= #x20. A control character in a
  // stem — this bank has seen them from shell-mangled LaTeX — makes PowerPoint
  // refuse the file. STRIPPED rather than rejected: this is a RENDER path, so
  // dropping an invisible character beats handing the teacher no deck at all.
  it("escapeXml strips control characters but keeps tab/newline/CR", () => {
    expect(escapeXml(`a${FORM_FEED}b`)).toBe("ab");
    expect(escapeXml("a\u0000b\u001Fc")).toBe("abc");
    expect(escapeXml("a\tb\nc\rd")).toBe("a\tb\nc\rd");
  });

  it("a control character in a stem does not reach the slide", async () => {
    const buf = await buildQuestionSlides({
      title: "Control chars",
      questions: [q("q1", `Compute ${FORM_FEED}(rac{1}{2}) now`)],
    });
    const zip = await JSZip.loadAsync(buf);
    const slide = await zip.file("ppt/slides/slide1.xml")!.async("text");
    expect(slide).not.toMatch(ILLEGAL_XML_CHARS);
  });
});

describe("buildQuestionSlides — every generated part is valid XML", () => {
  it("emits a structurally sound package for a math + table + special-char deck", async () => {
    const buf = await buildQuestionSlides({
      title: "Gate & Test <deck>",
      questions: [
        q("q1", "If \\(\\frac{a}{b} + \\sqrt{x^2+1}\\) equals 5 & x > 0, then k is"),
        q("q2", "Read the table:\n\n| x | 1 | 2 |\n|---|---|---|\n| P(x) | k | 2k |\n\nFind k."),
        q("q3", "Plain question with <angle> brackets and an ampersand & more"),
      ],
    });

    const zip = await JSZip.loadAsync(buf);
    const xmlParts = Object.keys(zip.files).filter(
      (n) => !zip.files[n].dir && (n.endsWith(".xml") || n.endsWith(".rels"))
    );
    expect(xmlParts.length).toBeGreaterThan(5);

    for (const name of xmlParts) {
      const xml = await zip.file(name)!.async("text");
      expect(xmlFaults(xml), `${name} is not well-formed`).toEqual([]);
      expect(xml, `${name} has a fractional coordinate`).not.toMatch(FRACTIONAL_ATTR);
      expect(xml, `${name} has an illegal control character`).not.toMatch(
        ILLEGAL_XML_CHARS
      );
    }
  });

  it("declares xmlns:m exactly once per math block", async () => {
    const buf = await buildQuestionSlides({
      title: "Math",
      questions: [q("q1", "Value of \\(\\frac{1}{2}\\) and \\(\\sqrt{3}\\)")],
    });
    const zip = await JSZip.loadAsync(buf);
    const slide = await zip.file("ppt/slides/slide1.xml")!.async("text");

    const mathBlocks = slide.match(/<m:oMath\b[^>]*>/g) ?? [];
    expect(mathBlocks).toHaveLength(2);
    for (const open of mathBlocks) {
      expect((open.match(/xmlns:m=/g) ?? []).length).toBe(1);
    }
  });
});
