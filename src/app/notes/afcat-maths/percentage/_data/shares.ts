import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_SHARES_NOTE: SubtopicNote = {
  subtopicName: "Budgets, Savings and Groups",
  title: "Shares of a Whole: Budgets, Savings and Groups",
  oneLineDefinition:
    "A class, a budget or a salary split into percentage shares: find the rest, take a share of what is left, track savings when income and spending change, and combine groups or overlapping groups.",
  whyItMatters:
    "One AFCAT past-year question is here, from 2017: two groups of students with different scholarship rates. Most of the page is EASY, one share and the rest; the marks go on 'of the remaining', which is a share of a share, and on overlapping groups counted twice.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-parts-of-whole",
      name: "Parts of a whole, and the rest",
      intuition:
        "If 42% of a school study science and 26% commerce, the remaining 32% study arts. Once one part is known as a number, the whole follows, and so does every other part.",
      definition:
        "- The parts add to 100%. The rest is \\(100\\%\\) minus the parts given.\n" +
        "- A part known as a number fixes the whole: whole \\(= \\dfrac{\\text{part} \\times 100}{\\text{its percentage}}\\).\n" +
        "- 'Passed' and 'failed' are complements: if 30% failed, 70% passed.\n" +
        "- Answer the part asked, which is often not the part given.",
      formula: {
        label: "The rest, and the whole",
        latex: "\\text{rest} = 100\\% - \\sum \\text{parts}, \\qquad \\text{whole} = \\dfrac{100 \\times \\text{part}}{p}",
      },
      authoredExample: {
        prompt: "In a school 42% of students take science and 26% commerce. The other 160 take arts. How many students are there?",
        steps: ["Arts is \\(100 - 42 - 26 = 32\\%\\).", "\\(160 \\div 0.32 = 500\\)."],
        answer: "500 students.",
      },
      selfCheckExample: {
        prompt: "In a class, 62.5% are boys and there are 30 girls. How many boys are there?",
        steps: ["Girls are 37.5%, which is three eighths.", "The class is \\(30 \\div 0.375 = 80\\), so boys are \\(80 - 30\\)."],
        answer: "50 boys.",
      },
      practiceSet: [
        { prompt: "30% of 250 students failed. How many passed?", answer: "\\(175\\)" },
        { prompt: "A budget gives 32%, 28% and 16% to three heads. What percentage is left?", answer: "24%" },
        { prompt: "12% of the candidates were selected, which was 300 people. How many appeared?", answer: "2,500" },
      ],
      pyqExampleId: "35469549-9221-4b8d-8a55-a2b9245f487a",
      traps: [
        {
          title: "Answer the part asked",
          body: "With 62.5% boys and 30 girls, the class is 80. If the question asks for boys, 80 is the distractor; the answer is 50.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-budget-savings",
      name: "Income, spending and savings",
      intuition:
        "Savings are what is left of an income after spending. If spending takes 78%, savings are 22%, and a savings figure in rupees gives the income the same way as any other part.",
      definition:
        "- **Savings = income − expenditure.** As percentages, savings % \\(= 100 -\\) spending %.\n" +
        "- Add up all the spending heads first, then take the rest.\n" +
        "- Allowances are added on a base: basic pay ₹40,000 with DA 34% and HRA 16% is \\(40000 \\times 1.5\\).\n" +
        "- Deductions such as tax and PF are taken off the gross: 10% and 6% leave 84%.",
      formula: {
        label: "Savings from spending",
        latex: "\\text{income} = \\dfrac{\\text{savings} \\times 100}{100 - \\text{spending}\\%}",
      },
      authoredExample: {
        prompt: "A man spends 36% of his income on rent, 24% on food and 18% on travel, and saves the rest, ₹5,500. Find his income.",
        steps: ["Spending is \\(36 + 24 + 18 = 78\\%\\), so savings are 22%.", "\\(5500 \\div 0.22 = 25000\\)."],
        answer: "₹25,000.",
      },
      selfCheckExample: {
        prompt: "An officer's basic pay is ₹40,000, with a dearness allowance of 34% and a house rent allowance of 16% of basic. Find the gross pay.",
        steps: ["The allowances add \\(34 + 16 = 50\\%\\) of basic.", "\\(40000 \\times 1.5 = 60000\\)."],
        answer: "₹60,000.",
      },
      practiceSet: [
        { prompt: "A woman saves 15% of her income and spends ₹34,000. Find her income.", answer: "₹40,000" },
        { prompt: "A man earns ₹25,000 and spends 72% of it. How much does he save?", answer: "₹7,000" },
        { prompt: "10% tax and 6% PF are deducted from a salary of ₹50,000. Find the take-home pay.", answer: "₹42,000" },
      ],
      pyqExampleId: "f7ea4a44-6845-440c-9f40-91736842bdd3",
      traps: [
        {
          title: "Divide by the savings share, not the spending",
          body: "If spending is 78% and savings ₹5,500, the income is \\(5500 \\div 0.22\\). Dividing by 0.78 treats the savings as the spending.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-share-of-rest",
      name: "A share of what is left",
      intuition:
        "'25% to his mother and 40% of the rest to his wife' takes the 40% from the 75% left, not from the whole salary. Each step keeps a fraction of what remains, so the fractions multiply.",
      definition:
        "- 'Of the rest' or 'of the remaining' means the next percentage acts on what is left, not on the original.\n" +
        "- What is finally left is the product of the kept fractions: keep 75% and then 60% of that, so \\(0.75 \\times 0.6 = 0.45\\).\n" +
        "- Divide the amount left by that product to get the original.",
      formula: {
        label: "Amount left after shares of the rest",
        latex: "\\text{left} = S\\left(1 - \\tfrac{a}{100}\\right)\\left(1 - \\tfrac{b}{100}\\right)",
      },
      authoredExample: {
        prompt: "A man gives 25% of his salary to his mother and 40% of the rest to his wife. He has ₹13,500 left. Find his salary.",
        steps: ["He keeps 75%, and then 60% of that: \\(0.75 \\times 0.6 = 0.45\\).", "\\(13500 \\div 0.45 = 30000\\)."],
        answer: "₹30,000.",
      },
      selfCheckExample: {
        prompt: "A woman spends 35% of her income on rent and 40% of the remainder on food, and saves ₹9,750. Find her income.",
        steps: ["She keeps \\(0.65 \\times 0.6 = 0.39\\) of her income.", "\\(9750 \\div 0.39 = 25000\\)."],
        answer: "₹25,000.",
      },
      practiceSet: [
        { prompt: "A man donates 10% of his salary and deposits 25% of the rest, and has ₹27,000 left. Find the salary.", answer: "₹40,000" },
        { prompt: "A clerk pays 5% tax and spends 60% of the rest, saving ₹11,400. Find the salary.", answer: "₹30,000" },
      ],
      pyqExampleId: "2977b87c-d49e-4359-a3bb-d848c5b0d4b4",
      traps: [
        {
          title: "'Of the rest' is not of the whole",
          body: "25% and then 40% of the rest leaves 45%, not 35%. Adding the two percentages treats the 40% as a share of the whole salary.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-savings-change",
      name: "When income and spending both change",
      intuition:
        "Savings are a small difference of two big numbers, so they swing much more than either. Take the income as 100, apply each change, and subtract.",
      definition:
        "- Take income 100. Spending \\(s\\%\\) makes spending \\(s\\) and savings \\(100 - s\\).\n" +
        "- Apply the income change and the spending change separately, then subtract to get the new savings.\n" +
        "- Compare the new savings with the old ones for a percentage change, or with the new income for a savings rate.",
      formula: {
        label: "New savings",
        latex: "\\text{new savings} = 100\\left(1 + \\tfrac{a}{100}\\right) - s\\left(1 + \\tfrac{b}{100}\\right)",
      },
      authoredExample: {
        prompt: "A man spends 80% of his income. His income rises by 20% and his spending by 10%. By what percent do his savings rise?",
        steps: [
          "Income 100: spending 80, savings 20.",
          "New income 120, new spending \\(80 \\times 1.1 = 88\\), new savings 32.",
          "Savings rose by 12 on 20.",
        ],
        answer: "60%.",
      },
      selfCheckExample: {
        prompt: "A woman saves 25% of her income. Her expenses rise by 20% while her income stays the same. By what percent do her savings fall?",
        steps: ["Income 100: spending 75, savings 25.", "Spending becomes 90, so savings become 10.", "A fall of 15 on 25."],
        answer: "60%.",
      },
      practiceSet: [
        {
          prompt: "Income ₹20,000 and spending ₹15,000. Income rises 10% and spending 5%. By what percent do savings rise?",
          answer: "25%",
          method: "\\(22000 - 15750 = 6250\\), against 5,000 before.",
        },
        { prompt: "A man saves 10% of his income. His income rises 20% and his savings 50%. What percentage of the new income does he save?", answer: "12.5%" },
      ],
      pyqExampleId: "ebfe046e-355a-46e1-bbb1-89042225b429",
      traps: [
        {
          title: "Savings swing more than income",
          body: "With income up 20% and spending up 10%, savings rise 60%, not 10% or 20%. Work it out on 100; never guess from the two percentages.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-weighted-groups",
      name: "Combining groups with different percentages",
      intuition:
        "If boys and girls are in the ratio 3 : 1 and 40% of boys and 60% of girls play a sport, the overall share is not the average of 40 and 60. The bigger group counts more.",
      definition:
        "- Take the groups as their sizes (or ratio parts). Find each group's count with the property, add, and divide by the total.\n" +
        "- Overall % \\(= \\dfrac{n_1 p_1 + n_2 p_2}{n_1 + n_2}\\): a **weighted average**.\n" +
        "- The answer always lies between the two group percentages, nearer the larger group's.\n" +
        "- Two salaries with different raises work the same way: weight each raise by its salary.",
      formula: {
        label: "Weighted percentage",
        latex: "\\text{overall } \\% = \\dfrac{n_1 p_1 + n_2 p_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "Boys and girls in a school are in the ratio 3 : 1. 40% of the boys and 60% of the girls play a sport. What percentage of all students play?",
        steps: ["Of 4 parts: \\(0.4 \\times 3 + 0.6 \\times 1 = 1.8\\) parts play.", "\\(\\tfrac{1.8}{4} = 45\\%\\)."],
        answer: "45%.",
      },
      selfCheckExample: {
        prompt: "In an office 70% of the staff are men. 10% of the men and 30% of the women wear glasses. What percentage of the staff wear glasses?",
        steps: ["Men: \\(0.1 \\times 70 = 7\\). Women: \\(0.3 \\times 30 = 9\\).", "\\(7 + 9 = 16\\) out of 100."],
        answer: "16%.",
      },
      practiceSet: [
        {
          prompt: "A's salary is half of B's. A gets a 60% raise and B a 15% raise. By what percent do their combined salaries rise?",
          answer: "30%",
          method: "A 1, B 2: \\(1.6 + 2.3 = 3.9\\) against 3.",
        },
        { prompt: "A class has 60 boys and 40 girls. 75% of the boys and 50% of the girls pass. What percentage pass?", answer: "65%" },
      ],
      pyqExampleId: "af2da7c8-58a7-46a0-b1fb-418521d33014",
      traps: [
        {
          title: "Do not average the percentages",
          body: "With boys and girls 3 : 1, 40% and 60% give 45% overall, not 50%. A plain average is right only when the groups are equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-overlaps",
      name: "Overlapping groups: failed in one, both or neither",
      intuition:
        "Students who failed both subjects are counted in both failure figures. Add the two figures, take the overlap off once, and you have everyone who failed at least one.",
      definition:
        "- At least one \\(= A + B - \\text{both}\\).\n" +
        "- Neither \\(= 100\\% - \\) at least one. 'Passed in both' is 'failed in neither'.\n" +
        "- Given 'neither', work backwards: at least one is \\(100\\% -\\) neither, and both \\(= A + B -\\) at least one.\n" +
        "- The same rule works for liking two fruits, reading two papers or owning two things.",
      formula: {
        label: "Two overlapping groups",
        latex: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
      },
      authoredExample: {
        prompt: "In an exam, 40% failed in Hindi, 32% failed in English and 12% failed in both. What percentage passed in both?",
        steps: ["Failed in at least one: \\(40 + 32 - 12 = 60\\%\\).", "Passed in both: \\(100 - 60 = 40\\%\\)."],
        answer: "40%.",
      },
      selfCheckExample: {
        prompt: "In a survey 62% like tea, 48% like coffee and 18% like neither. What percentage like both?",
        steps: ["At least one: \\(100 - 18 = 82\\%\\).", "Both: \\(62 + 48 - 82 = 28\\%\\)."],
        answer: "28%.",
      },
      practiceSet: [
        { prompt: "48% failed in maths, 36% in science and 12% in both. What percentage passed in both?", answer: "28%" },
        { prompt: "In a class of 200, 72% passed Paper I, 64% passed Paper II and 48% passed both. How many failed both?", answer: "24", method: "At least one passed: 88%." },
      ],
      pyqExampleId: "91b183af-79f8-4b80-854d-38d558c6bca7",
      traps: [
        {
          title: "Take the overlap off once",
          body: "40% and 32% failing with 12% in both is 60% failing at least one. Adding 40 and 32 counts the 12% twice.",
        },
      ],
    },
  ],
};
