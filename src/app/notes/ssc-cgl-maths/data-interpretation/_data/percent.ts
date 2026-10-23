import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "One Value as a Percentage of Another",
  title: "One Value as a Percentage of Another",
  oneLineDefinition:
    "\"A is what percent of B\" is A divided by B, times 100, and the value after the word \"of\" is always the base.",
  whyItMatters:
    "Thirty-four questions in the bank, and fifteen of them are MODERATE, the most of any page in this chapter. The options sit a fraction of a percent apart (94.92%, 94.95%, 94.98%), so a known fraction or a quick 1% estimate is what finishes these inside the time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdipc-ofanother",
      name: "One value as a percentage of another",
      intuition:
        "A percentage answers \"how many for every hundred of the base\". Divide the value by the base and scale to 100. The base is whatever comes after \"of\" or \"compared with\"; the answer can be more than 100% when the value is bigger than the base.",
      definition:
        "- **Full method:** \\(\\frac{A}{B} \\times 100\\), where B follows the word \"of\".\n" +
        "- **Fast route by 1%:** find 1% of B (move the decimal two places), then ask how many of those fit into A. For 384 of 1280: 1% is 12.8 and \\(384 \\div 12.8 = 30\\).\n" +
        "- **Fast route by fractions:** reduce \\(\\frac{A}{B}\\) first; a known fraction gives the percentage at once (the next concept lists them).\n" +
        "- **Averages over the same count:** A's average as a percentage of B's average is A's total as a percentage of B's total.\n" +
        "- **Above 100%:** 2.25 times the base is 225%. Split it as \\(200\\% + \\) the rest when the options differ only in the hundreds.\n" +
        "- Round only at the end, to the places the question asks for.",
      formula: {
        label: "A as a percentage of B",
        latex: "\\frac{A}{B} \\times 100\\%",
        symbols: [
          { symbol: "A", meaning: "the value being described" },
          { symbol: "B", meaning: "the base, the value after \"of\"" },
        ],
      },
      authoredExample: {
        prompt:
          "The table shows a company's expenses (in ₹ lakh) over four years.\n\n| Year | Salary | Tax |\n|---|---|---|\n| 2019 | 290 | 84 |\n| 2020 | 310 | 92 |\n| 2021 | 330 | 98 |\n| 2022 | 350 | 110 |\n\nThe total tax over the four years is what percentage of the total salary?",
        steps: [
          "Tax total \\(= 84 + 92 + 98 + 110 = 384\\); salary total \\(= 290 + 310 + 330 + 350 = 1280\\).",
          "Full method: \\(\\frac{384}{1280} \\times 100 = 30\\%\\).",
          "Fast route: 1% of 1280 is 12.8, and \\(384 \\div 12.8 = 30\\).",
        ],
        answer: "30%",
      },
      selfCheckExample: {
        prompt: "A shop sold 1,560 pens and 1,200 pencils in a month. The number of pens sold is what percentage of the number of pencils sold?",
        steps: [
          "\\(\\frac{1560}{1200} = 1.3\\).",
          "\\(1.3 \\times 100 = 130\\%\\). It is above 100% because more pens than pencils were sold.",
        ],
        answer: "130%",
      },
      practiceSet: [
        { prompt: "40 is what percentage of 250?", answer: "16%" },
        {
          prompt: "Using 1% of 2,590 = 25.9, find 2,331 as a percentage of 2,590.",
          answer: "90%",
          method: "\\(2331 \\div 25.9 = 90\\).",
        },
        { prompt: "Three values average 60 and three other values average 80. The first average is what percentage of the second?", answer: "75%" },
        { prompt: "Using 1% of 1,250 = 12.5, estimate 26 as a percentage of 1,250 to the nearest whole number.", answer: "2%", method: "\\(26 \\div 12.5 = 2.08\\)." },
      ],
      pyqExampleId: "6c4fda4c-ba21-457e-bc86-a96918b0ab1a",
      traps: [
        {
          title: "Dividing by the wrong base",
          body:
            "\"A is what percent of B\" divides by B. Swapping them gives a number on the other side of 100%, and that number is usually one of the options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscdipc-fractions",
      name: "Fractions and their percentage values",
      intuition:
        "Many data questions are built so that the two totals reduce to a simple fraction. If you know these values by heart, \\(\\frac{350}{400} = \\frac{7}{8}\\) is 87.5% the moment you see it, with no long division.",
      definition:
        "Reduce the fraction first (divide top and bottom by a common factor), then read its value from the table. A multiple of a listed fraction is the same multiple of its percentage: \\(\\frac{3}{16} = 3 \\times 6.25\\% = 18.75\\%\\).",
      table: {
        columns: ["Fraction", "Percentage", "Fraction", "Percentage"],
        rows: [
          { cells: ["\\(\\frac{1}{2}\\)", "50%", "\\(\\frac{1}{8}\\)", "12.5%"] },
          { cells: ["\\(\\frac{1}{3}\\)", "33.33%", "\\(\\frac{3}{8}\\)", "37.5%"] },
          { cells: ["\\(\\frac{2}{3}\\)", "66.67%", "\\(\\frac{5}{8}\\)", "62.5%"] },
          { cells: ["\\(\\frac{1}{4}\\)", "25%", "\\(\\frac{7}{8}\\)", "87.5%"] },
          { cells: ["\\(\\frac{3}{4}\\)", "75%", "\\(\\frac{1}{9}\\)", "11.11%"] },
          { cells: ["\\(\\frac{1}{5}\\)", "20%", "\\(\\frac{1}{11}\\)", "9.09%"] },
          { cells: ["\\(\\frac{1}{6}\\)", "16.67%", "\\(\\frac{1}{12}\\)", "8.33%"] },
          { cells: ["\\(\\frac{1}{7}\\)", "14.29%", "\\(\\frac{1}{16}\\)", "6.25%"] },
        ],
        caption: "Multiply up for other numerators: \\(\\frac{5}{16} = 31.25\\%\\), \\(\\frac{5}{32} = 15.625\\%\\).",
      },
      selfCheckExample: {
        prompt: "Without long division, write 450 as a percentage of 720.",
        steps: [
          "\\(\\frac{450}{720}\\): divide both by 90 to get \\(\\frac{5}{8}\\).",
          "\\(\\frac{5}{8} = 62.5\\%\\).",
        ],
        answer: "62.5%",
      },
      practiceSet: [
        { prompt: "What percentage is \\(\\frac{7}{8}\\)?", answer: "87.5%" },
        { prompt: "Write \\(\\frac{3}{16}\\) as a percentage.", answer: "18.75%" },
        { prompt: "Which simple fraction is 14.29%?", answer: "\\(\\frac{1}{7}\\)" },
        { prompt: "120 is what percentage of 960?", answer: "12.5%", method: "\\(\\frac{120}{960} = \\frac{1}{8}\\)." },
      ],
      pyqExampleId: "e718c799-6d7d-426d-a02a-c139bdb5fba0",
      traps: [
        {
          title: "Mixing up one-sixth and one-seventh",
          body:
            "\\(\\frac{1}{6}\\) is 16.67% and \\(\\frac{1}{7}\\) is 14.29%. Options are often built from the neighbouring fraction, so reduce fully before you read the table.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdipc-part",
      name: "A part as a percentage of the whole",
      intuition:
        "When the base is \"the total\", it is usually not printed: add up all the parts first. And when the table gives one group, the other group is what is left, so its percentage is 100% minus the first.",
      definition:
        "- **Share of the whole** \\(= \\frac{\\text{part}}{\\text{sum of all parts}} \\times 100\\). Add every part the question includes in the whole.\n" +
        "- **The rest:** if 48% passed, 52% did not. Either subtract the counts first or take 100% minus the given share.\n" +
        "- **Comparing rates across rows** (qualified out of appeared, year by year): work out part \\(\\div\\) whole for each row. A bigger part does not mean a bigger rate when the wholes differ.",
      formula: {
        label: "Share of the whole",
        latex: "\\text{Share} = \\frac{\\text{part}}{\\text{whole}} \\times 100\\% \\qquad \\%\\,\\text{rest} = 100\\% - \\%\\,\\text{share}",
      },
      authoredExample: {
        prompt:
          "The table shows a country's exports (in ₹ crore).\n\n| Item | Tea | Coffee | Spices | Rice |\n|---|---|---|---|---|\n| Exports | 340 | 260 | 480 | 520 |\n\nWhat percentage of the total exports is spices?",
        steps: [
          "Whole \\(= 340 + 260 + 480 + 520 = 1600\\).",
          "\\(\\frac{480}{1600} \\times 100 = 30\\%\\). Fast route: \\(\\frac{480}{1600} = \\frac{3}{10}\\).",
        ],
        answer: "30%",
      },
      selfCheckExample: {
        prompt: "Of 640 applicants for a test, 416 passed. What percentage of the applicants failed?",
        steps: [
          "Failed \\(= 640 - 416 = 224\\).",
          "\\(\\frac{224}{640} \\times 100 = 35\\%\\). Check: passed is \\(\\frac{416}{640} = 65\\%\\), and \\(100 - 65 = 35\\).",
        ],
        answer: "35%",
      },
      practiceSet: [
        { prompt: "A class of 48 has 18 girls. What percentage of the class are boys?", answer: "62.5%" },
        { prompt: "A firm's sales in four quarters were ₹30, 45, 25 and 50 lakh. What share of the year's sales came in the last two quarters?", answer: "50%" },
        { prompt: "45% of the candidates qualified. What percentage did not?", answer: "55%" },
        { prompt: "Of 900 people surveyed, 117 never take tea. What percentage is that?", answer: "13%" },
      ],
      pyqExampleId: "5881d4fe-a01a-43cc-9d37-50c8c9857de9",
      traps: [
        {
          title: "Comparing parts instead of rates",
          body:
            "A state with 920 qualified out of 9,200 in one year (10%) and 850 out of 7,000 in another (about 12.1%) did better in the second year, though fewer qualified. Compare part over whole for each row, never the parts alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdipc-marks",
      name: "Aggregate percentage of marks",
      intuition:
        "A student's overall percentage is all the marks scored over all the marks possible. When every paper is out of 100, that is the plain average of the percentages. When papers carry different maximum marks, a bigger paper counts for more, so turn each percentage back into marks first.",
      definition:
        "- **Aggregate %** \\(= \\frac{\\text{total marks obtained}}{\\text{total maximum marks}} \\times 100\\).\n" +
        "- **Table of percentages with different maximums:** marks in a paper \\(= \\frac{p}{100} \\times\\) its maximum. Add the marks, add the maximums, divide.\n" +
        "- **Equal maximums:** the aggregate is the average of the percentages, and the total of marks out of \\(5 \\times 100\\) can be read off directly.\n" +
        "- **Best subject by percentage:** compare marks \\(\\div\\) maximum for each subject, not the raw marks.\n" +
        "- **A pass mark in marks** becomes a percentage of that paper's maximum (105 out of 175 is 60%).",
      formula: {
        label: "Aggregate percentage",
        latex: "\\text{Aggregate} = \\frac{\\sum \\frac{p_i}{100} M_i}{\\sum M_i} \\times 100\\%",
        symbols: [
          { symbol: "p_i", meaning: "percentage scored in paper i" },
          { symbol: "M_i", meaning: "maximum marks of paper i" },
        ],
      },
      authoredExample: {
        prompt:
          "The table shows a student's percentage in three papers, with the maximum marks in brackets.\n\n| Paper | English (100) | Science (150) | Maths (50) |\n|---|---|---|---|\n| Percentage | 72 | 60 | 80 |\n\nWhat is the student's aggregate percentage?",
        steps: [
          "Marks: English 72, Science \\(60\\%\\) of 150 \\(= 90\\), Maths \\(80\\%\\) of 50 \\(= 40\\). Total 202.",
          "Maximum \\(= 100 + 150 + 50 = 300\\).",
          "\\(\\frac{202}{300} \\times 100 = 67.33\\%\\). The plain average of 72, 60 and 80 would give 70.67%, which is wrong here.",
        ],
        answer: "67.33%",
      },
      selfCheckExample: {
        prompt:
          "The table shows a student's marks.\n\n| Subject | Marks obtained | Maximum marks |\n|---|---|---|\n| Hindi | 54 | 75 |\n| Maths | 99 | 150 |\n| Art | 38 | 50 |\n\nIn which subject is the student's percentage highest?",
        steps: [
          "Hindi \\(\\frac{54}{75} = 72\\%\\), Maths \\(\\frac{99}{150} = 66\\%\\), Art \\(\\frac{38}{50} = 76\\%\\).",
          "Art is highest, although Maths has the most marks.",
        ],
        answer: "Art",
      },
      practiceSet: [
        { prompt: "A student scores 412 marks in five papers of 100 each. What is the aggregate percentage?", answer: "82.4%" },
        { prompt: "A pass needs 63 marks in a 90-mark paper. What percentage is that?", answer: "70%" },
        { prompt: "A student needs 75% in a 120-mark paper. How many marks is that?", answer: "90" },
        { prompt: "A student's aggregate over four papers of 75 marks each is 64%. What are the total marks scored?", answer: "192" },
      ],
      pyqExampleId: "68a64f8a-3202-4c9a-9d44-7e38cafc4821",
      traps: [
        {
          title: "Averaging percentages from papers of different sizes",
          body:
            "70% in a 150-mark paper is worth more marks than 70% in a 50-mark paper. When the maximums differ, convert each percentage to marks before adding.",
        },
        {
          title: "Judging the best subject by raw marks",
          body:
            "The subject with the most marks may also have the largest maximum. \"Highest percentage\" means marks divided by maximum for each subject.",
        },
      ],
    },
  ],
};
