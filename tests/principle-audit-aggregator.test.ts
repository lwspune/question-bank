import { describe, expect, it } from "vitest";
import {
  aggregateAudit,
  type QuestionRecord,
} from "@/lib/tags/principleAuditAggregator";

const rec = (
  id: string,
  chapter: string,
  subtopic: string,
  difficulty: "EASY" | "MODERATE" | "HARD" = "MODERATE"
): QuestionRecord => ({ id, chapter, subtopic, difficulty });

describe("aggregateAudit", () => {
  it("empty candidates → zero spread, empty arrays", () => {
    const result = aggregateAudit([], [], []);
    expect(result).toEqual({
      totalCandidates: 0,
      chapterSpread: 0,
      byChapter: [],
      alreadyTagged: [],
      pendingTagged: [],
      unresolvedIds: [],
    });
  });

  it("single chapter → chapterSpread = 1, one byChapter entry", () => {
    const candidates = ["q1", "q2"];
    const records = [
      rec("q1", "Limits & Continuity", "Continuity"),
      rec("q2", "Limits & Continuity", "Continuity"),
    ];
    const result = aggregateAudit(candidates, records, []);
    expect(result.chapterSpread).toBe(1);
    expect(result.byChapter).toHaveLength(1);
    expect(result.byChapter[0]).toMatchObject({
      chapter: "Limits & Continuity",
      total: 2,
    });
  });

  it("multi-chapter → chapterSpread reflects distinct chapters", () => {
    const candidates = ["q1", "q2", "q3"];
    const records = [
      rec("q1", "Differentiation", "Piecewise"),
      rec("q2", "Limits & Continuity", "Continuity"),
      rec("q3", "Differentiation", "Piecewise"),
    ];
    const result = aggregateAudit(candidates, records, []);
    expect(result.chapterSpread).toBe(2);
  });

  it("byChapter sorted by total descending", () => {
    const candidates = ["q1", "q2", "q3"];
    const records = [
      rec("q1", "Small Chapter", "A"),
      rec("q2", "Big Chapter", "X"),
      rec("q3", "Big Chapter", "Y"),
    ];
    const result = aggregateAudit(candidates, records, []);
    expect(result.byChapter.map((c) => c.chapter)).toEqual([
      "Big Chapter",
      "Small Chapter",
    ]);
  });

  it("subtopics within a chapter sorted by count descending", () => {
    const candidates = ["q1", "q2", "q3", "q4"];
    const records = [
      rec("q1", "Diff", "Rare"),
      rec("q2", "Diff", "Common"),
      rec("q3", "Diff", "Common"),
      rec("q4", "Diff", "Common"),
    ];
    const result = aggregateAudit(candidates, records, []);
    const subs = result.byChapter[0].subtopics;
    expect(subs.map((s) => s.subtopic)).toEqual(["Common", "Rare"]);
    expect(subs[0].count).toBe(3);
    expect(subs[1].count).toBe(1);
  });

  it("alphabetical tiebreaker when chapter totals equal", () => {
    const candidates = ["q1", "q2"];
    const records = [
      rec("q1", "Zebra Chapter", "A"),
      rec("q2", "Apple Chapter", "B"),
    ];
    const result = aggregateAudit(candidates, records, []);
    expect(result.byChapter.map((c) => c.chapter)).toEqual([
      "Apple Chapter",
      "Zebra Chapter",
    ]);
  });

  it("already-tagged IDs flagged separately, removed from pending", () => {
    const candidates = ["q1", "q2", "q3"];
    const records = [
      rec("q1", "C1", "S1"),
      rec("q2", "C1", "S1"),
      rec("q3", "C1", "S1"),
    ];
    const result = aggregateAudit(candidates, records, ["q2"]);
    expect(result.alreadyTagged).toEqual(["q2"]);
    expect(result.pendingTagged.sort()).toEqual(["q1", "q3"]);
  });

  it("unresolved candidate UUIDs (not in records) surfaced separately", () => {
    const candidates = ["q1", "q-missing", "q2"];
    const records = [rec("q1", "C1", "S1"), rec("q2", "C1", "S1")];
    const result = aggregateAudit(candidates, records, []);
    expect(result.unresolvedIds).toEqual(["q-missing"]);
    expect(result.totalCandidates).toBe(3);
    expect(result.byChapter[0].total).toBe(2);
  });

  it("question ids inside subtopic entries match the candidate list and are sorted", () => {
    const candidates = ["q-bravo", "q-alpha", "q-charlie"];
    const records = [
      rec("q-bravo", "C", "S"),
      rec("q-alpha", "C", "S"),
      rec("q-charlie", "C", "S"),
    ];
    const result = aggregateAudit(candidates, records, []);
    expect(result.byChapter[0].subtopics[0].ids).toEqual([
      "q-alpha",
      "q-bravo",
      "q-charlie",
    ]);
  });

  it("duplicate candidate UUIDs counted once (defensive against caller mistake)", () => {
    const candidates = ["q1", "q1", "q2"];
    const records = [rec("q1", "C1", "S1"), rec("q2", "C1", "S1")];
    const result = aggregateAudit(candidates, records, []);
    expect(result.totalCandidates).toBe(2);
    expect(result.byChapter[0].total).toBe(2);
  });

  it("alreadyTagged uuids not in candidate list are ignored (no false-positive flag)", () => {
    const candidates = ["q1"];
    const records = [rec("q1", "C1", "S1")];
    // q-other is tagged in DB but wasn't proposed → don't surface
    const result = aggregateAudit(candidates, records, ["q-other"]);
    expect(result.alreadyTagged).toEqual([]);
    expect(result.pendingTagged).toEqual(["q1"]);
  });
});
