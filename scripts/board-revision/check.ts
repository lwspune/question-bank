/**
 * Check a board revision-sheet DRAFT before it is registered (2026-11-03):
 * `npm run revision:check -- <path/to/sheet.ts> [more.ts ...]`.
 *
 * Runs the same checker the registry test runs (lib/board/revision/lint.ts)
 * and prints the problems, or "clean". Read-only, so a drafting agent can run
 * it on a file outside the repo. Exits 1 on any problem.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { lintRevisionSheet } from "@/lib/board/revision/lint";
import type { RevisionSheet } from "@/lib/board/revision/types";

(async () => {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error("usage: npm run revision:check -- <sheet.ts> [more.ts ...]");
    process.exit(2);
  }
  let bad = 0;
  for (const f of files) {
    const mod = (await import(pathToFileURL(resolve(f)).href)) as { default?: RevisionSheet };
    const sheet = mod.default;
    if (!sheet) {
      console.log(`${f}: no default export`);
      bad++;
      continue;
    }
    const problems = lintRevisionSheet(sheet);
    if (problems.length === 0) console.log(`${f}: clean`);
    else {
      bad++;
      console.log(`${f}: ${problems.length} problem(s)`);
      for (const p of problems) console.log(`  - ${p}`);
    }
  }
  process.exit(bad ? 1 : 0);
})();
