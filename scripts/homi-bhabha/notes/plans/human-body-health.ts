/**
 * Reshape plan: Homi Bhabha Std IX "Human Body and Health" (38 q), for scripts/homi-bhabha/reshape.ts.
 *
 * Read all 38 stems and solutions. Cut by what a question asks: food and the body's organs (vitamin
 * and fat sources, teeth, the diaphragm), blood and the heart, the nervous system with the brain and
 * the sense organs, and diseases (pathogens, how they spread, vaccines and tobacco). Never featured
 * (notice or no key): 0e4b93e5 (taste map), 58d3363b (order of teething), e4f6c4bb (cholera, two
 * options fit), 180dbfdf (two contagious trios), 24bce643 (bird flu is H5N1; no option, no key).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  nutrition: "Nutrition and Body Organs",
  blood: "Blood and Circulation",
  nerves: "Nervous System and Sense Organs",
  diseases: "Diseases and Their Prevention",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Human Body and Health",
  order: [T.nutrition, T.blood, T.nerves, T.diseases],
  byPrefix: {
    [T.nutrition]: ["11e1f6f9", "25fe937f", "58d3363b", "3721bd38"],
    [T.blood]: ["7ea7a7aa", "e50a36b6", "0d82f33b", "995258b9", "f3cf68c8", "33c16e37", "78bb12f1", "a77cd7f8", "5b2a6012"],
    [T.nerves]: ["91699207", "d8355da2", "5d8f22c1", "63a88fe5", "3e607331", "a31477c0", "cc17e2e4", "0e4b93e5", "734b8feb", "296cff4c"],
    [T.diseases]: [
      "e429ac2e", "29749376", "2b3b61e8", "ac64926c", "24bce643", "39fe7dc2",
      "3a86c4d0", "41d0f147", "0ae6837f", "e4f6c4bb", "180dbfdf",
      "24adca7e", "8629b927", "bf00f675", "d493c0b5",
    ],
  },
  expected: { [T.nutrition]: 4, [T.blood]: 9, [T.nerves]: 10, [T.diseases]: 15 },
  total: 38,
};

export default plan;
