import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_SHARES_NOTE: SubtopicNote = {
  subtopicName: "Pie Charts and Shares of a Total",
  title: "Pie Charts and Shares of a Total",
  oneLineDefinition:
    "A pie chart, or a table of percentage shares, splits one total into parts; each part is its share times the total, and 100% of the total is the full 360° of the circle.",
  whyItMatters:
    "Forty-eight questions in the bank, the biggest page of the chapter, and forty-three of them are EASY. Most are a single multiplication, so the time goes on spotting the shortcut: add the shares before multiplying, use 1% of the total, or compare sectors without the total at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdish-value",
      name: "From a percentage share to a value",
      intuition:
        "If a sector is 25% of a ₹80,000 budget, it is a quarter of ₹80,000. When a question asks about two sectors together, or the gap between two sectors, work with their percentages first and multiply by the total only once.",
      definition:
        "- **Value** \\(= \\frac{p}{100} \\times\\) total.\n" +
        "- **Two or more sectors:** add their percentages first (13% and 17% make 30%), then multiply once.\n" +
        "- **Difference of two sectors:** subtract the percentages first (40% minus 8% is 32%), then multiply once.\n" +
        "- **Fast route:** find 1% of the total (₹54,000 gives ₹540) and multiply by the share; 10% and 5% are just as quick.\n" +
        "- **A table of percentages with a different total for each year:** each year's percentage applies to that year's total only. Turn both into numbers before you compare.\n" +
        "- If the question says to neglect the decimal part, round down only at the very end.",
      formula: {
        label: "Value of a share",
        latex: "\\text{Value} = \\frac{p}{100} \\times \\text{Total}",
        symbols: [{ symbol: "p", meaning: "the sector's percentage" }],
      },
      authoredExample: {
        prompt:
          "A family's monthly spending of ₹60,000 is split as shown.\n\n| Head | Rent | Food | Travel | Savings | Others |\n|---|---|---|---|---|---|\n| Share | 30% | 25% | 12% | 18% | 15% |\n\nHow much does the family spend on Rent and Travel together?",
        steps: [
          "Add the shares first: \\(30\\% + 12\\% = 42\\%\\).",
          "Full method: \\(0.42 \\times 60000 = 25200\\).",
          "Fast route: 1% of 60,000 is 600, and \\(42 \\times 600 = 25200\\).",
        ],
        answer: "₹25,200",
      },
      selfCheckExample: {
        prompt:
          "The table shows the share of School 2 among all students in a district.\n\n| Year | Total students | School 2's share |\n|---|---|---|\n| 2021 | 15,000 | 24% |\n| 2022 | 18,000 | 22% |\n\nBy how many students did School 2 grow from 2021 to 2022?",
        steps: [
          "2021: 24% of 15,000 \\(= 3600\\). 2022: 22% of 18,000 \\(= 3960\\).",
          "Growth \\(= 3960 - 3600 = 360\\). The share fell, but the school grew, because the total grew more.",
        ],
        answer: "360 students",
      },
      practiceSet: [
        { prompt: "What is 35% of 4,800?", answer: "1,680" },
        {
          prompt: "A pie chart of 3,600 items gives sector A 18% and sector B 7%. How many more items are in A than in B?",
          answer: "396",
          method: "\\(11\\%\\) of 3,600.",
        },
        { prompt: "Two sectors of a pie chart of 2,40,000 people are 22% and 13%. How many people are in the two together?", answer: "84,000" },
        {
          prompt: "A product's share fell from 25% of 8,000 sales to 20% of 12,000 sales. Did its sales rise or fall, and by how many?",
          answer: "Rose by 400",
          method: "2,000 to 2,400.",
        },
      ],
      pyqExampleId: "09cd1852-23ed-4eb5-bf9c-bd10e2763c3b",
      traps: [
        {
          title: "Comparing percentages across different totals",
          body:
            "22% of 18,000 is more than 24% of 15,000. When each year has its own total, a smaller share can still be a bigger number, so convert to numbers before comparing.",
        },
        {
          title: "Rounding each share before adding",
          body:
            "Add the percentages, multiply once, and round only at the end. Rounding each sector's value first can land one unit away, on a neighbouring option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdish-degrees",
      name: "Degrees and central angles in a pie chart",
      intuition:
        "The whole circle is 360° and stands for 100% of the total, so every 1% is 3.6°. Some charts print degrees instead of percentages; a sector's share is then its angle over 360.",
      definition:
        "- **Angle from a percentage:** \\(\\theta = p \\times 3.6^\\circ\\). 25% is 90°, 10% is 36°, 50% is 180°.\n" +
        "- **Value from an angle:** value \\(= \\frac{\\theta}{360^\\circ} \\times\\) total.\n" +
        "- **Percentage from an angle:** \\(\\frac{\\theta}{360} \\times 100\\), or \\(\\theta \\div 3.6\\).\n" +
        "- **Angle from raw values:** add all the values for the total, then \\(\\theta = \\frac{\\text{value}}{\\text{total}} \\times 360^\\circ\\).\n" +
        "- **Check:** the angles of a chart add to 360°, and the percentages to 100%. If a total is given in the question but you are asked only for an angle, the total is not needed.",
      formula: {
        label: "Pie chart angles",
        latex: "\\text{Value} = \\frac{\\theta}{360^\\circ} \\times \\text{Total} \\qquad \\theta = \\frac{p}{100} \\times 360^\\circ = 3.6p^\\circ",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "the sector's central angle" },
          { symbol: "p", meaning: "the sector's percentage" },
        ],
      },
      authoredExample: {
        prompt: "In a pie chart of 2,000 students, the sector for Commerce has a central angle of 54°. What percentage of the students study Commerce, and how many is that?",
        steps: [
          "Share \\(= \\frac{54}{360} \\times 100 = 15\\%\\). Fast route: \\(54 \\div 3.6 = 15\\).",
          "Students \\(= 15\\%\\) of 2,000 \\(= 300\\).",
        ],
        answer: "15%, that is 300 students",
      },
      selfCheckExample: {
        prompt:
          "A family's expenses are shown in a pie chart drawn from this table.\n\n| Head | Rent | Food | Fees | Others |\n|---|---|---|---|---|\n| Amount (₹) | 18,000 | 12,000 | 9,000 | 6,000 |\n\nWhat is the central angle of the Food sector?",
        steps: [
          "Total \\(= 18000 + 12000 + 9000 + 6000 = 45000\\).",
          "\\(\\theta = \\frac{12000}{45000} \\times 360^\\circ = 96^\\circ\\).",
        ],
        answer: "\\(96^\\circ\\)",
      },
      practiceSet: [
        { prompt: "What is the central angle of a 35% sector?", answer: "\\(126^\\circ\\)" },
        { prompt: "A 90° sector belongs to a pie chart of 1,600 items. How many items does it stand for?", answer: "400" },
        { prompt: "What percentage of the total does a 27° sector show?", answer: "7.5%" },
        { prompt: "The smallest share in a pie chart is 5%. What is its central angle?", answer: "\\(18^\\circ\\)" },
      ],
      pyqExampleId: "c3e23e3c-3343-495b-9329-66d933c87fe4",
      traps: [
        {
          title: "Reading degrees as percentages",
          body:
            "A sector marked 45° is 12.5% of the total, not 45%. Check the chart's heading: \"values are in degrees\" means divide by 360, not 100.",
        },
        {
          title: "Using 100 where 360 belongs",
          body:
            "An angle is a share of 360°. A 15% sector is \\(15 \\times 3.6 = 54^\\circ\\), not \\(15^\\circ\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdish-unitary",
      name: "From one known share to the total or another share",
      intuition:
        "Sometimes the total is hidden and one sector's value is given instead. If 24% is ₹21,600, then 1% is ₹900, and every other sector, or the whole, follows by multiplying.",
      definition:
        "- **1% of the total** \\(= \\frac{V}{p}\\), where the known sector is \\(p\\%\\) and has value \\(V\\).\n" +
        "- **Total** \\(= 100 \\times \\frac{V}{p}\\).\n" +
        "- **Another sector of \\(q\\%\\)** \\(= V \\times \\frac{q}{p}\\); there is no need to find the total first.\n" +
        "- **Several known sectors together:** add their percentages first, then divide.\n" +
        "- The same works in degrees: if a 40° sector stands for 600, each degree stands for 15.",
      formula: {
        label: "From a known share",
        latex: "\\text{Total} = \\frac{V}{p} \\times 100 \\qquad \\text{Other share} = V \\times \\frac{q}{p}",
        symbols: [
          { symbol: "V", meaning: "the known sector's value" },
          { symbol: "p", meaning: "the known sector's percentage" },
          { symbol: "q", meaning: "the wanted sector's percentage" },
        ],
      },
      authoredExample: {
        prompt: "In a pie chart of a family's income, Housing is 24% and comes to ₹21,600. Food is 18%. Find the total income and the amount spent on Food.",
        steps: [
          "1% \\(= 21600 \\div 24 = 900\\).",
          "Total \\(= 100 \\times 900 = 90000\\).",
          "Food \\(= 18 \\times 900 = 16200\\). Directly: \\(21600 \\times \\frac{18}{24} = 16200\\).",
        ],
        answer: "Total ₹90,000; Food ₹16,200",
      },
      selfCheckExample: {
        prompt: "In a pie chart of a district's population, a village with 6% of the people has 4,500 residents. How many live in a village with a 22% share?",
        steps: [
          "\\(4500 \\times \\frac{22}{6} = 16500\\).",
          "Check: 1% is 750, and \\(22 \\times 750 = 16500\\).",
        ],
        answer: "16,500",
      },
      practiceSet: [
        { prompt: "12% of a total is 1,800. What is the total?", answer: "15,000" },
        { prompt: "An 8% share is worth 2,000. What is a 30% share worth?", answer: "7,500" },
        { prompt: "A 40° sector of a pie chart stands for 600 items. How many items does the whole chart stand for?", answer: "5,400" },
        { prompt: "Two sectors of 12% and 9% together come to ₹63,000. What is the total?", answer: "₹3,00,000" },
      ],
      pyqExampleId: "fb05931c-aabf-4ef2-b4be-b5fdbda698f6",
      traps: [
        {
          title: "Dividing by the wanted share instead of the known one",
          body:
            "1% of the total comes from the sector whose value you know. If 24% is ₹21,600, divide by 24, not by the 18% you are asked about.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdish-compare",
      name: "Comparing sectors without working out the total",
      intuition:
        "Every sector of one chart is the same total multiplied by its own share. So when two sectors of one chart are compared (a ratio, a percentage, how many times), the total cancels and the percentages or the degrees answer the question by themselves.",
      definition:
        "- **Within one chart:** sector A : sector B \\(=\\) \\(p_A : p_B\\) \\(=\\) \\(\\theta_A : \\theta_B\\).\n" +
        "- A as a percentage of B, or A more or less than B by a percentage, works the same way on the shares.\n" +
        "- A total printed in the question is often a decoy here: it cancels, so do not compute amounts.\n" +
        "- **Two charts drawn on the same total** (the sources and the uses of one ₹10 lakh fund): the total still cancels, so their percentages compare directly.\n" +
        "- **Two charts with different totals** (1,800 appeared and 800 passed, or two years): the total does not cancel. Turn each sector into a number first.",
      formula: {
        label: "Comparing sectors of one chart",
        latex: "\\frac{\\text{Sector } A}{\\text{Sector } B} = \\frac{p_A}{p_B} = \\frac{\\theta_A}{\\theta_B}",
      },
      authoredExample: {
        prompt: "In a pie chart of a company's spending, Transport has a 75° sector and Food a 120° sector. Transport spending is what percentage of Food spending, and by what percent is it less?",
        steps: [
          "The total cancels: \\(\\frac{75}{120} \\times 100 = 62.5\\%\\).",
          "Less by \\(100\\% - 62.5\\% = 37.5\\%\\). Check: \\(\\frac{120 - 75}{120} = \\frac{45}{120} = 37.5\\%\\).",
        ],
        answer: "62.5%; 37.5% less",
      },
      selfCheckExample: {
        prompt: "In a pie chart of a college's income, Grants are 14% and Fees are 42%. Fees are how many times Grants, and what is the ratio of Grants to Fees?",
        steps: [
          "\\(\\frac{42}{14} = 3\\), so Fees are 3 times Grants.",
          "Grants : Fees \\(= 14 : 42 = 1 : 3\\).",
        ],
        answer: "3 times; \\(1 : 3\\)",
      },
      practiceSet: [
        { prompt: "Two sectors of one pie chart are 24% and 16%. What is the ratio of the first to the second?", answer: "\\(3 : 2\\)" },
        { prompt: "In one pie chart, a 63° sector is what percent more than a 42° sector?", answer: "50%" },
        {
          prompt: "Sectors A, B and C of one pie chart are 30%, 25% and 20%. What is the ratio of the average of A and C to B?",
          answer: "\\(1 : 1\\)",
          method: "The average of 30 and 20 is 25.",
        },
        {
          prompt: "Section C has a 90° sector in a pie chart of 1,600 students who appeared, and is 20% of a pie chart of 600 students who passed. How many students from C failed?",
          answer: "280",
          method: "Appeared 400, passed 120.",
        },
      ],
      pyqExampleId: "ffa2ab6c-9a13-45ca-8668-2344d510ec27",
      traps: [
        {
          title: "Comparing sectors of charts with different totals directly",
          body:
            "A 25% sector of the passed students and a 100° sector of the appeared students cannot be compared as shares, because the two charts stand for different totals. Convert each to a number of students first; only charts on the same total compare share to share.",
        },
      ],
    },
  ],
};
