import { describe, it, expect } from "vitest";
import { auditDocsBudget, reconcileArchive, LIMITS } from "../scripts/lib/docsBudget";

/**
 * Spec for the CLAUDE.md size gate. See scripts/lib/docsBudget.ts for why the
 * ceilings are the HARD rule and the per-entry / month rules are softer.
 */

const LOOSE = { fileMaxBytes: 100_000, decisionsMaxBytes: 50_000, perEntryMaxBytes: 1_200, memoryMaxBytes: 50_000 };

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

describe("auditDocsBudget — the MEMORY.md ceiling", () => {
  /**
   * MEMORY.md is the other file loaded before every session, so it is the same
   * KIND of cost as CLAUDE.md. It differs in one way that shapes this whole
   * block: it lives under ~/.claude, OUTSIDE the repo, so it is present on a
   * developer machine and ABSENT in CI. That is why it is passed in rather than
   * read by the pure core, and why absence is neither a pass nor a failure.
   */
  const md = doc([entry("2026-09-16")]);

  it("measures MEMORY.md bytes when it is supplied", () => {
    const r = auditDocsBudget(md, "2026-09-16", LOOSE, "- [a](a.md) — hook");
    expect(r.memoryBytes).toBe(20); // 17 chars, one of them a 3-byte em-dash
  });

  it("errors when MEMORY.md exceeds its ceiling", () => {
    const tight = { ...LOOSE, memoryMaxBytes: 100 };
    const r = auditDocsBudget(md, "2026-09-16", tight, "x".repeat(200));
    expect(r.ok).toBe(false);
    expect(r.errors.map((e) => e.rule)).toContain("memory-ceiling");
    expect(r.errors.find((e) => e.rule === "memory-ceiling")!.message).toMatch(/Prune/);
  });

  it("counts UTF-8 BYTES — the index is one em-dash per line", () => {
    const r = auditDocsBudget(md, "2026-09-16", LOOSE, "—".repeat(100));
    expect(r.memoryBytes).toBe(300);
  });

  it("reports NOT MEASURED when MEMORY.md is absent — never a silent pass", () => {
    // CI has no ~/.claude. Failing there would block every push for a file the
    // repo does not own; passing there would let the OK line claim a budget
    // nobody checked. `null` is the third answer, and the CLI prints it.
    const r = auditDocsBudget(md, "2026-09-16", LOOSE);
    expect(r.memoryBytes).toBeNull();
    expect(r.ok).toBe(true);
    expect([...r.errors, ...r.warnings].map((f) => f.rule)).not.toContain("memory-ceiling");
  });

  it("an EMPTY MEMORY.md is 0 bytes, which is NOT the same as absent", () => {
    // The discriminating case: `""` is falsy, so a truthiness check would file a
    // real-but-empty index as unmeasured and lose the distinction the rule needs.
    const r = auditDocsBudget(md, "2026-09-16", LOOSE, "");
    expect(r.memoryBytes).toBe(0);
  });
});

describe("reconcileArchive — which digests would be LOST if evicted", () => {
  /**
   * The SIZE convention says every entry is written TWICE: a full post-mortem in
   * DECISIONS_HISTORY.md and a digest in CLAUDE.md. Archiving then costs nothing,
   * because the long form is already there. On 2026-09-18 that turned out to be
   * false for 7 of 11 live entries — so a routine sweep would have DELETED them.
   * Prose cannot catch that; this reconciliation can.
   */
  const live = doc([entry("2026-09-18 (third)"), entry("2026-09-17")]);

  it("names entries whose long form is missing from the archive", () => {
    const history = `- **2026-09-17 — headline**
  - body`;
    expect(reconcileArchive(live, history)).toEqual(["2026-09-18 (third)"]);
  });

  it("accepts BOTH archive heading forms — bulleted and bare", () => {
    // The archive mixes `- **tag — ...**` with a bare `**tag — ...**` paragraph.
    // Matching only the bulleted form reported 4 real narratives as missing.
    const history = `**2026-09-18 (third) — headline**

prose

- **2026-09-17 — h**`;
    expect(reconcileArchive(live, history)).toEqual([]);
  });

  it("does not let a bare date match an ordinal-suffixed entry", () => {
    // Substring matching says "2026-09-18" is present inside "2026-09-18 (third)".
    // That false positive is what made the first hand-check of this wrong.
    const history = `- **2026-09-18 (third) — headline**`;
    expect(reconcileArchive(doc([entry("2026-09-18")]), history)).toEqual(["2026-09-18"]);
  });

  it("returns null when there is no archive to check against", () => {
    expect(reconcileArchive(live, null)).toBeNull();
  });
});

describe("LIMITS", () => {
  it("ships real ceilings with headroom above the current file", () => {
    expect(LIMITS.fileMaxBytes).toBeGreaterThan(LIMITS.decisionsMaxBytes);
    expect(LIMITS.perEntryMaxBytes).toBe(1_200);
    // Set 2026-09-18 with MEMORY.md at 20.5 KB. Headroom, but not so much that
    // the gate never binds — the index only ever grows.
    expect(LIMITS.memoryMaxBytes).toBe(24_000);
  });
});
