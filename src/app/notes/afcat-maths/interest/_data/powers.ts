import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Compound Interest: Sum Becoming n Times",
  title: "When a Sum Becomes n Times at Compound Interest",
  oneLineDefinition:
    "At compound interest equal stretches of time multiply the sum by equal factors, so a sum that becomes n times itself in T years becomes n² times in 2T years and n³ times in 3T years.",
  whyItMatters:
    "No AFCAT past-year question is on this page, but it is a big one and about a fifth of it is HARD. Every row is the same idea: the times add while the multiples multiply. The trap is the simple interest rule from earlier in the chapter, where the times add while the interest adds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-ci-multiple-time",
      name: "Whole powers: multiply the time",
      intuition:
        "If a sum doubles in 5 years, the next 5 years double it again: 4 times itself in 10 years, 8 times in 15. Each equal period multiplies the sum by the same factor, so the periods add.",
      definition:
        "- Becomes \\(n\\) times in \\(T\\) years, so becomes \\(n^k\\) times in \\(kT\\) years.\n" +
        "- Write the target as a power of the given multiple: \\(125 = 5^3\\), \\(81 = 9^2\\), \\(1000 = 10^3\\).\n" +
        "- The rate itself is never needed.",
      formula: {
        label: "Multiples at compound interest",
        latex: "\\left(1 + \\tfrac{R}{100}\\right)^T = n \\;\\Rightarrow\\; \\left(1 + \\tfrac{R}{100}\\right)^{kT} = n^k",
      },
      authoredExample: {
        prompt: "A sum becomes 4 times itself in 7 years at compound interest. In how many years will it become 64 times itself?",
        steps: ["\\(64 = 4^3\\), three periods of 7 years."],
        answer: "21 years.",
      },
      selfCheckExample: {
        prompt: "A sum doubles in 8 years at compound interest. In how many years will it become 32 times itself?",
        steps: ["\\(32 = 2^5\\), five doublings of 8 years each."],
        answer: "40 years.",
      },
      practiceSet: [
        { prompt: "A sum becomes 5 times itself in 11 years at compound interest. When will it be 125 times itself?", answer: "33 years" },
        { prompt: "A sum doubles in 4 years at compound interest. When will it be 16 times itself?", answer: "16 years" },
        { prompt: "A sum becomes 10 times itself in 12 years at compound interest. When will it be 100 times itself?", answer: "24 years" },
      ],
      pyqExampleId: "5b20dbc6-8fea-4398-8c79-baeadc6e8b0a",
      traps: [
        {
          title: "Multiples multiply, they do not add",
          body: "Doubling in 5 years makes 4 times itself in 10 years at compound interest. 'Twice the time, twice the interest' is the simple interest rule, and gives only 3 times.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-root-time",
      name: "Through a common base",
      intuition:
        "243 times and 9 times are both powers of 3. A sum that becomes \\(243 = 3^5\\) times itself in 10 years triples every 2 years, so 9 times (\\(3^2\\)) takes 4 years. Bring both multiples to one base.",
      definition:
        "- Write both multiples as powers of one base \\(b\\). If \\(b^p\\) takes \\(T\\) years, then \\(b^q\\) takes \\(\\dfrac{q}{p}\\,T\\) years.\n" +
        "- The time for one factor of \\(b\\) is \\(\\dfrac{T}{p}\\).\n" +
        "- It works for a smaller target too: 81 times in 20 years means 9 times in 10 years and 3 times in 5.",
      formula: {
        label: "Common base",
        latex: "b^p \\text{ in } T \\text{ years} \\;\\Rightarrow\\; b^q \\text{ in } \\dfrac{q}{p}\\,T \\text{ years}",
      },
      authoredExample: {
        prompt: "A sum becomes 32 times itself in 15 years at compound interest. In how many years will it become 4 times itself?",
        steps: ["\\(32 = 2^5\\) in 15 years, so it doubles every 3 years.", "\\(4 = 2^2\\), two doublings."],
        answer: "6 years.",
      },
      selfCheckExample: {
        prompt: "A sum becomes 49 times itself in 10 years at compound interest. In how many years will it become 343 times itself?",
        steps: ["\\(49 = 7^2\\) in 10 years, so it multiplies by 7 every 5 years.", "\\(343 = 7^3\\), three such periods."],
        answer: "15 years.",
      },
      practiceSet: [
        { prompt: "A sum becomes 81 times itself in 24 years at compound interest. When will it be 3 times itself?", answer: "6 years" },
        { prompt: "A sum becomes 64 times itself in 18 years at compound interest. When will it be 4 times itself?", answer: "6 years" },
        { prompt: "A sum becomes 100 times itself in 6 years at compound interest. When will it be 10 times itself?", answer: "3 years" },
      ],
      pyqExampleId: "9e6693da-6b73-42c3-a8c7-4209c163bd8f",
      traps: [
        {
          title: "Scale the power, not the multiple",
          body: "From 243 times in 10 years, 9 times takes \\(\\tfrac25\\) of 10 years, which is 4 years. Taking \\(\\tfrac{9}{243}\\) of 10 years treats the growth as a straight line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-multiple-rate",
      name: "The rate from a multiple",
      intuition:
        "If a sum becomes 9 times itself in 2 years, each year multiplies it by 3, since \\(3^2 = 9\\). A yearly factor of 3 is a rate of 200%.",
      definition:
        "- \\(1 + \\tfrac{R}{100} = \\sqrt[T]{n}\\), so \\(R = 100\\left(\\sqrt[T]{n} - 1\\right)\\).\n" +
        "- A factor of 2 is 100%, a factor of 3 is 200%, a factor of 5 is 400%.\n" +
        "- When the root is not whole, simplify it first: \\(\\sqrt[4]{9} = \\sqrt3 \\approx 1.732\\), a rate of about 73.2%.",
      formula: {
        label: "Rate from a multiple",
        latex: "R = 100\\left(\\sqrt[T]{n} - 1\\right)",
      },
      authoredExample: {
        prompt: "At what rate will a sum become 64 times itself in 3 years at compound interest?",
        steps: ["\\(\\sqrt[3]{64} = 4\\), so each year multiplies the sum by 4.", "\\(R = 100(4 - 1) = 300\\)."],
        answer: "300% a year.",
      },
      selfCheckExample: {
        prompt: "At what rate will a sum become 16 times itself in 4 years at compound interest?",
        steps: ["\\(\\sqrt[4]{16} = 2\\)."],
        answer: "100% a year.",
      },
      practiceSet: [
        { prompt: "At what rate does a sum become 27 times itself in 3 years at compound interest?", answer: "200%" },
        { prompt: "At what rate does a sum become 4 times itself in 2 years at compound interest?", answer: "100%" },
        { prompt: "At what rate does a sum become 125 times itself in 3 years at compound interest?", answer: "400%" },
      ],
      pyqExampleId: "e02fffa1-4278-47a3-b842-c87f5650ca31",
      traps: [
        {
          title: "The rate is the factor minus 1",
          body: "A yearly factor of 3 is a rate of 200%, not 300%. The rate is only the part added to the 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-multiple-other",
      name: "The multiple after another time",
      intuition:
        "Once the yearly factor is known, any time works: after \\(t\\) years the sum is (yearly factor)\\(^t\\) times itself. If ₹1,000 becomes ₹27,000 in 3 years, the factor is 3, and after 2 years the sum is 9 times itself.",
      definition:
        "- A sum that becomes \\(n\\) times itself in \\(T\\) years is \\(n^{t/T}\\) times itself after \\(t\\) years.\n" +
        "- The interest after \\(t\\) years is that multiple minus 1, so the ratio of compound interest to principal is \\(\\left(n^{t/T} - 1\\right) : 1\\).\n" +
        "- With money given: multiply the principal by the multiple, or divide a target amount by it to find the principal.",
      formula: {
        label: "Multiple after t years",
        latex: "n^{t/T}",
      },
      authoredExample: {
        prompt: "₹2,000 becomes ₹18,000 in 2 years at compound interest. What will it be after 3 years?",
        steps: ["The 2-year multiple is 9, so the yearly factor is 3.", "After 3 years the multiple is \\(3^3 = 27\\), and \\(27 \\times 2000 = 54000\\)."],
        answer: "₹54,000.",
      },
      selfCheckExample: {
        prompt: "A sum triples in 5 years at compound interest. What is the ratio of compound interest to principal after 10 years?",
        steps: ["10 years is two periods, so the sum is \\(3^2 = 9\\) times itself.", "The interest is 8 times the principal."],
        answer: "\\(8 : 1\\).",
      },
      practiceSet: [
        { prompt: "A sum becomes 16 times itself in 8 years at compound interest. How many times itself is it after 2 years?", answer: "2 times" },
        {
          prompt: "₹500 becomes ₹4,000 in 3 years at compound interest. What principal becomes ₹32,000 in 3 years at the same rate?",
          answer: "₹4,000",
        },
        { prompt: "A sum becomes 25 times itself in 10 years at compound interest. Find the ratio of compound interest to principal after 5 years.", answer: "\\(4 : 1\\)" },
      ],
      pyqExampleId: "a36cff5c-74e2-482c-bce3-f6c5840be36f",
      traps: [
        {
          title: "Subtract the principal for the interest",
          body: "A sum that becomes 8 times itself has earned 7 times itself. The ratio of interest to principal is \\(7 : 1\\), not \\(8 : 1\\).",
        },
      ],
    },
  ],
};
