import { describe, it, expect } from "vitest";
import { pricingHref, afterPurchasePath, activePassesByScope } from "@/lib/billing/checkoutReturn";
import type { EntitlementStatus } from "@/lib/entitlements/access";

const NOW = Date.parse("2026-09-27T10:00:00Z");

describe("pricingHref", () => {
  it("links to the plan card", () => {
    expect(pricingHref("mocks")).toBe("/pricing?plan=mocks");
  });
  it("links to plain /pricing when no pass is on sale", () => {
    expect(pricingHref(null)).toBe("/pricing");
  });
  // The page the student was blocked on — they go back there after paying.
  it("carries an encoded return path", () => {
    expect(pricingHref("mocks", "/mock/nda-2025-i")).toBe(
      "/pricing?plan=mocks&next=%2Fmock%2Fnda-2025-i"
    );
    expect(pricingHref("teacher", "/browse?exam=nda&ch=1")).toBe(
      "/pricing?plan=teacher&next=%2Fbrowse%3Fexam%3Dnda%26ch%3D1"
    );
  });
  // An off-site return path is dropped, not carried into the URL.
  it("drops an unsafe return path", () => {
    expect(pricingHref("mocks", "https://evil.com")).toBe("/pricing?plan=mocks");
    expect(pricingHref("mocks", "//evil.com")).toBe("/pricing?plan=mocks");
  });
});

describe("afterPurchasePath", () => {
  it("returns to a safe in-site path", () => {
    expect(afterPurchasePath("/mock/nda-2025-i")).toBe("/mock/nda-2025-i");
  });
  it("falls back to /account when there is none or it is unsafe", () => {
    expect(afterPurchasePath(undefined)).toBe("/account");
    expect(afterPurchasePath("")).toBe("/account");
    expect(afterPurchasePath("//evil.com")).toBe("/account");
  });
  // Coming back to /pricing after paying would show "You already have this".
  it("never returns to /pricing itself", () => {
    expect(afterPurchasePath("/pricing?plan=mocks")).toBe("/account");
  });
});

describe("activePassesByScope", () => {
  const row = (
    over: Partial<{ scope: string; status: EntitlementStatus; expiresAt: string | null; source: string }>
  ) => ({
    scope: "mocks",
    status: "active" as EntitlementStatus,
    expiresAt: "2027-03-01T00:00:00Z" as string | null,
    source: "razorpay",
    ...over,
  });

  // A teacher who also bought the Mock Pass sees both, not whichever lasts longer.
  it("keeps one row per scope", () => {
    const out = activePassesByScope(
      [row({ scope: "mocks" }), row({ scope: "teacher", expiresAt: "2027-09-01T00:00:00Z" })],
      NOW
    );
    expect(out.map((p) => p.scope)).toEqual(["teacher", "mocks"]);
  });
  it("keeps the longest-lasting grant within a scope", () => {
    const out = activePassesByScope(
      [row({ expiresAt: "2026-12-01T00:00:00Z" }), row({ expiresAt: null, source: "comp" })],
      NOW
    );
    expect(out).toHaveLength(1);
    expect(out[0].expiresAt).toBeNull();
    expect(out[0].source).toBe("comp");
  });
  it("drops expired and revoked grants", () => {
    const out = activePassesByScope(
      [row({ expiresAt: "2026-01-01T00:00:00Z" }), row({ scope: "teacher", status: "revoked" })],
      NOW
    );
    expect(out).toEqual([]);
  });
});
