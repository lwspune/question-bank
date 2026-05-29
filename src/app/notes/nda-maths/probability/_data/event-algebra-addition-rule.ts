import type { SubtopicNote } from "@/app/notes/_types";

export const EVENT_ALGEBRA_ADDITION_RULE_NOTE: SubtopicNote = {
  subtopicName:
    "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive",
  title: "Event Algebra & the Addition Rule",
  oneLineDefinition:
    "Combining events with set operations — the addition rule for unions, complements for 'neither', and what mutually exclusive and exhaustive really mean.",
  whyItMatters:
    "Once you can count outcomes, the next step is combining events: 'A or B', 'A and B', 'neither'. " +
    "The addition rule P(A or B) = P(A) + P(B) - P(A and B) is the workhorse of this 21-question subtopic, and the same diagram answers 'neither', 'exactly one', and 'at least one'. " +
    "Get the inclusion-exclusion subtraction and the mutually-exclusive vs independent distinction right and these are reliable marks.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    // FOUNDATION — the set language every later rule uses.
    {
      slug: "set-operations-on-events",
      name: "Events as sets: union, intersection, complement",
      intuition:
        "Events are subsets of the sample space, so the language of sets applies directly. " +
        "\\(A \\cup B\\) is \"A or B (or both)\"; \\(A \\cap B\\) is \"A and B together\"; \\(A'\\) is \"A does not happen\". " +
        "A Venn diagram turns every two-event question into filling in regions.",
      definition:
        "For events \\(A, B \\subseteq S\\): the **union** \\(A \\cup B\\) occurs when at least one of them occurs; the **intersection** \\(A \\cap B\\) occurs when both occur; the **complement** \\(A'\\) (or \\(\\bar{A}\\)) occurs when \\(A\\) does not. " +
        "\"Exactly one of \\(A, B\\)\" is \\((A \\cap B') \\cup (A' \\cap B)\\); \"neither\" is \\(A' \\cap B'\\). " +
        "De Morgan's laws: \\((A \\cup B)' = A' \\cap B'\\) and \\((A \\cap B)' = A' \\cup B'\\).",
      authoredExample: {
        prompt:
          "In a group, \\(A\\) is the event \"likes tea\" and \\(B\\) is \"likes coffee\". Express in set notation: (i) likes both, (ii) likes at least one, (iii) likes neither.",
        steps: [
          "(i) Both: \\(A \\cap B\\).",
          "(ii) At least one: \\(A \\cup B\\).",
          "(iii) Neither: \\(A' \\cap B' = (A \\cup B)'\\) by De Morgan.",
        ],
        answer: "(i) \\(A \\cap B\\); (ii) \\(A \\cup B\\); (iii) \\(A' \\cap B'\\).",
      },
      practiceSet: [
        { prompt: "Which event is \"A and B both occur\"?", answer: "\\(A \\cap B\\)" },
        { prompt: "Which event is \"at least one of A, B\"?", answer: "\\(A \\cup B\\)" },
        { prompt: "Write \"neither A nor B\" two ways.", answer: "\\(A' \\cap B' = (A \\cup B)'\\)" },
        { prompt: "\\((A \\cap B)'\\) equals? (De Morgan)", answer: "\\(A' \\cup B'\\)" },
      ],
      traps: [
        {
          title: "\\(A \\cup B\\) is INCLUSIVE \"or\" — it contains the overlap",
          body:
            "\"A or B\" in probability always means \"A, or B, or both\". The exclusive \"exactly one\" is a different event, \\((A \\cap B') \\cup (A' \\cap B)\\).",
        },
        {
          title: "Read \"and\" as intersection, \"or\" as union — do not swap",
          body:
            "\\(A \\cap B\\) is the smaller event (both must hold); \\(A \\cup B\\) is the larger (one suffices). Mixing them up flips the whole calculation.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "addition-rule",
      name: "The addition rule (inclusion-exclusion)",
      visualizationSlug: "venn-two-events",
      intuition:
        "To find \\(P(A \\text{ or } B)\\) you add \\(P(A)\\) and \\(P(B)\\) — but the overlap \\(A \\cap B\\) has now been counted twice, so subtract it once.",
      definition:
        "For any two events, \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\). " +
        "For three events the pattern continues: \\(P(A \\cup B \\cup C) = \\sum P(A) - \\sum P(A \\cap B) + P(A \\cap B \\cap C)\\) — add singles, subtract pairs, add the triple.",
      formula: {
        label: "Addition rule",
        latex:
          "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        symbols: [
          { symbol: "\\(P(A \\cap B)\\)", meaning: "probability both occur — subtracted to undo double-counting" },
        ],
      },
      authoredExample: {
        prompt:
          "The probability a family owns a car is \\(0.6\\), owns a bike is \\(0.5\\), and owns both is \\(0.3\\). What is the probability it owns at least one?",
        steps: [
          "\"At least one\" is the union: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
          "\\(= 0.6 + 0.5 - 0.3 = 0.8\\).",
        ],
        answer: "\\(0.8\\)",
      },
      selfCheckExample: {
        prompt:
          "For two events, \\(P(A) = \\dfrac{1}{2}\\), \\(P(B) = \\dfrac{1}{3}\\), \\(P(A \\cap B) = \\dfrac{1}{4}\\). Find \\(P(A \\cup B)\\).",
        steps: [
          "Addition rule: \\(P(A \\cup B) = \\dfrac{1}{2} + \\dfrac{1}{3} - \\dfrac{1}{4}\\).",
          "Common denominator 12: \\(\\dfrac{6 + 4 - 3}{12} = \\dfrac{7}{12}\\).",
        ],
        answer: "\\(\\dfrac{7}{12}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A)=0.4, P(B)=0.5, P(A\\cap B)=0.2\\). Find \\(P(A\\cup B)\\).", answer: "\\(0.7\\)" },
        { prompt: "\\(P(A)=0.5, P(B)=0.6, P(A\\cup B)=0.9\\). Find \\(P(A\\cap B)\\).", answer: "\\(0.2\\)", method: "rearrange the addition rule" },
        { prompt: "If \\(P(A\\cap B)=0\\), then \\(P(A\\cup B)=\\)?", answer: "\\(P(A)+P(B)\\)" },
        { prompt: "\\(P(A)=\\tfrac{1}{2}, P(B)=\\tfrac{1}{3}, P(A\\cap B)=\\tfrac{1}{6}\\). \\(P(A\\cup B)\\)?", answer: "\\(\\dfrac{2}{3}\\)" },
      ],
      pyqExampleId: "b31e511a-0345-4770-9efb-e23a87fdd82a",
      traps: [
        {
          title: "Do not forget to subtract \\(P(A \\cap B)\\)",
          body:
            "\\(P(A) + P(B)\\) alone overcounts the overlap. The only time you may skip the subtraction is when \\(A\\) and \\(B\\) are mutually exclusive (overlap \\(= 0\\)).",
        },
        {
          title: "Three events need the full inclusion-exclusion, not just three single terms",
          body:
            "Subtract all three pairwise intersections, then add back the triple intersection. Stopping after the singles or after the pairs gives a wrong answer.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "neither-and-complement-of-union",
      name: "\"Neither\" and the complement of a union",
      intuition:
        "\"Neither A nor B\" is just the complement of \"A or B\". So compute the union, then subtract from 1. " +
        "De Morgan's law makes this exact: the outside of \\(A \\cup B\\) is \\(A' \\cap B'\\).",
      definition:
        "\\(P(\\text{neither } A \\text{ nor } B) = P(A' \\cap B') = 1 - P(A \\cup B)\\). " +
        "Equivalently \\(1 - \\big(P(A) + P(B) - P(A \\cap B)\\big)\\). " +
        "This is the fastest route for percentage \"how many do neither\" word problems.",
      formula: {
        label: "Complement of a union (De Morgan)",
        latex:
          "P(A' \\cap B') = 1 - P(A \\cup B) = 1 - P(A) - P(B) + P(A \\cap B)",
        symbols: [
          { symbol: "\\(A' \\cap B'\\)", meaning: "the \"neither\" region — outside both circles" },
        ],
      },
      authoredExample: {
        prompt:
          "In a school, 50% of students play cricket and 40% play football; 10% play both. What percentage play neither?",
        steps: [
          "Play at least one: \\(P(C \\cup F) = 0.50 + 0.40 - 0.10 = 0.80\\).",
          "Play neither: \\(1 - 0.80 = 0.20 = 20\\%\\).",
        ],
        answer: "\\(20\\%\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(P(A) = \\dfrac{1}{3}\\), \\(P(B) = \\dfrac{1}{2}\\), \\(P(A \\cap B) = \\dfrac{1}{4}\\). Find \\(P(A' \\cap B')\\).",
        steps: [
          "Union: \\(P(A \\cup B) = \\dfrac{1}{3} + \\dfrac{1}{2} - \\dfrac{1}{4} = \\dfrac{4 + 6 - 3}{12} = \\dfrac{7}{12}\\).",
          "Neither: \\(1 - \\dfrac{7}{12} = \\dfrac{5}{12}\\).",
        ],
        answer: "\\(\\dfrac{5}{12}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A\\cup B)=0.7\\). Find \\(P(A'\\cap B')\\).", answer: "\\(0.3\\)" },
        { prompt: "60% like tea, 30% like coffee, 20% both. % who like neither?", answer: "\\(30\\%\\)", method: "\\(1-(0.6+0.3-0.2)\\)" },
        { prompt: "\\((A\\cup B)'\\) equals (De Morgan)?", answer: "\\(A'\\cap B'\\)" },
        { prompt: "\\(P(A)=0.5,P(B)=0.5,P(A\\cap B)=0.25\\). \\(P(\\text{neither})\\)?", answer: "\\(0.25\\)" },
      ],
      pyqExampleId: "e9f9e787-1df9-438d-97e1-8c18ec670c5e",
      traps: [
        {
          title: "\"Neither\" is \\(1 - P(A \\cup B)\\), not \\(1 - P(A) - P(B)\\)",
          body:
            "Skipping the \\(+P(A \\cap B)\\) term double-subtracts the overlap and understates the answer. Compute the union correctly first, then take the complement.",
        },
        {
          title: "De Morgan flips the operation: complement of a union is an intersection",
          body:
            "\\((A \\cup B)' = A' \\cap B'\\) (neither), while \\((A \\cap B)' = A' \\cup B'\\) (not both). Using the wrong one swaps two different events.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "mutually-exclusive-events",
      name: "Mutually exclusive (disjoint) events",
      intuition:
        "Two events are mutually exclusive when they cannot both happen — their intersection is empty. " +
        "Then the overlap term vanishes and the addition rule simplifies to plain addition.",
      definition:
        "\\(A\\) and \\(B\\) are **mutually exclusive** (disjoint) if \\(A \\cap B = \\varnothing\\), so \\(P(A \\cap B) = 0\\). " +
        "Then \\(P(A \\cup B) = P(A) + P(B)\\). " +
        "Mutually exclusive is NOT the same as independent: if two events with positive probability are mutually exclusive, the occurrence of one rules out the other, so they are in fact dependent.",
      formula: {
        label: "Addition rule for mutually exclusive events",
        latex:
          "A \\cap B = \\varnothing \\;\\Rightarrow\\; P(A \\cup B) = P(A) + P(B)",
        symbols: [
          { symbol: "\\(\\varnothing\\)", meaning: "the impossible event — the two cannot co-occur" },
        ],
      },
      authoredExample: {
        prompt:
          "Two mutually exclusive events have \\(P(A) = 0.3\\) and \\(P(B) = 0.5\\). Find \\(P(A \\cup B)\\) and \\(P(A' \\cap B')\\).",
        steps: [
          "Mutually exclusive, so \\(P(A \\cup B) = P(A) + P(B) = 0.3 + 0.5 = 0.8\\).",
          "Neither: \\(P(A' \\cap B') = 1 - 0.8 = 0.2\\).",
        ],
        answer: "\\(P(A \\cup B) = 0.8\\), \\(P(A' \\cap B') = 0.2\\).",
      },
      selfCheckExample: {
        prompt:
          "\\(A\\) and \\(B\\) are mutually exclusive with \\(P(A) = \\dfrac{1}{4}\\) and \\(P(B) = \\dfrac{1}{2}\\). Find \\(P(A \\cup B)\\).",
        steps: [
          "Disjoint, so add directly: \\(P(A \\cup B) = \\dfrac{1}{4} + \\dfrac{1}{2} = \\dfrac{3}{4}\\).",
        ],
        answer: "\\(\\dfrac{3}{4}\\)",
      },
      practiceSet: [
        { prompt: "Mutually exclusive \\(P(A)=0.2,P(B)=0.5\\). \\(P(A\\cup B)\\)?", answer: "\\(0.7\\)" },
        { prompt: "For mutually exclusive events, \\(P(A\\cap B)=\\)?", answer: "\\(0\\)" },
        { prompt: "Can two mutually exclusive events (positive prob) be independent?", answer: "No", method: "one occurring forbids the other" },
        { prompt: "ME events \\(P(A)=\\tfrac{1}{3},P(B)=\\tfrac{1}{3}\\). \\(P(A\\cup B)\\)?", answer: "\\(\\dfrac{2}{3}\\)" },
      ],
      pyqExampleId: "175a05ca-d501-478f-80bc-c4c429bc3fe5",
      traps: [
        {
          title: "Mutually exclusive \\(\\ne\\) independent — opposite ideas",
          body:
            "Mutually exclusive means \\(P(A \\cap B) = 0\\); independent means \\(P(A \\cap B) = P(A)P(B)\\). For events with positive probability these cannot hold at once. Questions often test exactly this confusion.",
        },
        {
          title: "Only drop the overlap term when you are TOLD the events are mutually exclusive",
          body:
            "If a problem does not state disjointness (or give \\(P(A \\cap B) = 0\\)), you must keep the \\(-P(A \\cap B)\\) term in the addition rule.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "exhaustive-events",
      name: "Exhaustive events (and probabilities that sum to 1)",
      intuition:
        "A set of events is exhaustive when together they cover the whole sample space — one of them must occur. " +
        "If they are also mutually exclusive, their probabilities add up to exactly 1, which turns a ratio between them into a solvable equation.",
      definition:
        "Events \\(A_1, \\dots, A_n\\) are **exhaustive** if \\(A_1 \\cup \\dots \\cup A_n = S\\). " +
        "If they are also **mutually exclusive** (a partition of \\(S\\)), then \\(P(A_1) + \\dots + P(A_n) = 1\\). " +
        "Most PYQs give the probabilities as a ratio (e.g. \\(2P(A) = 3P(B) = 4P(C)\\)) and use the sum-to-1 condition to solve.",
      formula: {
        label: "Mutually exclusive AND exhaustive",
        latex:
          "A_1 \\cup \\dots \\cup A_n = S \\;\\text{ and disjoint} \\;\\Rightarrow\\; \\sum_{i} P(A_i) = 1",
        symbols: [
          { symbol: "partition", meaning: "mutually exclusive + exhaustive: exactly one event occurs" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(A, B, C\\) are mutually exclusive and exhaustive with \\(P(A) = 2P(B) = 3P(C)\\). Find \\(P(A)\\).",
        steps: [
          "Write \\(B\\) and \\(C\\) in terms of \\(A\\): from \\(P(A) = 2P(B)\\), \\(P(B) = \\dfrac{P(A)}{2}\\); from \\(P(A) = 3P(C)\\), \\(P(C) = \\dfrac{P(A)}{3}\\).",
          "Sum to 1: \\(P(A) + \\dfrac{P(A)}{2} + \\dfrac{P(A)}{3} = 1 \\Rightarrow P(A)\\cdot\\dfrac{11}{6} = 1\\).",
          "So \\(P(A) = \\dfrac{6}{11}\\).",
        ],
        answer: "\\(\\dfrac{6}{11}\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(A, B, C\\) are mutually exclusive and exhaustive with \\(P(A) = P(B) = 2P(C)\\). Find \\(P(C)\\).",
        steps: [
          "Let \\(P(C) = x\\); then \\(P(A) = P(B) = 2x\\).",
          "Sum to 1: \\(2x + 2x + x = 1 \\Rightarrow 5x = 1\\).",
          "So \\(P(C) = \\dfrac{1}{5}\\).",
        ],
        answer: "\\(\\dfrac{1}{5}\\)",
      },
      practiceSet: [
        { prompt: "ME & exhaustive \\(A,B\\): if \\(P(A)=0.7\\), \\(P(B)\\)?", answer: "\\(0.3\\)" },
        { prompt: "ME & exhaustive \\(A,B,C\\), equal probs. \\(P(A)\\)?", answer: "\\(\\dfrac{1}{3}\\)" },
        { prompt: "ME & exhaustive, \\(P(A)=2P(B)\\), two events. \\(P(B)\\)?", answer: "\\(\\dfrac{1}{3}\\)", method: "\\(2x+x=1\\)" },
        { prompt: "Do exhaustive events alone force the sum to be 1?", answer: "No", method: "only if also mutually exclusive" },
      ],
      pyqExampleId: "9df462d8-dfd7-4e19-a646-86fe336c039d",
      traps: [
        {
          title: "Exhaustive alone does not give sum \\(= 1\\)",
          body:
            "If the events overlap, \\(\\sum P(A_i)\\) exceeds 1 by the overlaps. The probabilities add to exactly 1 only when the events are BOTH exhaustive AND mutually exclusive (a partition).",
        },
        {
          title: "Turn a chained ratio into one variable before summing",
          body:
            "\\(2P(A) = 3P(B) = 4P(C) = k\\) means \\(P(A) = \\tfrac{k}{2}\\), \\(P(B) = \\tfrac{k}{3}\\), \\(P(C) = \\tfrac{k}{4}\\). Set the sum to 1 to find \\(k\\); a common slip is reading the ratio as \\(P(A):P(B):P(C) = 2:3:4\\) (it is actually the reciprocals).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Classical Probability & Counting",
      href: "/notes/nda-maths/probability/classical-probability-counting",
    },
    {
      label: "Independent Events & the Multiplication Rule",
      href: "/notes/nda-maths/probability/independent-events",
    },
  ],
};
