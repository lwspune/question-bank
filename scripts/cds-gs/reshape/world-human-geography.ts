/**
 * Reshape plan: CDS GK Geography "World and Human Geography" (56 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 56 stems AND solutions (2026-10-23). Nine catalogue subtopics become five teaching
 * pages, ordered the way an atlas teaches: the land (continents, islands and the latitude lines),
 * the water (seas, straits, ports, rivers and lakes), the countries and their borders, the
 * natural vegetation belts with the farming they carry, and last the human geography of
 * population, cities and industry. The political bucket gives up two rows that are really
 * economic geography (the Leipzig/Detroit/Lorraine/Cumberland industrial-region match and the
 * Climax molybdenum mine) to the industry page, which also takes the one-row minerals bucket.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  continents: "Continents, Islands and Latitudes",
  water: "Seas, Straits and Rivers",
  countries: "Countries and Borders",
  biomes: "Biomes and Farming",
  people: "Population, Cities and Industry",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "World and Human Geography",
  order: [T.continents, T.water, T.countries, T.biomes, T.people],
  whole: {
    "World Physical Geography — Continents, Relief and Landmarks": T.continents,
    "World — Coordinates, Time and Place": T.continents,
    "World Ports, Straits and Maritime Geography": T.water,
    "World — Rivers, Canals and Water Bodies": T.water,
    "World Political Geography — Countries, Borders and Regions": T.countries,
    "World Natural Vegetation and Biomes": T.biomes,
    "World Agriculture and Farming Systems": T.biomes,
    "Human Geography — Megacities and Population": T.people,
    "World Minerals, Mining and Resources": T.people,
  },
  byPrefix: {
    // Industrial regions by country (Leipzig, Detroit, Lorraine, Cumberland); the Climax mine.
    [T.people]: ["094e8928", "b71fd3a9"],
  },
  expected: {
    [T.continents]: 14,
    [T.water]: 12,
    [T.countries]: 11,
    [T.biomes]: 8,
    [T.people]: 11,
  },
  total: 56,
};

export default plan;
