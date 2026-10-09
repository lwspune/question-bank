/**
 * Pure-helper tests for the client-safe auth credential validators.
 * These live in src/lib/auth/credentials.ts (no service-role import) so
 * the signup page can use them without pulling admin code into the bundle.
 */
import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPassword,
  signInErrorMessage,
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

describe("signInErrorMessage — what /login says when a password sign-in fails", () => {
  // 2026-10-08: 33 password sign-ins failed and none succeeded, from 4 people,
  // one of whom tried 25 times in 3 minutes. They saw Supabase's raw
  // "Invalid login credentials". 92% of accounts sign in with Google, so the
  // message points there.
  it("turns a wrong email or password into a hint to use Google", () => {
    const m = signInErrorMessage({ code: "invalid_credentials", message: "Invalid login credentials" });
    expect(m).toContain("don't match");
    expect(m).toContain("Continue with Google");
    expect(m).not.toContain("Invalid login credentials");
  });

  it("recognises the wrong-password case by message when no code is sent", () => {
    expect(signInErrorMessage({ message: "Invalid login credentials" })).toContain("Continue with Google");
  });

  it("tells an unconfirmed account to use the email we sent", () => {
    const m = signInErrorMessage({ code: "email_not_confirmed", message: "Email not confirmed" });
    expect(m).toMatch(/confirm/i);
    expect(m).toMatch(/inbox/i);
  });

  it("asks a rate-limited visitor to wait, and still offers Google", () => {
    const m = signInErrorMessage({ status: 429, message: "Request rate limit reached" });
    expect(m).toMatch(/wait/i);
    expect(m).toContain("Continue with Google");
  });

  it("passes any other error through unchanged, so nothing is hidden", () => {
    expect(signInErrorMessage({ message: "Database error querying schema" })).toBe(
      "Database error querying schema"
    );
  });

  it("never returns an empty message", () => {
    expect(signInErrorMessage({}).length).toBeGreaterThan(0);
  });

  it("uses no em dashes (visible text rule)", () => {
    for (const e of [{ code: "invalid_credentials" }, { code: "email_not_confirmed" }, { status: 429 }, {}]) {
      expect(signInErrorMessage(e)).not.toMatch(/—| – | -- /);
    }
  });
});
