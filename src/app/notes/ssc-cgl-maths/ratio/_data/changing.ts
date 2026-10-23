import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_CHANGING_NOTE: SubtopicNote = {
  subtopicName: "Combining and Changing Ratios",
  title: "Combining and Changing Ratios",
  oneLineDefinition:
    "Two ratios that share a term join into one once that term is made equal in both, and a ratio that changes after items are added or removed gives one equation for the ratio unit.",
  whyItMatters:
    "Nineteen questions in the bank, sixteen of them EASY: ten join two, three or four ratios through a common term and nine change a ratio by adding or removing items. Both have a fast route that skips the algebra, and both need care about which term is shared or unchanged.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrach-chain",
      name: "Joining ratios through a common term",
      intuition:
        "A : B = 4 : 5 and B : C = 3 : 7 describe B in two different units, 5 parts in one and 3 parts in the other. Before the ratios can be joined, B must be counted in the same unit in both, which means scaling each ratio until the B terms match.",
      definition:
        "- **Make the shared term equal:** scale A : B and B : C so that B becomes the LCM of its two terms, then read A : B : C.\n" +
        "- **Fast route (the N rule):** for A : B = \\(a_1 : b_1\\) and B : C = \\(b_2 : c_2\\), A : B : C = \\(a_1b_2 : b_1b_2 : b_1c_2\\). Reduce at the end.\n" +
        "- **A longer chain:** join two at a time, or for only the end terms multiply the fractions, \\(\\frac{A}{D} = \\frac{A}{B} \\times \\frac{B}{C} \\times \\frac{C}{D}\\).\n" +
        "- Reduce each given ratio first (6 : 8 is 3 : 4). The numbers stay small and the answer is already in lowest terms more often.",
      formula: {
        label: "Joining ratios",
        latex: "A : B : C = a_1b_2 : b_1b_2 : b_1c_2 \\qquad \\frac{A}{D} = \\frac{A}{B} \\times \\frac{B}{C} \\times \\frac{C}{D}",
        symbols: [
          { symbol: "a_1 : b_1", meaning: "the ratio A : B" },
          { symbol: "b_2 : c_2", meaning: "the ratio B : C" },
        ],
      },
      authoredExample: {
        prompt: "If P : Q = 4 : 5 and Q : R = 3 : 7, find P : Q : R.",
        steps: [
          "The LCM of the two Q terms, 5 and 3, is 15. P : Q = 12 : 15 and Q : R = 15 : 35.",
          "So P : Q : R = 12 : 15 : 35.",
          "N rule: \\(4 \\times 3 : 5 \\times 3 : 5 \\times 7 = 12 : 15 : 35\\).",
        ],
        answer: "12 : 15 : 35",
      },
      selfCheckExample: {
        prompt: "If A : B = 9 : 8, B : C = 6 : 11 and C : D = 11 : 12, find A : D.",
        steps: [
          "\\(\\frac{A}{D} = \\frac{9}{8} \\times \\frac{6}{11} \\times \\frac{11}{12} = \\frac{594}{1056} = \\frac{9}{16}\\).",
          "Check by joining: make B = 24, so A : B : C = 27 : 24 : 44; then C = 44 makes D = 48, giving A : B : C : D = 27 : 24 : 44 : 48.",
        ],
        answer: "9 : 16",
      },
      practiceSet: [
        { prompt: "If x : y = 5 : 2 and y : z = 3 : 4, find x : y : z.", answer: "15 : 6 : 8" },
        { prompt: "If A : B = 9 : 10 and B : C = 5 : 6, find A : C.", answer: "3 : 4" },
        { prompt: "If M : N = 2 : 7 and N : O = 7 : 3, find M : N : O.", answer: "2 : 7 : 3" },
      ],
      pyqExampleId: "337068ed-230b-42ca-bf40-0bae48768ec5",
      traps: [
        {
          title: "Writing the ratios side by side",
          body:
            "A : B = 3 : 4 and B : C = 5 : 6 do not give A : B : C = 3 : 4 : 6. B is 4 parts in one and 5 in the other; matched at 20, the answer is 15 : 20 : 24.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrach-change",
      name: "A ratio after items are added or removed",
      intuition:
        "Before the change the quantities are ak and bk for one unknown unit k. After the change they are known expressions in k, and their ratio is given, so one equation finds k. If one quantity does not change at all, it is a fixed ruler, and the other quantity's change can be read off it in parts.",
      definition:
        "- **Full method:** write the quantities as \\(ak\\) and \\(bk\\), apply the change, and set \\(\\frac{ak + x}{bk + y} = \\frac{m}{n}\\). Cross-multiply and solve for k.\n" +
        "- **Fast route (the unchanged term):** if one quantity does not change, scale the old and new ratios so its term is the same in both. Then the change in the other term, in parts, is the number of items added or removed.\n" +
        "- The fast route is safe only after that scaling. Reading parts straight off two ratios whose unchanged terms differ gives a wrong unit.\n" +
        "- **The same number added to both** (or taken from both): \\(\\frac{ak + x}{bk + x} = \\frac{m}{n}\\), then the full method.\n" +
        "- Read the question again before answering: it may ask for the number before the change, after it, or the total.",
      formula: {
        label: "Changed ratio",
        latex: "\\frac{ak + x}{bk + y} = \\frac{m}{n}",
        symbols: [
          { symbol: "a : b", meaning: "the ratio before the change" },
          { symbol: "x, y", meaning: "the numbers added (negative if removed)" },
          { symbol: "m : n", meaning: "the ratio after the change" },
        ],
      },
      authoredExample: {
        prompt: "Cars and bikes in a car park are in the ratio 3 : 5. After 12 more cars arrive, the ratio becomes 9 : 10. How many bikes are there?",
        steps: [
          "Full method: \\(\\frac{3k + 12}{5k} = \\frac{9}{10}\\), so \\(30k + 120 = 45k\\) and \\(k = 8\\). Bikes \\(= 5k = 40\\).",
          "Fast route: the bikes do not change. Write 3 : 5 as 6 : 10 so the bike term matches 9 : 10.",
          "Cars go from 6 parts to 9 parts. Those 3 parts are the 12 new cars, so 1 part is 4 and the bikes are \\(10 \\times 4 = 40\\).",
          "Check: 24 cars become 36, and \\(36 : 40 = 9 : 10\\).",
        ],
        answer: "40",
      },
      selfCheckExample: {
        prompt: "Two numbers are in the ratio 3 : 7. If 8 is subtracted from each, the ratio becomes 1 : 3. Find the two numbers.",
        steps: [
          "\\(\\frac{3k - 8}{7k - 8} = \\frac{1}{3}\\), so \\(9k - 24 = 7k - 8\\) and \\(k = 8\\).",
          "The numbers are 24 and 56. Check: \\(16 : 48 = 1 : 3\\).",
        ],
        answer: "24 and 56",
      },
      practiceSet: [
        {
          prompt: "Red and white beads are in the ratio 2 : 3. When 10 red beads are added, the ratio becomes 1 : 1. How many white beads are there?",
          answer: "30",
          method: "White is 3 parts in both; red goes from 2 parts to 3, so 1 part is 10.",
        },
        {
          prompt: "Teachers and students at a camp are in the ratio 1 : 8. When 6 more teachers join, the ratio becomes 1 : 6. How many students are there?",
          answer: "144",
          method: "Match the students at 24: 3 : 24 becomes 4 : 24, so 1 part is 6.",
        },
        { prompt: "A box has 30 blue and 20 green balls. 6 blue balls are taken out. What is the new ratio of blue to green?", answer: "6 : 5" },
      ],
      pyqExampleId: "55c2bcc9-0bd5-4092-b1da-8e2f9c73d8ca",
      traps: [
        {
          title: "Reading parts before matching the unchanged term",
          body:
            "Girls and boys are 2 : 3, and after some girls join they are 3 : 4. The boys did not change, but their terms are 3 and 4, so first write 8 : 12 and 9 : 12. Only then does the change in parts (8 to 9) give the number who joined.",
        },
        {
          title: "Answering for the wrong moment",
          body:
            "Many stems ask for the number BEFORE the change, but the equation is solved for the unit k. Finish by working out the quantity the question names, then check it against both ratios.",
        },
      ],
    },
  ],
};
