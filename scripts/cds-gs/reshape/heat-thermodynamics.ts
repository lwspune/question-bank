/**
 * Reshape plan: CDS GK Physics "Heat and Thermodynamics" (13 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 13 stems AND solutions (2026-10-23). Two teaching pages. The first is temperature
 * and how heat moves: the Kelvin, Celsius and Fahrenheit scales, conduction, convection and
 * radiation, and the calorimetry principle (heat lost = heat gained). The second is what heat
 * does to matter: evaporation and latent heat, the triple point, the ideal gas and the
 * Joule-Thomson process. The catalogue's "Heat, Calorimetry and Specific Heat" held two
 * convection rows and a latent-heat row, so its four rows are placed one by one.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  transfer: "Temperature and Heat Transfer",
  state: "Change of State and Gases",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Heat and Thermodynamics",
  order: [T.transfer, T.state],
  whole: {
    "Temperature and Thermometry": T.transfer,
    "Modes of Heat Transfer — Conduction, Convection and Radiation": T.transfer,
    "Phase Change and Boiling": T.state,
    "Thermodynamic Processes": T.state,
  },
  byPrefix: {
    [T.transfer]: ["09000e12", "d3bb1d89", "86a6408c"],
    [T.state]: ["e0c1749d"],
  },
  expected: { [T.transfer]: 8, [T.state]: 5 },
  total: 13,
};

export default plan;
