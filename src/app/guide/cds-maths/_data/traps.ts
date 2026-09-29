/**
 * Content for /guide/cds-maths/traps — the mistakes that cost marks on CDS Elementary Mathematics,
 * bucketed by the strategy strand whose marks they cost.
 *
 * WHAT MAKES THIS LIST DIFFERENT FROM MHT-CET'S. CDS deducts a third of a mark for a wrong answer, so
 * the first trap is the opposite of MHT-CET's: a BLIND guess is worth nothing on average, and the
 * habit to build is guessing only after ruling an option out. And 100 questions in 120 minutes is 1.2
 * minutes each — less than MHT-CET's 1.8 — so time traps cost more here.
 *
 * `affects` holds playbook slugs; tests/cds-maths-guide-data.test.ts asserts every one resolves.
 * EMPTY means the trap is paper-wide.
 */

export type TrapBucket = "cornerstone" | "quickwin" | "selective";

export type TrapShape = {
  id: string;
  title: string;
  bucket: TrapBucket;
  /** Playbook slugs. Empty = paper-wide. */
  affects: string[];
  mechanic: string;
  fix: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Cornerstone --------
  {
    id: "blind-guess",
    title: "The blind guess — worth nothing on average, and it adds risk",
    bucket: "cornerstone",
    affects: [],
    mechanic:
      "A right answer earns 1 mark and a wrong one loses 1/3. Guessing blind among four options, you are right one time in four: 1/4 × 1 − 3/4 × 1/3 = 0. So a blind guess gains nothing on average, and across a paper it only adds spread to your score. Students from exams with no negative marking guess everything; students scared of the penalty guess nothing. Both lose marks.",
    fix:
      "Guess only after ruling out at least one option. With three options left a guess is worth +1/9 of a mark on average; with two left, +1/3. Rule out options on sight — wrong units, a sign that cannot be right, a value outside a range — and then commit.",
  },
  {
    id: "time-sink",
    title: "The four-minute question on a 1.2-minute paper",
    bucket: "cornerstone",
    affects: ["trigonometry", "mensuration-2d", "algebraic-identities"],
    mechanic:
      "100 questions in 120 minutes is 1.2 minutes each, and every question pays the same 1 mark. The HARD questions pool in a few pages: in Trigonometry, maximum/minimum and eliminating θ hold 29 of its 46 HARD questions, and Algebraic Identities is 39% HARD. A question that feels close for four minutes costs the three easy ones you never reach.",
    fix:
      "Two passes. On the first, answer everything you can see through in under a minute and mark the rest. On the second, return to the marked ones in order of how close you were. If a question has not opened up in about two minutes, rule out what you can and move on.",
  },
  {
    id: "value-out-of-range",
    title: "An option that cannot be true",
    bucket: "cornerstone",
    affects: ["trigonometry", "number-system"],
    mechanic:
      "Distractors are often values that the question's own conditions forbid: sin θ greater than 1, a negative length, a probability above 1, a remainder larger than the divisor, a non-integer count of divisors. They look plausible because they come from a common slip in the working.",
    fix:
      "Before solving, check each option against the range the answer must lie in. This is the cheapest way to rule out an option — and on this paper, ruling one out is what makes a guess worth taking.",
  },
  {
    id: "units",
    title: "Mixed units in mensuration",
    bucket: "cornerstone",
    affects: ["mensuration-2d", "mensuration-3d"],
    mechanic:
      "Dimensions come in cm and m in the same question, volumes are asked in litres, and costs are per square metre while sides are in cm. The arithmetic is right and the answer is off by a factor of 100 or 1000 — and that answer is usually one of the options.",
    fix:
      "Convert everything to one unit before any formula. 1 m² = 10,000 cm², 1 m³ = 1,000,000 cm³, 1 litre = 1000 cm³.",
  },
  {
    id: "scale-squared",
    title: "Scaling a length but not the area",
    bucket: "cornerstone",
    affects: ["triangles", "mensuration-2d", "mensuration-3d"],
    mechanic:
      "For similar figures, areas go as the square of the side ratio and volumes as the cube. Doubling the radius of a sphere multiplies its volume by 8, not 2. The distractor is always the linear ratio.",
    fix: "Name what is being compared — length, area or volume — and raise the ratio to 1, 2 or 3 before choosing.",
  },
  {
    id: "hcf-lcm-product",
    title: "HCF × LCM = product, used for three numbers",
    bucket: "cornerstone",
    affects: ["number-system", "polynomials"],
    mechanic:
      "HCF × LCM = a × b holds for two numbers only. Applied to three numbers it gives a wrong answer that is still one of the options. For polynomials it holds only up to a constant factor.",
    fix: "For three numbers, factorise each into primes and build the HCF and LCM from the powers.",
  },
  // -------- Quick-win --------
  {
    id: "average-speed",
    title: "Average speed taken as the average of speeds",
    bucket: "quickwin",
    affects: ["tsd", "averages"],
    mechanic:
      "Over equal distances at u and v, the average speed is 2uv/(u + v), not (u + v)/2. The arithmetic mean is always an option, and it is always wrong unless the times are equal.",
    fix: "Average speed is total distance over total time. For equal distances, use 2uv/(u + v).",
  },
  {
    id: "percentage-base",
    title: "A percentage of the wrong base",
    bucket: "quickwin",
    affects: ["percentage", "data-interpretation", "ratio"],
    mechanic:
      "If A is 25% more than B, B is 20% less than A — not 25%. Successive changes do not add: +20% then −20% is a 4% fall. Profit is on cost price, discount on marked price. In a chart question, 'percentage increase' is on the earlier year.",
    fix: "Write down the base before computing. For two successive changes, use a + b + ab/100.",
  },
  {
    id: "work-rates",
    title: "Adding days instead of rates",
    bucket: "quickwin",
    affects: ["time-work"],
    mechanic:
      "If A takes 10 days and B takes 15, together they do not take 25 days, or 12.5. Work adds as rates: 1/10 + 1/15 = 1/6, so 6 days.",
    fix: "Turn every worker into work per day, add, then invert. For two workers, ab/(a + b).",
  },
  {
    id: "compounding-period",
    title: "Half-yearly compounding at the yearly rate",
    bucket: "quickwin",
    affects: ["interest"],
    mechanic:
      "Compounded half-yearly, the rate halves and the number of periods doubles. Using the annual rate for n periods gives an option that is close enough to look right.",
    fix: "Use R/2 and 2n for half-yearly, R/4 and 4n for quarterly.",
  },
  {
    id: "mean-shift",
    title: "Changing data and keeping the old spread",
    bucket: "quickwin",
    affects: ["statistics"],
    mechanic:
      "Adding a constant to every value shifts the mean, median and mode but leaves the range and standard deviation unchanged. Multiplying by k multiplies all of them by k. The median needs the data in order first.",
    fix: "Ask whether the change adds or multiplies, and apply it only to the measures it moves.",
  },
  // -------- Selective --------
  {
    id: "reciprocal-square",
    title: "x² + 1/x² taken as k²",
    bucket: "selective",
    affects: ["algebraic-identities", "surds-indices"],
    mechanic:
      "From x + 1/x = k, squaring gives x² + 2 + 1/x² = k², so x² + 1/x² = k² − 2. Dropping the middle term gives k², which is always an option. The cube has the same trap: x³ + 1/x³ = k³ − 3k.",
    fix: "Expand the square in full, including the middle term, every time.",
  },
  {
    id: "which-side",
    title: "Same side or opposite sides — the question may not say",
    bucket: "selective",
    affects: ["circles", "heights"],
    mechanic:
      "Two parallel chords can lie on the same side of the centre or on opposite sides; two observers can stand on the same side of a tower or on either side. The distances subtract in one case and add in the other, and both answers can appear as options.",
    fix: "Draw both cases. If only one matches an option, that is the answer; if both do, reread the stem for the word that decides it.",
  },
  {
    id: "domain-roots",
    title: "A root that breaks the domain",
    bucket: "selective",
    affects: ["logarithms", "quadratic-equations"],
    mechanic:
      "Solving a log equation often ends in a quadratic, and one of its roots makes a logarithm's argument zero or negative. The option listing both roots is wrong.",
    fix: "Put every root back into the original equation and reject any that makes a log's argument non-positive.",
  },
  {
    id: "sign-of-sum",
    title: "The sign of the sum of roots",
    bucket: "selective",
    affects: ["quadratic-equations", "polynomials"],
    mechanic:
      "For ax² + bx + c = 0 the sum of roots is −b/a. Dropping the minus sign gives an option with the right size and the wrong sign. The same slip happens with the remainder theorem when dividing by (x + a): put x = −a.",
    fix: "Write the equation in standard form first, then read the sign off it.",
  },
];

export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  cornerstone: TRAP_SHAPES.filter((t) => t.bucket === "cornerstone"),
  quickwin: TRAP_SHAPES.filter((t) => t.bucket === "quickwin"),
  selective: TRAP_SHAPES.filter((t) => t.bucket === "selective"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
