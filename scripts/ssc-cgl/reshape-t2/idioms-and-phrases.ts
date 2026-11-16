/**
 * Reshape plan: SSC CGL TIER II English "Idioms and Phrases" (16 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 16 stems and keys (2026-11-15); every key agreed. The ingest spread 16 rows over six theme
 * subtopics of 2-4 rows each, too thin for a page apiece, so they become one page taught by the two ways
 * SSC asks: give the meaning of an idiom, or pick the idiom that fits a sentence. Nothing is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = { idioms: "Idioms: Meaning and Use" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "English",
  chapter: "Idioms and Phrases",
  order: [T.idioms],
  byPrefix: {
    [T.idioms]: [
      "1dd40e7d", "6d1052a2", "81fea314", "d601ecf9", "dbe08742", "e1241230", "ed2b9d40", "f6c0ca88", "89dfe6f4", "a9be0f17",
      "306a5afe", "5a89a25a", "a968096e", "63d83b27", "d239f16c", "fe459470",
    ],
  },
  expected: { [T.idioms]: 16 },
  total: 16,
};

export default plan;
