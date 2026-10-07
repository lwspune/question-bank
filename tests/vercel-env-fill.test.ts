/**
 * Filling Vercel's locked ("Sensitive") settings before a GitHub build.
 *
 * `vercel pull` cannot read a Sensitive variable: it writes the placeholder
 * `[SENSITIVE]` instead (11 of them on 2026-10-07), and the build then fails on
 * "Invalid supabaseUrl" or, worse, could bake the placeholder into a page. The
 * few settings the BUILD reads come from GitHub's own secrets instead; the rest
 * are read only at runtime, where Vercel still supplies them.
 */
import { describe, it, expect } from "vitest";
import { fillLockedSettings, SENSITIVE_PLACEHOLDER } from "../scripts/lib/vercelEnv";

const FILE = [
  "# Created by Vercel CLI",
  `NEXT_PUBLIC_SUPABASE_URL="${SENSITIVE_PLACEHOLDER}"`,
  `SUPABASE_SERVICE_ROLE_KEY="${SENSITIVE_PLACEHOLDER}"`,
  `RAZORPAY_KEY_SECRET="${SENSITIVE_PLACEHOLDER}"`,
  'NEXT_PUBLIC_CLARITY_PROJECT_ID="abc123"',
  "VERCEL_ENV=\"production\"",
  "",
].join("\n");

describe("fillLockedSettings", () => {
  it("fills a locked setting from GitHub's copy and reports it by name", () => {
    const r = fillLockedSettings(FILE, {
      NEXT_PUBLIC_SUPABASE_URL: "https://x.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-key",
    });
    expect(r.text).toContain('NEXT_PUBLIC_SUPABASE_URL="https://x.supabase.co"');
    expect(r.text).toContain('SUPABASE_SERVICE_ROLE_KEY="service-key"');
    expect(r.filled).toEqual(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
  });

  it("never overwrites a real value Vercel did provide", () => {
    const r = fillLockedSettings(FILE, { NEXT_PUBLIC_CLARITY_PROJECT_ID: "from-github" });
    expect(r.text).toContain('NEXT_PUBLIC_CLARITY_PROJECT_ID="abc123"');
    expect(r.filled).toEqual([]);
  });

  it("names what is still locked, and blocks only on settings the build reads", () => {
    const r = fillLockedSettings(FILE, { SUPABASE_SERVICE_ROLE_KEY: "service-key" });
    expect(r.stillLocked).toEqual(["NEXT_PUBLIC_SUPABASE_URL", "RAZORPAY_KEY_SECRET"]);
    // A runtime-only secret (payments) stays locked without blocking the build.
    expect(r.blocking).toEqual(["NEXT_PUBLIC_SUPABASE_URL"]);
  });

  it("treats an empty GitHub copy as missing, not as a value", () => {
    const r = fillLockedSettings(FILE, { NEXT_PUBLIC_SUPABASE_URL: "" });
    expect(r.blocking).toContain("NEXT_PUBLIC_SUPABASE_URL");
  });

  it("accepts an unquoted placeholder and keeps comments and other lines untouched", () => {
    const r = fillLockedSettings(`# c\nNEXT_PUBLIC_GOOGLE_CLIENT_ID=${SENSITIVE_PLACEHOLDER}\nVERCEL_ENV="production"`, {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: "123.apps.googleusercontent.com",
    });
    expect(r.text).toBe('# c\nNEXT_PUBLIC_GOOGLE_CLIENT_ID="123.apps.googleusercontent.com"\nVERCEL_ENV="production"');
    expect(r.blocking).toEqual([]);
  });

  it("escapes quotes and backslashes in a filled value so the file still parses", () => {
    const r = fillLockedSettings(`SUPABASE_SERVICE_ROLE_KEY="${SENSITIVE_PLACEHOLDER}"`, {
      SUPABASE_SERVICE_ROLE_KEY: 'a"b\\c',
    });
    expect(r.text).toBe('SUPABASE_SERVICE_ROLE_KEY="a\\"b\\\\c"');
  });
});
