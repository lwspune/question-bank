import { describe, it, expect } from "vitest";
import {
  addToBatch,
  parsePracticeBatch,
  PRACTICE_BATCH_MAX,
} from "@/lib/questions/practiceBatch";

const uuid = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

describe("addToBatch — client-side queue", () => {
  it("adds a new id", () => {
    expect(addToBatch([], uuid(1))).toEqual([uuid(1)]);
  });

  it("DEDUPES — re-revealing the same question is not a second practice event", () => {
    const b = addToBatch([uuid(1)], uuid(1));
    expect(b).toEqual([uuid(1)]);
  });

  it("caps the queue so a long session cannot grow it without bound", () => {
    let b: string[] = [];
    for (let i = 0; i < PRACTICE_BATCH_MAX + 20; i += 1) b = addToBatch(b, uuid(i));
    expect(b).toHaveLength(PRACTICE_BATCH_MAX);
  });

  it("drops the OLDEST when full, so the most recent work always survives a flush", () => {
    let b: string[] = [];
    for (let i = 0; i < PRACTICE_BATCH_MAX; i += 1) b = addToBatch(b, uuid(i));
    b = addToBatch(b, uuid(999));
    expect(b).toContain(uuid(999));
    expect(b).not.toContain(uuid(0));
    expect(b).toHaveLength(PRACTICE_BATCH_MAX);
  });

  it("never mutates the queue it was handed", () => {
    const original = [uuid(1)];
    addToBatch(original, uuid(2));
    expect(original).toEqual([uuid(1)]);
  });
});

describe("parsePracticeBatch — untrusted request body", () => {
  it("accepts a clean batch", () => {
    const r = parsePracticeBatch({ questionIds: [uuid(1), uuid(2)] });
    expect(r).toEqual({ ok: true, ids: [uuid(1), uuid(2)] });
  });

  it("dedupes server-side too — the client is not trusted to have done it", () => {
    const r = parsePracticeBatch({ questionIds: [uuid(1), uuid(1), uuid(2)] });
    expect(r.ok && r.ids).toEqual([uuid(1), uuid(2)]);
  });

  it("rejects anything that is not an array of ids", () => {
    for (const bad of [null, undefined, 42, "abc", {}, { questionIds: "x" }, { questionIds: {} }]) {
      expect(parsePracticeBatch(bad).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("rejects an empty batch — there is nothing to record", () => {
    expect(parsePracticeBatch({ questionIds: [] }).ok).toBe(false);
  });

  it("rejects ids that are not uuids, rather than writing junk refs", () => {
    expect(parsePracticeBatch({ questionIds: ["../../etc/passwd"] }).ok).toBe(false);
    expect(parsePracticeBatch({ questionIds: [uuid(1), "not-a-uuid"] }).ok).toBe(false);
  });

  it("rejects an oversized batch instead of silently truncating it", () => {
    const ids = Array.from({ length: PRACTICE_BATCH_MAX + 1 }, (_, i) => uuid(i));
    const r = parsePracticeBatch({ questionIds: ids });
    expect(r.ok).toBe(false);
    // Truncating would make the client's view and ours disagree without either
    // side knowing; a 400 tells the caller its batch was wrong.
    if (!r.ok) expect(r.error).toMatch(/too many|batch/i);
  });

  it("accepts a batch of exactly the maximum", () => {
    const ids = Array.from({ length: PRACTICE_BATCH_MAX }, (_, i) => uuid(i));
    expect(parsePracticeBatch({ questionIds: ids }).ok).toBe(true);
  });

  it("normalises uuid case so the same question cannot arrive twice", () => {
    const r = parsePracticeBatch({ questionIds: [uuid(1).toUpperCase(), uuid(1)] });
    expect(r.ok && r.ids).toEqual([uuid(1)]);
  });
});
