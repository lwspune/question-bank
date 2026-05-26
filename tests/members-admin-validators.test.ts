/**
 * Pure-helper tests for the admin members module.
 * Validators only — the live auth.admin paths are exercised indirectly
 * by the /api/admin/members route (manual smoke; not unit-testable
 * without a real Supabase project).
 */
import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPassword,
  isValidRole,
  MIN_PASSWORD_LENGTH,
} from "@/lib/members/admin";

describe("members/admin validators", () => {
  describe("isValidEmail", () => {
    it("accepts typical emails", () => {
      expect(isValidEmail("teacher@example.com")).toBe(true);
      expect(isValidEmail("nav.neet+filter@school.edu.in")).toBe(true);
    });

    it("rejects missing parts", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("noatsign")).toBe(false);
      expect(isValidEmail("@no-local.com")).toBe(false);
      expect(isValidEmail("no-domain@")).toBe(false);
      expect(isValidEmail("no@dot")).toBe(false);
    });

    it("rejects whitespace", () => {
      expect(isValidEmail("has space@example.com")).toBe(false);
      expect(isValidEmail("trailing@example.com ")).toBe(false);
    });
  });

  describe("isValidPassword", () => {
    it(`accepts passwords ${MIN_PASSWORD_LENGTH}+ chars`, () => {
      expect(isValidPassword("a".repeat(MIN_PASSWORD_LENGTH))).toBe(true);
      expect(isValidPassword("very-long-secret-passphrase")).toBe(true);
    });

    it("rejects shorter passwords", () => {
      expect(isValidPassword("")).toBe(false);
      expect(isValidPassword("a".repeat(MIN_PASSWORD_LENGTH - 1))).toBe(false);
    });

    it("rejects non-strings", () => {
      expect(isValidPassword(undefined as unknown as string)).toBe(false);
      expect(isValidPassword(null as unknown as string)).toBe(false);
      expect(isValidPassword(12345678 as unknown as string)).toBe(false);
    });
  });

  describe("isValidRole", () => {
    it("accepts ADMIN and TEACHER", () => {
      expect(isValidRole("ADMIN")).toBe(true);
      expect(isValidRole("TEACHER")).toBe(true);
    });

    it("rejects anything else", () => {
      expect(isValidRole("admin")).toBe(false);
      expect(isValidRole("teacher")).toBe(false);
      expect(isValidRole("OWNER")).toBe(false);
      expect(isValidRole("")).toBe(false);
      expect(isValidRole(null)).toBe(false);
      expect(isValidRole(undefined)).toBe(false);
      expect(isValidRole(42)).toBe(false);
    });
  });
});
