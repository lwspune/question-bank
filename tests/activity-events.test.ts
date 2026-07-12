import { describe, it, expect } from "vitest";
import {
  ACTIVITY_KINDS,
  isActivityKind,
  sanitizeActivityEvent,
  buildActivityRow,
  type ActivityEvent,
} from "@/lib/activity/events";

describe("isActivityKind / ACTIVITY_KINDS", () => {
  it("accepts every registered kind and rejects everything else", () => {
    for (const k of ACTIVITY_KINDS) expect(isActivityKind(k)).toBe(true);
    expect(isActivityKind("mock_submitted")).toBe(true);
    expect(isActivityKind("answer_wrong")).toBe(true);
    expect(isActivityKind("logged_in_3_days")).toBe(false); // no vanity kinds
    expect(isActivityKind("")).toBe(false);
    expect(isActivityKind(null)).toBe(false);
    expect(isActivityKind(undefined)).toBe(false);
    expect(isActivityKind(7 as unknown)).toBe(false);
  });
});

describe("sanitizeActivityEvent", () => {
  it("accepts a minimal valid event (kind only)", () => {
    const r = sanitizeActivityEvent({ kind: "question_bookmarked" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.kind).toBe("question_bookmarked");
      expect(r.value.refId).toBeUndefined();
      expect(r.value.metadata).toBeUndefined();
    }
  });

  it("keeps refId, refKind and a small metadata object", () => {
    const r = sanitizeActivityEvent({
      kind: "mock_submitted",
      refId: "attempt-123",
      refKind: "mock_attempt",
      metadata: { score: 42, maxScore: 300 },
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.refId).toBe("attempt-123");
      expect(r.value.refKind).toBe("mock_attempt");
      expect(r.value.metadata).toEqual({ score: 42, maxScore: 300 });
    }
  });

  it("rejects an unknown kind", () => {
    const r = sanitizeActivityEvent({ kind: "earned_100_xp" });
    expect(r.ok).toBe(false);
  });

  it("rejects a non-object / missing kind", () => {
    expect(sanitizeActivityEvent(null).ok).toBe(false);
    expect(sanitizeActivityEvent("mock_submitted").ok).toBe(false);
    expect(sanitizeActivityEvent({}).ok).toBe(false);
  });

  it("rejects an over-long refId", () => {
    const r = sanitizeActivityEvent({ kind: "answer_wrong", refId: "x".repeat(300) });
    expect(r.ok).toBe(false);
  });

  it("rejects non-string refId / refKind", () => {
    expect(sanitizeActivityEvent({ kind: "answer_wrong", refId: 5 }).ok).toBe(false);
    expect(sanitizeActivityEvent({ kind: "answer_wrong", refKind: {} }).ok).toBe(false);
  });

  it("rejects a metadata blob that is not a plain object", () => {
    expect(sanitizeActivityEvent({ kind: "mock_submitted", metadata: [1, 2] }).ok).toBe(false);
    expect(sanitizeActivityEvent({ kind: "mock_submitted", metadata: "big" }).ok).toBe(false);
  });

  it("rejects an oversized metadata object (bounded payload)", () => {
    const huge: Record<string, string> = {};
    for (let i = 0; i < 60; i++) huge[`k${i}`] = "v";
    expect(sanitizeActivityEvent({ kind: "mock_submitted", metadata: huge }).ok).toBe(false);
  });
});

describe("buildActivityRow", () => {
  const nowIso = "2026-07-12T10:00:00.000Z";

  it("maps a semantic event to DB columns for the acting user", () => {
    const ev: ActivityEvent = {
      kind: "chapter_mastered",
      refId: "vectors",
      refKind: "notes_subtopic",
      metadata: { subjectRoute: "nda-maths" },
    };
    const row = buildActivityRow("user-1", ev, nowIso);
    expect(row).toEqual({
      user_id: "user-1",
      kind: "chapter_mastered",
      ref_id: "vectors",
      ref_kind: "notes_subtopic",
      metadata: { subjectRoute: "nda-maths" },
      created_at: nowIso,
    });
  });

  it("omits null-y optional columns and defaults metadata to {}", () => {
    const row = buildActivityRow("user-2", { kind: "question_bookmarked" }, nowIso);
    expect(row.ref_id).toBeNull();
    expect(row.ref_kind).toBeNull();
    expect(row.metadata).toEqual({});
    expect(row.dedupe_key).toBeUndefined();
  });

  it("passes a dedupe_key through for idempotent backfill", () => {
    const row = buildActivityRow(
      "user-3",
      { kind: "mock_submitted", refId: "a1", dedupeKey: "mock_submitted:a1" },
      nowIso
    );
    expect(row.dedupe_key).toBe("mock_submitted:a1");
  });
});
