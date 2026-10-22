import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_NS_IRRATIONALS_NOTE: SubtopicNote = {
  subtopicName: "Irrational Numbers",
  title: "Irrational Numbers",
  oneLineDefinition:
    "An irrational number cannot be written as a fraction of two integers: its decimal never ends and never repeats.",
  whyItMatters:
    "Seven questions in the bank, six EASY and one MODERATE, and one is from the 2022 paper. Three ask you to spot the irrational number in a list; four ask whether a sum, product or square of such numbers is rational or irrational.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spinsir-spot",
      name: "Which numbers are irrational",
      intuition:
        "A root sign does not make a number irrational. The square root of a whole number is irrational only when the number is not a perfect square. And a decimal is irrational only when it goes on forever without settling into a repeating block.",
      definition:
        "- \\(\\sqrt{n}\\) for a whole number \\(n\\) is **rational if \\(n\\) is a perfect square** and **irrational otherwise**.\n" +
        "- To test for a perfect square, find the two squares on either side: \\(44^2 = 1936\\) and \\(45^2 = 2025\\), so 1950 is not a perfect square.\n" +
        "- \\(\\pi\\) is irrational. \\(\\frac{22}{7}\\) and 3.14 are only rational approximations of it.\n" +
        "- A decimal that ends or repeats is rational; one that does neither is irrational.",
      table: {
        columns: ["Number", "Type", "Reason"],
        rows: [
          { cells: ["\\(\\sqrt{2}\\), \\(\\sqrt{3}\\), \\(\\sqrt{5}\\)", "Irrational", "2, 3 and 5 are not perfect squares"] },
          { cells: ["\\(\\sqrt{49}\\)", "Rational", "It equals 7"] },
          { cells: ["\\(\\sqrt{1296}\\)", "Rational", "It equals 36"] },
          {
            cells: ["\\(\\pi\\)", "Irrational", "Its decimal never ends and never repeats"],
            noteAmber: "\\(\\frac{22}{7}\\) is close to \\(\\pi\\) but is a fraction, so it is rational.",
          },
          { cells: ["\\(\\frac{22}{7}\\), 3.14", "Rational", "Each is a fraction of two integers"] },
          { cells: ["\\(0.\\overline{3}\\)", "Rational", "It repeats: \\(\\frac{1}{3}\\)"] },
          { cells: ["0.101001000100001...", "Irrational", "It never ends and has no repeating block"] },
        ],
        caption: "A root sign alone decides nothing: check whether the number under it is a perfect square.",
      },
      selfCheckExample: {
        prompt: "Is \\(\\sqrt{2025}\\) rational or irrational?",
        steps: ["\\(45^2 = 2025\\), so \\(\\sqrt{2025} = 45\\)."],
        answer: "Rational",
      },
      practiceSet: [
        { prompt: "Is \\(\\sqrt{50}\\) rational or irrational?", answer: "Irrational: 50 lies between \\(7^2 = 49\\) and \\(8^2 = 64\\)." },
        { prompt: "Is \\(\\sqrt{1764}\\) rational or irrational?", answer: "Rational: \\(42^2 = 1764\\)." },
        { prompt: "Is 3.14 rational or irrational?", answer: "Rational: \\(\\frac{314}{100}\\)" },
        { prompt: "Is 0.1010010001... (one more 0 each time) rational or irrational?", answer: "Irrational" },
      ],
      pyqExampleId: "6545aee2-7977-4de6-807b-6e08bed16bb5",
      traps: [
        {
          title: "Treating every root as irrational",
          body: "\\(\\sqrt{2401} = 49\\) is a whole number. Before calling a root irrational, check whether the number under it is a perfect square.",
        },
        {
          title: "Taking 22/7 for π",
          body: "\\(\\frac{22}{7}\\) is a fraction, so it is rational. Only \\(\\pi\\) itself is irrational.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinsir-closure",
      name: "Sums and products with irrational numbers",
      intuition:
        "Mixing a rational with an irrational cannot cancel the endless decimal, so the result stays irrational. Two irrationals, though, can cancel each other out.",
      definition:
        "- Rational \\(+\\) irrational is always **irrational**.\n" +
        "- **Non-zero** rational \\(\\times\\) irrational is always **irrational**. Zero times anything is 0, which is rational.\n" +
        "- Irrational \\(+\\) irrational, or irrational \\(\\times\\) irrational, can be **either**: \\(\\sqrt{2} + \\sqrt{3}\\) is irrational, but \\(\\sqrt{2} \\times \\sqrt{8} = 4\\) is rational.\n" +
        "- To decide about an expression, simplify it first. If a root term is left over, the result is irrational.",
      formula: {
        label: "Squares and products with a root",
        latex: "(a + \\sqrt{b})^2 = a^2 + 2a\\sqrt{b} + b \\qquad (a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b",
      },
      authoredExample: {
        prompt: "Is \\((\\sqrt{5} + 2)(\\sqrt{5} - 2)\\) rational or irrational?",
        steps: [
          "Use \\((x + y)(x - y) = x^2 - y^2\\): \\((\\sqrt{5})^2 - 2^2 = 5 - 4 = 1\\).",
          "No root is left, and 1 is rational.",
        ],
        answer: "Rational (it equals 1)",
      },
      selfCheckExample: {
        prompt: "Is \\((1 + \\sqrt{3})^2\\) rational or irrational?",
        steps: ["\\((1 + \\sqrt{3})^2 = 1 + 2\\sqrt{3} + 3 = 4 + 2\\sqrt{3}\\).", "The term \\(2\\sqrt{3}\\) is left over, so the result is irrational."],
        answer: "Irrational",
      },
      practiceSet: [
        { prompt: "Is \\(5 + \\sqrt{7}\\) rational or irrational?", answer: "Irrational (rational plus irrational)" },
        { prompt: "Is \\(3\\sqrt{5}\\) rational or irrational?", answer: "Irrational (non-zero rational times irrational)" },
        { prompt: "Is \\(\\sqrt{2} \\times \\sqrt{18}\\) rational or irrational?", answer: "Rational: \\(\\sqrt{36} = 6\\)" },
        { prompt: "Is \\(0 \\times \\sqrt{3}\\) rational or irrational?", answer: "Rational (it is 0)" },
      ],
      pyqExampleId: "35a1c1b0-bbe2-4d88-88a3-396cf66402f2",
      traps: [
        {
          title: "Assuming two irrationals add to an irrational",
          body: "\\((5 + \\sqrt{2}) + (1 - \\sqrt{2}) = 6\\), which is rational. The sum of two irrationals can be rational or irrational.",
        },
        {
          title: "Dropping the middle term when squaring",
          body: "\\((1 + \\sqrt{5})^2\\) is \\(6 + 2\\sqrt{5}\\), not \\(1 + 5 = 6\\). The middle term \\(2a\\sqrt{b}\\) keeps the result irrational.",
        },
        {
          title: "Forgetting the zero case",
          body: "Rational times irrational is irrational only when the rational is not 0. A question that says just 'a rational number' hides this exception.",
        },
      ],
    },
  ],
};
