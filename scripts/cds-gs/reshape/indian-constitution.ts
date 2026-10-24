/**
 * Reshape plan: CDS GK Polity "Indian Constitution — Making, Foundation and Amendments" (82 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 82 stems AND solutions (2026-10-23). Seven teaching pages, foundations first:
 * how the Assembly made the Constitution; where its features came from and what the Preamble
 * says; the Parts and Schedules a question names by number (with citizenship, which is Part II);
 * the Union and its States (Articles 1 to 4, the federal nature, Articles 370 and 371, the Union
 * Territories); Centre-State relations (the three Lists and the commissions and councils);
 * amending the Constitution (Article 368, basic structure, amendments by number); and the
 * emergency provisions.
 *
 * Single rows placed by prefix: Article 395's repeal of the 1935 and 1947 Acts is the end of the
 * making story; the four Preamble rows and the borrowed-features row make their own page; the
 * Sindhi row (an amendment of 1967) is an Eighth Schedule question; "Union of States" in the
 * Draft Constitution and "quasi-federal" are the federal nature of the Union; the Seventh
 * Schedule list rows and the Sarkaria, Punchhi, Inter-State Council, Zonal Council and special
 * category rows are Centre-State relations.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  making: "Making of the Constitution",
  preamble: "Sources and the Preamble",
  schedules: "Parts, Schedules and Citizenship",
  states: "The Union and the States",
  relations: "Centre-State Relations",
  amendments: "Amending the Constitution",
  emergency: "Emergency Provisions",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "Indian Constitution — Making, Foundation and Amendments",
  order: [T.making, T.preamble, T.schedules, T.states, T.relations, T.amendments, T.emergency],
  whole: {
    "Making of Constitution and Constitutional History": T.making,
    "Features, Parts and Schedules of Constitution": T.schedules,
    Citizenship: T.schedules,
    "Federal Structure — States, UTs and Finance": T.states,
    "Constitutional Amendments": T.amendments,
    "Emergency Provisions": T.emergency,
  },
  byPrefix: {
    // Article 395 repealed the 1935 and 1947 Acts: the last step of the making story.
    [T.making]: ["54683caa"],
    // Borrowed features, and the Preamble's words and its 1976 changes.
    [T.preamble]: ["a0ed71e3", "c26cb036", "5e053c40", "c9403d6c", "9c14f05b"],
    // Sindhi added to the Eighth Schedule in 1967.
    [T.schedules]: ["3d0492cf"],
    // "Union of States" in the Draft Constitution; the quasi-federal form.
    [T.states]: ["2e3e9078", "68d74094"],
    // The three Lists, and the commissions and councils on Centre-State relations.
    [T.relations]: [
      "2325a50a", "9268a65b", "798cf956", "72eeab87", "dc33078d",
      "9ad4499d", "e1b37e7d", "6523fe7b", "862841dd",
    ],
  },
  expected: {
    [T.making]: 11,
    [T.preamble]: 5,
    [T.schedules]: 15,
    [T.states]: 16,
    [T.relations]: 9,
    [T.amendments]: 16,
    [T.emergency]: 10,
  },
  total: 82,
};

export default plan;
