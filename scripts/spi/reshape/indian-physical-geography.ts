/**
 * Reshape plan: SPI "Indian Geography — Physical Features" (12 q), for scripts/spi/reshape.ts.
 *
 * Read all 12 stems and solutions (2026-10-22). The ingest filed them under 11 one-off subtopics.
 * All are NCERT Class 9 physical-divisions recall, cut here in the book's order of the divisions:
 * the Himalayas and the Northern Plains first, then the Peninsular Plateau, the Indian Desert, the
 * coasts and the islands. Never featured: 9f947e27 (two options are true as printed: Mumbai has
 * mangroves too, the key takes West Bengal).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  north: "The Himalayas and the Northern Plains",
  peninsula: "The Plateau, Desert, Coasts and Islands",
} as const;

const plan: ReshapePlan = {
  chapter: "Indian Geography — Physical Features",
  order: [T.north, T.peninsula],
  byPrefix: {
    [T.north]: ["649048fa", "f0604b6e", "8efd2f12", "e2c1775c", "9be0b4b8"],
    [T.peninsula]: ["f7f5525e", "cda26809", "2a0f6412", "ffcaa483", "9b979d5d", "13c78b43", "9f947e27"],
  },
  // A repeat of 9b979d5d (the eastward extensions of the Central Highlands), skipped at commit by content_hash.
  extra: { "mock-4#129": T.peninsula },
  expected: {
    [T.north]: 5,
    [T.peninsula]: 7,
  },
  total: 12,
};

export default plan;
