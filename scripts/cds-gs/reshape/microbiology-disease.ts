/**
 * Reshape plan: CDS GK Biology "Microbiology and Disease" (18 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 18 stems AND solutions (2026-10-23). Two teaching pages. The first is the germs and how
 * they spread: diseases by kind of pathogen, viruses (HIV, RNA viruses, dengue), the routes of
 * spread with the malaria mosquito, and the words endemic, epidemic and pandemic. The second is how
 * disease is prevented and treated: Jenner's vaccine, how antibiotics work and why they fail against
 * viruses, and the AYUSH systems with their national institutes. The one antibiotic-versus-vaccine
 * row filed under pathogens joins the second page; the malaria-vector row joins the first.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  pathogens: "Pathogens and Their Spread",
  cures: "Vaccines, Antibiotics and AYUSH",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Microbiology and Disease",
  order: [T.pathogens, T.cures],
  whole: {
    "Pathogens and Diseases": T.pathogens,
    "Disease Vectors — Malaria": T.pathogens,
    "Antibiotics — Discovery": T.cures,
    "Traditional Medicine and Public Health Systems": T.cures,
  },
  byPrefix: {
    [T.cures]: ["fc311c5c"],
  },
  expected: { [T.pathogens]: 12, [T.cures]: 6 },
  total: 18,
};

export default plan;
