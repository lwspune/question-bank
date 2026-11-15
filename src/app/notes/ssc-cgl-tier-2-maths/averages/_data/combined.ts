import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_AV_COMBINED_NOTE: SubtopicNote = {
  subtopicName: "Combined and Consecutive Averages",
  title: "Combined and Consecutive Averages",
  oneLineDefinition:
    "Two groups combine by adding their totals, never by averaging their averages; a run of evenly spaced numbers averages to the middle of its first and last terms.",
  whyItMatters:
    "6 questions in the Tier II bank, all EASY: two sections or two kinds of student combined, and the average of the first n even or odd numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2avcc-combined",
      name: "Combined averages of two groups",
      intuition:
        "When two groups are put together, their totals add and their counts add. The combined average is the combined total over the combined count, and it sits nearer the average of the bigger group.",
      definition:
        "- Combined average \\(= \\frac{n_1 a_1 + n_2 a_2}{n_1 + n_2}\\).\n" +
        "- If one group's average is r% more than the other's, write them as \\(b\\) and \\(\\left(1 + \\frac{r}{100}\\right)b\\) and solve one equation in b.\n" +
        "- Group sizes given as a percentage of the class: turn them into counts first.",
      formula: {
        label: "Combined average",
        latex: "\\bar{x} = \\frac{n_1 a_1 + n_2 a_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "Section A has 30 students averaging 60 marks and section B has 20 students averaging 70. Find the average of all 50.",
        steps: ["Total \\(= 30 \\times 60 + 20 \\times 70 = 1800 + 1400 = 3200\\).", "Average \\(= 3200 \\div 50 = 64\\)."],
        answer: "64",
      },
      selfCheckExample: {
        prompt: "A class has 40 boys and 20 girls, averaging 66 marks in all. The girls' average is 50% more than the boys'. Find the girls' average.",
        steps: ["\\(40b + 20 \\times 1.5b = 70b = 60 \\times 66 = 3960\\), so \\(b = 56.57\\).", "Girls' average \\(= 1.5b \\approx 84.9\\)."],
        answer: "About 84.9",
      },
      practiceSet: [
        { prompt: "12 workers earn an average of ₹500 a day and 8 earn ₹600. Find the average of all 20.", answer: "₹540" },
        { prompt: "Two groups of 25 average 40 and 50. Find the average of all 50.", answer: "45" },
        { prompt: "A class of 30 averages 72. If 10 of them average 81, find the average of the other 20.", answer: "67.5" },
      ],
      pyqExampleId: "3cdac9f4-3a13-40a1-9e08-799883c9e922",
      traps: [
        {
          title: "Taking the middle of the two averages",
          body: "30 students at 60 and 20 at 70 average 64, not 65. The bigger group pulls the combined average towards its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2avcc-consecutive",
      name: "Averages of consecutive numbers",
      intuition:
        "Numbers that rise by the same step, such as consecutive even numbers, are balanced around their middle. Their average is simply the average of the first and the last.",
      definition:
        "- Any evenly spaced list: average \\(= \\frac{\\text{first} + \\text{last}}{2}\\).\n" +
        "- First n natural numbers: \\(\\frac{n + 1}{2}\\). First n even numbers: \\(n + 1\\). First n odd numbers: n.\n" +
        "- Squares of the first n natural numbers: \\(\\frac{(n + 1)(2n + 1)}{6}\\); cubes: \\(\\frac{n(n + 1)^2}{4}\\).",
      formula: {
        label: "Evenly spaced numbers",
        latex: "\\text{average} = \\frac{\\text{first} + \\text{last}}{2}",
      },
      authoredExample: {
        prompt: "Find the average of the first 60 odd numbers and of the first 60 even numbers.",
        steps: ["The first 60 odd numbers run 1 to 119: average 60.", "The first 60 even numbers run 2 to 120: average 61."],
        answer: "60 and 61",
      },
      selfCheckExample: {
        prompt: "Find the average of all the multiples of 7 from 14 to 98.",
        steps: ["They are evenly spaced from 14 to 98.", "Average \\(= \\frac{14 + 98}{2} = 56\\)."],
        answer: "56",
      },
      practiceSet: [
        { prompt: "Find the average of the first 40 natural numbers.", answer: "20.5" },
        { prompt: "Find the average of the first 75 even numbers.", answer: "76" },
        { prompt: "Five consecutive odd numbers average 33. Find the largest.", answer: "37" },
      ],
      pyqExampleId: "fb6f2b37-f577-44d0-bbb4-b2787fa97aef",
      traps: [
        {
          title: "Giving the first n even numbers an average of n",
          body: "The first n even numbers run from 2 to 2n, so their average is \\(n + 1\\), not n. It is the first n ODD numbers that average n.",
        },
      ],
    },
  ],
};
