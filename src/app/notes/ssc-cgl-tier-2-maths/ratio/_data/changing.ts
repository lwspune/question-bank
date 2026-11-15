import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RA_CHANGING_NOTE: SubtopicNote = {
  subtopicName: "Changing Ratios, Proportion and Variation",
  title: "Changing Ratios, Proportion and Variation",
  oneLineDefinition:
    "Ratios that change when something is added or taken away, sums split by two conditions at once, four numbers in proportion, and quantities that vary directly or inversely.",
  whyItMatters:
    "8 questions in the Tier II bank, 7 of them MODERATE: the hardest page of the chapter for its size. Each one turns a ratio into an equation in k and solves it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rach-change",
      name: "Two conditions at once, and a ratio that changes",
      intuition:
        "Harder ratio questions give two or three facts together: a pair's combined share, a ratio inside the pair, one person's amount. Work from the outside in: split the total first, then split each part.",
      definition:
        "- '\\((A + D) : (B + C) = 8 : 5\\)' splits the total first; a second ratio then splits each pair.\n" +
        "- When a ratio changes because something is added or taken away, write each quantity as k times its parts, apply the change, and set the new ratio: \\((ak + x) : (bk - y) = p : q\\).\n" +
        "- When a sum is re-divided in a new ratio, compare one person's fraction under each ratio: the difference of the fractions times the sum is the stated difference.",
      formula: {
        label: "A ratio after a change",
        latex: "\\frac{ak + x}{bk - y} = \\frac{p}{q}",
      },
      authoredExample: {
        prompt: "Boys and girls in a class are in the ratio 7 : 5. When 6 more girls join, the ratio becomes 7 : 6. How many boys are there?",
        steps: ["\\(\\frac{7k}{5k + 6} = \\frac{7}{6}\\), so \\(42k = 35k + 42\\) and \\(k = 6\\).", "Boys \\(= 7 \\times 6 = 42\\)."],
        answer: "42",
      },
      selfCheckExample: {
        prompt: "₹9,000 is shared so that (A + B) : C = 2 : 1 and A : B = 3 : 2. Find B's share.",
        steps: ["A and B together get \\(\\frac{2}{3} \\times 9000 = 6000\\).", "B gets \\(\\frac{2}{5} \\times 6000 = 2400\\)."],
        answer: "₹2,400",
      },
      practiceSet: [
        { prompt: "Two numbers are in the ratio 3 : 5. Adding 10 to each makes the ratio 5 : 7. Find the numbers.", answer: "15 and 25" },
        { prompt: "A sum is shared 1 : 2. Shared 1 : 3 instead, the first person would get ₹50 less. Find the sum.", answer: "₹600", method: "\\(S\\left(\\frac{1}{3} - \\frac{1}{4}\\right) = 50\\)" },
        { prompt: "Milk and water are 4 : 1 in a can. Adding 10 litres of water makes them 4 : 3. How much milk is there?", answer: "20 litres" },
      ],
      pyqExampleId: "32218f37-cce0-4f08-bbe2-0ce0e1a9d767",
      traps: [
        {
          title: "Adding the change to the ratio numbers",
          body: "When 6 girls join a class of boys and girls in 7 : 5, the new ratio is \\(7k : (5k + 6)\\), not \\(7 : 11\\). The 6 is people, not parts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rach-algebra",
      name: "Proportion algebra and the mean proportional",
      intuition:
        "Four numbers are in proportion when the product of the outer two equals the product of the inner two. A ratio of two expressions can be cross-multiplied into one equation and solved for the ratio of the letters.",
      definition:
        "- \\(a : b = c : d\\) means \\(ad = bc\\).\n" +
        "- Mean proportional of a and b: \\(\\sqrt{ab}\\). Third proportional to a and b: \\(\\frac{b^2}{a}\\). Fourth proportional to a, b, c: \\(\\frac{bc}{a}\\).\n" +
        "- If \\((pa + qb) : (ra + sb) = m : n\\), cross-multiply, collect the a terms and the b terms, and read \\(a : b\\).\n" +
        "- With cubes, take the cube root at the end: \\(27a^3 = 125b^3\\) gives \\(a : b = 5 : 3\\).\n" +
        "- Three pair-sums such as \\((a^2 + b^2) : (b^2 + c^2) : (c^2 + a^2)\\): add all three to get twice the total, then subtract each pair.",
      formula: {
        label: "Proportion",
        latex: "a : b = c : d \\;\\text{means}\\; ad = bc, \\quad \\text{mean proportional of } a, b = \\sqrt{ab}",
      },
      authoredExample: {
        prompt: "If \\((5a + 3b) : (2a - b) = 3 : 1\\), find \\(a : b\\).",
        steps: ["\\(5a + 3b = 6a - 3b\\).", "\\(a = 6b\\), so \\(a : b = 6 : 1\\)."],
        answer: "6 : 1",
      },
      selfCheckExample: {
        prompt: "What number must be added to each of 2, 5, 4 and 9 so that the results are in proportion?",
        steps: ["\\((2 + x)(9 + x) = (5 + x)(4 + x)\\), so \\(18 + 11x = 20 + 9x\\) and \\(x = 1\\).", "Check: 3, 6, 5, 10 and \\(3 \\times 10 = 6 \\times 5\\)."],
        answer: "1",
      },
      practiceSet: [
        { prompt: "Find the mean proportional of 9 and 16.", answer: "12" },
        { prompt: "Find the third proportional to 4 and 6.", answer: "9" },
        { prompt: "If \\((a + 2b) : (a - b) = 5 : 2\\), find \\(a : b\\).", answer: "3 : 1" },
      ],
      pyqExampleId: "5d802ddd-0195-4320-bfb0-4e9dea296324",
      traps: [
        {
          title: "Multiplying the wrong pairs",
          body: "\\(a : b = c : d\\) gives \\(ad = bc\\), outer times outer equal to inner times inner, not \\(ac = bd\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rach-variation",
      name: "Direct and inverse variation",
      intuition:
        "'y varies as the square of x' means \\(y = kx^2\\) for a fixed k. Find k from the one pair given and use it, or skip k and compare two cases as a ratio.",
      definition:
        "- Direct: \\(y = kx\\). Inverse: \\(y = \\frac{k}{x}\\). With a power: \\(y = kx^2\\), \\(y = \\frac{k}{x^2}\\) and so on.\n" +
        "- Two cases of \\(y \\propto x^n\\): \\(\\frac{y_1}{y_2} = \\left(\\frac{x_1}{x_2}\\right)^n\\).\n" +
        "- A gem whose value goes with the square of its weight loses value when it breaks, because \\(a^2 + b^2 < (a + b)^2\\).",
      formula: {
        label: "Two cases of a variation",
        latex: "y \\propto x^n \\;\\Rightarrow\\; \\frac{y_1}{y_2} = \\left(\\frac{x_1}{x_2}\\right)^n",
      },
      authoredExample: {
        prompt: "The value of a pearl varies as the square of its weight. A pearl worth ₹3,600 breaks into two pieces whose weights are in the ratio 1 : 2. Find the value lost.",
        steps: [
          "Weights 1 and 2 out of 3: values go as \\(1^2 + 2^2 = 5\\) against \\(3^2 = 9\\).",
          "The pieces are worth \\(\\frac{5}{9} \\times 3600 = 2000\\), so ₹1,600 is lost.",
        ],
        answer: "₹1,600",
      },
      selfCheckExample: {
        prompt: "y varies inversely as x, and y = 12 when x = 5. Find y when x = 15.",
        steps: ["\\(k = xy = 60\\).", "\\(y = \\frac{60}{15} = 4\\)."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "When x is 4, y is 28, and y is always a fixed multiple of x. What is y when x is 9?", answer: "63" },
        { prompt: "A square's area varies as the square of its side. If the side becomes 3 times as long, how many times as big is the area?", answer: "9 times" },
        { prompt: "A load varies as the cube of a length. When the length is doubled, by what factor does the load change?", answer: "8" },
      ],
      pyqExampleId: "76803027-a752-4d67-825c-534848dafc9c",
      traps: [
        {
          title: "Treating a square law as plain proportion",
          body: "If value goes with the square of the weight, half the weight keeps a quarter of the value, not half.",
        },
      ],
    },
  ],
};
