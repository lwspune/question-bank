/**
 * Reshape plan: CDS GK Geography "Oceanography" (20 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 20 stems AND solutions (2026-10-23). Two teaching pages in the NCERT Class 11
 * order (Fundamentals of Physical Geography, "Water (Oceans)" then "Movements of Ocean
 * Water"): first what the ocean is (the relief of its floor, the salt in its water, and
 * the coral reefs that grow only in warm, clear, salty shallows); then how ocean water
 * moves (tides, currents, gyres and El Nino).
 *
 * The catalogue's five subtopics fold into these two pages wholesale, except one row:
 * the 2026 (I) Sargasso Sea statement item was filed under salinity, but its first
 * statement (a sea bounded by currents, not land) is about the North Atlantic gyre, so it
 * joins the other Sargasso row on the currents page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  floor: "Sea Floor, Salinity and Coral Reefs",
  currents: "Tides and Ocean Currents",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Oceanography",
  order: [T.floor, T.currents],
  whole: {
    "Ocean Waves and Sea-Floor Topography": T.floor,
    "Salinity and Composition of Sea Water": T.floor,
    "Marine Ecosystems — Coral Reefs": T.floor,
    "Tides and Ocean Movements": T.currents,
    "Ocean Currents": T.currents,
  },
  byPrefix: {
    // The Sargasso Sea: no land boundary (a gyre) and its salinity.
    [T.currents]: ["af6a2746"],
  },
  expected: { [T.floor]: 9, [T.currents]: 11 },
  total: 20,
};

export default plan;
