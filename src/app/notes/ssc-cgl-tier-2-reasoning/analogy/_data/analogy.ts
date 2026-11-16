import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RAN_ANALOGY_NOTE: SubtopicNote = {
  subtopicName: "Letter, Word and Number Analogies",
  title: "Letter, Word and Number Analogies",
  oneLineDefinition:
    "A : B :: C : ? questions on letter clusters, words and numbers: find the rule that takes A to B and apply it to C.",
  whyItMatters:
    "17 questions in the Tier II bank, 12 EASY and 5 MODERATE. Number analogies give two complete pairs, so a rule that fits only one of them is the trap to avoid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ranan-letter",
      name: "Letter clusters and words",
      intuition:
        "For letter clusters, turn letters into positions and compare place by place: often every letter moves the same number of steps. For words, name the relation in a sentence (a crowd is dense, a slope is steep) and test it on the second pair.",
      definition:
        "- **Letter clusters:** write the step under each letter (+3, −7). The same steps take the third cluster to the answer.\n" +
        "- **Two unknowns (# and %):** work # backwards from the cluster after it, and % forwards from the one before it.\n" +
        "- **Words:** say the link as a sentence: 'a bee lives in a hive', 'a crowd can be dense'. The answer fits the same sentence.\n" +
        "- **Past Z, wrap round:** Z + 1 = A, A − 1 = Z.",
      authoredExample: {
        prompt: "ACE : BDF :: KMO : ?",
        steps: ["A to B, C to D, E to F: each letter +1.", "K + 1 = L, M + 1 = N, O + 1 = P."],
        answer: "LNP",
      },
      selfCheckExample: {
        prompt: "Bird : Nest :: Bee : ?",
        steps: ["A bird lives in a nest.", "A bee lives in a hive."],
        answer: "Hive",
      },
      practiceSet: [
        { prompt: "DOG : GRJ :: CAT : ?", answer: "FDW (+3 each)" },
        { prompt: "# : PQR :: JKL : MNO. Find #, if the rule is +3.", answer: "MNO (P − 3 = M)" },
        { prompt: "Pen : Writer :: Brush : ?", answer: "Painter" },
      ],
      pyqExampleId: "c242542d-2a6e-4d05-86e8-b7655b2ce117",
      traps: [
        {
          title: "Applying the step in the wrong direction for #",
          body: "If # comes before the cluster, the rule runs from # to it, so you undo the step: subtract where the rule adds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ranan-number",
      name: "Number analogies and number sets",
      intuition:
        "With numbers, try the common rules in order: a square or a cube (with something added), a multiple, or a fixed difference. A rule counts only if it fits every complete pair given.",
      definition:
        "Rules SSC uses most:\n" +
        "- **Powers:** n² + 1, n³ − 1, (n + 1)².\n" +
        "- **Products:** n × (n + 1), n × a fixed number.\n" +
        "- **Sets of three** (a, b, c): c is often a × b + something, or each term is the last plus a fixed gap.\n" +
        "- **Do not split numbers into digits** unless the question allows it; SSC says so in the stem.",
      formula: { label: "Common analogy rules", latex: "n \\to n^2 + 1,\\quad n \\to n^3 - 1,\\quad n \\to n(n+1)" },
      authoredExample: {
        prompt: "2 : 12 :: 3 : 27 :: 4 : ?",
        steps: ["2² × 3 = 12 and 3² × 3 = 27: the rule is n² × 3.", "4² × 3 = 48."],
        answer: "48",
      },
      selfCheckExample: {
        prompt: "2 : 5 :: 3 : 10 :: 4 : ?",
        steps: ["2² + 1 = 5 and 3² + 1 = 10.", "4² + 1 = 17."],
        answer: "17",
      },
      practiceSet: [
        { prompt: "1 : 2 :: 2 : 6 :: 3 : ?", answer: "12 (n × (n + 1))" },
        { prompt: "(4, 6, 24) and (3, 5, 15). Which set follows the same rule: (2, 7, 14) or (2, 7, 9)?", answer: "(2, 7, 14): third = first × second" },
        { prompt: "(10, 25, 40), (15, 30, 45): what is the rule?", answer: "Each term is 15 more than the last" },
      ],
      pyqExampleId: "180b1a5d-ff97-4780-a3a0-5bbf3541b91a",
      traps: [
        {
          title: "Trusting a rule from one pair",
          body: "3 : 12 fits both ×4 and n(n + 1). Only the second pair tells them apart, so test every rule on both pairs.",
        },
      ],
    },
  ],
};
