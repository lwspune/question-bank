import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_AV_SUM_NOTE: SubtopicNote = {
  subtopicName: "Sum and Mean",
  title: "Sum and Mean",
  oneLineDefinition:
    "An average is a total shared equally, so turn every average into a total; a value added, removed, raised or replaced is then just a change in that total.",
  whyItMatters:
    "16 questions in the Tier II bank, 15 EASY and 1 MODERATE. Every one starts by multiplying an average by its count to get a total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2avsm-sum",
      name: "Average and total",
      intuition:
        "An average is what each item would get if the total were shared out equally. So the total is the average times the count, and most questions are solved by working with totals rather than averages.",
      definition:
        "- Average \\(= \\frac{\\text{total}}{\\text{count}}\\), so total \\(=\\) average \\(\\times\\) count.\n" +
        "- Values in a ratio with a known average: total \\(=\\) average \\(\\times\\) count, then share it by the ratio.\n" +
        "- Several partial averages: turn each into a total and subtract to find what is left.\n" +
        "- **Shortcut:** pick a round guess and average the differences from it: for 23, 17, 20, 19 and 21, the differences from 20 add to 0, so the average is 20.",
      formula: {
        label: "Average and total",
        latex: "\\text{average} = \\frac{\\text{total}}{\\text{count}}",
      },
      authoredExample: {
        prompt: "The average age of 6 friends is 24 years. The average of the first four is 22 years, and the fifth is 3 years younger than the sixth. Find the sixth friend's age.",
        steps: ["Total \\(= 6 \\times 24 = 144\\); the first four total 88.", "The last two total 56, and differ by 3: they are 26.5 and 29.5."],
        answer: "29.5 years",
      },
      selfCheckExample: {
        prompt: "The average of three numbers is 40, and they are in the ratio 3 : 4 : 5. Find the largest.",
        steps: ["Total \\(= 120\\); 12 parts, so one part is 10.", "Largest \\(= 5 \\times 10 = 50\\)."],
        answer: "50",
      },
      practiceSet: [
        { prompt: "Find the average of 34, 38, 41, 36 and 46.", answer: "39" },
        { prompt: "The average of 12, 18 and x is 20. Find x.", answer: "30" },
        { prompt: "Find the average of the squares of the first four natural numbers.", answer: "7.5" },
      ],
      pyqExampleId: "a593786c-a4d8-4dc0-b01b-b8a5aa45259a",
      traps: [
        {
          title: "Averaging the averages",
          body: "Groups of different sizes do not average to the mean of their averages. Four people averaging 22 and two averaging 28 average 24, not 25: work with the totals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2avsm-change",
      name: "Changing one value",
      intuition:
        "When a value joins, leaves, is raised or is replaced, only the total changes, by a known amount. The average then moves by that change shared over the count.",
      definition:
        "- Change in average \\(= \\frac{\\text{change in total}}{\\text{count}}\\).\n" +
        "- Replacing one value: new value \\(=\\) old value \\(+\\) count \\(\\times\\) rise in average.\n" +
        "- Raising some values by different amounts: add the changes, weighted by how many values get each one.\n" +
        "- A value that is k more than the NEW average: write the new average as a and solve one equation.\n" +
        "- Two overlapping groups (first 13 and last 13 of 25): the shared middle value is counted twice.",
      formula: {
        label: "A change in the total",
        latex: "\\Delta\\,\\text{average} = \\frac{\\Delta\\,\\text{total}}{\\text{count}}",
      },
      authoredExample: {
        prompt: "The average weight of 8 boys rises by 1.5 kg when one boy weighing 52 kg is replaced by a new boy. How heavy is the new boy?",
        steps: ["The total rises by \\(8 \\times 1.5 = 12\\) kg.", "The new boy weighs \\(52 + 12 = 64\\) kg."],
        answer: "64 kg",
      },
      selfCheckExample: {
        prompt: "10 numbers average 30. When an 11th number is added, the average becomes 32. Find the 11th number.",
        steps: ["Totals: 300 before, \\(11 \\times 32 = 352\\) after.", "The 11th number is 52."],
        answer: "52",
      },
      practiceSet: [
        { prompt: "The average of 15 numbers is 40. Two numbers, 30 and 35, are removed. Find the new average, to two decimal places.", answer: "41.15" },
        { prompt: "Every one of 20 numbers is increased by 3. What happens to the average?", answer: "It rises by 3" },
        { prompt: "A batter's average over 9 innings is 40. What must the 10th innings score be to raise the average to 42?", answer: "60" },
      ],
      pyqExampleId: "040668c2-c9a2-468c-866f-9da93bc281cd",
      traps: [
        {
          title: "Adding the rise in average to the old value only once",
          body: "A rise of 1.5 kg in the average of 8 boys is a rise of 12 kg in the total. The new boy is 12 kg heavier than the one he replaced, not 1.5 kg.",
        },
      ],
    },
  ],
};
