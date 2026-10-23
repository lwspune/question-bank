import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_READING_NOTE: SubtopicNote = {
  subtopicName: "Reading Tables and Graphs",
  title: "Reading Tables and Graphs",
  oneLineDefinition:
    "Most data questions start with the same two moves: pick the right cells, then add or subtract them, keeping the unit printed above the table.",
  whyItMatters:
    "Twenty-five questions in the bank ask for nothing beyond a total, a difference, a count of rows that pass a test, or a reading of a cumulative table. Twenty-two of them are EASY, so the only way to lose the mark is a wrong cell or a dropped unit.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdird-totals",
      name: "Totals and differences of totals from a table",
      intuition:
        "A table is a grid of numbers with a heading on each side. A question names a row or a column, often two of them, and asks how far apart their totals are. You can add each side and subtract, or subtract cell by cell and add the gaps: the answer is the same, and the second way keeps the numbers small.",
      definition:
        "- **Read the labels first:** which rows, which columns, and the unit line (\"in thousands\", \"in ₹ lakh\"). Convert to the unit the options use only at the end.\n" +
        "- **Full method:** add each group, then subtract the totals.\n" +
        "- **Fast route:** when the two groups have matching entries (same months, same years), subtract pair by pair and add the gaps, keeping each gap's sign. The sum of the gaps is the difference of the totals.\n" +
        "- If a table already prints a **Total** row or column, read it instead of adding, and never add it in a second time.\n" +
        "- A question that defines a new quantity (profit as exports minus imports, calories from distance) is still a total first, then one more step.",
      formula: {
        label: "Difference of two totals",
        latex: "\\sum a_i - \\sum b_i = \\sum (a_i - b_i)",
        symbols: [
          { symbol: "a_i", meaning: "the entries of the first group" },
          { symbol: "b_i", meaning: "the matching entries of the second group" },
        ],
      },
      authoredExample: {
        prompt:
          "The table shows the sales (in units) of two shops in three months.\n\n| Month | Shop P | Shop Q |\n|---|---|---|\n| January | 340 | 285 |\n| February | 295 | 310 |\n| March | 410 | 372 |\n\nBy how many units do the total sales of Shop P exceed those of Shop Q?",
        steps: [
          "Full method: P \\(= 340 + 295 + 410 = 1045\\) and Q \\(= 285 + 310 + 372 = 967\\).",
          "Difference \\(= 1045 - 967 = 78\\).",
          "Fast route: month by month the gaps are \\(+55\\), \\(-15\\) and \\(+38\\), and \\(55 - 15 + 38 = 78\\).",
        ],
        answer: "78 units",
      },
      selfCheckExample: {
        prompt:
          "The table shows the output of two plants (in thousand units).\n\n| Year | Plant A | Plant B |\n|---|---|---|\n| 2019 | 12.4 | 10.6 |\n| 2020 | 15.1 | 11.9 |\n| 2021 | 13.8 | 14.3 |\n\nBy how many units does Plant A's three-year total exceed Plant B's?",
        steps: [
          "A \\(= 12.4 + 15.1 + 13.8 = 41.3\\) thousand; B \\(= 10.6 + 11.9 + 14.3 = 36.8\\) thousand.",
          "Difference \\(= 4.5\\) thousand. Check by gaps: \\(1.8 + 3.2 - 0.5 = 4.5\\).",
          "The unit line says thousands, so the answer is 4,500 units.",
        ],
        answer: "4,500 units",
      },
      practiceSet: [
        { prompt: "A shop sold 120, 135 and 150 units in three months. What were its total sales?", answer: "405 units" },
        {
          prompt: "One column of a table reads 48, 52, 61 and the matching column reads 45, 50, 58. Using the cell-by-cell gaps, find the difference between the two totals.",
          answer: "8",
          method: "\\(3 + 2 + 3 = 8\\); check \\(161 - 153 = 8\\).",
        },
        {
          prompt: "A table gives exports in ₹ lakh as 2.5, 3.1 and 2.9 for three years. What is the total export in rupees?",
          answer: "₹8,50,000",
          method: "\\(8.5\\) lakh \\(= 8{,}50{,}000\\).",
        },
        {
          prompt: "A firm's imports in a year were ₹180 lakh and its exports were ₹212 lakh. Taking profit as exports minus imports, what was the profit?",
          answer: "₹32 lakh",
        },
      ],
      pyqExampleId: "f5591eee-3f9c-4e13-9b94-0105dca99684",
      traps: [
        {
          title: "Dropping the unit line",
          body:
            "A table headed \"in thousands\" that gives a difference of 8.2 means 8,200, and the options are usually printed in full. Read the unit line before you read the numbers.",
        },
        {
          title: "Adding a printed Total row again",
          body:
            "Some tables print a Total row or column. It is already the sum of the entries above it, so adding it in with them doubles the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdird-count",
      name: "Picking out the rows that meet a condition",
      intuition:
        "Questions such as \"in how many years\", \"which item has the least\" or \"which statement is true\" never need a long calculation. Build one new number for every row (a difference, a total, three times a value), write it beside the row, and then scan the column you built.",
      definition:
        "- **Build the column the question needs:** unsold \\(=\\) produced \\(-\\) sold, absentees \\(=\\) applied \\(-\\) present, a year's total across companies.\n" +
        "- **Then scan:** count the rows that pass, or pick the largest or smallest.\n" +
        "- **\"More than\" and \"less than\" are strict:** a row equal to the limit does not count. \"At least\" and \"not less than\" include it.\n" +
        "- **Second highest:** find the highest, set it aside, take the highest of the rest. Two equal values can share a place.\n" +
        "- **Statement questions:** test each statement against the table. One wrong number makes the whole statement false, so stop checking it as soon as one fails.",
      authoredExample: {
        prompt:
          "The table shows the stock and the sales of five stores.\n\n| Store | Stock | Sold |\n|---|---|---|\n| A | 420 | 346 |\n| B | 380 | 344 |\n| C | 510 | 429 |\n| D | 295 | 270 |\n| E | 460 | 372 |\n\nIn how many stores were more than 74 items left unsold?",
        steps: [
          "Build the unsold column: A 74, B 36, C 81, D 25, E 88.",
          "More than 74: C (81) and E (88).",
          "A has exactly 74, which is not more than 74, so it does not count.",
        ],
        answer: "2 stores",
      },
      selfCheckExample: {
        prompt:
          "The table shows the sales of two products (in lakh units).\n\n| Year | Product X | Product Y |\n|---|---|---|\n| 2010 | 37 | 29 |\n| 2011 | 51 | 43 |\n| 2012 | 48 | 53 |\n| 2013 | 59 | 39 |\n\nIn which year were the combined sales of X and Y the second highest?",
        steps: [
          "Year totals: 2010: 66, 2011: 94, 2012: 101, 2013: 98.",
          "The highest is 2012 (101). Of the rest, the highest is 2013 (98).",
        ],
        answer: "2013",
      },
      practiceSet: [
        { prompt: "Five values are 34, 41, 29, 41 and 38. How many of them are more than 38?", answer: "2" },
        {
          prompt: "Four plants produced 120, 95, 140 and 110 units against targets of 115, 100, 130 and 120. How many plants met or beat their target?",
          answer: "2",
          method: "120 beats 115 and 140 beats 130; the other two fall short.",
        },
        {
          prompt: "A school earned ₹16 lakh from tuition and ₹7 lakh from donations. Is the tuition income less than three times the donation?",
          answer: "Yes",
          method: "Three times 7 is 21, and 16 is less than 21.",
        },
        {
          prompt: "Company P sold 40, 45 and 50 units in 2020, 2021 and 2022, and company Q sold 35, 50 and 45. In which year did Q sell more than P?",
          answer: "2021",
        },
      ],
      pyqExampleId: "7e6817ce-960e-45eb-8972-540666d9f09f",
      traps: [
        {
          title: "Counting the row that equals the limit",
          body:
            "\"More than the average\" or \"more than 55\" leaves out a row exactly equal to it. Only \"at least\" or \"not less than\" includes the equal row.",
        },
        {
          title: "Reading second highest as the second row",
          body:
            "Second highest is about size, not position. Build the full column of values first, then take the largest after the largest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdird-cumulative",
      name: "Reading a cumulative and-above table",
      intuition:
        "In a table headed \"40 and above, 30 and above, 20 and above\", every column counts everyone who reached that mark or more. So the columns overlap: a student with 45 is counted in all of them. The number in a band comes from subtracting two columns.",
      definition:
        "- Each entry is the number of students who scored **that mark or more**.\n" +
        "- **In a band:** from mark \\(a\\) up to (but not including) mark \\(b\\), take \"\\(a\\) and above\" minus \"\\(b\\) and above\".\n" +
        "- **Below a mark:** total minus \"that mark and above\".\n" +
        "- **A percentage cut-off:** change it to marks first. On a paper out of 60, 40% is 24 marks and 75% is 45 marks.\n" +
        "- Moving right, towards lower marks, the numbers can only stay equal or grow. A printed row that shrinks is a misprint; use only the column the question needs.",
      formula: {
        label: "Bands from a cumulative table",
        latex: "N_{a \\le x < b} = N_{\\ge a} - N_{\\ge b} \\qquad N_{< a} = N_{\\text{total}} - N_{\\ge a}",
        symbols: [
          { symbol: "\\(N_{\\ge a}\\)", meaning: "students with a or more marks" },
          { symbol: "\\(N_{\\text{total}}\\)", meaning: "everyone, the \"0 and above\" column" },
        ],
      },
      authoredExample: {
        prompt:
          "The table classifies 240 students by their Science marks (out of 80).\n\n| Subject | 64 and above | 48 and above | 32 and above | 16 and above | 0 and above |\n|---|---|---|---|---|---|\n| Science | 34 | 118 | 176 | 221 | 240 |\n\nHow many students scored at least 60% but less than 80%?",
        steps: [
          "Change to marks: 60% of 80 is 48 and 80% of 80 is 64.",
          "At least 48 but less than 64 \\(=\\) \"48 and above\" minus \"64 and above\".",
          "\\(118 - 34 = 84\\).",
        ],
        answer: "84 students",
      },
      selfCheckExample: {
        prompt:
          "The table classifies 240 students by their English marks (out of 80).\n\n| Subject | 64 and above | 48 and above | 32 and above | 16 and above | 0 and above |\n|---|---|---|---|---|---|\n| English | 22 | 97 | 161 | 213 | 240 |\n\nHow many students scored less than 20% marks in English?",
        steps: [
          "20% of 80 is 16 marks.",
          "Less than 16 \\(=\\) total minus \"16 and above\" \\(= 240 - 213 = 27\\).",
        ],
        answer: "27 students",
      },
      practiceSet: [
        {
          prompt: "In a cumulative table, 72 students scored 30 and above and 25 scored 40 and above. How many scored at least 30 but less than 40?",
          answer: "47",
        },
        { prompt: "A paper is marked out of 75. How many marks is 40%?", answer: "30" },
        { prompt: "Out of 120 students, 95 scored 10 and above. How many scored below 10?", answer: "25" },
        {
          prompt: "In a paper out of 60, 37 of 90 students scored 45 and above. Higher studies need at least 75% marks. How many students qualify?",
          answer: "37",
          method: "75% of 60 is 45, so read the \"45 and above\" column.",
        },
      ],
      pyqExampleId: "d36bc2c4-309b-4251-a8e4-35d0a905a43a",
      traps: [
        {
          title: "Reading a cumulative column as a band",
          body:
            "\"20 and above\" includes everyone with 30, 40 or more. The number who scored from 20 up to 30 is \"20 and above\" minus \"30 and above\".",
        },
        {
          title: "Looking up the percentage instead of the marks",
          body:
            "The columns are headed in marks. A cut-off given as a percentage must first be turned into marks out of the paper's maximum.",
        },
      ],
    },
  ],
};
