import type { SubtopicNote } from "@/app/notes/_types";
import { INTERIOR_PLATE_TECTONICS_NOTE } from "./interior-plate-tectonics";
import { EARTHQUAKES_SEISMIC_NOTE } from "./earthquakes-seismic";
import { VOLCANOES_IGNEOUS_NOTE } from "./volcanoes-igneous";
import { ROCKS_MINERALS_TIME_NOTE } from "./rocks-minerals-time";
import { WEATHERING_DENUDATION_NOTE } from "./weathering-denudation";
import { LANDFORMS_MASS_MOVEMENTS_NOTE } from "./landforms-mass-movements";
import { SOILS_NOTE } from "./soils";

export { EARTHS_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-geography/earths-structure/[subtopicSlug].
 * Keys are GLOBALLY-unique (`esl-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const EARTHS_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "esl-interior-plate-tectonics": INTERIOR_PLATE_TECTONICS_NOTE,
  "esl-earthquakes-seismic": EARTHQUAKES_SEISMIC_NOTE,
  "esl-volcanoes-igneous": VOLCANOES_IGNEOUS_NOTE,
  "esl-rocks-minerals-time": ROCKS_MINERALS_TIME_NOTE,
  "esl-weathering-denudation": WEATHERING_DENUDATION_NOTE,
  "esl-landforms-mass-movements": LANDFORMS_MASS_MOVEMENTS_NOTE,
  "esl-soils": SOILS_NOTE,
};

export const EARTHS_STRUCTURE_SLUGS = Object.keys(EARTHS_STRUCTURE_NOTES);
