import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PD_RANDOM_NOTE: SubtopicNote = {
  subtopicName: "Random Variables and Their Types",
  title: "Random Variables: Discrete and Continuous",
  oneLineDefinition:
    "A random variable gives one real number to every outcome of a random experiment; it is discrete when its values can be counted and continuous when its values fill an interval.",
  whyItMatters:
    "6 questions, all from the textbook and none from board papers so far: writing the possible values of a random variable (Exercise 7.1 Q.1 and Q.2, and the worked examples of 7.1 and 7.3.2) and naming a variable as discrete or continuous with its range (Miscellaneous Exercise 7). Every later page starts by writing the values of X, so this is the first line of most board answers in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmpd-variable",
      name: "Random variable, its range and the event X = x",
      intuition:
        "Often we do not care about the outcome of an experiment itself but about a number got from it: when two coins are tossed we may only want the number of heads. A rule that gives one real number to every outcome is a random variable. Its value changes from outcome to outcome, which is why it is a variable, and it comes from a random experiment, which is why it is random.",
      definition:
        "- A **random variable** is a real-valued function defined on the sample space \\(S\\) of a random experiment: \\(X : S \\to \\mathbb{R}\\).\n" +
        "- It is written with a capital letter (\\(X\\), \\(Y\\), \\(Z\\)); a particular value it takes is written with a small letter \\(x\\).\n" +
        "- The set of possible values of \\(X\\) is called the **range** of \\(X\\).\n" +
        "- The set of all outcomes for which \\(X\\) takes the value \\(x\\) is the event \\([X = x]\\).\n" +
        "- Every outcome gets exactly one value, but several outcomes may share a value.\n" +
        "- Several random variables can be defined on the same sample space, and their values may be negative or fractions.",
      formula: {
        label: "Random variable",
        latex: "X : S \\to \\mathbb{R}, \\qquad [X = x] = \\text{the set of outcomes whose value is } x",
      },
      authoredExample: {
        prompt:
          "A family has two children. Using \\(B\\) for a boy and \\(G\\) for a girl, write the sample space. Let \\(X\\) be the number of girls. Find \\(X\\) for every outcome, the range of \\(X\\) and the event \\([X = 1]\\).",
        steps: [
          "\\(S = \\{BB, BG, GB, GG\\}\\), where the first letter is the elder child.",
          "\\(X(BB) = 0\\), \\(X(BG) = 1\\), \\(X(GB) = 1\\), \\(X(GG) = 2\\).",
          "The range of \\(X\\) is \\(\\{0, 1, 2\\}\\).",
          "\\([X = 1] = \\{BG, GB\\}\\).",
        ],
        answer: "Range of \\(X\\) is \\(\\{0, 1, 2\\}\\) and \\([X = 1] = \\{BG, GB\\}\\)",
      },
      selfCheckExample: {
        prompt: "A die is thrown and \\(X\\) is the square of the number on the upper face. Write the range of \\(X\\).",
        steps: ["The faces are 1 to 6, so \\(X\\) takes the values \\(1^2, 2^2, \\ldots, 6^2\\)."],
        answer: "\\(\\{1, 4, 9, 16, 25, 36\\}\\)",
      },
      practiceSet: [
        { prompt: "Two coins are tossed and \\(X\\) is the number of tails. Write the event \\([X = 1]\\).", answer: "\\(\\{HT, TH\\}\\)" },
        { prompt: "A die is thrown. \\(X = 1\\) if the number is even and \\(X = 0\\) if it is odd. Write the range of \\(X\\).", answer: "\\(\\{0, 1\\}\\)" },
        { prompt: "Is a random variable a number or a function?", answer: "A function: it gives a real number to every outcome in the sample space" },
      ],
      pyqExampleId: "b9a625e0-1f7a-4fee-b1d2-6abafa85e527",
      traps: [
        {
          title: "Calling the outcome the value",
          body: "\\(HT\\) is an outcome; the value of \\(X\\) is the number given to it. Write \\(X(HT) = 1\\), not \\(X = HT\\).",
        },
        {
          title: "Missing a possible value",
          body: "Write out the outcomes first and read the value of \\(X\\) for each. The value 0 (no success at all) is the one most often left out of the range.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscmpd-types",
      name: "Discrete and continuous random variables",
      intuition:
        "Ask how a value of the variable is obtained. If you get it by counting (children, cars, defective bulbs), the variable is discrete. If you get it by measuring (height, weight, time, speed), it can take every value in an interval and is continuous.",
      definition:
        "- **Discrete:** the number of possible values is finite or countably infinite. The values are obtained by counting.\n" +
        "- **Continuous:** the possible values form an interval of real numbers. The values are obtained by measurement.\n" +
        "- A board answer names the type and writes the range: a list such as \\(\\{0, 1, 2, \\ldots\\}\\) for a discrete variable, an interval such as \\((0, \\infty)\\) for a continuous one.",
      table: {
        columns: ["Point", "Discrete random variable", "Continuous random variable"],
        rows: [
          { cells: ["Possible values", "Finite or countably infinite in number", "Every number of an interval"] },
          { cells: ["How a value is obtained", "By counting", "By measurement"] },
          {
            cells: [
              "Examples from the textbook",
              "Number of children in a family, number of cars sold by a dealer",
              "Heights of trees in a forest, daily temperature of a city, speed of a vehicle",
            ],
          },
          {
            cells: [
              "Probability is described by",
              "The probability mass function, which gives \\(P[X = x]\\) for each value",
              "The probability density function, whose area over an interval gives the probability",
            ],
          },
          { cells: ["Range written as", "A list, such as \\(\\{0, 1, 2, 3\\}\\)", "An interval, such as \\((0, 60)\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Is the time a student takes to run 1 km a discrete or a continuous random variable?",
        steps: ["Time is measured, and it can be any number in an interval."],
        answer: "Continuous",
      },
      practiceSet: [
        { prompt: "The number of goals scored in a football match: discrete or continuous?", answer: "Discrete, it is counted" },
        { prompt: "The amount of rain in a city in one day: discrete or continuous?", answer: "Continuous, it is measured" },
      ],
      pyqExampleId: "1acac7d8-614f-4efd-a708-ef16f1602790",
      traps: [
        {
          title: "Calling a rounded measurement discrete",
          body: "A weight written as 52 kg is still a measurement; the true value can be anything in an interval. The variable is continuous.",
        },
        {
          title: "Leaving out the range",
          body: "A question that says 'write down the range' carries marks for it. After naming the type, write the set of values or the interval.",
        },
      ],
    },
  ],
};
