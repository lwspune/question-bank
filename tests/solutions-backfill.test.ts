import { describe, expect, it } from "vitest";
import {
  answersMatch,
  judge,
  keyOf,
  repairDraft,
  skipReason,
  slices,
  type BankRow,
} from "../scripts/solutions/lib";

const mcq = (over: Partial<BankRow> = {}): BankRow => ({
  id: "q1",
  question_format: "mcq",
  visibility: "PUBLIC",
  publish_blocked: null,
  cancelled_note: null,
  solution: null,
  numeric_answer: null,
  image_url: null,
  text: "What is 2 + 3?",
  context: null,
  set_id: null,
  options: [
    { label: "A", text: "4", is_correct: false },
    { label: "B", text: "5", is_correct: true },
    { label: "C", text: "6", is_correct: false },
    { label: "D", text: "7", is_correct: false },
  ],
  ...over,
});

const numeric = (key: number | null): BankRow =>
  mcq({ question_format: "numeric", options: [], numeric_answer: key });

const GOOD = "Add the two numbers: \\(2 + 3 = 5\\).\nSo the answer is (B) 5.";

describe("keyOf", () => {
  it("is the one correct label of an MCQ", () => {
    expect(keyOf(mcq())).toBe("B");
  });
  it("is null for an MCQ with no correct option or with two", () => {
    expect(keyOf(mcq({ options: mcq().options.map((o) => ({ ...o, is_correct: false })) }))).toBeNull();
    expect(keyOf(mcq({ options: mcq().options.map((o) => ({ ...o, is_correct: true })) }))).toBeNull();
  });
  it("is the numeric answer of a numeric row", () => {
    expect(keyOf(numeric(12.5))).toBe("12.5");
    expect(keyOf(numeric(null))).toBeNull();
  });
  it("is null for a subjective row (its answer IS the solution)", () => {
    expect(keyOf(mcq({ question_format: "subjective", options: [] }))).toBeNull();
  });
});

describe("skipReason", () => {
  it("is null for a fillable row", () => {
    expect(skipReason(mcq())).toBeNull();
  });
  it("names each reason a row is out of scope", () => {
    expect(skipReason(mcq({ visibility: "PRIVATE" }))).toMatch(/PRIVATE/);
    expect(skipReason(mcq({ publish_blocked: "copyright" }))).toMatch(/blocked/);
    expect(skipReason(mcq({ cancelled_note: "Withdrawn by UPSC" }))).toMatch(/cancelled/);
    expect(skipReason(mcq({ solution: "Already worked." }))).toMatch(/already has/);
    expect(skipReason(numeric(null))).toMatch(/no key/);
    expect(skipReason(mcq({ question_format: "subjective", options: [] }))).toMatch(/subjective/);
  });
  it("treats a whitespace-only solution as empty", () => {
    expect(skipReason(mcq({ solution: "  \n" }))).toBeNull();
  });
});

describe("answersMatch", () => {
  it("reads an MCQ letter in the forms a solver writes it", () => {
    for (const got of ["B", "b", "(B)", "(b)", " B. "]) expect(answersMatch("mcq", got, "B")).toBe(true);
    expect(answersMatch("mcq", "C", "B")).toBe(false);
  });
  it("matches numeric answers by the mock grading rule, fractions included", () => {
    expect(answersMatch("numeric", "0.5", "0.5")).toBe(true);
    expect(answersMatch("numeric", "1/2", "0.5")).toBe(true);
    expect(answersMatch("numeric", "12.504", "12.5")).toBe(true);
    expect(answersMatch("numeric", "12.6", "12.5")).toBe(false);
    expect(answersMatch("numeric", "about 12", "12")).toBe(false);
  });
});

describe("judge", () => {
  it("writes a clean draft that reaches the key", () => {
    expect(judge({ solution: GOOD, solvedAnswer: "B" }, mcq())).toEqual({ kind: "write", solution: GOOD });
  });
  it("disputes a draft that reaches another answer, and never writes it", () => {
    expect(judge({ solution: GOOD.replace("(B) 5", "(C) 6"), solvedAnswer: "C" }, mcq())).toEqual({
      kind: "dispute",
      key: "B",
      got: "C",
    });
  });
  it("skips a row that went out of scope since the export", () => {
    expect(judge({ solution: GOOD, solvedAnswer: "B" }, mcq({ solution: "Someone wrote one." })).kind).toBe("skip");
  });
  it("passes on the solver's own skip", () => {
    expect(judge({ skip: "the figure is needed and not given" }, mcq())).toEqual({
      kind: "skip",
      reason: "solver: the figure is needed and not given",
    });
  });
  it("rejects a draft with no answer or a text problem", () => {
    expect(judge({ solution: GOOD }, mcq()).kind).toBe("reject");
    const r = judge({ solution: GOOD.replace(": ", " — "), solvedAnswer: "B" }, mcq());
    expect(r.kind).toBe("reject");
  });
  it("rejects an MCQ solution whose last line does not name the key's option", () => {
    const r = judge({ solution: "\\(2 + 3 = 5\\).", solvedAnswer: "B" }, mcq());
    expect(r).toMatchObject({ kind: "reject" });
    if (r.kind === "reject") expect(r.problems.join()).toMatch(/last line/);
  });
  it("rejects a solution that leans on a figure the row does not carry", () => {
    const s = "From the figure, the two angles are equal.\nSo the answer is (B) 5.";
    const r = judge({ solution: s, solvedAnswer: "B" }, mcq());
    expect(r.kind).toBe("reject");
    expect(judge({ solution: s, solvedAnswer: "B", imageSeen: true }, mcq({ image_url: "x/y.png" })).kind).toBe("write");
  });
  it("rejects a draft for a question with a picture unless the solver says it opened it", () => {
    const r = judge({ solution: GOOD, solvedAnswer: "B" }, mcq({ image_url: "x/y.png" }));
    expect(r.kind).toBe("reject");
    if (r.kind === "reject") expect(r.problems.join()).toMatch(/picture/);
    expect(judge({ solution: GOOD, solvedAnswer: "B", imageSeen: true }, mcq({ image_url: "x/y.png" })).kind).toBe("write");
  });
  it("writes a numeric draft whose working ends on the key", () => {
    const s = "\\(\\frac{1}{2}\\) of 25 is \\(12.5\\).\nSo the answer is 12.5.";
    expect(judge({ solution: s, solvedAnswer: "25/2" }, numeric(12.5)).kind).toBe("write");
  });
});

describe("repairDraft", () => {
  it("reads a missing solvedAnswer from the solver's own last line", () => {
    const r = repairDraft({ solution: "Two plus three is five.\nSo the answer is (B) 5." });
    expect(r.draft.solvedAnswer).toBe("B");
    expect(r.changes).toEqual(["solvedAnswer from the last line"]);
  });
  it("leaves a draft with no letter in its last line alone, for apply to reject", () => {
    const r = repairDraft({ solution: "Five." });
    expect(r.draft.solvedAnswer).toBeUndefined();
    expect(r.changes).toEqual([]);
  });
  it("never overrides a solvedAnswer the solver gave", () => {
    const r = repairDraft({ solution: "So the answer is (B) 5.", solvedAnswer: "C" });
    expect(r.draft.solvedAnswer).toBe("C");
  });
  it("restores line breaks escaped twice, leaving LaTeX commands alone", () => {
    const r = repairDraft({ solution: "Step one.\\nSo \\(x \\neq 2\\).\\nSo the answer is (A) 1.", solvedAnswer: "A" });
    expect(r.draft.solution).toBe("Step one.\nSo \\(x \\neq 2\\).\nSo the answer is (A) 1.");
    expect(r.changes).toEqual(["line breaks escaped twice"]);
  });
  it("does not touch skips or clean drafts", () => {
    expect(repairDraft({ skip: "not sure" }).changes).toEqual([]);
    expect(repairDraft({ solution: "So the answer is (A) 1.", solvedAnswer: "A" }).changes).toEqual([]);
  });
});

describe("slices", () => {
  const row = (id: string, set_id: string | null = null, context: string | null = null) => ({ id, set_id, context });
  it("cuts a batch into slices of at most the size", () => {
    const s = slices(["a", "b", "c", "d", "e"].map((id) => row(id)), 2);
    expect(s.map((x) => x.map((r) => r.id))).toEqual([["a", "b"], ["c", "d"], ["e"]]);
  });
  it("never splits the questions of one passage, by set id or by shared context", () => {
    const rows = [row("a"), row("p1", "S"), row("p2", "S"), row("p3", "S"), row("c1", null, "Read the passage."), row("c2", null, "Read the passage.")];
    const s = slices(rows, 2).map((x) => x.map((r) => r.id));
    expect(s.find((x) => x.includes("p1"))).toEqual(expect.arrayContaining(["p1", "p2", "p3"]));
    expect(s.find((x) => x.includes("c1"))).toEqual(expect.arrayContaining(["c1", "c2"]));
    expect(s.flat().sort()).toEqual(rows.map((r) => r.id).sort());
  });
});
