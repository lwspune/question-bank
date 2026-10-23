import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Ratios from Data",
  title: "Ratios from Data",
  oneLineDefinition:
    "A ratio from a table compares two totals in the order the question names them, cut down to lowest terms.",
  whyItMatters:
    "Thirty questions in the bank, twenty-seven of them EASY and three from 2025. The adding is quick; marks are lost by writing the ratio the wrong way round or stopping before lowest terms, and the options are built to catch both.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdira-totals",
      name: "Ratio of two totals in lowest terms",
      intuition:
        "Add up each side the question names, write first total : second total, and divide both by their highest common factor. With four options on screen you can often skip the full simplifying: the right option, scaled up, gives back both totals.",
      definition:
        "- **Order:** \"the ratio of A to B\" is A : B. \"Respective ratio\" also follows the order the items are named.\n" +
        "- **Full method:** add each side, then divide both totals by their HCF.\n" +
        "- **Fast route:** divide in steps by easy factors (10, 5, 2, 3) until nothing common is left, or test the options: if \\(a : b\\) is right, then \\(\\frac{\\text{total}_1}{a} = \\frac{\\text{total}_2}{b}\\).\n" +
        "- A ratio of two values from the same chart can be taken straight from the readings; their common unit cancels.",
      formula: {
        label: "Ratio in lowest terms",
        latex: "a : b = \\frac{a}{h} : \\frac{b}{h}, \\quad h = \\text{HCF}(a, b)",
      },
      authoredExample: {
        prompt:
          "The table shows the number of students in two subjects in four colleges.\n\n| Subject | W | X | Y | Z |\n|---|---|---|---|---|\n| Physics | 210 | 185 | 240 | 215 |\n| Chemistry | 160 | 165 | 200 | 175 |\n\nWhat is the ratio of the total number of Physics students to the total number of Chemistry students?",
        steps: [
          "Physics \\(= 210 + 185 + 240 + 215 = 850\\); Chemistry \\(= 160 + 165 + 200 + 175 = 700\\).",
          "\\(850 : 700\\). Divide by 10: \\(85 : 70\\). Divide by 5: \\(17 : 14\\).",
          "Check an option this way: \\(850 \\div 17 = 50\\) and \\(700 \\div 14 = 50\\), the same scale.",
        ],
        answer: "\\(17 : 14\\)",
      },
      selfCheckExample: {
        prompt:
          "The table shows the sales (in thousand units) of two manufacturers.\n\n| Year | Q | S |\n|---|---|---|\n| 2021 | 125 | 170 |\n| 2022 | 140 | 180 |\n| 2023 | 155 | 190 |\n\nWhat is the ratio of Q's total sales to S's total sales over the three years?",
        steps: [
          "Q \\(= 420\\) and S \\(= 540\\).",
          "\\(420 : 540\\). Divide by 60: \\(7 : 9\\).",
        ],
        answer: "\\(7 : 9\\)",
      },
      practiceSet: [
        { prompt: "Write \\(450 : 600\\) in lowest terms.", answer: "\\(3 : 4\\)" },
        { prompt: "Two totals are 1,248 and 1,040. Write their ratio in lowest terms.", answer: "\\(6 : 5\\)", method: "The HCF is 208." },
        {
          prompt: "Which ratio equals \\(935 : 1100\\): \\(17 : 20\\) or \\(20 : 17\\)?",
          answer: "\\(17 : 20\\)",
          method: "\\(935 \\div 55 = 17\\) and \\(1100 \\div 55 = 20\\).",
        },
        { prompt: "In a year, product A sold 36 thousand units and product B sold 48 thousand. What is the ratio of B's sales to A's?", answer: "\\(4 : 3\\)" },
      ],
      pyqExampleId: "15203fa8-9e93-46bd-9a9b-de345ed6f108",
      traps: [
        {
          title: "Writing the ratio the wrong way round",
          body:
            "\"The ratio of A to B\" puts A first. Both orders nearly always appear among the options, so the order decides the mark.",
        },
        {
          title: "Stopping before lowest terms",
          body:
            "\\(180 : 225\\) and \\(4 : 5\\) are the same ratio, but the options print only the reduced form. Keep dividing until the two numbers share no factor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdira-times",
      name: "How many times, and ratios of averages",
      intuition:
        "\"How many times\" is one value divided by the other. A ratio of two averages looks like extra work, but if both averages are over the same number of entries the divisions cancel, and the ratio of the averages is the ratio of the totals.",
      definition:
        "- **\"A is how many times B\"** \\(= A \\div B\\). It is a single number such as 1.8, not a ratio.\n" +
        "- **Ratio of two averages over the same count** \\(=\\) ratio of the two totals.\n" +
        "- **Ratio of one value to an average:** work out the average first, then write value : average and simplify.\n" +
        "- Over different counts, divide each total by its own count before comparing.",
      formula: {
        label: "Ratio of averages over the same count",
        latex: "\\frac{\\bar{x}}{\\bar{y}} = \\frac{\\sum x_i \\div n}{\\sum y_i \\div n} = \\frac{\\sum x_i}{\\sum y_i}",
      },
      authoredExample: {
        prompt: "A country imported 2,250 tonnes of a crop in 2019 and 4,050 tonnes in 2021. The 2021 imports were how many times the 2019 imports?",
        steps: [
          "\\(4050 \\div 2250\\). Divide both by 450: \\(\\frac{9}{5}\\).",
          "\\(\\frac{9}{5} = 1.8\\).",
        ],
        answer: "1.8 times",
      },
      selfCheckExample: {
        prompt:
          "The table shows the yearly sales of two companies.\n\n| Year | P | Q |\n|---|---|---|\n| 2019 | 52 | 45 |\n| 2020 | 48 | 50 |\n| 2021 | 60 | 35 |\n| 2022 | 40 | 30 |\n\nWhat is the ratio of P's average yearly sales to Q's?",
        steps: [
          "Both averages are over 4 years, so compare totals: P \\(= 200\\), Q \\(= 160\\).",
          "\\(200 : 160 = 5 : 4\\).",
        ],
        answer: "\\(5 : 4\\)",
      },
      practiceSet: [
        { prompt: "Sales were 1,500 in one year and 4,200 in another. The second figure is how many times the first?", answer: "2.8" },
        {
          prompt: "Five subjects have 90, 110, 100, 120 and 80 books. What is the ratio of the books in the 120-book subject to the average per subject?",
          answer: "\\(6 : 5\\)",
        },
        { prompt: "Over 6 years company A produced 270 units in all and company B 300. What is the ratio of their average yearly production?", answer: "\\(9 : 10\\)" },
        { prompt: "One value is 3.2 times another, which is 250. Find the first value.", answer: "800" },
      ],
      pyqExampleId: "59ad41c8-b544-43d9-8bb5-5d8eb3815b45",
      traps: [
        {
          title: "Dividing averages that cover different counts",
          body:
            "The ratio of averages equals the ratio of totals only when both are over the same number of entries. A 3-year average against a 5-year average needs each division done.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdira-parts",
      name: "Finding each part before taking the ratio",
      intuition:
        "Sometimes the table does not print the two numbers the ratio needs. It prints a total and one part, or overlapping groups, or a ratio that links two columns. Build the two parts first; the ratio is then the easy last line.",
      definition:
        "- **Total and one part given:** the other part \\(=\\) total \\(-\\) the given part (men \\(=\\) all scholars \\(-\\) women).\n" +
        "- **Overlapping groups:** everyone who plays football \\(=\\) \"football and basketball\" \\(+\\) \"football only\". The \"neither\" row belongs to no group.\n" +
        "- **A given ratio links two values:** if exports : imports \\(= p : q\\), then imports \\(=\\) exports \\(\\times \\frac{q}{p}\\).\n" +
        "- **Part to total:** add the whole column first, then write part : total.",
      formula: {
        label: "Recovering a value from a ratio",
        latex: "E : I = p : q \\;\\Rightarrow\\; I = E \\times \\frac{q}{p}",
        symbols: [
          { symbol: "E", meaning: "the value you know" },
          { symbol: "I", meaning: "the value you want" },
        ],
      },
      authoredExample: {
        prompt:
          "A club of 150 members is surveyed.\n\n| Category | Members |\n|---|---|\n| Play chess and carrom | 40 |\n| Play chess but not carrom | 55 |\n| Play carrom but not chess | 30 |\n| Play neither | 25 |\n\nWhat is the ratio of chess players to carrom players?",
        steps: [
          "Chess players \\(= 40 + 55 = 95\\).",
          "Carrom players \\(= 40 + 30 = 70\\).",
          "\\(95 : 70 = 19 : 14\\). Check: \\(40 + 55 + 30 + 25 = 150\\).",
        ],
        answer: "\\(19 : 14\\)",
      },
      selfCheckExample: {
        prompt:
          "The table shows research scholars in two departments.\n\n| Department | Total scholars | Women scholars |\n|---|---|---|\n| History | 64 | 24 |\n| Geography | 45 | 9 |\n\nWhat is the ratio of men scholars in History to men scholars in Geography?",
        steps: [
          "Men in History \\(= 64 - 24 = 40\\); men in Geography \\(= 45 - 9 = 36\\).",
          "\\(40 : 36 = 10 : 9\\).",
        ],
        answer: "\\(10 : 9\\)",
      },
      practiceSet: [
        { prompt: "A firm's exports were ₹84 lakh, and its exports and imports were in the ratio \\(4 : 3\\). Find its imports.", answer: "₹63 lakh" },
        { prompt: "A section has 70 students, and 21 of them are 1.60 m tall. What is the ratio of these students to the whole section?", answer: "\\(3 : 10\\)" },
        { prompt: "Of 90 people, 35 drink both tea and coffee and 25 drink only tea. How many drink tea?", answer: "60" },
        { prompt: "A company's exports were ₹45 lakh, and exports and imports were in the ratio \\(1 : 2\\). Find its imports.", answer: "₹90 lakh" },
      ],
      pyqExampleId: "65e11ac2-a4f4-4369-b2de-55e4f22ed6b6",
      traps: [
        {
          title: "Counting only the \"only\" row",
          body:
            "Everyone who plays football includes those who play football and basketball. The row \"football but not basketball\" is only part of the football players.",
        },
      ],
    },
  ],
};
