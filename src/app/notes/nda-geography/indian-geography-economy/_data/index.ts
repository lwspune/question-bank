import type { SubtopicNote } from "@/app/notes/_types";
import { AGRICULTURE_CROPS_SOILS_NOTE } from "./agriculture-crops-soils";
import { MINERALS_MINING_NOTE } from "./minerals-mining";
import { ENERGY_INDUSTRIES_NOTE } from "./energy-industries";
import { ECONOMIC_SECTORS_SCHEMES_NOTE } from "./economic-sectors-schemes";
import { HIGHWAYS_RAILWAYS_TRANSPORT_NOTE } from "./highways-railways-transport";
import { PORTS_MARITIME_NOTE } from "./ports-maritime";

export { INDIAN_GEOGRAPHY_ECONOMY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-geography/indian-geography-economy/[subtopicSlug].
 * Keys are GLOBALLY-unique (`ige-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const INDIAN_GEOGRAPHY_ECONOMY_NOTES: Record<string, SubtopicNote> = {
  "ige-agriculture-crops-soils": AGRICULTURE_CROPS_SOILS_NOTE,
  "ige-minerals-mining": MINERALS_MINING_NOTE,
  "ige-energy-industries": ENERGY_INDUSTRIES_NOTE,
  "ige-economic-sectors-schemes": ECONOMIC_SECTORS_SCHEMES_NOTE,
  "ige-highways-railways-transport": HIGHWAYS_RAILWAYS_TRANSPORT_NOTE,
  "ige-ports-maritime": PORTS_MARITIME_NOTE,
};

export const INDIAN_GEOGRAPHY_ECONOMY_SLUGS = Object.keys(
  INDIAN_GEOGRAPHY_ECONOMY_NOTES,
);
