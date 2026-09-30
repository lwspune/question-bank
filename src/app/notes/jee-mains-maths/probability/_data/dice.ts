import type { SubtopicNote } from "@/app/notes/_types";

export const DICE_PROB_NOTE: SubtopicNote = {
  subtopicName: "Dice, Digits and Divisibility",
  title: "Dice, Digits and Divisibility",
  oneLineDefinition:
    "Probabilities for dice, coins and coloured draws with unequal chances, and for numbers chosen at random with a condition on their digits or divisibility.",
  whyItMatters:
    "Sixteen PYQs, fourteen of them multiple choice. Eight throw dice, some with unusual faces or weights, and list the outcomes that give the required total. Eight choose a number at random and ask about divisibility, digits or a gcd — counting problems in probability form. Two ideas cover the page.",
  concepts: [
    // C1 — dice, coins, weighted outcomes
    {
      kind: "formula" as const,
      slug: "jprob-dice",
      name: "Dice and weighted outcomes",
      intuition:
        "List the pairs (or triples) of faces that give the required result and add their probabilities. For fair dice each pair is \\(\\frac1{36}\\); for dice with repeated or weighted faces, multiply the individual face probabilities. Opposite faces of a standard die add to 7, so 'sum 7 with two throws' pairs each face with its opposite.",
      definition:
        "- Two fair dice: 36 equally likely ordered pairs.\n" +
        "- Unequal faces: \\(P(a,b)=P(a)\\,P(b)\\) for independent throws.\n" +
        "- Sum 7 on two dice: 6 pairs, probability \\(\\frac16\\).\n" +
        "- \\(n\\) fair dice: \\(6^n\\) equally likely ordered outcomes.",
      formula: {
        label: "Independent throws",
        latex: "P(\\text{result})=\\sum_{\\text{favourable }(a,b)}P(a)\\,P(b)",
      },
      authoredExample: {
        prompt: "Two fair dice are thrown. Find the probability that the sum is 9.",
        steps: [
          "\\((3,6),(4,5),(5,4),(6,3)\\): 4 pairs.",
        ],
        answer: "\\(\\frac{4}{36}=\\frac19\\).",
      },
      selfCheckExample: {
        prompt: "A die has faces 1, 1, 2, 2, 2, 3. Find the probability that two throws total 4.",
        steps: [
          "\\((1,3),(3,1)\\): \\(2\\cdot\\frac26\\cdot\\frac16\\); \\((2,2)\\): \\(\\frac36\\cdot\\frac36\\).",
        ],
        answer: "\\(\\frac{4}{36}+\\frac{9}{36}=\\frac{13}{36}\\).",
      },
      practiceSet: [
        { prompt: "Two dice: \\(P\\)(sum 7)?", answer: "\\(\\frac16\\)" },
        { prompt: "Two dice: \\(P\\)(a double)?", answer: "\\(\\frac16\\)" },
        { prompt: "\\(P\\)(product of five throws of a die with faces \\(-1,0,1,1,1,1\\) is 0)?", answer: "\\(1-\\left(\\frac56\\right)^5\\)" },
        { prompt: "Two dice: \\(P\\)(sum at most 3)?", answer: "\\(\\frac{3}{36}\\)" },
      ],
      pyqExampleId: "b2cc4ea9-4fb1-4b3f-83c4-2c3098a089c7", // 2023 — three dice showing different numbers
      traps: [
        {
          title: "Ordered pairs",
          body: "\\((1,3)\\) and \\((3,1)\\) are different outcomes on two dice. Listing unordered pairs undercounts every mixed pair by half.",
        },
      ],
    },

    // C2 — number properties
    {
      kind: "formula" as const,
      slug: "jprob-number",
      name: "Numbers with divisibility or digit properties",
      intuition:
        "A number chosen at random from a range is a counting problem: count the favourable numbers with inclusion–exclusion, residues or digit rules, then divide by the size of the range. For 'coprime to \\(N\\)', Euler's function counts them: \\(\\varphi(N)=N\\prod\\left(1-\\frac1p\\right)\\) over the primes dividing \\(N\\).",
      definition:
        "- Multiples of \\(d\\) in \\(1..N\\): \\(\\left\\lfloor\\frac Nd\\right\\rfloor\\).\n" +
        "- Coprime to \\(N\\) in \\(1..N\\): \\(\\varphi(N)\\).\n" +
        "- Powers mod \\(m\\) repeat: \\(2^n-2\\) is a multiple of 3 exactly when \\(n\\) is odd.\n" +
        "- Digits of a random \\(k\\)-digit number: the leading digit has 9 choices, the rest 10.",
      formula: {
        label: "Euler's function",
        latex: "\\varphi(N)=N\\prod_{p\\mid N}\\left(1-\\frac1p\\right)",
      },
      authoredExample: {
        prompt: "A number is chosen from 1 to 60. Find the probability that it is coprime to 60.",
        steps: [
          "\\(\\varphi(60)=60\\cdot\\frac12\\cdot\\frac23\\cdot\\frac45=16\\).",
        ],
        answer: "\\(\\frac{16}{60}=\\frac{4}{15}\\).",
      },
      selfCheckExample: {
        prompt: "A two-digit number is chosen at random. Find the probability that it is a multiple of 4 or 6.",
        steps: [
          "Multiples of 4: 22; of 6: 15; of 12: 8. So 29.",
        ],
        answer: "\\(\\frac{29}{90}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\varphi(30)\\)?", answer: "\\(8\\)" },
        { prompt: "Two-digit numbers?", answer: "\\(90\\)" },
        { prompt: "\\(P\\)(random 3-digit number has an odd first digit)?", answer: "\\(\\frac59\\)" },
        { prompt: "Multiples of 7 in 1..50?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "cd1ac6b5-4f20-4911-ab13-013cce125ed2", // 2022 — HCF(n, 2022) = 1 for n in 1..2022
      traps: [
        {
          title: "The leading digit cannot be 0",
          body: "In a random \\(k\\)-digit number the first digit is 1–9, so it is odd with probability \\(\\frac59\\), not \\(\\frac12\\). The other digits are 0–9.",
        },
      ],
    },
  ],
};
