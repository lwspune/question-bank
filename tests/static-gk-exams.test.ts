import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { STATIC_GK_SUBJECT, TARGET_OF_CODE } from "../scripts/ssc-cgl/static-gk/taxonomy";
import { checkDecisions, retagRecords, type Decisions } from "../scripts/ssc-cgl/static-gk/lib";
import { CDS_GK_PAPER, NDA_GAT_PAPER, RRB_NTPC_CBT_1 } from "../src/lib/mocks/blueprints";

type Rec = { n: number; subject?: string; chapter?: string; subtopic?: string; stem: string };

describe("Static GK for NDA, CDS and RRB NTPC", () => {
  it("has a topic for settled armed-forces facts", () => {
    expect(TARGET_OF_CODE.get("FI-D")).toEqual({
      chapter: "Firsts, Symbols and Institutions",
      subtopic: "Armed Forces: Organisation, Ranks and Institutions",
    });
  });

  it("is a subject of every GK section that holds Current Affairs", () => {
    for (const paper of [NDA_GAT_PAPER, CDS_GK_PAPER, RRB_NTPC_CBT_1]) {
      const withCa = paper.sections.filter((s) => s.subjects.includes("Current Affairs"));
      expect(withCa.length).toBeGreaterThan(0);
      for (const s of withCa) expect(s.subjects).toContain(STATIC_GK_SUBJECT);
    }
  });
});

describe("retagRecords", () => {
  const target = { chapter: "Sports and Games", subtopic: "Sportspersons and Records" };
  const recs = (): Rec[] => [
    { n: 1, subject: "History", chapter: "Modern India", subtopic: "Revolt of 1857", stem: "a" },
    { n: 2, subject: "Current Affairs", chapter: "Sports", subtopic: "Other Sports and Personalities", stem: "b" },
  ];

  it("re-files the numbered Current Affairs records and nothing else", () => {
    const r = retagRecords(recs(), "n", new Map([[2, target]]));
    expect(r.problems).toEqual([]);
    expect(r.changes).toBe(1);
    expect(r.records[1]).toMatchObject({ n: 2, subject: STATIC_GK_SUBJECT, ...target, stem: "b" });
    expect(r.records[0].subject).toBe("History");
  });

  it("is idempotent", () => {
    const once = retagRecords(recs(), "n", new Map([[2, target]])).records;
    const twice = retagRecords(once, "n", new Map([[2, target]]));
    expect(twice.problems).toEqual([]);
    expect(twice.changes).toBe(0);
  });

  it("refuses a record that is not Current Affairs, or is missing", () => {
    const r = retagRecords(recs(), "n", new Map([[1, target], [9, target]]));
    expect(r.problems.join("\n")).toMatch(/Q1: subject is "History"/);
    expect(r.problems.join("\n")).toMatch(/Q9: no such record/);
    expect(r.changes).toBe(0);
  });

  it("reads a record with no subject of its own as the paper's default", () => {
    const list = [{ n: 3, stem: "c" }] as Rec[];
    const r = retagRecords(list, "n", new Map([[3, target]]), "Current Affairs");
    expect(r.problems).toEqual([]);
    expect(r.records[0]).toMatchObject({ subject: STATIC_GK_SUBJECT, ...target });
  });
});

describe("the committed NDA/CDS/RRB decisions file", () => {
  const d = JSON.parse(readFileSync(join(__dirname, "../scripts/ssc-cgl/static-gk/decisions-gk-exams.json"), "utf8")) as Decisions & { keep: string[] };

  it("passes its own check and moves 157 questions", () => {
    expect(checkDecisions(d)).toEqual([]);
    expect(Object.keys(d.moves)).toHaveLength(157);
  });

  it("leaves the authored Current Affairs pool's rows where they are", () => {
    for (const id of ["b4e5b841", "c8e21bd0", "85f3a9c1", "6189d437"]) {
      expect(d.moves).not.toHaveProperty(id);
      expect(d.keep).toContain(id);
    }
  });
});
