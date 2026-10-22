/**
 * Reshape plan: CDS GK Physics "Modern Physics" (15 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 15 stems AND solutions (2026-10-23). Two teaching pages: light as photons first
 * (photon energy and momentum, atomic energy levels and the atomic clock, X-rays), then the
 * nucleus (the particles, radioactive decay, fission and fusion). The atomic-clock row
 * (895c08c5) was filed under Atomic Structure, but it turns on an atom absorbing radiation of
 * one exact frequency, so it joins the photon page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  photons: "Photons and X-rays",
  nuclei: "Atoms and Nuclei",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Modern Physics",
  order: [T.photons, T.nuclei],
  whole: {
    "Quantum and Modern EM": T.photons,
    "Atomic Structure": T.nuclei,
    "Nuclear Physics": T.nuclei,
  },
  byPrefix: {
    // How an atomic clock works: the resonant frequency of a caesium atom.
    [T.photons]: ["895c08c5"],
  },
  expected: { [T.photons]: 7, [T.nuclei]: 8 },
  total: 15,
};

export default plan;
