/**
 * Reshape plan: Homi Bhabha Std IX "Heredity and Evolution" (23 q, every one of the eight papers),
 * for scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 23 stems and solutions. Every row is on heredity; none is on evolution. The ingest filed
 * them under four subtopics; cut here by what a question asks: DNA, the shapes of chromosomes and
 * chromosome numbers; Mendel's ratios and the sickle-cell crosses with the disease itself; and the
 * chromosomal and mitochondrial disorders. 453773e2 (Nov 2021) and fb36c394 (2023) are the same
 * chromosome-shape question. No row carries a notice.
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  dna: "DNA and Chromosomes",
  mendel: "Inheritance and Sickle Cell Anaemia",
  disorders: "Chromosomal and Mitochondrial Disorders",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Heredity and Evolution",
  order: [T.dna, T.mendel, T.disorders],
  byPrefix: {
    [T.dna]: ["92afb648", "5a984807", "f7ad4542", "b2cc0684", "b3792b81", "453773e2", "fb36c394", "478b7b50", "54ca6186", "0481b949"],
    [T.mendel]: ["a641ddae", "6856dfc2", "755e9b42", "00f43b67", "7c337952"],
    [T.disorders]: ["fa997d61", "bcf52381", "4a45b9dd", "da243b43", "e8141274", "02267ab1", "488425e3", "a4245056"],
  },
  expected: { [T.dna]: 10, [T.mendel]: 5, [T.disorders]: 8 },
  total: 23,
};

export default plan;
