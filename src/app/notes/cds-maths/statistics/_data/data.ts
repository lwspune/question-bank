import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_DATA_NOTE: SubtopicNote = {
  subtopicName: "Data, Scales and Presentation",
  title: "Data, Scales and Presentation",
  oneLineDefinition:
    "Data is primary or secondary, discrete or continuous, and measured on a nominal, ordinal, interval or ratio scale; grouped data is shown in classes, histograms and polygons.",
  whyItMatters:
    "Eleven PYQs, nearly all EASY. They are vocabulary questions — which kind of data, which scale, which diagram — and each has one right term. Learn the table on this page and the inclusive/exclusive class distinction, and these marks are certain.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsst-types-of-data",
      name: "Kinds of data and scales of measurement",
      intuition:
        "Two questions classify any data set: who collected it (you, or someone before you), and what kind of number it is (a count, a measurement, a rank, or just a label).",
      definition:
        "- **Primary** data is collected first-hand for the enquiry; **secondary** data was collected by someone else (published reports, registers, a thesis).\n" +
        "- **Discrete** data takes separate values (a count of cards); **continuous** data can take any value in a range (a height).\n" +
        "- **Qualitative** (categorical) data is a label; **quantitative** data is a number.\n" +
        "- Scales: **nominal** (labels only), **ordinal** (ranked, gaps not equal), **interval** (equal gaps, no true zero), **ratio** (equal gaps and a true zero).",
      table: {
        columns: ["Scale", "What it allows", "Example"],
        rows: [
          { cells: ["Nominal", "Naming only", "Blood group, roll number"] },
          { cells: ["Ordinal", "Ranking", "Hotel star rating, class rank"] },
          { cells: ["Interval", "Equal differences", "Temperature in °C"] },
          { cells: ["Ratio", "Equal differences and ratios", "Height, income, marks"] },
        ],
        caption: "Each scale allows everything the one above it allows, and one thing more.",
      },
      selfCheckExample: {
        prompt: "Data on the number of children in each family, taken from a census report. Primary or secondary? Discrete or continuous?",
        steps: ["It was collected by the census office, not by you.", "A number of children is a whole-number count."],
        answer: "Secondary and discrete.",
      },
      practiceSet: [
        { prompt: "Blood groups A, B, AB, O are on which scale?", answer: "Nominal" },
        { prompt: "Marks out of \\(100\\) are on which scale?", answer: "Ratio" },
        { prompt: "Data from a personal interview is?", answer: "Primary" },
        { prompt: "Heights of students are?", answer: "Continuous" },
      ],
      pyqExampleId: "f8269ab8-e6d0-4307-a4d2-7e44f7b9c088", // 2017 (II) — birth registrar data: secondary
      traps: [
        {
          title: "Ranked is not measured",
          body:
            "Star ratings and ranks can be ordered, but a 4-star hotel is not 'twice' a 2-star one. That makes them ordinal, not interval or ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-classes-and-diagrams",
      name: "Classes, histograms and polygons",
      intuition:
        "Grouping data into classes loses the individual values but shows the shape. In a histogram the AREA of each bar stands for the frequency, so when classes have different widths the height must be frequency per unit width.",
      definition:
        "- **Inclusive** classes \\(15\\)–\\(19\\), \\(20\\)–\\(24\\): both limits belong to the class (there is a gap). **Exclusive** classes \\(15\\)–\\(20\\), \\(20\\)–\\(25\\): the upper limit belongs to the next class.\n" +
        "- To use formulas on inclusive classes, convert to boundaries: \\(14.5\\)–\\(19.5\\), \\(19.5\\)–\\(24.5\\).\n" +
        "- **Frequency density** = class frequency ÷ class width; it is the height of a histogram bar.\n" +
        "- With equal widths, the bar height is simply the frequency.\n" +
        "- A **frequency polygon** joins the mid-points of the bar tops; it smooths out as classes get narrower and data grows.\n" +
        "- Bar diagrams, pie diagrams and pictograms are all diagrammatic presentation; a bar diagram suits discrete values.",
      formula: {
        label: "Frequency density",
        latex: "\\text{frequency density} = \\dfrac{\\text{class frequency}}{\\text{class width}}",
      },
      visualizationSlug: "histogram-bin-slider",
      authoredExample: {
        prompt: "The class \\(20\\)–\\(35\\) has frequency \\(45\\). Find its frequency density, and its lower boundary if the classes were written \\(20\\)–\\(34\\), \\(35\\)–\\(49\\).",
        steps: [
          "Width \\(15\\): density \\(\\dfrac{45}{15} = 3\\).",
          "For inclusive classes the boundary is halfway across the gap: \\(19.5\\).",
        ],
        answer: "Density \\(3\\); lower boundary \\(19.5\\).",
      },
      selfCheckExample: {
        prompt: "Are the classes \\(10\\)–\\(14\\), \\(15\\)–\\(19\\), \\(20\\)–\\(24\\) inclusive or exclusive?",
        steps: ["Both limits of each class belong to it, with a gap of \\(1\\) between classes."],
        answer: "Inclusive.",
      },
      practiceSet: [
        { prompt: "Frequency \\(40\\), width \\(8\\). Density?", answer: "\\(5\\)" },
        { prompt: "Equal widths: bar height represents?", answer: "The class frequency" },
        { prompt: "Best diagram for a discrete variable with a few values?", answer: "Bar diagram" },
        { prompt: "Boundaries of the inclusive class \\(30\\)–\\(39\\)?", answer: "\\(29.5\\)–\\(39.5\\)" },
      ],
      pyqExampleId: "c8806df5-92bc-4e32-bfd2-98a26762e883", // 2016 (II) — frequency density of 10–15 with frequency 30
      traps: [
        {
          title: "Inclusive and exclusive are easy to swap",
          body:
            "'15–19, 20–24' is INCLUSIVE (the upper limit is inside the class). '15–20, 20–25' is EXCLUSIVE. A statement question that names them the other way round is false.",
        },
      ],
    },
  ],
};
