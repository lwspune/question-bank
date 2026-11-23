/**
 * Reshape plan: SPI "Time, Speed and Distance" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-11-22). The chapter reached 5 questions with the 2026 paper;
 * the ingest filed them under four one-off subtopics. One page: average speed, relative speed of
 * trains, boats and streams. Never featured: 7b60a44e (2022 Q33 gives no speed for the second
 * train) and adcb0ede (2022 Q26: no printed option is the day's average).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  speed: "Average Speed, Trains and Streams",
} as const;

const plan: ReshapePlan = {
  chapter: "Time, Speed and Distance",
  order: [T.speed],
  byPrefix: {
    [T.speed]: ["fcd4f04b", "adcb0ede", "96774587", "7b60a44e", "cad2ced7"],
  },
  expected: {
    [T.speed]: 5,
  },
  total: 5,
};

export default plan;
