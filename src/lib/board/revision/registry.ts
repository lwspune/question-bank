/**
 * Every board revision sheet, by "<examSlug>/<subjectRoute>/<chapterSlug>"
 * (2026-11-03). Each entry LOADS its sheet on demand, so a chapter page and the
 * download route pull in one chapter's file, never all of them (the notes
 * registry's bundle incident, 2026-10-02).
 *
 * The key is the sheet file's path under ./sheets, and the loader list is
 * generated from those files (`npm run revision:registry`);
 * tests/board-revision-registry.test.ts fails when the two disagree.
 */
import type { RevisionSheet } from "./types";
import type { RevisionTarget } from "./target";
import { SHEET_LOADERS } from "./loaders.generated";

/** Generated from the sheet files by `npm run revision:registry`. */
const LOADERS = SHEET_LOADERS;

export const REVISION_SHEET_KEYS: readonly string[] = Object.keys(LOADERS);

export function revisionKey(t: RevisionTarget): string {
  return `${t.examSlug}/${t.subjectRoute}/${t.chapterSlug}`;
}

export function hasRevisionSheet(t: RevisionTarget): boolean {
  return Object.prototype.hasOwnProperty.call(LOADERS, revisionKey(t));
}

export async function loadRevisionSheet(t: RevisionTarget): Promise<RevisionSheet | null> {
  const key = revisionKey(t);
  if (!Object.prototype.hasOwnProperty.call(LOADERS, key)) return null;
  return (await LOADERS[key]()).default;
}
