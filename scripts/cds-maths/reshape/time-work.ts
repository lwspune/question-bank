/**
 * Reshape plan — CDS "Time and Work" (46 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 46 stems AND solutions (2026-09-29). The subtopic named after the chapter (36) held
 * three techniques: individual work RATES (1/n of the job a day; together, leaving, alternating,
 * efficiency multiples), MAN-DAYS (the job as men x days x hours; extra men, men who leave, a
 * bigger wall), and mixed gangs whose workers must first be converted to one unit (men and women,
 * goats and sheep). "Efficiency and Wages" (4) is not a technique of its own: its two
 * men-versus-women rows join the mixed-gang page and its rate and wage rows join the rates page.
 * "Pipes and Cisterns" keeps its page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rates: "Work Rates",
  mandays: "Man-Days and Man-Hours",
  mixed: "Men, Women and Equivalent Workers",
  pipes: "Pipes and Cisterns",
} as const;

const plan: ReshapePlan = {
  chapter: "Time and Work",
  order: [T.rates, T.mandays, T.mixed, T.pipes],
  whole: {},
  byPrefix: {
    [T.rates]: [
      "0c74a152", "d63204cc", "3446cc7d", "7ee1117a", "96ba03d9", "32f489d6", "37baec3a", "d6ecd1b3",
      "9b485aec", "df699186", "b695cb2b", "1a941aaf", "44949d25", "7abbf209",
    ],
    [T.mandays]: [
      "4e842885", "d5c91167", "351f575e", "3fdf5831", "48aed018", "cdb14316", "a35b29a0", "9542ba8c",
      "98a45dc5", "1b719e62", "8b843679", "730f1fb4", "f64a98ee", "ca5b520a", "1a85b88e", "c6f20c52",
      "6994aa96",
    ],
    [T.mixed]: ["e0d357d9", "008f57ab", "da294972", "81265680", "85dbda44", "93301e67", "5a6f6652", "6d8cf05c", "0f542654"],
    [T.pipes]: ["3688a762", "5d2e8842", "ff628c6d", "f36151ef", "4f79864f", "6ebd173b"],
  },
  expected: {
    [T.rates]: 14,
    [T.mandays]: 17,
    [T.mixed]: 9,
    [T.pipes]: 6,
  },
  total: 46,
};

export default plan;
