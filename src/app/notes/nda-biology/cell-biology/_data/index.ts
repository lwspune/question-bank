import type { SubtopicNote } from "@/app/notes/_types";
import { CELL_STRUCTURE_FUNDAMENTALS_NOTE } from "./structure-fundamentals";
import { CELL_MICROSCOPY_NOTE } from "./microscopy";
import { CELL_WALL_AND_MEMBRANE_NOTE } from "./wall-and-membrane";
import { CELL_ORGANELLES_NOTE } from "./organelles";
import { CELL_PROKARYOTIC_EUKARYOTIC_NOTE } from "./prokaryotic-eukaryotic";
import { CELL_OSMOSIS_TONICITY_NOTE } from "./osmosis-tonicity";
import { CELL_RESPIRATION_ATP_NOTE } from "./respiration-atp";
import { CELL_DIVISION_REPLICATION_NOTE } from "./division-replication";

export { CELL_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/cell-biology/[subtopicSlug].
 * Keys are GLOBALLY-unique (`cell-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CELL_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "cell-structure-fundamentals": CELL_STRUCTURE_FUNDAMENTALS_NOTE,
  "cell-microscopy": CELL_MICROSCOPY_NOTE,
  "cell-wall-and-membrane": CELL_WALL_AND_MEMBRANE_NOTE,
  "cell-organelles": CELL_ORGANELLES_NOTE,
  "cell-prokaryotic-eukaryotic": CELL_PROKARYOTIC_EUKARYOTIC_NOTE,
  "cell-osmosis-tonicity": CELL_OSMOSIS_TONICITY_NOTE,
  "cell-respiration-atp": CELL_RESPIRATION_ATP_NOTE,
  "cell-division-replication": CELL_DIVISION_REPLICATION_NOTE,
};

export const CELL_BIOLOGY_SLUGS = Object.keys(CELL_BIOLOGY_NOTES);
