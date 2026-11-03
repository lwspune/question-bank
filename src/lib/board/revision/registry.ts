/**
 * Every board revision sheet, by "<examSlug>/<subjectRoute>/<chapterSlug>"
 * (2026-11-03). Each entry LOADS its sheet on demand, so a chapter page and the
 * download route pull in one chapter's file, never all of them (the notes
 * registry's bundle incident, 2026-10-02).
 *
 * The key is the sheet file's path under ./sheets; tests/board-revision-
 * registry.test.ts fails on a file that is not registered here, or registered
 * under another address.
 */
import type { RevisionSheet } from "./types";
import type { RevisionTarget } from "./target";

type Loader = () => Promise<{ default: RevisionSheet }>;

const LOADERS: Record<string, Loader> = {
  "mh-hsc-12/physics/rotational-dynamics": () => import("./sheets/mh-hsc-12/physics/rotational-dynamics"),
  "mh-hsc-12/physics/mechanical-properties-of-fluids": () =>
    import("./sheets/mh-hsc-12/physics/mechanical-properties-of-fluids"),
  "mh-hsc-12/physics/kinetic-theory-of-gases-and-radiation": () =>
    import("./sheets/mh-hsc-12/physics/kinetic-theory-of-gases-and-radiation"),
};

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
