import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_EXTREMES_NOTE: SubtopicNote = {
  subtopicName: "Highest and Lowest Values",
  title: "The Highest, the Lowest, and What Is Left",
  oneLineDefinition:
    "When the largest or smallest values are taken out, the old total minus the new total is their sum; given their difference as well, you can find each one.",
  whyItMatters:
    "Nearly a fifth of this page is HARD. Every question turns on one fact: the values taken out total the old total minus the new one. Marks go when the new total is built with the old count, and when a sum and a difference are added but not halved.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-remove-extremes",
      name: "Removing the highest and the lowest",
      intuition:
        "Taking out the highest and the lowest leaves \\(n - 2\\) values. The total before and the total after differ by exactly the two values removed.",
      definition:
        "- Highest + lowest = old total − new total \\(= nA - (n - 2)A'\\).\n" +
        "- If the removed values are given, the new average \\(= \\dfrac{nA - H - L}{n - 2}\\).\n" +
        "- Removing the top \\(k\\): subtract their total and divide by \\(n - k\\).\n" +
        "- If the removed values average exactly \\(A\\), the rest still average \\(A\\).",
      formula: {
        label: "The two extremes together",
        latex: "H + L = nA - (n - 2)A'",
      },
      authoredExample: {
        prompt: "The average of 20 scores is 55. Without the highest and the lowest, the other 18 average 53. Find the sum of the highest and the lowest.",
        steps: [
          "Old total \\(= 20 \\times 55 = 1100\\).",
          "New total \\(= 18 \\times 53 = 954\\).",
          "Highest + lowest \\(= 1100 - 954 = 146\\).",
        ],
        answer: "\\(146\\).",
      },
      selfCheckExample: {
        prompt: "23 students average 70 marks. The top three scored 99, 96 and 95. Find the average of the other 20.",
        steps: [
          "Total \\(= 23 \\times 70 = 1610\\); the top three total 290.",
          "\\((1610 - 290) \\div 20 = 1320 \\div 20 = 66\\).",
        ],
        answer: "\\(66\\).",
      },
      practiceSet: [
        { prompt: "Twelve numbers average 32. The largest, 52, and the smallest, 12, are removed. Find the new average.", answer: "\\(32\\)" },
        { prompt: "Fifteen values average 44. Without the two extremes the average is 43. Find the sum of the two extremes.", answer: "\\(101\\)" },
        { prompt: "Ten players average 45 runs. The top two scored 90 and 80. Find the average of the other eight.", answer: "\\(35\\)" },
      ],
      pyqExampleId: "2f30f5c8-8a5f-48da-9543-d679f170a118",
      traps: [
        {
          title: "Count what is left",
          body: "Removing the highest and the lowest of 20 leaves 18, so the new total is 18 times the new average, not 20 times.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-one-extreme",
      name: "One extreme alone: the largest or the smallest",
      intuition:
        "'The largest' is only a label. Removing it is removing one value, and its size is the difference between the two totals.",
      definition:
        "- Removed value \\(= nA - (n - 1)A'\\).\n" +
        "- In letters: without the largest \\(L\\), \\(n\\) numbers averaging \\(A\\) become \\(\\dfrac{nA - L}{n - 1}\\). If removing the smallest \\(S\\) raises the average by \\(d\\), then \\(S = A - (n - 1)d\\).\n" +
        "- **Check the label:** the largest must be at least the average of the rest, and the smallest at most that average.",
      formula: {
        label: "One value taken out",
        latex: "x = nA - (n - 1)A'",
      },
      authoredExample: {
        prompt: "The average of 10 numbers is 36. Without the largest, the other 9 average 32. Find the largest.",
        steps: [
          "Totals: \\(10 \\times 36 = 360\\) and \\(9 \\times 32 = 288\\).",
          "The largest is \\(360 - 288 = 72\\). Check: 72 is above 32, as the largest must be.",
        ],
        answer: "\\(72\\).",
      },
      selfCheckExample: {
        prompt: "The average age of 12 people is 30. The youngest, aged 19, is left out. Find the average of the other 11.",
        steps: [
          "Total \\(= 360\\); without the youngest \\(341\\).",
          "\\(341 \\div 11 = 31\\).",
        ],
        answer: "31 years.",
      },
      practiceSet: [
        { prompt: "Eight numbers average 20. Without the smallest they average 22. Find the smallest.", answer: "\\(6\\)" },
        { prompt: "Eleven players average 40 runs. The top scorer made 80. Find the average of the rest.", answer: "\\(36\\)" },
        { prompt: "Seven numbers average 50. Without the largest they average 45. Find the largest.", answer: "\\(80\\)" },
      ],
      pyqExampleId: "da3068b1-bff6-4562-a0ac-f3e04ef302a5",
      traps: [
        {
          title: "Check that it really is the extreme",
          body: "If 6 numbers average 30 and leaving out 'the smallest' gives an average of 26, the number removed is \\(180 - 130 = 50\\). That cannot be the smallest, so re-read the question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-sum-difference",
      name: "Highest and lowest from their sum and difference",
      intuition:
        "The two totals give \\(H + L\\); the question gives \\(H - L\\). Two numbers from their sum and difference: add and halve for the larger, subtract and halve for the smaller.",
      definition:
        "- **Step 1:** \\(H + L = nA - (n - 2)A'\\).\n" +
        "- **Step 2:** \\(H = \\dfrac{\\text{sum} + \\text{difference}}{2}\\) and \\(L = \\dfrac{\\text{sum} - \\text{difference}}{2}\\).\n" +
        "- **Sanity check:** \\(L\\) must not be above the average of the rest and \\(H\\) not below it. Runs and goals must be whole numbers.",
      formula: {
        label: "Two numbers from sum and difference",
        latex: "H = \\dfrac{(H + L) + (H - L)}{2}, \\qquad L = \\dfrac{(H + L) - (H - L)}{2}",
      },
      authoredExample: {
        prompt: "The average of 26 numbers is 48. The largest and the smallest differ by 70. Without them, the other 24 average 46. Find both.",
        steps: [
          "\\(H + L = 26 \\times 48 - 24 \\times 46 = 1248 - 1104 = 144\\).",
          "\\(H = (144 + 70) \\div 2 = 107\\) and \\(L = (144 - 70) \\div 2 = 37\\).",
          "Check: 37 is below 46 and 107 above it.",
        ],
        answer: "Largest 107, smallest 37.",
      },
      selfCheckExample: {
        prompt: "A bowler concedes an average of 5.5 runs an over in 24 overs. His most and least expensive overs differ by 14 runs, and without them he averages 5 runs an over. Find his cheapest over.",
        steps: [
          "\\(H + L = 24 \\times 5.5 - 22 \\times 5 = 132 - 110 = 22\\).",
          "\\(L = (22 - 14) \\div 2 = 4\\) (and \\(H = 18\\)).",
        ],
        answer: "4 runs.",
      },
      practiceSet: [
        { prompt: "Two numbers add up to 90 and differ by 34. Find the larger.", answer: "\\(62\\)" },
        { prompt: "16 values average 50. The extremes differ by 40, and the other 14 average 48. Find the smallest.", answer: "\\(44\\)" },
        { prompt: "Two numbers average 35 and differ by 12. Find the larger.", answer: "\\(41\\)" },
      ],
      pyqExampleId: "99a96dc6-5e17-44bf-8b63-070fbce145c2",
      traps: [
        {
          title: "Halve at the end",
          body: "With \\(H + L = 144\\) and \\(H - L = 70\\), adding gives \\(2H = 214\\), so \\(H = 107\\). Stopping at 214 is the slip.",
        },
      ],
    },
  ],
};
