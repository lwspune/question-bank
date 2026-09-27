import { describe, it, expect } from "vitest";
import {
  COMP_SCOPE_OPTIONS,
  compExpiryIso,
  activeGrants,
  canRevokeFromProfile,
} from "@/lib/entitlements/compGrant";
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const NOW = Date.parse("2026-09-27T10:00:00Z");

describe("COMP_SCOPE_OPTIONS", () => {
  // The dialog offers only scopes something in code enforces; `all` first because
  // it is the default a one-click comp should reach for.
  it("offers all, mocks, teacher — all first", () => {
    expect(COMP_SCOPE_OPTIONS.map((o) => o.value)).toEqual([SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER]);
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

describe("canRevokeFromProfile", () => {
  it("allows revoking comp and manual grants", () => {
    expect(canRevokeFromProfile({ source: "comp" })).toBe(true);
    expect(canRevokeFromProfile({ source: "manual" })).toBe(true);
  });
  // A paid pass is ended by a refund (refund.processed revokes it), not by a
  // one-click button on the profile page.
  it("does not offer revoke on a paid grant", () => {
    expect(canRevokeFromProfile({ source: "razorpay" })).toBe(false);
  });
});
