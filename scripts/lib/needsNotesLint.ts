/**
 * Decides whether a changeset warrants running `notes:lint` in the gate.
 *
 * WHY THIS EXISTS. `notes:lint` validates the /notes editorial modules against
 * the LIVE taxonomy + concept tags. It cost 69-76 s in Aug 2026 and 91 s by
 * Sep — it grows with the bank — and it ran on every push. Only a change to
 * the editorial modules, the lint itself, or the schema it reads can move its
 * verdict; a push touching /browse or an ingestion script pays the 91 s and
 * cannot fail it. (Its OTHER failure source — a taxonomy rename landing by
 * ingestion, not by push — is drift, and no commit-diff rule can see it.
 * That class belongs to the daily schedule beside test:prod-contract.)
 *
 * THE POLARITY IS THE OPPOSITE OF needsBuild, deliberately. needsBuild is an
 * allowlist of SKIPS: an unrecognised path builds, so it can only ever be too
 * cautious. That works because most pushes are wholly inert to the compiler.
 * Here the reverse is true — nearly every push touches src/ somewhere — so a
 * skip-allowlist would fire on almost all of them and buy nothing. This is
 * therefore an allowlist of RUNS: the roots notes:lint actually reads.
 *
 * A run-allowlist CAN rot: notes-lint.ts grows an import from a new place and
 * this list never learns. That is why it is PINNED by
 * tests/notes-lint-import-roots.test.ts, which walks the lint's real static
 * import graph (scripts/lib/importGraph.ts) and fails the moment any reachable
 * file lies outside NOTES_LINT_ROOTS. The rule and the guard ship together.
 */

/**
 * Paths whose change can alter notes:lint's verdict. A trailing `/` is a
 * directory root matched on the LEADING segments; anything else is one file.
 */
export const NOTES_LINT_ROOTS = [
  "src/app/notes/", // the editorial modules (every chapter's _data) + their types
  "src/lib/notes/", // NOTES_CHAPTERS registry + the helpers the lint imports
  "scripts/notes-lint.ts", // the lint itself
  "supabase/", // the schema it reads (taxonomy, question_concept_tags)
  "package.json",
  "package-lock.json",
  "tsconfig.json", // the `@/` alias the lint resolves through
] as const;

/** Normalise a raw `git diff --name-only` line for classification. */
function normalise(path: string): string {
  return path.trim().replace(/\\/g, "/");
}

/** True when this file is one notes:lint reads (directly or transitively). */
export function isNotesLintRelevant(path: string): boolean {
  return NOTES_LINT_ROOTS.some((root) =>
    root.endsWith("/") ? path.startsWith(root) : path === root,
  );
}

/**
 * True when at least one changed path could alter the lint's verdict.
 *
 * @param changedPaths Repo-relative paths, e.g. from `git diff --name-only`.
 *                     Blank lines are ignored; separators may be `/` or `\`.
 */
export function needsNotesLint(changedPaths: string[]): boolean {
  return changedPaths
    .map(normalise)
    .filter((p) => p.length > 0)
    .some(isNotesLintRelevant);
}

/** The lint-relevant subset, for logging why the gate chose to run it. */
export function notesLintRelevantPaths(changedPaths: string[]): string[] {
  return changedPaths
    .map(normalise)
    .filter((p) => p.length > 0 && isNotesLintRelevant(p));
}
