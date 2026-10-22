/**
 * Reshape plan: CDS GK Polity "World Polity, Democracy and International Relations" (51 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 51 stems AND solutions (2026-10-23). Five teaching pages, ideas first and then the
 * world bodies: democracy, totalitarianism and the State (the theory questions about kinds of
 * rule and how power is spread); the thinkers named in the options; the United Nations (its
 * Charter organs, agencies, peacekeeping and the SDGs); human rights and the law of the sea
 * (treaties a State signs, so they sit together); India's foreign policy with the regional
 * groupings it belongs to.
 *
 * The catalogue's "Democracy and Political Theory" (17) mixes kinds of rule with "who said
 * it" questions, and "United Nations and Global Institutions" (29) mixes the UN with SAARC,
 * ASEAN and BRICS, so every row is placed by its id prefix. Placement notes:
 * - The ITTO headquarters row (edb8fbe9) is not a UN body but is asked exactly like the ESCAP
 *   headquarters row, so it joins the UN agencies.
 * - The two Law of the Sea rows join the human rights treaties: both are what a treaty binds
 *   a State to.
 * - The three foreign-policy rows (Nehru, Gujral, NAM) open the regional page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  democracy: "Democracy, Totalitarianism and the State",
  thinkers: "Political Thinkers",
  un: "The United Nations",
  rights: "Human Rights and the Law of the Sea",
  regional: "Foreign Policy and Regional Groupings",
} as const;

const plan: ReshapePlan = {
  subject: "Polity",
  chapter: "World Polity, Democracy and International Relations",
  order: [T.democracy, T.thinkers, T.un, T.rights, T.regional],
  whole: {},
  byPrefix: {
    [T.democracy]: [
      "1c3acb91", "f6bcc7b6", "8c5fa645", "50345122",
      "022c69f5", "36861aef", "a6ecb625", "da3a3e8a",
    ],
    [T.thinkers]: [
      "6790ef9d", "db8a110b", "d3cc4174", "7cce83c6", "8649ea24",
      "f4957677", "5e637858", "a0c4abb5", "22ccb05c",
    ],
    [T.un]: [
      "51427c8c", "edb8fbe9", "f98a1f6e", "19b0057e", "0bb540de",
      "a33c1123", "1c6b7817", "5f0681b1", "11834b3c", "3c4f0c57",
      "b638ca4e", "b00ee836", "dff9c09a", "a22cbb85",
    ],
    [T.rights]: [
      "ad779e53", "16816686", "ca61a173", "122ac236", "a5ae1b6b",
      "19f38e09", "721e528f",
    ],
    [T.regional]: [
      "8e3738d0", "fdc690fd", "aaa72fc2", "8ee45048", "0c58ab5f",
      "52512c0f", "1df0f5ac", "8f46f207", "65b5e68a", "4bc60cc1",
      "9c6f8b57", "2aab165f", "47e8e215",
    ],
  },
  expected: {
    [T.democracy]: 8,
    [T.thinkers]: 9,
    [T.un]: 14,
    [T.rights]: 7,
    [T.regional]: 13,
  },
  total: 51,
};

export default plan;
