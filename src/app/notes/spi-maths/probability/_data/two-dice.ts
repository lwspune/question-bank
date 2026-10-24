import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PR_TWO_DICE_NOTE: SubtopicNote = {
  subtopicName: "Two Dice and Calendar Pairs",
  title: "Two Dice and Calendar Pairs",
  oneLineDefinition:
    "Two dice give 36 equally likely ordered pairs; count the pairs that fit, or multiply the chances for each die.",
  whyItMatters:
    "Thirteen questions in the bank, one of them from the 2022 paper, and the chapter's MODERATE questions are mostly here. Sums, products, doublets and 'at least one six' all come from the same 6 by 6 grid, and the leap-year questions are the same idea with the two extra days as the pair.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiprtd-grid",
      name: "The 36 outcomes of two dice",
      intuition:
        "Write the first die down the side and the second across the top: 36 cells, each equally likely. (2, 5) and (5, 2) are different cells, which is why a sum of 7 has six ways and a sum of 2 has only one.",
      definition:
        "- Two dice give \\(6 \\times 6 = 36\\) ordered outcomes.\n" +
        "- A **doublet** shows the same number on both dice: (1, 1) to (6, 6), six outcomes.\n" +
        "- Ways to make each sum: 2 and 12 have 1 way, 3 and 11 have 2, 4 and 10 have 3, 5 and 9 have 4, 6 and 8 have 5, and 7 has 6.\n" +
        "- Sums run from 2 to 12, so a sum of 1 or 13 is impossible.\n" +
        "- For a product, list the factor pairs and count each order: \\(12 = 2 \\times 6 = 6 \\times 2 = 3 \\times 4 = 4 \\times 3\\), four ways.",
      formula: {
        label: "Ways to make a sum s with two dice",
        latex: "\\text{ways}(s) = 6 - |s - 7|, \\quad 2 \\le s \\le 12",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that the sum is 10 or more.",
        steps: [
          "Sum 10: \\(6 - 3 = 3\\) ways. Sum 11: 2 ways. Sum 12: 1 way.",
          "Favourable: \\(3 + 2 + 1 = 6\\) of 36.",
          "\\(P = \\frac{6}{36} = \\frac{1}{6}\\).",
        ],
        answer: "\\(\\frac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Two dice are thrown. Find the probability that the sum is a prime number.",
        steps: [
          "Prime sums from 2 to 12: 2, 3, 5, 7, 11.",
          "Ways: \\(1 + 2 + 4 + 6 + 2 = 15\\).",
          "\\(P = \\frac{15}{36} = \\frac{5}{12}\\).",
        ],
        answer: "\\(\\frac{5}{12}\\)",
      },
      practiceSet: [
        { prompt: "Two dice are thrown. What is the probability of a sum of 7?", answer: "\\(\\frac{6}{36} = \\frac{1}{6}\\)" },
        { prompt: "Two dice are thrown. What is the probability of a sum of 13?", answer: "\\(0\\)" },
        { prompt: "Two dice are thrown. What is the probability of a doublet of an even number?", answer: "\\(\\frac{3}{36} = \\frac{1}{12}\\)" },
        { prompt: "Two dice are thrown. What is the probability that the product is 6?", answer: "\\(\\frac{4}{36} = \\frac{1}{9}\\)" },
      ],
      pyqExampleId: "76fa210f-c365-4669-9a1b-8978c270a51d",
      traps: [
        {
          title: "Counting (2, 5) and (5, 2) once",
          body:
            "The dice are different, so every unequal pair appears twice in the 36. Only a doublet such as (3, 3) appears once.",
        },
        {
          title: "Counting a sum twice in 'divisible by 4 or 6'",
          body:
            "12 is divisible by both 4 and 6. List the sums that qualify (4, 6, 8, 12) and count each one once: \\(3 + 5 + 5 + 1 = 14\\) ways.",
        },
        {
          title: "'Between' leaves out the end values",
          body: "A product between 8 and 13 means 9, 10 or 12. Counting 8 as well adds two ways and gives a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprtd-and",
      name: "Both dice at once: multiply, or use the complement",
      intuition:
        "When the question is about each die separately, the two dice do not affect each other, so the chance that both things happen is the product of the two chances. 'At least one' is easiest from the other side: work out 'none' and take it from 1.",
      definition:
        "- \\(P(\\text{first does A and second does B}) = P(A) \\times P(B)\\) for two dice.\n" +
        "- **At least one** six \\(= 1 - P(\\text{no six on either}) = 1 - \\frac{5}{6} \\times \\frac{5}{6}\\).\n" +
        "- A product is odd only when both numbers are odd, so P(even product) \\(= 1 - \\frac{1}{2} \\times \\frac{1}{2}\\).\n" +
        "- Any multiplied answer can be checked by counting cells in the 36.",
      formula: {
        label: "Two independent dice",
        latex: "P(A \\text{ and } B) = P(A) \\times P(B) \\qquad P(\\text{at least one}) = 1 - P(\\text{none})",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that both show a number greater than 4.",
        steps: [
          "Each die shows 5 or 6 with probability \\(\\frac{2}{6} = \\frac{1}{3}\\).",
          "Both: \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\).",
          "Check: (5, 5), (5, 6), (6, 5), (6, 6) is 4 of 36.",
        ],
        answer: "\\(\\frac{1}{9}\\)",
      },
      selfCheckExample: {
        prompt: "Two dice are thrown. Find the probability that the first shows a 6 and the second an odd number.",
        steps: ["\\(\\frac{1}{6} \\times \\frac{3}{6} = \\frac{3}{36} = \\frac{1}{12}\\)."],
        answer: "\\(\\frac{1}{12}\\)",
      },
      practiceSet: [
        { prompt: "Two dice are thrown. What is the probability that both show even numbers?", answer: "\\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\)" },
        { prompt: "Two dice are thrown. What is the probability that neither shows a 5 or a 6?", answer: "\\(\\frac{4}{6} \\times \\frac{4}{6} = \\frac{4}{9}\\)" },
        { prompt: "Two dice are thrown. What is the probability that the first is even and the second greater than 4?", answer: "\\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\)" },
        { prompt: "Two dice are thrown. What is the probability that the sum is odd?", answer: "\\(\\frac{1}{2}\\): one odd and one even, \\(2 \\times \\frac{1}{4}\\)" },
      ],
      pyqExampleId: "72aebfef-046a-4947-980a-c8950047fb57",
      traps: [
        {
          title: "Adding instead of using the complement",
          body:
            "At least one six is not \\(\\frac{1}{6} + \\frac{1}{6} = \\frac{12}{36}\\): that counts (6, 6) twice. The right count is \\(1 - \\frac{25}{36} = \\frac{11}{36}\\).",
        },
        {
          title: "An even product needs only one even number",
          body:
            "The product of two dice is even unless both are odd. Counting only 'both even' gives \\(\\frac{1}{4}\\) instead of \\(\\frac{3}{4}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprtd-calendar",
      name: "Pairs of days: 53 Sundays and two visitors",
      intuition:
        "A leap year is 52 full weeks plus 2 extra days, so 52 of every weekday are certain. The question is only about the 2 extra days, which form one of 7 equally likely consecutive pairs.",
      definition:
        "- Leap year: 366 days \\(= 52\\) weeks \\(+ 2\\) days. The extra pair is one of (Sun, Mon), (Mon, Tue), ..., (Sat, Sun): 7 pairs.\n" +
        "- 53 of a given weekday: that day must be in the pair, and it is in exactly 2 of the 7, so \\(\\frac{2}{7}\\).\n" +
        "- Ordinary year: 365 days \\(= 52\\) weeks \\(+ 1\\) day, so 53 of a given weekday has probability \\(\\frac{1}{7}\\).\n" +
        "- Two people each choosing one of \\(d\\) days: \\(d \\times d\\) equally likely pairs, of which \\(d\\) are the same day.",
      formula: {
        label: "Two people choosing from d days",
        latex: "P(\\text{same day}) = \\frac{d}{d^2} = \\frac{1}{d} \\qquad P(\\text{different days}) = 1 - \\frac{1}{d}",
      },
      authoredExample: {
        prompt: "An ordinary year (not a leap year) is chosen at random. Find the probability that it has 53 Mondays.",
        steps: [
          "365 days \\(= 52\\) weeks \\(+ 1\\) day, so 52 Mondays are certain.",
          "The extra day is one of 7 weekdays, equally likely; it is a Monday in 1 case.",
        ],
        answer: "\\(\\frac{1}{7}\\)",
      },
      selfCheckExample: {
        prompt: "Two friends each choose a day from Monday to Saturday, all days equally likely. Find the probability that they choose the same day.",
        steps: ["\\(6 \\times 6 = 36\\) pairs, 6 of them the same day.", "\\(P = \\frac{6}{36} = \\frac{1}{6}\\)."],
        answer: "\\(\\frac{1}{6}\\)",
      },
      practiceSet: [
        { prompt: "How many days does a leap year have beyond 52 full weeks?", answer: "2" },
        { prompt: "A leap year is chosen at random. What is the probability that it has 53 Saturdays and 53 Sundays?", answer: "\\(\\frac{1}{7}\\): only the pair (Sat, Sun)" },
        { prompt: "Two people each choose a day of the week at random. What is the probability that the days are different?", answer: "\\(1 - \\frac{1}{7} = \\frac{6}{7}\\)" },
        { prompt: "How many equally likely pairs of extra days can a leap year have?", answer: "7" },
      ],
      pyqExampleId: "6e4a69e5-c42e-4fbc-9e03-1223e524380f",
      traps: [
        {
          title: "Answering 1/7 for a leap year",
          body:
            "A leap year has two extra days, and a given weekday falls in two of the seven possible pairs, so the answer is \\(\\frac{2}{7}\\). \\(\\frac{1}{7}\\) is the ordinary-year answer.",
        },
      ],
    },
  ],
};
