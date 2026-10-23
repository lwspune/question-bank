import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Counting, Chance and Shapes",
  title: "Counting, Chance and Shapes",
  oneLineDefinition:
    "Count pairs with n times (n minus 1) over 2, find a probability as favourable over total, and use the standard volume and diagonal facts for shapes.",
  whyItMatters:
    "Seven questions in the bank, all EASY and all from the 2025 shifts. Four count pairs (handshakes, matches, the diagonals of a polygon), one asks a simple probability, and two use a fact about a shape.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrarco-pairs",
      name: "Counting pairs",
      intuition:
        "A handshake, a match or a diagonal joins two things. Each of n people can pair with n minus 1 others, but that counts every pair twice, once from each end, so halve it.",
      definition:
        "- **Every pair once** (handshakes, single matches): \\(\\frac{n(n - 1)}{2}\\).\n" +
        "- **Every pair twice** (home and away matches): \\(n(n - 1)\\).\n" +
        "- **Each of n people takes part in exactly k handshakes:** \\(\\frac{nk}{2}\\), because each handshake has two people in it.\n" +
        "- **Diagonals of a polygon with n sides:** \\(\\frac{n(n - 3)}{2}\\). Each corner joins every other corner except itself and its two neighbours.\n" +
        "- **Check:** \\(1 + 2 + \\dots + (n - 1)\\) gives the same count as \\(\\frac{n(n - 1)}{2}\\).",
      formula: {
        label: "Pairs and diagonals",
        latex: "\\text{Pairs} = \\frac{n(n - 1)}{2} \\qquad \\text{Diagonals} = \\frac{n(n - 3)}{2}",
        symbols: [{ symbol: "n", meaning: "the number of people, teams or sides" }],
      },
      authoredExample: {
        prompt: "In a league of 9 teams, each team plays every other team once. How many matches are played?",
        steps: [
          "Each match is a pair of teams: \\(\\frac{9 \\times 8}{2} = 36\\).",
          "Check: the first team plays 8 matches, the next 7 new ones, and so on: \\(8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36\\).",
        ],
        answer: "36",
      },
      selfCheckExample: {
        prompt: "How many diagonals does an octagon (8 sides) have?",
        steps: ["\\(\\frac{8 \\times (8 - 3)}{2} = \\frac{40}{2} = 20\\)."],
        answer: "20",
      },
      practiceSet: [
        { prompt: "10 people each shake hands once with every other person. How many handshakes are there?", answer: "45" },
        { prompt: "How many diagonals does a pentagon have?", answer: "5" },
        { prompt: "In a group of 12 people, each person shakes hands with exactly 4 others. How many handshakes are there?", answer: "24" },
        { prompt: "5 teams each play every other team twice. How many matches are played?", answer: "20" },
      ],
      pyqExampleId: "733fdc41-442c-4ba5-98d9-4805e5fbf084",
      traps: [
        {
          title: "Counting each pair from both ends",
          body:
            "\\(n(n - 1)\\) counts the handshake between A and B once for A and once for B. For single handshakes or single matches, halve it.",
        },
        {
          title: "Counting the sides as diagonals",
          body:
            "\\(\\frac{n(n - 1)}{2}\\) counts every line joining two corners, and that includes the n sides. A diagonal joins corners that are not next to each other, so take the sides away: \\(\\frac{n(n - 3)}{2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarco-chance",
      name: "Probability as a fraction",
      intuition:
        "When every outcome is equally likely, a probability is just a count: the outcomes you want over all the outcomes there are.",
      definition:
        "- **Probability \\(=\\) favourable outcomes \\(\\div\\) all outcomes**, when every outcome is equally likely.\n" +
        "- **Not happening:** \\(P(\\text{not } E) = 1 - P(E)\\). Use it when the event you want is the larger group.\n" +
        "- A probability is always between 0 and 1. Options may be fractions or decimals: \\(\\frac{1}{4} = 0.25\\), \\(\\frac{3}{10} = 0.3\\).",
      formula: {
        label: "Probability and its complement",
        latex: "P(E) = \\frac{\\text{favourable}}{\\text{total}} \\qquad P(\\text{not } E) = 1 - P(E)",
      },
      authoredExample: {
        prompt: "A bag has 4 white, 6 black and 2 yellow balls. One ball is drawn at random. What is the probability that it is not black?",
        steps: [
          "Total balls: \\(4 + 6 + 2 = 12\\). Not black: \\(4 + 2 = 6\\).",
          "Probability \\(= \\frac{6}{12} = 0.5\\).",
          "Check: \\(P(\\text{black}) = \\frac{6}{12} = 0.5\\), and \\(1 - 0.5 = 0.5\\).",
        ],
        answer: "0.5",
      },
      selfCheckExample: {
        prompt: "A die is thrown once. What is the probability of getting a number greater than 4?",
        steps: ["Favourable: 5 and 6, so 2 out of 6.", "\\(\\frac{2}{6} = \\frac{1}{3}\\)."],
        answer: "\\(\\frac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "A box has 3 red pens and 7 green pens. One pen is picked at random. What is the probability that it is red?", answer: "0.3" },
        { prompt: "The probability of rain tomorrow is 0.35. What is the probability of no rain?", answer: "0.65" },
        {
          prompt: "Cards numbered 1 to 20 are shuffled and one is drawn. What is the probability that it shows a multiple of 5?",
          answer: "\\(\\frac{1}{5}\\)",
          method: "5, 10, 15, 20: 4 out of 20.",
        },
        { prompt: "A coin is tossed once. What is the probability of a head?", answer: "\\(\\frac{1}{2}\\)" },
      ],
      pyqExampleId: "452c9fb3-96c9-4f46-a486-71fc6b442145",
      traps: [
        {
          title: "Dividing by the wrong total",
          body:
            "With 3 red and 9 other balls, the chance of red is \\(\\frac{3}{12}\\), not \\(\\frac{3}{9}\\). Divide by every ball in the bag, including the ones you want.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarco-shapes",
      name: "Shape facts: volumes and diagonals",
      intuition:
        "A few shape facts carry these questions. A cone holds a third of the cylinder with the same base and height, and the diagonal of a rectangle is the long side of a right triangle.",
      definition:
        "- **Cylinder:** \\(\\pi r^2 h\\). **Cone:** \\(\\frac{1}{3}\\pi r^2 h\\), a third of the cylinder with the same base and height.\n" +
        "- **Diagonal of a rectangle** \\(= \\sqrt{l^2 + b^2}\\); **of a square** \\(=\\) side \\(\\times \\sqrt{2}\\).\n" +
        "- **Triples to know:** 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25. Multiples work too (6, 8, 10).\n" +
        "- When the square root is not a whole number, find the two squares it lies between, and say so: the answer is then approximate.",
      formula: {
        label: "Cylinder, cone and diagonal",
        latex: "V_{\\text{cyl}} = \\pi r^2 h \\qquad V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h \\qquad d = \\sqrt{l^2 + b^2}",
        symbols: [
          { symbol: "r, h", meaning: "radius of the base and height" },
          { symbol: "l, b", meaning: "length and breadth of the rectangle" },
        ],
      },
      authoredExample: {
        prompt: "A rectangle is 24 cm long and 7 cm wide. What is the length of its diagonal?",
        steps: [
          "\\(d = \\sqrt{24^2 + 7^2} = \\sqrt{576 + 49} = \\sqrt{625} = 25\\) cm.",
          "Fast route: 7, 24, 25 is a triple to know, so no working is needed.",
        ],
        answer: "25 cm",
      },
      selfCheckExample: {
        prompt: "A cylinder and a cone have the same base radius and the same volume. The cylinder is 5 cm tall. How tall is the cone?",
        steps: [
          "The cone holds a third of a cylinder of the same height, so for equal volumes it must be three times as tall.",
          "\\(3 \\times 5 = 15\\) cm.",
        ],
        answer: "15 cm",
      },
      practiceSet: [
        { prompt: "A rectangle is 12 m long and 5 m wide. What is its diagonal?", answer: "13 m" },
        {
          prompt: "Find the volume of a cylinder of radius 7 cm and height 10 cm. Take \\(\\pi = \\frac{22}{7}\\).",
          answer: "1540 cm³",
          method: "\\(\\frac{22}{7} \\times 49 \\times 10\\).",
        },
        { prompt: "A cone holds 40 L. How much does a cylinder with the same base and height hold?", answer: "120 L" },
        { prompt: "A square has side 6 cm. What is the length of its diagonal?", answer: "\\(6\\sqrt{2}\\) cm" },
      ],
      pyqExampleId: "08da7674-c453-482c-9ade-1ea4ce1102ff",
      traps: [
        {
          title: "Taking the cone as half the cylinder",
          body:
            "With the same base and height, a cone holds one third of the cylinder, not one half.",
        },
        {
          title: "Treating an approximate diagonal as exact",
          body:
            "\\(\\sqrt{l^2 + b^2}\\) is a whole number only for triples such as 3, 4, 5. Otherwise it lies between two whole numbers, and the nearest option is an approximation.",
        },
      ],
    },
  ],
};
