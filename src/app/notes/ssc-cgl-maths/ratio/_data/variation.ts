import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_VARIATION_NOTE: SubtopicNote = {
  subtopicName: "Direct and Inverse Variation",
  title: "Direct and Inverse Variation",
  oneLineDefinition:
    "Two quantities vary directly when their ratio stays fixed and inversely when their product stays fixed, so one known pair of values gives the constant and the constant gives every other value.",
  whyItMatters:
    "Thirteen questions in the bank, nine EASY and four MODERATE: seven are direct proportion (shadows, recipes, cloth by the metre, a machine's output) and six are inverse or joint variation. All four MODERATE ones sit in the second group, where several quantities or a square act at once; multiplying by each factor's ratio clears most of them in one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrava-direct",
      name: "Direct proportion and the unitary method",
      intuition:
        "If one pen costs ₹12, two cost ₹24 and ten cost ₹120: the cost grows in step with the number. That is direct variation. The ratio cost : number never changes, so the cost of one (the unit) unlocks every other case.",
      definition:
        "- **y varies directly as x** (written \\(y \\propto x\\)) when \\(y = kx\\) for a fixed k. Doubling x doubles y.\n" +
        "- **Unitary method:** find the value for one unit, then multiply. 6 litres for 84 km is 14 km a litre.\n" +
        "- **Ratio method:** \\(y_2 = y_1 \\times \\frac{x_2}{x_1}\\). Often quicker, since \\(\\frac{x_2}{x_1}\\) may be a neat number.\n" +
        "- **Shadows at the same time of day** vary directly as the heights of the objects that cast them.\n" +
        "- **y varies as (x + c):** write \\(y = k(x + c)\\) and find k from the given pair.\n" +
        "- Sense check: the answer must move the same way as the cause. More people need more flour.",
      formula: {
        label: "Direct variation",
        latex: "y = kx \\qquad \\frac{y_2}{y_1} = \\frac{x_2}{x_1}",
        symbols: [{ symbol: "k", meaning: "the constant of variation, \\(\\frac{y}{x}\\)" }],
      },
      authoredExample: {
        prompt: "A 6 m tree casts a 4.5 m shadow. At the same time, a tower casts a 30 m shadow. How tall is the tower?",
        steps: [
          "Height varies directly as shadow. The tree's height is \\(\\frac{6}{4.5} = \\frac{4}{3}\\) of its shadow.",
          "Tower \\(= 30 \\times \\frac{4}{3} = 40\\) m.",
          "Check: \\(\\frac{4.5}{6} = 0.75\\) and \\(\\frac{30}{40} = 0.75\\).",
        ],
        answer: "40 m",
      },
      selfCheckExample: {
        prompt: "y varies directly as \\((x - 4)\\), and y = 30 when x = 10. Find y when x = 16.",
        steps: [
          "\\(y = k(x - 4)\\): \\(30 = 6k\\), so \\(k = 5\\).",
          "When x = 16, \\(y = 5 \\times 12 = 60\\).",
        ],
        answer: "60",
      },
      practiceSet: [
        { prompt: "8 pens cost ₹96. What do 13 such pens cost?", answer: "₹156" },
        { prompt: "y varies directly as x, and y = 21 when x = 3. Find y when x = 10.", answer: "70" },
        { prompt: "A car uses 6 litres of petrol for 84 km. How far does it go on 15 litres?", answer: "210 km" },
      ],
      pyqExampleId: "39489aa8-5443-4c34-a227-b87364a67bd9",
      traps: [
        {
          title: "Turning a direct proportion upside down",
          body:
            "If 4 kg of rice feeds 10 people, 25 people need \\(4 \\times \\frac{25}{10} = 10\\) kg, not \\(4 \\times \\frac{10}{25} = 1.6\\) kg. Ask first whether the answer should go up or down.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrava-inverse",
      name: "Inverse and joint variation",
      intuition:
        "Filling a tank with smaller buckets takes more of them: the number of buckets times the size of a bucket is always the tank. When the product stays fixed, the variation is inverse. When a quantity depends on several others at once, each one acts by its own power, and the changes simply multiply.",
      definition:
        "- **y varies inversely as x** when \\(xy = k\\). Doubling x halves y.\n" +
        "- **Joint variation:** \\(y = \\frac{k x^a z^b}{w^c}\\). Find k from the one full set of values given, then put in the new values.\n" +
        "- **Fast route:** skip k. Multiply the old y by each factor's ratio raised to its power, flipping the ratio for a quantity in the denominator: \\(y_2 = y_1 \\left(\\frac{x_2}{x_1}\\right)^a \\left(\\frac{w_1}{w_2}\\right)^c\\).\n" +
        "- **Value as the square of weight** (gems, diamonds): pieces in the ratio of their weights are worth the squares of those terms, which add to less than the square of the total. That gap is the loss.\n" +
        "- Read the stem for the power: \"as the square of\", \"as the cube of\".",
      formula: {
        label: "Inverse and joint variation",
        latex: "xy = k \\qquad y = \\frac{k x^a}{w^c} \\qquad y_2 = y_1 \\left(\\frac{x_2}{x_1}\\right)^a \\left(\\frac{w_1}{w_2}\\right)^c",
        symbols: [
          { symbol: "a, c", meaning: "the powers stated in the stem" },
          { symbol: "w", meaning: "a quantity that y varies inversely with" },
        ],
      },
      authoredExample: {
        prompt: "z varies directly as the square of x and inversely as y. z = 6 when x = 3 and y = 12. Find z when x = 5 and y = 10.",
        steps: [
          "Full method: \\(z = \\frac{kx^2}{y}\\), so \\(6 = \\frac{9k}{12}\\) and \\(k = 8\\). Then \\(z = \\frac{8 \\times 25}{10} = 20\\).",
          "Fast route: \\(6 \\times \\left(\\frac{5}{3}\\right)^2 \\times \\frac{12}{10} = 6 \\times \\frac{25}{9} \\times \\frac{6}{5} = 20\\).",
        ],
        answer: "20",
      },
      selfCheckExample: {
        prompt: "12 workers build a wall in 15 days. Working at the same rate, how many days do 20 workers take?",
        steps: [
          "Days vary inversely as workers: workers \\(\\times\\) days \\(= 12 \\times 15 = 180\\).",
          "\\(\\frac{180}{20} = 9\\) days.",
        ],
        answer: "9 days",
      },
      practiceSet: [
        { prompt: "x varies inversely as y, and x = 9 when y = 4. Find x when y = 6.", answer: "6" },
        { prompt: "A tank takes 40 jugs of water. How many jugs are needed if each jug holds half as much?", answer: "80" },
        { prompt: "y varies inversely as the square of x. If x is doubled, what happens to y?", answer: "It becomes one quarter of its value" },
        {
          prompt: "The value of a gem varies as the square of its weight. It breaks into two equal halves. What fraction of the original value do the two halves keep together?",
          answer: "\\(\\frac{1}{2}\\)",
          method: "Weights 1 and 1 against a whole of 2: \\(\\frac{1^2 + 1^2}{2^2} = \\frac{1}{2}\\).",
        },
      ],
      pyqExampleId: "cc03093a-e52e-4b2e-8cee-7657c9b19040",
      traps: [
        {
          title: "Treating an inverse variation as direct",
          body:
            "If each bucket holds one third as much, the tank needs 3 times as many buckets, not one third as many. Smaller buckets mean more trips.",
        },
        {
          title: "Forgetting the power",
          body:
            "If y varies as the square of x and x becomes 3 times as large, y becomes 9 times as large, not 3 times. Apply the stated power to the ratio of the x values.",
        },
      ],
    },
  ],
};
