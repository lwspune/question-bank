import { describe, it, expect } from "vitest";
import {
  COMP_SCOPE_OPTIONS,
  compExpiryIso,
  activeGrants,
  isPaidGrant,
} from "@/lib/entitlements/compGrant";
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const NOW = Date.parse("2026-09-27T10:00:00Z");

describe("COMP_SCOPE_OPTIONS", () => {
  // The dialog offers only scopes something in code enforces; `all` first because
  // it is the default a one-click comp should reach for.
  it("offers all, mocks, practice, teacher — all first", () => {
    // The IMAT and MCAT passes (2026-10-30) and the Practice Pass (2026-11-03) can be comped like the www pass.
    expect(COMP_SCOPE_OPTIONS.map((o) => o.value)).toEqual([SCOPE_ALL, SCOPE_MOCKS, "practice", SCOPE_TEACHER, "imat", "mcat"]);
  });
});

describe("compExpiryIso", () => {
  it("blank means no expiry", () => {
    expect(compExpiryIso("")).toBeNull();
    expect(compExpiryIso("   ")).toBeNull();
  });
  // End of the chosen day, so the grant covers the date the admin picked —
  // same convention as /dashboard/entitlements.
  it("turns a yyyy-mm-dd into end-of-day UTC", () => {
    expect(compExpiryIso("2027-03-31")).toBe("2027-03-31T23:59:59.000Z");
  });
  it("returns null for a malformed date rather than throwing", () => {
    expect(compExpiryIso("31/03/2027")).toBeNull();
  });
});

describe("activeGrants", () => {
  const row = (over: Partial<Record<string, unknown>>) => ({
    id: "g1",
    scope: SCOPE_ALL,
    source: "comp",
    status: "active",
    expires_at: null,
    ...over,
  });

  it("keeps active rows and maps to camelCase", () => {
    expect(activeGrants([row({})], NOW)).toEqual([
      { id: "g1", scope: SCOPE_ALL, source: "comp", expiresAt: null },
    ]);
  });
  // The DB query filters status='active' but not expiry, so an expired row
  // arrives here and must not read as premium (nor offer a Revoke).
  it("drops expired and non-active rows", () => {
    const rows = [
      row({ id: "old", expires_at: "2026-09-01T00:00:00Z" }),
      row({ id: "rev", status: "revoked" }),
      row({ id: "ok", expires_at: "2027-01-01T00:00:00Z" }),
    ];
    expect(activeGrants(rows, NOW).map((g) => g.id)).toEqual(["ok"]);
  });
  // No-expiry grants first: they are the ones that matter most for "is premium".
  it("orders open-ended grants before dated ones, dated by soonest expiry", () => {
    const rows = [
      row({ id: "late", expires_at: "2027-06-01T00:00:00Z" }),
      row({ id: "open", expires_at: null }),
      row({ id: "soon", expires_at: "2026-12-01T00:00:00Z" }),
    ];
    expect(activeGrants(rows, NOW).map((g) => g.id)).toEqual(["open", "soon", "late"]);
  });
});

// Every active grant can be revoked from the profile (as on /dashboard/entitlements);
// a paid one gets a stronger confirm, because revoking does not refund the payment.
describe("isPaidGrant", () => {
  it("is true for a Razorpay pass", () => {
    expect(isPaidGrant({ source: "razorpay" })).toBe(true);
  });
  it("is false for comp and manual grants", () => {
    expect(isPaidGrant({ source: "comp" })).toBe(false);
    expect(isPaidGrant({ source: "manual" })).toBe(false);
  });
});
