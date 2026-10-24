import type { SubtopicNote } from "@/app/notes/_types";

export const AF_ST_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Mean and Standard Deviation",
  title: "The Mean, and How Far the Data Spread",
  oneLineDefinition:
    "Find the mean of a list or a frequency table, use how the mean moves when the data change, join the means of groups, and measure spread with the standard deviation.",
  whyItMatters:
    "The mean is the total divided by the count, and nearly every question here is solved by working with the total rather than the mean. Marks are lost by averaging two group means without weighting them by size, and by forgetting that a wrongly copied value changes the total but not the count.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afst-mean-list",
      name: "Mean of a list and of a frequency table",
      intuition:
        "The mean shares the total out equally: add the values and divide by how many there are. In a frequency table each value counts as many times as its frequency, so multiply each value by its frequency before adding.",
      definition:
        "- A list: \\(\\bar x = \\dfrac{\\sum x}{n}\\).\n" +
        "- A frequency table: \\(\\bar x = \\dfrac{\\sum f x}{\\sum f}\\). Divide by the total frequency, not by the number of rows.\n" +
        "- Grouped data: use the mid-point of each class as its value.\n" +
        "- A missing frequency: the total frequency gives one equation and the mean gives another. Solve the two together.\n" +
        "- Evenly spaced values such as \\(x, x + 3, x + 6\\) have their mean at the middle value.\n" +
        "- Values \\(y\\) and \\(\\tfrac 1y\\): work with their sum, using \\(y^2 + \\tfrac{1}{y^2} = \\left(y + \\tfrac 1y\\right)^2 - 2\\) and \\(y^3 + \\tfrac{1}{y^3} = \\left(y + \\tfrac 1y\\right)^3 - 3\\left(y + \\tfrac 1y\\right)\\).",
      formula: {
        label: "Mean of a frequency table",
        latex: "\\bar x = \\dfrac{\\sum f x}{\\sum f}",
      },
      authoredExample: {
        prompt: "The values 1, 2, 3 and 4 occur with frequencies 3, 5, 8 and 4. Find the mean.",
        steps: [
          "\\(\\sum f = 3 + 5 + 8 + 4 = 20\\).",
          "\\(\\sum fx = 3 + 10 + 24 + 16 = 53\\).",
          "\\(\\bar x = \\dfrac{53}{20} = 2.65\\).",
        ],
        answer: "\\(2.65\\).",
      },
      selfCheckExample: {
        prompt: "The values 0, 1, 2 and 3 have frequencies 2, \\(p\\), 6 and 4, and the mean is 1.8. Find \\(p\\).",
        steps: [
          "\\(\\sum f = 12 + p\\) and \\(\\sum fx = 0 + p + 12 + 12 = 24 + p\\).",
          "\\(\\dfrac{24 + p}{12 + p} = 1.8\\), so \\(24 + p = 21.6 + 1.8p\\).",
          "\\(2.4 = 0.8p\\), so \\(p = 3\\). Check: \\(\\tfrac{27}{15} = 1.8\\).",
        ],
        answer: "\\(p = 3\\).",
      },
      practiceSet: [
        { prompt: "Find the mean of 12, 15, 18, 21 and 24.", answer: "\\(18\\)" },
        { prompt: "The mean of \\(x, x + 3, x + 6\\) and \\(x + 9\\) is 14. Find \\(x\\).", answer: "\\(9.5\\)", method: "\\(4x + 18 = 56\\)." },
        {
          prompt: "The classes 0-10, 10-20 and 20-30 have frequencies 2, 5 and 3. Find the mean, using the mid-points.",
          answer: "\\(16\\)",
          method: "\\(\\dfrac{5 \\times 2 + 15 \\times 5 + 25 \\times 3}{10}\\).",
        },
        {
          prompt: "The mean of \\(y\\) and \\(\\tfrac 1y\\) is 3. Find the mean of \\(y^2\\) and \\(\\tfrac{1}{y^2}\\).",
          answer: "\\(17\\)",
          method: "\\(y + \\tfrac 1y = 6\\), so \\(y^2 + \\tfrac{1}{y^2} = 34\\).",
        },
      ],
      pyqExampleId: "1760800c-350c-4065-ba62-e2e07d315111",
      traps: [
        {
          title: "Divide by the total frequency",
          body: "For the values 1 to 4 with frequencies 3, 5, 8 and 4, divide \\(\\sum fx\\) by 20, the total frequency. Dividing by 4, the number of different values, gives a mean five times too big.",
        },
        {
          title: "A class counts at its mid-point",
          body: "The class 10-20 enters the sum as 15. Using 10 or 20 moves every class the same way and shifts the mean by half a class width.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-mean-properties",
      name: "How the mean moves when the data change",
      intuition:
        "Because the mean is the total over the count, any change to the data is a change to the total. Add the same number to every value and the mean moves by that number. Correct one wrongly copied value and the total moves by the error while the count stays the same.",
      definition:
        "- Adding \\(k\\) to every value adds \\(k\\) to the mean. Multiplying every value by \\(k\\) multiplies the mean by \\(k\\).\n" +
        "- A value \\(b\\) copied as \\(a\\): the correct total is \\(n\\bar x - a + b\\). Divide by the same \\(n\\).\n" +
        "- The deviations from the mean add to zero: \\(\\sum f(x - \\bar x) = 0\\).\n" +
        "- Bounds: if a new value can be no lower than 0, the new mean of \\(n + 1\\) values is at least the old total divided by \\(n + 1\\).",
      formula: {
        label: "Correcting a wrong value",
        latex: "\\bar x_{\\text{correct}} = \\dfrac{n \\bar x - a + b}{n}",
      },
      authoredExample: {
        prompt: "The mean of 40 observations is 35. One value, 62, was copied as 26. Find the correct mean.",
        steps: [
          "The recorded total is \\(40 \\times 35 = 1400\\).",
          "The correct total is \\(1400 - 26 + 62 = 1436\\).",
          "The correct mean is \\(\\dfrac{1436}{40} = 35.9\\).",
        ],
        answer: "\\(35.9\\).",
      },
      selfCheckExample: {
        prompt:
          "When 6 is subtracted from every observation, the mean becomes 70% of what it was. Find the original mean, and the mean if every observation were doubled instead.",
        steps: [
          "\\(m - 6 = 0.7m\\), so \\(0.3m = 6\\) and \\(m = 20\\).",
          "Doubling every value doubles the mean.",
        ],
        answer: "\\(20\\); \\(40\\).",
      },
      practiceSet: [
        { prompt: "The mean of 8 numbers is 15. Each number is increased by 4. Find the new mean.", answer: "\\(19\\)" },
        { prompt: "The deviations of four values from their mean are \\(-3\\), 1, 4 and \\(d\\). Find \\(d\\).", answer: "\\(-2\\)" },
        { prompt: "The mean of 20 values is 30. One value, 45, should have been 25. Find the correct mean.", answer: "\\(29\\)" },
        {
          prompt: "A student scores 60%, 70% and 86% in three papers. What is the lowest possible average over four papers?",
          answer: "54%",
          method: "The fourth paper scores 0 at worst: \\(216 \\div 4\\).",
        },
      ],
      pyqExampleId: "ffd3bf98-fc87-4e2f-8237-6f69ac0dfe34",
      traps: [
        {
          title: "A wrong value does not change the count",
          body: "Fixing a miscopied value changes the total only. Divide the corrected total by the same number of observations, not by one fewer.",
        },
        {
          title: "Adding and multiplying act differently",
          body: "Adding 3 to every value adds 3 to the mean; multiplying every value by 3 triples it. Applying the adding rule to a multiplication, or the other way round, is the usual slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-combined-mean",
      name: "Combined mean of groups",
      intuition:
        "Two groups' means cannot simply be averaged unless the groups are the same size. Turn each mean back into a total, add the totals, and divide by the number in all the groups together.",
      definition:
        "- \\(\\bar x = \\dfrac{n_1 \\bar x_1 + n_2 \\bar x_2 + \\dots}{n_1 + n_2 + \\dots}\\).\n" +
        "- A missing group mean: the total of everyone, less the totals of the known groups, divided by the size of the missing group.\n" +
        "- The combined mean lies between the group means, nearer the mean of the larger group.",
      formula: {
        label: "Combined mean",
        latex: "\\bar x = \\dfrac{n_1 \\bar x_1 + n_2 \\bar x_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "A class has 24 boys averaging 62 marks and 16 girls averaging 72 marks. Find the class average.",
        steps: [
          "Boys' total: \\(24 \\times 62 = 1488\\). Girls' total: \\(16 \\times 72 = 1152\\).",
          "The class total is 2,640 for 40 students.",
          "\\(\\dfrac{2640}{40} = 66\\).",
        ],
        answer: "\\(66\\).",
      },
      selfCheckExample: {
        prompt: "The mean weight of 30 crates is 18 kg. Twelve of them average 15 kg. Find the mean weight of the other 18.",
        steps: [
          "All 30 crates weigh \\(30 \\times 18 = 540\\) kg; the twelve weigh \\(12 \\times 15 = 180\\) kg.",
          "The other 18 weigh 360 kg, so their mean is \\(360 \\div 18 = 20\\) kg.",
        ],
        answer: "20 kg.",
      },
      practiceSet: [
        { prompt: "Group A has 5 values with mean 12 and group B has 15 values with mean 8. Find the combined mean.", answer: "\\(9\\)" },
        { prompt: "Three groups of sizes 10, 20 and 30 have means 4, 5 and 6. Find the combined mean.", answer: "\\(\\tfrac{16}{3}\\)", method: "\\(\\tfrac{40 + 100 + 180}{60}\\)." },
        { prompt: "The mean of 12 numbers is 9 and the mean of the first 7 is 8. Find the mean of the last 5.", answer: "\\(10.4\\)" },
      ],
      pyqExampleId: "a503c6f4-2c00-404c-88ae-4015ddbea28a",
      traps: [
        {
          title: "Do not average the averages",
          body: "A group of 10 with mean 20 and a group of 30 with mean 40 combine to \\(\\tfrac{200 + 1200}{40} = 35\\), not 30. The larger group pulls the mean its way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-standard-deviation",
      name: "Spread: range, variance and standard deviation",
      intuition:
        "Two sets can share a mean and still spread very differently. The range looks only at the two ends; the standard deviation uses how far every value sits from the mean.",
      definition:
        "- **Range** is the highest value minus the lowest.\n" +
        "- **Variance** is the mean of the squared deviations, \\(\\sigma^2 = \\dfrac{\\sum (x - \\bar x)^2}{n}\\). The **standard deviation** \\(\\sigma\\) is its square root.\n" +
        "- Shortcut: \\(\\sigma^2 = \\dfrac{\\sum x^2}{n} - \\bar x^2\\).\n" +
        "- Adding \\(k\\) to every value leaves \\(\\sigma\\) unchanged. Multiplying every value by \\(k\\) multiplies \\(\\sigma\\) by \\(|k|\\).",
      formula: {
        label: "Standard deviation",
        latex: "\\sigma = \\sqrt{\\dfrac{\\sum (x - \\bar x)^2}{n}}",
      },
      authoredExample: {
        prompt: "Find the standard deviation of 2, 4, 4, 4, 5, 5, 7 and 9.",
        steps: [
          "The mean is \\(\\dfrac{40}{8} = 5\\).",
          "The squared deviations are 9, 1, 1, 1, 0, 0, 4 and 16, which total 32.",
          "The variance is \\(\\dfrac{32}{8} = 4\\), so \\(\\sigma = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find the range and the standard deviation of 1, 3, 5 and 7.",
        steps: [
          "The range is \\(7 - 1 = 6\\).",
          "The mean is 4 and the squared deviations are 9, 1, 1 and 9, which total 20.",
          "The variance is \\(\\dfrac{20}{4} = 5\\), so \\(\\sigma = \\sqrt 5 \\approx 2.24\\).",
        ],
        answer: "Range 6; \\(\\sigma = \\sqrt 5 \\approx 2.24\\).",
      },
      practiceSet: [
        { prompt: "Find the range of 14, 3, 22, 9 and 17.", answer: "\\(19\\)" },
        { prompt: "A set has standard deviation 4. Find it after 10 is added to every value.", answer: "\\(4\\)" },
        { prompt: "A set has standard deviation 3. Find it after every value is multiplied by 5.", answer: "\\(15\\)" },
        { prompt: "Find the variance of 6, 6, 6 and 6.", answer: "\\(0\\)" },
      ],
      pyqExampleId: "e8fb00de-b228-4469-9632-3a99bd0b5041",
      traps: [
        {
          title: "Adding a constant does not change the spread",
          body: "Adding 10 to every value moves the mean by 10, but every distance from the mean stays the same, so \\(\\sigma\\) does not change.",
        },
        {
          title: "Take the square root at the end",
          body: "A variance of 20 is not the standard deviation. \\(\\sigma = \\sqrt{20} \\approx 4.47\\).",
        },
      ],
    },
  ],
};
