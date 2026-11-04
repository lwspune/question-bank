/**
 * The board revision sheet as a PDF page (2026-11-03): every section of the
 * sheet, its maths rendered, branding by the paper rule (a pass download
 * carries the watermark and site footer, a staff one is clean), and nothing
 * from the text reaching the page unescaped.
 */
import { describe, it, expect } from "vitest";
import { buildRevisionSheetHtml, revisionSheetFilename } from "@/lib/export/pdf/revisionSheetHtml";
import type { RevisionSheet } from "@/lib/board/revision/types";

const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Rotational Dynamics",
  chapterSlug: "rotational-dynamics",
  source: "Balbharati Physics Std XII, Chapter 1",
  keyPoints: [
    { term: "Moment of inertia", text: "Rotational analogue of mass: \\(I = \\sum m_i r_i^2\\)." },
    { term: "Radius of gyration", text: "**Not** a radius of the body." },
    { term: "Torque", text: "Turning effect of a force." },
    { term: "A <b>tag</b>", text: "Escaped & safe." },
  ],
  formulas: [{ label: "Banking angle", latex: "\\tan\\theta = \\frac{v^2}{rg}" }],
  derivations: [{ title: "Period of a conical pendulum", steps: ["Resolve T.", "Divide."] }],
  diagrams: [{ title: "Conical pendulum", labels: ["tension T", "weight mg"] }],
  mostAsked: [
    { topic: "Theorem of parallel axes", marks: 3, years: [2025, 2023] },
    { topic: "Conical pendulum", years: [2024] },
    { topic: "Banking of roads", marks: 2, years: [2022] },
  ],
  mistakes: [
    { title: "I versus K", body: "K is a length." },
    { title: "Sign of torque", body: "Opposite senses, opposite signs." },
  ],
};

describe("buildRevisionSheetHtml", () => {
  const html = buildRevisionSheetHtml({ sheet, head: "<!--head-->", branded: false });

  it("names the chapter, the subject and the source", () => {
    expect(html).toContain("Rotational Dynamics");
    expect(html).toContain("Physics");
    expect(html).toContain("Balbharati Physics Std XII, Chapter 1");
    expect(html).toContain("<!--head-->");
  });

  it("prints every section", () => {
    for (const h of ["Must-know points", "Formulas", "Derivations", "Diagrams", "Most asked in board papers", "Mistakes that cost marks"])
      expect(html).toContain(h);
    expect(html).toContain("Period of a conical pendulum");
    expect(html).toContain("tension T");
    expect(html).toContain("2025, 2023");
    expect(html).toContain("3 marks");
    expect(html.match(/class="mk"/g)?.length).toBe(2);
  });

  it("renders maths and bold, and escapes everything else", () => {
    expect(html).toMatch(/class="katex/);
    expect(html).not.toMatch(/katex-error/);
    expect(html).toContain("<b>Not</b>");
    expect(html).toContain("A &lt;b&gt;tag&lt;/b&gt;");
    expect(html).toContain("Escaped &amp; safe.");
  });

  it("leaves out a section with nothing in it", () => {
    const bare = buildRevisionSheetHtml({
      sheet: { ...sheet, formulas: [], derivations: [], diagrams: [] },
      head: "",
      branded: false,
    });
    expect(bare).not.toContain(">Formulas<");
    expect(bare).not.toContain(">Derivations<");
    expect(bare).not.toContain(">Diagrams<");
  });

  it("brands a pass download and leaves a staff one clean", () => {
    const branded = buildRevisionSheetHtml({ sheet, head: "", branded: true });
    expect(branded).toContain('class="watermark"');
    expect(branded).toContain("www.pyqvault.com");
    expect(html).not.toContain('class="watermark"');
    expect(html).not.toContain("www.pyqvault.com");
  });

  it("names the file after the subject and chapter", () => {
    expect(revisionSheetFilename("Physics", "Rotational Dynamics")).toBe("Revision_Physics_Rotational_Dynamics.pdf");
  });
});
