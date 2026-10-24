import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_INSTALMENTS_NOTE: SubtopicNote = {
  subtopicName: "Instalments",
  title: "Paying Back a Loan in Instalments",
  oneLineDefinition:
    "A loan at compound interest is cleared when its payments, each divided by its own compound factor to bring it back to today, add up to the loan; or, year by year, when the balance carried forward reaches zero.",
  whyItMatters:
    "No AFCAT past-year question is on this page, but over a quarter of it is HARD and few rows are EASY. Every row uses one of two methods: bring each payment back to today, or carry the balance forward a year at a time. Carrying the balance forward when the payments are equal turns a one-line sum into a long one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-equal-instalment",
      name: "Equal instalments",
      intuition:
        "A payment due in a year is worth less today, because money held today would grow. At 10%, ₹1,100 due in a year is worth ₹1,000 now. A loan equals the sum of what its instalments are worth today.",
      definition:
        "- Equal yearly instalments \\(x\\) at \\(R\\%\\), with \\(r = \\tfrac{R}{100}\\): \\(\\dfrac{x}{1 + r} + \\dfrac{x}{(1 + r)^2} + \\dots = \\text{loan}\\).\n" +
        "- Two instalments: \\(x = \\text{loan} \\times \\dfrac{(1 + r)^2}{2 + r}\\).\n" +
        "- Use fractions where they are neat: at 25% the divisors give \\(\\tfrac45\\) and \\(\\tfrac{16}{25}\\); at 12.5% they give \\(\\tfrac89\\) and \\(\\tfrac{64}{81}\\).\n" +
        "- Total interest paid = (number of instalments × instalment) minus the loan.\n" +
        "- Half-yearly instalments: use the half-yearly rate and count half-years.",
      formula: {
        label: "Two equal instalments",
        latex: "x = \\text{loan} \\times \\dfrac{(1 + r)^2}{2 + r}",
      },
      authoredExample: {
        prompt: "₹4,200 is borrowed at 10% compound interest and repaid in two equal yearly instalments. Find each instalment.",
        steps: ["\\(x = 4200 \\times \\dfrac{1.21}{2.1} = 2 \\times 1210\\).", "Check: \\(\\dfrac{2420}{1.1} + \\dfrac{2420}{1.21} = 2200 + 2000 = 4200\\)."],
        answer: "₹2,420.",
      },
      selfCheckExample: {
        prompt: "₹3,310 is repaid in three equal yearly instalments at 10% compound interest. Find each instalment.",
        steps: [
          "\\(\\dfrac{1}{1.1} + \\dfrac{1}{1.21} + \\dfrac{1}{1.331} = \\dfrac{1.21 + 1.1 + 1}{1.331} = \\dfrac{3.31}{1.331}\\).",
          "\\(x = 3310 \\times \\dfrac{1.331}{3.31} = 1331\\).",
        ],
        answer: "₹1,331.",
      },
      practiceSet: [
        { prompt: "₹13,600 is repaid in two equal yearly instalments at 12.5% compound interest. Find each instalment.", answer: "₹8,100", method: "\\(\\tfrac89 + \\tfrac{64}{81} = \\tfrac{136}{81}\\)." },
        { prompt: "₹1,800 is repaid in two equal yearly instalments at 25% compound interest. Find each instalment.", answer: "₹1,250" },
        {
          prompt: "₹8,200 is borrowed at 5% compound interest and repaid in two equal yearly instalments. Find the total interest paid.",
          answer: "₹620",
          method: "Each instalment is ₹4,410.",
        },
      ],
      pyqExampleId: "dedf1cd1-75ad-4480-be7b-1d78f5a7d9d7",
      traps: [
        {
          title: "An instalment is not loan ÷ number",
          body: "₹4,200 in two equal instalments at 10% is ₹2,420 each, not ₹2,100 plus some simple interest. Each payment pays off a different amount of today's money.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-present-value",
      name: "The loan from its payments",
      intuition:
        "The same idea run the other way: given the payments, the loan is the sum of their present values, each payment divided by its own factor.",
      definition:
        "- Loan \\(= \\dfrac{x_1}{1 + r} + \\dfrac{x_2}{(1 + r)^2} + \\dfrac{x_3}{(1 + r)^3}\\); the payments may be different.\n" +
        "- A down payment is paid today, so it counts at its full value.\n" +
        "- Cash price against an instalment plan: bring the whole plan to today and compare it with the cash price.",
      formula: {
        label: "Loan from its payments",
        latex: "\\text{loan} = \\sum_k \\dfrac{x_k}{(1 + r)^k}",
      },
      authoredExample: {
        prompt: "A loan at 10% compound interest is cleared by ₹2,200 after one year and ₹3,630 after two years. Find the loan.",
        steps: ["\\(\\dfrac{2200}{1.1} = 2000\\) and \\(\\dfrac{3630}{1.21} = 3000\\)."],
        answer: "₹5,000.",
      },
      selfCheckExample: {
        prompt:
          "A TV costs ₹21,000 cash, or ₹5,000 down and two yearly instalments of ₹9,680 at 10% compound interest. Which is cheaper, and by how much?",
        steps: ["\\(\\dfrac{9680}{1.1} = 8800\\) and \\(\\dfrac{9680}{1.21} = 8000\\).", "The plan is worth \\(5000 + 8800 + 8000 = 21800\\) today."],
        answer: "Cash, by ₹800.",
      },
      practiceSet: [
        { prompt: "Three yearly payments of ₹1,331 each clear a loan at 10% compound interest. Find the loan.", answer: "₹3,310" },
        { prompt: "A loan at 20% compound interest is cleared by ₹1,200 after one year and ₹1,440 after two years. Find the loan.", answer: "₹2,000" },
        { prompt: "A loan at 5% compound interest is cleared by ₹2,100 after one year and ₹2,205 after two years. Find the loan.", answer: "₹4,000" },
      ],
      pyqExampleId: "71e7de1f-7b1b-4e65-a441-8c1de7c58957",
      traps: [
        {
          title: "Each payment has its own factor",
          body: "₹3,630 due in 2 years at 10% is worth \\(3630 \\div 1.21 = 3000\\) today. Dividing every payment by 1.1 overstates the loan.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-balance-forward",
      name: "Carrying the balance forward",
      intuition:
        "When the earlier payments are given and the last one is asked, follow the debt a year at a time: grow it by the rate, take off the payment, and repeat. What is owed at the end is the final payment.",
      definition:
        "- Each year: new balance = old balance × \\((1 + r)\\) minus the payment.\n" +
        "- The final payment is the last balance after it has grown for its year.\n" +
        "- The same answer comes from growing the loan to the end, growing each earlier payment to the end, and subtracting.\n" +
        "- A last payment at a part of a year needs a logarithm at compound interest; such rows are rare.",
      formula: {
        label: "Balance after a year",
        latex: "B_k = B_{k-1}(1 + r) - x_k",
      },
      authoredExample: {
        prompt:
          "₹10,000 is borrowed at 10% compound interest. ₹5,000 is repaid after one year and ₹2,000 after two years. What clears the debt at the end of the third year?",
        steps: [
          "Year 1: \\(10000 \\times 1.1 - 5000 = 6000\\).",
          "Year 2: \\(6000 \\times 1.1 - 2000 = 4600\\).",
          "Year 3: \\(4600 \\times 1.1 = 5060\\).",
        ],
        answer: "₹5,060.",
      },
      selfCheckExample: {
        prompt: "₹6,000 is borrowed at 20% compound interest and ₹2,000 is repaid after one year. What clears the debt at the end of the second year?",
        steps: ["Year 1: \\(6000 \\times 1.2 - 2000 = 5200\\).", "Year 2: \\(5200 \\times 1.2 = 6240\\)."],
        answer: "₹6,240.",
      },
      practiceSet: [
        { prompt: "₹5,000 is borrowed at 10% compound interest and ₹1,500 repaid after one year. What clears it at the end of the second year?", answer: "₹4,400" },
        { prompt: "₹12,000 is borrowed at 5% compound interest and ₹6,600 repaid after one year. What clears it at the end of the second year?", answer: "₹6,300" },
        {
          prompt: "₹20,000 is borrowed at 10% compound interest; ₹6,000 is repaid after one year and ₹8,000 after two. What clears it at the end of the third year?",
          answer: "₹10,560",
        },
      ],
      pyqExampleId: "ef26ee50-6f9e-42cd-b917-dd2fad496f59",
      traps: [
        {
          title: "Grow before you subtract",
          body: "A payment at the end of a year comes after that year's interest. Taking it off first and then adding interest charges less interest than the loan really owes.",
        },
      ],
    },
  ],
};
