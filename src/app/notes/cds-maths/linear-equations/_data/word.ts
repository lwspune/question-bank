import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LE_WORD_NOTE: SubtopicNote = {
  subtopicName: "Word Problems and Applications",
  title: "Word Problems",
  oneLineDefinition:
    "Name each unknown, turn each sentence into one equation, and solve; the arithmetic is simple once the equations are right.",
  whyItMatters:
    "Thirteen PYQs, two of them HARD. Numbers and their digits, fractions, pay with fines, bills with two parts, rows of chairs: each is two sentences and two unknowns. The skill is translating 'is 9 more than four times' exactly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsle-word",
      name: "From sentences to equations",
      intuition:
        "Every condition in the story is one equation. Choose the unknowns so the equations are as simple as possible — often the quantity the question asks for.",
      definition:
        "- Two-digit number with digits \\(a, b\\): \\(10a + b\\); digits reversed: \\(10b + a\\).\n" +
        "- 'Divided by \\(S\\) gives quotient \\(q\\), remainder \\(r\\)': \\(N = qS + r\\), with \\(r < S\\).\n" +
        "- Paid for days worked, fined for days absent: \\(pw - f(D - w) = \\text{total}\\).\n" +
        "- A bill 'partly proportional to rooms, partly to units': \\(pm + qn\\).\n" +
        "- A fixed total rearranged (rows × chairs, pages × lines): the product stays the same.",
      formula: {
        label: "Reversed digits",
        latex: "(10a + b) - (10b + a) = 9(a - b)",
      },
      authoredExample: {
        prompt: "A worker is paid Rs. \\(400\\) a day worked and fined Rs. \\(50\\) a day absent. Over \\(25\\) days he receives Rs. \\(7750\\). How many days did he work?",
        steps: ["\\(400w - 50(25 - w) = 7750\\).", "\\(450w = 9000\\)."],
        answer: "\\(20\\) days.",
      },
      selfCheckExample: {
        prompt: "What must be added to both the numerator and denominator of \\(\\dfrac{5}{9}\\) to make it \\(\\dfrac23\\)?",
        steps: ["\\(\\dfrac{5 + x}{9 + x} = \\dfrac23\\): \\(15 + 3x = 18 + 2x\\)."],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "A number times \\(4\\) is \\(45\\) more than the number divided by \\(4\\). The number?", answer: "\\(12\\)" },
        { prompt: "Digits add to \\(9\\); reversing adds \\(27\\). The number?", answer: "\\(36\\)" },
        { prompt: "\\(90\\) shared so \\(A = B + 10 = C - 10\\). \\(B\\)?", answer: "\\(20\\)" },
        { prompt: "\\(n\\) lines on \\(40\\) pages \\(=\\) \\((n - 4)\\) lines on \\(50\\) pages. \\(n\\)?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "9ee31b5f-7594-4b68-9478-d5f7fccd0dda", // 2021 (II) — Rs. 500 a day worked, Rs. 100 fine a day absent
      traps: [
        {
          title: "The remainder must be smaller than the divisor",
          body:
            "'Quotient \\(6\\), remainder \\(6\\)' only works when the divisor exceeds \\(6\\). Check each remainder against its divisor before accepting a solution.",
        },
      ],
    },
  ],
};
