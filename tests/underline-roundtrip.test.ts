/**
 * Round-trip verification: confirm \(\underline{\text{word}}\) and
 * \(\underline{\textit{word}}\) land in word/document.xml as NATIVE
 * Word underline runs (<w:u w:val="single"/>) — NOT as an OMML
 * <m:borderBox> with three sides hidden.
 *
 * Background (2026-05-26): the original 2026-05-13 convention routed
 * \underline{\text{...}} through temml → mathml2omml, which emits
 * <m:borderBox> with hideTop/hideLeft/hideRight. The OMML markup is
 * technically correct (only the bottom border is drawn), but Word's
 * actual rendering of inline-math borderBox is unreliable — the bottom
 * border doesn't draw under the <m:mathPr defJc="left" wrapIndent="0"
 * lMargin="0" rMargin="0"> defaults we inject for fraction alignment.
 * Teachers saw plain text where the bank had an underlined word.
 *
 * Fix: bypass the math pipeline for the documented underline patterns
 * and emit a native Word run with the underline run property. KaTeX
 * (browser preview) still handles the LaTeX directly — unchanged.
 *
 * The latexToOmml borderBox path is preserved as the fallback for any
 * future variant that doesn't match the bypass regex (e.g. nested
 * braces, bold variants). It also still serves direct callers of the
 * LaTeX pipeline (notes preview, future surfaces).
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { latexToOmml } from "@/lib/export/ommlBuilder";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

describe("underline LaTeX pipeline (preserved as fallback)", () => {
  it("latexToOmml still produces a borderBox for direct callers", () => {
    const omml = latexToOmml("\\underline{\\text{proportionate}}");
    expect(omml).not.toBeNull();
    expect(omml).toContain("m:oMath");
    // <m:borderBox> with hideTop/hideLeft/hideRight all "on" = bottom-only
    // border. Preserved so the LaTeX pipeline still works for non-export
    // callers and for fallback shapes that don't match the docx bypass.
    expect(omml).toContain("m:borderBox");
    expect(omml).toContain('<m:hideTop m:val="on"/>');
    expect(omml).toContain('<m:hideLeft m:val="on"/>');
    expect(omml).toContain('<m:hideRight m:val="on"/>');
    expect(omml).toContain("proportionate");
    expect(omml).toContain("<m:nor/>");
  });
});

describe("underline round-trip — docx export uses native Word underline", () => {
  function makeQ(text: string, optionTexts: string[]): QuestionRow {
    return {
      id: "q-underline",
      text,
      context: null,
      difficulty: "EASY",
      solution: null,
      imageUrl: null,
      setId: null,
      exam: { id: "e", name: "NDA" },
      subject: { id: "s", name: "English" },
      chapter: { id: "c", name: "Vocabulary" },
      subtopic: null,
      questionNumber: null,
      pyqYear: null,
      pyqMonth: null,
      pyqNote: null,
      options: optionTexts.map((t, i) => ({
        label: (["A", "B", "C", "D"] as const)[i],
        text: t,
        isCorrect: i === 0,
        imageUrl: null,
      })),
    };
  }

  async function exportXml(q: QuestionRow): Promise<string> {
    const buf = await buildQuestionPaper({ title: "UL Test", questions: [q] });
    const zip = await JSZip.loadAsync(buf);
    return zip.file("word/document.xml")!.async("text");
  }

  it("emits <w:u w:val=\"single\"/> (not <m:borderBox>) for \\underline{\\text{word}}", async () => {
    const q = makeQ(
      "The Constitution ensures \\(\\underline{\\text{proportionate}}\\) representation.",
      ["fair", "vague", "biased", "absent"]
    );
    const xml = await exportXml(q);
    expect(xml).not.toContain("<undefined>");
    expect(xml).toContain('<w:u w:val="single"/>');
    expect(xml).toContain("proportionate");
    expect(xml).toContain("The Constitution ensures");
    expect(xml).toContain("representation");
    // The bypassed pattern must NOT route through OMML borderBox.
    expect(xml).not.toMatch(/<m:borderBox>[\s\S]*proportionate[\s\S]*<\/m:borderBox>/);
  });

  it("emits <w:u> AND italic <w:i/> for \\underline{\\textit{name}} (taxonomy case)", async () => {
    // Taxonomy option D — both italic and underlined; the whole question is
    // about formatting convention so the underline is load-bearing.
    const q = makeQ(
      "Biological name:",
      [
        "\\(\\textit{Amoeba Proteus}\\)",
        "\\(\\textit{Amoeba proteus}\\)",
        "\\(\\textit{amoeba proteus}\\)",
        "\\(\\underline{\\textit{Amoeba}}\\) \\(\\underline{\\textit{Proteus}}\\)",
      ]
    );
    const xml = await exportXml(q);
    expect(xml).toContain('<w:u w:val="single"/>');
    expect(xml).toContain("Amoeba");
    expect(xml).toContain("Proteus");
    // Option D's underlined words must NOT round-trip through OMML borderBox.
    expect(xml).not.toMatch(/<m:borderBox>[\s\S]*Amoeba[\s\S]*<\/m:borderBox>/);
    // Italic on the same run as the underline.
    expect(xml).toMatch(/<w:u w:val="single"\/>[\s\S]*?<w:i\/>|<w:i\/>[\s\S]*?<w:u w:val="single"\/>/);
  });

  it("falls through to OMML borderBox for non-matching shapes", async () => {
    // Bare \underline{x} (no \text wrapper) isn't covered by the bypass.
    // It must still render via the OMML path so the LaTeX expression
    // doesn't appear as literal source text.
    const q = makeQ(
      "Edge case: \\(\\underline{x + y}\\) here.",
      ["one", "two", "three", "four"]
    );
    const xml = await exportXml(q);
    expect(xml).toContain("m:oMath");
    expect(xml).toContain("m:borderBox");
  });
});
