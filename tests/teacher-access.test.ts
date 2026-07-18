/**
 * Unit spec for the "request teacher access" lead validator (pure).
 *
 * Rules under test: name required, MOBILE required (email optional), consent
 * must be true, mobile normalised to canonical 91XXXXXXXXXX, empty optionals
 * collapse to null, length caps enforced.
 */
import { describe, it, expect } from "vitest";
import { validateTeacherAccessRequest } from "@/lib/teacherAccess/validate";

const base = {
  name: "Asha Teacher",
  institute: "Bright Academy",
  email: "asha@example.com",
  mobile: "98765 43210",
  city: "Pune",
  message: "We run an NDA batch.",
  consent: true as const,
};

describe("validateTeacherAccessRequest", () => {
  it("accepts a valid request and cleans it", () => {
    const r = validateTeacherAccessRequest(base);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.name).toBe("Asha Teacher");
      expect(r.value.email).toBe("asha@example.com");
      expect(r.value.mobile).toBe("919876543210"); // canonical
      expect(r.value.institute).toBe("Bright Academy");
      expect(r.value.consent).toBe(true);
    }
  });

  it("lowercases the email", () => {
    const r = validateTeacherAccessRequest({ ...base, email: "Asha@Example.COM" });
    expect(r.ok && r.value.email).toBe("asha@example.com");
  });

  it("normalises the mobile to canonical form", () => {
    const r = validateTeacherAccessRequest({ ...base, mobile: "+91 98765 43210" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.mobile).toBe("919876543210");
  });

  it("accepts mobile-only (email optional)", () => {
    const r = validateTeacherAccessRequest({ ...base, email: "" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBeNull();
      expect(r.value.mobile).toBe("919876543210");
    }
  });

  it("rejects a missing name", () => {
    const r = validateTeacherAccessRequest({ ...base, name: "   " });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("name");
  });

  it("rejects a missing mobile (mobile is required)", () => {
    const r = validateTeacherAccessRequest({ ...base, mobile: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("mobile");
  });

  it("rejects an implausible mobile", () => {
    const r = validateTeacherAccessRequest({ ...base, mobile: "12345" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("mobile");
  });

  it("rejects a malformed email (when one is given)", () => {
    const r = validateTeacherAccessRequest({ ...base, email: "not-an-email" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("email");
  });

  it("rejects when consent is not true", () => {
    const r = validateTeacherAccessRequest({ ...base, consent: false as unknown as true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("consent");
  });

  it("collapses empty optionals to null", () => {
    const r = validateTeacherAccessRequest({
      name: "Solo",
      mobile: "9876543210",
      email: "",
      institute: "   ",
      city: "",
      message: "   ",
      consent: true,
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBeNull();
      expect(r.value.institute).toBeNull();
      expect(r.value.city).toBeNull();
      expect(r.value.message).toBeNull();
    }
  });

  it("rejects an over-long message", () => {
    const r = validateTeacherAccessRequest({ ...base, message: "x".repeat(1001) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.field).toBe("message");
  });
});
