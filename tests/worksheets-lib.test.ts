// Pure-core spec for the Cadetprep worksheets ingestion pipeline
// (scripts/worksheets/lib.ts). No IO — sheets are passed as arrays-of-arrays.
import { describe, it, expect } from "vitest";
import {
  normalizeDifficulty,
  normalizeOldDress,
  parseSheet,
  buildWorksheetRows,
  isShuffleEligible,
  letterDistribution,
  planShuffles,
  type WorksheetQuestion,
  type WorksheetOverride,
} from "../scripts/worksheets/lib";

const HDR = [
  "QUESTION TEXT",
  "Subject",
  "MARKS",
  "NEGATIVE MARKS",
  "DIFFICULTY LEVEL",
  "TYPE",
  "OPTION",
  "OPTION",
  "OPTION",
  "OPTION",
  "Correct Answers",
  "SOLUTION",
  "PERCENTAGE CORRECT",
  "CASE SENSITIVE",
  "PARTIAL MARKS",
];

function dataRow(over: Partial<Record<string, string>> = {}): (string | number)[] {
  return [
    over.stem ?? "What is \\(\\sin 30^\\circ\\)?",
    over.subject ?? "Maths",
    1,
    0,
    over.difficulty ?? "Easy",
    "Single",
    over.a ?? "\\(1\\)",
    over.b ?? "\\(\\frac{1}{2}\\)",
    over.c ?? "\\(0\\)",
    over.d ?? "\\(2\\)",
    over.answer ?? "B",
    over.solution ?? "\\(\\sin 30^\\circ = \\frac{1}{2}\\).",
    "",
    "",
    "",
  ];
}

describe("normalizeDifficulty", () => {
  it("maps the source vocabulary onto the bank's enum", () => {
    expect(normalizeDifficulty("Easy")).toBe("EASY");
    expect(normalizeDifficulty("Medium")).toBe("MODERATE");
    expect(normalizeDifficulty("Moderate")).toBe("MODERATE");
    expect(normalizeDifficulty("Hard")).toBe("HARD");
    expect(normalizeDifficulty("Very Hard")).toBe("HARD");
    expect(normalizeDifficulty(" easy ")).toBe("EASY");
  });
  it("throws on an unknown difficulty", () => {
    expect(() => normalizeDifficulty("Extreme")).toThrow(/difficulty/i);
  });
});

describe("parseSheet", () => {
  it("parses a standard sheet into questions keyed by xlsx row", () => {
    const { questions, errors } = parseSheet("06-file", [HDR, dataRow(), dataRow({ answer: "a" })]);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(2);
    expect(questions[0].row).toBe(2);
    expect(questions[0].stem).toContain("\\sin 30");
    expect(questions[0].options).toEqual(["\\(1\\)", "\\(\\frac{1}{2}\\)", "\\(0\\)", "\\(2\\)"]);
    // lowercase source letters normalise to uppercase
    expect(questions[1].answer).toBe("A");
  });

  it("handles the Sr No leading-column variant by offsetting", () => {
    const hdr = ["Sr No", ...HDR];
    const row = [1, ...dataRow()];
    const { questions, errors } = parseSheet("f", [hdr, row]);
    expect(errors).toEqual([]);
    expect(questions[0].stem).toContain("\\sin 30");
    expect(questions[0].answer).toBe("B");
  });

  it("skips blank rows and rejects a sheet without the expected header", () => {
    const { questions } = parseSheet("f", [HDR, ["", "", "", "", "", "", "", "", "", "", "", ""], dataRow()]);
    expect(questions).toHaveLength(1);
    expect(() => parseSheet("f", [["Nope", "Cols"], dataRow()])).toThrow(/header/i);
  });

  it("stringifies numeric option cells", () => {
    const row = dataRow();
    row[6] = 0; // numeric option A
    row[7] = 1;
    const { questions } = parseSheet("f", [HDR, row]);
    expect(questions[0].options[0]).toBe("0");
    expect(questions[0].options[1]).toBe("1");
  });
});

function q(over: Partial<WorksheetQuestion> = {}): WorksheetQuestion {
  return {
    file: "01-fundamental",
    row: 2,
    stem: "What is \\(\\sin 30^\\circ\\)?",
    options: ["\\(1\\)", "\\(\\frac{1}{2}\\)", "\\(0\\)", "\\(2\\)"],
    answer: "B",
    difficulty: "Easy",
    solution: "\\(\\sin 30^\\circ = \\frac{1}{2}\\).",
    ...over,
  };
}

const CTX = {
  chapterName: "Trigonometric Identities",
  subtopicName: "Fundamental Trigonometric Identities",
  fileIndex: 1,
};

describe("buildWorksheetRows", () => {
  it("builds a commit-ready row with stable provenance ids", () => {
    const { rows, flags } = buildWorksheetRows(CTX, [q()], {});
    expect(flags).toEqual([]);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.subjectName).toBe("Mathematics");
    expect(r.chapterName).toBe("Trigonometric Identities");
    expect(r.subtopicName).toBe("Fundamental Trigonometric Identities");
    expect(r.questionNumber).toBe("01-2"); // fileIndex-xlsxRow
    expect(r.sourceRow).toBe(1002); // fileIndex*1000 + row → unique across the chapter
    expect(r.difficulty).toBe("EASY");
    expect(r.options.map((o) => o.isCorrect)).toEqual([false, true, false, false]);
    expect(r.contentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("hash is stable and changes when the answer changes", () => {
    const a = buildWorksheetRows(CTX, [q()], {}).rows[0].contentHash;
    const b = buildWorksheetRows(CTX, [q()], {}).rows[0].contentHash;
    const c = buildWorksheetRows(CTX, [q({ answer: "C" })], {}).rows[0].contentHash;
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it("flags duplicate options, self-talk solutions and option-letter mentions", () => {
    const { flags } = buildWorksheetRows(
      CTX,
      [
        q({ row: 3, options: ["\\(1\\)", "\\(2\\)", "\\(2\\)", "\\(0\\)"], answer: "A" }),
        q({ row: 4, solution: "The value is 1. Wait, let me recalculate: it is 2." }),
        q({ row: 5, solution: "This matches option B exactly." }),
      ],
      {}
    );
    const reasons = flags.map((f) => f.reason);
    expect(reasons.some((r) => /duplicate options/i.test(r))).toBe(true);
    expect(reasons.some((r) => /self-talk/i.test(r))).toBe(true);
    expect(reasons.some((r) => /option letter/i.test(r))).toBe(true);
  });

  it("throws on an invalid answer letter with no override", () => {
    expect(() => buildWorksheetRows(CTX, [q({ answer: "" })], {})).toThrow(/answer/i);
    expect(() => buildWorksheetRows(CTX, [q({ answer: "E" })], {})).toThrow(/answer/i);
  });

  it("flags a missing solution instead of throwing", () => {
    const { rows, flags } = buildWorksheetRows(CTX, [q({ solution: "" })], {});
    expect(rows).toHaveLength(1);
    expect(flags.some((f) => /no solution/i.test(f.reason))).toBe(true);
  });

  it("applies overrides: key flip, option repair, solution rewrite, exclusion", () => {
    const overrides: Record<string, WorksheetOverride> = {
      "01-2": {
        answer: "C",
        options: { C: "\\(\\frac{1}{2}\\) fixed" },
        solution: "Clean rewritten solution.",
        reason: "key verified wrong; option C repaired",
      },
      "01-3": { exclude: true, reason: "defective beyond repair" },
    };
    const { rows, excluded } = buildWorksheetRows(CTX, [q(), q({ row: 3 })], overrides);
    expect(rows).toHaveLength(1);
    expect(excluded).toEqual(["01-3"]);
    const r = rows[0];
    expect(r.options[2].text).toBe("\\(\\frac{1}{2}\\) fixed");
    expect(r.options.map((o) => o.isCorrect)).toEqual([false, false, true, false]);
    expect(r.solution).toBe("Clean rewritten solution.");
  });

  it("an override answer rescues an invalid source letter", () => {
    const overrides: Record<string, WorksheetOverride> = {
      "01-2": { answer: "A", reason: "source key blank; derived" },
    };
    const { rows } = buildWorksheetRows(CTX, [q({ answer: "x" })], overrides);
    expect(rows[0].options[0].isCorrect).toBe(true);
  });

  it("normalises literal backslash-n into real newlines before hashing", () => {
    const { rows } = buildWorksheetRows(CTX, [q({ stem: "Line one\\nLine two \\(\\neq\\) kept" })], {});
    expect(rows[0].text).toContain("Line one\nLine two");
    expect(rows[0].text).toContain("\\neq"); // math zone untouched
  });

  it("applies a shuffle AFTER overrides: swaps texts and moves the key", () => {
    // q(): correct B = "1/2". Shuffle target D → texts of B and D swap, key = D.
    const { rows } = buildWorksheetRows(CTX, [q()], {}, { "01-2": "D" });
    const r = rows[0];
    expect(r.options.map((o) => o.text)).toEqual(["\\(1\\)", "\\(2\\)", "\\(0\\)", "\\(\\frac{1}{2}\\)"]);
    expect(r.options.map((o) => o.isCorrect)).toEqual([false, false, false, true]);
  });

  it("a shuffle changes the contentHash and a same-letter shuffle is a no-op", () => {
    const base = buildWorksheetRows(CTX, [q()], {}).rows[0].contentHash;
    const moved = buildWorksheetRows(CTX, [q()], {}, { "01-2": "D" }).rows[0].contentHash;
    const noop = buildWorksheetRows(CTX, [q()], {}, { "01-2": "B" }).rows[0].contentHash;
    expect(moved).not.toBe(base);
    expect(noop).toBe(base);
  });

  it("throws on a shuffle keyed to a missing question", () => {
    expect(() => buildWorksheetRows(CTX, [q()], {}, { "01-99": "D" })).toThrow(/shuffle/i);
  });
});

describe("normalizeOldDress", () => {
  it("leaves new-dress fields untouched", () => {
    const s = "What is the magnitude of vector \\(\\vec{v} = 6\\hat{i} - 8\\hat{j}\\)?";
    expect(normalizeOldDress(s)).toBe(s);
  });

  it("leaves plain prose untouched", () => {
    expect(normalizeOldDress("Equal vectors")).toBe("Equal vectors");
  });

  it("wraps a pure-math option and strips zone terminators", () => {
    expect(normalizeOldDress("\\\\sqrt{49}\\\\")).toBe("\\(\\sqrt{49}\\)");
  });

  it("unwraps a bare-number option to plain text", () => {
    expect(normalizeOldDress("\\\\7\\\\")).toBe("7");
    expect(normalizeOldDress("180°\\\\")).toBe("180°");
  });

  it("treats \\\\word before a non-command as a delimiter, not a command", () => {
    expect(normalizeOldDress("\\\\k = \\\\pm 2\\\\")).toBe("\\(k = \\pm 2\\)");
  });

  it("wraps math runs in a mixed stem, breaking at prose and keeping punctuation outside", () => {
    const s =
      "If \\\\vec{a} = \\\\hat{i} + 2\\\\hat{j} - \\\\hat{k}\\\\, and \\\\vec{b} = 2\\\\hat{i} - \\\\hat{j} + 3\\\\hat{k}\\\\, then what is \\\\vec{a} + \\\\vec{b}\\\\?";
    expect(normalizeOldDress(s)).toBe(
      "If \\(\\vec{a} = \\hat{i} + 2\\hat{j} - \\hat{k}\\), and \\(\\vec{b} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\), then what is \\(\\vec{a} + \\vec{b}\\)?"
    );
  });

  it("preserves matrix row separators inside a determinant", () => {
    const s =
      "\\\\begin{vmatrix} \\\\hat{i} & \\\\hat{j} & \\\\hat{k} \\\\\\\\ 1 & 1 & 1 \\\\\\\\ 1 & 1 & 0 \\\\end{vmatrix}\\\\";
    const out = normalizeOldDress(s);
    expect(out).toContain("\\\\ 1 & 1 & 1 \\\\");
    expect(out.startsWith("\\(\\begin{vmatrix}")).toBe(true);
    expect(out.endsWith("\\end{vmatrix}\\)")).toBe(true);
  });

  it("wraps each math run separately in a solution sentence", () => {
    const s =
      "The distance of point P from line through A with direction \\\\vec{b}\\\\, is given by \\\\frac{|(\\\\vec{p} - \\\\vec{a}) \\\\times \\\\vec{b}|}{|\\\\vec{b}|}.";
    expect(normalizeOldDress(s)).toBe(
      "The distance of point P from line through A with direction \\(\\vec{b}\\), is given by \\(\\frac{|(\\vec{p} - \\vec{a}) \\times \\vec{b}|}{|\\vec{b}|}\\)."
    );
  });

  it("collapses doubly-doubled backslashes (\\\\\\\\sqrt) outside matrices", () => {
    expect(normalizeOldDress("\\\\\\\\sqrt{61}\\\\")).toBe("\\(\\sqrt{61}\\)");
  });

  it("strips a doubled line-break before a prose word", () => {
    expect(normalizeOldDress("= 5 \\\\\\\\Therefore, unit vector = \\\\frac{3\\\\hat{i}}{5}\\\\")).toBe(
      "= 5 Therefore, unit vector \\(= \\frac{3\\hat{i}}{5}\\)"
    );
  });

  it("leaves a comma-separated numeric option unwrapped", () => {
    expect(normalizeOldDress("2, 3, 6\\\\")).toBe("2, 3, 6");
  });
});

describe("isShuffleEligible", () => {
  it("rejects position-sensitive options and letter-referencing solutions", () => {
    expect(isShuffleEligible(["1", "2", "3", "4"], "Plain solution.")).toBe(true);
    expect(isShuffleEligible(["1", "Both A and B", "3", "4"], "sol")).toBe(false);
    expect(isShuffleEligible(["1", "2", "3", "None of these"], "sol")).toBe(false);
    expect(isShuffleEligible(["1", "2", "3", "All of the above"], "sol")).toBe(false);
    expect(isShuffleEligible(["1", "2", "3", "4"], "This matches option B.")).toBe(false);
    expect(isShuffleEligible(["1", "2", "3", "4"], "")).toBe(true);
  });
});

describe("planShuffles", () => {
  const mk = (id: string, answer: string, eligible = true) => ({ id, answer, eligible });

  it("moves surplus letters onto deficit letters until near-balanced", () => {
    // 8 questions all keyed A → plan should spread to ~2 per letter.
    const rows = Array.from({ length: 8 }, (_, i) => mk(`01-${i + 2}`, "A"));
    const plan = planShuffles(rows);
    const after = { A: 0, B: 0, C: 0, D: 0 } as Record<string, number>;
    for (const r of rows) after[plan[r.id] ?? r.answer]++;
    expect(Object.values(after).every((n) => n === 2)).toBe(true);
  });

  it("only shuffles eligible rows and is deterministic", () => {
    const rows = [mk("01-2", "A"), mk("01-3", "A", false), mk("01-4", "A"), mk("01-5", "B")];
    const plan1 = planShuffles(rows);
    const plan2 = planShuffles(rows);
    expect(plan1).toEqual(plan2);
    expect(plan1["01-3"]).toBeUndefined(); // ineligible never moves
  });

  it("returns an empty plan when already balanced", () => {
    const rows = [mk("01-2", "A"), mk("01-3", "B"), mk("01-4", "C"), mk("01-5", "D")];
    expect(planShuffles(rows)).toEqual({});
  });
});

describe("letterDistribution", () => {
  it("counts correct letters", () => {
    const dist = letterDistribution([
      { id: "x", answer: "A", eligible: true },
      { id: "y", answer: "A", eligible: false },
      { id: "z", answer: "C", eligible: true },
    ]);
    expect(dist).toEqual({ A: 2, B: 0, C: 1, D: 0 });
  });
});
