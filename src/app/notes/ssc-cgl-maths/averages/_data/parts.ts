import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Parts of a Total",
  title: "Parts of a Total",
  oneLineDefinition:
    "When a list is split into parts with their own averages, the total of all minus the totals of the known parts gives whatever is left, and parts that overlap share a member.",
  whyItMatters:
    "Eight questions in the bank, and seven of them are MODERATE, half of all the MODERATE rows in this chapter. They are long to read but short to solve, since each one is three totals and a subtraction. Read the counts carefully; that is where the marks go.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavpt-leftover",
      name: "The members left after the known parts",
      intuition:
        "The total of the whole list is fixed. Take away the totals of the parts you know, and what remains belongs to the members you have not yet accounted for.",
      definition:
        "- Total of all \\(= n \\times A\\); each known part's total \\(=\\) its count \\(\\times\\) its average.\n" +
        "- **Leftover total \\(=\\) total of all \\(-\\) the known part totals.**\n" +
        "- If one part's average is given as '\\(25\\%\\) more than' another part's, find that average first, then multiply by its count.\n" +
        "- If the leftover members are linked ('the 11th is 6 less than the 13th'), write them all in terms of one unknown, add, and set equal to the leftover total.\n" +
        "- Fast check: deviations from the overall average across all the parts add to 0.",
      formula: {
        label: "Leftover total",
        latex: "\\text{Leftover total} = nA - (n_1A_1 + n_2A_2 + \\cdots)",
      },
      authoredExample: {
        prompt: "The average of 9 numbers is 40. The first four average 35 and the last four average 44. What is the fifth number?",
        steps: [
          "Full method: total \\(= 360\\); first four \\(= 140\\); last four \\(= 176\\).",
          "Fifth number \\(= 360 - 140 - 176 = 44\\).",
          "Fast route with deviations from 40: \\(4(-5) + 4(+4) = -4\\), so the fifth must be \\(+4\\): \\(40 + 4 = 44\\).",
        ],
        answer: "44",
      },
      selfCheckExample: {
        prompt: "The average of 10 numbers is 50. The first four average 45 and the next three average 55. Of the last three, the 8th is 4 more than the 9th and the 10th is 2 less than the 9th. Find the 9th number.",
        steps: [
          "Total \\(= 500\\); first four \\(= 180\\); next three \\(= 165\\); last three \\(= 500 - 180 - 165 = 155\\).",
          "With the 9th \\(= y\\): \\((y + 4) + y + (y - 2) = 3y + 2 = 155\\), so \\(y = 51\\).",
          "Check: \\(55 + 51 + 49 = 155\\).",
        ],
        answer: "51",
      },
      practiceSet: [
        { prompt: "The average of 7 numbers is 20. Three of them average 18 and three others average 24. What is the remaining number?", answer: "14" },
        {
          prompt: "The average of 6 numbers is 30. The first two average 25, and the next two average 20% more than the first two. What is the sum of the last two?",
          answer: "70",
          method: "Total 180; first two 50; next two average 30, total 60; last two \\(180 - 50 - 60 = 70\\).",
        },
        { prompt: "Three numbers add up to 66. The second is 3 more than the first and the third is 6 more than the first. What is the first number?", answer: "19" },
        { prompt: "The average of 5 numbers is 12, and four of them add up to 47. What is the fifth number?", answer: "13" },
      ],
      pyqExampleId: "2fc47cea-1686-48aa-91ef-8d11624019a8",
      traps: [
        {
          title: "Applying a percentage to the wrong quantity",
          body:
            "When a part's average is '25% more' than another's, raise the average by 25% and then multiply by that part's count. Raising the other part's total only works when the two parts have the same count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavpt-overlap",
      name: "Overlapping parts share a member",
      intuition:
        "If 'the first six' and 'the last six' of eleven numbers are both given, the sixth number sits in both parts. Adding the two part totals counts it twice, and the extra over the grand total is that shared number.",
      definition:
        "- **Check the counts first:** \\(6 + 6 = 12\\) but there are only 11 numbers, so one number is shared.\n" +
        "- **Shared member \\(=\\) part 1 total \\(+\\) part 2 total \\(-\\) total of all.**\n" +
        "- Calendars: a 31-day month's first 16 days and last 16 days share day 16.\n" +
        "- Fast route with deviations from the overall average \\(A\\): shared \\(= A + n_1(A_1 - A) + n_2(A_2 - A)\\).",
      formula: {
        label: "Shared member of two overlapping parts",
        latex: "\\text{Shared} = n_1A_1 + n_2A_2 - nA",
      },
      authoredExample: {
        prompt: "The average of 9 numbers is 50. The first five average 48 and the last five average 53. Find the fifth number.",
        steps: [
          "\\(5 + 5 = 10\\), one more than 9, so the fifth number is in both parts.",
          "Fifth \\(= 5 \\times 48 + 5 \\times 53 - 9 \\times 50 = 240 + 265 - 450 = 55\\).",
          "Fast route: \\(50 + 5(-2) + 5(+3) = 55\\).",
        ],
        answer: "55",
      },
      selfCheckExample: {
        prompt: "The average temperature from Monday to Sunday is 30°C. The average from Monday to Thursday is 28°C and from Thursday to Sunday is 33°C. What was the temperature on Thursday?",
        steps: [
          "Monday to Thursday \\(= 4 \\times 28 = 112\\); Thursday to Sunday \\(= 4 \\times 33 = 132\\); the week \\(= 7 \\times 30 = 210\\).",
          "Thursday \\(= 112 + 132 - 210 = 34^\\circ\\)C.",
        ],
        answer: "34°C",
      },
      practiceSet: [
        { prompt: "Seven numbers average 10. The first four average 9 and the last four average 12. What is the fourth number?", answer: "14" },
        { prompt: "In a list of 13 numbers, the first seven and the last seven are averaged separately. How many numbers lie in both parts?", answer: "1" },
        { prompt: "Do the first 15 days and the last 15 days of a 30-day month share a day?", answer: "No: 15 + 15 = 30, which covers the month exactly." },
      ],
      pyqExampleId: "5171cb60-b7e4-4008-a48e-72e614428a8f",
      traps: [
        {
          title: "Missing the shared member",
          body:
            "January has 31 days, so 'the first sixteen days' and 'the last sixteen days' overlap at day 16. Treating them as two separate halves leaves the totals impossible to match.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavpt-tied",
      name: "A member tied to the average of all",
      intuition:
        "If one member is k above the average of everyone, the others together must be k below that average. Shared among the other n − 1, each is k ÷ (n − 1) below, so the average of all is the others' average plus that small amount.",
      definition:
        "- **Full method:** call the average of all \\(a\\). Total \\(na =\\) (others' total) \\(+ (a + k)\\). Solve for \\(a\\).\n" +
        "- **Fast route:** \\(a = \\) others' average \\(+ \\frac{k}{n - 1}\\), and the special member is \\(a + k\\).\n" +
        "- If the member is \\(k\\) **less** than the average of all, subtract instead: \\(a = \\) others' average \\(- \\frac{k}{n - 1}\\).",
      formula: {
        label: "Average of all when one member is tied to it",
        latex: "a = \\bar{x}_{\\text{others}} + \\frac{k}{n - 1}",
        symbols: [
          { symbol: "a", meaning: "average of all n members" },
          { symbol: "k", meaning: "how far the special member is above the average of all" },
          { symbol: "n", meaning: "number of members, the special one included" },
        ],
      },
      authoredExample: {
        prompt: "Ten friends share a bill. Nine of them pay ₹240 each, and the tenth pays ₹45 more than the average of all ten. How much does the tenth pay?",
        steps: [
          "Full method: \\(10a = 9 \\times 240 + a + 45\\), so \\(9a = 2205\\) and \\(a = 245\\).",
          "Fast route: \\(a = 240 + \\frac{45}{9} = 245\\).",
          "The tenth pays \\(245 + 45 = 290\\). Check: \\(2160 + 290 = 2450 = 10 \\times 245\\).",
        ],
        answer: "₹290",
      },
      selfCheckExample: {
        prompt: "In a team of 5, four members average 30 years. The fifth is 8 years older than the average of all five. Find the fifth member's age.",
        steps: [
          "Average of all \\(= 30 + \\frac{8}{4} = 32\\).",
          "Fifth member \\(= 32 + 8 = 40\\). Check: \\(120 + 40 = 160 = 5 \\times 32\\).",
        ],
        answer: "40 years",
      },
      practiceSet: [
        { prompt: "Of 6 people, 5 average 50 kg and the sixth is 10 kg heavier than the average of all 6. What is the average of all 6?", answer: "52 kg" },
        {
          prompt: "Of 4 numbers, 3 average 20 and the fourth is 6 less than the average of all four. Find the fourth number.",
          answer: "12",
          method: "Average of all \\(= 20 - \\frac{6}{3} = 18\\); fourth \\(= 18 - 6 = 12\\).",
        },
        { prompt: "One member of a group of 8 is 14 above the average of all 8. By how much is the average of the other 7 below the average of all 8?", answer: "2" },
      ],
      pyqExampleId: "d33ff397-2dea-45fb-a42b-dd29cf7cd11f",
      traps: [
        {
          title: "Adding k to the others' average",
          body:
            "The special member is k above the average of all, not above the others' average. The average of all is the others' average plus k ÷ (n − 1), and the special member is k above that.",
        },
      ],
    },
  ],
};
