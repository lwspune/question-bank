/**
 * Pure-logic tests for the /notes preview-gate.
 * isNotesGated decides whether a viewer sees the gated (preview) version of a
 * paid chapter; splitPreview cuts the concept list into free + locked.
 */
import { describe, it, expect } from "vitest";
import { isNotesGated, splitPreview } from "@/lib/notes/access";

describe("notes/access isNotesGated", () => {
  it("free chapters are never gated", () => {
    expect(isNotesGated({ tier: "free", isMember: false, hasAccess: false })).toBe(false);
    expect(isNotesGated({ tier: undefined, isMember: false, hasAccess: false })).toBe(false);
  });

  it("paid + org member (staff) is not gated", () => {
    expect(isNotesGated({ tier: "paid", isMember: true, hasAccess: false })).toBe(false);
  });

  it("paid + entitled student is not gated", () => {
    expect(isNotesGated({ tier: "paid", isMember: false, hasAccess: true })).toBe(false);
  });

  it("paid + anon / no access is gated", () => {
    expect(isNotesGated({ tier: "paid", isMember: false, hasAccess: false })).toBe(true);
  });
});

describe("notes/access splitPreview", () => {
  const items = ["a", "b", "c", "d", "e"];

  it("splits into the first N free + the rest locked", () => {
    expect(splitPreview(items, 2)).toEqual({
      preview: ["a", "b"],
      locked: ["c", "d", "e"],
    });
  });

  it("count 0 locks everything", () => {
    expect(splitPreview(items, 0)).toEqual({ preview: [], locked: items });
  });

  it("count >= length leaves nothing locked", () => {
    expect(splitPreview(items, 5)).toEqual({ preview: items, locked: [] });
    expect(splitPreview(items, 99)).toEqual({ preview: items, locked: [] });
  });

  it("negative count is treated as 0", () => {
    expect(splitPreview(items, -3)).toEqual({ preview: [], locked: items });
  });

  it("handles an empty list", () => {
    expect(splitPreview([], 2)).toEqual({ preview: [], locked: [] });
  });
});
