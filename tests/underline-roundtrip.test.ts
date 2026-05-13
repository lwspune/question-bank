/**
 * Round-trip verification: confirm \(\underline{\text{word}}\) survives
 * temml → mathml2omml → docx and lands in word/document.xml as an OMML
 * element Word renders as an underline.
 *
 * mathml2omml encodes MathML <munder>…</munder> (from \underline) as
 * <m:borderBox> with top/left/right hidden — i.e. a box with only the
 * bottom border drawn. Word renders that as an underlined run.
 *
 * <m:nor/> on the inner run forces upright (non-italic) Latin rendering,
 * which is why \text{} inside \underline{} is required: without it the
 * word would render in math-italic style.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { latexToOmml } from "@/lib/export/ommlBuilder";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

function expectUnderlineMarker(omml: string) {
  // <m:borderBox> with hideTop / hideLeft / hideRight all "on" = only bottom
  // border visible = underline. Pulled directly from temml + mathml2omml output.
  expect(omml).toContain("m:borderBox");
  expect(omml).toContain('<m:hideTop m:val="on"/>');
  expect(omml).toContain('<m:hideLeft m:val="on"/>');
  expect(omml).toContain('<m:hideRight m:val="on"/>');
}

describe("underline round-trip — \\underline{\\text{word}}", () => {
  it("temml + mathml2omml produces an OMML borderBox underline", () => {
    const omml = latexToOmml("\\underline{\\text{proportionate}}");
    expect(omml).not.toBeNull();
    expect(omml).toContain("m:oMath");
    expectUnderlineMarker(omml!);
    // Text payload preserved
    expect(omml).toContain("proportionate");
    // Forced upright (non-math-italic) Latin
    expect(omml).toContain("<m:nor/>");
  });

  it("docx export emits the underlined OMML inline in word/document.xml", async () => {
    const q: QuestionRow = {
      id: "q-underline",
      text: "The Constitution ensures \\(\\underline{\\text{proportionate}}\\) representation.",
      context: null,
      difficulty: "EASY",
      solution: null,
      imageUrl: null,
      setId: null,
      exam: { id: "e", name: "NDA" },
      subject: { id: "s", name: "English" },
      chapter: { id: "c", name: "Vocabulary" },
      subtopic: null,
      options: [
        { label: "A", text: "fair", isCorrect: true, imageUrl: null },
        { label: "B", text: "vague", isCorrect: false, imageUrl: null },
        { label: "C", text: "biased", isCorrect: false, imageUrl: null },
        { label: "D", text: "absent", isCorrect: false, imageUrl: null },
      ],
    };
    const buf = await buildQuestionPaper({ title: "UL Test", questions: [q] });
    const zip = await JSZip.loadAsync(buf);
    const xml = await zip.file("word/document.xml")!.async("text");
    expect(xml).not.toContain("<undefined>");
    expect(xml).toContain("m:oMath");
    expectUnderlineMarker(xml);
    expect(xml).toContain("The Constitution ensures");
    expect(xml).toContain("representation");
    expect(xml).toContain("proportionate");
  });
});
