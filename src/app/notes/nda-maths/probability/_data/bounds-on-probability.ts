import type { SubtopicNote } from "@/app/notes/_types";

export const BOUNDS_ON_PROBABILITY_NOTE: SubtopicNote = {
  subtopicName: "Bounds on Probability",
  title: "Bounds on Probability",
  oneLineDefinition:
    "The inequalities that constrain probabilities — Fréchet and Boole bounds, the min/max of unions and intersections, and the identity-statement traps.",
  whyItMatters:
    "This is the chapter's advanced corner — only 11 questions, but they are mostly MODERATE/HARD and almost always phrased as \"which of the following statements are correct\". " +
    "The marks come from knowing that P(A), P(B) and P(A and B) cannot be chosen freely: the intersection has a forced floor, the union has a ceiling, and several plausible-looking identities are subtly wrong. " +
    "Learn the four bounds and the exactly-one trap and this section becomes quick, defensible marks rather than guesswork.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "frechet-and-boole-bounds",
      name: "Fréchet and Boole bounds",
      intuition:
        "You cannot pick \\(P(A)\\), \\(P(B)\\) and \\(P(A \\cap B)\\) independently — they constrain each other. " +
        "The overlap cannot be larger than the smaller event, and when \\(P(A) + P(B)\\) exceeds 1 the events are forced to overlap by at least the excess. " +
        "The union, in turn, can never exceed the sum.",
      definition:
        "For any two events (all from \\(0 \\le P \\le 1\\) and the addition rule):\n" +
        "- **Intersection (Fréchet):** \\(\\max(0,\\ P(A) + P(B) - 1) \\le P(A \\cap B) \\le \\min(P(A), P(B))\\).\n" +
        "- **Union:** \\(\\max(P(A), P(B)) \\le P(A \\cup B) \\le \\min(1,\\ P(A) + P(B))\\).\n" +
        "- **Boole's inequality:** the upper union bound \\(P(A \\cup B) \\le P(A) + P(B)\\).",
      formula: {
        label: "Bounds on intersection and union",
        latex:
          "\\max\\big(0,\\,P(A)+P(B)-1\\big) \\le P(A \\cap B) \\le \\min\\big(P(A),\\,P(B)\\big)",
        symbols: [
          { symbol: "lower bound", meaning: "\\(P(A)+P(B)-1\\) — the forced overlap when the sum exceeds 1 (else 0)" },
          { symbol: "upper bound", meaning: "\\(\\min(P(A),P(B))\\) — the overlap can't exceed the smaller event" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(P(A) = 0.7\\) and \\(P(B) = 0.6\\), find the range of possible values of \\(P(A \\cap B)\\).",
        steps: [
          "Lower bound: \\(\\max(0,\\ 0.7 + 0.6 - 1) = \\max(0,\\ 0.3) = 0.3\\).",
          "Upper bound: \\(\\min(0.7,\\ 0.6) = 0.6\\).",
          "So \\(0.3 \\le P(A \\cap B) \\le 0.6\\).",
        ],
        answer: "\\(0.3 \\le P(A \\cap B) \\le 0.6\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(P(A) = 0.5\\) and \\(P(B) = 0.4\\), find the range of possible values of \\(P(A \\cup B)\\).",
        steps: [
          "Lower bound: \\(\\max(P(A), P(B)) = \\max(0.5, 0.4) = 0.5\\).",
          "Upper bound: \\(\\min(1,\\ 0.5 + 0.4) = \\min(1,\\ 0.9) = 0.9\\).",
          "So \\(0.5 \\le P(A \\cup B) \\le 0.9\\).",
        ],
        answer: "\\(0.5 \\le P(A \\cup B) \\le 0.9\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A)=0.8, P(B)=0.5\\). Minimum \\(P(A\\cap B)\\)?", answer: "\\(0.3\\)", method: "\\(\\max(0, 0.8+0.5-1)\\)" },
        { prompt: "\\(P(A)=0.8, P(B)=0.5\\). Maximum \\(P(A\\cap B)\\)?", answer: "\\(0.5\\)", method: "\\(\\min(0.8,0.5)\\)" },
        { prompt: "\\(P(A)=0.3, P(B)=0.4\\). Minimum \\(P(A\\cap B)\\)?", answer: "\\(0\\)", method: "sum \\(<1\\), so floor is 0" },
        { prompt: "\\(P(A)=0.6,P(B)=0.7\\). Maximum \\(P(A\\cup B)\\)?", answer: "\\(1\\)", method: "\\(\\min(1, 1.3)\\)" },
      ],
      pyqExampleId: "76ffef24-a655-458e-9b10-21b1b7f5854f",
      traps: [
        {
          title: "The intersection floor \\(P(A)+P(B)-1\\) only bites when the sum exceeds 1",
          body:
            "If \\(P(A) + P(B) \\le 1\\) the lower bound is just 0 (the events can be disjoint). Always take \\(\\max(0,\\ P(A)+P(B)-1)\\) — never report a negative lower bound.",
        },
        {
          title: "The union floor is \\(\\max(P(A),P(B))\\), not \\(P(A)+P(B)\\)",
          body:
            "\\(P(A) + P(B)\\) is the union's CEILING (Boole), reached only when the events are disjoint. The smallest the union can be is the larger single probability, reached when one event sits inside the other.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "min-max-of-combined-probabilities",
      name: "Minimum and maximum of combined probabilities",
      intuition:
        "To find the extreme value of \\(P(A \\cup B)\\), \\(P(A \\cap B)\\) or \\(P(A)+P(B)\\), push the overlap to whichever boundary the bounds allow. " +
        "The identity \\(P(A) + P(B) = P(A \\cup B) + P(A \\cap B)\\) converts between them.",
      definition:
        "The four extreme values (linked by \\(P(A) + P(B) = P(A \\cup B) + P(A \\cap B)\\)):\n" +
        "- **Union, min:** \\(P(A \\cup B) = \\max(P(A), P(B))\\)\n" +
        "- **Union, max:** \\(P(A \\cup B) = \\min(1,\\ P(A)+P(B))\\)\n" +
        "- **Intersection, min:** \\(P(A \\cap B) = \\max(0,\\ P(A)+P(B)-1)\\)\n" +
        "- **Intersection, max:** \\(P(A \\cap B) = \\min(P(A), P(B))\\)",
      formula: {
        label: "Linking identity",
        latex:
          "P(A) + P(B) = P(A \\cup B) + P(A \\cap B)",
        symbols: [
          { symbol: "use", meaning: "to bound \\(P(A)+P(B)\\) from bounds on the union and intersection (and vice-versa)" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(P(A) = \\dfrac{2}{3}\\) and \\(P(B) = \\dfrac{3}{5}\\), find the minimum value of \\(P(A \\cup B)\\) and the maximum value of \\(P(A \\cap B)\\).",
        steps: [
          "Both extremes occur at maximum overlap (\\(B\\) pushed as far inside \\(A\\) as possible).",
          "Minimum union: \\(\\min P(A \\cup B) = \\max(P(A), P(B)) = \\max\\left(\\dfrac{2}{3}, \\dfrac{3}{5}\\right) = \\dfrac{2}{3}\\).",
          "Maximum intersection: \\(\\max P(A \\cap B) = \\min(P(A), P(B)) = \\min\\left(\\dfrac{2}{3}, \\dfrac{3}{5}\\right) = \\dfrac{3}{5}\\).",
        ],
        answer: "\\(\\min P(A \\cup B) = \\dfrac{2}{3}\\); \\(\\max P(A \\cap B) = \\dfrac{3}{5}\\).",
      },
      selfCheckExample: {
        prompt:
          "Two events satisfy \\(P(A \\cup B) \\ge 0.75\\) and \\(0.125 \\le P(A \\cap B) \\le 0.375\\). What is the minimum value of \\(P(A) + P(B)\\)?",
        steps: [
          "Use \\(P(A) + P(B) = P(A \\cup B) + P(A \\cap B)\\).",
          "Minimise both terms: smallest union is \\(0.75\\), smallest intersection is \\(0.125\\).",
          "Minimum \\(P(A) + P(B) = 0.75 + 0.125 = 0.875\\).",
        ],
        answer: "\\(0.875\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A)=0.6,P(B)=0.5\\). Minimum \\(P(A\\cup B)\\)?", answer: "\\(0.6\\)", method: "\\(\\max(0.6,0.5)\\)" },
        { prompt: "\\(P(A)=0.6,P(B)=0.5\\). Maximum \\(P(A\\cup B)\\)?", answer: "\\(1\\)", method: "\\(\\min(1,1.1)\\)" },
        { prompt: "\\(P(A\\cup B)=0.8, P(A\\cap B)=0.3\\). \\(P(A)+P(B)\\)?", answer: "\\(1.1\\)", method: "union + intersection" },
        { prompt: "\\(P(A)=\\tfrac{1}{2},P(B)=\\tfrac{1}{2}\\). Minimum \\(P(A\\cap B)\\)?", answer: "\\(0\\)", method: "sum \\(=1\\), floor 0" },
      ],
      pyqExampleId: "e8868ece-90da-469c-ac61-3d97b554dce8",
      traps: [
        {
          title: "Minimum union = max of the two probabilities, maximum union = their sum (capped at 1)",
          body:
            "Students often swap these. The union is SMALLEST when overlap is largest (one event inside the other) and LARGEST when overlap is smallest (disjoint).",
        },
        {
          title: "Convert via \\(P(A)+P(B) = P(A\\cup B) + P(A\\cap B)\\)",
          body:
            "When a question constrains the union and intersection and asks for \\(P(A)+P(B)\\) (or vice-versa), this identity is the bridge — minimise/maximise the two right-hand terms independently within their allowed ranges.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "probability-identity-statements",
      name: "Identity-statement traps (\"which are correct?\")",
      intuition:
        "NDA loves the format \"consider the following statements\" with a list of probability identities, where one is subtly wrong. " +
        "Test each against the definitions — the planted error is almost always the exactly-one formula or a mis-aimed subtraction.",
      definition:
        "Reliable identities:\n" +
        "- **Only A:** \\(P(A \\cap \\bar{B}) = P(A) - P(A \\cap B)\\) (subtract the overlap from the SAME event)\n" +
        "- **Exactly one:** \\(P(\\text{exactly one of } A, B) = P(A) + P(B) - 2P(A \\cap B)\\)\n" +
        "- **Union:** \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)\n" +
        "- **Subset:** if \\(B \\subseteq A\\) then \\(P(A \\cap \\bar{B}) = P(A) - P(B)\\)\n" +
        "- **Planted error:** \"exactly one\" written with a single \\(-P(A \\cap B)\\) (that is the union) instead of \\(-2P(A \\cap B)\\)",
      formula: {
        label: "Exactly one vs union",
        latex:
          "P(\\text{exactly one}) = P(A) + P(B) - 2P(A \\cap B), \\qquad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        symbols: [
          { symbol: "the \\(-2\\)", meaning: "exactly-one excludes the overlap TWICE; the union keeps it once" },
        ],
      },
      authoredExample: {
        prompt:
          "Which of the following are correct? (1) \\(P(A \\cap \\bar{B}) = P(A) - P(A \\cap B)\\). (2) \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\). (3) \\(P(\\text{exactly one of } A, B) = P(A) + P(B) - P(A \\cap B)\\).",
        steps: [
          "(1) Correct — \\(A\\) splits into \\(A \\cap B\\) and \\(A \\cap \\bar{B}\\), so \\(P(A \\cap \\bar{B}) = P(A) - P(A \\cap B)\\).",
          "(2) Correct — this is the addition rule.",
          "(3) Incorrect — exactly one is \\(P(A) + P(B) - 2P(A \\cap B)\\); statement (3) is actually the formula for the union.",
        ],
        answer: "Only (1) and (2) are correct.",
      },
      selfCheckExample: {
        prompt:
          "If \\(B \\subseteq A\\), simplify \\(P(A \\cap \\bar{B})\\).",
        steps: [
          "When \\(B \\subseteq A\\), the overlap \\(A \\cap B\\) is all of \\(B\\), so \\(P(A \\cap B) = P(B)\\).",
          "Therefore \\(P(A \\cap \\bar{B}) = P(A) - P(A \\cap B) = P(A) - P(B)\\).",
        ],
        answer: "\\(P(A) - P(B)\\)",
      },
      practiceSet: [
        { prompt: "\\(P(\\text{exactly one of } A,B)\\) in terms of \\(P(A),P(B),P(A\\cap B)\\)?", answer: "\\(P(A)+P(B)-2P(A\\cap B)\\)" },
        { prompt: "\\(P(A)=0.6,P(A\\cap B)=0.25\\). \\(P(A\\cap\\bar{B})\\)?", answer: "\\(0.35\\)", method: "\\(P(A)-P(A\\cap B)\\)" },
        { prompt: "\\(P(A)=0.5,P(B)=0.4,P(A\\cap B)=0.2\\). \\(P(\\text{exactly one})\\)?", answer: "\\(0.5\\)", method: "\\(0.5+0.4-2(0.2)\\)" },
        { prompt: "If \\(B\\subseteq A\\), is \\(P(A\\cap B)=P(B)\\)?", answer: "Yes" },
      ],
      pyqExampleId: "1781db50-479a-42c6-ae29-1913cddb6f51",
      traps: [
        {
          title: "\"Exactly one\" subtracts the overlap TWICE",
          body:
            "\\(P(\\text{exactly one}) = P(A) + P(B) - 2P(A \\cap B)\\). Writing a single \\(-P(A \\cap B)\\) gives the union — the most common planted error in these statement questions.",
        },
        {
          title: "\\(P(A \\cap \\bar{B}) = P(A) - P(A \\cap B)\\), not \\(P(A) - P(B)\\)",
          body:
            "Subtract the overlap from the SAME event you are restricting. \\(P(A) - P(B)\\) is only valid in the special case \\(B \\subseteq A\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Event Algebra & the Addition Rule",
      href: "/notes/nda-maths/probability/event-algebra-addition-rule",
    },
    {
      label: "Classical Probability & Counting",
      href: "/notes/nda-maths/probability/classical-probability-counting",
    },
  ],
};
