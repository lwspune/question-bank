/**
 * V explains concepts (V_SPEC.md step 2, 2026-10-22): the explain_concept tool.
 * Our question bank's model answers first, then the notes' concept cards, then,
 * when both have nothing, V may give a labelled general explanation.
 * Pure core: src/lib/chat/conceptSearch.ts.
 */
import { describe, it, expect } from "vitest";
import {
  conceptWords,
  allWordsQuery,
  rankNotesConcepts,
  formatConceptResult,
  conceptTool,
  GENERAL_LABEL,
  type BankAnswer,
  type NotesConceptEntry,
} from "@/lib/chat/conceptSearch";
import type { ChapterSearchRow } from "@/lib/chat/chapterSearch";

describe("conceptWords", () => {
  it("keeps the subject words and drops what a student wraps them in", () => {
    expect(conceptWords("Derive an expression for electric potential due to a point charge")).toEqual([
      "electric",
      "potential",
      "point",
      "charge",
    ]);
    expect(conceptWords("Define uniform circular motion")).toEqual(["uniform", "circular", "motion"]);
    expect(conceptWords("imp points of double fertilization pls")).toEqual(["double", "fertilization"]);
  });

  it("lowercases, drops repeats and short words, and keeps at most 6", () => {
    expect(conceptWords("Active ACTIVE transport of Na in cells")).toEqual(["active", "transport", "cells"]);
    expect(conceptWords("one two three four five six seven eight")).toHaveLength(6);
  });

  it("keeps words with digits (a chemical, a unit) but never a bare number", () => {
    expect(conceptWords("why is h2o2 polar 2026")).toEqual(["h2o2", "polar"]);
  });

  it("is empty when nothing is left", () => {
    expect(conceptWords("explain this please")).toEqual([]);
  });
});

describe("allWordsQuery", () => {
  it("joins the words so every one must match", () => {
    expect(allWordsQuery(["radius", "gyration"])).toBe("radius & gyration");
  });
});

describe("rankNotesConcepts", () => {
  const entry = (name: string, title = "Magnetism", over: Partial<NotesConceptEntry> = {}): NotesConceptEntry => ({
    key: "nda-physics/electricity-and-magnetism",
    subtopic: "magnetic-materials",
    concept: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    subtopicTitle: title,
    examName: "NDA",
    ...over,
  });
  const index = [
    entry("Diamagnetism"),
    entry("Paramagnetism"),
    entry("Ferromagnetism"),
    entry("Ohm's law", "Current Electricity"),
  ];

  it("matches a word to a name by its root, so 'diamagnetic' finds Diamagnetism", () => {
    expect(rankNotesConcepts(["diamagnetic"], index).map((e) => e.name)).toEqual(["Diamagnetism"]);
  });

  it("needs every word somewhere in the concept's name or its subtopic's title", () => {
    expect(rankNotesConcepts(["ohm", "current"], index).map((e) => e.name)).toEqual(["Ohm's law"]);
    expect(rankNotesConcepts(["diamagnetic", "current"], index)).toEqual([]);
  });

  it("prefers the student's exam, then returns at most 2", () => {
    const two = [entry("Diamagnetism", "Magnetism", { examName: "MHT-CET", key: "mht-cet-physics/x" }), ...index];
    const r = rankNotesConcepts(["diamagnetic"], two, ["NDA"]);
    expect(r[0].examName).toBe("NDA");
    expect(rankNotesConcepts(["magnetism"], index)).toHaveLength(2);
  });
});

const ANSWER: BankAnswer = {
  examName: "Maharashtra HSC Class 12",
  chapterName: "Electrostatics",
  chapterId: "ch-1",
  format: "subjective",
  text: "Derive an expression for electric potential due to a point charge.",
  solution: "Consider a point charge q at O. The work done in bringing a unit charge from infinity to P gives V = q / (4 pi epsilon0 r).",
};

describe("formatConceptResult", () => {
  it("gives the model answers with where they come from and the chapter page", () => {
    const out = formatConceptResult({ bank: [{ ...ANSWER, path: "/questions/mh-hsc-12/physics/electrostatics" }], notes: [] });
    expect(out).toMatch(/question bank/i);
    expect(out).toContain("Maharashtra HSC Class 12, Electrostatics (/questions/mh-hsc-12/physics/electrostatics)");
    expect(out).toContain("Question: Derive an expression");
    expect(out).toContain("Model answer: Consider a point charge");
    expect(out).not.toContain(GENERAL_LABEL);
  });

  it("trims a long model answer", () => {
    const out = formatConceptResult({ bank: [{ ...ANSWER, path: null, solution: "x".repeat(5000) }], notes: [] });
    expect(out.length).toBeLessThan(2500);
  });

  it("gives the notes concept with its notes page", () => {
    const out = formatConceptResult({
      bank: [],
      notes: [{ name: "Diamagnetism", path: "/notes/nda-physics/electricity-and-magnetism/magnetic-materials", text: "Weakly repelled; negative susceptibility." }],
    });
    expect(out).toContain("Diamagnetism (/notes/nda-physics/electricity-and-magnetism/magnetic-materials)");
    expect(out).toContain("negative susceptibility");
  });

  it("with nothing found, allows a general explanation only under the fixed label", () => {
    const out = formatConceptResult({ bank: [], notes: [] });
    expect(out).toContain(GENERAL_LABEL);
    expect(out).toMatch(/never .*numeric/i);
  });
});

describe("conceptTool", () => {
  const rows: ChapterSearchRow[] = [
    {
      examSlug: "mh-hsc-12",
      examName: "Maharashtra HSC Class 12",
      subjectSlug: "physics",
      subjectName: "Physics",
      chapterSlug: "electrostatics",
      chapterName: "Electrostatics",
      questionCount: 34,
      practiceOnly: false,
      chapterId: "ch-1",
    },
  ];

  function setup(bank: BankAnswer[] = [ANSWER]) {
    const calls: { query: string; examNames: string[]; subjectName: string | null }[] = [];
    const paths: string[] = [];
    const tool = conceptTool({
      searchBank: async (query, examNames, subjectName) => {
        calls.push({ query, examNames, subjectName });
        return bank;
      },
      loadChapters: async () => rows,
      loadNotesIndex: async () => [],
      loadNotesConcept: async () => null,
      page: { examName: "Maharashtra HSC Class 12", subjectName: "Physics" },
      onPaths: (p) => paths.push(...p),
    });
    return { tool, calls, paths };
  }

  it("searches the bank with every word, the student's exam and the page's subject, and gives the chapter page", async () => {
    const { tool, calls, paths } = setup();
    const out = await tool.run({ topic: "electric potential due to a point charge" });
    expect(calls[0]).toEqual({
      query: "electric & potential & point & charge",
      examNames: ["Maharashtra HSC Class 12"],
      subjectName: "Physics",
    });
    expect(out).toContain("/questions/mh-hsc-12/physics/electrostatics");
    expect(paths).toEqual(["/questions/mh-hsc-12/physics/electrostatics"]);
  });

  it("an exam V names is resolved against the chapter list and wins over the page's", async () => {
    const { tool, calls } = setup();
    await tool.run({ topic: "electric potential", exam: "mh-hsc-12" });
    expect(calls[0].examNames).toEqual(["Maharashtra HSC Class 12"]);
  });

  it("with no topic words left, asks V to ask the student what to explain", async () => {
    const { tool, calls } = setup();
    expect(await tool.run({ topic: "explain this" })).toMatch(/ask/i);
    expect(calls).toHaveLength(0);
  });

  it("with nothing in the bank or the notes, returns the general-explanation permission", async () => {
    const { tool } = setup([]);
    expect(await tool.run({ topic: "coriolis effect" })).toContain(GENERAL_LABEL);
  });

  it("a failed bank search is not 'nothing found': V must not fall back to its own knowledge on an outage", async () => {
    const paths: string[] = [];
    const tool = conceptTool({
      searchBank: async () => {
        throw new Error("timeout");
      },
      loadChapters: async () => rows,
      loadNotesIndex: async () => [],
      loadNotesConcept: async () => null,
      page: null,
      onPaths: (p) => paths.push(...p),
    });
    const out = await tool.run({ topic: "electric potential" });
    expect(out).not.toContain(GENERAL_LABEL);
    expect(out).toMatch(/could not search/i);
  });
});
