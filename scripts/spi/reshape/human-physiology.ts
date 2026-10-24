/**
 * Reshape plan: SPI "Human Physiology" (13 q), for scripts/spi/reshape.ts.
 *
 * Read all 13 stems and solutions (2026-10-22). The ingest filed them under 13 one-off subtopics.
 * Cut here the way the Class 10 book cuts them: the life processes (digestion, breathing, blood and
 * the heart, urine), then control and coordination (brain, nerves, glands). Never featured:
 * 4a6481f7 and 8c350354 (both rest on a figure; 8c350354's options are pictures).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  life: "Life Processes in Humans",
  control: "Control and Coordination",
} as const;

const plan: ReshapePlan = {
  chapter: "Human Physiology",
  order: [T.life, T.control],
  byPrefix: {
    [T.life]: ["6f653e61", "8667a19b", "bd70922b", "391b3e18", "d2b754e7", "31e164bc", "4a6481f7", "2f24b796"],
    [T.control]: ["3b188ca7", "8c350354", "c2d46a80", "612ee210", "548dc027"],
  },
  expected: {
    [T.life]: 8,
    [T.control]: 5,
  },
  total: 13,
};

export default plan;
