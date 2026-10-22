import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound Interest: Annual",
  title: "Compound Interest Added Once a Year",
  oneLineDefinition:
    "Each year's interest is added to the sum and earns in its turn, so the amount is P(1 + R/100)ⁿ; the same factor read backwards gives the principal, the rate or the time.",
  whyItMatters:
    "This is the largest page of the chapter, and AFCAT asked it in 2016: the interest on a sum for three years. Most rows need only the factor (1 + R/100)ⁿ. Marks go when the rate or time is found by trial instead of by spotting a factor such as 1.21, 1.1025 or 1.331.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-ci-amount",
      name: "Amount and compound interest",
      intuition:
        "₹5,000 at 10%: after one year it is ₹5,500. In the second year the interest is on ₹5,500, so ₹550, and the amount is ₹6,050. Simple interest would have given ₹6,000.",
      definition:
        "- \\(A = P\\left(1 + \\tfrac{R}{100}\\right)^n\\) and the **compound interest** is \\(CI = A - P\\).\n" +
        "- Factors worth knowing: \\(1.1^2 = 1.21\\), \\(1.1^3 = 1.331\\), \\(1.05^2 = 1.1025\\), \\(1.2^2 = 1.44\\), \\(1.08^2 = 1.1664\\), \\(1.12^2 = 1.2544\\).\n" +
        "- Several investments: work out each one's interest and add. A part at simple interest still uses the simple interest formula.\n" +
        "- A rise in the rate: work out the interest at each rate and subtract.",
      formula: {
        label: "Compound amount",
        latex: "A = P\\left(1 + \\dfrac{R}{100}\\right)^n, \\quad CI = A - P",
      },
      authoredExample: {
        prompt: "Find the compound interest on ₹8,000 at 10% a year for 3 years.",
        steps: ["\\(A = 8000 \\times 1.1^3 = 8000 \\times 1.331 = 10648\\).", "\\(CI = 10648 - 8000\\)."],
        answer: "₹2,648.",
      },
      selfCheckExample: {
        prompt: "Find the amount on ₹6,250 at 8% a year for 2 years, compounded annually.",
        steps: ["\\(6250 \\times 1.08^2 = 6250 \\times 1.1664\\)."],
        answer: "₹7,290.",
      },
      practiceSet: [
        { prompt: "Find the compound interest on ₹10,000 at 12% a year for 2 years.", answer: "₹2,544" },
        { prompt: "Find the amount on ₹2,000 at 20% a year compound interest for 3 years.", answer: "₹3,456", method: "\\(1.2^3 = 1.728\\)." },
        {
          prompt: "₹6,000 is invested at 10% compound interest and ₹3,000 at 6% simple interest, both for 2 years. Find the total interest.",
          answer: "₹1,620",
        },
      ],
      pyqExampleId: "7470f8e7-3fc1-40f4-bc7d-56a8e9223404",
      traps: [
        {
          title: "Compound interest is not rate × years",
          body: "At 10% for 3 years the compound interest is 33.1% of the sum, not 30%. The 30% figure is simple interest, and it is always among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-reverse",
      name: "Principal, rate or time from the factor",
      intuition:
        "Divide the amount by the principal. The result is \\((1 + R/100)^n\\); recognise it and the rate and time follow. 1.21 is 10% for 2 years, 1.1025 is 5% for 2 years, 1.331 is 10% for 3 years.",
      definition:
        "- Principal, or the **present worth** of a sum due later: \\(P = \\dfrac{A}{(1 + R/100)^n}\\).\n" +
        "- From the interest: \\(P = \\dfrac{CI}{(1 + R/100)^n - 1}\\).\n" +
        "- Rate: take the \\(n\\)th root of \\(\\tfrac AP\\). More squares to know: \\(1.04^2 = 1.0816\\), \\(1.06^2 = 1.1236\\), \\(1.15^2 = 1.3225\\).\n" +
        "- Time: keep multiplying by the yearly factor until you reach \\(\\tfrac AP\\).",
      formula: {
        label: "Present worth",
        latex: "P = \\dfrac{A}{\\left(1 + \\frac{R}{100}\\right)^n}",
      },
      authoredExample: {
        prompt: "What sum amounts to ₹9,261 in 3 years at 5% compound interest?",
        steps: ["\\(1.05^3 = 1.157625\\).", "\\(P = \\dfrac{9261}{1.157625} = 8000\\)."],
        answer: "₹8,000.",
      },
      selfCheckExample: {
        prompt: "₹2,500 amounts to ₹3,025 in 2 years at compound interest. Find the rate.",
        steps: ["\\(\\dfrac{3025}{2500} = 1.21 = 1.1^2\\)."],
        answer: "10% a year.",
      },
      practiceSet: [
        { prompt: "Find the present worth of ₹4,840 due in 2 years at 10% compound interest.", answer: "₹4,000" },
        { prompt: "The compound interest on a sum for 2 years at 6% is ₹618. Find the sum.", answer: "₹5,000" },
        { prompt: "In how many years will ₹1,000 amount to ₹1,331 at 10% compound interest?", answer: "3 years" },
      ],
      pyqExampleId: "4424ed70-594e-4154-8f9f-d3d5124201b1",
      traps: [
        {
          title: "Divide by the factor",
          body: "The present worth of ₹4,840 due in 2 years at 10% is \\(4840 \\div 1.21 = 4000\\). Taking 20% off ₹4,840 gives ₹3,872, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-factor",
      name: "The same factor on another sum",
      intuition:
        "At the same rate and for the same time every sum grows by the same factor. If ₹4,000 becomes ₹4,410 in 2 years, any sum becomes 1.1025 times itself in 2 years, and the rate need not be found.",
      definition:
        "- Same rate, same time: new amount = new sum × \\(\\dfrac{A_1}{P_1}\\). The interest scales the same way.\n" +
        "- Same rate, a different time: find the yearly factor first (here \\(\\sqrt{1.1025} = 1.05\\)), then raise it to the new time.\n" +
        "- A 2-year factor squared is the 4-year factor.\n" +
        "- A changed rate: find the rate, change it, and build the new factor.",
      formula: {
        label: "Carrying the factor",
        latex: "A_2 = P_2 \\times \\dfrac{A_1}{P_1}",
      },
      authoredExample: {
        prompt:
          "₹8,000 becomes ₹9,331.20 in 2 years at compound interest. What will ₹12,500 become in 2 years, and in 3 years, at the same rate?",
        steps: [
          "\\(\\dfrac{9331.20}{8000} = 1.1664 = 1.08^2\\), so the yearly factor is 1.08.",
          "In 2 years: \\(12500 \\times 1.1664 = 14580\\).",
          "In 3 years: \\(14580 \\times 1.08 = 15746.40\\).",
        ],
        answer: "₹14,580 and ₹15,746.40.",
      },
      selfCheckExample: {
        prompt: "₹2,500 amounts to ₹2,704 in 2 years at compound interest. What will ₹5,000 amount to in 4 years at the same rate?",
        steps: [
          "\\(\\dfrac{2704}{2500} = 1.0816\\), the 2-year factor.",
          "The 4-year factor is \\(1.0816^2 = 1.16985856\\), so \\(5000 \\times 1.16985856 = 5849.29\\).",
        ],
        answer: "About ₹5,849.29.",
      },
      practiceSet: [
        { prompt: "₹3,000 becomes ₹3,307.50 in 2 years at compound interest. What does ₹5,000 become in 2 years at the same rate?", answer: "₹5,512.50" },
        { prompt: "The compound interest on ₹2,000 for 2 years is ₹332.80. Find the compound interest on ₹7,000 for 2 years at the same rate.", answer: "₹1,164.80" },
        {
          prompt: "₹500 becomes ₹551.25 in 2 years at compound interest. If the rate is raised by 5 percentage points, what does ₹500 become in 2 years?",
          answer: "₹605",
        },
      ],
      pyqExampleId: "4e37cd9a-51ad-4f15-90b7-3eedcfee7532",
      traps: [
        {
          title: "A different time needs the yearly factor",
          body: "A sum that becomes 1.1664 times itself in 2 years becomes \\(1.08^3 = 1.259712\\) times itself in 3 years, not \\(1.1664 \\times 1.5 = 1.7496\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-successive",
      name: "Two amounts in a row, and one year's interest",
      intuition:
        "Amounts after consecutive years differ by one year's interest on the earlier amount. So the later amount divided by the earlier one is \\(1 + R/100\\), which gives the rate at once; dividing back gives the principal.",
      definition:
        "- Rate: \\(R = \\dfrac{A_{n+1} - A_n}{A_n} \\times 100\\).\n" +
        "- Principal: \\(P = \\dfrac{A_n}{(1 + R/100)^n}\\).\n" +
        "- The interest of year \\(k\\) alone is \\(R\\%\\) of the amount at the start of that year, \\(P(1 + R/100)^{k-1}\\).\n" +
        "- The compound interest for 3 years minus that for 2 years is the third year's interest.\n" +
        "- Two amounts two years apart: their ratio is \\((1 + R/100)^2\\).",
      formula: {
        label: "Rate from consecutive amounts",
        latex: "1 + \\dfrac{R}{100} = \\dfrac{A_{n+1}}{A_n}",
      },
      authoredExample: {
        prompt: "A sum amounts to ₹6,050 in 2 years and to ₹6,655 in 3 years at compound interest. Find the rate and the sum.",
        steps: [
          "The third year's interest is \\(6655 - 6050 = 605\\), which is 10% of ₹6,050.",
          "The sum is \\(\\dfrac{6050}{1.1^2} = \\dfrac{6050}{1.21} = 5000\\).",
        ],
        answer: "10% a year; ₹5,000.",
      },
      selfCheckExample: {
        prompt: "₹10,000 is lent at 10% compound interest. Find the interest for the third year alone.",
        steps: ["After 2 years the sum is \\(10000 \\times 1.21 = 12100\\).", "The third year adds 10% of that."],
        answer: "₹1,210.",
      },
      practiceSet: [
        { prompt: "A sum amounts to ₹4,410 in 2 years and to ₹4,630.50 in 3 years at compound interest. Find the rate.", answer: "5%" },
        { prompt: "Find the compound interest for 3 years minus that for 2 years on ₹5,000 at 10%.", answer: "₹605" },
        { prompt: "A sum amounts to ₹1,210 in 2 years and to ₹1,464.10 in 4 years at compound interest. Find the rate.", answer: "10%" },
      ],
      pyqExampleId: "2ca2544f-9db4-45ef-bb6c-2a6cc7fcf30e",
      traps: [
        {
          title: "Divide by the earlier amount",
          body: "From ₹6,050 to ₹6,655 is ₹605 on ₹6,050, which is 10%. Dividing by the later amount gives about 9.1%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-ci-changing-rate",
      name: "Changing rates, part years, growth and depreciation",
      intuition:
        "Each year multiplies the sum by its own factor, so a rate that changes is just a product of different factors. The same multiplying describes a town that grows or a machine that loses value every year.",
      definition:
        "- Different rates in different years: \\(A = P\\left(1 + \\tfrac{R_1}{100}\\right)\\left(1 + \\tfrac{R_2}{100}\\right)\\left(1 + \\tfrac{R_3}{100}\\right)\\).\n" +
        "- A part year at annual compounding: the whole years compound, and the part year earns simple interest on the amount reached. \\(1\\tfrac12\\) years at 10% is \\(1.1 \\times 1.05 = 1.155\\).\n" +
        "- **Growth** of \\(r\\%\\) a year: \\(P\\left(1 + \\tfrac{r}{100}\\right)^n\\). **Depreciation** of \\(r\\%\\) a year: \\(V\\left(1 - \\tfrac{r}{100}\\right)^n\\).",
      formula: {
        label: "Depreciation",
        latex: "V_n = V\\left(1 - \\dfrac{r}{100}\\right)^n",
      },
      authoredExample: {
        prompt:
          "₹5,000 is invested for 3 years, at 10% in the first year, 12% in the second and 15% in the third, compounded annually. Find the amount.",
        steps: ["\\(5000 \\times 1.1 = 5500\\).", "\\(5500 \\times 1.12 = 6160\\).", "\\(6160 \\times 1.15 = 7084\\)."],
        answer: "₹7,084.",
      },
      selfCheckExample: {
        prompt: "A machine worth ₹50,000 loses 10% of its value every year. Find its value after 3 years.",
        steps: ["\\(0.9^3 = 0.729\\).", "\\(50000 \\times 0.729 = 36450\\)."],
        answer: "₹36,450.",
      },
      practiceSet: [
        { prompt: "A town of 20,000 people grows by 10% a year. Find its population after 2 years.", answer: "24,200" },
        { prompt: "Find the amount on ₹4,000 at 10% a year for \\(2\\tfrac12\\) years, compounded annually.", answer: "₹5,082", method: "\\(4000 \\times 1.21 \\times 1.05\\)." },
        {
          prompt: "A sum becomes ₹6,600 after one year at 10% compound interest and ₹7,590 after the next year at a new rate. Find the new rate.",
          answer: "15%",
        },
      ],
      pyqExampleId: "524ed742-9f2d-43a6-9038-b363f39658ca",
      traps: [
        {
          title: "A falling value multiplies by less than 1",
          body: "A loss of 10% a year for 3 years leaves 72.9% of the value, not 70%.",
        },
        {
          title: "The part year is simple",
          body: "For \\(2\\tfrac12\\) years at 10% compounded annually the factor is \\(1.21 \\times 1.05\\). Writing \\(1.1^{2.5}\\) treats the half year as compounded.",
        },
      ],
    },
  ],
};
