/**
 * Builds the notes chapter index from the registry: used by scripts/notes/gen-chapter-loaders.ts
 * and its drift test only. Kept apart from chapterIndex.ts so the runtime reader never imports
 * the registry (TECH_DEBT_SPEC.md 2.2 part 2).
 */
import type { NotesChapterRegistration } from "./chapters";
import type { NotesChapterMeta } from "./chapterIndex";
import { formulaPageCounts } from "@/lib/formula/chapterPages";

export function buildNotesChapterIndex(chapters: readonly NotesChapterRegistration[]): NotesChapterMeta[] {
  return chapters.map((c) => {
    // Every field but the content, in the registry's own order; absent optionals stay absent.
    const { chapter, notes, ...rest } = c;
    void notes;
    return { ...rest, slugs: [...c.slugs], chapterName: chapter.chapterName, formulaCounts: formulaPageCounts(c) };
  });
}
