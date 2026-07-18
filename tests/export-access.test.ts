/**
 * Unit spec for the export access gate (pure). This is the source of truth for
 * who can download which artifact:
 *   - paper / key  → org STAFF only (teacher/admin accounts). A downloadable
 *                    Word paper is a teacher artifact; students get the online
 *                    product (preview, mocks, notes) instead. (Was "any signed-in
 *                    account" until 2026-07-18.)
 *   - tags (.xlsx) → org staff only (unchanged)
 *   - anon         → nothing (browse/preview stays free; download is staff-gated)
 *
 * So the matrix collapses: every kind now requires isStaff. A signed-in student
 * (no org membership) is denied 403 for all three; anon is denied 401.
 *
 * The API route and the DownloadDialog UI both derive from this one function so
 * they can never diverge. The cookie-bound route path only reaches the anon
 * branch in tests (cookies() throws outside a request scope) — the full matrix
 * lives here.
 */
import { describe, it, expect } from "vitest";
import { resolveExportAccess, type ExportKind } from "@/lib/export/access";

const anon = { isSignedIn: false, isStaff: false };
const student = { isSignedIn: true, isStaff: false };
const staff = { isSignedIn: true, isStaff: true };

const KINDS: ExportKind[] = ["paper", "key", "tags"];

describe("resolveExportAccess", () => {
  for (const kind of KINDS) {
    describe(kind, () => {
      it("blocks anon with 401 (not signed in)", () => {
        const r = resolveExportAccess({ kind, ...anon });
        expect(r.allowed).toBe(false);
        if (!r.allowed) expect(r.status).toBe(401);
      });
      it("blocks a signed-in student with 403 (staff only)", () => {
        const r = resolveExportAccess({ kind, ...student });
        expect(r.allowed).toBe(false);
        if (!r.allowed) expect(r.status).toBe(403);
      });
      it("allows staff", () => {
        expect(resolveExportAccess({ kind, ...staff }).allowed).toBe(true);
      });
    });
  }

  it("returns a non-empty message on every denial", () => {
    const denials = KINDS.flatMap((kind) => [
      resolveExportAccess({ kind, ...anon }),
      resolveExportAccess({ kind, ...student }),
    ]);
    for (const d of denials) {
      expect(d.allowed).toBe(false);
      if (!d.allowed) expect(d.message.length).toBeGreaterThan(0);
    }
  });
});
