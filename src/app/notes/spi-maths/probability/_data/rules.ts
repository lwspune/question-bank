import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PR_RULES_NOTE: SubtopicNote = {
  subtopicName: "Probability Rules and the Complement",
  title: "Probability Rules and the Complement",
  oneLineDefinition:
    "A probability always lies from 0 to 1, and the chance that an event does not happen is 1 minus the chance that it does.",
  whyItMatters:
    "Eleven questions in the bank, all EASY and all one line: which value cannot be a probability, and P(not E) from P(E). The printed wrong options are subtraction slips such as 53% for 1 minus 57%, so check the arithmetic, not the idea.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiprru-range",
      name: "Every probability lies from 0 to 1",
      intuition:
        "The favourable outcomes can never outnumber all the outcomes, and there can never be fewer than none, so the fraction is never below 0 or above 1.",
      definition:
        "- An **impossible event** has probability 0: a 7 on a die, a sum of 1 with two dice.\n" +
        "- A **sure event** has probability 1: a number from 1 to 6 on a die.\n" +
        "- Every other event lies strictly between: \\(0 < P(E) < 1\\).\n" +
        "- As a percentage the range is 0% to 100%. A decimal such as 0.05 or a percentage such as 5% is allowed; a negative value or anything above 1 is not.",
      formula: {
        label: "Range of a probability",
        latex: "0 \\le P(E) \\le 1",
      },
      authoredExample: {
        prompt: "Which of 0.7, 1.05, \\(\\frac{3}{4}\\) and 0% cannot be the probability of an event?",
        steps: [
          "0.7 and \\(\\frac{3}{4} = 0.75\\) lie between 0 and 1.",
          "0% is 0, the probability of an impossible event, so it is allowed.",
          "1.05 is greater than 1, so it cannot be a probability.",
        ],
        answer: "1.05",
      },
      selfCheckExample: {
        prompt: "\\(2x - 1\\) is the probability of an event. Between which values must \\(x\\) lie?",
        steps: [
          "\\(0 \\le 2x - 1 \\le 1\\).",
          "Add 1: \\(1 \\le 2x \\le 2\\). Divide by 2: \\(\\frac{1}{2} \\le x \\le 1\\).",
        ],
        answer: "\\(\\frac{1}{2} \\le x \\le 1\\)",
      },
      practiceSet: [
        { prompt: "What is the probability that the sun rises in the east tomorrow?", answer: "\\(1\\), a sure event" },
        { prompt: "What is the probability of getting a 7 on an ordinary die?", answer: "\\(0\\), an impossible event" },
        { prompt: "Can 120% be the probability of an event?", answer: "No: it is more than 1" },
        { prompt: "What is the greatest value a probability can take?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "cd847879-c4b3-4b26-a561-203807399a78",
      traps: [
        {
          title: "Reading a percentage as a whole number",
          body:
            "5% is 0.05, a valid probability. As a percentage a probability can be any value from 0 to 100, including decimals such as 12.5%.",
        },
        {
          title: "Allowing negative probabilities",
          body: "\\(-1 \\le P(E) \\le 1\\) is a printed wrong option. A probability is never negative, so the range starts at 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprru-complement",
      name: "The probability of an event not happening",
      intuition:
        "Every outcome either belongs to the event or does not, so the two chances share the whole of 1 between them. Find one and the other is what is left.",
      definition:
        "- 'Not E' is the **complement** of E: every outcome that is not in E.\n" +
        "- \\(P(E) + P(\\text{not } E) = 1\\), so \\(P(\\text{not } E) = 1 - P(E)\\).\n" +
        "- Losing is the complement of winning; failure is the complement of success.\n" +
        "- Work in one form throughout: \\(1 - 0.57 = 0.43\\), or \\(100\\% - 57\\% = 43\\%\\).",
      formula: {
        label: "Complement rule",
        latex: "P(\\text{not } E) = 1 - P(E)",
      },
      authoredExample: {
        prompt: "The probability of an event is 0.36. What is the probability that it does not happen?",
        steps: ["\\(P(\\text{not } E) = 1 - 0.36\\).", "\\(= 0.64\\)."],
        answer: "0.64",
      },
      selfCheckExample: {
        prompt: "The probability of rain tomorrow is \\(\\frac{3}{8}\\). What is the probability of no rain?",
        steps: ["\\(1 - \\frac{3}{8} = \\frac{5}{8}\\)."],
        answer: "\\(\\frac{5}{8}\\)",
      },
      practiceSet: [
        { prompt: "If P(E) = 0.2, what is P(not E)?", answer: "0.8" },
        { prompt: "If P(not E) = \\(\\frac{2}{3}\\), what is P(E)?", answer: "\\(\\frac{1}{3}\\)" },
        { prompt: "An event happens with probability 35%. What is the probability that it does not?", answer: "65%" },
        { prompt: "What is P(E) + P(not E) for any event E?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "c6b472a1-0d85-40e3-a6be-e14db2026494",
      traps: [
        {
          title: "Subtracting from 100 in the wrong column",
          body:
            "100% minus 57% is 43%, not 53%. Write the subtraction down: a slip in the tens digit is exactly what the wrong options print.",
        },
        {
          title: "Answering with the event instead of its complement",
          body:
            "When P(E) = 0.57 is given, 0.57 is often among the options. The question asks for 'not E', so the answer is the other part of 1.",
        },
      ],
    },
  ],
};
