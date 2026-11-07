/**
 * /board chapter pages open on a tab named in the URL hash (MENTOR_SPEC.md
 * Phase 1): the path's tasks link to `#top` (Top 10 PYQs) and `#revision`
 * (the revision sheet). Read from `location.hash`, NEVER `useSearchParams`,
 * which would turn the cached chapter pages dynamic (CLAUDE.md caching traps).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { panelFromHash } from "@/lib/board/panelHash";

describe("panelFromHash", () => {
  const both = { hasTop: true, hasRevision: true };
  it("opens the Top 10 and the revision sheet", () => {
    expect(panelFromHash("#top", both)).toBe("top");
    expect(panelFromHash("#revision", both)).toBe("revision");
  });
  it("ignores a tab the chapter does not have", () => {
    expect(panelFromHash("#top", { hasTop: false, hasRevision: true })).toBeNull();
    expect(panelFromHash("#revision", { hasTop: true, hasRevision: false })).toBeNull();
  });
  it("ignores anything else", () => {
    expect(panelFromHash("", both)).toBeNull();
    expect(panelFromHash("#textbook-2", both)).toBeNull();
    expect(panelFromHash("#Top", both)).toBeNull();
  });
});

describe("BoardReader", () => {
  const src = readFileSync("src/app/board/BoardReader.tsx", "utf8");
  it("reads the hash, not search params, so the page stays cached", () => {
    expect(src).toContain("panelFromHash(window.location.hash");
    expect(src).not.toMatch(/useSearchParams\(/);
  });
  it("records a revision sheet opened through the hash, like a tap", () => {
    expect(src).toMatch(/panelFromHash[\s\S]{0,400}reportRevisionOpened\(\)/);
  });
});
