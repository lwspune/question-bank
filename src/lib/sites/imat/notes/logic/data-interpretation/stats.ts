import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DAT_STATS_NOTE: SubtopicNote = {
  subtopicName: "Statistics from Data",
  title: "Averages, Percentages and Change from Data",
  oneLineDefinition:
    "Find the mean, median and mode from a frequency table, and describe changes in data with absolute differences, percentage changes and shares of a total.",
  whyItMatters:
    "The 2024 paper asked for a percentage worked out from a frequency table. The Cambridge papers asked which category contributed most to a rise, which ratio was closest to a given one, and a fuel consumption from a logbook.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dat-frequency",
      name: "Mean, median and mode from a frequency table",
      intuition:
        "A frequency table is a compressed list: \"3 appears 6 times\" stands for six 3s. So the total of all values is each value times its frequency, added up, and the number of values is the sum of the frequencies. For the median, count along the frequencies until you reach the middle position.",
      definition:
        "For values \\(x\\) with frequencies \\(f\\):\n" +
        "- **Number of values** \\(n = \\sum f\\).\n" +
        "- **Mean** \\(= \\dfrac{\\sum f x}{\\sum f}\\).\n" +
        "- **Median**: the value in position \\(\\dfrac{n+1}{2}\\) when listed in order. Add the frequencies up (cumulative frequency) until you pass that position. For even \\(n\\), take the mean of the two middle values.\n" +
        "- **Mode**: the value with the **highest frequency** (the value, not the frequency itself).\n" +
        "- **Range**: largest value minus smallest value that actually occurs.\n" +
        "- **Proportion above a mark**: add the frequencies above it and divide by \\(n\\). Read \"higher than 5\" and \"5 or more\" carefully.\n" +
        "- For **grouped data** (10 to 20, 20 to 30), use each group's midpoint as \\(x\\); the mean is then an estimate.",
      formula: {
        label: "Mean of a frequency table",
        latex: "\\bar{x} = \\frac{\\sum f x}{\\sum f}",
        symbols: [
          { symbol: "\\(x\\)", meaning: "each value (or group midpoint)" },
          { symbol: "\\(f\\)", meaning: "how many times that value occurs" },
        ],
      },
      authoredExample: {
        prompt:
          "A class records how many siblings each student has:\n\n" +
          "| Siblings | 0 | 1 | 2 | 3 | 4 |\n" +
          "|---|---|---|---|---|---|\n" +
          "| Number of students | 5 | 9 | 7 | 3 | 1 |\n\n" +
          "Find the mean, median and mode.",
        steps: [
          "Students: \\(5 + 9 + 7 + 3 + 1 = 25\\).",
          "Total siblings: \\(0 \\times 5 + 1 \\times 9 + 2 \\times 7 + 3 \\times 3 + 4 \\times 1 = 36\\). Mean \\(= 36 / 25 = 1.44\\).",
          "Median: position \\((25 + 1)/2 = 13\\). Cumulative frequencies are 5, 14, ... so the 13th student has 1 sibling.",
          "Mode: 1 sibling (frequency 9).",
        ],
        answer: "Mean 1.44, median 1, mode 1",
      },
      selfCheckExample: {
        prompt:
          "Forty students record how many hours they slept last night:\n\n" +
          "| Hours of sleep | 5 | 6 | 7 | 8 | 9 |\n" +
          "|---|---|---|---|---|---|\n" +
          "| Number of students | 3 | 7 | 12 | 10 | 8 |\n\n" +
          "What is the mean number of hours, to one decimal place?",
        options: ["7.0", "8.0", "58.6", "7.5", "7.3"],
        steps: [
          "\\(\\sum f x = 15 + 42 + 84 + 80 + 72 = 293\\).",
          "Mean \\(= 293 / 40 = 7.325\\), which is 7.3 to one decimal place.",
          "Option C divides by the 5 columns instead of the 40 students. Option B is \\(40 / 5\\), a mean of the frequencies. Option D is the middle of the range 5 to 9.",
        ],
        answer: "(E) 7.3",
      },
      practiceSet: [
        { prompt: "A score of 1 occurs 4 times, 2 occurs 6 times and 3 occurs 10 times. What is the mean score?", answer: "2.3", method: "\\(46 / 20\\)" },
        { prompt: "15 values are listed in order. Which position holds the median?", answer: "The 8th", method: "\\((15 + 1)/2\\)" },
        { prompt: "In a frequency table, the value 4 has the highest frequency, 11. What is the mode?", answer: "4", method: "The mode is the value, not its frequency" },
      ],
      traps: [
        {
          title: "Divide by the number of values, not the number of columns",
          body: "A table with 5 columns can describe 40 people. The mean divides \\(\\sum f x\\) by \\(\\sum f\\) (40 here), never by the number of columns.",
        },
        {
          title: "The mode and median are values",
          body: "If the value 7 occurs 12 times, the mode is 7, not 12. The same goes for the median: it is the value in the middle position, not the frequency of that value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dat-change",
      name: "Percentage change, share and contribution from data",
      intuition:
        "There are three different ways to say which category \"grew most\": by the largest absolute rise, by the largest percentage rise, or by the largest contribution to the total rise. They can give three different answers, so decide which one the question means before calculating. A share is a percentage of the total at one moment; it can fall even while the amount itself rises.",
      definition:
        "- **Absolute change** = new \\(-\\) old (in the table's units).\n" +
        "- **Percentage change** = \\(\\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%\\).\n" +
        "- **Share** of a category = category ÷ total for the same year.\n" +
        "- **Contribution to a total rise** = the category's absolute change ÷ the total's absolute change.\n" +
        "- **Comparing ratios** (per person, per kg, per 100 km): compute the same ratio for every row, with the same units, before comparing.",
      formula: {
        label: "Percentage change and share",
        latex: "\\%\\ \\text{change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\% \\qquad \\text{share} = \\frac{\\text{part}}{\\text{total}}",
        symbols: [
          { symbol: "\\(\\text{old}, \\text{new}\\)", meaning: "the values at the start and end of the period" },
          { symbol: "\\(\\text{part}, \\text{total}\\)", meaning: "a category and the sum of all categories in the same year" },
        ],
      },
      authoredExample: {
        prompt:
          "A company's sales (units) in three regions:\n\n" +
          "| Region | 2020 | 2024 |\n" +
          "|---|---|---|\n" +
          "| North | 1,200 | 1,500 |\n" +
          "| South | 800 | 1,080 |\n" +
          "| East | 2,000 | 2,400 |\n" +
          "| Total | 4,000 | 4,980 |\n\n" +
          "Which region had the largest absolute rise, which the largest percentage rise, and what happened to East's share of total sales?",
        steps: [
          "Absolute rises: North 300, South 280, East 400. East has the largest.",
          "Percentage rises: North \\(300/1200 = 25\\%\\), South \\(280/800 = 35\\%\\), East \\(400/2000 = 20\\%\\). South has the largest.",
          "East's share: \\(2000/4000 = 50\\%\\) in 2020 and \\(2400/4980 \\approx 48\\%\\) in 2024. Its share fell although its sales rose.",
          "East also made the largest contribution to the total rise: \\(400/980 \\approx 41\\%\\) of it.",
        ],
        answer: "East (absolute); South (percentage); East's share fell from 50% to about 48%",
      },
      selfCheckExample: {
        prompt:
          "The number of beds in five hospital wards changed as follows:\n\n" +
          "| Ward | 2022 | 2025 |\n" +
          "|---|---|---|\n" +
          "| Ash | 40 | 50 |\n" +
          "| Birch | 25 | 35 |\n" +
          "| Cedar | 60 | 66 |\n" +
          "| Elm | 80 | 92 |\n" +
          "| Oak | 10 | 13 |\n\n" +
          "Which ward had the largest percentage increase in beds?",
        options: ["Ash", "Birch", "Cedar", "Elm", "Oak"],
        steps: [
          "Ash \\(10/40 = 25\\%\\), Birch \\(10/25 = 40\\%\\), Cedar \\(6/60 = 10\\%\\), Elm \\(12/80 = 15\\%\\), Oak \\(3/10 = 30\\%\\).",
          "Birch has the largest percentage increase.",
          "Elm (option D) gained the most beds, 12, but from a large starting number. Oak (option E) is tempting because its rise looks large next to its size, but 30% is less than 40%.",
        ],
        answer: "(B) Birch",
      },
      practiceSet: [
        { prompt: "Sales rise from 250 to 310. What is the percentage increase?", answer: "24%", method: "\\(60 / 250\\)" },
        { prompt: "A price index is 100 in 2020 and 118 in 2025. What is the percentage rise?", answer: "18%", method: "\\(18 / 100\\)" },
        { prompt: "A category is 15% of a total. The total doubles and the category becomes 20% of the new total. By what factor did the category itself grow?", answer: "About 2.7", method: "\\(0.20 \\times 2 / 0.15\\)" },
      ],
      traps: [
        {
          title: "Largest rise and largest percentage rise are different questions",
          body: "A big category can gain the most units while growing by the smallest percentage. Check whether the question asks for the change in units, the percentage change, or the share.",
        },
        {
          title: "A falling share is not a falling amount",
          body: "If the total grows faster than one category, that category's share falls even though it grew. Options saying \"East's sales fell\" from a smaller share are wrong.",
        },
      ],
    },
  ],
};
