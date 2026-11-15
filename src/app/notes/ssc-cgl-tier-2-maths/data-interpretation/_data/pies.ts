import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_DI_PIES_NOTE: SubtopicNote = {
  subtopicName: "Pie Charts and Shares of a Total",
  title: "Pie Charts and Shares of a Total",
  oneLineDefinition:
    "A pie chart splits one total into shares of 360 degrees or of 100%; sectors of one pie compare directly, but sectors of two pies with different totals must first become counts.",
  whyItMatters:
    "12 questions in the Tier II bank, 9 EASY and 3 MODERATE. The MODERATE ones put two pies side by side, such as students who appeared and students who passed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2dipc-degrees",
      name: "Degrees, percentages and counts",
      intuition:
        "A pie chart splits one total. Each sector is a share of 360 degrees, or of 100%. Comparing sectors of the same pie needs no total at all; turning a sector into a count needs the total once.",
      definition:
        "- Count \\(= \\frac{\\text{degrees}}{360} \\times\\) total \\(= \\frac{\\text{percent}}{100} \\times\\) total.\n" +
        "- Degrees \\(=\\) percent \\(\\times 3.6\\).\n" +
        "- Within one pie, compare degrees or percents directly: the total cancels out.\n" +
        "- If one sector's count is given, one degree (or 1%) is that count divided by its degrees (or percent).",
      formula: {
        label: "A sector as a count",
        latex: "\\text{count} = \\frac{\\text{degrees}}{360} \\times \\text{total} = \\frac{\\text{percent}}{100} \\times \\text{total}",
      },
      authoredExample: {
        prompt: "A pie chart of 4,500 students shows Science at 96°, Commerce at 120° and Arts at 144°. How many more students take Arts than Science?",
        steps: ["The gap is \\(144^\\circ - 96^\\circ = 48^\\circ\\).", "\\(\\frac{48}{360} \\times 4500 = 600\\)."],
        answer: "600",
      },
      selfCheckExample: {
        prompt: "In a pie chart, a sector of 72° stands for 1,440 people. How many people does a sector of 45° stand for?",
        steps: ["One degree stands for \\(1440 \\div 72 = 20\\) people.", "\\(45 \\times 20 = 900\\)."],
        answer: "900",
      },
      practiceSet: [
        { prompt: "A sector is 35% of a pie. What is its central angle?", answer: "\\(126^\\circ\\)" },
        { prompt: "In a pie chart of 2,400 items, how many items does a 60° sector stand for?", answer: "400" },
        { prompt: "Two sectors of one pie are 81° and 54°. The first is what percentage more than the second?", answer: "50%" },
      ],
      pyqExampleId: "9df8b528-7741-4b5b-89db-1cb7d7f752ce",
      traps: [
        {
          title: "Converting to counts when you need not",
          body: "Within ONE pie, 81° against 54° is already the ratio 3 : 2; finding both counts first only adds work and chances to slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2dipc-two",
      name: "Two pie charts together",
      intuition:
        "When two pies show different totals, such as students who appeared and students who passed, a sector in one cannot be compared with a sector in the other by its angle. Turn each into a count with its own pie's total first.",
      definition:
        "- Convert each sector to a count using ITS OWN pie's total.\n" +
        "- A group's pass rate \\(=\\) its count in the passed pie \\(\\div\\) its count in the appeared pie.\n" +
        "- If a pie gives percentages and the gap between two sectors is given in people, that gap fixes the pie's total.\n" +
        "- A split inside a sector (boys to girls 5 : 6) works on that sector's count.",
      formula: {
        label: "A rate across two pies",
        latex: "\\text{rate} = \\frac{\\text{count in pie 2}}{\\text{count in pie 1}} \\times 100",
      },
      authoredExample: {
        prompt: "Pie 1: 2,000 candidates appeared, and centre X is 90° of it. Pie 2: 1,500 candidates passed, and centre X is 30% of it. What percentage of X's candidates passed?",
        steps: ["Appeared from X: \\(\\frac{90}{360} \\times 2000 = 500\\). Passed from X: \\(0.3 \\times 1500 = 450\\).", "\\(\\frac{450}{500} \\times 100 = 90\\%\\)."],
        answer: "90%",
      },
      selfCheckExample: {
        prompt: "In a pie chart of the males in an office, departments P and Q are 14% and 18%, and Q has 480 more males than P. Find the total number of males.",
        steps: ["The gap is 4% of the total, and it is 480.", "Total \\(= 480 \\div 0.04 = 12000\\)."],
        answer: "12,000",
      },
      practiceSet: [
        { prompt: "Pie 1 (appeared, total 1,800): centre Y is 80°. Pie 2 (passed, total 1,200): centre Y is 25%. How many from Y failed?", answer: "100" },
        { prompt: "Of 360 students who passed from a school, boys and girls are in the ratio 4 : 5. How many girls passed?", answer: "200" },
        { prompt: "A sector is 15% of 2,400 in one pie and 54° of 3,000 in another. Which stands for more, and by how many?", answer: "The second, by 90" },
      ],
      pyqExampleId: "7571d235-83f3-45af-8301-955fcc23ec03",
      traps: [
        {
          title: "Comparing angles across two pies",
          body: "90° of 2,000 is 500, while 90° of 1,500 is 375. Equal angles in pies with different totals stand for different counts.",
        },
      ],
    },
  ],
};
