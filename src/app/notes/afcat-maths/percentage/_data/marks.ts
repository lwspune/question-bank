import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_MARKS_NOTE: SubtopicNote = {
  subtopicName: "Marks and Elections",
  title: "Marks, Pass Marks and Elections",
  oneLineDefinition:
    "Exam scores as percentages, the pass mark from a shortfall or a surplus, maximum marks from two candidates, overall percentages across papers, and winning margins in a vote.",
  whyItMatters:
    "Every question here is one equation once the pass mark or the margin is written down, and most are EASY. The HARD ones give two candidates on either side of the pass mark, or a vote where some people did not vote; the marks go when the margin is taken on the wrong total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-score-percent",
      name: "Scores, questions and negative marking",
      intuition:
        "A score is a part of the maximum marks, so it converts to a percentage like any other part. With negative marking, every wrong answer takes something back, so count right and wrong answers separately.",
      definition:
        "- Percentage scored \\(= \\dfrac{\\text{marks}}{\\text{maximum}} \\times 100\\); maximum \\(= \\dfrac{\\text{marks} \\times 100}{\\text{percentage}}\\).\n" +
        "- Attempted and correct stack: correct \\(=\\) correct share \\(\\times\\) attempted share \\(\\times\\) total questions.\n" +
        "- **Negative marking:** score \\(=\\) (marks per right \\(\\times\\) right) \\(-\\) (penalty \\(\\times\\) wrong). Questions left blank score nothing.\n" +
        "- If every question is attempted, wrong \\(=\\) total \\(-\\) right, so one equation finds the number right.",
      formula: {
        label: "Score with negative marking",
        latex: "\\text{score} = m \\times \\text{right} - p \\times \\text{wrong}",
      },
      authoredExample: {
        prompt: "A test has 50 questions with 4 marks for a right answer and 1 mark off for a wrong one. A student attempts every question and scores 130. How many were right, and what percentage of the maximum did the student score?",
        steps: [
          "With \\(x\\) right, \\(50 - x\\) are wrong: \\(4x - (50 - x) = 130\\).",
          "\\(5x = 180\\), so \\(x = 36\\).",
          "The maximum is \\(4 \\times 50 = 200\\), and \\(\\tfrac{130}{200} = 65\\%\\).",
        ],
        answer: "36 right; 65%.",
      },
      selfCheckExample: {
        prompt: "A student scores 64% and gets 320 marks. What are the maximum marks?",
        steps: ["\\(320 \\div 0.64 = 500\\)."],
        answer: "\\(500\\).",
      },
      practiceSet: [
        { prompt: "A student attempts 60 questions and gets 48 right. Each right answer is 1 mark and each wrong one loses a third of a mark. Find the score.", answer: "\\(44\\)" },
        { prompt: "A paper has 125 questions. A student attempts 64% of them and gets 70% of those right. How many are right?", answer: "\\(56\\)" },
        { prompt: "A student scores 378 out of 450. Find the percentage.", answer: "84%" },
      ],
      pyqExampleId: "24da230b-fb15-43e3-8b39-a3d42ab6cc2b",
      traps: [
        {
          title: "Wrong answers cost twice",
          body: "Moving one answer from right to wrong with +4 and −1 marking drops the score by 5, not 4. That is why the equation becomes \\(5x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-pass-mark",
      name: "The pass mark from one student's score",
      intuition:
        "A student who scores 113 and fails by 22 shows that the pass mark is 135. If the pass mark is 36% of the maximum, the maximum follows.",
      definition:
        "- Failed by \\(f\\) marks: pass mark \\(=\\) score \\(+ f\\). Passed by \\(s\\) marks: pass mark \\(=\\) score \\(- s\\).\n" +
        "- Then maximum \\(= \\dfrac{\\text{pass mark} \\times 100}{\\text{pass percentage}}\\).\n" +
        "- 'Missed a distinction by 45 marks' works the same way, with the distinction cut-off in place of the pass mark.",
      formula: {
        label: "Pass mark",
        latex: "\\text{pass mark} = \\text{score} + \\text{shortfall} = \\dfrac{p}{100} \\times \\text{maximum}",
      },
      authoredExample: {
        prompt: "A candidate needs 36% to pass. She scores 113 marks and fails by 22. Find the maximum marks.",
        steps: ["The pass mark is \\(113 + 22 = 135\\).", "\\(135 \\div 0.36 = 375\\)."],
        answer: "\\(375\\).",
      },
      selfCheckExample: {
        prompt: "35% is needed to pass. A student scores 250 and passes by 40 marks. Find the maximum marks.",
        steps: ["The pass mark is \\(250 - 40 = 210\\).", "\\(210 \\div 0.35 = 600\\)."],
        answer: "\\(600\\).",
      },
      practiceSet: [
        { prompt: "The pass mark is 40% of 650. A student scores 230. By how many marks does he fail?", answer: "\\(30\\)" },
        { prompt: "The pass mark is 33% of 600. A student scores 180. By how many marks does he fail?", answer: "\\(18\\)" },
      ],
      pyqExampleId: "9ec3d9a7-49d7-4dfe-af70-65e44ecba403",
      traps: [
        {
          title: "Failing by means add, passing by means subtract",
          body: "Scored 113 and failed by 22: the pass mark is 135. Subtracting gives 91, and that wrong pass mark leads to a wrong maximum among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-percent-gap",
      name: "Two scores either side of the pass mark",
      intuition:
        "One student at 36% falls 33 short of the pass mark; another at 48% is 15 above it. The gap between them is 12% of the maximum and also \\(33 + 15 = 48\\) marks, so 12% is 48 marks.",
      definition:
        "- Write the pass mark both ways and set them equal: \\(\\tfrac{a}{100}M + f = \\tfrac{b}{100}M - s\\).\n" +
        "- So \\((b - a)\\%\\) of \\(M\\) \\(= f + s\\): add the shortfall and the surplus.\n" +
        "- If both are below the pass mark (both fail), subtract the two shortfalls instead.\n" +
        "- With the pass percentage given and one score as a percentage, the gap between the two percentages is the shortfall.",
      formula: {
        label: "Maximum from two candidates",
        latex: "\\dfrac{b - a}{100}\\,M = f + s",
      },
      authoredExample: {
        prompt: "A student who scores 36% fails by 33 marks. Another who scores 48% passes by 15 marks. Find the maximum marks and the pass mark.",
        steps: [
          "\\(48\\% - 36\\% = 12\\%\\) of the maximum is \\(33 + 15 = 48\\) marks.",
          "The maximum is \\(48 \\div 0.12 = 400\\).",
          "The pass mark is \\(0.36 \\times 400 + 33 = 177\\). Check: \\(0.48 \\times 400 - 15 = 177\\).",
        ],
        answer: "Maximum 400; pass mark 177.",
      },
      selfCheckExample: {
        prompt: "A candidate with 26% fails by 13 marks, and one with 38% passes by 23 marks. Find the maximum marks.",
        steps: ["\\(12\\%\\) of the maximum is \\(13 + 23 = 36\\).", "\\(36 \\div 0.12 = 300\\)."],
        answer: "\\(300\\).",
      },
      practiceSet: [
        { prompt: "A student with 35% fails by 46 marks, and one with 47% passes by 50 marks. Find the maximum marks.", answer: "\\(800\\)" },
        { prompt: "40% is needed to pass. A student with 31% fails by 36 marks. Find the maximum marks.", answer: "\\(400\\)", method: "9% is 36 marks." },
      ],
      pyqExampleId: "3b8a31d0-3652-4071-9822-736a43a8ab19",
      traps: [
        {
          title: "Add the shortfall and the surplus",
          body: "One student 33 below the pass mark and another 15 above it are \\(33 + 15 = 48\\) marks apart. Subtracting, \\(33 - 15\\), is only right when both students fail.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-overall-percent",
      name: "Overall percentage across papers",
      intuition:
        "An overall percentage is total marks over total maximum. When every paper has the same maximum it is the plain average of the percentages; when papers carry different weights or maxima, each counts by its size.",
      definition:
        "- Overall % \\(= \\dfrac{\\text{total marks}}{\\text{total maximum}} \\times 100\\).\n" +
        "- Equal maxima: the average of the percentages.\n" +
        "- Weights given (theory 60%, practical 40%): overall \\(= \\sum (\\text{weight} \\times \\text{percentage})\\).\n" +
        "- A missing paper from an aggregate: aggregate \\(\\times\\) number of papers \\(-\\) the sum of the others (equal maxima).",
      formula: {
        label: "Weighted overall percentage",
        latex: "\\text{overall} = \\dfrac{\\sum w_i p_i}{\\sum w_i}",
      },
      authoredExample: {
        prompt: "A student scores 70% in theory, which carries 60% of the weight, and 95% in practical, which carries 40%. Find the overall percentage.",
        steps: ["\\(0.6 \\times 70 = 42\\) and \\(0.4 \\times 95 = 38\\).", "\\(42 + 38 = 80\\)."],
        answer: "80%.",
      },
      selfCheckExample: {
        prompt: "A student scores 60 out of 100, 72 out of 120 and 45 out of 80. Find the overall percentage.",
        steps: ["Total marks \\(60 + 72 + 45 = 177\\), out of \\(100 + 120 + 80 = 300\\).", "\\(\\tfrac{177}{300} = 59\\%\\)."],
        answer: "59%.",
      },
      practiceSet: [
        { prompt: "The aggregate in four papers of equal maximum is 78%. The first three are 70%, 80% and 76%. Find the fourth.", answer: "86%" },
        { prompt: "A student scores 40 out of 50 and 66 out of 150. Find the overall percentage.", answer: "53%" },
      ],
      pyqExampleId: "813b376b-eba8-4c61-82e2-41e9f3103a10",
      traps: [
        {
          title: "Unequal maxima are not averaged",
          body: "40 out of 50 is 80% and 66 out of 150 is 44%, but the overall is \\(\\tfrac{106}{200} = 53\\%\\), not 62%. The bigger paper counts for more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-elections",
      name: "Elections: shares, margins and invalid votes",
      intuition:
        "With two candidates, a winner on 58% leaves the loser 42%, so the winning margin is 16% of the votes. Turn the margin into a percentage and it gives the total.",
      definition:
        "- Two candidates: margin \\(=\\) winner % \\(-\\) loser % of the **valid** votes.\n" +
        "- Invalid votes come off first: valid \\(=\\) total \\(\\times\\) (1 \\(-\\) invalid share).\n" +
        "- If only some voters vote, the margin is a share of the votes cast, and the votes cast are a share of the electorate: multiply the shares.\n" +
        "- Read whether the question wants the electorate, the votes cast, the valid votes or one candidate's votes.",
      formula: {
        label: "Total from the margin",
        latex: "\\text{valid votes} = \\dfrac{\\text{margin} \\times 100}{\\text{winner}\\% - \\text{loser}\\%}",
      },
      authoredExample: {
        prompt: "In a two-candidate election the winner gets 58% of the valid votes and wins by 1,200 votes. How many valid votes were cast?",
        steps: ["The loser gets 42%, so the margin is 16% of the valid votes.", "\\(1200 \\div 0.16 = 7500\\)."],
        answer: "7,500.",
      },
      selfCheckExample: {
        prompt: "Of 30,000 votes, 10% are invalid. The winner of a two-candidate contest gets 55% of the valid votes. How many votes does the loser get?",
        steps: ["Valid votes: \\(0.9 \\times 30000 = 27000\\).", "The loser gets 45% of them: \\(0.45 \\times 27000 = 12150\\)."],
        answer: "12,150.",
      },
      practiceSet: [
        { prompt: "In a two-candidate election the loser gets 35% of the votes and loses by 1,200. Find the total votes.", answer: "4,000" },
        { prompt: "80% of the voters vote. The winner gets 55% of the votes cast and wins by 1,200. How many voters are on the list?", answer: "15,000", method: "The margin is 10% of 80%, so 8% of the list." },
      ],
      pyqExampleId: "8850fdfd-b706-4be5-a5b1-fa7fc5ba3433",
      traps: [
        {
          title: "The margin is a share of the votes cast",
          body: "If 80% vote and the margin is 10% of the votes cast, it is 8% of the voters' list. Dividing the margin by 0.1 gives the votes cast, not the list.",
        },
      ],
    },
  ],
};
