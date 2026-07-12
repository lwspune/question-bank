/**
 * Unit spec for the export access gate (pure). This is the source of truth for
 * who can download which artifact:
 *   - paper / key  → any signed-in user (self-serve student or org staff)
 *   - tags (.xlsx) → org staff only (the teacher/admin accounts LWS provisions)
 *   - anon         → nothing (browse/preview stays free; download requires sign-in)
 *
 * The API route and the DownloadDialog UI both derive from this one function so
 * they can never diverge. The cookie-bound route path only reaches the anon
 * branch in tests (cookies() throws outside a request scope) — the full matrix
 * lives here.
 */
import { describe, it, expect } from "vitest";
import { resolveExportAccess } from "@/lib/export/access";

const anon = { isSignedIn: false, isStaff: false };
const student = { isSignedIn: true, isStaff: false };
const staff = { isSignedIn: true, isStaff: true };

describe("resolveExportAccess", () => {
  describe("paper", () => {
    it("blocks anon with 401", () => {
      const r = resolveExportAccess({ kind: "paper", ...anon });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(401);
    });
    it("allows a signed-in student", () => {
      expect(resolveExportAccess({ kind: "paper", ...student }).allowed).toBe(true);
    });
    it("allows staff", () => {
      expect(resolveExportAccess({ kind: "paper", ...staff }).allowed).toBe(true);
    });
  });

  describe("key", () => {
    it("blocks anon with 401", () => {
      const r = resolveExportAccess({ kind: "key", ...anon });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(401);
    });
    it("allows a signed-in student", () => {
      expect(resolveExportAccess({ kind: "key", ...student }).allowed).toBe(true);
    });
    it("allows staff", () => {
      expect(resolveExportAccess({ kind: "key", ...staff }).allowed).toBe(true);
    });
  });

  describe("tags", () => {
    it("blocks anon with 401 (not signed in)", () => {
      const r = resolveExportAccess({ kind: "tags", ...anon });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(401);
    });
    it("blocks a signed-in student with 403 (staff only)", () => {
      const r = resolveExportAccess({ kind: "tags", ...student });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(403);
    });
    it("allows staff", () => {
      expect(resolveExportAccess({ kind: "tags", ...staff }).allowed).toBe(true);
    });
  });

  it("returns a non-empty message on every denial", () => {
    const denials = [
      resolveExportAccess({ kind: "paper", ...anon }),
      resolveExportAccess({ kind: "key", ...anon }),
      resolveExportAccess({ kind: "tags", ...anon }),
      resolveExportAccess({ kind: "tags", ...student }),
    ];
    for (const d of denials) {
      expect(d.allowed).toBe(false);
      if (!d.allowed) expect(d.message.length).toBeGreaterThan(0);
    }
  });
});
