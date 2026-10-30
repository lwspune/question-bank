import { describe, it, expect } from "vitest";
import { assembleChapter, type PassA, type PassB } from "../scripts/pariksha/book/assemble-core";

const a = (ref: string, over: Partial<PassA> = {}): PassA => ({
  ref,
  section: ref.split(" ")[0],
  stem: `stem ${ref}`,
  options: ["a", "b", "c", "d"],
  confidence: "HIGH",
  ...over,
});
const b = (ref: string, answer: number, over: Partial<PassB> = {}): PassB => ({
  ref,
  answer,
  solution: `solution ${ref}`,
  difficulty: "EASY",
  confidence: "HIGH",
  ...over,
});
const base = {
  subject: "Physics",
  chapter: "Nuclei",
  keys: [{ sections: [{ section: "27.1", title: "Mass defect" }], keys: { "27.1": { "1": 2, "2": 3 } } }],
};

describe("assembleChapter", () => {
  it("numbers questions in book order: section, then printed number, both numerically", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("23.10 Q1"), a("23.2 Q10"), a("23.2 Q9")]],
      B: [[b("23.10 Q1", 1), b("23.2 Q10", 1), b("23.2 Q9", 1)]],
      settle: {},
    });
    expect(r.questions.map((q) => q.ref)).toEqual(["23.2 Q9", "23.2 Q10", "23.10 Q1"]);
    expect(r.questions.map((q) => q.number)).toEqual([1, 2, 3]);
  });

  it("keeps the higher-confidence copy of a ref transcribed by two page slices", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.1 Q1", { stem: "cut off", confidence: "LOW" })], [a("27.1 Q1", { stem: "whole" })]],
      B: [[b("27.1 Q1", 2)]],
      settle: {},
    });
    expect(r.questions).toHaveLength(1);
    expect(r.questions[0].stem).toBe("whole");
  });

  it("reports coverage both ways: a key with no question, and a question with no key", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.1 Q1"), a("27.1 Q3")]],
      B: [[b("27.1 Q1", 2), b("27.1 Q3", 1)]],
      settle: {},
    });
    expect(r.coverage[0]).toMatch(/key but NO QUESTION: 2/);
    expect(r.coverage[0]).toMatch(/question but NO KEY: 3/);
  });

  it("lists a derived answer that disagrees with the printed key, and the printed key stays in keys", () => {
    const r = assembleChapter({ ...base, A: [[a("27.1 Q1")]], B: [[b("27.1 Q1", 4)]], settle: {} });
    expect(r.disagreements).toEqual([expect.stringMatching(/^27\.1 Q1: derived 4, printed 2/)]);
    expect(r.keys[1]).toBe("B");
  });

  it("a settled answer silences the disagreement and wins over the printed key", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.1 Q1")]],
      B: [[b("27.1 Q1", 4)]],
      settle: { "27.1 Q1": { answer: 4, solution: "**Note:** the book's key differs." } },
    });
    expect(r.disagreements).toEqual([]);
    expect(r.keys[1]).toBe("D");
    expect(r.questions[0]).toMatchObject({ answer: "D", solution: "**Note:** the book's key differs." });
  });

  it("a held question is left out and the rest are renumbered without a gap", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.1 Q1"), a("27.1 Q2")]],
      B: [[b("27.1 Q1", 2), b("27.1 Q2", 3)]],
      settle: { "27.1 Q1": { hold: "value clipped" } },
    });
    expect(r.held).toEqual(["27.1 Q1: value clipped"]);
    expect(r.questions.map((q) => [q.ref, q.number])).toEqual([["27.1 Q2", 1]]);
    expect(r.keys).toEqual({ 1: "C" });
  });

  it("with no printed key the derived answer becomes the key, and a question with no solve is held", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.2 Q1"), a("27.2 Q2")]],
      B: [[b("27.2 Q1", 3)]],
      settle: {},
    });
    expect(r.keys).toEqual({ 1: "C" });
    expect(r.held).toEqual(["27.2 Q2: no Pass B answer"]);
  });

  it("uses the section title as the subtopic, unless a settlement names one", () => {
    const r = assembleChapter({
      ...base,
      A: [[a("27.1 Q1"), a("27.1 Q2")]],
      B: [[b("27.1 Q1", 2), b("27.1 Q2", 3)]],
      settle: { "27.1 Q2": { subtopic: "Binding Energy" } },
    });
    expect(r.questions.map((q) => q.subtopic)).toEqual(["Mass defect", "Binding Energy"]);
    expect(r.questions[0]).toMatchObject({ chapter: "Nuclei", subject: "Physics" });
  });
});
