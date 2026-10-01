/**
 * Reshape plan — CDS GK Chemistry "Metals and Non-Metals" (22 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 22 stems AND solutions (2026-10-01). The classification's split is kept; two pages
 * are renamed for what they teach, and the one-row "Alloys and Their Composition" joins
 * extraction, since both are about getting a usable metal.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  properties: "Properties of Metals, Non-Metals and Metalloids",
  reactivity: "The Reactivity Series",
  extraction: "Extraction of Metals and Alloys",
  corrosion: "Corrosion and Its Prevention",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Metals and Non-Metals",
  order: [T.properties, T.reactivity, T.extraction, T.corrosion],
  whole: {
    "Classification of Elements — Metals, Non-Metals and Metalloids": T.properties,
    "Reactivity Series and Reactions with Water": T.reactivity,
    "Extraction of Metals and Ores": T.extraction,
    "Alloys and Their Composition": T.extraction,
  },
  byPrefix: {},
  expected: { [T.properties]: 5, [T.reactivity]: 8, [T.extraction]: 4, [T.corrosion]: 5 },
  total: 22,
};

export default plan;
