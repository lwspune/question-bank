/**
 * The drill's request parsers — the API boundary, where an untrusted body stops
 * being untrusted.
 *
 * Both routes write to an append-only log that decides whether a question is
 * ever served to that student again, so "reject at the boundary before any
 * expensive operation" is not ceremony here: a malformed id would otherwise
 * reach a query, and a junk option label would reach the grader.
 */
import { describe, it, expect } from "vitest";
import { parseDrillAnswer, parseDrillComplete } from "@/lib/drill/parse";

const ID = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";
const ID2 = "9c858901-8a57-4791-81fe-4c455b099bc9";

describe("parseDrillAnswer", () => {
  it("accepts a uuid and an option label", () => {
    expect(parseDrillAnswer({ questionId: ID, label: "B" })).toEqual({
      ok: true,
      questionId: ID,
      label: "B",
    });
  });

  it("normalises the label's case and surrounding space", () => {
    // The bank stores A-D uppercase; a client sending "b" means the same thing.
    expect(parseDrillAnswer({ questionId: ID, label: " b " })).toMatchObject({
      ok: true,
      label: "B",
    });
  });

  it("rejects an id that is not a uuid", () => {
    expect(parseDrillAnswer({ questionId: "1; drop table", label: "A" }).ok).toBe(false);
  });

  it("rejects a label outside A-D", () => {
    // Not a hypothetical: an option row could be relabelled, and the grader
    // compares labels. A free-text label would simply never match and record a
    // WRONG answer the student did not give.
    for (const label of ["E", "", "AB", "1"]) {
      expect(parseDrillAnswer({ questionId: ID, label }).ok, label).toBe(false);
    }
  });

  it("rejects a body that is not an object", () => {
    for (const raw of [null, undefined, "B", 7, []]) {
      expect(parseDrillAnswer(raw).ok).toBe(false);
    }
  });

  it("rejects a missing field rather than defaulting it", () => {
    expect(parseDrillAnswer({ questionId: ID }).ok).toBe(false);
    expect(parseDrillAnswer({ label: "A" }).ok).toBe(false);
  });
});

describe("parseDrillComplete", () => {
  it("accepts the drill's question ids", () => {
    expect(parseDrillComplete({ questionIds: [ID, ID2] })).toEqual({
      ok: true,
      questionIds: [ID, ID2],
    });
  });

  it("dedupes rather than counting a question twice", () => {
    expect(parseDrillComplete({ questionIds: [ID, ID] })).toMatchObject({
      questionIds: [ID],
    });
  });

  it("rejects an empty list — a drill of nothing was not completed", () => {
    expect(parseDrillComplete({ questionIds: [] }).ok).toBe(false);
  });

  it("caps the list, so `size` cannot be inflated into the log", () => {
    // The only thing this metadata claims is how long the rep was. A caller
    // posting 10,000 ids should be refused, not recorded.
    const many = Array.from({ length: 50 }, () => ID);
    expect(parseDrillComplete({ questionIds: many }).ok).toBe(true); // deduped to 1
    const distinct = Array.from(
      { length: 50 },
      (_, i) => `3f2504e0-4f89-41d3-9a0c-0305e82c${String(i).padStart(4, "0")}`
    );
    expect(parseDrillComplete({ questionIds: distinct }).ok).toBe(false);
  });

  it("rejects a non-array", () => {
    expect(parseDrillComplete({ questionIds: ID }).ok).toBe(false);
    expect(parseDrillComplete(null).ok).toBe(false);
  });
});
