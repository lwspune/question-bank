import { describe, it, expect } from "vitest";
import {
  normalizeMobile,
  isValidIndianMobile,
  needsMobile,
  validateMobileSubmission,
} from "@/lib/profile/mobile";

describe("normalizeMobile (relocated, still canonical)", () => {
  it("normalises + validates the Indian mobile shape", () => {
    expect(normalizeMobile("9876543210")).toBe("919876543210");
    expect(normalizeMobile("+91 98765-43210")).toBe("919876543210");
    expect(normalizeMobile("098765 43210")).toBe("919876543210");
    expect(normalizeMobile("1234567890")).toBeNull(); // not 6-9 leading
    expect(normalizeMobile("")).toBeNull();
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("123")).toBe(false);
  });
});

describe("needsMobile", () => {
  it("is true when no profile / no mobile stored yet", () => {
    expect(needsMobile(null)).toBe(true);
    expect(needsMobile(undefined)).toBe(true);
    expect(needsMobile({ mobile: null })).toBe(true);
    expect(needsMobile({ mobile: "" })).toBe(true);
  });

  it("is false once a mobile is on file (ask once, never again)", () => {
    expect(needsMobile({ mobile: "919876543210" })).toBe(false);
  });
});

describe("validateMobileSubmission", () => {
  it("accepts a valid mobile with consent and returns the canonical form", () => {
    const r = validateMobileSubmission({ mobile: "98765 43210", consent: true });
    expect(r).toEqual({ ok: true, mobile: "919876543210" });
  });

  it("rejects an invalid mobile (mobile field first)", () => {
    const r = validateMobileSubmission({ mobile: "12345", consent: true });
    expect(r).toEqual({ ok: false, field: "mobile", message: expect.any(String) });
  });

  it("rejects when consent is not affirmatively given", () => {
    const r = validateMobileSubmission({ mobile: "9876543210", consent: false });
    expect(r).toEqual({ ok: false, field: "consent", message: expect.any(String) });
  });

  it("checks the mobile before consent (field order)", () => {
    const r = validateMobileSubmission({ mobile: "bad", consent: false });
    expect(r).toMatchObject({ ok: false, field: "mobile" });
  });
});
