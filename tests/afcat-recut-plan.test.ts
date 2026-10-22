import { describe, it, expect } from "vitest";
import { applyRecutPlan, rewriteChapterSubtopics } from "../scripts/afcat/lib";

// A /notes re-cut of an AFCAT chapter lands in three source-of-record files: the
// chapter's closed subtopic list (config.ts), the pass-1 values (derived.json) and
// the per-row adjudications (overrides.json). recut.ts applies one plan to all three;
// this is its pure core. Whole-subtopic merges are renames, single rows are moves.
describe("applyRecutPlan", () => {
  const derived = [
    { id: "01-1", subtopic: "Partnership" },
    { id: "01-2", subtopic: "Dividing in a Given Ratio" },
    { id: "01-3", subtopic: "Combining Ratios" },
    { id: "01-4", subtopic: "Combining Ratios" },
  ];
  const overrides = { "01-2": { reason: "key stands", subtopic: "Partnership" } };
  const plan = {
    subtopics: ["Dividing and Partnership", "Combining Ratios"],
    renames: { Partnership: "Dividing and Partnership", "Dividing in a Given Ratio": "Dividing and Partnership" },
    moves: { "01-3": { to: "Dividing and Partnership", reason: "a share of a total" } },
  };

  it("renames pass-1 values and existing override subtopics, and records each move with its reason", () => {
    const out = applyRecutPlan(plan, { derived, overrides });
    expect(out.problems).toEqual([]);
    expect(out.derived.map((r) => r.subtopic)).toEqual([
      "Dividing and Partnership",
      "Dividing and Partnership",
      "Combining Ratios",
      "Combining Ratios",
    ]);
    expect(out.overrides["01-2"]).toEqual({ reason: "key stands", subtopic: "Dividing and Partnership" });
    expect(out.overrides["01-3"]).toEqual({ subtopic: "Dividing and Partnership", reason: "Notes re-cut: a share of a total" });
  });

  it("is idempotent: applying the same plan twice records each move's reason once", () => {
    const once = applyRecutPlan(plan, { derived, overrides });
    const twice = applyRecutPlan(plan, { derived: once.derived, overrides: once.overrides });
    expect(twice.overrides).toEqual(once.overrides);
    expect(twice.derived).toEqual(once.derived);
  });

  it("appends to an existing reason instead of replacing it", () => {
    const out = applyRecutPlan({ ...plan, moves: { "01-2": { to: "Combining Ratios", reason: "joins two ratios" } } }, { derived, overrides });
    expect(out.overrides["01-2"].reason).toBe("key stands Notes re-cut: joins two ratios");
  });

  it("ignores rows excluded at ingest: they never ship, so they need no place in the new list", () => {
    const out = applyRecutPlan(
      { subtopics: ["Combining Ratios"], renames: {}, moves: {} },
      { derived: [{ id: "02-1", subtopic: "Combining Ratios" }, { id: "02-2", subtopic: "Old Catch-all" }], overrides: { "02-2": { reason: "dup", exclude: true } } }
    );
    expect(out.problems).toEqual([]);
  });

  it("refuses a plan that leaves a row outside the list, moves an unknown row, or lists an empty subtopic", () => {
    const out = applyRecutPlan(
      { subtopics: ["Combining Ratios", "Nothing Here"], renames: {}, moves: { "09-9": { to: "Combining Ratios", reason: "x" } } },
      { derived, overrides: {} }
    );
    expect(out.problems).toEqual([
      "move 09-9: no such row",
      '01-1: subtopic "Partnership" not in the new list',
      '01-2: subtopic "Dividing in a Given Ratio" not in the new list',
      'subtopic "Nothing Here" would hold no row',
    ]);
  });
});

// config.ts is TypeScript, so the list is rewritten in place inside the chapter's
// own block; another chapter's identical names must not move.
describe("rewriteChapterSubtopics", () => {
  const src = [
    '  "percentage": {',
    '    subtopics: ["Income, Expenditure and Savings"],',
    '    files: [{ key: "a", subtopic: "Income, Expenditure and Savings" }],',
    "  },",
    '  "ratio": {',
    "    subtopics: [",
    '      "Partnership",',
    '      "Combining Ratios",',
    "    ],",
    '    files: [{ key: "cp", subtopic: "Partnership" }],',
    "  },",
    "};",
  ].join("\n");

  it("replaces the chapter's list and renames its file-level subtopics only", () => {
    const out = rewriteChapterSubtopics(src, "ratio", ["Dividing and Partnership", "Combining Ratios"], {
      Partnership: "Dividing and Partnership",
    });
    expect(out).toContain('    subtopics: [\n      "Dividing and Partnership",\n      "Combining Ratios",\n    ],');
    expect(out).toContain('files: [{ key: "cp", subtopic: "Dividing and Partnership" }]');
    expect(out).toContain('subtopics: ["Income, Expenditure and Savings"]');
  });

  it("finds a chapter whose key is unquoted (a one-word id such as average)", () => {
    const unquoted = src.replace('  "ratio": {', "  ratio: {");
    const out = rewriteChapterSubtopics(unquoted, "ratio", ["Combining Ratios"], {});
    expect(out).toContain('    subtopics: [\n      "Combining Ratios",\n    ],');
    expect(out).toContain('subtopics: ["Income, Expenditure and Savings"]');
  });

  it("throws when the chapter block is missing", () => {
    expect(() => rewriteChapterSubtopics(src, "nope", [], {})).toThrow(/nope/);
  });
});
