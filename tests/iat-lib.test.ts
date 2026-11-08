import { describe, it, expect } from "vitest";
import {
  storedOrder,
  rowOrder,
  keyLetter,
  paperIssues,
  blindPayload,
  crosscheck,
  assemblePaper,
  numberAcrossPaper,
  type IatPaper,
  type IatRow,
  type DerivedEntry,
} from "../scripts/iat/lib";
import { iatYear, type IatYear } from "../scripts/iat/config";

/**
 * The IAT lane's pure core.
 *
 * IISER's 2025 and 2026 files print EVERY question with the correct answer as
 * option (a) ("For all the multiple-choice questions listed below, option (a)
 * is the correct answer"). Stored as printed, every answer in the bank would be
 * A. So for a keyed year the options are put in a fixed, seeded order before
 * anything else sees them, and the key letter is wherever printed (a) landed.
 * The blind solver only ever sees that stored order.
 */

const KEYED: IatYear = { year: 2025, file: "x.pdf", keyMode: "first-option", keyConfirmed: true, note: "" };
const UNKEYED: IatYear = { year: 2019, file: "y.pdf", keyMode: "none", keyConfirmed: false, note: "" };

const row = (over: Partial<IatRow> = {}): IatRow => ({
  ref: "1",
  questionNumber: "1",
  chapter: "Animal Kingdom",
  subtopic: "Hemichordata and Chordata",
  text: "Which group has a stomochord?",
  options: ["Hemichordata", "Chordata", "Echinodermata", "Annelida"],
  ...over,
});

const paper = (rows: IatRow[], over: Partial<IatPaper> = {}): IatPaper => ({
  subject: "Biology",
  year: 2025,
  source: "IISER IAT 2025 final answer key (English)",
  rows,
  ...over,
});

const derived = (ref: string, label: string, over: Partial<DerivedEntry> = {}): DerivedEntry => ({
  ref,
  label,
  value: "v",
  working: "Because. So the answer is option (" + label + ").",
  difficulty: "Moderate",
  confidence: "HIGH",
  ...over,
});

describe("storedOrder", () => {
  const opts = ["w", "x", "y", "z"];

  it("is a permutation of the printed indices", () => {
    for (let i = 0; i < 50; i++) {
      expect([...storedOrder(`seed-${i}`, opts)].sort()).toEqual([0, 1, 2, 3]);
    }
  });

  it("gives the same order for the same seed, every run", () => {
    expect(storedOrder("iat-2025-Biology-7", opts)).toEqual(storedOrder("iat-2025-Biology-7", opts));
  });

  it("spreads printed (a) over all four slots across a paper's worth of seeds", () => {
    const slots = [0, 0, 0, 0];
    for (let i = 1; i <= 240; i++) slots[storedOrder(`iat-2025-Physics-${i}`, opts).indexOf(0)]++;
    for (const n of slots) expect(n).toBeGreaterThan(35);
  });

  it("puts a 'none of the above' style option last, even when it was printed first", () => {
    const o = ["None of the above", "x", "y", "z"];
    for (let i = 0; i < 30; i++) expect(storedOrder(`s${i}`, o)[3]).toBe(0);
  });

  it("keeps two pinned options at the end in their printed order", () => {
    const o = ["All of the above", "x", "None of these", "z"];
    for (let i = 0; i < 30; i++) expect(storedOrder(`s${i}`, o).slice(2)).toEqual([0, 2]);
  });
});

describe("rowOrder", () => {
  it("keeps the printed order in a year without a key (the printed order is the real one)", () => {
    expect(rowOrder(UNKEYED, "Biology", row())).toEqual([0, 1, 2, 3]);
  });

  it("shuffles in a keyed year", () => {
    const orders = Array.from({ length: 20 }, (_, i) => rowOrder(KEYED, "Biology", row({ ref: String(i + 1) })).join(""));
    expect(new Set(orders).size).toBeGreaterThan(1);
  });

  it("does not shuffle when an option names another option by letter", () => {
    const r = row({ options: ["Both (b) and (c)", "x", "y", "z"] });
    expect(rowOrder(KEYED, "Biology", r)).toEqual([0, 1, 2, 3]);
  });

  it("ignores a bracketed letter inside maths, which is not an option reference", () => {
    const r = row({ options: ["\\(f(a) = 0\\)", "\\(f(b) = 1\\)", "\\(2\\)", "\\(3\\)"] });
    const orders = Array.from({ length: 20 }, (_, i) => rowOrder(KEYED, "Biology", { ...r, ref: String(i) }).join(""));
    expect(new Set(orders).size).toBeGreaterThan(1);
  });
});

describe("keyLetter", () => {
  it("is the stored slot of printed (a)", () => {
    expect(keyLetter([2, 0, 3, 1])).toBe("B");
    expect(keyLetter([0, 1, 2, 3])).toBe("A");
  });
});

describe("paperIssues", () => {
  it("accepts a clean row", () => {
    expect(paperIssues(paper([row()]))).toEqual([]);
  });

  it("refuses a chapter or subtopic outside the IAT taxonomy", () => {
    expect(paperIssues(paper([row({ chapter: "Zoology" })]))[0]).toMatch(/chapter "Zoology"/);
    expect(paperIssues(paper([row({ subtopic: "Kingdom Fungi" })]))[0]).toMatch(/subtopic "Kingdom Fungi"/);
  });

  it("refuses anything but four options", () => {
    expect(paperIssues(paper([row({ options: ["a", "b", "c"] })]))[0]).toMatch(/4 options/);
  });

  it("refuses an answer-shaped field", () => {
    const r = { ...row(), answer: "A" } as IatRow;
    expect(paperIssues(paper([r])).join()).toMatch(/answer-shaped/);
  });

  it("refuses duplicate options, which would make the key ambiguous", () => {
    expect(paperIssues(paper([row({ options: ["x", "x", "y", "z"] })])).join()).toMatch(/duplicate option/);
  });

  it("refuses option figures unless there are exactly four", () => {
    const f = { page: "p23", region: [0.1, 0.1, 0.4, 0.2] as [number, number, number, number] };
    expect(paperIssues(paper([row({ optionFigures: [f, f] })])).join()).toMatch(/optionFigures/);
  });

  it("catches unbalanced maths and literal backslash-n", () => {
    expect(paperIssues(paper([row({ text: "\\(x^2" })])).join()).toMatch(/unbalanced/);
    expect(paperIssues(paper([row({ text: "a\\nb" })])).join()).toMatch(/backslash-n/);
  });
});

describe("blindPayload", () => {
  it("hands the solver the STORED order, so printed (a) is not always first", () => {
    const rows = Array.from({ length: 12 }, (_, i) =>
      row({ ref: String(i + 1), questionNumber: String(i + 1), options: ["KEY", "x", "y", "z"] })
    );
    const out = blindPayload(paper(rows), KEYED);
    const firstSlotKey = out.rows.filter((r) => r.options[0] === "KEY").length;
    expect(firstSlotKey).toBeLessThan(12);
    for (const r of out.rows) expect(r.options).toContain("KEY");
  });

  it("names option-figure files by STORED letter, never by printed position", () => {
    const f = (n: number) => ({ page: "p23", region: [0.1, n, 0.4, n + 0.1] as [number, number, number, number] });
    const r = row({ optionFigures: [f(0.1), f(0.3), f(0.5), f(0.7)] });
    const out = blindPayload(paper([r]), KEYED);
    expect(out.rows[0].optionFigures).toEqual(["figures/1-A.png", "figures/1-B.png", "figures/1-C.png", "figures/1-D.png"]);
    expect(out.copies.map((c) => c.to)).toEqual(["1-A.png", "1-B.png", "1-C.png", "1-D.png"]);
    const order = rowOrder(KEYED, "Biology", r);
    expect(out.copies.map((c) => c.from)).toEqual(order.map((p) => `1-opt${p + 1}.png`));
  });

  it("carries no answer-shaped field", () => {
    const out = blindPayload(paper([row()]), KEYED);
    expect(JSON.stringify(out.rows)).not.toMatch(/"(answer|correct|key)"/i);
  });
});

describe("crosscheck", () => {
  it("in a keyed year, compares the solver with the stored slot of printed (a)", () => {
    const r = row();
    const k = keyLetter(rowOrder(KEYED, "Biology", r));
    const other = "ABCD".replace(k, "")[0];
    expect(crosscheck(paper([r]), KEYED, [derived("1", k)]).rows[0].verdict).toBe("AGREE");
    const res = crosscheck(paper([r]), KEYED, [derived("1", other)]);
    expect(res.rows[0].verdict).toBe("DISAGREE");
    expect(res.agree).toBe(0);
  });

  it("reports a missing derivation as a row, never drops it", () => {
    const res = crosscheck(paper([row(), row({ ref: "2", questionNumber: "2" })]), KEYED, [derived("1", "A")]);
    expect(res.rows.find((x) => x.ref === "2")!.verdict).toBe("MISSING_DERIVATION");
    expect(res.total).toBe(2);
  });

  it("in a year with no key, compares two independent solvers", () => {
    const res = crosscheck(paper([row()], { year: 2019 }), UNKEYED, [derived("1", "A")], [derived("1", "C")]);
    expect(res.rows[0].verdict).toBe("DISAGREE");
    expect(crosscheck(paper([row()], { year: 2019 }), UNKEYED, [derived("1", "A")]).rows[0].verdict).toBe("NO_KEY");
  });
});

describe("assemblePaper", () => {
  it("keys a keyed year from printed (a), in stored order", () => {
    const r = row();
    const order = rowOrder(KEYED, "Biology", r);
    const k = keyLetter(order);
    const { rows, issues } = assemblePaper({ paper: paper([r]), year: KEYED, derived: [derived("1", k)] });
    expect(issues).toEqual([]);
    expect(rows[0].answer).toBe(k);
    expect(rows[0].options.map((o) => o.text)).toEqual(order.map((p) => r.options[p]));
    expect(rows[0].options.find((o) => o.isCorrect)!.text).toBe("Hemichordata");
  });

  it("blocks a keyed-year disagreement until it is read", () => {
    const r = row();
    const k = keyLetter(rowOrder(KEYED, "Biology", r));
    const other = "ABCD".replace(k, "")[0];
    const blocked = assemblePaper({ paper: paper([r]), year: KEYED, derived: [derived("1", other)] });
    expect(blocked.rows).toEqual([]);
    expect(blocked.issues[0]).toMatch(/disagree/);
    const read = assemblePaper({
      paper: paper([r]), year: KEYED, derived: [derived("1", other)],
      adjudications: [{ ref: "1", solution: "Rewritten. So the answer is the key's option.", why: "solver slipped" }],
    });
    expect(read.issues).toEqual([]);
    expect(read.rows[0].answer).toBe(k);
  });

  it("never lets an adjudication overrule IISER's key", () => {
    const r = row();
    const k = keyLetter(rowOrder(KEYED, "Biology", r));
    const other = "ABCD".replace(k, "")[0];
    const res = assemblePaper({
      paper: paper([r]), year: KEYED, derived: [derived("1", k)],
      adjudications: [{ ref: "1", answer: other, why: "we disagree" }],
    });
    expect(res.issues.join()).toMatch(/cannot overrule/);
  });

  it("puts a notice above the solution, and marks a defective question grace (owner policy 2026-10-29)", () => {
    const r = row();
    const k = keyLetter(rowOrder(KEYED, "Biology", r));
    const other = "ABCD".replace(k, "")[0];
    const res = assemblePaper({
      paper: paper([r]), year: KEYED, derived: [derived("1", other)],
      adjudications: [{ ref: "1", notice: "Two options are defensible.", grace: true, solution: "Both readings. So the key is the setter's option.", why: "x" }],
    });
    expect(res.issues).toEqual([]);
    expect(res.rows[0].answer).toBe(k);
    expect(res.rows[0].grace).toBe(true);
    expect(res.rows[0].solution.startsWith("**Note:** Two options are defensible.\n\n")).toBe(true);
  });

  it("refuses grace without a notice telling students why", () => {
    const r = row();
    const k = keyLetter(rowOrder(KEYED, "Biology", r));
    const res = assemblePaper({ paper: paper([r]), year: KEYED, derived: [derived("1", k)], adjudications: [{ ref: "1", grace: true }] });
    expect(res.issues.join()).toMatch(/notice/);
  });

  it("refuses a keyed year whose key format is not confirmed yet", () => {
    const res = assemblePaper({
      paper: paper([row()], { year: 2023 }),
      year: { ...KEYED, year: 2023, keyConfirmed: false },
      derived: [derived("1", "A")],
    });
    expect(res.issues.join()).toMatch(/not confirmed/);
  });

  it("needs two agreeing solvers in a year with no key", () => {
    const p = paper([row()], { year: 2019 });
    expect(assemblePaper({ paper: p, year: UNKEYED, derived: [derived("1", "B")] }).issues.join()).toMatch(/second/);
    const split = assemblePaper({ paper: p, year: UNKEYED, derived: [derived("1", "B")], second: [derived("1", "C")] });
    expect(split.issues.join()).toMatch(/adjudicate/);
    const ok = assemblePaper({ paper: p, year: UNKEYED, derived: [derived("1", "B")], second: [derived("1", "B")] });
    expect(ok.issues).toEqual([]);
    expect(ok.rows[0].answer).toBe("B");
    expect(ok.rows[0].options.map((o) => o.text)).toEqual(row().options);
    const settled = assemblePaper({
      paper: p, year: UNKEYED, derived: [derived("1", "B")], second: [derived("1", "C")],
      adjudications: [{ ref: "1", answer: "C", solution: "Re-derived. So the answer is option (C).", why: "B misread the stem" }],
    });
    expect(settled.issues).toEqual([]);
    expect(settled.rows[0].answer).toBe("C");
  });

  it("leaves out a held row", () => {
    const res = assemblePaper({
      paper: paper([row()]), year: KEYED, derived: [],
      adjudications: [{ ref: "1", hold: "dropped from IISER's final key" }],
    });
    expect(res.rows).toEqual([]);
    expect(res.issues).toEqual([]);
  });

  it("carries option figures in stored order", () => {
    const f = (n: number) => ({ page: "p23", region: [0.1, n, 0.4, n + 0.1] as [number, number, number, number] });
    const r = row({ optionFigures: [f(0.1), f(0.3), f(0.5), f(0.7)] });
    const order = rowOrder(KEYED, "Biology", r);
    const k = keyLetter(order);
    const { rows } = assemblePaper({ paper: paper([r]), year: KEYED, derived: [derived("1", k)] });
    expect(rows[0].options.map((o) => o.figureFile)).toEqual(order.map((p) => `1-opt${p + 1}.png`));
  });
});

describe("numberAcrossPaper", () => {
  it("numbers a year 1..N in subject order, by printed number within a subject", () => {
    const sub = (refs: string[]) => refs.map((ref) => ({ ref }));
    const out = numberAcrossPaper([
      { subject: "Physics", rows: sub(["2", "1"]) },
      { subject: "Biology", rows: sub(["1", "2", "3"]) },
      { subject: "Chemistry", rows: sub(["1"]) },
    ]);
    expect(out.map((o) => `${o.subject[0]}${o.row.ref}:${o.n}`)).toEqual(["B1:1", "B2:2", "B3:3", "C1:4", "P1:5", "P2:6"]);
  });

  it("refuses a subject outside the paper", () => {
    expect(() => numberAcrossPaper([{ subject: "Zoology" as never, rows: [{ ref: "1" }] }])).toThrow(/Zoology/);
  });
});

describe("config", () => {
  it("knows every year IISER posts, and only 2025 and 2026 carry a confirmed key", () => {
    expect([2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => iatYear(y).year)).toHaveLength(9);
    expect(() => iatYear(2020)).toThrow(/2020/);
    expect([2025, 2026].every((y) => iatYear(y).keyConfirmed)).toBe(true);
    expect([2017, 2018, 2019, 2021, 2022].every((y) => iatYear(y).keyMode === "none")).toBe(true);
  });
});
