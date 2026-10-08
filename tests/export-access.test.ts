/**
 * Unit spec for the export access gate (pure). This is the source of truth for
 * who can download which artifact:
 *   - paper / key  → org STAFF, or anyone holding the Premium Pass (2026-10-01;
 *                    before that a separate Teacher Pass, and before 2026-09-26
 *                    staff only). Pass downloads are BRANDED, staff ones are not.
 *   - tags / ppt   → org staff only
 *   - anon         → nothing (browse/preview stays free)
 *
 * A signed-in account with neither is denied 403; anon is denied 401.
 *
 * The API route and the DownloadDialog UI both derive from this one function so
 * they can never diverge. The cookie-bound route path only reaches the anon
 * branch in tests (cookies() throws outside a request scope) — the full matrix
 * lives here.
 */
import { describe, it, expect } from "vitest";
import { resolveExportAccess, DOWNLOAD_PASS_SCOPE, type ExportKind } from "@/lib/export/access";
import { scopeCovers, SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const anon = { isSignedIn: false, isStaff: false };
const student = { isSignedIn: true, isStaff: false };
const staff = { isSignedIn: true, isStaff: true };

const KINDS: ExportKind[] = ["paper", "key", "tags", "ppt"];

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

  // The Premium Pass (2026-10-01): the one paid pass unlocks the paper +
  // answer key for anyone with no org, student or teacher. Slides and the tag
  // sheet stay org-staff only. (Was a separate ₹499 Teacher Pass, 2026-09-26.)
  describe("download pass", () => {
    // The pass on sale is scope "mocks". Old "teacher" grants (none exist, but
    // the scope is still valid) and the full-premium "all" must keep working.
    it.each([SCOPE_MOCKS, SCOPE_TEACHER, SCOPE_ALL])("a %s grant unlocks downloads", (granted) => {
      expect(scopeCovers(granted, DOWNLOAD_PASS_SCOPE)).toBe(true);
    });

    const passHolder = { isSignedIn: true, isStaff: false, hasDownloadPass: true };
    it.each(["paper", "key"] as ExportKind[])("allows %s", (kind) => {
      expect(resolveExportAccess({ kind, ...passHolder }).allowed).toBe(true);
    });
    it.each(["tags", "ppt"] as ExportKind[])("still denies %s with 403", (kind) => {
      const r = resolveExportAccess({ kind, ...passHolder });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(403);
    });
    it("means nothing to an anon caller", () => {
      const r = resolveExportAccess({ kind: "paper", isSignedIn: false, isStaff: false, hasDownloadPass: true });
      expect(r.allowed).toBe(false);
    });
    it("a student denied the paper is told a pass unlocks it, not that it is for teachers", () => {
      const r = resolveExportAccess({ kind: "paper", ...student });
      expect(r.allowed).toBe(false);
      if (!r.allowed) {
        expect(r.message).toMatch(/pass/i);
        expect(r.message).not.toMatch(/teacher/i);
      }
    });
  });

  // One free download per account (2026-10-04): a signed-in account that has
  // not used it may take ONE Word file, paper or key, branded like a pass
  // paper, so a visitor sees the proof before paying. `free: true` tells the
  // route to record the use; it is absent whenever the free file is not what
  // let the caller in.
  describe("free download", () => {
    const fresh = { isSignedIn: true, isStaff: false, hasDownloadPass: false, freeDownloadLeft: true };
    it.each(["paper", "key"] as ExportKind[])("allows one %s, branded, marked free", (kind) => {
      expect(resolveExportAccess({ kind, ...fresh })).toEqual({ allowed: true, branded: true, format: "pdf", free: true });
    });
    it.each(["tags", "ppt"] as ExportKind[])("does not open %s", (kind) => {
      expect(resolveExportAccess({ kind, ...fresh }).allowed).toBe(false);
    });
    it("means nothing to an anon caller", () => {
      const r = resolveExportAccess({ kind: "paper", isSignedIn: false, isStaff: false, freeDownloadLeft: true });
      expect(r.allowed).toBe(false);
      if (!r.allowed) expect(r.status).toBe(401);
    });
    it("is not spent by a pass holder", () => {
      const r = resolveExportAccess({ kind: "paper", ...fresh, hasDownloadPass: true });
      expect(r).toEqual({ allowed: true, branded: true, format: "pdf" });
    });
    it("is not spent by institute staff", () => {
      const r = resolveExportAccess({ kind: "paper", ...staff, freeDownloadLeft: true });
      expect(r).toEqual({ allowed: true, branded: false, format: "docx" });
    });
    it("once used, says so and points at the pass", () => {
      const r = resolveExportAccess({ kind: "paper", ...fresh, freeDownloadLeft: false });
      expect(r.allowed).toBe(false);
      if (!r.allowed) {
        expect(r.status).toBe(403);
        expect(r.message).toMatch(/free paper/i);
        expect(r.message).toMatch(/Premium Pass/);
      }
    });
  });

  // Branding (2026-10-01): a pass download carries the PYQ Vault watermark and
  // footer; an institute's own staff download stays unbranded (the owner's
  // earlier "teachers' papers stay unbranded" call, kept for institutes).
  describe("branding", () => {
    it.each(["paper", "key"] as ExportKind[])("brands a pass holder's %s", (kind) => {
      const r = resolveExportAccess({ kind, isSignedIn: true, isStaff: false, hasDownloadPass: true });
      expect(r).toEqual({ allowed: true, branded: true, format: "pdf" });
    });
    it.each(KINDS)("never brands institute staff (%s)", (kind) => {
      const r = resolveExportAccess({ kind, ...staff });
      expect(r).toMatchObject({ allowed: true, branded: false });
    });
    it("staff who also hold a pass stay unbranded", () => {
      const r = resolveExportAccess({ kind: "paper", ...staff, hasDownloadPass: true });
      expect(r).toEqual({ allowed: true, branded: false, format: "docx" });
    });
  });

  // File format (2026-10-05): the paper and key go out as a PDF to everyone
  // without staff access, because Word breaks on the phones they open it on;
  // institute staff keep Word, which they edit. Decided here with branding, on
  // the same inputs, so the route and the download box cannot disagree.
  describe("format", () => {
    const passHolder = { isSignedIn: true, isStaff: false, hasDownloadPass: true };
    const fresh = { isSignedIn: true, isStaff: false, freeDownloadLeft: true };
    it.each(["paper", "key"] as ExportKind[])("a pass holder's %s is a PDF", (kind) => {
      expect(resolveExportAccess({ kind, ...passHolder })).toMatchObject({ format: "pdf" });
    });
    it.each(["paper", "key"] as ExportKind[])("the free %s is a PDF", (kind) => {
      expect(resolveExportAccess({ kind, ...fresh })).toMatchObject({ format: "pdf" });
    });
    it.each(["paper", "key"] as ExportKind[])("staff get %s as Word", (kind) => {
      expect(resolveExportAccess({ kind, ...staff })).toMatchObject({ format: "docx" });
    });
    it.each(["tags", "ppt"] as ExportKind[])("%s carries no paper format", (kind) => {
      const r = resolveExportAccess({ kind, ...staff });
      expect(r.allowed && r.format).toBeUndefined();
    });
  });
});
