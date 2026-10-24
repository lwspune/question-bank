import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_PARTNERSHIP_NOTE: SubtopicNote = {
  subtopicName: "Partnership",
  title: "Partnership",
  oneLineDefinition:
    "Partners share a profit in the ratio of capital multiplied by the time it stays in the business, after taking out first any amount the agreement sets aside.",
  whyItMatters:
    "Forty-two questions in the bank, the biggest page in this chapter, with twenty of them MODERATE. Twenty-one need only capital times time, nine have capital added or withdrawn during the year, eight take out charity, a salary or interest before sharing, and four share the rent of a field among animals.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrapa-capital",
      name: "Profit in the ratio of capital times time",
      intuition:
        "₹1,000 working for 2 months earns the business as much as ₹2,000 working for 1 month. So a partner's claim on the profit is capital multiplied by months, and the profit is shared in the ratio of those products.",
      definition:
        "- Partners share profit in the ratio of **capital \\(\\times\\) time**, often called capital-months.\n" +
        "- **Same time for everyone:** the ratio of capitals. **Same capital:** the ratio of times.\n" +
        "- **Joining late:** a partner who joins after m months of a 12-month year is in for \\(12 - m\\) months. Read the period: two years is 24 months.\n" +
        "- **Unknown time or capital:** set \\(\\frac{C_1t_1}{C_2t_2}\\) equal to the given profit ratio and solve.\n" +
        "- **Wages for days worked** follow the same rule: shares are in the ratio daily wage \\(\\times\\) days.\n" +
        "- Fast route: drop the thousands and cancel common factors before multiplying. Then a share is its fraction of the profit.",
      formula: {
        label: "Profit sharing",
        latex: "P_1 : P_2 : P_3 = C_1t_1 : C_2t_2 : C_3t_3",
        symbols: [
          { symbol: "C", meaning: "a partner's capital" },
          { symbol: "t", meaning: "the months that capital stays in" },
        ],
      },
      authoredExample: {
        prompt: "R starts a business with ₹45,000. S joins 4 months later with ₹60,000. Out of the year's profit of ₹34,000, what is S's share?",
        steps: [
          "In thousands: R \\(= 45 \\times 12 = 540\\) and S \\(= 60 \\times 8 = 480\\).",
          "\\(540 : 480 = 9 : 8\\), a total of 17 parts, so one part is \\(\\frac{34000}{17} = 2000\\).",
          "S's share \\(= 8 \\times 2000 = 16000\\). Check: R gets 18,000 and the shares add to 34,000.",
        ],
        answer: "₹16,000",
      },
      selfCheckExample: {
        prompt: "A invests ₹30,000 for 8 months and B invests ₹20,000. For how many months must B's money stay in so that the profits are in the ratio 2 : 1?",
        steps: [
          "\\(\\frac{30 \\times 8}{20t} = \\frac{2}{1}\\), so \\(240 = 40t\\) and \\(t = 6\\).",
          "Check: \\(240 : 120 = 2 : 1\\).",
        ],
        answer: "6 months",
      },
      practiceSet: [
        { prompt: "P and Q invest ₹12,000 and ₹18,000 for the same period. What is P's share of a profit of ₹15,000?", answer: "₹6,000" },
        { prompt: "Capitals are in the ratio 4 : 5 and times in the ratio 3 : 2. What is the ratio of the profits?", answer: "6 : 5" },
        {
          prompt: "X invests ₹10,000 for the whole year. Y joins after 4 months with ₹15,000. What is the ratio of their profits?",
          answer: "1 : 1",
          method: "\\(10 \\times 12 = 120\\) and \\(15 \\times 8 = 120\\).",
        },
      ],
      pyqExampleId: "79a2dc97-1e67-4ec0-9c91-06e361e8105b",
      traps: [
        {
          title: "Counting the whole year for a late partner",
          body:
            "A partner who joins after 5 months has money in for 7 months of a 12-month year. Multiplying the capital by 12 overstates the share.",
        },
        {
          title: "Taking the year when the stem says two years",
          body:
            "If the profit is shared after two years, the time is 24 months, and a partner who joined after 10 months was in for 14 months, not 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrapa-changes",
      name: "Capital that changes during the year",
      intuition:
        "When a partner adds or takes out money, the year breaks into stretches, and in each stretch the capital is fixed. Each stretch earns capital times its months, and the partner's claim is the sum of the stretches.",
      definition:
        "- Split each partner's year at every change. Capital-months \\(= C_1t_1 + C_2t_2 + \\cdots\\).\n" +
        "- A **withdrawal** lowers the capital from that month on; an **addition** raises it. Months before the change keep the old capital.\n" +
        "- Fast route: work in thousands or lakhs, and when two partners share a stretch length, compare the bracket sums: \\(6(100 + 80)\\) against \\(6(80 + 120)\\).\n" +
        "- If a stem gives the profit share and asks for a starting capital, write the capital-months in terms of x and use the share ratio.",
      formula: {
        label: "Capital-months with changes",
        latex: "\\text{capital-months} = C_1t_1 + C_2t_2 + \\cdots",
      },
      authoredExample: {
        prompt: "M starts a business with ₹50,000. After 4 months N joins with ₹40,000. Four months after that, M takes out ₹20,000. Find the ratio of their profits at the end of the year.",
        steps: [
          "M, in thousands: 50 for 8 months and 30 for 4 months, so \\(400 + 120 = 520\\).",
          "N: 40 for 8 months \\(= 320\\).",
          "\\(520 : 320 = 13 : 8\\).",
        ],
        answer: "13 : 8",
      },
      selfCheckExample: {
        prompt: "A and B start a business with ₹60,000 each. After 6 months A adds ₹30,000 and B takes out ₹20,000. What is the ratio of their profits at the end of the year?",
        steps: [
          "In thousands: A \\(= 6(60 + 90) = 900\\); B \\(= 6(60 + 40) = 600\\).",
          "\\(900 : 600 = 3 : 2\\).",
        ],
        answer: "3 : 2",
      },
      practiceSet: [
        { prompt: "P invests ₹20,000 and adds ₹10,000 after 3 months. What are P's capital-months for the year, in thousands?", answer: "330" },
        { prompt: "Q invests ₹40,000 and takes out half of it after 6 months. What are Q's capital-months for the year, in thousands?", answer: "360" },
        {
          prompt: "X invests ₹8,000 for a year. Y invests ₹12,000 but takes out ₹6,000 after 4 months. What is the ratio of their profits?",
          answer: "1 : 1",
          method: "X: \\(8 \\times 12 = 96\\); Y: \\(12 \\times 4 + 6 \\times 8 = 96\\).",
        },
      ],
      pyqExampleId: "a283293c-5b10-4c8f-bf81-5f9494b2c8a7",
      traps: [
        {
          title: "Using the final capital for the whole year",
          body:
            "If ₹30,000 is taken out after 8 months, the lower capital counts only for the last 4 months. The first 8 months still earn on the full amount.",
        },
        {
          title: "Reading \"2 times more than\"",
          body:
            "In the bank, SSC's key reads \"A invests 2 times more than B\" as A = 3 times B (B's amount plus twice more). \"Twice as much as B\" is 2 times B. When the stem uses the first wording, test both readings against the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrapa-deductions",
      name: "Charity, salary or interest taken out before sharing",
      intuition:
        "Some agreements pay out a slice of the profit before the partners split it: a gift to charity, a working partner's fee, or interest on each capital. That slice must come off first, because only what is left is shared by capital.",
      definition:
        "- **Order of work:** take out what the stem sets aside, then share the remainder in the capital (\\(\\times\\) time) ratio.\n" +
        "- **Charity of r%:** the shared amount is \\((1 - r)\\) of the profit. A partner's share is \\(\\frac{a}{a + b} \\times (1 - r)P\\); solve this for P when a share is given.\n" +
        "- **Working or managing partner:** gets the extra first, PLUS a capital share of the rest.\n" +
        "- **Interest on capital:** each partner receives interest on their own capital first; the remainder splits in the capital ratio.\n" +
        "- **Effective contribution:** labour valued in money is added to that partner's capital before forming the ratio.",
      formula: {
        label: "Share after a deduction",
        latex: "\\text{share} = \\text{own extra} + \\frac{c}{c_1 + c_2} \\times (P - \\text{deductions})",
        symbols: [
          { symbol: "c", meaning: "the partner's capital (times time)" },
          { symbol: "P", meaning: "the total profit" },
        ],
      },
      authoredExample: {
        prompt: "A and B invest in the ratio 2 : 3. 20% of the profit goes to charity and the rest is shared. B gets ₹14,400. What is the total profit?",
        steps: [
          "B gets \\(\\frac{3}{5}\\) of the 80% that is shared: \\(\\frac{3}{5} \\times 0.8P = 0.48P\\).",
          "\\(0.48P = 14400\\), so \\(P = 30000\\).",
          "Check: 80% of 30,000 is 24,000, and \\(\\frac{3}{5}\\) of 24,000 is 14,400.",
        ],
        answer: "₹30,000",
      },
      selfCheckExample: {
        prompt: "P and Q invest ₹50,000 and ₹30,000. P runs the business and first takes 10% of the ₹48,000 profit. The rest is shared by capital. What does P get in all?",
        steps: [
          "P's fee \\(= 4800\\). The rest, 43,200, is shared \\(5 : 3\\).",
          "P's capital share \\(= \\frac{5}{8} \\times 43200 = 27000\\), so P gets \\(27000 + 4800 = 31800\\).",
        ],
        answer: "₹31,800",
      },
      practiceSet: [
        {
          prompt: "Interest at 10% a year is paid on capitals of ₹30,000 and ₹50,000 before a profit of ₹20,000 is shared by capital. What does the first partner get in all?",
          answer: "₹7,500",
          method: "Interest 3,000 and 5,000; the other 12,000 splits \\(3 : 5\\), giving 4,500 more.",
        },
        { prompt: "A brings ₹1,00,000 and labour valued at ₹20,000; B brings ₹80,000. In what ratio is the profit shared by effective contribution?", answer: "3 : 2" },
        { prompt: "Of a profit of ₹60,000, 5% goes to charity and the rest is shared in the ratio 1 : 2. What is the smaller share?", answer: "₹19,000" },
      ],
      pyqExampleId: "21ddc7bf-a87b-4841-8fa5-04c014647440",
      traps: [
        {
          title: "Sharing before deducting",
          body:
            "If a managing partner takes 10% first, only the other 90% is shared by capital. Sharing the full profit and then adding 10% counts that 10% twice.",
        },
        {
          title: "Forgetting the working partner's capital share",
          body:
            "A working partner gets the fee AND a capital share of what remains. Answering with the fee alone, or the capital share alone, is a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrapa-rent",
      name: "Rent for a shared field in animal-months",
      intuition:
        "Rent for a grazing field is paid for the grass eaten. A horse eats more than a sheep, and an animal kept longer eats more, so every animal is first turned into one common kind, and then animals times months plays the part of capital times time.",
      definition:
        "- Turn every animal into one kind using the given rates. If 3 horses eat as much as 5 cows, 1 horse \\(= \\frac{5}{3}\\) cow.\n" +
        "- Each person's grazing \\(=\\) (number of animals in the common unit) \\(\\times\\) months, summed over their animals.\n" +
        "- The rent is shared in the ratio of grazing. A fraction of the rent is that person's grazing over the total.\n" +
        "- Pick the smallest animal as the unit; the numbers usually stay whole.",
      formula: {
        label: "Share of the rent",
        latex: "\\text{share} = \\frac{\\text{own animal-months}}{\\text{total animal-months}} \\times \\text{rent}",
      },
      authoredExample: {
        prompt: "X grazes 10 cows for 6 months and Y grazes 40 sheep for 3 months. 2 cows eat as much as 5 sheep. What fraction of the rent does X pay?",
        steps: [
          "1 cow \\(= 2.5\\) sheep. X: \\(10 \\times 2.5 \\times 6 = 150\\) sheep-months.",
          "Y: \\(40 \\times 3 = 120\\) sheep-months.",
          "X pays \\(\\frac{150}{150 + 120} = \\frac{150}{270} = \\frac{5}{9}\\).",
        ],
        answer: "\\(\\frac{5}{9}\\)",
      },
      selfCheckExample: {
        prompt: "A grazes 12 goats for 4 months and B grazes 8 goats for 9 months. The rent is ₹3,000. How much does B pay?",
        steps: [
          "A: \\(12 \\times 4 = 48\\) goat-months; B: \\(8 \\times 9 = 72\\).",
          "B pays \\(\\frac{72}{120} \\times 3000 = 1800\\).",
        ],
        answer: "₹1,800",
      },
      practiceSet: [
        { prompt: "3 horses eat as much as 4 cows. How many cows eat as much as 9 horses?", answer: "12" },
        { prompt: "P grazes 5 cows for 8 months and Q grazes 10 cows for 2 months. In what ratio do they share the rent?", answer: "2 : 1" },
      ],
      pyqExampleId: "d02d6c07-15f9-42fc-9eb4-5a0aee1b6ae4",
      traps: [
        {
          title: "Adding animals of different kinds",
          body:
            "20 horses and 30 cows are not 50 units of grazing. Convert every animal to one kind with the given rate before multiplying by months.",
        },
      ],
    },
  ],
};
