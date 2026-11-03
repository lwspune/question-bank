/**
 * Spec for the board quick-revision sheet checker (2026-11-03). A sheet is the
 * night-before page for one /board chapter: must-know points, formulas,
 * derivations, diagrams, the board's most-asked questions and the mistakes
 * that cost marks. "Quick" is a rule, not a hope, so the checker caps every
 * section; it also refuses maths KaTeX cannot draw and the dashes the voice
 * rule bans, so a broken sheet fails here rather than on a student's phone.
 */
import { describe, it, expect } from "vitest";
import { lintRevisionSheet, REVISION_LIMITS } from "@/lib/board/revision/lint";
import type { RevisionSheet } from "@/lib/board/revision/types";

function sheet(over: Partial<RevisionSheet> = {}): RevisionSheet {
  return {
    examSlug: "mh-hsc-12",
    subjectName: "Physics",
    subjectRoute: "physics",
    chapterName: "Rotational Dynamics",
    chapterSlug: "rotational-dynamics",
    source: "Balbharati Physics Std XII, Chapter 1",
    keyPoints: [
      { term: "Moment of inertia", text: "The rotational analogue of mass: \\(I = \\sum m_i r_i^2\\)." },
      { term: "Radius of gyration", text: "The distance \\(K\\) at which all the mass could sit: \\(I = MK^2\\)." },
      { term: "Torque", text: "The turning effect of a force, \\(\\vec{\\tau} = \\vec{r} \\times \\vec{F}\\)." },
      { term: "Angular momentum", text: "**Conserved** when no external torque acts." },
    ],
    formulas: [{ label: "Banking of road", latex: "\\tan\\theta = \\frac{v^2}{rg}" }],
    derivations: [{ title: "Expression for the period of a conical pendulum", steps: ["Resolve the tension.", "Divide the two equations."] }],
    diagrams: [{ title: "Conical pendulum", labels: ["string", "tension T", "angle θ", "weight mg"] }],
    mostAsked: [
      { topic: "State and prove the theorem of parallel axes", marks: 3, years: [2025, 2023, 2019] },
      { topic: "Derive the period of a conical pendulum", marks: 3, years: [2024, 2022] },
      { topic: "Banking of roads: find the angle", marks: 2, years: [2025, 2020] },
    ],
    mistakes: [
      { title: "Mixing up I and K", body: "\\(K\\) is a length; \\(I\\) has units of kg m²." },
      { title: "Dropping the sign of torque", body: "Clockwise and anticlockwise torques have opposite signs." },
    ],
    ...over,
  };
}

describe("lintRevisionSheet", () => {
  it("passes a complete sheet", () => {
    expect(lintRevisionSheet(sheet())).toEqual([]);
  });

  it("requires the URL slugs to follow the board's own slug rule", () => {
    expect(lintRevisionSheet(sheet({ chapterSlug: "rotational" })).join()).toMatch(/chapterSlug/);
    expect(lintRevisionSheet(sheet({ subjectRoute: "phy" })).join()).toMatch(/subjectRoute/);
  });

  it("requires a named source", () => {
    expect(lintRevisionSheet(sheet({ source: " " })).join()).toMatch(/source/);
  });

  it("requires the core sections", () => {
    expect(lintRevisionSheet(sheet({ keyPoints: sheet().keyPoints.slice(0, 2) })).join()).toMatch(/keyPoints/);
    expect(lintRevisionSheet(sheet({ mostAsked: [] })).join()).toMatch(/mostAsked/);
    expect(lintRevisionSheet(sheet({ mistakes: [] })).join()).toMatch(/mistakes/);
  });

  it("allows a chapter with no formulas, derivations or diagrams (Biology, Geography)", () => {
    expect(lintRevisionSheet(sheet({ formulas: [], derivations: [], diagrams: [] }))).toEqual([]);
  });

  it("caps every section so the sheet stays quick", () => {
    const many = Array.from({ length: REVISION_LIMITS.keyPoints.max + 1 }, (_, i) => ({
      term: `Point ${i}`,
      text: "Short text.",
    }));
    expect(lintRevisionSheet(sheet({ keyPoints: many })).join()).toMatch(/keyPoints/);
  });

  it("caps the length of a point", () => {
    const long = "word ".repeat(200);
    expect(lintRevisionSheet(sheet({ mistakes: [{ title: "x", body: long }, sheet().mistakes[1]] })).join()).toMatch(
      /mistakes\[0\]/
    );
  });

  it("refuses maths KaTeX cannot draw", () => {
    const bad = sheet({ formulas: [{ label: "Broken", latex: "\\frac{v^2" }] });
    expect(lintRevisionSheet(bad).join()).toMatch(/formulas\[0\]/);
    const badInline = sheet({ mistakes: [{ title: "x", body: "see \\(\\frac{1}{\\)" }, sheet().mistakes[1]] });
    expect(lintRevisionSheet(badInline).join()).toMatch(/mistakes\[0\]/);
  });

  it("refuses maths in a formula label, which the page prints as plain text", () => {
    for (const label of ["Molar specific heats (C_V, C_P)", "Speed \\(v\\)", "Area r^2"]) {
      const bad = sheet({ formulas: [{ label, latex: "x" }] });
      expect(lintRevisionSheet(bad).join(), label).toMatch(/formulas\[0\]\.label/);
    }
  });

  it("refuses an unclosed inline math zone", () => {
    const bad = sheet({ keyPoints: [{ term: "x", text: "open \\(I = MK^2 never closed" }, ...sheet().keyPoints.slice(1)] });
    expect(lintRevisionSheet(bad).join()).toMatch(/keyPoints\[0\]/);
  });

  it("refuses em dashes and spaced dashes (the voice rule)", () => {
    for (const dash of ["a — b", "a – b", "a -- b"]) {
      const bad = sheet({ mistakes: [{ title: "x", body: dash }, sheet().mistakes[1]] });
      expect(lintRevisionSheet(bad).join(), dash).toMatch(/dash/);
    }
  });

  it("refuses a literal backslash-n", () => {
    const bad = sheet({ source: "Book\\nChapter 1" });
    expect(lintRevisionSheet(bad).join()).toMatch(/source/);
  });

  it("checks most-asked years and marks", () => {
    const bad = (m: Partial<RevisionSheet["mostAsked"][number]>) =>
      lintRevisionSheet(sheet({ mostAsked: [{ ...sheet().mostAsked[0], ...m }, ...sheet().mostAsked.slice(1)] })).join();
    expect(bad({ years: [] })).toMatch(/mostAsked\[0\]/);
    expect(bad({ years: [1999] })).toMatch(/mostAsked\[0\]/);
    expect(bad({ years: [2019, 2023] })).toMatch(/newest first/);
    expect(bad({ years: [2023, 2023] })).toMatch(/newest first/);
    expect(bad({ marks: 0 })).toMatch(/marks/);
    expect(bad({ marks: 2.5 })).toMatch(/marks/);
  });

  it("lets marks be left out where the past papers do not record them", () => {
    const noMarks = sheet().mostAsked.map(({ marks: _m, ...rest }) => rest);
    expect(lintRevisionSheet(sheet({ mostAsked: noMarks }))).toEqual([]);
  });

  it("requires at least two steps per derivation and two labels per diagram", () => {
    expect(lintRevisionSheet(sheet({ derivations: [{ title: "x", steps: ["one"] }] })).join()).toMatch(/derivations\[0\]/);
    expect(lintRevisionSheet(sheet({ diagrams: [{ title: "x", labels: ["one"] }] })).join()).toMatch(/diagrams\[0\]/);
  });
});
