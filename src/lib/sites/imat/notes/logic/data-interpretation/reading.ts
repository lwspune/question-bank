import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DAT_READING_NOTE: SubtopicNote = {
  subtopicName: "Reading Tables and Charts",
  title: "Reading Tables, Bar Charts, Line Graphs and Pie Charts",
  oneLineDefinition:
    "Before calculating, read the title, the units and the headings; then pick out only the rows and columns the question needs.",
  whyItMatters:
    "Every item in this chapter starts by reading a table or chart. About a quarter of the past items, all from the Cambridge years, showed a chart or asked which chart matches a table or a story (a pie chart of seats, a distance-time graph of a journey).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dat-tables",
      name: "Reading a table: rows, columns, units and totals",
      intuition:
        "A table answers many questions, and each IMAT item asks only one. Read the headings and the units first, so you know what one cell means. Then find the rows and columns the question names, and combine only those. Most errors are a wrong row, a missed unit (thousands, millions, per 100 g) or an answer to a question that was not asked.",
      definition:
        "- Read the **title**, the **row and column headings** and the **units** (including notes such as \"millions\" or \"per 100 g\") before any number.\n" +
        "- A **row total** adds across; a **column total** adds down. Check a given total if a question depends on it.\n" +
        "- When each cell must be **weighted** (price × quantity, rate × hours), make one small column of products before comparing.\n" +
        "- The largest raw count is not always the largest value: compare the quantity the question asks about.",
      formula: {
        label: "Weighted total from a table",
        latex: "\\text{total} = \\sum (\\text{quantity} \\times \\text{rate})",
        symbols: [
          { symbol: "\\(\\text{quantity}\\)", meaning: "the count in each cell (hours, items, classes)" },
          { symbol: "\\(\\text{rate}\\)", meaning: "the value of one unit of that cell (price, pay per hour)" },
        ],
      },
      authoredExample: {
        prompt:
          "A clinic records how many patients each department sees on each weekday:\n\n" +
          "| Department | Mon | Tue | Wed | Thu | Fri |\n" +
          "|---|---|---|---|---|---|\n" +
          "| Cardiology | 18 | 22 | 15 | 20 | 25 |\n" +
          "| Dermatology | 12 | 9 | 14 | 11 | 10 |\n" +
          "| Paediatrics | 30 | 26 | 28 | 33 | 31 |\n\n" +
          "Which day had the most patients in total, and what percentage of the week's patients were seen in Paediatrics?",
        steps: [
          "Add each column: Mon 60, Tue 57, Wed 57, Thu 64, Fri 66. Friday is the busiest day.",
          "Paediatrics row: \\(30 + 26 + 28 + 33 + 31 = 148\\). Whole week: \\(60 + 57 + 57 + 64 + 66 = 304\\).",
          "Share: \\(\\dfrac{148}{304} \\approx 0.487\\), so about 49%.",
        ],
        answer: "Friday; about 49%",
      },
      selfCheckExample: {
        prompt:
          "A gym charges members €8 for a yoga class, €10 for a spin class and €12 for a boxing class. The table shows how many classes five members took last month:\n\n" +
          "| Member | Yoga | Spin | Boxing |\n" +
          "|---|---|---|---|\n" +
          "| Ines | 5 | 3 | 2 |\n" +
          "| Jonas | 2 | 4 | 4 |\n" +
          "| Kai | 6 | 4 | 1 |\n" +
          "| Lea | 3 | 3 | 4 |\n" +
          "| Milo | 4 | 5 | 1 |\n\n" +
          "Who spent the most?",
        options: ["Kai", "Ines", "Lea", "Jonas", "Milo"],
        steps: [
          "Ines: \\(40 + 30 + 24 = 94\\). Jonas: \\(16 + 40 + 48 = 104\\). Kai: \\(48 + 40 + 12 = 100\\).",
          "Lea: \\(24 + 30 + 48 = 102\\). Milo: \\(32 + 50 + 12 = 94\\).",
          "Jonas spent €104, the most. Kai took the most classes (11), which makes option A tempting, but many of them were the cheapest kind.",
        ],
        answer: "(D) Jonas",
      },
      practiceSet: [
        { prompt: "A column is headed \"Energy (millions of kWh)\" and a cell reads 4.2. How many kWh is that?", answer: "4,200,000 kWh", method: "Apply the unit in the heading" },
        { prompt: "A worker is paid €10 an hour for 30 hours and €15 an hour for 5 overtime hours. What is the total pay?", answer: "€375", method: "\\(300 + 75\\)" },
        { prompt: "A nutrition table gives 12 g of protein per 100 g. How much protein is in a 250 g portion?", answer: "30 g", method: "\\(12 \\times 2.5\\)" },
      ],
      traps: [
        {
          title: "The most items is not the most money",
          body: "When cells have different prices or rates, the row with the largest count can still have the smallest value. Multiply each count by its rate before comparing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dat-charts",
      name: "Bar charts, line graphs and pie charts",
      intuition:
        "Each kind of chart shows one thing well. A bar chart compares sizes, a line graph shows how something changes over time, and a pie chart shows how a whole is shared out. To match a table to a chart, check the order of the values, any zero or equal values, and the rough ratios, rather than drawing the chart yourself.",
      definition:
        "- **Bar chart**: compare bar heights, but read the scale. If the vertical axis does not start at zero, the bars exaggerate the differences.\n" +
        "- **Line graph**: the **slope** is the rate of change. Steeper means faster change; a flat section means no change.\n" +
        "- **Distance-time graph**: the slope is the speed. A flat section is a stop; a line going back down is the return journey.\n" +
        "- **Pie chart**: each sector's angle is its share of 360°. Equal values give equal sectors; a value twice as big gives an angle twice as big.\n" +
        "- **Matching a chart to data**: check the largest and smallest values, any equal pairs and any zeros first. Usually only one option survives.",
      formula: {
        label: "Angle of a pie-chart sector",
        latex: "\\text{angle} = \\frac{\\text{value}}{\\text{total}} \\times 360^\\circ",
        symbols: [
          { symbol: "\\(\\text{value}\\)", meaning: "the size of one category" },
          { symbol: "\\(\\text{total}\\)", meaning: "the sum of all categories" },
        ],
      },
      authoredExample: {
        prompt:
          "In a survey of 72 students about how they get to school, 18 walk, 30 take the bus, 12 come by car and 12 cycle. Find the angles of a pie chart of these results.",
        steps: [
          "Each student is worth \\(360^\\circ / 72 = 5^\\circ\\).",
          "Walk \\(18 \\times 5 = 90^\\circ\\), bus \\(30 \\times 5 = 150^\\circ\\), car \\(60^\\circ\\), cycle \\(60^\\circ\\).",
          "Check: \\(90 + 150 + 60 + 60 = 360\\). Car and cycle have equal sectors, and the walk sector is a right angle: features to look for in the options.",
        ],
        answer: "90°, 150°, 60° and 60°",
      },
      selfCheckExample: {
        prompt:
          "A pie chart shows how a hospital spends its €8 million budget. Staff take 162°, drugs 90° and equipment 54°; the rest is shown as \"other\". How much is spent on \"other\"?",
        options: ["€1.2 million", "€0.54 million", "€2.0 million", "€3.6 million", "€0.15 million"],
        steps: [
          "\"Other\": \\(360 - 162 - 90 - 54 = 54^\\circ\\).",
          "Its share: \\(\\dfrac{54}{360} = 0.15\\), so \\(0.15 \\times 8 = 1.2\\) million euros.",
          "Option E stops at the fraction. Option C is the drugs budget and option D the staff budget.",
        ],
        answer: "(A) €1.2 million",
      },
      practiceSet: [
        { prompt: "On a distance-time graph, what does a horizontal section mean?", answer: "The object is not moving", method: "Zero slope means zero speed" },
        { prompt: "A line graph shows a temperature rising from 12 °C at 08:00 to 21 °C at 11:00. What is the average rate of rise?", answer: "3 °C per hour", method: "\\(9 / 3\\)" },
        { prompt: "A pie chart represents 240 people. How many people does a 45° sector represent?", answer: "30", method: "\\(\\dfrac{45}{360} \\times 240\\)" },
        { prompt: "Two bars show 40 and 50 on an axis that starts at 30. The second bar looks twice as tall. Is the value twice as big?", answer: "No: 50 is 1.25 times 40", method: "Read the values, not the bar lengths" },
      ],
      traps: [
        {
          title: "A cut-off axis exaggerates differences",
          body: "If a bar chart's axis starts at 30, bars for 40 and 50 have heights 10 and 20, so the second looks twice the first. The real values differ by a factor of 1.25. Options claiming \"twice as many\" from bar lengths are often wrong.",
        },
        {
          title: "On a distance-time graph, steeper means faster",
          body: "The slope, not the height, gives the speed. A high but flat section is a stop far from home; a steep section is fast travel, whichever way it slopes.",
        },
      ],
    },
  ],
};
