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

  // 2026-11-21: "vectors types and their applications" kept "their", so an all-words search could never match.
  it("drops pronouns and chat words that are never a topic", () => {
    expect(conceptWords("vectors types and their applications")).toEqual(["vectors", "types", "applications"]);
    expect(conceptWords("bro teach me each of them like basics")).toEqual([]);
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

  // 2026-11-08: "percentage error product quotient powers" missed "Percentage Errors Through Products and Powers"
  // on the very notes page the student was reading: "quotient" is not in the card's name.
  it("with 3+ words, also takes a card that holds all but one of them, after the full matches", () => {
    const cards = [
      entry("Percentage Errors Through Products and Powers", "Error propagation", { key: "mht-cet-physics/units-and-measurement" }),
      entry("Percentage error of a product, quotient and powers", "Errors", { key: "nda-physics/units" }),
    ];
    const r = rankNotesConcepts(["percentage", "error", "product", "quotient", "powers"], cards);
    expect(r.map((e) => e.key)).toEqual(["nda-physics/units", "mht-cet-physics/units-and-measurement"]);
    expect(rankNotesConcepts(["percentage", "diode", "magnet", "quotient"], cards)).toEqual([]);
  });

  it("ranks the notes chapter the student is reading first among cards that match as well", () => {
    const here = entry("Diamagnetism", "Magnetism", { key: "mht-cet-physics/magnetism", examName: "MHT-CET" });
    const r = rankNotesConcepts(["diamagnetic"], [...index, here], ["NDA"], "mht-cet-physics/magnetism");
    expect(r[0].key).toBe("mht-cet-physics/magnetism");
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
    expect(out).not.toMatch(/general explanation/i);
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

  it("labels close matches as not exact, to be used only if they answer the question", () => {
    const out = formatConceptResult({ bank: [], notes: [], close: [{ ...ANSWER, path: "/questions/mh-hsc-12/physics/electrostatics" }] });
    expect(out).toMatch(/close matches/i);
    expect(out).toMatch(/only if/i);
    expect(out).toContain("Model answer: Consider a point charge");
    expect(out).toMatch(/short general explanation/i);
  });

  // 2026-11-21: V said "Our notes did not match this exact request" with the chapter's notes live.
  it("with nothing found, tells V not to announce that nothing was found", () => {
    expect(formatConceptResult({ bank: [], notes: [] })).toMatch(/do not tell the student/i);
  });

  it("with nothing found, allows a short general explanation, with no fixed opening line", () => {
    // Owner, 2026-10-23: "General explanation (not from our question bank):" adds no value to the student.
    const out = formatConceptResult({ bank: [], notes: [] });
    expect(out).toMatch(/short general explanation/i);
    expect(out).not.toMatch(/not from our question bank/i);
    expect(out).not.toMatch(/starts? exactly with/i);
    // 2026-11-16 (owner): a typed numeric problem is worked out in full (rule 7b), never refused.
    expect(out).not.toMatch(/never solve a new numeric problem/i);
    expect(out).toMatch(/numeric problem[^.]*work it out in full[^.]*rule 7b/i);
    // A question from a paper is still answered from our key, never V's own working.
    expect(out).toMatch(/never give an answer to a question from a paper/i);
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
    expect(await tool.run({ topic: "coriolis effect" })).toMatch(/short general explanation/i);
  });

  describe("close-match fallback (2026-11-21: 26% of searches in 30 days found nothing)", () => {
    const solid: BankAnswer = { ...ANSWER, chapterName: "Solid State", text: "Predict the type of cubic lattice...", rank: 3.4 };
    const other: BankAnswer = { ...ANSWER, examName: "SSC CGL", chapterName: "Space Facts", text: "Satellite type and application", rank: 0.1 };

    function fallbackSetup(answersFor: (query: string) => BankAnswer[], page = { examName: "Maharashtra HSC Class 12", subjectName: "Chemistry" } as { examName: string; subjectName?: string } | null) {
      const queries: string[] = [];
      const tool = conceptTool({
        searchBank: async (query) => {
          queries.push(query);
          return answersFor(query);
        },
        loadChapters: async () => rows,
        loadNotesIndex: async () => [],
        loadNotesConcept: async () => null,
        page,
        onPaths: () => {},
      });
      return { tool, queries };
    }

    it("with 3+ words and nothing found, retries with each word left out once, and keeps only the student's exam", async () => {
      const { tool, queries } = fallbackSetup((q) => (q === "solid & unit & cell" ? [solid, other] : []));
      const out = await tool.run({ topic: "solid formulas unit cell" });
      expect(queries[0]).toBe("solid & formulas & unit & cell");
      expect(queries).toContain("solid & unit & cell");
      expect(queries).toHaveLength(1 + 4);
      expect(out).toMatch(/close matches/i);
      expect(out).toContain("Predict the type of cubic lattice");
      expect(out).not.toContain("Satellite");
    });

    it("never falls back when the student's exam is unknown: a loose match anywhere is mostly noise", async () => {
      const { tool, queries } = fallbackSetup(() => [], null);
      await tool.run({ topic: "radian measure full circle" });
      expect(queries).toHaveLength(1);
    });

    it("never falls back on one or two words", async () => {
      const { tool, queries } = fallbackSetup(() => []);
      await tool.run({ topic: "radian measure" });
      expect(queries).toHaveLength(1);
    });

    it("a close match from another exam only is still 'nothing found'", async () => {
      const { tool } = fallbackSetup((q) => (q.split(" & ").length === 3 ? [other] : []));
      expect(await tool.run({ topic: "vectors types applications satellites" })).toMatch(/short general explanation/i);
    });

    it("a failed retry is ignored: the full search already answered", async () => {
      let n = 0;
      const tool = conceptTool({
        searchBank: async () => {
          n += 1;
          if (n > 1) throw new Error("timeout");
          return [];
        },
        loadChapters: async () => rows,
        loadNotesIndex: async () => [],
        loadNotesConcept: async () => null,
        page: { examName: "Maharashtra HSC Class 12" },
        onPaths: () => {},
      });
      expect(await tool.run({ topic: "solid formulas unit cell" })).toMatch(/short general explanation/i);
    });
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
    expect(out).not.toMatch(/general explanation/i);
    expect(out).toMatch(/could not search/i);
  });
});
