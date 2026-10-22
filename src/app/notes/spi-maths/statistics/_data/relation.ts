import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ST_RELATION_NOTE: SubtopicNote = {
  subtopicName: "Empirical Relation and Graphs",
  title: "Empirical Relation and Graphs",
  oneLineDefinition:
    "Mode is about 3 times the median minus 2 times the mean, and each kind of graph shows data in its own way.",
  whyItMatters:
    "Seven questions in the bank, five of them EASY. Four rest on the one relation between mean, median and mode, and three ask which graph shows what: the axes of a histogram, the graph for parts of a whole, and the average a graph cannot give.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spister-empirical",
      name: "Mode equals 3 median minus 2 mean",
      intuition:
        "For data that is only a little lopsided, the three averages sit in a fixed pattern: the median lies between the mean and the mode, about a third of the way from the mean. That pattern gives one equation linking all three, so any two give the third.",
      definition:
        "- **Mode \\(= 3\\) Median \\(- 2\\) Mean.**\n" +
        "- The same fact written another way: Mean \\(-\\) Mode \\(= 3\\)(Mean \\(-\\) Median).\n" +
        "- It is an approximate (empirical) rule for moderately skewed data, found by observation, not proved.\n" +
        "- To find the median from the other two: \\(3\\,\\text{Median} = \\text{Mode} + 2\\,\\text{Mean}\\).",
      formula: {
        label: "Empirical relation",
        latex: "\\text{Mode} = 3\\,\\text{Median} - 2\\,\\text{Mean}",
      },
      authoredExample: {
        prompt: "A distribution has mean 24 and mode 21. Use the empirical relation to find its median.",
        steps: [
          "\\(3\\,\\text{Median} = \\text{Mode} + 2\\,\\text{Mean} = 21 + 48 = 69\\).",
          "Median \\(= \\frac{69}{3} = 23\\).",
        ],
        answer: "23",
      },
      selfCheckExample: {
        prompt: "A distribution has median 15 and mean 16. Use the empirical relation to find its mode.",
        steps: ["Mode \\(= 3 \\times 15 - 2 \\times 16 = 45 - 32 = 13\\)."],
        answer: "13",
      },
      practiceSet: [
        { prompt: "A distribution has mode 10 and median 12. Use the empirical relation to find its mean.", answer: "\\(2\\,\\text{Mean} = 36 - 10\\), so the mean is 13" },
        { prompt: "Complete the empirical relation: Mean minus Mode equals what multiple of (Mean minus Median)?", answer: "3" },
        { prompt: "The mean and median of a distribution are both 8. What does the empirical relation give for the mode?", answer: "\\(24 - 16 = 8\\)" },
      ],
      pyqExampleId: "b8ad0a69-594d-40a8-b1b3-f943994de19c",
      traps: [
        {
          title: "Swapping mean and median",
          body:
            "The 3 goes with the median and the 2 with the mean: Mode \\(= 3\\) Median \\(- 2\\) Mean. 'Mode \\(= 3\\) Mean \\(- 2\\) Median' is the printed wrong option.",
        },
        {
          title: "Losing the minus sign when matching a pattern",
          body:
            "Written as x Median \\(+\\) y Mean \\(= z\\) Mode, the relation has \\(x = 3\\), \\(y = -2\\) and \\(z = 1\\). The minus sign belongs to y.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spister-graphs",
      name: "Which graph shows what",
      intuition:
        "Each graph answers one kind of question. A pie chart shows shares of a whole, a histogram shows how a frequency table is spread out, and an ogive tracks a running total. Knowing which is which settles the definition questions at once.",
      definition:
        "Three facts settle most graph questions:\n" +
        "- In a **histogram** the class intervals go on the **x-axis** and the frequencies on the y-axis, as bars with no gaps.\n" +
        "- A **pie chart** shows the parts of a whole: each sector angle is the part's share of 360°.\n" +
        "- The **median** can be read from an ogive and the **mode** from a histogram, but the **mean** cannot be found from a graph.",
      table: {
        columns: ["Graph", "What it shows", "What you can read from it"],
        rows: [
          { cells: ["Histogram", "Class intervals on the x-axis, frequencies on the y-axis, bars touching", "The mode, from the tallest bar"] },
          { cells: ["Bar graph", "Separate items as bars with gaps between them", "Which item is largest or smallest"] },
          { cells: ["Pie chart", "A whole divided into sectors for its parts", "The share of each part: sector angle = part ÷ whole × 360°"] },
          { cells: ["Pictograph", "Quantities drawn as rows of pictures", "Counts, from the number of pictures"] },
          { cells: ["Frequency polygon", "The mid-points of the histogram bar tops joined by lines", "The shape of the distribution"] },
          {
            cells: ["Ogive", "Cumulative frequencies plotted against class limits", "The median, where the less-than and more-than ogives cross"],
            noteAmber: "No graph gives the mean: it must be calculated.",
          },
        ],
        caption: "The mean is the one average that cannot be found from a graph.",
      },
      selfCheckExample: {
        prompt: "Which graph best shows how a family's monthly income is split between food, rent, travel and savings?",
        steps: ["The income is a whole and the four items are its parts.", "Parts of a whole are shown by a pie chart."],
        answer: "A pie chart",
      },
      practiceSet: [
        { prompt: "On which axis of a histogram are the frequencies marked?", answer: "The y-axis" },
        { prompt: "Which average can be read from the point where the less-than and more-than ogives cross?", answer: "The median" },
        { prompt: "Which average cannot be found from a graph?", answer: "The mean" },
        { prompt: "In a pie chart, one part is a quarter of the whole. What is the angle of its sector?", answer: "\\(\\frac{1}{4} \\times 360^\\circ = 90^\\circ\\)" },
      ],
      pyqExampleId: "c9ae0da4-f45c-4a0f-aa57-b46197968722",
      traps: [
        {
          title: "Putting the classes on the y-axis",
          body:
            "In a histogram the class intervals run along the x-axis and the frequencies up the y-axis. A histogram's bars also touch, unlike a bar graph's.",
        },
        {
          title: "Thinking every average has a graph",
          body:
            "The median comes from an ogive and the mode from a histogram, but the mean has no graphical method. It is the answer when a question asks which cannot be found graphically.",
        },
      ],
    },
  ],
};
