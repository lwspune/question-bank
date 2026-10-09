import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_PST_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Counting Methods",
  title: "Counting: Arrangements and Choices",
  oneLineDefinition:
    "Count outcomes without listing them: multiply the number of ways for each step, divide out repeats, and use combinations when order does not matter.",
  whyItMatters:
    "A 2017 question asked how many ways the letters of a short word with repeated letters can be arranged. Counting also gives the totals you divide by in every probability question.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-pst-multiplication",
      name: "The multiplication principle and arrangements (permutations)",
      intuition:
        "If you choose a shirt from 4 and then trousers from 3, each shirt goes with each pair of trousers: \\(4 \\times 3 = 12\\) outfits. Arranging objects in a row is the same idea: the first place has \\(n\\) choices, the next \\(n - 1\\), and so on. When some objects are identical, swapping them makes no new arrangement, so you divide those swaps out.",
      definition:
        "- **Multiplication principle**: if one step can be done in \\(m\\) ways and the next in \\(n\\) ways, the two together can be done in \\(m \\times n\\) ways.\n" +
        "- \\(n\\) **factorial**: \\(n! = n \\times (n - 1) \\times \\cdots \\times 2 \\times 1\\), with \\(0! = 1\\). It counts the arrangements of \\(n\\) different objects in a row.\n" +
        "- **Permutations** of \\(r\\) objects chosen from \\(n\\) different ones, in order: \\({}^nP_r = \\dfrac{n!}{(n - r)!}\\).\n" +
        "- **Repeated objects**: \\(n\\) objects with \\(p\\) alike of one kind, \\(q\\) alike of another, and so on, can be arranged in \\(\\dfrac{n!}{p!\\,q!\\cdots}\\) ways.",
      formula: {
        label: "Arrangements",
        latex: "{}^nP_r = \\frac{n!}{(n - r)!} \\qquad \\text{with repeats: } \\frac{n!}{p!\\,q!\\cdots}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of objects available" },
          { symbol: "\\(r\\)", meaning: "number placed in order" },
          { symbol: "\\(p, q\\)", meaning: "sizes of groups of identical objects" },
        ],
      },
      authoredExample: {
        prompt: "In how many ways can the letters of the word PEPPER be arranged? How many of these arrangements begin with R?",
        steps: [
          "Six letters: P three times, E twice, R once.",
          "Arrangements: \\(\\dfrac{6!}{3!\\,2!} = \\dfrac{720}{6 \\times 2} = 60\\).",
          "Fix R first: the other five letters (P, P, P, E, E) give \\(\\dfrac{5!}{3!\\,2!} = 10\\).",
        ],
        answer: "60 arrangements; 10 begin with R",
      },
      selfCheckExample: {
        prompt: "A club of 7 members chooses a president, a secretary and a treasurer, three different people. In how many ways can this be done?",
        options: ["35", "210", "343", "21", "5040"],
        steps: [
          "The posts are different, so order matters: \\(7 \\times 6 \\times 5 = 210\\).",
          "A counts groups of three without posts (a combination); C lets one person hold several posts; E arranges all 7 members.",
        ],
        answer: "(B) 210",
      },
      practiceSet: [
        { prompt: "In how many orders can 5 different books stand on a shelf?", answer: "120", method: "\\(5!\\)" },
        { prompt: "How many 3-digit codes can be made from the digits 0 to 9 if digits may repeat?", answer: "1000", method: "\\(10^3\\)" },
        { prompt: "How many different arrangements do the letters of SEE have?", answer: "3", method: "\\(3!/2!\\)" },
        { prompt: "How many outfits come from 4 shirts and 3 pairs of trousers?", answer: "12" },
      ],
      traps: [
        {
          title: "Identical letters do not make new arrangements",
          body: "Swapping two identical letters gives the same word, so \\(n!\\) overcounts. Divide by the factorial of the size of each group of repeats; forgetting this gives a much larger number that IMAT puts among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-combinations",
      name: "Combinations: choosing a group when order does not matter",
      intuition:
        "Choosing a team of 3 from 8 people is different from filling 3 named posts: the team Ana, Ben, Carla is the same team in any order. Count the ordered choices and divide by the \\(3!\\) orders of each team.",
      definition:
        "- A **combination** is a selection where order does not matter.\n" +
        "- The number of ways to choose \\(r\\) from \\(n\\) different objects is \\(\\dbinom{n}{r} = {}^nC_r = \\dfrac{n!}{r!\\,(n - r)!}\\).\n" +
        "- \\(\\dbinom{n}{r} = \\dbinom{n}{n - r}\\): choosing who is in is the same as choosing who is out.\n" +
        "- For a group from two separate pools, multiply: choose from each pool, then use the multiplication principle.",
      formula: {
        label: "Combinations",
        latex: "\\binom{n}{r} = \\frac{n!}{r!\\,(n - r)!}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of objects to choose from" },
          { symbol: "\\(r\\)", meaning: "number chosen" },
        ],
      },
      authoredExample: {
        prompt: "A committee of 4 is to be formed from 5 women and 4 men, with exactly 2 women. In how many ways? And how many committees of 3 can be formed from 8 people with no condition?",
        steps: [
          "Choose 2 of the 5 women: \\(\\dbinom{5}{2} = 10\\). Choose 2 of the 4 men: \\(\\dbinom{4}{2} = 6\\).",
          "Together: \\(10 \\times 6 = 60\\) committees.",
          "Any 3 of 8: \\(\\dbinom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56\\).",
        ],
        answer: "60 committees; 56 committees",
      },
      selfCheckExample: {
        prompt: "A pizza shop offers 9 different toppings. In how many ways can a customer choose 4 different toppings?",
        options: ["126", "3024", "36", "24", "6561"],
        steps: [
          "Order does not matter: \\(\\dbinom{9}{4} = \\dfrac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126\\).",
          "B counts ordered choices (\\({}^9P_4\\)); C is \\(\\dbinom{9}{2}\\); D is \\(4!\\); E allows the same topping repeatedly in order.",
        ],
        answer: "(A) 126",
      },
      practiceSet: [
        { prompt: "\\(\\dbinom{5}{2} = ?\\)", answer: "10" },
        { prompt: "\\(\\dbinom{10}{8} = ?\\)", answer: "45", method: "Same as \\(\\dbinom{10}{2}\\)" },
        { prompt: "Six people each shake hands once with every other. How many handshakes?", answer: "15", method: "\\(\\dbinom{6}{2}\\)" },
        { prompt: "Choose 2 of 4 red marbles and 1 of 3 blue marbles. How many selections?", answer: "18", method: "\\(6 \\times 3\\)" },
      ],
      traps: [
        {
          title: "Ask whether order matters before you count",
          body: "Named posts, rankings, codes and words are ordered: use permutations. Teams, hands of cards and sets of toppings are not: use combinations. The two answers differ by a factor of \\(r!\\), and both appear among the options.",
        },
      ],
    },
  ],
};
