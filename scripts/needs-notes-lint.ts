/**
 * Gate helper: does the changeset between two refs warrant `notes:lint`?
 *
 * Shared by the pre-push hook and CI so both use ONE rule (the pure core in
 * scripts/lib/needsNotesLint.ts, spec'd in tests/needs-notes-lint.test.ts and
 * pinned to the lint's real import graph by
 * tests/notes-lint-import-roots.test.ts). Same shape as scripts/needs-build.ts.
 *
 *   npx tsx scripts/needs-notes-lint.ts <baseRef> <headRef>
 *
 * Prints a human-readable verdict; exits 0 when the lint IS needed, 1 when it
 * can be skipped. Callers branch on the exit code.
 *
 * FAIL-SAFE: any reason we cannot determine the changeset — an unknown ref, a
 * brand-new branch whose base is the all-zeros SHA, a shallow clone missing the
 * base commit, git not on PATH — reports "needed". Never let a broken diff be
 * the reason the gate skipped a check.
 */
import { execFileSync } from "node:child_process";
import { needsNotesLint, notesLintRelevantPaths } from "./lib/needsNotesLint";

const ZERO_SHA = /^0{40}$/;

function changedFiles(base: string, head: string): string[] | null {
  if (!base || ZERO_SHA.test(base)) return null; // new branch: no base to diff
  try {
    const out = execFileSync("git", ["diff", "--name-only", `${base}`, `${head}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return out.split("\n");
  } catch {
    return null; // unknown/unreachable ref, shallow clone, git missing
  }
}

const [base, head = "HEAD"] = process.argv.slice(2);
const files = changedFiles(base ?? "", head);

if (files === null) {
  console.log("[needs-notes-lint] cannot resolve the changeset → running notes:lint (fail-safe)");
  process.exit(0);
}

if (needsNotesLint(files)) {
  const why = notesLintRelevantPaths(files);
  console.log(
    `[needs-notes-lint] ${why.length} lint-relevant file(s) changed → running notes:lint` +
      `\n                   e.g. ${why.slice(0, 3).join(", ")}`
  );
  process.exit(0);
}

const n = files.filter((f) => f.trim()).length;
console.log(
  `[needs-notes-lint] ${n} file(s) changed, none under the notes editorial roots → skipping notes:lint` +
    `\n                   (see NOTES_LINT_ROOTS in scripts/lib/needsNotesLint.ts)`
);
process.exit(1);
