import { describe, it, expect } from "vitest";
import { auditDocsBudget, LIMITS } from "../scripts/lib/docsBudget";

/**
 * Spec for the CLAUDE.md size gate. See scripts/lib/docsBudget.ts for why the
 * ceilings are the HARD rule and the per-entry / month rules are softer.
 */

const LOOSE = { fileMaxBytes: 100_000, decisionsMaxBytes: 50_000, perEntryMaxBytes: 1_200 };

function doc(entries: string[], filler = ""): string {
  return [
    "# PYQ Vault",
    filler,
    "## Decisions log",
    "",
    ...entries,
    "",
    "## Pending work",
    "trailing text that is NOT part of the decisions section",
  ].join("\n");
}

const entry = (tag: string, body = "short body") => `- **${tag} — headline**\n  - ${body}`;

describe("auditDocsBudget — parsing", () => {
  it("finds dated entries including ordinal suffixes", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16"), entry("2026-09-15 (third)")]), "2026-09-16", LOOSE);
    expect(r.entries.map((e) => e.tag)).toEqual(["2026-09-16", "2026-09-15 (third)"]);
  });

  it("measures the decisions section only, not the whole file", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16")], "x".repeat(5000)), "2026-09-16", LOOSE);
    expect(r.fileBytes).toBeGreaterThan(5000);
    expect(r.decisionsBytes).toBeLessThan(500);
  });

  it("counts UTF-8 BYTES, not characters — this prose is full of em-dashes", () => {
    // '—' is 1 char but 3 bytes. A char-based count under-reports the real payload.
    const r = auditDocsBudget(doc([entry("2026-09-16", "—".repeat(100))]), "2026-09-16", LOOSE);
    expect(r.entries[0].bytes).toBeGreaterThan(300);
  });

  it("FAILS CLOSED when the Decisions log section is absent", () => {
    const r = auditDocsBudget("# PYQ Vault\n\n## Stack\n\nno decisions here", "2026-09-16", LOOSE);
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.rule === "section-missing")).toBe(true);
  });
});

describe("auditDocsBudget — hard ceilings", () => {
  it("passes a compliant document", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16")]), "2026-09-16", LOOSE);
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual([]);
  });

  it("errors when the whole file exceeds its ceiling", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16")], "x".repeat(20_000)), "2026-09-16", {
      ...LOOSE,
      fileMaxBytes: 1_000,
    });
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.rule === "file-ceiling")).toBe(true);
  });

  it("errors when the decisions section exceeds its ceiling", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16", "y".repeat(5_000))]), "2026-09-16", {
      ...LOOSE,
      decisionsMaxBytes: 1_000,
    });
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.rule === "decisions-ceiling")).toBe(true);
  });
});

describe("auditDocsBudget — soft rules", () => {
  it("an oversize entry WARNS but does not fail the gate", () => {
    const r = auditDocsBudget(doc([entry("2026-09-16", "z".repeat(3_000))]), "2026-09-16", LOOSE);
    expect(r.errors).toEqual([]);
    expect(r.warnings.some((w) => w.rule === "entry-size")).toBe(true);
    expect(r.ok).toBe(true);
  });

  it("last month's entries WARN (one month of grace to archive)", () => {
    const r = auditDocsBudget(doc([entry("2026-08-20")]), "2026-09-16", LOOSE);
    expect(r.ok).toBe(true);
    expect(r.warnings.some((w) => w.rule === "entry-age")).toBe(true);
  });

  it("entries two months old FAIL — the grace has run out", () => {
    const r = auditDocsBudget(doc([entry("2026-07-20")]), "2026-09-16", LOOSE);
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.rule === "entry-age")).toBe(true);
  });

  it("handles a year boundary when measuring age", () => {
    const r = auditDocsBudget(doc([entry("2025-11-20")]), "2026-01-05", LOOSE);
    expect(r.errors.some((e) => e.rule === "entry-age")).toBe(true);
  });
});

describe("LIMITS", () => {
  it("ships real ceilings with headroom above the current file", () => {
    expect(LIMITS.fileMaxBytes).toBeGreaterThan(LIMITS.decisionsMaxBytes);
    expect(LIMITS.perEntryMaxBytes).toBe(1_200);
  });
});
