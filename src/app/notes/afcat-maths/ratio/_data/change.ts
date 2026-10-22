import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Change in Ratio, Ages and Income",
  title: "When a Ratio Changes: Additions, Ages and Incomes",
  oneLineDefinition:
    "Write the old quantities as pk and qk, apply the change, and set the new ratio equal to the one given: for added numbers, ages, percentage rises and savings.",
  whyItMatters:
    "This is where AFCAT asks most: seven of the chapter's twelve past-year questions are on this page, from 2015 to 2017. They are ages, a school roll that grows, and two people's incomes. Each one is a single equation in k, or two equations when incomes and expenditures each have their own ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-add-to-both",
      name: "Adding or subtracting the same number from both terms",
      intuition:
        "Adding the same number to both terms changes the ratio, because each term grows by a different fraction of itself. Write the old quantities as \\(pk\\) and \\(qk\\), apply the change, and set the new ratio equal to the one given.",
      definition:
        "- Old numbers \\(pk\\) and \\(qk\\). After adding \\(x\\) to each: \\(\\dfrac{pk + x}{qk + x} = \\dfrac rs\\). Cross-multiply and solve for \\(k\\).\n" +
        "- When only one term changes (more boys join, the girls stay), the unchanged term fixes \\(k\\) quickly.\n" +
        "- 'What must be added to each term of \\(a : b\\) to make it \\(r : s\\)?' is the same equation with the numbers known and \\(x\\) unknown.\n" +
        "- Check by putting the answer back: the new ratio must come out exactly.",
      formula: {
        label: "A changed ratio",
        latex: "\\dfrac{pk + x}{qk + x} = \\dfrac rs",
      },
      authoredExample: {
        prompt: "Two numbers are in the ratio \\(4 : 7\\). If 6 is added to each, the ratio becomes \\(2 : 3\\). Find the numbers.",
        steps: [
          "\\(\\dfrac{4k + 6}{7k + 6} = \\dfrac 23\\), so \\(3(4k + 6) = 2(7k + 6)\\).",
          "\\(12k + 18 = 14k + 12\\), so \\(k = 3\\).",
          "The numbers are 12 and 21. Check: \\(18 : 27 = 2 : 3\\).",
        ],
        answer: "12 and 21.",
      },
      selfCheckExample: {
        prompt: "What number must be subtracted from each term of \\(15 : 19\\) to make it \\(3 : 4\\)?",
        steps: [
          "\\(\\dfrac{15 - x}{19 - x} = \\dfrac 34\\), so \\(60 - 4x = 57 - 3x\\).",
          "\\(x = 3\\). Check: \\(12 : 16 = 3 : 4\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "Two numbers are in the ratio \\(3 : 5\\). Adding 4 to each makes it \\(2 : 3\\). Find the numbers.", answer: "12 and 20" },
        {
          prompt: "Boys and girls in a club are in the ratio \\(3 : 4\\). When 30 more boys join, the numbers are equal. How many girls are there?",
          answer: "\\(120\\)",
        },
        { prompt: "What must be added to each of 5 and 11 to make their ratio \\(2 : 3\\)?", answer: "\\(7\\)" },
        { prompt: "Two numbers are in the ratio \\(5 : 6\\). Subtracting 3 from each makes it \\(4 : 5\\). Find the numbers.", answer: "15 and 18" },
      ],
      pyqExampleId: "aab15da9-51dc-41c1-988d-af324e33cea5",
      traps: [
        {
          title: "Add to the quantities, not to the ratio",
          body: "If 5 is added to two numbers in the ratio \\(2 : 3\\), the new numbers are \\(2k + 5\\) and \\(3k + 5\\). Writing \\(7 : 8\\) assumes \\(k = 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-ages",
      name: "Age problems with ratios",
      intuition:
        "Everyone ages by the same number of years. So a ratio of ages now becomes a different ratio \\(n\\) years later, and the equation is the one from the last concept: add \\(n\\) to both terms.",
      definition:
        "- Present ages \\(pk\\) and \\(qk\\). After \\(n\\) years they are \\(pk + n\\) and \\(qk + n\\); \\(n\\) years ago, \\(pk - n\\) and \\(qk - n\\).\n" +
        "- The difference between two ages never changes.\n" +
        "- A ratio together with a sum, an average or a product of ages: a sum splits into parts, an average times 2 is the sum, and a product gives \\(k^2\\).\n" +
        "- 'Three times as old' is the ratio \\(3 : 1\\).",
      formula: {
        label: "Ages after n years",
        latex: "\\dfrac{pk + n}{qk + n} = \\dfrac rs",
      },
      authoredExample: {
        prompt: "The ages of A and B are in the ratio \\(5 : 3\\). Six years from now the ratio will be \\(3 : 2\\). Find their present ages.",
        steps: [
          "\\(\\dfrac{5k + 6}{3k + 6} = \\dfrac 32\\), so \\(2(5k + 6) = 3(3k + 6)\\).",
          "\\(10k + 12 = 9k + 18\\), so \\(k = 6\\).",
          "A is 30 and B is 18. Check: \\(36 : 24 = 3 : 2\\).",
        ],
        answer: "30 and 18 years.",
      },
      selfCheckExample: {
        prompt: "A mother is four times as old as her daughter. Five years ago she was nine times as old. Find the daughter's present age.",
        steps: [
          "Daughter \\(d\\), mother \\(4d\\). Five years ago: \\(4d - 5 = 9(d - 5)\\).",
          "\\(4d - 5 = 9d - 45\\), so \\(5d = 40\\).",
        ],
        answer: "8 years.",
      },
      practiceSet: [
        { prompt: "Two ages are in the ratio \\(4 : 5\\) and add up to 54. Find the older age.", answer: "30" },
        { prompt: "Two ages are in the ratio \\(7 : 4\\) and differ by 15 years. Find the younger age.", answer: "20" },
        { prompt: "The average age of two people is 30, and their ages are in the ratio \\(2 : 3\\). Find the older age.", answer: "36" },
        { prompt: "Two ages in the ratio \\(3 : 4\\) have a product of 432. Find them.", answer: "18 and 24" },
      ],
      pyqExampleId: "f3f53d14-2889-4f7d-b276-62ff6d051bd3",
      traps: [
        {
          title: "Both people age",
          body: "Six years later both ages rise by 6. Adding 6 to one age only is the usual slip.",
        },
        {
          title: "'Ago' subtracts",
          body: "'Four years ago' means \\(pk - 4\\) and \\(qk - 4\\). Writing \\(+4\\) by habit still gives a neat number, so check it in the stem's ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-percent-change",
      name: "When each term changes by a percentage",
      intuition:
        "A percentage change multiplies a quantity. If the two terms are multiplied by different factors, the new ratio is the old one multiplied by the ratio of the factors.",
      definition:
        "- \\(p : q\\) raised by \\(a\\%\\) and \\(b\\%\\) becomes \\(p\\left(1 + \\tfrac{a}{100}\\right) : q\\left(1 + \\tfrac{b}{100}\\right)\\).\n" +
        "- A ratio stays the same only if both terms change by the same percentage.\n" +
        "- For savings, take an income of 100: work out the expenditure and the savings, apply each change, and compare.",
      formula: {
        label: "Terms scaled by percentages",
        latex: "p : q \\;\\to\\; p\\left(1 + \\tfrac{a}{100}\\right) : q\\left(1 + \\tfrac{b}{100}\\right)",
      },
      authoredExample: {
        prompt: "Seats in two courses are in the ratio \\(3 : 4\\). They are increased by 20% and 50%. Find the new ratio.",
        steps: ["\\(3 \\times 1.2 = 3.6\\) and \\(4 \\times 1.5 = 6\\).", "\\(3.6 : 6 = 36 : 60 = 3 : 5\\)."],
        answer: "\\(3 : 5\\).",
      },
      selfCheckExample: {
        prompt: "A person spends 80% of their income. Income rises by 10% and spending by 5%. By what percentage do savings rise?",
        steps: [
          "Take income 100: spending 80, savings 20.",
          "Now income 110, spending 84, savings 26.",
          "Savings rose by 6 on 20.",
        ],
        answer: "30%.",
      },
      practiceSet: [
        { prompt: "Two prices are in the ratio \\(2 : 3\\). The first rises by 25% and the second does not change. Find the new ratio.", answer: "\\(5 : 6\\)" },
        { prompt: "Two quantities in the ratio \\(5 : 4\\) both rise by 10%. Find the new ratio.", answer: "\\(5 : 4\\)" },
        {
          prompt: "Income and expenditure are in the ratio \\(5 : 4\\). Income rises by 20% and expenditure by 10%. Find the new ratio.",
          answer: "\\(15 : 11\\)",
        },
      ],
      pyqExampleId: "940e05db-a94a-4eab-ba72-4a75f82cb70b",
      traps: [
        {
          title: "A percentage multiplies the term",
          body: "Raising \\(3 : 4\\) by 20% and 50% gives \\(3.6 : 6\\). Adding the percentages to the terms, \\(23 : 54\\), has no meaning.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-income-savings",
      name: "Income, expenditure and savings",
      intuition:
        "Savings are income minus expenditure. When incomes are given as one ratio and expenditures as another, write the incomes as \\(4x, 3x\\) and the expenditures as \\(5y, 4y\\). The two savings give two equations in \\(x\\) and \\(y\\).",
      definition:
        "- Incomes \\(ax\\) and \\(bx\\), expenditures \\(cy\\) and \\(dy\\): the savings are \\(ax - cy\\) and \\(bx - dy\\).\n" +
        "- Two savings figures give two equations. Multiply so that one letter has the same coefficient, then subtract.\n" +
        "- If both save the same amount \\(S\\), the equations are \\(ax - cy = S\\) and \\(bx - dy = S\\).\n" +
        "- A single ratio of income to expenditure, \\(p : q\\), makes the savings \\(p - q\\) parts.",
      formula: {
        label: "Savings",
        latex: "\\text{savings} = \\text{income} - \\text{expenditure}",
      },
      authoredExample: {
        prompt:
          "The incomes of A and B are in the ratio \\(5 : 4\\) and their expenditures in the ratio \\(3 : 2\\). Each saves ₹2,000. Find their incomes.",
        steps: [
          "\\(5x - 3y = 2000\\) and \\(4x - 2y = 2000\\).",
          "Multiply the first by 2 and the second by 3: \\(10x - 6y = 4000\\) and \\(12x - 6y = 6000\\).",
          "Subtract: \\(2x = 2000\\), so \\(x = 1000\\) (and \\(y = 1000\\)).",
        ],
        answer: "₹5,000 and ₹4,000.",
      },
      selfCheckExample: {
        prompt: "A person's income and expenditure are in the ratio \\(9 : 7\\). They save ₹4,000 a month. Find their income.",
        steps: ["Savings are \\(9 - 7 = 2\\) parts, so one part is ₹2,000.", "Income is 9 parts."],
        answer: "₹18,000.",
      },
      practiceSet: [
        { prompt: "Income and expenditure are in the ratio \\(7 : 5\\), and the income is ₹35,000. Find the savings.", answer: "₹10,000" },
        {
          prompt: "Two people with incomes in the ratio \\(3 : 4\\) save 20% and 25% of their incomes. Find the ratio of their savings.",
          answer: "\\(3 : 5\\)",
        },
        {
          prompt: "Incomes are in the ratio \\(3 : 2\\) and expenditures in the ratio \\(5 : 3\\). Each person saves ₹1,000. Find the incomes.",
          answer: "₹6,000 and ₹4,000",
        },
      ],
      pyqExampleId: "191065ff-0ed1-41d0-a6a3-599f162599b1",
      traps: [
        {
          title: "Two ratios need two letters",
          body: "Incomes \\(4 : 3\\) and expenditures \\(5 : 4\\) need \\(4x, 3x\\) and \\(5y, 4y\\). Using one \\(k\\) for both makes spending a fixed share of income, which the question never says.",
        },
      ],
    },
  ],
};
