import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_NPL_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Sets and Divisibility",
  title: "Number Sets, Primes and Ordering",
  oneLineDefinition:
    "The real numbers are built in layers (natural, integer, rational, irrational); primes are the building blocks of whole numbers, and fractions and powers can be put in order without a calculator.",
  whyItMatters:
    "The 2019 paper asked for a highest common factor written as a product of prime powers, and the 2011 paper asked which expression is largest for a number between 0 and 1. The symbols ℝ and ∅ also appear in the answer options of recent inequality questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-npl-number-sets",
      name: "The number sets ℕ, ℤ, ℚ and ℝ",
      intuition:
        "Each set fixes a problem of the one before it. You cannot subtract freely in the natural numbers, so the integers add negatives. You cannot always divide in the integers, so the rationals add fractions. Some lengths, like the diagonal of a unit square, are not fractions at all, and the irrationals fill those gaps to make the real number line.",
      definition:
        "Each set sits inside the next: \\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\).\n" +
        "- A **rational** number can be written \\(\\frac{p}{q}\\) with integers \\(p, q\\) and \\(q \\ne 0\\). Its decimal either ends or repeats.\n" +
        "- An **irrational** number is real but not rational. Its decimal never ends and never repeats.\n" +
        "- \\(\\sqrt{n}\\) for a whole number \\(n\\) is irrational unless \\(n\\) is a perfect square.\n" +
        "- Rational with rational (add, subtract, multiply, divide by non-zero) stays rational. Rational plus irrational is always irrational. Two irrationals can give a rational: \\(\\sqrt{2} \\times \\sqrt{8} = 4\\).",
      table: {
        columns: ["Set", "Symbol", "What it contains", "Examples"],
        rows: [
          { cells: ["Natural numbers", "\\(\\mathbb{N}\\)", "The counting numbers (Italian books usually include 0)", "0, 1, 2, 3, ..."] },
          { cells: ["Integers", "\\(\\mathbb{Z}\\)", "Whole numbers: positive, negative and zero", "\\(-4,\\ 0,\\ 7\\)"] },
          { cells: ["Rational numbers", "\\(\\mathbb{Q}\\)", "Fractions of integers; decimals that end or repeat", "\\(\\frac{3}{8} = 0.375,\\ 0.\\overline{3} = \\frac{1}{3},\\ -5\\)"] },
          { cells: ["Irrational numbers", "\\(\\mathbb{R} \\setminus \\mathbb{Q}\\)", "Decimals that never end and never repeat", "\\(\\sqrt{2},\\ \\pi,\\ e,\\ \\sqrt{12}\\)"] },
          { cells: ["Real numbers", "\\(\\mathbb{R}\\)", "Rationals and irrationals together: every point of the number line", "All of the above"] },
        ],
        caption: "Each row's numbers also belong to every larger set: 7 is natural, integer, rational and real.",
      },
      selfCheckExample: {
        prompt: "Which of the following numbers is irrational?",
        options: [
          "\\(\\sqrt{0.16}\\)",
          "\\(0.\\overline{27}\\)",
          "\\(\\sqrt{18}\\)",
          "\\(\\frac{22}{7}\\)",
          "\\(\\sqrt{2} \\times \\sqrt{50}\\)",
        ],
        steps: [
          "\\(\\sqrt{0.16} = 0.4\\), a terminating decimal, so it is rational.",
          "\\(0.\\overline{27}\\) repeats, so it is rational (it equals \\(\\frac{3}{11}\\)).",
          "\\(\\sqrt{18} = 3\\sqrt{2}\\): 18 is not a perfect square, so this is irrational.",
          "\\(\\frac{22}{7}\\) is a fraction of integers, so it is rational; it is only close to \\(\\pi\\). And \\(\\sqrt{2} \\times \\sqrt{50} = \\sqrt{100} = 10\\).",
        ],
        answer: "(C) \\(\\sqrt{18}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\sqrt{3} \\times \\sqrt{12}\\) rational?", answer: "Yes, it equals 6", method: "\\(\\sqrt{36} = 6\\)" },
        { prompt: "What is the smallest of the sets \\(\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}\\) that contains \\(-\\frac{2}{5}\\)?", answer: "\\(\\mathbb{Q}\\)", method: "A negative fraction is not an integer" },
        { prompt: "Is 0.101001000100001... (one more 0 each time) rational?", answer: "No", method: "The decimal never ends and never repeats" },
        { prompt: "Is \\(\\pi + (1 - \\pi)\\) irrational?", answer: "No, it equals 1", method: "Two irrationals can add to a rational" },
      ],
      traps: [
        {
          title: "22/7 is not π",
          body: "\\(\\frac{22}{7}\\) is a fraction of two integers, so it is rational. It is only an approximation of \\(\\pi\\), which is irrational. An option offering \\(\\frac{22}{7}\\) as the irrational number is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-primes-hcf-lcm",
      name: "Prime factorisation, highest common factor and lowest common multiple",
      intuition:
        "Every whole number above 1 breaks into primes in exactly one way, like a molecule into atoms. Once two numbers are written as products of primes, what they share (the HCF) and the smallest number they both divide into (the LCM) can be read straight off the powers.",
      definition:
        "A **prime** has exactly two divisors, 1 and itself. 1 is not prime; 2 is the only even prime.\n" +
        "- **Divisibility tests**: by 2 if the last digit is even; by 3 if the digit sum is divisible by 3; by 4 if the last two digits form a multiple of 4; by 5 if it ends in 0 or 5; by 9 if the digit sum is divisible by 9.\n" +
        "- **HCF** (highest common factor, also GCD): take the primes common to all the numbers, each to its **lowest** power.\n" +
        "- **LCM** (lowest common multiple): take every prime that appears, each to its **highest** power.\n" +
        "- For two numbers only, \\(\\text{HCF} \\times \\text{LCM}\\) equals their product.",
      formula: {
        label: "HCF and LCM of two numbers",
        latex: "\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "two positive whole numbers" },
        ],
      },
      authoredExample: {
        prompt: "Find the HCF and the LCM of 84 and 90.",
        steps: [
          "Factorise: \\(84 = 2^2 \\times 3 \\times 7\\) and \\(90 = 2 \\times 3^2 \\times 5\\).",
          "HCF: the common primes are 2 and 3; lowest powers give \\(2 \\times 3 = 6\\).",
          "LCM: every prime at its highest power: \\(2^2 \\times 3^2 \\times 5 \\times 7 = 1260\\).",
          "Check: \\(6 \\times 1260 = 7560 = 84 \\times 90\\).",
        ],
        answer: "HCF 6, LCM 1260",
      },
      selfCheckExample: {
        prompt: "What is the highest common factor of 120, 180 and 300, written as a product of prime powers?",
        options: [
          "\\(2^3 \\times 3^2 \\times 5^2\\)",
          "\\(2^2 \\times 3 \\times 5\\)",
          "\\(2 \\times 3 \\times 5\\)",
          "\\(2^2 \\times 3^2 \\times 5\\)",
          "\\(2^3 \\times 3 \\times 5\\)",
        ],
        steps: [
          "\\(120 = 2^3 \\times 3 \\times 5\\), \\(180 = 2^2 \\times 3^2 \\times 5\\), \\(300 = 2^2 \\times 3 \\times 5^2\\).",
          "Lowest powers: \\(2^2\\), \\(3^1\\), \\(5^1\\), so the HCF is \\(2^2 \\times 3 \\times 5 = 60\\).",
          "Option A takes the highest powers: that is the LCM, 1800. Option C forgets that 4 divides all three numbers. Options D and E take the highest power of one prime.",
        ],
        answer: "(B) \\(2^2 \\times 3 \\times 5\\)",
      },
      practiceSet: [
        { prompt: "Find the LCM of 12 and 18.", answer: "36", method: "\\(2^2 \\times 3^2\\)" },
        { prompt: "Is 4725 divisible by 9?", answer: "Yes", method: "Digit sum \\(4 + 7 + 2 + 5 = 18\\)" },
        { prompt: "Two numbers have HCF 8 and LCM 240. One of them is 48. What is the other?", answer: "40", method: "\\(8 \\times 240 / 48\\)" },
      ],
      traps: [
        {
          title: "HCF uses the lowest powers, LCM the highest",
          body: "Swapping the rule turns the HCF into the LCM, and IMAT puts that number among the options. The HCF can never be larger than the smallest of the numbers; the LCM can never be smaller than the largest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-ordering",
      name: "Fractions, recurring decimals and putting numbers in order",
      intuition:
        "To compare fractions, give them a common denominator or turn them into decimals. Powers behave differently on each side of 1: multiplying by a number between 0 and 1 shrinks, so squaring such a number makes it smaller and taking its square root makes it bigger. Above 1 everything reverses.",
      definition:
        "- **Comparing fractions**: for positive fractions, \\(\\frac{a}{b} < \\frac{c}{d}\\) exactly when \\(ad < bc\\) (cross-multiply).\n" +
        "- **Recurring decimal to fraction**: if \\(x = 0.\\overline{45}\\), then \\(100x = 45.\\overline{45}\\); subtract to get \\(99x = 45\\).\n" +
        "- For \\(0 < x < 1\\): \\(x^2 < x < \\sqrt{x} < 1\\), and the reciprocals are bigger than 1, with \\(\\frac{1}{\\sqrt{x}} < \\frac{1}{x}\\).\n" +
        "- For \\(x > 1\\) the order reverses: \\(\\frac{1}{x} < \\frac{1}{\\sqrt{x}} < 1 < \\sqrt{x} < x < x^2\\).\n" +
        "- Quick test in a question with letters: pick a value (\\(x = \\frac{1}{4}\\) or \\(x = 4\\)) and compute every option.",
      formula: {
        label: "Order for 0 < x < 1",
        latex: "0 < x^2 < x < \\sqrt{x} < 1 < \\frac{1}{\\sqrt{x}} < \\frac{1}{x}",
      },
      authoredExample: {
        prompt: "(a) Write \\(0.\\overline{45}\\) as a fraction in lowest terms. (b) Put \\(\\frac{3}{7}\\), 0.43 and \\(\\frac{4}{9}\\) in increasing order.",
        steps: [
          "(a) Let \\(x = 0.\\overline{45}\\). Then \\(100x - x = 45\\), so \\(x = \\frac{45}{99} = \\frac{5}{11}\\).",
          "(b) \\(\\frac{3}{7} = 0.4285...\\) and \\(\\frac{4}{9} = 0.4444...\\).",
          "So \\(0.4285... < 0.43 < 0.4444...\\).",
        ],
        answer: "(a) \\(\\frac{5}{11}\\); (b) \\(\\frac{3}{7} < 0.43 < \\frac{4}{9}\\)",
      },
      selfCheckExample: {
        prompt: "For every \\(x > 1\\), which of these expressions has the smallest value?",
        options: [
          "\\(x^2\\)",
          "\\(\\sqrt{x}\\)",
          "\\(\\frac{1}{x}\\)",
          "\\(\\frac{1}{\\sqrt{x}}\\)",
          "\\(\\frac{1}{x^2}\\)",
        ],
        steps: [
          "Test \\(x = 4\\): the options are 16, 2, 0.25, 0.5 and 0.0625.",
          "For \\(x > 1\\), \\(x^2\\) is the largest power, so its reciprocal \\(\\frac{1}{x^2}\\) is the smallest.",
          "Option C is the answer students give when they remember the order for \\(0 < x < 1\\) and forget that it reverses above 1.",
        ],
        answer: "(E) \\(\\frac{1}{x^2}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(0.\\overline{6}\\) as a fraction.", answer: "\\(\\frac{2}{3}\\)", method: "\\(10x - x = 6\\)" },
        { prompt: "Which is larger, \\(\\frac{5}{8}\\) or \\(\\frac{7}{11}\\)?", answer: "\\(\\frac{7}{11}\\)", method: "\\(5 \\times 11 = 55 < 7 \\times 8 = 56\\)" },
        { prompt: "For \\(x = 0.25\\), put \\(x\\), \\(x^2\\) and \\(\\sqrt{x}\\) in increasing order.", answer: "\\(x^2 < x < \\sqrt{x}\\) (0.0625, 0.25, 0.5)" },
        { prompt: "Write \\(0.1\\overline{6}\\) as a fraction.", answer: "\\(\\frac{1}{6}\\)", method: "\\(100x - 10x = 15\\), so \\(x = \\frac{15}{90}\\)" },
      ],
      traps: [
        {
          title: "Squaring does not always make a number bigger",
          body: "For a number between 0 and 1, the square is smaller and the square root is larger: \\(0.5^2 = 0.25\\) but \\(\\sqrt{0.25} = 0.5\\). The intuition that powers grow is only true above 1.",
        },
      ],
    },
  ],
};
