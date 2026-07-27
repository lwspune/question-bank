import { describe, it, expect } from "vitest";
import { subjectiveContentHash } from "../src/lib/upload/hash";
import {
  buildRecords,
  latexImbalances,
  assignSections,
  type SBQuestion,
  type BuildChapter,
  type SectionSpec,
} from "../scripts/stateboard/lib";

const CH: BuildChapter = {
  chapterName: "Mathematical Logic",
  subjectName: "Mathematics",
  subtopics: [
    "Statements and Logical Connectives",
    "Truth Tables of Compound Statements",
    "Converse, Inverse and Contrapositive",
  ],
};

const mcq = (over: Partial<SBQuestion> = {}): SBQuestion => ({
  ref: "Misc I (i)",
  bucket: "exercise-mcq",
  format: "mcq",
  subtopic: "Statements and Logical Connectives",
  difficulty: "EASY",
  stem: "The negation of \\(p \\wedge q\\) is ____.",
  options: [
    { label: "A", text: "\\(\\sim p \\vee \\sim q\\)" },
    { label: "B", text: "\\(\\sim p \\wedge \\sim q\\)" },
    { label: "C", text: "\\(p \\vee q\\)" },
    { label: "D", text: "\\(p \\wedge q\\)" },
  ],
  answer: "A",
  ...over,
});

const subj = (over: Partial<SBQuestion> = {}): SBQuestion => ({
  ref: "Solved Ex.1",
  bucket: "solved",
  format: "subjective",
  subtopic: "Truth Tables of Compound Statements",
  difficulty: "MODERATE",
  stem: "Construct the truth table for \\(p \\to q\\).",
  solution: "| p | q | p→q |\n|---|---|---|\n| T | T | T |",
  ...over,
});

describe("buildRecords — MCQ", () => {
  it("emits an mcq row with the derived answer as the single correct option", () => {
    const { rows, flags } = buildRecords(CH, [mcq()]);
    expect(flags).toHaveLength(0);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.questionFormat).toBe("mcq");
    expect(r.options).toHaveLength(4);
    expect(r.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["A"]);
    expect(r.contentHash).toMatch(/^[0-9a-f]{64}$/);
    expect(r.questionNumber).toBe("Misc I (i)");
  });

  it("flags an MCQ with no derived answer and sets no correct option", () => {
    const { rows, flags } = buildRecords(CH, [mcq({ answer: undefined })]);
    expect(rows[0].options.some((o) => o.isCorrect)).toBe(false);
    expect(flags[0].reason).toMatch(/no derived answer/);
  });

  it("throws when MCQ options are not exactly A,B,C,D", () => {
    expect(() => buildRecords(CH, [mcq({ options: [{ label: "A", text: "x" }] })])).toThrow(/exactly A,B,C,D/);
  });

  it("throws on an invalid answer letter", () => {
    expect(() => buildRecords(CH, [mcq({ answer: "E" })])).toThrow(/invalid/);
  });
});

describe("buildRecords — subjective", () => {
  it("emits a subjective row with empty options and a subjective content hash", () => {
    const { rows, flags } = buildRecords(CH, [subj()]);
    expect(flags).toHaveLength(0);
    expect(rows[0].questionFormat).toBe("subjective");
    expect(rows[0].options).toEqual([]);
    expect(rows[0].solution).toContain("| p | q |");
  });

  it("flags a solved example that is missing its solution", () => {
    const { flags } = buildRecords(CH, [subj({ solution: undefined })]);
    expect(flags[0].reason).toMatch(/no solution/);
  });

  it("does not flag an exercise-subjective question with no solution (answer pending)", () => {
    const { flags } = buildRecords(CH, [
      subj({ ref: "Ex 1.4 Q.1", bucket: "exercise-subjective", solution: undefined }),
    ]);
    expect(flags).toHaveLength(0);
  });

  it("throws when a subjective question carries options", () => {
    expect(() =>
      buildRecords(CH, [subj({ options: [{ label: "A", text: "x" }] })])
    ).toThrow(/must not carry options/);
  });

  it("gives mcq and subjective the same stem DIFFERENT hashes (namespaced)", () => {
    const stem = "Which of the following is true?";
    const [m] = buildRecords(CH, [mcq({ stem })]).rows;
    const [s] = buildRecords(CH, [subj({ stem, solution: "yes" })]).rows;
    expect(m.contentHash).not.toBe(s.contentHash);
  });
});

describe("buildRecords — set grouping + validation", () => {
  it("carries context + setLabel through for set-based sub-items", () => {
    const { rows } = buildRecords(CH, [
      subj({ ref: "Ex 1.1 Q.1 (i)", bucket: "exercise-subjective", solution: undefined, context: "State which are statements.", setLabel: "ex1.1-q1", stem: "5 + 4 = 13." }),
      subj({ ref: "Ex 1.1 Q.1 (ii)", bucket: "exercise-subjective", solution: undefined, context: "State which are statements.", setLabel: "ex1.1-q1", stem: "Close the door." }),
    ]);
    expect(rows[0].context).toBe("State which are statements.");
    expect(rows[0].setLabel).toBe("ex1.1-q1");
    // Same context, different stem → distinct hashes (siblings don't collide).
    expect(rows[0].contentHash).not.toBe(rows[1].contentHash);
  });

  it("throws on an unknown subtopic", () => {
    expect(() => buildRecords(CH, [mcq({ subtopic: "Nonexistent" })])).toThrow(/not one of/);
  });

  it("throws on an invalid difficulty", () => {
    expect(() => buildRecords(CH, [mcq({ difficulty: "TRIVIAL" })])).toThrow(/EASY\|MODERATE\|HARD/);
  });

  it("throws on a duplicate ref", () => {
    expect(() => buildRecords(CH, [mcq(), mcq()])).toThrow(/duplicate ref/);
  });
});

describe("assignSections", () => {
  // A trimmed Matrices-shaped outline: two book sections (each Solved + Exercise)
  // then a two-part Miscellaneous Exercise, in book reading order.
  const SPECS: SectionSpec[] = [
    { group: "2.1 Elementary Transformations", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.1 Solved"] },
    { group: "2.1 Elementary Transformations", label: "Exercise 2.1", kind: "exercise", refPrefixes: ["2.1 Ex 2.1"] },
    { group: "2.2 Inverse of a Matrix", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Solved"] },
    { group: "2.2 Inverse of a Matrix", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["2.2 Ex 2.2"] },
    { group: "Miscellaneous Exercise 2", label: "Multiple Choice Questions", kind: "miscellaneous", refPrefixes: ["Misc I"] },
    { group: "Miscellaneous Exercise 2", label: "Miscellaneous Exercise 2 (A)", kind: "miscellaneous", refPrefixes: ["Misc 2A"] },
  ];

  const items = [
    { ref: "2.1 Solved Ex.1", bucket: "solved" as const },
    { ref: "2.1 Ex 2.1 Q.3", bucket: "exercise-subjective" as const },
    { ref: "2.2 Solved Ex.10", bucket: "solved" as const },
    { ref: "2.2 Ex 2.2 Q.6 (i)", bucket: "exercise-subjective" as const },
    { ref: "Misc I (11)", bucket: "exercise-mcq" as const },
    { ref: "Misc 2A Q.7 x)", bucket: "exercise-subjective" as const },
  ];

  it("maps each ref to its block with book-order seq (1-based index in the outline)", () => {
    const { assignments, unmatched, mismatches } = assignSections(items, SPECS);
    expect(unmatched).toEqual([]);
    expect(mismatches).toEqual([]);
    expect(assignments.map((a) => [a.ref, a.sectionSeq, a.sectionKind, a.sectionLabel])).toEqual([
      ["2.1 Solved Ex.1", 1, "solved_example", "Solved Examples"],
      ["2.1 Ex 2.1 Q.3", 2, "exercise", "Exercise 2.1"],
      ["2.2 Solved Ex.10", 3, "solved_example", "Solved Examples"],
      ["2.2 Ex 2.2 Q.6 (i)", 4, "exercise", "Exercise 2.2"],
      ["Misc I (11)", 5, "miscellaneous", "Multiple Choice Questions"],
      ["Misc 2A Q.7 x)", 6, "miscellaneous", "Miscellaneous Exercise 2 (A)"],
    ]);
    // section_group carries the big header for the reader.
    expect(assignments[3].sectionGroup).toBe("2.2 Inverse of a Matrix");
  });

  it("prefers the LONGEST matching prefix when prefixes overlap", () => {
    const overlap: SectionSpec[] = [
      { group: "2.2", label: "Solved Examples", kind: "solved_example", refPrefixes: ["2.2 Solved"] },
      { group: "2.2", label: "Exercise 2.2", kind: "exercise", refPrefixes: ["2.2 "] },
    ];
    const { assignments } = assignSections(
      [{ ref: "2.2 Solved Ex.1", bucket: "solved" }, { ref: "2.2 Ex 2.2 Q.1", bucket: "exercise-subjective" }],
      overlap
    );
    expect(assignments[0].sectionLabel).toBe("Solved Examples"); // "2.2 Solved" beats "2.2 "
    expect(assignments[1].sectionLabel).toBe("Exercise 2.2");
  });

  it("collects refs that match no block instead of silently bucketing them", () => {
    const { unmatched, assignments } = assignSections(
      [{ ref: "2.3 Ex 2.3 Q.1", bucket: "exercise-subjective" }, ...items.slice(0, 1)],
      SPECS
    );
    expect(unmatched).toEqual(["2.3 Ex 2.3 Q.1"]);
    expect(assignments).toHaveLength(1);
  });

  it("flags a bucket/kind mismatch (solved_example block ⟺ bucket 'solved')", () => {
    const { mismatches } = assignSections(
      [{ ref: "2.1 Solved Ex.1", bucket: "exercise-subjective" }], // solved block, wrong bucket
      SPECS
    );
    expect(mismatches).toHaveLength(1);
    expect(mismatches[0].ref).toBe("2.1 Solved Ex.1");
    expect(mismatches[0].reason).toMatch(/does not match block kind 'solved_example'/);
  });

  it("reports outline blocks that matched nothing (stale/typo'd entry)", () => {
    const { emptySpecs } = assignSections(items.slice(0, 2), SPECS);
    expect(emptySpecs).toContain("2.2 Inverse of a Matrix — Solved Examples");
    expect(emptySpecs).toContain("Miscellaneous Exercise 2 — Multiple Choice Questions");
  });
});

describe("latexImbalances", () => {
  it("returns [] for balanced rows", () => {
    const { rows } = buildRecords(CH, [mcq(), subj()]);
    expect(latexImbalances(rows)).toEqual([]);
  });

  it("flags an unbalanced delimiter in a stem", () => {
    const { rows } = buildRecords(CH, [mcq({ stem: "Bad \\(p \\wedge q" })]);
    const bad = latexImbalances(rows);
    expect(bad).toHaveLength(1);
    expect(bad[0]).toMatch(/stem/);
  });
});

/**
 * Long-form fields must be newline-normalised BEFORE the content hash is taken,
 * so the stored text always equals the hash's preimage. Without this an agent
 * JSON that double-escaped its newlines ships a literal two-char backslash-n,
 * which silently kills GFM pipe-tables on the website AND in the Word export —
 * and `commitStaged` now rejects such rows outright rather than repairing them
 * at insert (repairing there would break the text==preimage invariant and
 * duplicate the row on re-ingest). See src/lib/upload/textGuard.ts.
 *
 * NOTE: LITERAL is spelled with a doubled backslash in the source ("\\n") so the
 * runtime value is the 2-character sequence, not a newline.
 */
describe("buildRecords — literal backslash-n normalisation", () => {
  function subjectiveRow(over: Record<string, unknown> = {}) {
    return {
      ref: "Ex 1.1 Q1",
      format: "subjective" as const,
      bucket: "exercise" as const,
      subtopic: "Statements and Logical Connectives",
      difficulty: "EASY",
      stem: "Data:\\n\\n| p | q |\\n|---|---|\\n| T | F |",
      solution: "Step one.\\nStep two.",
      ...over,
    };
  }

  it("converts a literal backslash-n to a real newline in stem and solution", () => {
    const { rows } = buildRecords(CH, [subjectiveRow()] as never);
    expect(rows[0].text).toContain("\n");
    expect(rows[0].text).not.toContain("\\n");
    expect(rows[0].solution).toBe("Step one.\nStep two.");
  });

  it("hashes the NORMALISED stem, so stored text is the hash preimage", () => {
    const { rows } = buildRecords(CH, [subjectiveRow()] as never);
    expect(rows[0].contentHash).toBe(
      subjectiveContentHash(rows[0].text, rows[0].context ?? null)
    );
  });

  it("leaves LaTeX commands beginning with backslash-n untouched", () => {
    const stem = "Given \\(a \\neq b\\) and \\(\\nabla f = 0\\).";
    const { rows } = buildRecords(CH, [subjectiveRow({ stem })] as never);
    expect(rows[0].text).toBe(stem);
  });
});
