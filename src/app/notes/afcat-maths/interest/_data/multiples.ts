import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_MULTIPLES_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest: Sum Becoming n Times",
  title: "When a Sum Doubles, Triples or Becomes n Times at Simple Interest",
  oneLineDefinition:
    "A sum that becomes n times itself has earned n minus 1 times itself as interest, the same amount every year, so rate × time = 100 × (n minus 1).",
  whyItMatters:
    "Three of AFCAT's past-year questions are here, from 2015 and 2016, and it is one of the larger pages of the chapter. The one slip is counting the multiple instead of the interest: a sum that triples has earned two principals, not three.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-si-multiple-rate",
      name: "The multiple and the rate",
      intuition:
        "If a sum becomes 4 times itself, the interest is 3 times the sum, which is 300%. Spread over the years, that is rate × time. A fraction of the principal works the same way: interest of half the sum is 50%.",
      definition:
        "- Becomes \\(n\\) times in \\(T\\) years: \\(R \\times T = 100(n - 1)\\).\n" +
        "- Doubles: \\(RT = 100\\). Triples: \\(RT = 200\\).\n" +
        "- Interest equal to \\(\\tfrac ab\\) of the sum: \\(RT = 100 \\times \\tfrac ab\\).\n" +
        "- Read the other way: at \\(R\\%\\) for \\(T\\) years the sum becomes \\(1 + \\tfrac{RT}{100}\\) times itself, and it becomes \\(n\\) times in \\(\\tfrac{100(n - 1)}{R}\\) years.\n" +
        "- A rate per half-year or per quarter is the yearly rate divided by 2 or 4.",
      formula: {
        label: "Multiple and rate",
        latex: "R \\times T = 100\\,(n - 1)",
      },
      authoredExample: {
        prompt: "A sum becomes 5 times itself in 16 years at simple interest. Find the rate.",
        steps: ["The interest is 4 times the sum, 400%.", "\\(R = \\dfrac{400}{16} = 25\\).",],
        answer: "25% a year.",
      },
      selfCheckExample: {
        prompt: "The simple interest on a sum for 8 years is \\(\\tfrac25\\) of the sum. Find the rate.",
        steps: ["\\(\\tfrac25\\) of the sum is 40%.", "\\(R = \\dfrac{40}{8} = 5\\)."],
        answer: "5% a year.",
      },
      practiceSet: [
        { prompt: "A sum doubles in 8 years at simple interest. Find the rate.", answer: "12.5%" },
        { prompt: "At 15% a year simple interest, in how many years will a sum become 4 times itself?", answer: "20 years" },
        { prompt: "At 8% a year simple interest, how many times itself will a sum become in 15 years?", answer: "2.2 times" },
        { prompt: "A sum becomes \\(\\tfrac74\\) times itself in 5 years at simple interest. Find the rate.", answer: "15%" },
      ],
      pyqExampleId: "2fb3e713-2248-4f4b-902b-4bb2b3696ab5",
      traps: [
        {
          title: "n times means n minus 1 as interest",
          body: "A sum that becomes 4 times itself in 12 years has earned 300%, so the rate is 25%. Using 400% gives \\(33\\tfrac13\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-si-multiple-time",
      name: "From one multiple to another",
      intuition:
        "At simple interest the sum earns the same amount every year. If it doubles in 6 years it earns one principal every 6 years, so to become 4 times itself (three principals of interest) it needs 18 years.",
      definition:
        "- Count principals of interest: becoming \\(n\\) times means \\(n - 1\\) principals.\n" +
        "- Time is proportional to interest: \\(\\dfrac{T_2}{T_1} = \\dfrac{n_2 - 1}{n_1 - 1}\\).\n" +
        "- Fractions work the same: \\(\\tfrac54\\) times itself means \\(\\tfrac14\\) of the sum as interest.\n" +
        "- Never multiply the multiples. That is the compound interest rule, which comes later in the chapter.",
      formula: {
        label: "Time to a new multiple",
        latex: "T_2 = T_1 \\times \\dfrac{n_2 - 1}{n_1 - 1}",
      },
      authoredExample: {
        prompt: "A sum doubles in 7 years at simple interest. In how many years will it become 5 times itself?",
        steps: ["Doubling is one principal of interest in 7 years.", "5 times needs 4 principals: \\(4 \\times 7 = 28\\)."],
        answer: "28 years.",
      },
      selfCheckExample: {
        prompt: "A sum becomes \\(\\tfrac54\\) times itself in 2 years at simple interest. In how many years will it become \\(\\tfrac74\\) times itself?",
        steps: ["It earns \\(\\tfrac14\\) of itself in 2 years.", "\\(\\tfrac34\\) of itself takes three times as long."],
        answer: "6 years.",
      },
      practiceSet: [
        { prompt: "A sum triples in 10 years at simple interest. In how many years will it become 6 times itself?", answer: "25 years" },
        { prompt: "A sum becomes 3 times itself in 16 years at simple interest. In how many years does it double?", answer: "8 years" },
        { prompt: "A sum becomes 1.6 times itself in 4 years at simple interest. In how many years will it become 2.5 times itself?", answer: "10 years" },
      ],
      pyqExampleId: "c0b57e78-f783-42b9-824a-17833694219a",
      traps: [
        {
          title: "Count interest, not the multiple",
          body: "A sum doubling in 3 years at simple interest becomes 4 times itself in 9 years, because 4 times needs three principals of interest. 6 years is the compound interest answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-si-multiple-at-time",
      name: "The multiple, amount or interest after another time",
      intuition:
        "Once one year's interest is known as a share of the sum, any other time follows. A sum that doubles in 20 years earns 5% of itself a year, so after 4 years it is 1.2 times itself.",
      definition:
        "- The share earned each year is \\(\\dfrac{n - 1}{T}\\).\n" +
        "- After \\(t\\) years the sum is \\(1 + t \\times \\dfrac{n - 1}{T}\\) times itself.\n" +
        "- The interest after \\(t\\) years is \\(t \\times \\dfrac{n - 1}{T}\\) of the sum, which gives the ratio of principal to interest.\n" +
        "- With a rupee principal, multiply at the end.",
      formula: {
        label: "Multiple after t years",
        latex: "1 + t \\times \\dfrac{n - 1}{T}",
      },
      authoredExample: {
        prompt: "A sum doubles in 20 years at simple interest. How many times itself is it after 6 years, and what is ₹5,000 worth then?",
        steps: ["It earns \\(\\tfrac{1}{20}\\) of itself a year, so \\(\\tfrac{6}{20} = 0.3\\) in 6 years.", "It is 1.3 times itself, and \\(1.3 \\times 5000 = 6500\\)."],
        answer: "1.3 times; ₹6,500.",
      },
      selfCheckExample: {
        prompt: "A sum becomes 4 times itself in 15 years at simple interest. What is the ratio of principal to interest after 10 years?",
        steps: ["It earns 3 principals in 15 years, so \\(\\tfrac15\\) of itself a year.", "In 10 years the interest is 2 principals."],
        answer: "\\(1 : 2\\).",
      },
      practiceSet: [
        { prompt: "A sum triples in 10 years at simple interest. How many times itself is it after 15 years?", answer: "4 times" },
        { prompt: "A sum becomes 6 times itself in 20 years at simple interest. How many times itself is it after 12 years?", answer: "4 times" },
        { prompt: "₹3,000 doubles in 12 years at simple interest. Find the interest on it for 4 years.", answer: "₹1,000" },
      ],
      pyqExampleId: "b1045c0f-4d7f-416b-be65-1382c4ff8495",
      traps: [
        {
          title: "Add the 1 back",
          body: "After 10 years at 15% a year a sum has earned 1.5 times itself, so it is 2.5 times itself. Stopping at 1.5 answers 'how much interest', not 'how many times'.",
        },
      ],
    },
  ],
};
