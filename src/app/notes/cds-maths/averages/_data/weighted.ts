import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AV_WEIGHTED_NOTE: SubtopicNote = {
  subtopicName: "Weighted and Combined Averages",
  title: "Weighted and Combined Averages",
  oneLineDefinition:
    "The average of two groups together is weighted by their sizes, so it always lies between the two group averages, nearer the bigger group.",
  whyItMatters:
    "Nineteen PYQs, one of them HARD. Two questions keep coming back: given the group sizes, find the combined average; or given all three averages, find the ratio of the group sizes. The second has a shortcut — the sizes are in the inverse ratio of the distances to the combined average.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsav-combined",
      name: "The combined average",
      intuition:
        "Pour two groups together and the total is the sum of their totals. Dividing by the combined count gives an average that sits between the two, pulled toward the larger group.",
      definition:
        "- \\(\\bar x = \\dfrac{n_1\\bar x_1 + n_2\\bar x_2}{n_1 + n_2}\\); for more groups, sum every \\(n_i\\bar x_i\\).\n" +
        "- It always lies between the smallest and largest group averages.\n" +
        "- Averaging a RATE (price per pencil, kg per rupee) weights each rate by the quantity bought, not by the number of purchases.\n" +
        "- A month's daily average: count each kind of day (five Sundays in a month starting on a Saturday).",
      formula: {
        label: "Combined average",
        latex: "\\bar x = \\dfrac{n_1\\bar x_1 + n_2\\bar x_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "One class of \\(30\\) averages \\(64\\) marks; another of \\(20\\) averages \\(74\\). Find the combined average.",
        steps: ["Totals \\(1920\\) and \\(1480\\).", "\\(\\dfrac{3400}{50}\\)."],
        answer: "\\(68\\).",
      },
      selfCheckExample: {
        prompt: "A class of \\(40\\) averages \\(60\\) marks; its \\(25\\) boys average \\(66\\). Find the girls' average.",
        steps: ["Total \\(2400\\); boys \\(1650\\); girls \\(750\\) for \\(15\\)."],
        answer: "\\(50\\).",
      },
      practiceSet: [
        { prompt: "\\(10\\) at \\(20\\) and \\(30\\) at \\(40\\). Combined?", answer: "\\(35\\)" },
        { prompt: "Group means \\(p \\le q\\). Where is the combined mean?", answer: "Between \\(p\\) and \\(q\\)" },
        { prompt: "Rs. \\(100\\) buys \\(2\\) kg, then \\(3\\) kg. Average kg per Rs. \\(100\\), buying \\(1\\) kg each time?", answer: "\\(2.4\\)" },
        { prompt: "\\(5\\) at \\(8\\) and \\(5\\) at \\(12\\). Combined?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "3d3d2880-dec0-4957-b291-33538ccdaf8c", // 2017 (II) — 22 students at 140 cm and 28 at 152 cm
      traps: [
        {
          title: "Not the plain average of the averages",
          body:
            "Averages of \\(140\\) and \\(152\\) combine to \\(146\\) only when the groups are equal. With more students in the taller class, the answer lies above \\(146\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsav-ratio",
      name: "Ratio of group sizes",
      intuition:
        "The combined average balances the two groups like a see-saw. The group further from the balance point must be the lighter one, so the sizes are in the inverse ratio of the distances.",
      definition:
        "- \\(n_1 : n_2 = (\\bar x_2 - \\bar x) : (\\bar x - \\bar x_1)\\).\n" +
        "- Combined average exactly midway: the groups are equal.\n" +
        "- Given the ratio and one group's average, the other follows from the same balance.\n" +
        "- Three groups known in pairs: find each pair's ratio, then chain them.",
      formula: {
        label: "Alligation",
        latex: "\\dfrac{n_1}{n_2} = \\dfrac{\\bar x_2 - \\bar x}{\\bar x - \\bar x_1}",
      },
      authoredExample: {
        prompt: "Boys average \\(62\\) kg, girls \\(47\\) kg, the whole class \\(56\\) kg. Find the ratio of boys to girls.",
        steps: ["Distances: boys \\(6\\) above, girls \\(9\\) below.", "Sizes in the inverse ratio: \\(9 : 6\\)."],
        answer: "\\(3 : 2\\).",
      },
      selfCheckExample: {
        prompt: "In a class of \\(60\\), boys average \\(35\\) and girls \\(29\\); the class averages \\(33\\). How many girls are there?",
        steps: ["Boys : girls \\(= (33 - 29) : (35 - 33) = 2 : 1\\)."],
        answer: "\\(20\\).",
      },
      practiceSet: [
        { prompt: "Means \\(10\\) and \\(16\\), combined \\(12\\). Ratio?", answer: "\\(2 : 1\\)" },
        { prompt: "Means \\(20\\) and \\(30\\), combined \\(25\\). Ratio?", answer: "\\(1 : 1\\)" },
        { prompt: "Means \\(4200\\) and \\(3200\\), combined \\(4000\\). Ratio?", answer: "\\(4 : 1\\)" },
        { prompt: "Ratio \\(3 : 1\\), combined \\(p\\), first group \\(p + 1\\). Second?", answer: "\\(p - 3\\)" },
      ],
      pyqExampleId: "26e2a25a-8ac6-4777-855c-007c29027b42", // 2018 (II) — sections average 65 and 70, combined 67
      traps: [
        {
          title: "The ratio is inverted",
          body:
            "The group CLOSER to the combined average is the BIGGER one. With means \\(65\\) and \\(70\\) and a combined \\(67\\), the distances are \\(2\\) and \\(3\\), so the sizes are \\(3 : 2\\), not \\(2 : 3\\).",
        },
      ],
    },
  ],
};
