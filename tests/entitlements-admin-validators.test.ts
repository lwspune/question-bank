/**
 * Pure-helper tests for the entitlement admin module.
 * The live grant/list/revoke paths use the service-role client and are smoke-
 * tested via the route; only the pure validator is unit-tested here.
 */
import { describe, it, expect } from "vitest";
import { validateGrant } from "@/lib/entitlements/admin";
import { GRANTABLE_SCOPES, SCOPE_ALL } from "@/lib/entitlements/access";
import { SELLABLE_SCOPES } from "@/lib/billing/plans";

const NOW = Date.UTC(2026, 4, 31); // 2026-05-31
const FUTURE = new Date(Date.UTC(2026, 11, 31)).toISOString();
const PAST = new Date(Date.UTC(2026, 0, 1)).toISOString();

describe("entitlements/admin validateGrant", () => {
  it("accepts a valid email + 'all' scope + no expiry", () => {
    expect(
      validateGrant({ email: "student@example.com", scope: "all", expiresAt: null }, NOW)
    ).toEqual({ ok: true });
  });

  it("accepts a future expiry", () => {
    expect(
      validateGrant(
        { email: "student@example.com", scope: "all", expiresAt: FUTURE },
        NOW
      )
    ).toEqual({ ok: true });
  });

  it("rejects a bad email (field=email)", () => {
    const r = validateGrant({ email: "nope", scope: "all", expiresAt: null }, NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("email");
  });

  it("rejects an empty/whitespace scope (field=scope)", () => {
    const r = validateGrant(
      { email: "student@example.com", scope: "   ", expiresAt: null },
      NOW
    );
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("scope");
  });

  it("rejects a past expiry (field=expiresAt)", () => {
    const r = validateGrant(
      { email: "student@example.com", scope: "all", expiresAt: PAST },
      NOW
    );
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("expiresAt");
  });

  it("rejects an unparseable expiry (field=expiresAt)", () => {
    const r = validateGrant(
      { email: "student@example.com", scope: "all", expiresAt: "not-a-date" },
      NOW
    );
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("expiresAt");
  });

  it("checks email before scope before expiry (precedence)", () => {
    const r = validateGrant({ email: "bad", scope: "", expiresAt: PAST }, NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("email");
  });
});

describe("entitlements/admin grantable scopes", () => {
  // The /dashboard/entitlements scope box was free text until 2026-11-06, and
  // neither this validator nor the database checked it: a typo ("mock") saved
  // a grant that unlocked nothing.
  it("rejects a scope no pass gives (field=scope)", () => {
    const r = validateGrant({ email: "student@example.com", scope: "mock", expiresAt: null }, NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("scope");
  });

  it("accepts every grantable scope", () => {
    for (const scope of GRANTABLE_SCOPES) {
      expect(validateGrant({ email: "student@example.com", scope, expiresAt: null }, NOW)).toEqual({ ok: true });
    }
  });

  it("can grant everything a pass sells, plus all", () => {
    expect([...GRANTABLE_SCOPES].sort()).toEqual([SCOPE_ALL, ...SELLABLE_SCOPES].sort());
  });
});
