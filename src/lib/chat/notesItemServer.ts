/**
 * Reads the notes practice question a student tapped Ask V on (lib/chat/notesItem.ts)
 * from its chapter's own _data module, loaded alone through the generated
 * loader map: never the whole notes registry. Null when the page is not a
 * notes subtopic page, the chapter is unknown, or the item is not on it.
 */
import { NOTES_DATA_LOADERS } from "./notesData.generated";
import { notesItemBrief, notesPageOf, type NotesItemRef } from "./notesItem";

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
