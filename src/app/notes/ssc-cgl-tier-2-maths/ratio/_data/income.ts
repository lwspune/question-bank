import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RA_INCOME_NOTE: SubtopicNote = {
  subtopicName: "Ratios in Income, Savings and Ages",
  title: "Ratios in Income, Savings and Ages",
  oneLineDefinition:
    "Two people's incomes, expenditures and savings in ratio make two equations from one savings line each; ages in ratio move by the same number of years, so their gap never changes.",
  whyItMatters:
    "8 questions in the Tier II bank, 5 EASY and 3 MODERATE. The MODERATE ones give an income ratio and an expenditure ratio together, which takes two letters, k and m.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rain-income",
      name: "Incomes, expenditures and savings in ratio",
      intuition:
        "For each person, income minus expenditure is savings. Write the incomes as parts of k and the expenditures as parts of m; each person's savings line is then one equation, and two people give two equations.",
      definition:
        "- Incomes \\(a : b\\) are \\(ak\\) and \\(bk\\); expenditures \\(c : d\\) are \\(cm\\) and \\(dm\\).\n" +
        "- Savings are \\(ak - cm\\) and \\(bk - dm\\). Equal savings give one equation; a savings ratio gives another.\n" +
        "- If the expenditures are given in rupees, only k is unknown.\n" +
        "- Ratios from one year to the next (this year : last year for each person) multiply onto the old incomes.",
      formula: {
        label: "Two savings lines",
        latex: "ak - cm = S_1, \\quad bk - dm = S_2",
      },
      authoredExample: {
        prompt: "The incomes of P and Q are in the ratio 5 : 4 and their expenditures in the ratio 3 : 2. Each saves ₹2,000 a month. Find P's income.",
        steps: [
          "\\(5k - 3m = 2000\\) and \\(4k - 2m = 2000\\).",
          "From the second, \\(m = 2k - 1000\\); then \\(5k - 6k + 3000 = 2000\\), so \\(k = 1000\\).",
          "P earns ₹5,000. Check: \\(m = 1000\\), so the expenditures are 3,000 and 2,000 and both save 2,000.",
        ],
        answer: "₹5,000",
      },
      selfCheckExample: {
        prompt: "A and B earn in the ratio 3 : 2 and each spends ₹1,800. Their savings are in the ratio 2 : 1. Find A's income.",
        steps: ["\\(3k - 1800 = 2(2k - 1800)\\), so \\(k = 1800\\).", "A earns \\(3 \\times 1800 = 5400\\)."],
        answer: "₹5,400",
      },
      practiceSet: [
        { prompt: "Two incomes are in the ratio 7 : 5 and both spend ₹3,000. The first saves ₹3,000 more than the second. Find the incomes.", answer: "₹10,500 and ₹7,500" },
        { prompt: "A earns 1.5 times what B earns. A spends ₹4,000 and both save ₹2,000. Find B's income.", answer: "₹4,000" },
        { prompt: "Last year X and Y earned in the ratio 3 : 2. This year X earns 10% more and Y 20% more. Find this year's ratio.", answer: "11 : 8" },
      ],
      pyqExampleId: "e80f2bb5-8bc5-42b3-80c0-ffd83f099fcc",
      traps: [
        {
          title: "Reading a savings ratio as an income ratio",
          body: "A savings ratio of 2 : 1 is about income minus expenditure. With equal spending of ₹1,800, incomes of ₹5,400 and ₹3,600 give savings of 2 : 1, though the incomes are only 3 : 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rain-ages",
      name: "Ages in ratio",
      intuition:
        "Every year both people grow one year older, so the gap between their ages never changes, but their ratio does. Write the ages as parts of x, move both by the same number of years, and set the new ratio.",
      definition:
        "- Present ages \\(ax\\) and \\(bx\\); after n years \\((ax + n) : (bx + n)\\); n years ago, subtract n from both.\n" +
        "- The gap \\((a - b)x\\) stays the same for ever.\n" +
        "- **Shortcut:** if the gap is the same number of parts in both ratios, compare the parts directly.",
      formula: {
        label: "Ages after n years",
        latex: "\\frac{ax + n}{bx + n} = \\frac{p}{q}",
      },
      authoredExample: {
        prompt: "The ages of two sisters are in the ratio 5 : 7. After 6 years the ratio will be 3 : 4. Find their present ages.",
        steps: ["\\(4(5x + 6) = 3(7x + 6)\\), so \\(20x + 24 = 21x + 18\\) and \\(x = 6\\).", "The ages are 30 and 42. Check: after 6 years, 36 : 48 = 3 : 4."],
        answer: "30 and 42 years",
      },
      selfCheckExample: {
        prompt: "Ten years ago a father and son had ages in the ratio 3 : 1. Their present ages are in the ratio 2 : 1. Find the father's present age.",
        steps: ["Present ages \\(2x\\) and \\(x\\): \\(2x - 10 = 3(x - 10)\\), so \\(x = 20\\).", "The father is 40."],
        answer: "40 years",
      },
      practiceSet: [
        { prompt: "Two ages are in the ratio 4 : 5 and differ by 6 years. Find the older age.", answer: "30 years" },
        { prompt: "Present ages are in the ratio 3 : 5; in 8 years they will be 5 : 7. Find the younger person's present age.", answer: "12 years" },
        { prompt: "A is 12 and B is 20. After how many years will their ages be in the ratio 3 : 4?", answer: "12 years" },
      ],
      pyqExampleId: "bd0a92e1-c5e6-4dbd-8435-864988bed3b5",
      traps: [
        {
          title: "Moving only one age",
          body: "After n years BOTH ages grow by n. Adding n to one person alone changes the gap, which never happens.",
        },
      ],
    },
  ],
};
