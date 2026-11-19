import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { STATIC_GK, STATIC_GK_SUBJECT, TARGET_OF_CODE } from "../scripts/ssc-cgl/static-gk/taxonomy";
import { addStaticGkToCatalog, checkDecisions, resolveMoves, retagBlocks, type Decisions } from "../scripts/ssc-cgl/static-gk/lib";
import { SECTION_SUBJECTS, CHSL_LAYOUT, CPO_LAYOUT, LAYOUTS } from "../scripts/ssc-cgl/config";
import { SSC_CGL_T1_PAPER } from "../src/lib/mocks/blueprints";

const block = (n: number, head: string) =>
  `=== ${n}\n${head}\ndifficulty: EASY\nanswer: B\nstem:\nQuestion ${n}?\nA: 1\nB: 2\nC: 3\nD: 4\nsolution:\nBecause.\n`;
const CA = (chapter: string, subtopic: string) => `subject: Current Affairs\nchapter: ${chapter}\nsubtopic: ${subtopic}`;

describe("Static GK taxonomy", () => {
  it("gives every subtopic a unique code and a unique name within its chapter", () => {
    const codes = STATIC_GK.flatMap((c) => c.subtopics.map((s) => s.code));
    expect(new Set(codes).size).toBe(codes.length);
    for (const c of STATIC_GK) {
      const names = c.subtopics.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    }
    expect(TARGET_OF_CODE.get("AC-D")).toEqual({ chapter: "Art and Culture", subtopic: "Classical and Folk Dances" });
  });

  it("is a General Awareness subject in every SSC paper layout and the mock blueprint", () => {
    expect(SECTION_SUBJECTS.B).toContain(STATIC_GK_SUBJECT);
    expect(LAYOUTS[2].find((s) => s.part === "D")!.subjects).toContain(STATIC_GK_SUBJECT);
    expect(CHSL_LAYOUT.find((s) => s.part === "D")!.subjects).toContain(STATIC_GK_SUBJECT);
    expect(CPO_LAYOUT.find((s) => s.part === "B")!.subjects).toContain(STATIC_GK_SUBJECT);
    expect(SSC_CGL_T1_PAPER.sections.find((s) => s.key === "general-awareness")!.subjects).toContain(STATIC_GK_SUBJECT);
  });
});

describe("checkDecisions", () => {
  it("accepts known codes and distinct prefixes", () => {
    expect(checkDecisions({ moves: { aaaa1111: "AC-D", bbbb2222: "SP-T" } })).toEqual([]);
  });

  it("names an unknown code and a prefix that contains another", () => {
    const problems = checkDecisions({ moves: { aaaa1111: "XX-1", aaaa: "AC-D" } });
    expect(problems.join("\n")).toMatch(/unknown code "XX-1"/);
    expect(problems.join("\n")).toMatch(/aaaa.*aaaa1111/);
  });
});

describe("resolveMoves", () => {
  const rows = [
    { id: "aaaa1111-0000", subject: "Current Affairs" },
    { id: "bbbb2222-0000", subject: "Current Affairs" },
    { id: "cccc3333-0000", subject: "Current Affairs" },
  ];
  const d: Decisions = { moves: { aaaa1111: "AC-D", bbbb2222: "SP-T" } };

  it("maps each decided row to its target and leaves the rest", () => {
    const r = resolveMoves(rows, d);
    expect(r.problems).toEqual([]);
    expect(r.moves).toEqual([
      { id: "aaaa1111-0000", code: "AC-D", chapter: "Art and Culture", subtopic: "Classical and Folk Dances" },
      { id: "bbbb2222-0000", code: "SP-T", chapter: "Sports and Games", subtopic: "Sports Terms, Rules and Equipment" },
    ]);
  });

  it("refuses a prefix that matches no row, or more than one", () => {
    const r = resolveMoves([...rows, { id: "aaaa1111-9999", subject: "Current Affairs" }], { moves: { aaaa1111: "AC-D", dddd4444: "BA" } });
    expect(r.problems.join("\n")).toMatch(/aaaa1111 matches 2 rows/);
    expect(r.problems.join("\n")).toMatch(/dddd4444 matches no row/);
  });

  it("treats a row already in Static GK as done, so a second run moves nothing", () => {
    const r = resolveMoves([{ id: "aaaa1111-0000", subject: STATIC_GK_SUBJECT }, rows[1], rows[2]], d);
    expect(r.problems).toEqual([]);
    expect(r.moves.map((m) => m.id)).toEqual(["bbbb2222-0000"]);
    expect(r.alreadyMoved).toBe(1);
  });
});

describe("retagBlocks", () => {
  const text = [block(1, "subject: Reasoning\nchapter: Analogy\nsubtopic: Word Analogy"), block(2, CA("Sports", "Tennis")), block(3, CA("Sports", "Tennis"))].join("\n");
  const target = { chapter: "Sports and Games", subtopic: "Sports Terms, Rules and Equipment" };

  it("rewrites subject, chapter and subtopic of the named blocks only", () => {
    const r = retagBlocks(text, new Map([[2, target]]));
    expect(r.problems).toEqual([]);
    expect(r.changes).toBe(1);
    expect(r.text).toContain(`=== 2\nsubject: Static GK\nchapter: Sports and Games\nsubtopic: Sports Terms, Rules and Equipment\n`);
    expect(r.text).toContain(`=== 3\n${CA("Sports", "Tennis")}\n`);
    expect(r.text).toContain("=== 1\nsubject: Reasoning\n");
  });

  it("is idempotent: a block already moved is no change and no problem", () => {
    const once = retagBlocks(text, new Map([[2, target]])).text;
    const twice = retagBlocks(once, new Map([[2, target]]));
    expect(twice.problems).toEqual([]);
    expect(twice.changes).toBe(0);
    expect(twice.text).toBe(once);
  });

  it("keeps CRLF line endings", () => {
    const r = retagBlocks(text.replace(/\n/g, "\r\n"), new Map([[2, target]]));
    expect(r.text).toContain("=== 2\r\nsubject: Static GK\r\nchapter: Sports and Games\r\n");
  });

  it("refuses a block that is not Current Affairs, or that is missing", () => {
    const r = retagBlocks(text, new Map([[1, target], [9, target]]));
    expect(r.problems.join("\n")).toMatch(/Q1: subject is "Reasoning"/);
    expect(r.problems.join("\n")).toMatch(/Q9: no such block/);
    expect(r.changes).toBe(0);
  });
});

describe("addStaticGkToCatalog", () => {
  it("adds the subject to both catalog files once, in taxonomy order", () => {
    type Ch = { chapter: string; subtopics: string[] };
    const catalog: Record<string, Ch[]> = { History: [{ chapter: "Modern India", subtopics: ["Revolt of 1857"] }] };
    const authored: { _comment: string; subjects: Record<string, Ch[]>; rename: Record<string, string>; add: Record<string, Ch[]> } = { _comment: "x", subjects: {}, rename: {}, add: {} };
    const r = addStaticGkToCatalog(catalog, authored);
    expect(r.added).toBe(true);
    const want = STATIC_GK.map((c) => ({ chapter: c.chapter, subtopics: c.subtopics.map((s) => s.name) }));
    expect(r.catalog[STATIC_GK_SUBJECT]).toEqual(want);
    expect(r.authored.subjects[STATIC_GK_SUBJECT]).toEqual(want);
    expect(catalog).not.toHaveProperty(STATIC_GK_SUBJECT);
    expect(addStaticGkToCatalog(r.catalog, r.authored).added).toBe(false);
  });
});

describe("the committed decisions file", () => {
  it("passes its own check", () => {
    const d = JSON.parse(readFileSync(join(__dirname, "../scripts/ssc-cgl/static-gk/decisions.json"), "utf8")) as Decisions;
    expect(checkDecisions(d)).toEqual([]);
    expect(Object.keys(d.moves).length).toBeGreaterThan(900);
  });
});

describe("the SSC CGL General Awareness ebook", () => {
  it("reads the Static GK plan, with every Static GK chapter pinned in taxonomy order", async () => {
    const { REPEATS_EBOOKS } = await import("../src/lib/ebooks/paperBooks");
    const ga = REPEATS_EBOOKS.find((b) => b.slug === "ssc-cgl-general-awareness-repeated-pyqs")!;
    expect(ga.planSubjects).toContain(STATIC_GK_SUBJECT);
    expect(ga.chapterOrder?.[STATIC_GK_SUBJECT]).toEqual(STATIC_GK.map((c) => c.chapter));
  });
});
