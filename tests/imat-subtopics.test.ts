/**
 * IMAT subtopics (2026-10-20): the DB subtopics come from the notes registry,
 * and every original twin is assigned to one of its own chapter's subtopics.
 */
import { describe, it, expect } from "vitest";
import { IMAT_NOTES_CHAPTERS } from "@/lib/sites/imat/notes/registry";
import { checkAssignments, subtopicPlan, type TwinRef } from "../scripts/imat/subtopicsLib";

describe("subtopicPlan", () => {
  const plan = subtopicPlan(IMAT_NOTES_CHAPTERS);

  it("has one row per notes subtopic, named as the notes page names it", () => {
    expect(plan).toHaveLength(IMAT_NOTES_CHAPTERS.reduce((n, c) => n + c.slugs.length, 0));
    const fluids = plan.filter((p) => p.chapter === "Fluids");
    expect(fluids.map((p) => p.name)).toContain("Pressure in Fluids");
  });

  it("orders each chapter's subtopics by the notes' teaching order", () => {
    for (const c of IMAT_NOTES_CHAPTERS) {
      const rows = plan.filter((p) => p.subject === c.subjectName && p.chapter === c.chapter.chapterName);
      expect(rows.map((r) => r.slug)).toEqual([...c.chapter.subtopicOrder]);
      expect(rows.map((r) => r.orderIndex)).toEqual(rows.map((_, i) => i));
    }
  });

  it("never repeats a subtopic name inside a chapter (the DB key is chapter + name)", () => {
    const keys = plan.map((p) => `${p.subject}|${p.chapter}|${p.name}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("checkAssignments", () => {
  const plan = [
    { subject: "Physics", chapter: "Fluids", slug: "flu-p", name: "Pressure", orderIndex: 0 },
    { subject: "Physics", chapter: "Fluids", slug: "flu-b", name: "Buoyancy", orderIndex: 1 },
    { subject: "Physics", chapter: "Optics", slug: "opt-l", name: "Lenses", orderIndex: 0 },
  ];
  const twins: TwinRef[] = [
    { id: "q1", subject: "Physics", chapter: "Fluids" },
    { id: "q2", subject: "Physics", chapter: "Fluids" },
  ];

  it("accepts every twin assigned once to a subtopic of its own chapter", () => {
    expect(checkAssignments(plan, twins, { q1: "flu-p", q2: "flu-b" })).toEqual([]);
  });

  it("names a twin left unassigned", () => {
    expect(checkAssignments(plan, twins, { q1: "flu-p" })).toEqual(["q2: not assigned"]);
  });

  it("refuses a subtopic from another chapter", () => {
    expect(checkAssignments(plan, twins, { q1: "flu-p", q2: "opt-l" })).toEqual([
      'q2: "opt-l" is not a subtopic of Physics / Fluids',
    ]);
  });

  it("refuses an unknown slug and an id that is not a twin", () => {
    expect(checkAssignments(plan, twins, { q1: "flu-p", q2: "nope", q9: "flu-b" })).toEqual([
      'q2: "nope" is not a subtopic of Physics / Fluids',
      "q9: not an IMAT twin",
    ]);
  });
});
