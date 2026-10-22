import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LE_WORD_NOTE: SubtopicNote = {
  subtopicName: "Word Problems on Linear Equations",
  title: "Word Problems on Linear Equations",
  oneLineDefinition:
    "A word problem is solved by naming the unknown, writing each sentence as an equation, and answering the quantity the question actually asks for.",
  whyItMatters:
    "Seven questions in the bank, 4 EASY and 3 MODERATE, and four of them are from the 2022 paper, more than any other part of this chapter. The algebra is short. The work is choosing the unknown and writing each sentence as an equation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilewp-one",
      name: "One unknown from a sentence",
      intuition:
        "Call the smallest or the most-mentioned quantity x, and write every other quantity in terms of x. Then the one fact about the total gives one equation.",
      definition:
        "- '3 more than x' is \\(x + 3\\), '2 less than x' is \\(x - 2\\), 'twice x' is \\(2x\\), 'half of x' is \\(\\frac{x}{2}\\).\n" +
        "- A fixed part plus a rate gives a linear rule: a fixed charge of ₹50 plus ₹8 per km is \\(y = 50 + 8x\\).\n" +
        "- Answer the quantity asked for, which may not be x itself.",
      formula: {
        label: "Fixed part plus a rate",
        latex: "y = a + bx \\quad (a = \\text{fixed part},\\ b = \\text{rate per unit}) \\qquad x + (x + 1) + (x + 2) = 3x + 3",
      },
      authoredExample: {
        prompt:
          "A rope 46 m long is cut into three pieces. The second piece is 4 m longer than the first, and the third is 2 m longer than the second. Find the longest piece.",
        steps: [
          "Let the first piece be \\(x\\). The second is \\(x + 4\\) and the third \\(x + 6\\).",
          "\\(x + (x + 4) + (x + 6) = 46\\), so \\(3x = 36\\) and \\(x = 12\\).",
          "The longest is the third: \\(12 + 6 = 18\\) m. Check: \\(12 + 16 + 18 = 46\\).",
        ],
        answer: "18 m",
      },
      selfCheckExample: {
        prompt: "A taxi charges a fixed ₹40 plus ₹12 for each km. Write the fare \\(y\\) for \\(x\\) km, and find the fare for 15 km.",
        steps: ["\\(y = 40 + 12x\\).", "\\(y = 40 + 12 \\times 15 = 220\\)."],
        answer: "\\(y = 12x + 40\\), and ₹220 for 15 km.",
      },
      practiceSet: [
        { prompt: "The sum of three consecutive numbers is 72. Find the largest.", answer: "25 (the numbers are 23, 24, 25)" },
        { prompt: "A father is three times as old as his son, and their ages add up to 52. How old is the son?", answer: "13" },
        { prompt: "₹90 is shared between A and B so that A gets ₹20 more than B. How much does A get?", answer: "₹55" },
      ],
      pyqExampleId: "db28ef27-fb39-4f6a-9353-5683a157dc78",
      traps: [
        {
          title: "Stopping at x",
          body:
            "If x is the smallest piece and the question asks for the longest, work out the longest piece's expression. The value of x itself is often printed as a wrong option.",
        },
        {
          title: "Reversing 'more than'",
          body:
            "'A has 5 more than B' is \\(A = B + 5\\), not \\(B = A + 5\\). Decide who has more before you write the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilewp-chain",
      name: "Chains of comparisons: ages and heights",
      intuition:
        "When several people are compared one after another, pick the person who links the most statements and write everyone else in terms of that person. The whole chain then becomes one equation.",
      definition:
        "- 'A is half of B' means \\(B = 2A\\). 'A is one and a half times B' means \\(A = 1.5B\\).\n" +
        "- 'A is 12 years older than B' means \\(A = B + 12\\).\n" +
        "- 'Taller than M by the same amount as shorter than T' puts the height halfway between: \\(s - m = t - s\\), so \\(m + t = 2s\\).\n" +
        "- Keep one unit: change metres to centimetres before adding a length in centimetres.\n" +
        "- Check the answer against every statement, not just the last one.",
      formula: {
        label: "Comparison sentences as equations",
        latex:
          "A = \\tfrac{1}{2}B \\;\\Rightarrow\\; B = 2A \\qquad A = B + k \\ (A \\text{ is } k \\text{ older}) \\qquad s - m = t - s \\;\\Rightarrow\\; m + t = 2s \\ (s \\text{ halfway})",
      },
      authoredExample: {
        prompt:
          "Ravi is twice as old as Meena. Meena is 4 years older than Joy. Ravi is 26 years older than Joy. How old is Joy?",
        steps: [
          "Let Joy be \\(j\\). Meena is \\(j + 4\\) and Ravi is \\(2(j + 4) = 2j + 8\\).",
          "Ravi minus Joy: \\((2j + 8) - j = 26\\), so \\(j = 18\\).",
          "Check: Meena 22, Ravi 44, and \\(44 - 18 = 26\\).",
        ],
        answer: "18 years",
      },
      selfCheckExample: {
        prompt:
          "Three sticks have a total length of 3.6 m. The middle stick is exactly halfway in length between the shortest and the longest. Find the length of the middle stick in cm.",
        steps: [
          "In cm: \\(s + m + t = 360\\), and halfway means \\(s + t = 2m\\).",
          "So \\(3m = 360\\) and \\(m = 120\\).",
        ],
        answer: "120 cm",
      },
      practiceSet: [
        { prompt: "Anu is one and a half times as old as Bela, and Bela is 8. How old is Anu?", answer: "12" },
        { prompt: "A is 5 years older than B, and B is half as old as C. If C is 30, how old is A?", answer: "20" },
        {
          prompt: "The heights of two boys add up to 3.15 m and one is 15 cm taller than the other. Find the shorter boy's height in cm.",
          answer: "150 cm",
        },
      ],
      pyqExampleId: "1fcfe093-0c5a-4cc1-9cb8-c1bd879a9dfd",
      traps: [
        {
          title: "Mixing metres and centimetres",
          body: "2.5 m is 250 cm. Adding 30 cm to a height still written as 2.5 gives nonsense, so change units first.",
        },
        {
          title: "Reading 'half that of' backwards",
          body:
            "'P's age is half that of Q' means \\(P = \\frac{Q}{2}\\), so Q is the older. Writing \\(Q = \\frac{P}{2}\\) swaps the two people.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilewp-two",
      name: "Two unknowns, two equations",
      intuition:
        "When a question talks about two different counts, give each its own letter. Each fact becomes one equation, and the pair is solved by elimination.",
      definition:
        "- **Coins:** for ₹1 and ₹2 coins, the number of coins is \\(x + y\\) and their value is \\(x + 2y\\).\n" +
        "- **Heads and legs:** for cows and hens, heads are \\(c + h\\) and legs \\(4c + 2h\\).\n" +
        "- **Fractions:** call the fraction \\(\\frac{x}{y}\\). 'Add 1 to both' gives \\(\\frac{x + 1}{y + 1}\\). Cross-multiply to get a linear equation.\n" +
        "- Sometimes one unknown cancels and the question only needs the other.",
      authoredExample: {
        prompt: "A purse holds ₹5 and ₹10 coins, 30 coins in all, worth ₹220. How many ₹10 coins are there?",
        steps: [
          "Let there be \\(x\\) coins of ₹5 and \\(y\\) of ₹10: \\(x + y = 30\\) and \\(5x + 10y = 220\\).",
          "Divide the second by 5: \\(x + 2y = 44\\). Subtract the first: \\(y = 14\\).",
          "Check: 16 coins of ₹5 and 14 of ₹10 make \\(80 + 140 = 220\\).",
        ],
        answer: "14",
      },
      selfCheckExample: {
        prompt:
          "A fraction becomes \\(\\frac{1}{2}\\) when 2 is added to its numerator, and \\(\\frac{1}{3}\\) when 1 is subtracted from its denominator. Find the fraction.",
        steps: [
          "\\(\\frac{x + 2}{y} = \\frac{1}{2}\\) gives \\(y = 2x + 4\\).",
          "\\(\\frac{x}{y - 1} = \\frac{1}{3}\\) gives \\(y = 3x + 1\\).",
          "\\(2x + 4 = 3x + 1\\), so \\(x = 3\\) and \\(y = 10\\).",
        ],
        answer: "\\(\\frac{3}{10}\\)",
      },
      practiceSet: [
        { prompt: "A farm has hens and goats with 40 heads and 110 legs. How many goats are there?", answer: "15" },
        { prompt: "The sum of two numbers is 50 and their difference is 14. Find the numbers.", answer: "32 and 18" },
        { prompt: "5 pens and 3 pencils cost ₹62, and 2 pens and 3 pencils cost ₹32. Find the cost of one pen.", answer: "₹10" },
      ],
      pyqExampleId: "bda137c0-089c-4c70-bfc8-a051e692c0d6",
      traps: [
        {
          title: "Using one equation for two facts",
          body:
            "The number of coins and their value are two different facts. One equation adds the coins; the other adds what each coin is worth.",
        },
        {
          title: "Adding to the top only",
          body:
            "'1 is added to both the numerator and the denominator' changes \\(\\frac{x}{y}\\) to \\(\\frac{x + 1}{y + 1}\\). Adding to the numerator alone answers a different question.",
        },
      ],
    },
  ],
};
