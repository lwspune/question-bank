import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_ID_DECODE_NOTE } from "./id-decode";
import { CDSEN_ID_FEELINGS_NOTE } from "./id-feelings";
import { CDSEN_ID_CHARACTER_NOTE } from "./id-character";
import { CDSEN_ID_SPEECH_NOTE } from "./id-speech";
import { CDSEN_ID_FORTUNE_NOTE } from "./id-fortune";
import { CDSEN_ID_WORK_NOTE } from "./id-work";
import { CDSEN_ID_TIME_NOTE } from "./id-time";

export { CDSEN_IDIOMS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/idioms-and-phrases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Idioms and Phrases: 7 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_IDIOMS_NOTES: Record<string, SubtopicNote> = {
  "cdsen-id-decode": CDSEN_ID_DECODE_NOTE,
  "cdsen-id-feelings": CDSEN_ID_FEELINGS_NOTE,
  "cdsen-id-character": CDSEN_ID_CHARACTER_NOTE,
  "cdsen-id-speech": CDSEN_ID_SPEECH_NOTE,
  "cdsen-id-fortune": CDSEN_ID_FORTUNE_NOTE,
  "cdsen-id-work": CDSEN_ID_WORK_NOTE,
  "cdsen-id-time": CDSEN_ID_TIME_NOTE,
};

export const CDSEN_IDIOMS_SLUGS = Object.keys(CDSEN_IDIOMS_NOTES);
