import { describe, it, expect } from "vitest";
import {
  addToBatch,
  parsePracticeBatch,
  PRACTICE_BATCH_MAX,
  PRACTICE_SURFACES,
  DEFAULT_PRACTICE_SURFACE,
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
    expect(r).toEqual({ ok: true, ids: [uuid(1), uuid(2)], surface: "bank" });
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

describe("parsePracticeBatch — which SURFACE the reveal happened on", () => {
  // A reveal in a /guide worked example and a reveal on /browse are the same
  // ACT but different products. Recording them under one indistinguishable kind
  // is what made "do guides contribute to retention?" unanswerable in the first
  // place, so the surface is part of the contract, not a nice-to-have.

  it("defaults to the bank when the field is absent", () => {
    // Load-bearing for DEPLOY, not for tidiness: a tab opened before this
    // shipped still sendBeacon()s the old {questionIds} body on page-hide, and
    // that reveal genuinely was a bank reveal. Rejecting it would throw away
    // real practice from every open session at the moment of deploy.
    const r = parsePracticeBatch({ questionIds: [uuid(1)] });
    expect(r.ok && r.surface).toBe(DEFAULT_PRACTICE_SURFACE);
    expect(DEFAULT_PRACTICE_SURFACE).toBe("bank");
  });

  it("accepts every surface on the allowlist", () => {
    for (const surface of PRACTICE_SURFACES) {
      const r = parsePracticeBatch({ questionIds: [uuid(1)], surface });
      expect(r.ok && r.surface, surface).toBe(surface);
    }
  });

  it("carries the guide surface through, since that is the whole point", () => {
    const r = parsePracticeBatch({ questionIds: [uuid(1)], surface: "guide" });
    expect(r).toEqual({ ok: true, ids: [uuid(1)], surface: "guide" });
  });

  it("REJECTS an unknown surface rather than falling back to the bank", () => {
    // A silent fallback would file guide reveals as bank reveals — the exact
    // mislabelling this field exists to prevent, and invisible from both ends.
    for (const bad of ["blog", "notes", "BANK", "", 42, null, {}]) {
      const r = parsePracticeBatch({ questionIds: [uuid(1)], surface: bad });
      expect(r.ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("still validates the ids when a surface is supplied", () => {
    expect(parsePracticeBatch({ questionIds: ["nope"], surface: "guide" }).ok).toBe(false);
    expect(parsePracticeBatch({ questionIds: [], surface: "guide" }).ok).toBe(false);
  });

  it("keeps the surface list closed — it is written into metadata and queried by name", () => {
    expect(PRACTICE_SURFACES).toEqual(["bank", "guide"]);
  });
});
