/**
 * Reshape plan — CDS "Polynomials" (79 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 79 stems AND solutions (2026-09-29). "Remainder and Factor Theorem" (27) held two
 * different moves: EVALUATING a remainder (f(a), a linear remainder on division by a quadratic,
 * x² → −1 substitutions, the xⁿ ± aⁿ patterns) and FINDING UNKNOWN COEFFICIENTS so that given
 * factors divide exactly; they get a page each. The four small classification buckets (degree,
 * zeros and coefficients, integer-valued polynomials) join as one opening page. Factorisation
 * and HCF/LCM keep their pages. The premise pair 23e3edfa/5093e854 stays together.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  degree: "Degree, Zeros and Coefficients",
  remainder: "The Remainder Theorem",
  factor: "The Factor Theorem",
  factorisation: "Factorisation of Polynomials",
  hcf: "HCF and LCM of Polynomials",
} as const;

const plan: ReshapePlan = {
  chapter: "Polynomials",
  order: [T.degree, T.remainder, T.factor, T.factorisation, T.hcf],
  whole: {},
  byPrefix: {
    [T.degree]: ["47e2c914", "5b3f25b2", "f294752e", "d6252dd2", "f4328423", "533d35bd", "7e7972a6", "648073fa"],
    [T.remainder]: [
      "10f56c31", "018e1347", "36a227e7", "e666ddf1", "6dd02741", "1dacac91", "7b6cb274", "7ee8216a",
      "e8a49262", "9fab30e4", "e5fa4227", "397d25fc", "2f9d0aba", "40f465f1", "782f955a",
    ],
    [T.factor]: [
      "8bedf4f1", "7c1ff856", "a34e7ed9", "78fc7f67", "af5f295e", "5e67da33", "b5576bd0", "6600c93d",
      "ef2d2e4c", "c792ddf2", "23e3edfa", "5093e854",
    ],
    [T.factorisation]: [
      "2235a436", "25aae3de", "a011c87d", "c075bc88", "1d115e57", "505861e5", "805c98fa", "285644b5",
      "9c423c5a", "8566f5a1", "88d919a1", "3da09c49", "e76b2fab", "4fed9ce6", "ed0a2411", "76438788",
      "1049039f", "a52b2574", "1783fbcf",
    ],
    [T.hcf]: [
      "d566b14a", "9b66cce3", "6dcc87b3", "ebb22d5d", "9ccd3b7b", "4e875dde", "b15ab513", "59f85683",
      "54545b05", "479b640d", "fd786b80", "39cf0be4", "9c28efce", "c7f53e79", "4a292d5d", "f828d370",
      "caa90c4c", "723addad", "388fc43e", "3729d83b", "38c3ca7d", "cd2a39d1", "c1503b2f", "948c1055",
      "b7a1f370",
    ],
  },
  expected: {
    [T.degree]: 8,
    [T.remainder]: 15,
    [T.factor]: 12,
    [T.factorisation]: 19,
    [T.hcf]: 25,
  },
  total: 79,
};

export default plan;
