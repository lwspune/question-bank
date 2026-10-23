import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_WRONG_NOTE: SubtopicNote = {
  subtopicName: "Wrong Term Series",
  title: "Wrong Term Series",
  oneLineDefinition:
    "One term in the series breaks the rule: find the rule from the terms that agree, predict each term in turn, and the first term that does not match is the wrong one.",
  whyItMatters:
    "Twenty-three questions in the bank, 21 from the 2025 shifts and two from the 2024 shifts: twelve MODERATE and eleven EASY. Nineteen hide one or two wrong numbers in a number series and four hide a wrong cluster or letter-and-number term. Every rule from the earlier pages can appear here, so this page comes last.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsewr-numbers",
      name: "Find the rule from the terms that agree",
      intuition:
        "A wrong term spoils the pattern on both sides of it, so the differences or ratios look broken in two places at once. The term between the two broken places is the culprit.",
      definition:
        "1. **Find the rule from the start** of the series, using the earlier pages: differences, ratios, squares and cubes, or two series woven together.\n" +
        "2. **Predict each term in turn** from the one before. Stop at the first term that does not match.\n" +
        "3. **Replace it with the predicted value** and check that the next printed term follows from the corrected one. If it does, you have the wrong term.\n" +
        "4. **Two wrong terms:** these questions usually weave two series together, one wrong term in each. Check the odd and even places separately.\n" +
        "5. **Fast route:** a wrong term is often just one or two away from the right value, and the options list only four candidates, so test the options rather than the whole row.",
      authoredExample: {
        prompt: "Find the wrong term: 5, 11, 23, 48, 95, 191",
        steps: [
          "From the start: \\(5 \\times 2 + 1 = 11\\) and \\(11 \\times 2 + 1 = 23\\). Try \\(\\times 2 + 1\\).",
          "Next should be \\(23 \\times 2 + 1 = 47\\), but 48 is printed.",
          "Check with 47: \\(47 \\times 2 + 1 = 95\\) and \\(95 \\times 2 + 1 = 191\\). Both match, so 48 is the wrong term.",
        ],
        answer: "48 (it should be 47)",
      },
      selfCheckExample: {
        prompt: "Find the wrong term: 1, 8, 27, 63, 125, 216",
        steps: [
          "The terms are cubes: \\(1^3, 2^3, 3^3\\), then \\(4^3 = 64\\).",
          "63 is printed instead, and \\(5^3 = 125\\), \\(6^3 = 216\\) carry on correctly.",
        ],
        answer: "63 (it should be 64)",
      },
      practiceSet: [
        { prompt: "Find the wrong term: 7, 12, 17, 23, 27", answer: "23 (it should be 22)", method: "Add 5 each time." },
        { prompt: "Find the wrong term: 2, 6, 18, 56, 162", answer: "56 (it should be 54)", method: "Multiply by 3 each time." },
        { prompt: "Find the wrong term: 3, 4, 7, 11, 18, 30", answer: "30 (it should be 29)", method: "Each term is the sum of the two before it." },
        { prompt: "Find the wrong term: 10, 17, 26, 37, 51, 65", answer: "51 (it should be 50)", method: "Square plus 1, for 3 to 8." },
      ],
      pyqExampleId: "3cce11f2-e11b-4d36-9799-1a7e5bbdf830",
      traps: [
        {
          title: "Blaming the term after the break",
          body:
            "In 4, 7, 10, 14, 16 the differences are 3, 3, 4, 2: two of them are off. The term between them, 14, is wrong (it should be 13). The 16 after it is correct.",
        },
        {
          title: "Changing the rule to fit the wrong term",
          body:
            "If one term disagrees, do not invent a new rule that fits it. A rule that needs a new step at just one place is the sign that the term there is the wrong one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsewr-letters",
      name: "The wrong cluster or term",
      intuition:
        "With letters, a wrong cluster can break two rules: the steps inside the cluster, or the step from one cluster to the next. Check both, and the odd one out shows itself.",
      definition:
        "- **Inside each cluster:** look at the steps between its letters (BDF is +2, +2). The right clusters usually share them.\n" +
        "- **From cluster to cluster:** follow the first letters (B, E, H, K) as a letter series.\n" +
        "- **Letter-and-number terms:** check the letter series and the number series separately; the wrong term breaks one of them.\n" +
        "- **The correct version** of the wrong cluster is a good last check: it should fit both rules.",
      authoredExample: {
        prompt: "Find the incorrect cluster: BDF, EGI, HJL, KNO, NPR",
        steps: [
          "Inside BDF, EGI, HJL and NPR the letters move +2, +2.",
          "First letters B, E, H, K, N move +3, so the 4th cluster should start with K: K, M, O.",
          "KNO has N in the middle instead of M, so it breaks the inside rule.",
        ],
        answer: "KNO (it should be KMO)",
      },
      selfCheckExample: {
        prompt: "Find the term that breaks the pattern: C3, E5, G7, I8, K11",
        steps: [
          "Each number is the letter's place: C is 3, E is 5, G is 7, K is 11.",
          "I is 9, so I8 is wrong.",
        ],
        answer: "I8 (it should be I9)",
      },
      practiceSet: [
        { prompt: "Find the incorrect cluster: AZ, BY, CW, DW", answer: "CW (it should be CX)", method: "Opposite pairs, adding to 27." },
        { prompt: "Find the term that breaks the pattern: M2, N4, O6, Q8", answer: "Q8 (it should be P8)" },
        { prompt: "Find the incorrect cluster: FGH, IJK, LMN, ORQ", answer: "ORQ (it should be OPQ)" },
        { prompt: "Find the incorrect cluster: DIN, FKP, HMQ, JOT", answer: "HMQ (it should be HMR)", method: "Inside each cluster the letters move +5." },
      ],
      pyqExampleId: "14bbdbb8-5abe-4887-b0ec-1083c94a5a64",
      traps: [
        {
          title: "Checking only one direction",
          body:
            "A cluster can follow the steps inside it and still start with the wrong letter. Check the inside steps and the cluster-to-cluster steps before you choose.",
        },
      ],
    },
  ],
};
