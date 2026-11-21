import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_MD_DIVISION_NOTE: SubtopicNote = {
  subtopicName: "Long Division",
  title: "Long Division",
  oneLineDefinition:
    "Dividend = divisor × quotient + remainder, and the remainder is always smaller than the divisor; use this to check a division or find a missing digit.",
  whyItMatters:
    "2 of the chapter's 8 questions: 1 EASY and 1 MODERATE. One fills a missing digit inside a worked long division, and one asks how far off an answer is when the wrong number was used to divide.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4mddi-steps",
      name: "Long division and its check",
      intuition:
        "Dividing shares a number into equal groups. Whatever is left over is the remainder. Multiply back and add the remainder, and you must get the number you started with.",
      definition:
        "- **Dividend** is the number divided, **divisor** the number you divide by, **quotient** the answer, **remainder** what is left.\n" +
        "- The remainder is always **smaller than the divisor**.\n" +
        "- **Check**: divisor × quotient + remainder = dividend.\n" +
        "- A **missing digit** in a division can be found from this check.",
      formula: {
        label: "Checking a division",
        latex: "\\text{dividend} = \\text{divisor} \\times \\text{quotient} + \\text{remainder}",
      },
      authoredExample: {
        prompt: "Divide 437 by 6 and check the answer.",
        steps: [
          "43 ÷ 6 = 7, with \\(43 - 42 = 1\\) left.",
          "Bring down 7 to make 17. 17 ÷ 6 = 2, with \\(17 - 12 = 5\\) left.",
          "Quotient 72, remainder 5. Check: \\(6 \\times 72 + 5 = 432 + 5 = 437\\).",
        ],
        answer: "Quotient 72, remainder 5",
      },
      selfCheckExample: {
        prompt: "In a division the divisor is 7, the quotient 15 and the remainder 3. What is the dividend?",
        steps: ["\\(7 \\times 15 + 3 = 105 + 3\\)."],
        answer: "108",
      },
      practiceSet: [
        { prompt: "Divide 95 by 4.", answer: "Quotient 23, remainder 3" },
        { prompt: "In a division the divisor is 9, the quotient 12 and the remainder 5. What is the dividend?", answer: "113" },
        { prompt: "Can the remainder be 8 when you divide by 8?", answer: "No. The remainder must be smaller than the divisor." },
        { prompt: "6□ divided by 5 gives quotient 13 and remainder 2. What digit is □?", answer: "7, because \\(5 \\times 13 + 2 = 67\\)" },
      ],
      pyqExampleId: "9123379c-08ee-4688-a7f4-f2d568923ddf",
      traps: [
        {
          title: "Forgetting the remainder in the check",
          body: "Divisor × quotient alone falls short whenever there is a remainder. Add the remainder before comparing with the dividend.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4mddi-check",
      name: "Dividing by the wrong number",
      intuition:
        "If someone divides by the wrong number, work out both answers, the right one and the wrong one, then take the smaller from the bigger to see how far off they were.",
      definition:
        "- Find the **right answer** with the number the question meant.\n" +
        "- Find the **wrong answer** with the number that was used.\n" +
        "- **Difference** = bigger answer − smaller answer.\n" +
        "- Dividing by a **bigger** number gives a **smaller** answer.",
      authoredExample: {
        prompt: "Anil divided 84 by 12 instead of 4. By how much is his answer wrong?",
        steps: [
          "Right answer: \\(84 \\div 4 = 21\\).",
          "Anil's answer: \\(84 \\div 12 = 7\\).",
          "Difference: \\(21 - 7 = 14\\).",
        ],
        answer: "14",
      },
      selfCheckExample: {
        prompt: "Priya multiplied 15 by 3 instead of 5. By how much is her answer short?",
        steps: ["Right: \\(15 \\times 5 = 75\\). Hers: \\(15 \\times 3 = 45\\). \\(75 - 45 = 30\\)."],
        answer: "30",
      },
      practiceSet: [
        { prompt: "What is the difference between 72 ÷ 8 and 72 ÷ 9?", answer: "1, because 9 − 8 = 1" },
        { prompt: "A number divided by 6 gives 15. What is the number?", answer: "90" },
        { prompt: "Sam divided 60 by 10 instead of 5. What answer should he have got?", answer: "12" },
        { prompt: "Divide 48 by 6 and by 8. Which answer is bigger?", answer: "48 ÷ 6 = 8 is bigger than 48 ÷ 8 = 6" },
      ],
      pyqExampleId: "46548b05-c7b3-4a6e-9056-e014b0d3f1fc",
      traps: [
        {
          title: "Giving one of the answers instead of the difference",
          body: "The question asks by how much the answer is wrong. Both answers usually appear among the options; the difference is what is asked.",
        },
      ],
    },
  ],
};
