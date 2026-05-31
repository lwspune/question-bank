/**
 * Pure-logic tests for entitlement access evaluation.
 * The DB read path (loadEntitlements / userHasAccess) is exercised against a
 * live project elsewhere; these cover the time/status/scope rules in isolation.
 */
import { describe, it, expect } from "vitest";
import {
  isEntitlementActive,
  hasActiveScope,
  type Entitlement,
} from "@/lib/entitlements/access";

const NOW = Date.UTC(2026, 4, 31); // 2026-05-31
const FUTURE = new Date(Date.UTC(2026, 11, 31)).toISOString();
const PAST = new Date(Date.UTC(2026, 0, 1)).toISOString();

function row(overrides: Partial<Entitlement> = {}): Entitlement {
  return {
    id: "e1",
    userId: "u1",
    scope: "all",
    source: "manual",
    status: "active",
    grantedAt: PAST,
    expiresAt: null,
    providerRef: null,
    note: null,
    grantedBy: null,
    ...overrides,
  };
}

describe("entitlements/access", () => {
  describe("isEntitlementActive", () => {
    it("active + no expiry → true (lifetime/comp-till-revoked)", () => {
      expect(isEntitlementActive(row({ expiresAt: null }), NOW)).toBe(true);
    });

    it("active + future expiry → true", () => {
      expect(isEntitlementActive(row({ expiresAt: FUTURE }), NOW)).toBe(true);
    });

    it("active + past expiry → false", () => {
      expect(isEntitlementActive(row({ expiresAt: PAST }), NOW)).toBe(false);
    });

    it("non-active status → false regardless of expiry", () => {
      expect(isEntitlementActive(row({ status: "revoked" }), NOW)).toBe(false);
      expect(isEntitlementActive(row({ status: "cancelled" }), NOW)).toBe(false);
      expect(isEntitlementActive(row({ status: "expired" }), NOW)).toBe(false);
      expect(
        isEntitlementActive(row({ status: "revoked", expiresAt: FUTURE }), NOW)
      ).toBe(false);
    });
  });

  describe("hasActiveScope", () => {
    it("returns false on an empty list", () => {
      expect(hasActiveScope([], "all", NOW)).toBe(false);
    });

    it("an active 'all' grant unlocks any requested scope", () => {
      const rows = [row({ scope: "all" })];
      expect(hasActiveScope(rows, "all", NOW)).toBe(true);
      expect(hasActiveScope(rows, "nda-physics-advanced", NOW)).toBe(true);
    });

    it("a per-scope grant unlocks only that scope", () => {
      const rows = [row({ scope: "nda-physics-advanced" })];
      expect(hasActiveScope(rows, "nda-physics-advanced", NOW)).toBe(true);
      expect(hasActiveScope(rows, "nda-maths-advanced", NOW)).toBe(false);
      // ...but not the global flag
      expect(hasActiveScope(rows, "all", NOW)).toBe(false);
    });

    it("ignores expired/revoked rows", () => {
      const rows = [
        row({ scope: "all", status: "revoked" }),
        row({ scope: "all", expiresAt: PAST }),
      ];
      expect(hasActiveScope(rows, "all", NOW)).toBe(false);
    });

    it("any one active row is enough", () => {
      const rows = [
        row({ scope: "all", status: "revoked" }),
        row({ scope: "all", expiresAt: FUTURE }),
      ];
      expect(hasActiveScope(rows, "all", NOW)).toBe(true);
    });
  });
});
