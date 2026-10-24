import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_DI_CHARTS_NOTE: SubtopicNote = {
  subtopicName: "Pictographs, Bar Graphs and Pie Charts",
  title: "Pictographs, Bar Graphs and Pie Charts",
  oneLineDefinition:
    "A pictograph counts with symbols, a bar graph compares with bar heights, and a pie chart shares out 360° in proportion to the parts of a whole.",
  whyItMatters:
    "Six questions in the bank, all EASY. Two read a pictograph's key, one asks which axis of a bar graph carries the categories, and three work with a pie chart: a share from the chart, a central angle from a percentage, and an amount from an angle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spidich-pictograph",
      name: "Reading a pictograph",
      intuition:
        "A pictograph has a key, such as one symbol for 10 students. Every row is just the key multiplied by the number of symbols, and a part symbol counts for the same part of the key.",
      definition:
        "- Value \\(=\\) number of symbols \\(\\times\\) value of one symbol.\n" +
        "- A half symbol stands for half the key, a quarter symbol for a quarter.\n" +
        "- If the question gives the value of a part symbol, find the value of one full symbol first.",
      formula: {
        label: "Pictograph value",
        latex: "\\text{value} = \\text{number of symbols} \\times \\text{value of one symbol}",
      },
      authoredExample: {
        prompt: "In a pictograph one symbol stands for 8 cars. How many cars do 3 and a quarter symbols stand for?",
        steps: ["3 full symbols: \\(3 \\times 8 = 24\\) cars.", "A quarter symbol: \\(\\frac{8}{4} = 2\\) cars.", "Total: \\(24 + 2 = 26\\) cars."],
        answer: "26 cars",
      },
      selfCheckExample: {
        prompt: "In a pictograph a quarter of a symbol stands for 6 books. How many books do 3 full symbols stand for?",
        steps: ["One full symbol: \\(4 \\times 6 = 24\\) books.", "3 symbols: \\(3 \\times 24 = 72\\) books."],
        answer: "72 books",
      },
      practiceSet: [
        { prompt: "In a pictograph one symbol stands for 12 trees. How many symbols show 60 trees?", answer: "\\(60 \\div 12 = 5\\)" },
        { prompt: "In a pictograph one symbol stands for 100 people. How many people do 4.5 symbols stand for?", answer: "450" },
        { prompt: "In a pictograph half a symbol stands for 15 bags. How many bags does one full symbol stand for?", answer: "30" },
      ],
      pyqExampleId: "9672c942-bb4f-4956-bcb9-9e323b21412f",
      traps: [
        {
          title: "Using the part symbol's value as the key",
          body:
            "If half a symbol is 20 units, a full symbol is 40 units. Multiplying the number of full symbols by 20 gives only half the answer.",
        },
        {
          title: "Counting a half symbol as a full one",
          body:
            "3 and a half symbols with a key of 10 stand for 35, not 40. Each part symbol adds only its part of the key.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spidich-bar",
      name: "The parts of a bar graph",
      intuition:
        "A bar graph puts each item being compared on one axis and a number scale on the other, so the taller bar is the bigger value. Read a bar by lining its top up with the scale.",
      definition:
        "Three facts settle most bar graph questions:\n" +
        "- In the usual (vertical) bar graph the **categories go on the x-axis** and the values on the y-axis.\n" +
        "- The bars have **equal widths and equal gaps**. Bars that touch belong to a histogram.\n" +
        "- A **scale** such as 1 cm for 5 students turns a bar's height into a value.",
      table: {
        columns: ["Part of a bar graph", "What it shows"],
        rows: [
          { cells: ["x-axis (horizontal)", "The categories being compared, such as years, subjects or cities"] },
          { cells: ["y-axis (vertical)", "The values, marked on an even scale"] },
          { cells: ["Height of a bar", "The value of that category"] },
          { cells: ["Gaps between bars", "Equal gaps and equal widths, because the categories are separate"] },
          { cells: ["Scale", "How much one unit of height stands for, such as 1 cm for 5 students"] },
          {
            cells: ["Horizontal bar graph", "The bars lie sideways: categories on the y-axis, values on the x-axis"],
            noteAmber: "Only the sideways graph swaps the axes. The usual bar graph has its categories on the x-axis.",
          },
        ],
        caption: "Value of a bar = its height × what one unit of height stands for.",
      },
      selfCheckExample: {
        prompt: "A bar graph uses a scale of 1 cm for 5 students. A bar is 6 cm tall. How many students does it show?",
        steps: ["Each cm is 5 students.", "\\(6 \\times 5 = 30\\) students."],
        answer: "30 students",
      },
      practiceSet: [
        { prompt: "In a vertical bar graph, on which axis are the values marked?", answer: "The y-axis" },
        { prompt: "Do the bars of a bar graph touch each other?", answer: "No, they have equal gaps between them" },
        { prompt: "In a horizontal bar graph, on which axis are the categories marked?", answer: "The y-axis" },
        { prompt: "A bar graph uses a scale of 1 cm for 20 kg. A bar is 3.5 cm long. How many kg does it show?", answer: "70 kg" },
      ],
      pyqExampleId: "dd44d457-c7d6-4732-bf6c-22d7421fc9b6",
      traps: [
        {
          title: "Mixing up a bar graph and a histogram",
          body:
            "A bar graph compares separate items, so its bars have gaps. A histogram shows class intervals that run on from each other, so its bars touch.",
        },
        {
          title: "Reading the height without the scale",
          body:
            "A bar 4 cm tall on a scale of 1 cm for 25 units shows 100 units, not 4. Multiply the height by the scale.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spidich-pie",
      name: "Pie chart shares, angles and amounts",
      intuition:
        "A pie chart is a whole circle, 360°, cut into slices in proportion to the parts. A part that is a quarter of the whole gets a quarter of the circle, 90°. The same share works in both directions: from a part to its angle, and from an angle back to the part.",
      definition:
        "- **Central angle** \\(= \\dfrac{\\text{part}}{\\text{whole}} \\times 360^\\circ\\).\n" +
        "- From a percentage: angle \\(= \\text{percentage} \\times 3.6^\\circ\\), since \\(1\\% \\text{ of } 360^\\circ = 3.6^\\circ\\).\n" +
        "- From an angle back to the amount: amount \\(= \\dfrac{\\text{angle}}{360^\\circ} \\times \\text{whole}\\).\n" +
        "- The percentages of all the sectors add to 100%, and their angles add to 360°. A missing share is 100% minus the others.",
      formula: {
        label: "Pie chart",
        latex:
          "\\text{central angle} = \\frac{\\text{part}}{\\text{whole}} \\times 360^\\circ \\qquad \\text{amount} = \\frac{\\text{angle}}{360^\\circ} \\times \\text{whole}",
      },
      authoredExample: {
        prompt: "In a class of 40 students, 15 like cricket best. Find the central angle of the cricket sector in a pie chart.",
        steps: ["Share of the class: \\(\\frac{15}{40} = \\frac{3}{8}\\).", "Angle \\(= \\frac{3}{8} \\times 360^\\circ = 135^\\circ\\)."],
        answer: "\\(135^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "A sector of a pie chart has a central angle of 72°. What percentage of the whole does it show?",
        steps: ["\\(\\frac{72}{360} = \\frac{1}{5}\\).", "\\(\\frac{1}{5} = 20\\%\\)."],
        answer: "20%",
      },
      practiceSet: [
        { prompt: "What is the central angle of a sector that shows 25% of a pie chart?", answer: "\\(90^\\circ\\)" },
        {
          prompt: "A family spends ₹24000 a month. On its pie chart, the sector for rent has a central angle of 90°. How much is the rent?",
          answer: "\\(\\frac{90}{360} \\times 24000 = 6000\\), that is ₹6000",
        },
        { prompt: "A pie chart has four sectors. Three of them show 30%, 25% and 15%. What percentage does the fourth show?", answer: "30%" },
        { prompt: "A pie chart of 900 votes has a sector of 120° for one candidate. How many votes did that candidate get?", answer: "\\(\\frac{120}{360} \\times 900 = 300\\)" },
      ],
      pyqExampleId: "19ea3d19-c4b3-4508-b372-8cc5f476f198",
      traps: [
        {
          title: "Taking a percentage as the angle",
          body:
            "A sector showing 30% of the whole has a central angle of \\(30 \\times 3.6^\\circ = 108^\\circ\\), not 30°. Percentages are out of 100, angles out of 360.",
        },
        {
          title: "Dividing an angle by 100",
          body:
            "To turn a central angle into an amount, divide the angle by 360, not by 100. A 45° sector of ₹8000 is \\(\\frac{45}{360} \\times 8000 = 1000\\), that is ₹1000.",
        },
        {
          title: "Forgetting the share that is not printed",
          body:
            "When one sector is marked with a question mark, its share is 100% minus all the others. Find that share first, then take it of the total.",
        },
      ],
    },
  ],
};
