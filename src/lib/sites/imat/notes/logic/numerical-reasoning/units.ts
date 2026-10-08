import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_UNITS_NOTE: SubtopicNote = {
  subtopicName: "Averages, Units and Time",
  title: "Averages, Conversions, Clocks and Calendars",
  oneLineDefinition:
    "Work with totals rather than averages, convert every quantity to one unit before calculating, and count time in minutes and days of the week in sevens.",
  whyItMatters:
    "Costs from tariffs and energy prices, painting a room, repeating patrols, birthdays and delivery rounds appear across the Cambridge papers. They are rarely hard, but a slip with units or with hours and minutes gives one of the wrong options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-averages",
      name: "Mean and weighted mean in word problems",
      intuition:
        "An average hides a total. Multiply the mean by the number of items and you get back the total, and totals can be added, subtracted and compared. So almost every average question becomes: find the old total, find the new total, and look at the difference.",
      definition:
        "- **Mean** = total ÷ number of items, so **total = mean × number**.\n" +
        "- A **missing value** is the new total minus the old total.\n" +
        "- **Combining groups** of different sizes gives a **weighted mean**: each group's mean counts in proportion to its size. Averaging the two means is only right when the groups are equal in size.",
      formula: {
        label: "Weighted mean",
        latex: "\\bar{x} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}",
        symbols: [
          { symbol: "\\(n_1, n_2\\)", meaning: "the sizes of the two groups" },
          { symbol: "\\(\\bar{x}_1, \\bar{x}_2\\)", meaning: "the mean of each group" },
        ],
      },
      authoredExample: {
        prompt:
          "One class of 20 students has a mean mark of 62, and another class of 30 students has a mean of 72. What is the mean of all 50 students? Separately, a student's mean over four tests is 70. What must she score on the fifth test to raise her mean to 74?",
        steps: [
          "Totals: \\(20 \\times 62 = 1240\\) and \\(30 \\times 72 = 2160\\). Combined: \\(3400 / 50 = 68\\) (not 67, the mean of 62 and 72).",
          "Fifth test: the total must reach \\(5 \\times 74 = 370\\). She has \\(4 \\times 70 = 280\\), so she needs \\(370 - 280 = 90\\).",
        ],
        answer: "A mean of 68; she needs 90",
      },
      selfCheckExample: {
        prompt:
          "A student's mean score over five tests is 68. After a sixth test, her mean is 70. What did she score on the sixth test?",
        options: ["80", "72", "70", "69", "76"],
        steps: [
          "Old total: \\(5 \\times 68 = 340\\). New total: \\(6 \\times 70 = 420\\).",
          "Sixth score: \\(420 - 340 = 80\\).",
          "Option D averages 68 and 70. Option B adds the rise of 2 to the new mean. To lift six scores by 2 each, the new score must be 12 above the old mean.",
        ],
        answer: "(A) 80",
      },
      practiceSet: [
        { prompt: "Find the mean of 4, 7, 10 and 15.", answer: "9", method: "\\(36 / 4\\)" },
        { prompt: "Four friends have a mean age of 16. A fifth friend joins and the mean becomes 17. How old is the fifth friend?", answer: "21", method: "\\(85 - 64\\)" },
        { prompt: "A café sells 30 coffees at €1.50 and 20 at €2.50. What is the mean price of a coffee sold?", answer: "€1.90", method: "\\(95 / 50\\)" },
      ],
      traps: [
        {
          title: "Do not average two averages of unequal groups",
          body: "A class of 20 with mean 62 and a class of 30 with mean 72 have a combined mean of 68, not 67. The larger group pulls the combined mean towards its own mean. Always go back to the totals.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-units",
      name: "Unit and currency conversions",
      intuition:
        "A conversion factor is a fraction equal to 1, such as 1000 g over 1 kg. Multiplying by it changes the units but not the amount. Write the units next to every number and cancel them like letters; if the units left at the end are not the ones you want, the factor is upside down.",
      definition:
        "- Multiply by a factor that **cancels** the old unit and leaves the new one.\n" +
        "- **Area** factors are squared and **volume** factors are cubed: \\(1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2\\), \\(1\\ \\text{m}^3 = 1000\\ \\text{L}\\), \\(1\\ \\text{L} = 1000\\ \\text{cm}^3\\).\n" +
        "- **Energy cost**: power in kW × time in hours = energy in kWh; multiply by the price per kWh.\n" +
        "- **Currency**: if €1 buys \\(r\\) dollars, euros to dollars is × \\(r\\), dollars to euros is ÷ \\(r\\).",
      formula: {
        label: "Energy used by an appliance",
        latex: "E\\,(\\text{kWh}) = P\\,(\\text{kW}) \\times t\\,(\\text{h})",
        symbols: [
          { symbol: "\\(P\\)", meaning: "power; 1 kW = 1000 W" },
          { symbol: "\\(t\\)", meaning: "time switched on, in hours" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2,000 W heater runs for 90 minutes a day for 30 days. Electricity costs €0.25 per kWh. What does it cost to run?",
        steps: [
          "Power: 2,000 W = 2 kW. Time per day: 90 min = 1.5 h.",
          "Energy: \\(2 \\times 1.5 \\times 30 = 90\\) kWh.",
          "Cost: \\(90 \\times 0.25 = 22.50\\) euros.",
        ],
        answer: "€22.50",
      },
      selfCheckExample: {
        prompt:
          "One euro buys 1.08 US dollars. A tourist changes €250 into dollars, spends $190, and changes what is left back into euros at the same rate. How many euros does she get back?",
        options: ["€86.40", "€80.00", "€60.00", "€74.07", "€44.80"],
        steps: [
          "\\(250 \\times 1.08 = 270\\) dollars. After spending: \\(270 - 190 = 80\\) dollars.",
          "Back to euros: divide by the rate, \\(80 / 1.08 \\approx 74.07\\) euros.",
          "Option A multiplies instead of dividing. Option B forgets to convert. Option C subtracts dollars from euros as if they were the same currency.",
        ],
        answer: "(D) €74.07",
      },
      practiceSet: [
        { prompt: "How many seconds are there in 2.5 hours?", answer: "9000 s", method: "\\(2.5 \\times 3600\\)" },
        { prompt: "Convert 3.5 m² into cm².", answer: "35,000 cm²", method: "\\(\\times 100^2\\)" },
        { prompt: "A car travels 15 km per litre and fuel costs €1.80 per litre. What is the fuel cost per 100 km?", answer: "€12.00", method: "\\(100/15\\) litres at €1.80" },
        { prompt: "How many cm³ are there in 0.75 litres?", answer: "750 cm³", method: "1 L = 1000 cm³" },
      ],
      traps: [
        {
          title: "Area and volume factors are squared and cubed",
          body: "1 m = 100 cm, but 1 m² = 10,000 cm² and 1 m³ = 1,000,000 cm³. Using 100 for an area conversion gives an answer 100 times too small or too large.",
        },
        {
          title: "Exchange rates work in one direction at a time",
          body: "If €1 buys $1.08, then converting dollars back to euros means dividing by 1.08. Multiplying again makes the money grow on the way back, which cannot happen at the same rate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-time",
      name: "Time, clocks, calendars and repeating cycles",
      intuition:
        "Time is not decimal: there are 60 minutes in an hour, 24 hours in a day and 7 days in a week. The safe method is to convert to the smallest unit (minutes or days), calculate, and convert back. Things that repeat at different intervals line up again after the lowest common multiple of the intervals.",
      definition:
        "- **Clock time**: turn times into minutes after midnight, subtract, convert back. A journey past midnight adds 24 h (1440 min) to the arrival.\n" +
        "- **Days of the week** repeat every 7 days: \\(n\\) days later is the remainder of \\(n \\div 7\\) days later in the week.\n" +
        "- **Month lengths**: 30 days for April, June, September, November; 28 or 29 for February; 31 for the rest.\n" +
        "- **Leap years** are divisible by 4, except century years, which must be divisible by 400 (2000 was, 2100 is not).\n" +
        "- **Repeating cycles** coincide again after the **lowest common multiple** (LCM) of their periods.\n" +
        "- **Counting days**: from day 15 to day 20 is 5 days later but covers 6 dates if both ends count.",
      formula: {
        label: "Day of the week after n days",
        latex: "\\text{shift} = n \\bmod 7",
        symbols: [{ symbol: "\\(n \\bmod 7\\)", meaning: "the remainder when \\(n\\) is divided by 7" }],
      },
      authoredExample: {
        prompt:
          "Two shuttle buses leave a station together at 07:00. One returns to the station every 12 minutes, the other every 18 minutes. When are they next at the station together? Separately, if 1 March is a Tuesday, what day is 1 April?",
        steps: [
          "Multiples of 12: 12, 24, 36. Multiples of 18: 18, 36. The LCM is 36 minutes, so they meet again at 07:36.",
          "March has 31 days, and \\(31 = 4 \\times 7 + 3\\). So 1 April is 3 days of the week after Tuesday: Friday.",
        ],
        answer: "07:36; Friday",
      },
      selfCheckExample: {
        prompt: "Today is a Wednesday. What day of the week will it be 100 days from today?",
        options: ["Thursday", "Friday", "Saturday", "Monday", "Tuesday"],
        steps: [
          "\\(100 = 14 \\times 7 + 2\\), so 100 days is 14 whole weeks plus 2 days.",
          "Two days after Wednesday is Friday.",
          "Option A is one day short, which happens when today is counted as day 1. Option C uses a remainder of 3.",
        ],
        answer: "(B) Friday",
      },
      practiceSet: [
        { prompt: "A train leaves at 22:50 and arrives at 03:15 the next day. How long is the journey?", answer: "4 h 25 min", method: "70 min to midnight plus 3 h 15 min" },
        { prompt: "One light flashes every 6 s and another every 10 s. They flash together now. After how many seconds do they next flash together?", answer: "30 s", method: "LCM of 6 and 10" },
        { prompt: "How many days are there from 15 March to 2 May, counting 15 March but not 2 May?", answer: "48 days", method: "17 in March, 30 in April, 1 in May" },
        { prompt: "Is the year 2100 a leap year?", answer: "No", method: "A century year must be divisible by 400" },
      ],
      traps: [
        {
          title: "Hours are not decimals",
          body: "1.5 h is 1 h 30 min, not 1 h 50 min, and 2 h 50 min is about 2.83 h, not 2.5 h. Convert to minutes before adding or dividing times.",
        },
        {
          title: "Counting both ends",
          body: "A fence 30 m long with a post every 3 m has 10 gaps but 11 posts. A stay from the 3rd to the 7th is 4 nights but 5 dates. Decide whether the question counts gaps or end points.",
        },
      ],
    },
  ],
};
