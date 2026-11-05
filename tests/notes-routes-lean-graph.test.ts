/**
 * A /notes chapter or subtopic route loads ONE chapter's content, not the whole notes corpus.
 *
 * WHY (TECH_DEBT_SPEC.md 2.2 part 2, measured 2026-11-05): NotesChapterLanding's value imports
 * reached 3,600 modules, 3,062 of them notes `_data` files, through lib/notes/keepGoing.ts and
 * lib/formula/chapterPages.ts (NotesSubtopicPage: 3,791 through keepGoing.ts), so every notes
 * route carried the corpus; a dev server ran out of its default heap after ~22 such routes.
 * The same lesson as AppHeader on 2026-10-02, where dropping the registry from the shell cut
 * the /pricing server bundle from 50.6 MB to 21 KB. The routes now read the generated chapter
 * index and import a chapter's `_data` lazily (src/lib/notes/chapterLoaders.generated.ts).
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { collectImports } from "../scripts/lib/importGraph";

const REPO = path.resolve(__dirname, "..");

function readRepoFile(rel: string): string | null {
  try {
    const p = path.join(REPO, rel);
    return fs.statSync(p).isFile() ? fs.readFileSync(p, "utf8") : null;
  } catch {
    return null;
  }
}

/**
 * The generated loader is the ONE allowed gateway: its `import()`s become one lazy chunk per
 * chapter, loaded only when that chapter renders. Read it as a leaf so its targets do not count;
 * any OTHER path to the corpus is the regression this test exists for.
 */
const GATEWAY = "src/lib/notes/chapterLoaders.generated.ts";
const read = (rel: string) => (rel === GATEWAY ? (readRepoFile(rel) === null ? null : "") : readRepoFile(rel));

const isCorpus = (f: string) => f === "src/lib/notes/chapters.ts" || f.includes("/_data/") || f.startsWith("src/lib/sites/imat/notes/");

describe("notes routes stay lean", () => {
  for (const entry of [
    "src/app/notes/_components/notesRoutes.tsx",
    "src/app/notes/_components/NotesChapterLanding.tsx",
    "src/app/notes/_components/NotesSubtopicPage.tsx",
  ]) {
    it(`${path.basename(entry)}'s value imports never reach the notes registry or a chapter's content`, () => {
      const reached = [...collectImports(entry, read, { valueOnly: true })];
      expect(reached.filter(isCorpus)).toEqual([]);
    });
  }
});
