/**
 * Reshape plan: Homi Bhabha Std IX "Elements and Periodic Classification" (16 q, every paper but
 * 2017), for scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 16 stems and solutions. The ingest filed them under four subtopics; cut here by what a
 * question asks: symbols of elements (Dalton's signs, Latin names, atomic numbers) with formulae
 * and valency, then metals, non-metals and metalloids with the periodic table (size across a
 * period, halogens, noble gases). No row carries a notice. Not featured: 641c03e1 (carbon also
 * gives an acidic gas; only "bad conductor" rules it out, and graphite conducts).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  symbols: "Symbols, Formulae and Valency",
  periodic: "Metals, Non-metals and the Periodic Table",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Elements and Periodic Classification",
  order: [T.symbols, T.periodic],
  byPrefix: {
    [T.symbols]: ["1f6d8371", "1e670ebe", "56eb6b41", "cd40fd56", "7f83b610", "9b7d9ffa", "3235928f", "414838bb", "e796fa23"],
    [T.periodic]: ["189d0b8f", "b8c8a370", "641c03e1", "2896a2ec", "7081f624", "b68327c5", "6cdc26cf"],
  },
  expected: { [T.symbols]: 9, [T.periodic]: 7 },
  total: 16,
};

export default plan;
