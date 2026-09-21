/**
 * Pins the run-allowlist in scripts/lib/needsNotesLint.ts to reality.
 *
 * The gate skips `notes:lint` when a push touches none of NOTES_LINT_ROOTS.
 * That is only safe while the lint's real imports stay inside those roots —
 * the day notes-lint.ts imports from, say, src/lib/guide/, a guide-only push
 * would skip a lint it could have failed, and nothing else would notice. So
 * this walks the lint's actual static import graph from disk and fails on
 * the first reachable file the rule does not cover. Static, no DB: it belongs
 * in `npm test`, not on a schedule.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { collectImports } from "../scripts/lib/importGraph";
import { isNotesLintRelevant, NOTES_LINT_ROOTS } from "../scripts/lib/needsNotesLint";

const REPO = path.resolve(__dirname, "..");
const ENTRY = "scripts/notes-lint.ts";

function readRepoFile(rel: string): string | null {
  try {
    const st = fs.statSync(path.join(REPO, rel));
    if (!st.isFile()) return null;
    return fs.readFileSync(path.join(REPO, rel), "utf8");
  } catch {
    return null;
  }
}

describe("notes:lint import roots", () => {
  const reached = [...collectImports(ENTRY, readRepoFile)].sort();

  it("reaches the editorial modules at all (the walk is not vacuous)", () => {
    expect(reached.some((f) => f.startsWith("src/app/notes/"))).toBe(true);
    expect(reached.some((f) => f.startsWith("src/lib/notes/"))).toBe(true);
    expect(reached.length).toBeGreaterThan(20);
  });

  it("reaches NOTHING outside NOTES_LINT_ROOTS — otherwise the gate could skip a lint it would fail", () => {
    const outside = reached.filter((f) => !isNotesLintRelevant(f));
    expect(
      outside,
      `notes-lint.ts now imports from outside its declared roots ${JSON.stringify(NOTES_LINT_ROOTS)}; ` +
        `add the root to NOTES_LINT_ROOTS (and mean it — every push under it will now run the lint)`,
    ).toEqual([]);
  });
});
