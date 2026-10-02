import type { SubtopicNote } from "@/app/notes/_types";
import { CDSEN_SYN_METHOD_NOTE } from "./syn-method";
import { CDSEN_SYN_CHARACTER_NOTE } from "./syn-character";
import { CDSEN_SYN_FEELINGS_SPEECH_NOTE } from "./syn-feelings-speech";
import { CDSEN_SYN_LAW_ACTION_NOTE } from "./syn-law-action";
import { CDSEN_SYN_HARM_DEGREE_NOTE } from "./syn-harm-degree";
import { CDSEN_SYN_PHRASES_NOTE } from "./syn-phrases";
import { CDSEN_ANT_METHOD_NOTE } from "./ant-method";
import { CDSEN_ANT_PEOPLE_NOTE } from "./ant-people";
import { CDSEN_ANT_FEELING_NOTE } from "./ant-feeling";
import { CDSEN_ANT_SPEECH_NOTE } from "./ant-speech";
import { CDSEN_ANT_WORTH_NOTE } from "./ant-worth";
import { CDSEN_ANT_CHANGE_NOTE } from "./ant-change";
import { CDSEN_WD_SINGLE_NOTE } from "./wd-single";
import { CDSEN_WD_FORMS_NOTE } from "./wd-forms";
import { CDSEN_WD_MATCH_NOTE } from "./wd-match";
import { CDSEN_WD_BORROWED_NOTE } from "./wd-borrowed";
import { CDSEN_WD_PAIRS_NOTE } from "./wd-pairs";
import { CDSEN_WD_HOMOPHONES_NOTE } from "./wd-homophones";
import { CDSEN_WD_SPELLING_NOTE } from "./wd-spelling";

export { CDSEN_VOCAB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-english/vocabulary/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsen-` here and `cdsen-` on concept slugs.
 *
 * CDS English Vocabulary: 19 pages, re-cut by technique 2026-10-02.
 */
export const CDSEN_VOCAB_NOTES: Record<string, SubtopicNote> = {
  "cdsen-syn-method": CDSEN_SYN_METHOD_NOTE,
  "cdsen-syn-character": CDSEN_SYN_CHARACTER_NOTE,
  "cdsen-syn-feelings-speech": CDSEN_SYN_FEELINGS_SPEECH_NOTE,
  "cdsen-syn-law-action": CDSEN_SYN_LAW_ACTION_NOTE,
  "cdsen-syn-harm-degree": CDSEN_SYN_HARM_DEGREE_NOTE,
  "cdsen-syn-phrases": CDSEN_SYN_PHRASES_NOTE,
  "cdsen-ant-method": CDSEN_ANT_METHOD_NOTE,
  "cdsen-ant-people": CDSEN_ANT_PEOPLE_NOTE,
  "cdsen-ant-feeling": CDSEN_ANT_FEELING_NOTE,
  "cdsen-ant-speech": CDSEN_ANT_SPEECH_NOTE,
  "cdsen-ant-worth": CDSEN_ANT_WORTH_NOTE,
  "cdsen-ant-change": CDSEN_ANT_CHANGE_NOTE,
  "cdsen-wd-single": CDSEN_WD_SINGLE_NOTE,
  "cdsen-wd-forms": CDSEN_WD_FORMS_NOTE,
  "cdsen-wd-match": CDSEN_WD_MATCH_NOTE,
  "cdsen-wd-borrowed": CDSEN_WD_BORROWED_NOTE,
  "cdsen-wd-pairs": CDSEN_WD_PAIRS_NOTE,
  "cdsen-wd-homophones": CDSEN_WD_HOMOPHONES_NOTE,
  "cdsen-wd-spelling": CDSEN_WD_SPELLING_NOTE,
};

export const CDSEN_VOCAB_SLUGS = Object.keys(CDSEN_VOCAB_NOTES);
