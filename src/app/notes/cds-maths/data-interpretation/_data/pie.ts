import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_DI_PIE_NOTE: SubtopicNote = {
  subtopicName: "Pie Charts",
  title: "Pie Charts",
  oneLineDefinition:
    "A pie chart spreads a total over 360°, so a sector's angle is its share of the total: 1% of the whole is 3.6°.",
  whyItMatters:
    "Eighteen PYQs, none HARD. Eight convert between angle, percentage and count; the other ten compare two or three charts with DIFFERENT totals, where a share must be turned into a count before anything is compared.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsdi-pie-angle",
      name: "Angle, share and count",
      intuition:
        "The whole circle is the whole total. A sector's angle out of \\(360^\\circ\\) is the same fraction as its value out of the total, so any one of angle, percentage or count gives the other two.",
      definition:
        "- Share \\(= \\dfrac{\\theta}{360^\\circ}\\); angle \\(= \\text{percentage} \\times 3.6^\\circ\\); count \\(= \\dfrac{\\theta}{360^\\circ} \\times \\text{total}\\).\n" +
        "- Remove a sector and the rest are redrawn to fill \\(360^\\circ\\): scale each by \\(\\dfrac{360}{360 - \\theta_{\\text{removed}}}\\).\n" +
        "- Adding to one item also adds to the total, so every angle changes.\n" +
        "- Slice area and arc length are proportional to the angle; the slice perimeter is not.\n" +
        "- Two pies drawn to compare totals: AREA represents the total, so radii go as the square root: \\(r_1 : r_2 = \\sqrt{T_1} : \\sqrt{T_2}\\).",
      formula: {
        label: "Sector angle",
        latex: "\\theta = \\dfrac{\\text{value}}{\\text{total}} \\times 360^\\circ",
      },
      authoredExample: {
        prompt: "A budget pie gives education \\(72^\\circ\\). What percentage of the budget is it?",
        steps: ["\\(\\dfrac{72}{360} = \\dfrac15\\)."],
        answer: "\\(20\\%\\).",
      },
      selfCheckExample: {
        prompt: "A pie has sectors of \\(120^\\circ\\), \\(120^\\circ\\), \\(80^\\circ\\) and \\(40^\\circ\\). The \\(40^\\circ\\) sector is removed and the chart redrawn. What is the largest angle now?",
        steps: ["Scale by \\(\\dfrac{360}{320} = \\dfrac98\\).", "\\(120 \\times \\dfrac98\\)."],
        answer: "\\(135^\\circ\\).",
      },
      practiceSet: [
        { prompt: "\\(25\\%\\) as an angle?", answer: "\\(90^\\circ\\)" },
        { prompt: "Angles in ratio \\(2 : 3 : 4\\). Smallest?", answer: "\\(80^\\circ\\)" },
        { prompt: "\\(45^\\circ\\) of a total of \\(8000\\). Count?", answer: "\\(1000\\)" },
        { prompt: "Totals \\(4 : 9\\). Radii ratio?", answer: "\\(2 : 3\\)" },
      ],
      pyqExampleId: "23e0b1eb-b976-4924-8e67-0195103b43a9", // 2016 (II) — corporate tax sector of 108°
      traps: [
        {
          title: "The total changes too",
          body:
            "Adding \\(5000\\) to one item of a \\(1{,}20{,}000\\) total makes the new total \\(1{,}25{,}000\\). Keeping the old total in the new angle overstates the change.",
        },
        {
          title: "Radius is not the total",
          body:
            "Pies drawn to compare two totals use AREA. Radii in the ratio \\(16 : 9\\) mean totals in the ratio \\(256 : 81\\), not \\(16 : 9\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsdi-pie-compare",
      name: "Comparing charts with different totals",
      intuition:
        "A \\(27\\%\\) share of \\(4000\\) and a \\(27\\%\\) share of \\(5000\\) are different numbers of people. Before comparing two charts, turn each share into a count with its own chart's total.",
      definition:
        "- Count \\(=\\) share \\(\\times\\) that chart's total. Compare counts, never percentages, across charts.\n" +
        "- Percentage change of an item \\(= \\dfrac{\\text{new count} - \\text{old count}}{\\text{old count}} \\times 100\\).\n" +
        "- An unchanged share with a total that grew by \\(k\\%\\) means the item grew by \\(k\\%\\) too.\n" +
        "- A chart inside a chart (age groups within States): multiply the two shares.",
      formula: {
        label: "Share to count",
        latex: "\\text{count} = \\dfrac{p}{100} \\times \\text{total}",
      },
      authoredExample: {
        prompt: "An item is \\(20\\%\\) of \\(3000\\) staff in one year and \\(16\\%\\) of \\(4500\\) the next. Find its percentage change.",
        steps: ["\\(600\\) then \\(720\\).", "\\(\\dfrac{120}{600} \\times 100\\)."],
        answer: "A \\(20\\%\\) rise, though its share fell.",
      },
      selfCheckExample: {
        prompt: "A State sends \\(30\\%\\) of \\(5\\) lakh migrants, and \\(40\\%\\) of any State's migrants are in age group A. How many from that State are in group A?",
        steps: ["\\(0.3 \\times 0.4 \\times 5\\) lakh."],
        answer: "\\(60{,}000\\).",
      },
      practiceSet: [
        { prompt: "\\(10\\%\\) of \\(2000\\), then \\(10\\%\\) of \\(2400\\). Change?", answer: "\\(+20\\%\\)" },
        { prompt: "\\(25\\%\\) of \\(800\\), then \\(20\\%\\) of \\(1000\\). Change?", answer: "None" },
        { prompt: "Share fell from \\(30\\%\\) to \\(25\\%\\); total rose \\(20\\%\\). Count?", answer: "Unchanged" },
        { prompt: "\\(20\\%\\) of a group is \\(3000\\). The group?", answer: "\\(15{,}000\\)" },
      ],
      pyqExampleId: "c227745d-9e81-41bd-a01a-588c5a5436ad", // 2021 (II) — category E, 27% of 4000 then 27% of 5000
      traps: [
        {
          title: "Same share is not the same size",
          body:
            "When the totals differ, an item holding the same percentage in both charts has grown or shrunk with the total. Comparing percentages across the charts answers the wrong question.",
        },
      ],
    },
  ],
};
