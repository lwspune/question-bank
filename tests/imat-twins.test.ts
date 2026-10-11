/**
 * IMAT twins: one original practice question per in-scope Cambridge question
 * (2011-2022). A twin keeps the source's chapter, skill, format and
 * difficulty and changes everything else; the originality check
 * (tests/imat-originality.test.ts) holds the "everything else" line.
 *
 * Scope (owner, 2026-10-11): twin a Cambridge question only if its topic is in
 * the current syllabus (DM 1005/2026, Allegato A) or the ministry papers have
 * asked it. Figure questions wait for a later pass.
 */
import { describe, it, expect } from "vitest";
import { checkTwins, criticalThinkingKind, twinScope, type ImatTwin } from "../scripts/imat/practice/lib";
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

  it("reads 'main conclusion' before the generic 'conclusion'", () => {
    expect(criticalThinkingKind("Which is the main conclusion that can be drawn?")).toBe("main-conclusion");
  });
});

describe("twinScope", () => {
  it("twins a syllabus topic", () => {
    expect(twinScope(q({})).inScope).toBe(true);
  });

  it("holds figure questions for a later pass", () => {
    expect(twinScope(q({ figure: { page: 3, note: "graph" } }))).toEqual({ inScope: false, reason: "figure" });
  });

  it("drops optics, which is neither in the syllabus nor asked by the ministry", () => {
    expect(twinScope(q({ section: "physmath", subject: "Physics", chapter: "Optics" })).inScope).toBe(false);
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
    const fig = new Map([["2022 Q7", q({ n: 7, figure: { page: 1, note: "" } })]]);
    expect(checkTwins([twin()], fig).join()).toMatch(/out of scope \(figure\)/);
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
});
