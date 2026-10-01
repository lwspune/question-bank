/**
 * A pass download carries the PYQ Vault brand: a light diagonal watermark
 * behind every page and "www.pyqvault.com" in every page's footer. An
 * institute's own staff download carries neither (2026-10-01, the owner's
 * call — see resolveExportAccess's `branded`).
 *
 * Checked on the generated .docx XML, because that is what Word, Google Docs
 * and WPS read. What it does NOT prove is how the watermark LOOKS — open a
 * downloaded paper for that.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildAnswerKey, buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const Q: QuestionRow = {
  id: "q1",
  text: "What is \\(2 + 2\\)?",
  context: null,
  solution: "Add them: 4.",
  difficulty: "EASY",
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Arithmetic" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A", text: "3", isCorrect: false, imageUrl: null },
    { label: "B", text: "4", isCorrect: true, imageUrl: null },
    { label: "C", text: "5", isCorrect: false, imageUrl: null },
    { label: "D", text: "6", isCorrect: false, imageUrl: null },
  ],
};

async function filesOf(buf: Buffer): Promise<Map<string, string>> {
  const zip = await JSZip.loadAsync(buf);
  const out = new Map<string, string>();
  for (const name of Object.keys(zip.files)) {
    const f = zip.file(name);
    if (f && /\.(xml|rels)$/.test(name)) out.set(name, await f.async("text"));
  }
  return out;
}

const matching = (files: Map<string, string>, re: RegExp) =>
  [...files.entries()].filter(([name]) => re.test(name));

async function expectBranded(buf: Buffer, sections: number) {
  const zip = await JSZip.loadAsync(buf);
  const files = await filesOf(buf);

  const footers = matching(files, /^word\/footer\d*\.xml$/);
  expect(footers.length).toBeGreaterThan(0);
  for (const [, xml] of footers) expect(xml).toContain("www.pyqvault.com");

  // The watermark: a picture anchored BEHIND the text, centred on the page.
  const headers = matching(files, /^word\/header\d*\.xml$/);
  expect(headers.length).toBeGreaterThan(0);
  for (const [, xml] of headers) {
    expect(xml).toMatch(/<wp:anchor[^>]*behindDoc="1"/);
    expect(xml).toMatch(/<wp:positionH relativeFrom="page"><wp:align>center<\/wp:align>/);
    expect(xml).toMatch(/<wp:positionV relativeFrom="page"><wp:align>center<\/wp:align>/);
  }
  const media = Object.keys(zip.files).filter((n) => n.startsWith("word/media/"));
  expect(media.length).toBeGreaterThan(0);

  // Every section points at the header and the footer — a section without
  // them would print bare.
  const doc = files.get("word/document.xml")!;
  const sectPrs = doc.match(/<w:sectPr[\s\S]*?<\/w:sectPr>/g) ?? [];
  expect(sectPrs.length).toBe(sections);
  for (const s of sectPrs) {
    expect(s).toContain("<w:headerReference");
    expect(s).toContain("<w:footerReference");
  }
}

async function expectUnbranded(buf: Buffer) {
  const zip = await JSZip.loadAsync(buf);
  const files = await filesOf(buf);
  for (const [, xml] of files) expect(xml).not.toMatch(/pyqvault/i);
  expect(matching(files, /^word\/(header|footer)\d*\.xml$/)).toEqual([]);
  expect(Object.keys(zip.files).filter((n) => n.startsWith("word/media/"))).toEqual([]);
  // The page geometry staff papers have always had.
  expect(files.get("word/document.xml")).toMatch(/w:header="0" w:footer="0"/);
}

describe("docx branding", () => {
  it("brands a question paper", async () => {
    await expectBranded(await buildQuestionPaper({ title: "T", questions: [Q], branded: true }), 1);
  });

  it("brands an answer key with solutions", async () => {
    const buf = await buildAnswerKey({ title: "T", questions: [Q], includeSolutions: true, branded: true });
    await expectBranded(buf, 1);
  });

  it("leaves a question paper unbranded by default", async () => {
    await expectUnbranded(await buildQuestionPaper({ title: "T", questions: [Q] }));
  });

  it("leaves an answer key unbranded when branded is false", async () => {
    await expectUnbranded(
      await buildAnswerKey({ title: "T", questions: [Q], includeSolutions: true, branded: false })
    );
  });
});
