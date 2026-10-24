/**
 * Reshape plan: SPI "Mole Concept and Stoichiometry" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). The ingest filed them under 6 one-off subtopics.
 * Cut here by technique: the language of formulae (laws of chemical combination, atomicity, valency
 * and writing a formula), then counting particles (the mole and Avogadro's number, atoms in a given
 * number of moles, and the faradays needed to deposit a mole of a metal). Never featured: 4fa0124d
 * ("different numbers of atoms" and "flask II has more" are both true as printed).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  formulae: "Laws of Combination and Chemical Formulae",
  mole: "The Mole and Avogadro's Number",
} as const;

const plan: ReshapePlan = {
  chapter: "Mole Concept and Stoichiometry",
  order: [T.formulae, T.mole],
  byPrefix: {
    [T.formulae]: ["51ed336d", "100def28", "3609412a"],
    [T.mole]: ["bc5b8193", "4fa0124d", "51dac406"],
  },
  expected: {
    [T.formulae]: 3,
    [T.mole]: 3,
  },
  total: 6,
};

export default plan;
