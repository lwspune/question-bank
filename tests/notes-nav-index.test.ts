/**
 * The notes NAV reads a small generated index, never the full registry.
 *
 * WHY (2026-10-02). `AppHeader` is on every page and builds its notes links
 * through `notesNav`, which imported `NOTES_CHAPTERS` — and with it all 1,884
 * notes `_data` modules — only to read four facts per chapter. Every page's
 * server render, and every one of the build's 4 workers, held the whole
 * corpus; a cold build filled 15.6 GB of RAM and the page file ran the disk to
 * zero. The index is generated from the registry and committed; this test is
 * the drift check, and the second block keeps the shell off the registry.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";
import { buildNotesNavIndex } from "@/lib/notes/notesNavIndex";
import { collectImports } from "../scripts/lib/importGraph";

const REPO = path.resolve(__dirname, "..");

function readRepoFile(rel: string): string | null {
  try {
    const st = fs.statSync(path.join(REPO, rel));
    if (!st.isFile()) return null;
    return fs.readFileSync(path.join(REPO, rel), "utf8");
  } catch {
    return null;
  }
}

const isNotesContent = (rel: string) =>
  rel === "src/lib/notes/chapters.ts" || /^src\/app\/notes\/.+\/_data\//.test(rel);

describe("notes nav index", () => {
  it("keeps exactly the four facts the nav reads, per chapter, in registry order", () => {
    expect(buildNotesNavIndex(NOTES_CHAPTERS.slice(0, 1))).toEqual([
      {
        examName: NOTES_CHAPTERS[0].examName,
        subjectRoute: NOTES_CHAPTERS[0].subjectRoute,
        subjectDisplay: NOTES_CHAPTERS[0].subjectDisplay,
        chapterSlug: NOTES_CHAPTERS[0].chapterSlug,
        subtopicCount: NOTES_CHAPTERS[0].slugs.length,
      },
    ]);
  });

  it("the committed index matches the registry — run `npm run notes:nav-index` after shipping a chapter", () => {
    expect(NOTES_NAV_INDEX).toEqual(buildNotesNavIndex(NOTES_CHAPTERS));
  });
});

describe("the page shell does not load the notes corpus", () => {
  it("AppHeader's value imports never reach lib/notes/chapters.ts or a notes _data module", () => {
    const reached = [...collectImports("src/components/AppHeader.tsx", readRepoFile, { valueOnly: true })];
    expect(reached.filter(isNotesContent)).toEqual([]);
  });
});
