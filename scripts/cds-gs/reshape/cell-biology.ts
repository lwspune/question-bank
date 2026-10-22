/**
 * Reshape plan: CDS GK Biology "Cell Biology" (41 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 41 stems AND solutions (2026-10-23). Four teaching pages, from the outside of a cell
 * inwards. First the kinds of cell and the microscope used to see them (prokaryote against
 * eukaryote). Then the boundary: cell wall, plasma membrane, osmosis and active transport. Then
 * the organelles, with ATP and pyruvate on the mitochondria. Last the nucleus and cell division:
 * the cells that have no nucleus (red cells, platelets), the nuclear envelope, where RNA is found,
 * mitosis and cancer. Three rows filed under "Cell Organelles and Functions" are about the nucleus,
 * so they move to that page by prefix.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  kinds: "Kinds of Cells and the Microscope",
  boundary: "Cell Wall, Membrane and Transport",
  organelles: "Cell Organelles",
  nucleus: "The Nucleus and Cell Division",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Cell Biology",
  order: [T.kinds, T.boundary, T.organelles, T.nucleus],
  whole: {
    Microscopy: T.kinds,
    "Prokaryotic vs Eukaryotic Cells": T.kinds,
    "Cell Wall and Cell Membrane": T.boundary,
    "Osmosis and Tonicity": T.boundary,
    "Cell Organelles and Functions": T.organelles,
    "Cellular Respiration and ATP": T.organelles,
    "Cell Structure Fundamentals": T.nucleus,
    "Cell Division and DNA Replication": T.nucleus,
  },
  byPrefix: {
    [T.nucleus]: ["356098a4", "ed532432", "8f34bd54"],
  },
  expected: { [T.kinds]: 7, [T.boundary]: 11, [T.organelles]: 17, [T.nucleus]: 6 },
  total: 41,
};

export default plan;
