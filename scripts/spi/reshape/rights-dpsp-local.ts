/**
 * Reshape plan: SPI "Fundamental Rights, DPSP and Local Governance" (13 q), for scripts/spi/reshape.ts.
 *
 * Read all 13 stems and solutions (2026-10-22). Two pages by what the question is about: the
 * Constitution's rights and Directive Principles (articles and what each right covers), then
 * Panchayati Raj and local government (the three tiers, the Gram Sabha, village officials,
 * decentralisation). Never featured: cf8a02ba (2022 Q123: no single article "lays down" the
 * Directive Principles, which run from Article 36 to 51; the solution carries a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rights: "Fundamental Rights and Directive Principles",
  local: "Panchayati Raj and Local Government",
} as const;

const plan: ReshapePlan = {
  chapter: "Fundamental Rights, DPSP and Local Governance",
  order: [T.rights, T.local],
  byPrefix: {
    [T.rights]: ["cf8a02ba", "5851e968", "81d9aab7", "fb44cefc", "b321c59d", "f26ac86e"],
    [T.local]: ["769a69da", "bad00dc4", "045ae1a0", "97d20042", "28d0c7a2", "0d2864e5", "f186ba89"],
  },
  expected: {
    [T.rights]: 6,
    [T.local]: 7,
  },
  total: 13,
};

export default plan;
