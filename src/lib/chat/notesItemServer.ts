/**
 * Reads the notes practice question a student tapped Ask V on (lib/chat/notesItem.ts)
 * from its chapter's own _data module, loaded alone through the generated
 * loader map: never the whole notes registry. Null when the page is not a
 * notes subtopic page, the chapter is unknown, or the item is not on it.
 */
import { NOTES_DATA_LOADERS } from "./notesData.generated";
import { notesItemBrief, notesItemCard, notesPageOf, type NotesItemRef } from "./notesItem";
import type { CardQuestion } from "./questionCard";

export async function loadNotesItemBrief(pagePath: string | null, ref: NotesItemRef): Promise<string | null> {
  const page = notesPageOf(pagePath);
  const load = page ? NOTES_DATA_LOADERS[page.key] : undefined;
  if (!page || !load) return null;
  try {
    const note = (await load())[page.subtopic];
    return note ? notesItemBrief(note, ref) : null;
  } catch (err) {
    console.error("V: notes chapter unavailable", page.key, err);
    return null;
  }
}

/** The card shown above an Ask V tap on a notes item (2026-10-23): its prompt, never its answer. */
export async function loadNotesItemCard(pagePath: string, ref: NotesItemRef): Promise<CardQuestion | null> {
  const page = notesPageOf(pagePath);
  const load = page ? NOTES_DATA_LOADERS[page.key] : undefined;
  if (!page || !load) return null;
  try {
    const note = (await load())[page.subtopic];
    return note ? notesItemCard(note, ref, pagePath) : null;
  } catch (err) {
    console.error("V: notes chapter unavailable", page.key, err);
    return null;
  }
}
