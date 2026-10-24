import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_DICE_NOTE: SubtopicNote = {
  subtopicName: "Dice",
  title: "Dice: One Die, the 36 Pairs and Three Dice",
  oneLineDefinition:
    "One die has 6 equally likely faces, two dice 36 ordered pairs and three dice 216 triples; count the favourable ones from a pattern or a grid, or multiply die by die.",
  whyItMatters:
    "Two dice carry most of this page: sums, products, differences and doublets, all counted on the 6 by 6 grid of ordered pairs. Marks are lost by treating (2, 5) and (5, 2) as one outcome, by miscounting a sum, and on three dice by forgetting how many ways an 'exactly' can be arranged.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpr-die-single",
      name: "One die: six equally likely faces",
      intuition:
        "A fair die shows 1 to 6, each with probability \\(\\tfrac16\\). Count the faces that fit the question and divide by 6.",
      definition:
        "- Even faces: 2, 4, 6. Odd faces: 1, 3, 5. Prime faces: 2, 3, 5. Multiples of 3: 3, 6.\n" +
        "- 'Greater than 4' is 5 and 6; 'at least 4' adds the 4.\n" +
        "- 'Not' a property: count the faces that fail it, or take 1 minus the probability.",
      formula: {
        label: "One die",
        latex: "P = \\dfrac{\\text{faces that fit}}{6}",
      },
      authoredExample: {
        prompt: "A die is thrown. Find the probability of a number that is odd and at least 3.",
        steps: ["The odd faces are 1, 3, 5; of these, 3 and 5 are at least 3.", "\\(P = \\tfrac{2}{6} = \\tfrac{1}{3}\\)."],
        answer: "\\(\\tfrac{1}{3}\\).",
      },
      selfCheckExample: {
        prompt: "A die is thrown. Find the probability of a number that is not a multiple of 3.",
        steps: ["The faces 1, 2, 4, 5 are not multiples of 3.", "\\(P = \\tfrac{4}{6} = \\tfrac{2}{3}\\)."],
        answer: "\\(\\tfrac{2}{3}\\).",
      },
      practiceSet: [
        { prompt: "A die is thrown. Find the probability of a factor of 6.", answer: "\\(\\tfrac{2}{3}\\)", method: "1, 2, 3, 6." },
        { prompt: "A die is thrown. Find the probability of a number greater than 1.", answer: "\\(\\tfrac{5}{6}\\)" },
        { prompt: "A die is thrown. Find the probability of a number that is both even and prime.", answer: "\\(\\tfrac{1}{6}\\)" },
      ],
      pyqExampleId: "068b8b47-a661-48d2-882f-882d25af76c0",
      traps: [
        {
          title: "Greater than or at least",
          body: "'Greater than 3' on a die is 4, 5, 6, so \\(\\tfrac12\\). 'At least 3' is 3, 4, 5, 6, so \\(\\tfrac23\\).",
        },
        {
          title: "2 is prime",
          body: "The prime faces are 2, 3 and 5. Leaving out 2 gives \\(\\tfrac13\\) instead of \\(\\tfrac12\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-dice-sums",
      visualizationSlug: "af-dice-sum-grid",
      name: "Sums on two dice",
      intuition:
        "Two dice give \\(6 \\times 6 = 36\\) ordered pairs. A sum of 7 is the most common, made 6 ways. Each step away from 7 loses one way, down to 1 way each for 2 and 12.",
      definition:
        "- The number of ways to make a sum s (from 2 to 12) is \\(6 - |s - 7|\\).\n" +
        "- (1, 6) and (6, 1) are different outcomes: the two dice are told apart even when thrown together.\n" +
        "- For a set of sums, add the ways for each sum, then divide by 36.\n" +
        "- 'Given the sum is s' shrinks the sample space to that sum's pairs, as on the coins page.",
      formula: {
        label: "Ways to make a sum",
        latex: "n(\\text{sum } s) = 6 - |s - 7|, \\quad 2 \\le s \\le 12",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that the sum is a prime number.",
        steps: [
          "The prime sums are 2, 3, 5, 7 and 11.",
          "Their ways: \\(1 + 2 + 4 + 6 + 2 = 15\\).",
          "\\(P = \\tfrac{15}{36} = \\tfrac{5}{12}\\).",
        ],
        answer: "\\(\\tfrac{5}{12}\\).",
      },
      selfCheckExample: {
        prompt: "Two dice are thrown. Find the probability that the sum is a multiple of 5.",
        steps: ["Sums 5 and 10: \\(4 + 3 = 7\\) ways.", "\\(P = \\tfrac{7}{36}\\)."],
        answer: "\\(\\tfrac{7}{36}\\).",
      },
      practiceSet: [
        { prompt: "Two dice are thrown. Find the probability of a sum of 11.", answer: "\\(\\tfrac{1}{18}\\)" },
        { prompt: "Two dice are thrown. Find the probability that the sum is odd.", answer: "\\(\\tfrac{1}{2}\\)", method: "Sums 3, 5, 7, 9, 11: \\(2 + 4 + 6 + 4 + 2 = 18\\)." },
        { prompt: "Two dice are thrown. Find the probability that the sum is less than 4.", answer: "\\(\\tfrac{1}{12}\\)" },
        {
          prompt: "Two dice are thrown and the sum is 6. Find the probability that both dice show odd numbers.",
          answer: "\\(\\tfrac{3}{5}\\)",
          method: "Of (1, 5), (2, 4), (3, 3), (4, 2), (5, 1), three are both odd.",
        },
      ],
      pyqExampleId: "3b5a977e-0c5e-408f-a4a3-2473992dc501",
      traps: [
        {
          title: "Count both orders",
          body: "A sum of 3 comes from (1, 2) and (2, 1): 2 ways, so \\(\\tfrac{1}{18}\\). Counting it once gives \\(\\tfrac{1}{36}\\).",
        },
        {
          title: "The 11 sums are not equally likely",
          body: "There are 11 possible sums, 2 to 12, but 7 is six times as likely as 2. Never write \\(\\tfrac{1}{11}\\) for one sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-dice-pairs",
      name: "Products, differences and doublets",
      intuition:
        "For anything other than a sum, walk the grid: list the pairs that fit, each order counted, and divide by 36.",
      definition:
        "- A **doublet** is both dice the same, (1, 1) to (6, 6): 6 pairs.\n" +
        "- Product n: list the factor pairs with both factors from 1 to 6, each in both orders, except a square such as (3, 3), which is one pair.\n" +
        "- Difference d (larger minus smaller): \\(2(6 - d)\\) pairs for d from 1 to 5, and 6 pairs (the doublets) for d = 0.\n" +
        "- 'The first die shows more than the second' is half of the 30 pairs that are not doublets.",
      formula: {
        label: "Pairs with difference d",
        latex: "n(|a - b| = d) = 2(6 - d), \\quad 1 \\le d \\le 5",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that the product of the numbers is 4.",
        steps: ["The pairs are (1, 4), (4, 1) and (2, 2): 3 pairs.", "\\(P = \\tfrac{3}{36} = \\tfrac{1}{12}\\)."],
        answer: "\\(\\tfrac{1}{12}\\).",
      },
      selfCheckExample: {
        prompt: "Two dice are thrown. Find the probability that the numbers differ by 4.",
        steps: ["(1, 5), (2, 6) and their reverses: \\(2(6 - 4) = 4\\) pairs.", "\\(P = \\tfrac{4}{36} = \\tfrac{1}{9}\\)."],
        answer: "\\(\\tfrac{1}{9}\\).",
      },
      practiceSet: [
        { prompt: "Two dice are thrown. Find the probability of a doublet of even numbers.", answer: "\\(\\tfrac{1}{12}\\)" },
        { prompt: "Two dice are thrown. Find the probability that the product is 18.", answer: "\\(\\tfrac{1}{18}\\)", method: "(3, 6) and (6, 3)." },
        { prompt: "Two dice are thrown. Find the probability that the numbers differ by 1.", answer: "\\(\\tfrac{5}{18}\\)" },
        { prompt: "Two dice are thrown. Find the probability that the first die shows a larger number than the second.", answer: "\\(\\tfrac{5}{12}\\)" },
      ],
      pyqExampleId: "798f97cf-0056-4d4c-ac18-6848d3fc9e13",
      traps: [
        {
          title: "A square product counts once",
          body: "Product 9 is only (3, 3), one pair. Product 6 is (1, 6), (6, 1), (2, 3) and (3, 2): four pairs.",
        },
        {
          title: "Differ by means either order",
          body: "'The numbers differ by 4' includes (5, 1) as well as (1, 5). Counting one order halves the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-dice-each",
      name: "Die by die: multiply, and one minus none",
      intuition:
        "The dice do not affect each other, so a condition on each die separately multiplies. Both dice show a number greater than 2 with probability \\(\\tfrac46 \\times \\tfrac46 = \\tfrac49\\).",
      definition:
        "- Independent dice: P(a condition on die 1 and a condition on die 2) is the product of the two.\n" +
        "- At least one six from n dice: \\(1 - \\left(\\tfrac56\\right)^n\\).\n" +
        "- Exactly one of two dice shows a given number: \\(2 \\times \\tfrac16 \\times \\tfrac56 = \\tfrac{10}{36}\\), the two orders added.\n" +
        "- Use the complement whenever 'at least one' appears: one product instead of several cases.",
      formula: {
        label: "At least one six from n dice",
        latex: "P(\\text{at least one six}) = 1 - \\left(\\tfrac56\\right)^n",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that at least one shows a number greater than 4.",
        steps: [
          "Neither die above 4: \\(\\tfrac46 \\times \\tfrac46 = \\tfrac{16}{36}\\).",
          "\\(P = 1 - \\tfrac{16}{36} = \\tfrac{20}{36} = \\tfrac{5}{9}\\).",
        ],
        answer: "\\(\\tfrac{5}{9}\\).",
      },
      selfCheckExample: {
        prompt: "Three dice are thrown. Find the probability that every die shows at most 4.",
        steps: ["Each die: \\(\\tfrac46 = \\tfrac23\\).", "\\(\\left(\\tfrac23\\right)^3 = \\tfrac{8}{27}\\)."],
        answer: "\\(\\tfrac{8}{27}\\).",
      },
      practiceSet: [
        { prompt: "Two dice are thrown. Find the probability that the first is even and the second is greater than 4.", answer: "\\(\\tfrac{1}{6}\\)" },
        { prompt: "Two dice are thrown. Find the probability that at least one shows a 3.", answer: "\\(\\tfrac{11}{36}\\)" },
        { prompt: "Three dice are thrown. Find the probability of at least one 6.", answer: "\\(\\tfrac{91}{216}\\)" },
        { prompt: "Two dice are thrown. Find the probability that exactly one shows an even number.", answer: "\\(\\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "a7222897-e691-4a74-9e25-d05120fa210b",
      traps: [
        {
          title: "Do not add for at least one",
          body: "At least one six on two dice is not \\(\\tfrac16 + \\tfrac16 = \\tfrac13\\): that counts (6, 6) twice. It is \\(1 - \\tfrac{25}{36} = \\tfrac{11}{36}\\).",
        },
        {
          title: "Exactly one has two orders",
          body: "'Exactly one die shows a 4' on two dice is \\(\\tfrac16 \\times \\tfrac56\\) for each die, so twice that: \\(\\tfrac{10}{36}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-three-dice",
      name: "Three dice: 216 ordered triples",
      intuition:
        "Three dice give \\(6^3 = 216\\) ordered triples. Count favourable triples by multiplying the choices die by die, or by choosing which dice do what.",
      definition:
        "- One triple such as (2, 2, 2) has probability \\(\\tfrac{1}{216}\\). The smallest and largest sums, 3 and 18, can each be made only one way.\n" +
        "- Exactly k dice show a six: \\(^3C_k \\left(\\tfrac16\\right)^k \\left(\\tfrac56\\right)^{3 - k}\\). The \\(^3C_k\\) picks which dice, as \\(^nC_k\\) picked the coins.\n" +
        "- All different values: multiply the choices die by die, one fewer each time.\n" +
        "- All the same value: 6 triples, (1, 1, 1) to (6, 6, 6).",
      formula: {
        label: "Exactly k sixes on three dice",
        latex: "P = {}^3C_k \\left(\\tfrac16\\right)^k \\left(\\tfrac56\\right)^{3 - k}",
      },
      authoredExample: {
        prompt: "Three dice are thrown. Find the probability that exactly two show a number greater than 4.",
        steps: [
          "For one die, P(greater than 4) \\(= \\tfrac26 = \\tfrac13\\).",
          "Choose the two dice: \\(^3C_2 = 3\\).",
          "\\(P = 3 \\times \\left(\\tfrac13\\right)^2 \\times \\tfrac23 = \\tfrac{6}{27} = \\tfrac{2}{9}\\).",
        ],
        answer: "\\(\\tfrac{2}{9}\\).",
      },
      selfCheckExample: {
        prompt: "Three dice are thrown. Find the probability that all three show the same number.",
        steps: ["6 triples, (1, 1, 1) to (6, 6, 6).", "\\(P = \\tfrac{6}{216} = \\tfrac{1}{36}\\)."],
        answer: "\\(\\tfrac{1}{36}\\).",
      },
      practiceSet: [
        { prompt: "Three dice are thrown. Find the probability of a sum of 4.", answer: "\\(\\tfrac{1}{72}\\)", method: "(1, 1, 2) in 3 orders." },
        { prompt: "Four dice are thrown. Find the probability that all four show different numbers.", answer: "\\(\\tfrac{5}{18}\\)", method: "\\(\\tfrac{6 \\times 5 \\times 4 \\times 3}{1296}\\)." },
        { prompt: "Three dice are thrown. Find the probability of exactly one 6.", answer: "\\(\\tfrac{25}{72}\\)" },
      ],
      pyqExampleId: "5247f57a-3869-48f6-9e6a-6d030003405d",
      traps: [
        {
          title: "Choose which dice",
          body: "Exactly two sixes on three dice is not \\(\\left(\\tfrac16\\right)^2 \\times \\tfrac56\\) alone. The die that is not a six can be any of the three, so multiply by 3: \\(\\tfrac{15}{216}\\).",
        },
        {
          title: "A sum of 4 has three triples",
          body: "(1, 1, 2), (1, 2, 1) and (2, 1, 1) are three different outcomes, so a sum of 4 has probability \\(\\tfrac{3}{216}\\), not \\(\\tfrac{1}{216}\\).",
        },
      ],
    },
  ],
};
