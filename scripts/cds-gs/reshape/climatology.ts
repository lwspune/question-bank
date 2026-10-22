/**
 * Reshape plan: CDS GK Geography "Climatology, Atmosphere and Weather" (55 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 55 stems AND solutions (2026-10-23). Five teaching pages in the order NCERT
 * Class 11 (Fundamentals of Physical Geography, Unit IV) teaches the atmosphere:
 * composition and layers; insolation and temperature; pressure and winds; water in the
 * atmosphere; climate types. The six catalogue subtopics already follow that cut, so they
 * move whole. Cyclones and local winds join the pressure page (both are winds). One row
 * moves alone: water vapour as the Earth's "blanket" (26ff0c0b), filed under Humidity, is
 * an NCERT composition fact, so it joins the other water-vapour row on the atmosphere page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  atmosphere: "Composition and Layers of the Atmosphere",
  temperature: "Insolation and Temperature",
  winds: "Pressure, Winds and Cyclones",
  clouds: "Humidity, Clouds and Precipitation",
  types: "Climate Types",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Climatology, Atmosphere and Weather",
  order: [T.atmosphere, T.temperature, T.winds, T.clouds, T.types],
  whole: {
    "Atmospheric Layers, Composition and Aurora": T.atmosphere,
    "Insolation, Temperature and Solar Geometry": T.temperature,
    "Atmospheric Pressure and Winds": T.winds,
    "Cyclones, Fronts and Local Winds": T.winds,
    "Humidity, Condensation, Clouds and Precipitation": T.clouds,
    "Climate Classification and Zones": T.types,
  },
  byPrefix: {
    // Water vapour acts as a blanket and governs stability (NCERT composition section).
    [T.atmosphere]: ["26ff0c0b"],
  },
  expected: {
    [T.atmosphere]: 12,
    [T.temperature]: 9,
    [T.winds]: 11,
    [T.clouds]: 12,
    [T.types]: 11,
  },
  total: 55,
};

export default plan;
