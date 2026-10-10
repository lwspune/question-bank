/**
 * The chapter formula sheet (2026-10-10): one A4 PDF per /notes chapter, every
 * formula box, reference table and trap of the chapter, built from the SAME
 * `deriveSummary` the on-screen revision sheet reads, so the two cannot drift.
 *
 * It is a shareable file: once downloaded, nobody re-checks it against the
 * site. So completeness is asserted here, on the pure builder, rather than
 * trusted to a render. The branding rule is the paper rule: a pass or free
 * download carries the watermark and the site URL footer; institute staff get
 * it clean. The sheet never sells anything (owner, 2026-10-10: no "Premium Pass
 * download" line).
 */
import { describe, it, expect } from "vitest";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import {
  buildFormulaSheetHtml,
  formulaSheetFilename,
  formulaSheetStats,
  splitFormulaLines,
} from "@/lib/export/pdf/formulaSheetHtml";

const chapter = getNotesChapterBySlug("nda-maths", "trigonometric-identities")!;
const HEAD = `<link rel="stylesheet" href="katex.css">`;

function build(branded: boolean) {
  return buildFormulaSheetHtml({ chapter, head: HEAD, branded });
}

describe("splitFormulaLines", () => {
  it("splits identities joined by \\qquad onto their own lines, dropping the joining comma", () => {
    expect(splitFormulaLines("a=b,\\qquad c=d,\\qquad e=f")).toEqual(["a=b", "c=d", "e=f"]);
  });
  it("splits a comma + \\quad join too, but not a bare \\quad inside a formula", () => {
    expect(splitFormulaLines("\\sin(A+B)=x,\\quad \\cos(A+B)=y")).toEqual(["\\sin(A+B)=x", "\\cos(A+B)=y"]);
    expect(splitFormulaLines("u+v\\ge 2\\sqrt{uv}\\quad (u,v>0)")).toEqual(["u+v\\ge 2\\sqrt{uv}\\quad (u,v>0)"]);
  });
  it("leaves a single formula alone and drops empty pieces", () => {
    expect(splitFormulaLines("x^2+y^2=1")).toEqual(["x^2+y^2=1"]);
    expect(splitFormulaLines("a=b\\qquad")).toEqual(["a=b"]);
  });
});

describe("buildFormulaSheetHtml", () => {
  const html = build(true);
  const summaries = chapter.slugs.map((s) => deriveSummary(chapter.notes[s]));

  it("names the subject and the chapter", () => {
    expect(html).toContain("Trigonometric Identities");
    expect(html).toContain("NDA Maths");
    expect(html).toContain("Formula Sheet");
  });

  it("carries every subtopic title", () => {
    for (const slug of chapter.slugs) expect(html).toContain(chapter.notes[slug].title.replace(/&/g, "&amp;"));
  });

  it("carries every formula label, every trap and every reference table", () => {
    for (const s of summaries) {
      for (const f of s.formulas) expect(html).toContain(esc(f.label));
      for (const t of s.traps) expect(html).toContain(esc(stripMath(t.title)).slice(0, 24));
      for (const r of s.references) {
        for (const col of r.table.columns) expect(html).toContain(esc(col));
      }
    }
  });

  it("renders every formula through KaTeX with no parse error", () => {
    expect(html).toContain('class="katex');
    expect(html).not.toContain("katex-error");
  });

  it("brands a pass download: watermark and the site URL footer", () => {
    expect(html).toContain('class="watermark"');
    expect(html).toContain("www.pyqvault.com");
  });

  it("leaves an institute staff sheet unbranded", () => {
    const clean = build(false);
    expect(clean).not.toContain('class="watermark"');
    expect(clean).not.toContain("www.pyqvault.com");
    expect(clean).toContain("Trigonometric Identities");
  });

  it("respects the owner's branding switches, which can only remove pieces", () => {
    const noMark = buildFormulaSheetHtml({ chapter, head: HEAD, branded: true, brandingParts: { watermark: false } });
    expect(noMark).not.toContain('class="watermark"');
    expect(noMark).toContain("www.pyqvault.com");
  });

  it("never sells: no pass copy on the sheet", () => {
    expect(html).not.toMatch(/premium pass/i);
    expect(html).not.toMatch(/\bpass download\b/i);
  });

  it("includes the head it is given (fonts + KaTeX css) and is a whole document", () => {
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain(HEAD);
    expect(html).toContain("</html>");
  });
});

describe("formulaSheetStats", () => {
  it("counts what the sheet prints, from the same derivation the screen uses", () => {
    const stats = formulaSheetStats(chapter);
    const summaries = chapter.slugs.map((s) => deriveSummary(chapter.notes[s]));
    expect(stats).toEqual({
      formulas: summaries.reduce((a, s) => a + s.formulas.length, 0),
      references: summaries.reduce((a, s) => a + s.references.length, 0),
      traps: summaries.reduce((a, s) => a + s.traps.length, 0),
    });
    expect(stats.formulas + stats.references).toBeGreaterThan(0);
  });
});

describe("formulaSheetFilename", () => {
  it("is a safe, readable PDF name", () => {
    expect(formulaSheetFilename("NDA Maths", "Trigonometric Identities")).toBe(
      "Formulas_NDA_Maths_Trigonometric_Identities.pdf"
    );
    expect(formulaSheetFilename("MHT-CET Chemistry", "Alcohols, Phenols & Ethers")).toBe(
      "Formulas_MHT-CET_Chemistry_Alcohols_Phenols_Ethers.pdf"
    );
  });
});

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/** The prose before the first inline-math zone, which the builder hands to KaTeX. */
function stripMath(s: string): string {
  return s.split(/\\\(|\$/)[0].replace(/\*\*/g, "").trim();
}
