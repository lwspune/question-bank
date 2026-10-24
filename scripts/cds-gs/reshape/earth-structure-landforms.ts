/**
 * Reshape plan: CDS GK Geography "Earth's Structure, Landforms and Geological Time" (57 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 57 stems AND solutions (2026-10-22). Five teaching pages that follow the NCERT
 * Class 11 Fundamentals of Physical Geography order: the interior, plates and earthquakes
 * (seismic waves are how we know the interior); volcanoes with the rocks and minerals they
 * make; weathering, mass movement and soils (NCERT's "geomorphic processes" chapter);
 * landforms by agent (rivers, ice, wind, sea, groundwater); and natural hazards (NCERT
 * India Physical Environment, Natural Hazards and Disasters).
 *
 * Single rows placed by prefix:
 * - two earthquake rows about RISK and DAMAGE (seismic zone of Pithoragarh, what decides the
 *   damage) go to the hazards page;
 * - the wind gap row and the karst sinkhole row were filed under weathering but ask about
 *   LANDFORMS, so they go to the landforms page;
 * - creep (filed under landforms) is a mass movement, so it joins weathering.
 * No row asks about geological time, so no page is named for it.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  interior: "Interior, Plates and Earthquakes",
  volcanoes: "Volcanoes, Rocks and Minerals",
  weathering: "Weathering, Mass Movement and Soils",
  landforms: "Landforms of Rivers, Ice, Wind and Sea",
  hazards: "Natural Hazards and Disasters",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Earth's Structure, Landforms and Geological Time",
  order: [T.interior, T.volcanoes, T.weathering, T.landforms, T.hazards],
  whole: {
    "Earth's Interior, Crust and Plate Tectonics": T.interior,
    "Earthquakes and Seismic Waves": T.interior,
    "Volcanoes and Igneous Activity": T.volcanoes,
    "Rocks, Minerals and Geological Time": T.volcanoes,
    "Weathering and Denudation": T.weathering,
    "Soils": T.weathering,
    "Landforms and Mass Movements": T.landforms,
    "Disaster Management and Hazards": T.hazards,
  },
  byPrefix: {
    [T.hazards]: ["5d21b5e5", "7d157a83"],
    [T.landforms]: ["7eadbe23", "4e7d2d48"],
    [T.weathering]: ["f5f2a241"],
  },
  expected: {
    [T.interior]: 11,
    [T.volcanoes]: 11,
    [T.weathering]: 13,
    [T.landforms]: 15,
    [T.hazards]: 7,
  },
  total: 57,
};

export default plan;
