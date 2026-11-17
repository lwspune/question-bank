import { describe, expect, it } from "vitest";
import { upManifest, type UpRules, type UpSourceRow } from "@/lib/questionPapers/upManifest";

const meta = {
  slug: "2025-822-bw",
  groupSlug: "2025-822-bw",
  title: "UP Board Class 10 Mathematics 2025 (822 BW)",
  year: 2025,
  paperCode: "822 (BW)",
};

const row = (ref: string, questionNumber: string, section: string, marks: number, alternativeTo: string | null = null): UpSourceRow => ({
  ref,
  questionNumber,
  section,
  marks,
  alternativeTo,
});

// Section A: two 1-mark MCQs. Section B: Q1 all of (a)-(b) at 2 each; Q2 any 2 of
// (a)-(c) at 3 each; Q3 at 4 OR its alternative. Best score: 2 + 4 + 6 + 4 = 16.
const rows: UpSourceRow[] = [
  row("Q1", "1", "A", 1),
  row("Q2", "2", "A", 1),
  row("B1a", "B1 (a)", "B", 2),
  row("B1b", "B1 (b)", "B", 2),
  row("B2a", "B2 (a)", "B", 3),
  row("B2b", "B2 (b)", "B", 3),
  row("B2c", "B2 (c)", "B", 3),
  row("B3a", "B3", "B", 4),
  row("B3b", "B3 (OR)", "B", 4, "B3a"),
];
const fp = rows.map((r) => `hash-${r.ref}`);
const rules: UpRules = { maxMarks: 16, minutes: 195, groups: { B2: { attempt: 2, each: 3 } } };

describe("upManifest — a UP Board paper on /question-papers", () => {
  it("builds every row as an item, in printed order, with its marks and fingerprint", () => {
    const r = upManifest(meta, rows, fp, rules);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.manifest.items.map((i) => i.printedNumber)).toEqual(rows.map((x) => x.questionNumber));
    expect(r.manifest.items.map((i) => i.marks)).toEqual([1, 1, 2, 2, 3, 3, 3, 4, 4]);
    expect(r.manifest.items.map((i) => i.contentHash)).toEqual(fp);
    expect(r.manifest).toMatchObject({ totalMarks: 16, durationMinutes: 195, setNumber: null, sitting: null, paperCode: "822 (BW)" });
  });

  it("points an OR alternative at the question it replaces", () => {
    const r = upManifest(meta, rows, fp, rules);
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.items.map((i) => i.alternativeTo)).toEqual([null, null, null, null, null, null, null, null, 8]);
  });

  it("says in the section note which question offers a choice", () => {
    const r = upManifest(meta, rows, fp, rules);
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.sections).toEqual([
      { key: "A", title: "Section A", note: "1 mark each" },
      { key: "B", title: "Section B", note: "Q.2: attempt any 2 of 3 parts" },
    ]);
  });

  it("titles a paper printed without sections 'Questions'", () => {
    const flat = rows.map((r) => ({ ...r, section: "" }));
    const r = upManifest(meta, flat, fp, rules);
    if (!r.ok) throw new Error(r.reason);
    expect(r.manifest.sections.map((s) => s.title)).toEqual(["Questions"]);
  });

  it("refuses a paper whose best possible score is not the printed maximum", () => {
    const r = upManifest(meta, rows, fp, { ...rules, maxMarks: 70 });
    expect(r).toMatchObject({ ok: false });
    if (!r.ok) expect(r.reason).toMatch(/16.*70/);
    const noRule = upManifest(meta, rows, fp, { maxMarks: 16, minutes: 195 });
    expect(noRule.ok).toBe(false);
  });

  it("refuses a choice whose parts carry different marks, or asks for more parts than there are", () => {
    const uneven = rows.map((r) => (r.ref === "B2c" ? { ...r, marks: 2 } : r));
    expect(upManifest(meta, uneven, fp, rules).ok).toBe(false);
    expect(upManifest(meta, rows, fp, { ...rules, groups: { B2: { attempt: 4, each: 3 } } }).ok).toBe(false);
  });

  it("does not take Q10's parts for Q1's choice", () => {
    const more = [...rows, row("B10a", "B10 (a)", "B", 1)];
    const r = upManifest(meta, more, [...fp, "hash-B10a"], { ...rules, maxMarks: 17, groups: { B1: { attempt: 1, each: 2 }, B2: { attempt: 2, each: 3 } } });
    // B1 any 1 of (a)-(b) = 2; B10 (a) still counts once: 2 + 2 + 6 + 4 + 1 = 15, not 17.
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toMatch(/15/);
  });

  it("counts a part transcribed as two rows as one part of the choice (2025 Maths 324 IZ Q9 (a) (i)-(ii))", () => {
    const split = [
      row("Q9ai", "9 (a) (i)", "", 4),
      row("Q9aii", "9 (a) (ii)", "", 4),
      row("Q9b", "9 (b)", "", 8),
    ];
    const r = upManifest(meta, split, ["h1", "h2", "h3"], { maxMarks: 8, minutes: 195, groups: { Q9: { attempt: 1, each: 8 } } });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.manifest.sections[0].note).toBe("Q.9: attempt any 1 of 2 parts");
  });

  it("reads parts numbered (i)-(iii) as three parts, not one (2025 Science 824 CK B9: any two of three)", () => {
    const roman = [row("B9i", "B9 (i)", "B", 2), row("B9ii", "B9 (ii)", "B", 2), row("B9iii", "B9 (iii)", "B", 2)];
    const r = upManifest(meta, roman, ["h1", "h2", "h3"], { maxMarks: 4, minutes: 195, groups: { B9: { attempt: 2, each: 2 } } });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.manifest.sections[0].note).toBe("Q.9: attempt any 2 of 3 parts");
  });

  it("refuses an OR that names a question not before it, and a row without marks", () => {
    const bad = rows.map((r) => (r.ref === "B3b" ? { ...r, alternativeTo: "B9" } : r));
    expect(upManifest(meta, bad, fp, rules).ok).toBe(false);
    const zero = rows.map((r) => (r.ref === "Q1" ? { ...r, marks: 0 } : r));
    expect(upManifest(meta, zero, fp, rules).ok).toBe(false);
  });
});
