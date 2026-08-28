/**
 * Pure helpers for batch invites (migration 0084). No I/O.
 *
 * The email parser is the load-bearing piece: a teacher pastes a whole class
 * list in whatever shape their spreadsheet produced, and every address that
 * survives becomes a stored invite. Normalisation has to be exactly the
 * lowercase form the DB CHECK enforces, or the invite is stored and then
 * matched by nothing at accept time — sent-looking and permanently pending.
 */
import { describe, it, expect } from "vitest";
import {
  MAX_INVITES_PER_REQUEST,
  parseInviteEmails,
  inviteState,
} from "@/lib/batches/invites";

describe("parseInviteEmails", () => {
  it("splits on newlines, commas and semicolons", () => {
    const r = parseInviteEmails("a@x.com\nb@x.com, c@x.com; d@x.com");
    expect(r.valid).toEqual(["a@x.com", "b@x.com", "c@x.com", "d@x.com"]);
    expect(r.invalid).toEqual([]);
  });

  it("lowercases — the DB CHECK requires it and accept matches on it", () => {
    expect(parseInviteEmails("Sam.Patel@Example.COM").valid).toEqual([
      "sam.patel@example.com",
    ]);
  });

  it("trims surrounding whitespace and stray quotes from spreadsheet paste", () => {
    const r = parseInviteEmails('  "a@x.com"  \n\t<b@x.com>\n');
    expect(r.valid).toEqual(["a@x.com", "b@x.com"]);
  });

  it("dedupes case-insensitively, keeping first-seen order", () => {
    const r = parseInviteEmails("b@x.com\nA@x.com\na@X.com\nb@x.com");
    expect(r.valid).toEqual(["b@x.com", "a@x.com"]);
  });

  it("reports invalid entries AS TYPED so the teacher can spot the typo", () => {
    const r = parseInviteEmails("good@x.com\nnot-an-email\nalso bad@\n");
    expect(r.valid).toEqual(["good@x.com"]);
    expect(r.invalid).toEqual(["not-an-email", "also bad@"]);
  });

  it("ignores blank lines and a trailing separator", () => {
    const r = parseInviteEmails("a@x.com,\n\n  \nb@x.com\n");
    expect(r.valid).toEqual(["a@x.com", "b@x.com"]);
    expect(r.invalid).toEqual([]);
  });

  it("caps the batch so one paste cannot fan out unbounded email", () => {
    const many = Array.from({ length: MAX_INVITES_PER_REQUEST + 20 }, (_, i) => `u${i}@x.com`);
    const r = parseInviteEmails(many.join("\n"));
    expect(r.valid).toHaveLength(MAX_INVITES_PER_REQUEST);
    expect(r.overflow).toBe(20);
  });

  it("returns nothing for empty input rather than throwing", () => {
    expect(parseInviteEmails("")).toEqual({ valid: [], invalid: [], overflow: 0 });
    expect(parseInviteEmails("   \n  ")).toEqual({ valid: [], invalid: [], overflow: 0 });
  });
});

describe("inviteState", () => {
  const now = Date.parse("2026-08-28T00:00:00Z");
  const future = "2026-09-20T00:00:00Z";
  const past = "2026-08-01T00:00:00Z";

  it("a pending invite inside its window is pending", () => {
    expect(inviteState({ status: "pending", expiresAt: future }, now)).toBe("pending");
  });

  it("a pending invite past its expiry reads as EXPIRED — the DB does not compute this", () => {
    expect(inviteState({ status: "pending", expiresAt: past }, now)).toBe("expired");
  });

  it("a resolved invite keeps its status even past expiry", () => {
    // Otherwise an accepted invite would start reporting as expired and the
    // teacher's list would contradict the roster it produced.
    expect(inviteState({ status: "accepted", expiresAt: past }, now)).toBe("accepted");
    expect(inviteState({ status: "declined", expiresAt: past }, now)).toBe("declined");
    expect(inviteState({ status: "revoked", expiresAt: past }, now)).toBe("revoked");
  });
});
