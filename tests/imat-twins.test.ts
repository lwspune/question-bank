/**
 * IMAT twins: one original practice question per in-scope Cambridge question
 * (2011-2022). A twin keeps the source's chapter, skill, format and
 * difficulty and changes everything else; the originality check
 * (tests/imat-originality.test.ts) holds the "everything else" line.
 *
 * Scope (owner, 2026-10-11): twin a Cambridge question only if its topic is in
 * the current syllabus (DM 1005/2026, Allegato A) or the ministry papers have
 * asked it. Figure questions are in scope: a twin draws or sources its own figure.
 */
import { describe, it, expect } from "vitest";
import { buildTwinRow, checkTwins, criticalThinkingKind, twinScope, type ImatTwin } from "../scripts/imat/practice/lib";
import { contentHash } from "@/lib/upload/hash";
import type { ImatQuestion } from "../scripts/imat/lib";

const q = (over: Partial<ImatQuestion>): ImatQuestion => ({
  n: 1,
  section: "biology",
  chapter: "Cell Structure and Membranes",
  text: "Which organelle makes ATP?",
  options: ["a", "b", "c", "d", "e"],
  ...over,
});

describe("criticalThinkingKind", () => {
  it.each([
    ["Which one of the following can be drawn as a conclusion from the above passage?", "conclusion"],
    ["Which one of the following, if true, would most strengthen the argument above?", "strengthen"],
    ["Which one of the following, if true, most weakens the argument?", "weaken"],
    ["Which one of the following is an underlying assumption of the argument above?", "assumption"],
    ["Which one of the following identifies the flaw in the argument above?", "flaw"],
    ["Which one of the following best illustrates the principle underlying the argument above?", "principle"],
    ["Which one of the following best expresses the main conclusion of the above argument?", "main-conclusion"],
    ["Which one of the following most closely parallels the reasoning used in the above argument?", "parallel"],
  ])("%s -> %s", (text, kind) => {
    expect(criticalThinkingKind(text)).toBe(kind);
  });

  it("does not read 'Which one of the following' as a conclusion question", () => {
    expect(criticalThinkingKind("Which one of the following most closely matches the logical structure of the above argument?")).toBe("parallel");
    expect(criticalThinkingKind("Which one of the following most closely matches the reasoning above?")).toBe("parallel");
    expect(criticalThinkingKind("Which one of the following is the best statement of the issue?")).toBe("other");
  });

  it("still reads a genuine 'follows from' question as a conclusion", () => {
    expect(criticalThinkingKind("Which one of the following follows from the passage?")).toBe("conclusion");
  });

  it("reads 'main conclusion' before the generic 'conclusion'", () => {
    expect(criticalThinkingKind("Which is the main conclusion that can be drawn?")).toBe("main-conclusion");
  });
});

describe("twinScope", () => {
  it("twins a syllabus topic", () => {
    expect(twinScope(q({})).inScope).toBe(true);
  });

  it("twins figure questions too (owner, 2026-10-11): a twin draws or sources its own figure", () => {
    expect(twinScope(q({ figure: { page: 3, note: "graph" } })).inScope).toBe(true);
    expect(twinScope(q({ optionImages: true })).inScope).toBe(true);
  });

  it("drops optics, which is neither in the syllabus nor asked by the ministry, figure or not", () => {
    expect(twinScope(q({ section: "physmath", subject: "Physics", chapter: "Optics" })).inScope).toBe(false);
    expect(twinScope(q({ section: "physmath", subject: "Physics", chapter: "Optics", figure: { page: 1, note: "" } })).inScope).toBe(false);
  });

  it("twins the critical-thinking kinds the syllabus or the ministry covers, and only those", () => {
    const ct = (text: string) => twinScope(q({ section: "logic", chapter: "Critical Thinking", text })).inScope;
    expect(ct("Which one of the following can be drawn as a conclusion from the above passage?")).toBe(true);
    expect(ct("Which one of the following, if true, most weakens the argument?")).toBe(true);
    expect(ct("Which one of the following is an underlying assumption of the argument above?")).toBe(false);
    expect(ct("Which one of the following identifies the flaw in the argument above?")).toBe(false);
  });
});

describe("checkTwins", () => {
  const source = q({ n: 7 });
  const sources = new Map([["2022 Q7", source]]);
  const twin = (over: Partial<ImatTwin> = {}): ImatTwin => ({
    id: "twin-2022-Q7",
    twinOf: "2022 Q7",
    section: "biology",
    chapter: "Cell Structure and Membranes",
    text: "Which organelle carries out photosynthesis in a leaf cell?",
    options: ["Chloroplast", "Mitochondrion", "Ribosome", "Nucleus", "Vacuole"],
    answer: "A",
    solution: "Chloroplasts hold chlorophyll and run both stages of photosynthesis.",
    ...over,
  });

  it("passes a well-formed twin", () => {
    expect(checkTwins([twin()], sources)).toEqual([]);
  });

  it("needs a source that exists and is in scope", () => {
    expect(checkTwins([twin({ twinOf: "2022 Q8", id: "twin-2022-Q8" })], sources).join()).toMatch(/no such past question/);
    const optics = new Map([["2022 Q7", q({ n: 7, section: "physmath", subject: "Physics", chapter: "Optics" })]]);
    expect(checkTwins([twin({ section: "physmath", subject: "Physics", chapter: "Optics" })], optics).join()).toMatch(/out of scope/);
  });

  it("keeps the source's section and chapter, and an id that names it", () => {
    expect(checkTwins([twin({ chapter: "Genetics and Inheritance" })], sources).join()).toMatch(/chapter/);
    expect(checkTwins([twin({ id: "twin-2022-Q9" })], sources).join()).toMatch(/id/);
  });

  it("allows one twin per source", () => {
    expect(checkTwins([twin(), twin()], sources).join()).toMatch(/twinned twice/);
  });

  it("checks the item itself: five distinct options, a letter, a solution, rendering math, no dashes", () => {
    expect(checkTwins([twin({ options: ["a", "a", "b", "c", "d"] })], sources).join()).toMatch(/distinct/);
    expect(checkTwins([twin({ answer: "F" as never })], sources).join()).toMatch(/answer/);
    expect(checkTwins([twin({ solution: "" })], sources).join()).toMatch(/solution/);
    expect(checkTwins([twin({ text: "Find \\(\\frac{1}{\\)" })], sources).join()).toMatch(/KaTeX/);
    expect(checkTwins([twin({ solution: "Chloroplasts — obviously." })], sources).join()).toMatch(/dash/);
  });

  it("refuses control characters: a shell that eats a backslash turns \\text into TAB + 'ext' and \\theta into TAB + 'heta'", () => {
    expect(checkTwins([twin({ text: "Area (16pi \text{cm}^2)" })], sources).join()).toMatch(/control character/);
    expect(checkTwins([twin({ solution: "Line one\r\nline two" })], sources).join()).toMatch(/control character/);
    expect(checkTwins([twin({ text: "Line one\nline two" })], sources)).toEqual([]);
  });

  it("refuses LaTeX outside math: with the delimiters' backslashes gone too, KaTeX never sees it", () => {
    expect(checkTwins([twin({ text: "Butane, (mathrm{C_4H_{10}}), burns." })], sources).join()).toMatch(/LaTeX outside math/);
    expect(checkTwins([twin({ solution: "So (K_c) rises." })], sources).join()).toMatch(/LaTeX outside math/);
    expect(checkTwins([twin({ options: ["(10^{22})", "b", "c", "d", "e"] })], sources).join()).toMatch(/LaTeX outside math/);
    expect(checkTwins([twin({ text: String.raw`Butane, \(\mathrm{C_4H_{10}}\), burns; \(K_c\) rises.` })], sources)).toEqual([]);
  });
});

describe("buildTwinRow", () => {
  const twin: ImatTwin = {
    id: "twin-2022-Q52",
    twinOf: "2022 Q52",
    section: "physmath",
    subject: "Physics",
    chapter: "Dynamics, Work and Energy",
    text: "A 3.0 kg sledge slides to rest.\nWhat is the force?",
    options: ["4.0 N", "1.0 N", "6.0 N", "2.0 N", "0.50 N"],
    answer: "D",
    solution: "Work done equals the kinetic energy lost.",
  };

  it("maps a twin onto a practice row: subject, chapter, options in order, the key, the solution", () => {
    const row = buildTwinRow(twin, 7);
    expect(row.subjectName).toBe("Physics");
    expect(row.chapterName).toBe("Dynamics, Work and Energy");
    expect(row.sourceRow).toBe(7);
    expect(row.options.map((o) => o.label)).toEqual(["A", "B", "C", "D", "E"]);
    expect(row.options.map((o) => o.text)).toEqual(twin.options);
    expect(row.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["D"]);
    expect(row.solution).toBe(twin.solution);
    expect(row.contentHash).toBe(contentHash(twin.text, twin.options, "D"));
  });

  it("never carries the Cambridge source onto the row", () => {
    expect(JSON.stringify(buildTwinRow(twin, 1))).not.toContain("2022 Q52");
  });

  it("uses the section's subject outside physics and maths", () => {
    expect(buildTwinRow({ ...twin, section: "biology", subject: undefined, chapter: "Genetics and Inheritance" }, 1).subjectName).toBe("Biology");
  });

  it("refuses a literal backslash-n, which would never render as a line break", () => {
    expect(() => buildTwinRow({ ...twin, text: "Line one\\n 2 apples" }, 1)).toThrow(/backslash-n/);
  });
});

describe("twin figures", () => {
  const sources = new Map([["2022 Q7", q({ n: 7, figure: { page: 1, note: "diagram" } })]]);
  const base: ImatTwin = {
    id: "twin-2022-Q7",
    twinOf: "2022 Q7",
    section: "biology",
    chapter: "Cell Structure and Membranes",
    text: "The figure shows a cell. Which labelled structure makes ATP?",
    options: ["P", "Q", "R", "S", "T"],
    answer: "B",
    solution: "Q is a mitochondrion.",
  };
  const exists = (files: string[]) => (f: string) => files.includes(f);

  it("accepts a drawn figure whose file exists", () => {
    const t = { ...base, figure: { file: "twin-2022-Q7.png", origin: "drawn" as const } };
    expect(checkTwins([t], sources, { figureExists: exists(["twin-2022-Q7.png"]) })).toEqual([]);
  });

  it("refuses a figure whose file is missing", () => {
    const t = { ...base, figure: { file: "twin-2022-Q7.png", origin: "drawn" as const } };
    expect(checkTwins([t], sources, { figureExists: exists([]) }).join()).toMatch(/figure file missing/);
  });

  it("refuses a figure over the image bucket's 1 MiB limit, before the load fails halfway", () => {
    const t = { ...base, figure: { file: "twin-2022-Q7.png", origin: "drawn" as const } };
    const opts = (bytes: number) => ({ figureExists: exists(["twin-2022-Q7.png"]), figureBytes: () => bytes });
    expect(checkTwins([t], sources, opts(1_100_000)).join()).toMatch(/1 MiB/);
    expect(checkTwins([t], sources, opts(1_048_576))).toEqual([]);
  });

  it("refuses an OpenStax figure without the credit its licence requires", () => {
    const t = { ...base, figure: { file: "twin-2022-Q7.png", origin: "openstax" as const } };
    expect(checkTwins([t], sources, { figureExists: exists(["twin-2022-Q7.png"]) }).join()).toMatch(/credit/);
  });

  it("prints the credit under the question, where the figure is shown", () => {
    const credit = "OpenStax Biology 2e, Figure 4.8, CC BY 4.0";
    const row = buildTwinRow({ ...base, figure: { file: "twin-2022-Q7.png", origin: "openstax", credit } }, 1);
    expect(row.text).toBe(`${base.text}

*Figure: ${credit}.*`);
  });
});
