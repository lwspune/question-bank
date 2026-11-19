/**
 * Reshape plan: Homi Bhabha Std IX "Scientists and Discoveries" (17 q), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 17 stems and solutions. The ingest filed them under three subtopics; cut here by what a
 * question asks: who discovered or invented what (life science and medicine; chemistry, technology
 * and the monsoon), the Nobel and Shanti Swarup Bhatnagar prizes, and where India's space centres
 * and research institutes are. Never featured: 71e35e5f (carries a notice: the 2017 chemistry prize
 * was shared, so two options fit).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  scientists: "Scientists and Their Work",
  awards: "Science Awards",
  institutes: "Scientific Institutions",
} as const;

const plan: ReshapePlan = {
  subject: "General Science",
  chapter: "Scientists and Discoveries",
  order: [T.scientists, T.awards, T.institutes],
  byPrefix: {
    [T.scientists]: ["602b5d2e", "a002081c", "50e3c7f4", "a9c8adc3", "5dfbb13c", "05f82a3f", "20ac1b12", "a0567eb1"],
    [T.awards]: ["3eb52d0b", "2dd18481", "71e35e5f", "c05906ba"],
    [T.institutes]: ["512d8395", "4451b56e", "6dd301e4", "213f3300", "844e92a7"],
  },
  expected: { [T.scientists]: 8, [T.awards]: 4, [T.institutes]: 5 },
  total: 17,
};

export default plan;
