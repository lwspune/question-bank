import type { SubtopicNote } from "@/app/notes/_types";

export const AF_ST_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Histograms, Polygons and Ogives",
  title: "Histograms, Frequency Polygons and Ogives",
  oneLineDefinition:
    "Know how a histogram, a frequency polygon, a frequency curve and an ogive are drawn from a frequency table, and what each one lets you read off.",
  whyItMatters:
    "Most questions here are statements to judge true or false, so each mark goes to one exact fact about a graph. The usual losses are the height of a histogram bar, which follows the frequency only when the classes are equally wide, and the limit a less than ogive is plotted against.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afst-graph-types",
      name: "The graphs of a frequency distribution",
      intuition:
        "All of these graphs are drawn from the same frequency table, but each shows something different: a histogram shows the shape of the data, a frequency polygon shows the same shape as a line, and an ogive shows the running total.",
      definition:
        "A histogram's rectangles stand side by side with no gaps, because the classes are continuous: each one ends where the next begins. The **area** of each rectangle is proportional to the frequency of its class, as if the class's values were spread evenly across it. The **height** is proportional to the frequency only when every class has the same width.",
      table: {
        columns: ["Graph", "How it is drawn", "What you read from it"],
        rows: [
          {
            cells: [
              "Histogram",
              "Touching rectangles on the class intervals, each with area proportional to its frequency",
              "The shape of the data, and the modal class (the tallest bar, when the widths are equal)",
            ],
          },
          {
            cells: [
              "Frequency polygon",
              "Drawn after the histogram: join the mid-points of the tops of its rectangles with straight lines",
              "The same shape as a line, useful for comparing two distributions on one graph",
            ],
          },
          {
            cells: ["Frequency curve", "A smooth curve through the same mid-points", "The overall pattern, such as whether the data are symmetric"],
          },
          {
            cells: ["Bar chart", "Separate bars with gaps, one for each category or value", "A comparison between separate categories"],
          },
          {
            cells: ["Ogive", "Cumulative frequencies plotted at the class boundaries and joined", "The median, read at half the total (the next concept)"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "A histogram has the classes 0-10 and 10-30, each with frequency 10. Which rectangle is taller, and by how much?",
        steps: [
          "The areas must be equal, because the frequencies are equal.",
          "The class 10-30 is twice as wide, so its rectangle is half as tall.",
        ],
        answer: "The 0-10 rectangle is twice as tall.",
      },
      practiceSet: [
        { prompt: "Which graph is drawn by plotting and joining the cumulative frequencies?", answer: "The ogive." },
        { prompt: "Why are there no gaps between the bars of a histogram?", answer: "The classes are continuous: each ends where the next begins." },
        {
          prompt: "A histogram has a class 20-40 with frequency 30 among classes of width 10. How tall should its rectangle be, in frequency per 10 units?",
          answer: "\\(15\\)",
        },
      ],
      pyqExampleId: "1a5848db-8d28-4bbc-a1c7-5f7d7df2788c",
      traps: [
        {
          title: "Area, not height, follows the frequency",
          body: "When one class is twice as wide as the others, a rectangle of the same height stands for twice the frequency. Halve its height to keep the area right.",
        },
        {
          title: "A histogram is not a bar chart",
          body: "A bar chart's bars have gaps and stand for separate categories. A histogram's bars touch because its classes run on from one another.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-ogive",
      visualizationSlug: "af-ogive-median",
      name: "The ogive and reading the median",
      intuition:
        "An ogive plots the running total of the frequencies. Go up the vertical axis to half the total frequency, across to the curve, and down: the value you land on is the median.",
      definition:
        "- **Less than ogive**: the cumulative frequency up to each class is plotted against the class's **upper boundary**, because it counts the items below that point.\n" +
        "- **More than ogive**: the count from each class upwards is plotted against the class's **lower boundary**.\n" +
        "- The median is read at \\(\\tfrac N2\\) on the vertical axis, and the two ogives cross at the median.\n" +
        "- A straight-line ogive means the running total grows by the same amount in every class: each of the \\(k\\) classes has frequency \\(\\tfrac Nk\\), and no class stands out as the modal class, so there is no mode.",
      formula: {
        label: "Reading the median",
        latex: "\\text{cumulative frequency at } M = \\dfrac N2",
      },
      authoredExample: {
        prompt:
          "The classes 0-10, 10-20, 20-30 and 30-40 have frequencies 4, 10, 16 and 10. List the points of the less than ogive and read the median from it.",
        steps: [
          "The cumulative frequencies are 4, 14, 30 and 40, plotted at the upper boundaries: \\((10, 4)\\), \\((20, 14)\\), \\((30, 30)\\), \\((40, 40)\\), starting from \\((0, 0)\\).",
          "\\(\\tfrac N2 = 20\\) lies between the points at 20 and 30, where the curve climbs 16 in 10 units.",
          "It reaches 20 at \\(20 + \\dfrac{20 - 14}{16} \\times 10 = 23.75\\).",
        ],
        answer: "Median 23.75.",
      },
      selfCheckExample: {
        prompt:
          "The less than ogive of 4 classes of width 5, starting at 0, with 48 items in all, is a straight line. Find the frequency of each class and the median.",
        steps: [
          "A straight line rises by the same amount each class: \\(48 \\div 4 = 12\\) per class.",
          "The line runs from \\((0, 0)\\) to \\((20, 48)\\), so it reaches \\(\\tfrac N2 = 24\\) halfway along, at 10.",
        ],
        answer: "12 in each class; median 10.",
      },
      practiceSet: [
        {
          prompt: "The classes 10-20, 20-30 and 30-40 have frequencies 5, 9 and 6. Give the points of the less than ogive.",
          answer: "\\((10, 0)\\), \\((20, 5)\\), \\((30, 14)\\), \\((40, 20)\\)",
        },
        { prompt: "Against which boundary of each class is a more than ogive plotted?", answer: "The lower boundary." },
        { prompt: "A less than ogive and a more than ogive drawn on the same axes cross at \\(x = 34\\). What is 34?", answer: "The median." },
      ],
      pyqExampleId: "23f54bbb-a677-4554-91b3-09f0a54f2e8f",
      traps: [
        {
          title: "Less than goes at the upper boundary",
          body: "The number of items below 20 is plotted at 20, the top of the class 10-20, not at its start or its mid-point.",
        },
        {
          title: "Half the total frequency, not half the axis",
          body: "Read the median where the curve reaches \\(\\tfrac N2\\) on the vertical axis. The middle of the horizontal axis is not the median unless the data are symmetric.",
        },
      ],
    },
  ],
};
