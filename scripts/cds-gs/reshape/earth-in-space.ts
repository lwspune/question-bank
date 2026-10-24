/**
 * Reshape plan: CDS GK Geography "Earth in Space, Maps and Coordinates" (19 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 19 stems AND solutions (2026-10-23). Two teaching pages, outward in first and
 * then down to the map: the solar system (how the Earth and planets formed, the two
 * families of planets, the planet facts CDS asks, and syzygy and eclipses); then the
 * globe (the Earth's shape and spin, latitude, longitude and local time, and the
 * isolines and diagrams of practical geography), in the NCERT Class 6 and Class 11
 * practical order.
 *
 * The one-row "Geographers, Scientists and Discoveries" subtopic is Lowthian Green's
 * tetrahedral hypothesis, an origin theory, so it sits beside the other origin theories
 * on the solar-system page. It could equally be refiled to the chapter that teaches
 * continental drift; the report lists it as a refile candidate.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  solar: "The Solar System",
  globe: "Latitude, Longitude, Time and Maps",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Earth in Space, Maps and Coordinates",
  order: [T.solar, T.globe],
  whole: {
    "Planets and Solar System": T.solar,
    "Geographers, Scientists and Discoveries": T.solar,
    "Earth's Shape, Rotation and Motion": T.globe,
    "Latitude, Longitude and Geographical Grid": T.globe,
    "Time Zones and International Date Line": T.globe,
    "Maps and GPS": T.globe,
  },
  byPrefix: {},
  expected: { [T.solar]: 10, [T.globe]: 9 },
  total: 19,
};

export default plan;
