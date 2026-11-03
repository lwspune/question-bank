/**
 * Reshape plan: SSC CGL Tier I General Awareness Economics "Indian Economy"
 * (92 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 92 rows (2026-11-01, main session). Cut into the Five-Year Plans, trade and the 1991 crisis, and the Green
 * Revolution with farm schemes; 40d54745 and 1c1bd61c move from the plans subtopic to the Green Revolution. Never
 * featured: 885fc5d9 and 41043e5f (single report figures that are hard to check), 9bc63d8c and cfe3aff3 (opinion-led stems).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  plans: "Five Year Plans and Indian Planning",
  trade: "International Trade and Finance",
  agriculture: "Green Revolution and Farm Schemes",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Indian Economy",
  order: [T.plans, T.trade, T.agriculture],
  byPrefix: {
    [T.plans]: [
      "426c9dbb", "4c20ac2a", "593c8696", "95ffd55e", "c96d8873", "fb8d30b8", "480110f2", "6e9313df",
      "91cbe5a7", "debb16c7", "085aafad", "7fe6c961", "833c7f20", "a41dad2f", "d55aef8d", "f363890b",
      "0c6bc087", "2a5f9fc0", "4ab1404b", "6ea38783", "ba68d93f", "f9092e9d", "38b079f1", "862b8794",
      "8ebbf96a", "b33fb685", "30710f60", "316486cd", "44d5a852", "ccc32398", "44556225", "acfb0596",
      "e6b7a26a", "515e5b1a", "cfe3aff3", "40dc6f44", "7331f8cc", "86bf5bd1", "0b3fbce8",
    ],
    [T.trade]: [
      "1e7e7db2", "51a86c4c", "817d54ea", "56c989af", "2ba595fd", "9f198d82", "885fc5d9", "cdab4997",
      "673decde", "4b441f48", "74b0e8b0", "76f31437", "f08e93b5", "41043e5f", "70488667", "80377693",
      "c48ebd44", "cc30e838", "74fa5139", "15fdafdd", "237a1248", "5d8361fa", "8c549a94", "d8c2f662",
      "f09908f2", "fcf6e5c7", "9bc63d8c",
    ],
    [T.agriculture]: [
      "6f68982f", "becced44", "ef1e0c8d", "01cb7a26", "18ac6485", "24e6c0af", "34247307", "d546ddae",
      "e5d22cdb", "4006b4a0", "6ce23be7", "7cb1a367", "40d54745", "1c1bd61c", "02d32f1f", "4fb4e136",
      "becda512", "c2ba2924", "cdace3eb", "07fc5100", "2c7d26b1", "3247a45c", "80cc3cdf", "bddd79af",
      "d95cbf37", "e973621c",
    ],
  },
  expected: {
    [T.plans]: 39,
    [T.trade]: 27,
    [T.agriculture]: 26,
  },
  total: 92,
};

export default plan;
