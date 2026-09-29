/**
 * Reshape plan — CDS "Sets" (28 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 28 stems AND solutions (2026-09-29). The three classification buckets mixed two skills:
 * reading sets themselves (difference, null and singleton sets, finite and infinite, elements that
 * are sets, the largest subset avoiding a sum) and COUNTING with Venn diagrams (inclusion-exclusion
 * for two and three sets). Each gets a page. Premise sets (the Class XII subjects, the three
 * newspapers, the 500 candidates) all sit on the counting page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sets: "Sets and Set Operations",
  venn: "Venn Diagrams and Inclusion-Exclusion",
} as const;

const plan: ReshapePlan = {
  chapter: "Sets",
  order: [T.sets, T.venn],
  whole: {},
  byPrefix: {
    [T.sets]: ["723ae557", "552ff809", "4059fa26", "e278f1b8", "55a73583", "016aa057", "835285ef", "ba03e9fe"],
    [T.venn]: [
      "034f3103", "2467b783", "f127a690", "a4049486", "32024fc6", "613d40f6", "e380cfb7", "de33068a",
      "d3bda49f", "6f378ca7", "094d3f64", "0de62af5", "ce2de0bb", "64cb9228", "c9ca1db9", "5c57f17c",
      "7d30cce0", "5d86fd68", "36dacc32", "b394c790",
    ],
  },
  expected: {
    [T.sets]: 8,
    [T.venn]: 20,
  },
  total: 28,
};

export default plan;
