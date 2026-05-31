/**
 * Pure-helper tests for the client-safe auth credential validators.
 * These live in src/lib/auth/credentials.ts (no service-role import) so
 * the signup page can use them without pulling admin code into the bundle.
 */
import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPassword,
  validateSignup,
  MIN_PASSWORD_LENGTH,
} from "@/lib/auth/credentials";

describe("auth/credentials validators", () => {
  describe("isValidEmail", () => {
    it("accepts typical emails", () => {
      expect(isValidEmail("student@example.com")).toBe(true);
      expect(isValidEmail("nav.neet+filter@school.edu.in")).toBe(true);
    });

    it("rejects missing parts and whitespace", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("noatsign")).toBe(false);
      expect(isValidEmail("@no-local.com")).toBe(false);
      expect(isValidEmail("no-domain@")).toBe(false);
      expect(isValidEmail("no@dot")).toBe(false);
      expect(isValidEmail("has space@example.com")).toBe(false);
      expect(isValidEmail("trailing@example.com ")).toBe(false);
    });
  });

  describe("isValidPassword", () => {
    it(`accepts passwords ${MIN_PASSWORD_LENGTH}+ chars`, () => {
      expect(isValidPassword("a".repeat(MIN_PASSWORD_LENGTH))).toBe(true);
      expect(isValidPassword("very-long-secret-passphrase")).toBe(true);
    });

    it("rejects shorter passwords and non-strings", () => {
      expect(isValidPassword("")).toBe(false);
      expect(isValidPassword("a".repeat(MIN_PASSWORD_LENGTH - 1))).toBe(false);
      expect(isValidPassword(undefined as unknown as string)).toBe(false);
      expect(isValidPassword(12345678 as unknown as string)).toBe(false);
    });
  });

  describe("validateSignup", () => {
    const goodPassword = "a".repeat(MIN_PASSWORD_LENGTH);

    it("accepts a valid email + matching password", () => {
      expect(
        validateSignup({
          email: "student@example.com",
          password: goodPassword,
          confirm: goodPassword,
        })
      ).toEqual({ ok: true });
    });

    it("rejects a bad email with field=email", () => {
      const r = validateSignup({
        email: "not-an-email",
        password: goodPassword,
        confirm: goodPassword,
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.field).toBe("email");
    });

    it("rejects a short password with field=password", () => {
      const r = validateSignup({
        email: "student@example.com",
        password: "short",
        confirm: "short",
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.field).toBe("password");
    });

    it("rejects a confirm mismatch with field=confirm", () => {
      const r = validateSignup({
        email: "student@example.com",
        password: goodPassword,
        confirm: goodPassword + "x",
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.field).toBe("confirm");
    });

    it("checks email before password before confirm (precedence)", () => {
      // All three invalid → email reported first.
      const r = validateSignup({
        email: "bad",
        password: "short",
        confirm: "different",
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.field).toBe("email");
    });

    it("returns a human-readable message on failure", () => {
      const r = validateSignup({
        email: "student@example.com",
        password: goodPassword,
        confirm: "nope",
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.message.length).toBeGreaterThan(0);
    });
  });
});
