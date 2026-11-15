import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_MB_DNA_NOTE } from "./dna";
import { NEET_BO_MB_REPLICATION_NOTE } from "./replication";
import { NEET_BO_MB_TRANSCRIPTION_NOTE } from "./transcription";
import { NEET_BO_MB_TRANSLATION_NOTE } from "./translation";
import { NEET_BO_MB_OPERON_NOTE } from "./operon";
import { NEET_BO_MB_GENOME_NOTE } from "./genome";

export { NEET_BO_MB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/molecular-basis/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-mb-` here and `nbomb-` on concept slugs.
 *
 * NCERT XII ch.5: DNA, replication, transcription, the code, translation, regulation, the genome.
 */
export const NEET_BO_MB_NOTES: Record<string, SubtopicNote> = {
  "nbo-mb-dna": NEET_BO_MB_DNA_NOTE,
  "nbo-mb-replication": NEET_BO_MB_REPLICATION_NOTE,
  "nbo-mb-transcription": NEET_BO_MB_TRANSCRIPTION_NOTE,
  "nbo-mb-translation": NEET_BO_MB_TRANSLATION_NOTE,
  "nbo-mb-operon": NEET_BO_MB_OPERON_NOTE,
  "nbo-mb-genome": NEET_BO_MB_GENOME_NOTE,
};

export const NEET_BO_MB_SLUGS = Object.keys(NEET_BO_MB_NOTES);
