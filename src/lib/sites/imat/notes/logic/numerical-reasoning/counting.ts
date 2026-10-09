import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Counting and Probability",
  title: "Counting Systematically, Overlaps and Chance",
  oneLineDefinition:
    "List possibilities in a fixed order, multiply independent choices, subtract the overlap when groups share members, and find a probability as favourable cases over all cases.",
  whyItMatters:
    "Systematic listing (codes, coins, scoring tables, seating plans) and overlapping groups appear in the Cambridge papers; probability appeared in 2012 as a screening-test question and in 2024 as a prize draw.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-listing",
      name: "Systematic listing and the multiplication rule",
      intuition:
        "Counting goes wrong when you list at random: you miss some cases and repeat others. Fix an order (smallest first, or one position at a time) and the list becomes complete and checkable. When a choice is made in independent stages, the number of outcomes is the product of the choices at each stage.",
      definition:
        "- **Systematic listing**: fix the first item, run through every option for the next, then move the first item on. Useful when there are conditions that a formula cannot handle.\n" +
        "- **Multiplication rule**: \\(a\\) ways for one stage and \\(b\\) for the next give \\(a \\times b\\) outcomes.\n" +
        "- **Arrangements** of \\(n\\) different items in a row: \\(n! = n \\times (n-1) \\times \\dots \\times 1\\).\n" +
        "- **Order matters** (codes, rankings): \\(n \\times (n-1) \\times \\dots\\) for as many places as you fill.\n" +
        "- **Order does not matter** (choosing a team): divide by the number of orders, \\(\\binom{n}{r} = \\dfrac{n!}{r!\\,(n-r)!}\\).",
      formula: {
        label: "Choosing r items from n",
        latex: "\\text{ordered: } \\frac{n!}{(n-r)!} \\qquad \\text{unordered: } \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of items available" },
          { symbol: "\\(r\\)", meaning: "number chosen" },
        ],
      },
      authoredExample: {
        prompt:
          "A café offers 3 starters, 4 main courses and 2 desserts. How many different three-course meals are there? Separately, in how many ways can you choose 2 of your 5 friends to come to the cinema?",
        steps: [
          "Meals: one choice at each stage, so \\(3 \\times 4 \\times 2 = 24\\).",
          "Friends A, B, C, D, E, listed in order: AB, AC, AD, AE, BC, BD, BE, CD, CE, DE. That is 10.",
          "Formula check: \\(\\binom{5}{2} = \\dfrac{5 \\times 4}{2} = 10\\). We divide by 2 because AB and BA are the same pair.",
        ],
        answer: "24 meals; 10 pairs",
      },
      selfCheckExample: {
        prompt:
          "A door code uses three different digits chosen from 1, 2, 3, 4 and 5, and the order of the digits matters. How many codes are possible?",
        options: ["125", "10", "15", "120", "60"],
        steps: [
          "First digit: 5 choices. Second: 4 (it must differ). Third: 3.",
          "\\(5 \\times 4 \\times 3 = 60\\).",
          "Option A allows repeated digits (\\(5^3\\)). Option B ignores order (\\(\\binom{5}{3}\\)). Option D arranges all five digits (\\(5!\\)).",
        ],
        answer: "(E) 60",
      },
      practiceSet: [
        { prompt: "In how many ways can the letters of the word PEN be arranged?", answer: "6", method: "\\(3! = 6\\)" },
        { prompt: "Six people each shake hands once with every other person. How many handshakes are there?", answer: "15", method: "\\(\\binom{6}{2}\\)" },
        { prompt: "How many outfits can be made from 4 shirts and 3 pairs of trousers?", answer: "12", method: "\\(4 \\times 3\\)" },
        { prompt: "A path 24 m long has a lamp every 4 m, including one at each end. How many lamps are there?", answer: "7", method: "6 gaps, so 7 lamps" },
      ],
      traps: [
        {
          title: "Does order matter?",
          body: "A code 123 differs from 321, so order matters. A pair of friends AB is the same as BA, so order does not. Using the ordered count for a selection doubles (or more) the true answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-overlap",
      name: "Overlapping groups and Venn reasoning",
      intuition:
        "When two groups share members, adding their sizes counts the shared members twice. Subtract the overlap once and you get the number in at least one group. A quick Venn diagram, filling the overlap first and working outwards, keeps the regions straight.",
      definition:
        "- **Either or both**: \\(n(A \\cup B) = n(A) + n(B) - n(A \\cap B)\\).\n" +
        "- **Neither** = total \\(-\\ n(A \\cup B)\\).\n" +
        "- **Only A** = \\(n(A) - n(A \\cap B)\\).\n" +
        "- **Smallest possible overlap**: \\(n(A) + n(B) - \\text{total}\\), if that is positive.\n" +
        "- Fill a Venn diagram from the centre outwards: overlap first, then the \"only\" regions, then \"neither\".",
      formula: {
        label: "Two overlapping groups",
        latex: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
        symbols: [
          { symbol: "\\(A \\cup B\\)", meaning: "in A or B or both" },
          { symbol: "\\(A \\cap B\\)", meaning: "in both A and B" },
        ],
      },
      authoredExample: {
        prompt:
          "Of 50 students, 32 study French, 21 study Spanish and 9 study both. How many study neither language? How many study French but not Spanish?",
        steps: [
          "At least one language: \\(32 + 21 - 9 = 44\\).",
          "Neither: \\(50 - 44 = 6\\).",
          "French only: \\(32 - 9 = 23\\). Check: \\(23 + 9 + 12 + 6 = 50\\), where 12 is Spanish only.",
        ],
        answer: "6 study neither; 23 study only French",
      },
      selfCheckExample: {
        prompt:
          "In a group of 80 patients, 45 have high blood pressure, 30 have diabetes and 15 have neither condition. How many have both?",
        options: ["5", "10", "15", "25", "35"],
        steps: [
          "At least one condition: \\(80 - 15 = 65\\).",
          "Both: \\(45 + 30 - 65 = 10\\).",
          "Option A subtracts both groups from 80 and forgets the 15 with neither. Option C copies the number with neither.",
        ],
        answer: "(B) 10",
      },
      practiceSet: [
        { prompt: "In a club of 40, 25 swim, 18 run and 7 do both. How many do neither?", answer: "4", method: "\\(40 - (25 + 18 - 7)\\)" },
        { prompt: "Of 60 people, 35 own a car, 20 own a bike and 10 own both. How many own a car but no bike?", answer: "25", method: "\\(35 - 10\\)" },
        { prompt: "Of 100 shoppers, 70 bought bread and 50 bought milk. What is the smallest number who could have bought both?", answer: "20", method: "\\(70 + 50 - 100\\)" },
      ],
      traps: [
        {
          title: "Adding two groups counts the overlap twice",
          body: "45 with one condition and 30 with another do not make 75 people with a condition if some have both. Subtract the overlap once: \\(n(A) + n(B) - n(A \\cap B)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-probability",
      name: "Probability in context",
      intuition:
        "Probability is a fraction: the number of ways the event can happen over the number of equally likely outcomes. For events that happen one after the other, multiply, remembering that taking an item away changes what is left. For tests and screening, imagine a round number of people (say 1000) and count how many land in each group: counts are much harder to get wrong than conditional probabilities.",
      definition:
        "- \\(P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{all equally likely outcomes}}\\), between 0 and 1.\n" +
        "- \\(P(\\text{not } A) = 1 - P(A)\\).\n" +
        "- **Independent** events: \\(P(A \\text{ and } B) = P(A) \\times P(B)\\).\n" +
        "- **Without replacement**, the second probability is out of one fewer item.\n" +
        "- **Either A or B** (no overlap): add. With overlap: add and subtract the overlap, as with groups.\n" +
        "- **Natural frequencies**: turn percentages into counts out of a round total, then read the answer as count over count.",
      formula: {
        label: "Two events in turn",
        latex: "P(A \\text{ then } B) = P(A) \\times P(B \\text{ given } A)",
        symbols: [
          { symbol: "\\(P(B \\text{ given } A)\\)", meaning: "probability of B once A has happened; equals \\(P(B)\\) if they are independent" },
        ],
      },
      authoredExample: {
        prompt:
          "In a town of 5,000 people, 2% have a certain condition. A test is positive for 90% of people who have it and for 5% of people who do not. Of the people who test positive, what fraction have the condition?",
        steps: [
          "Have the condition: \\(0.02 \\times 5000 = 100\\). Positive among them: \\(0.9 \\times 100 = 90\\).",
          "Do not have it: 4,900. False positives: \\(0.05 \\times 4900 = 245\\).",
          "All positives: \\(90 + 245 = 335\\). Fraction with the condition: \\(\\dfrac{90}{335} \\approx 0.27\\).",
          "So only about 27% of positives have the condition, because the condition is rare.",
        ],
        answer: "About 27%",
      },
      selfCheckExample: {
        prompt:
          "A bag contains 4 red, 5 blue and 3 green counters. Two counters are taken out at random, one after the other, without putting the first back. What is the probability that both are red?",
        options: ["\\(\\dfrac{1}{11}\\)", "\\(\\dfrac{1}{9}\\)", "\\(\\dfrac{1}{3}\\)", "\\(\\dfrac{2}{11}\\)", "\\(\\dfrac{1}{6}\\)"],
        steps: [
          "First red: \\(\\dfrac{4}{12}\\). Then 3 red are left out of 11: \\(\\dfrac{3}{11}\\).",
          "\\(\\dfrac{4}{12} \\times \\dfrac{3}{11} = \\dfrac{12}{132} = \\dfrac{1}{11}\\).",
          "Option B is \\(\\left(\\dfrac{4}{12}\\right)^2\\), which would be right only if the first counter were put back. Option C is the chance that just the first is red.",
        ],
        answer: "(A) \\(\\dfrac{1}{11}\\)",
      },
      practiceSet: [
        { prompt: "Two fair dice are rolled. What is the probability that the total is 7?", answer: "\\(\\dfrac{1}{6}\\)", method: "6 of the 36 outcomes" },
        { prompt: "The chance of rain is 0.3 on each of two days, independently. What is the chance of no rain on either day?", answer: "0.49", method: "\\(0.7 \\times 0.7\\)" },
        { prompt: "One card is drawn from a standard pack of 52. What is the probability that it is a heart or a king?", answer: "\\(\\dfrac{4}{13}\\)", method: "\\(13 + 4 - 1 = 16\\) cards" },
      ],
      traps: [
        {
          title: "Without replacement, the second fraction changes",
          body: "After one red counter is removed, there is one red fewer and one counter fewer. Squaring the first probability treats the draws as if the counter had been put back.",
        },
        {
          title: "A positive test is not the same as having the condition",
          body: "When a condition is rare, most positive results can come from the large healthy group. Count people in each group out of a round total before answering.",
        },
      ],
    },
  ],
};
