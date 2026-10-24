import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Probability Basics and Rules",
  title: "Probability Basics: Equally Likely Outcomes and Three Rules",
  oneLineDefinition:
    "When every outcome is equally likely, probability is favourable outcomes over total outcomes; three rules (not, or, and) build new probabilities from known ones.",
  whyItMatters:
    "Every question in this chapter is this formula applied to something: a coin, a die, a deck or a bag. The questions on this page pick one number, ticket or person from a set, or use the three rules directly. Marks are lost on the count itself, such as forgetting that 1 is a perfect square or that a range includes both ends.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpr-equally-likely",
      name: "Favourable over total for one pick",
      intuition:
        "Pick one ticket from 20 tickets numbered 1 to 20. Every ticket is equally likely, so the chance of a multiple of 7 is the number of such tickets, 2 (7 and 14), out of 20: \\(\\tfrac{2}{20} = \\tfrac{1}{10}\\).",
      definition:
        "- The **sample space** is the list of every outcome that can happen. An **event** is the set of outcomes you want, the favourable ones.\n" +
        "- When every outcome is equally likely, \\(P(E) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}\\).\n" +
        "- A probability lies between 0 and 1: 0 for an impossible event, 1 for a certain one.\n" +
        "- Count with care: 1 is neither prime nor composite, 1 is a perfect square (\\(1 = 1^2\\)), and 'from 1 to 40' includes both ends.\n" +
        "- Reduce the fraction at the end, but look at the options first: they may print the unreduced form.",
      formula: {
        label: "Classical probability",
        latex: "P(E) = \\dfrac{n(E)}{n(S)}",
      },
      authoredExample: {
        prompt: "A number is chosen at random from 1 to 40. Find the probability that it is a multiple of 6.",
        steps: [
          "There are 40 equally likely numbers.",
          "The multiples of 6 are 6, 12, 18, 24, 30 and 36: 6 numbers.",
          "\\(P = \\tfrac{6}{40} = \\tfrac{3}{20}\\).",
        ],
        answer: "\\(\\tfrac{3}{20}\\).",
      },
      selfCheckExample: {
        prompt: "One student is chosen at random from a class of 18 boys and 12 girls. Find the probability that the student is a girl.",
        steps: ["There are \\(18 + 12 = 30\\) students, 12 of them girls.", "\\(P = \\tfrac{12}{30} = \\tfrac{2}{5}\\)."],
        answer: "\\(\\tfrac{2}{5}\\).",
      },
      practiceSet: [
        { prompt: "A number is chosen at random from 1 to 50. Find the probability that it is a perfect square.", answer: "\\(\\tfrac{7}{50}\\)", method: "1, 4, 9, 16, 25, 36, 49." },
        { prompt: "Out of 25 raffle tickets, 3 win a prize. Find the probability that a ticket picked at random wins.", answer: "\\(\\tfrac{3}{25}\\)" },
        { prompt: "A spinner has 9 equal sections numbered 1 to 9. Find the probability that it stops on an odd number.", answer: "\\(\\tfrac{5}{9}\\)" },
        { prompt: "A ball is drawn from 60 balls numbered 1 to 60. Find the probability that its number is a multiple of 8.", answer: "\\(\\tfrac{7}{60}\\)", method: "8, 16, ..., 56 is 7 numbers." },
      ],
      pyqExampleId: "466e2b45-31f5-4ceb-96ed-61bac161f761",
      traps: [
        {
          title: "1 is a perfect square",
          body: "From 1 to 30 the perfect squares are 1, 4, 9, 16 and 25: five numbers, so \\(\\tfrac{5}{30} = \\tfrac{1}{6}\\). Starting the list at 4 gives \\(\\tfrac{4}{30}\\).",
        },
        {
          title: "Read which ends are included",
          body: "'From 1 to 40' has 40 numbers. 'Between 1 and 40' can leave out both ends, which leaves 38. The total changes, so the answer does too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-rules",
      name: "Three rules: not, or for exclusive events, and for independent events",
      intuition:
        "Most probabilities are built from simpler ones. The chance that something does not happen is what is left of 1. Two events that cannot happen together add. Two events that do not affect each other multiply.",
      definition:
        "- **Complement**: \\(P(\\text{not } A) = 1 - P(A)\\).\n" +
        "- **Mutually exclusive** events cannot happen together, so \\(P(A \\text{ or } B) = P(A) + P(B)\\).\n" +
        "- If they can happen together, take the overlap off once: \\(P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)\\). Cards use this often, later in the chapter.\n" +
        "- **Independent** events do not affect each other, so \\(P(A \\text{ and } B) = P(A) \\times P(B)\\).\n" +
        "- For independent events, the chance that neither happens is \\((1 - P(A))(1 - P(B))\\), and at least one happens is 1 minus that.",
      formula: {
        label: "The three rules",
        latex:
          "P(\\text{not } A) = 1 - P(A); \\quad P(A \\text{ or } B) = P(A) + P(B) \\ (\\text{exclusive}); \\quad P(A \\text{ and } B) = P(A)\\,P(B) \\ (\\text{independent})",
      },
      authoredExample: {
        prompt:
          "Two independent events have \\(P(A) = 0.3\\) and \\(P(B) = 0.8\\). Find the probability that both happen, that neither happens, and that at least one happens.",
        steps: [
          "Both: \\(0.3 \\times 0.8 = 0.24\\).",
          "Neither: \\((1 - 0.3)(1 - 0.8) = 0.7 \\times 0.2 = 0.14\\).",
          "At least one: \\(1 - 0.14 = 0.86\\). Check: \\(0.3 + 0.8 - 0.24 = 0.86\\).",
        ],
        answer: "0.24, 0.14 and 0.86.",
      },
      selfCheckExample: {
        prompt:
          "A and B are mutually exclusive with \\(P(A) = 0.35\\) and \\(P(B) = 0.45\\). Find \\(P(A \\text{ or } B)\\) and the probability that neither happens.",
        steps: ["Exclusive events add: \\(0.35 + 0.45 = 0.8\\).", "Neither is the complement: \\(1 - 0.8 = 0.2\\)."],
        answer: "0.8 and 0.2.",
      },
      practiceSet: [
        { prompt: "The probability that it rains tomorrow is 0.15. What is the probability that it does not rain?", answer: "0.85" },
        { prompt: "Two independent events have probabilities 0.5 and 0.9. Find the probability that both happen.", answer: "0.45" },
        { prompt: "Two mutually exclusive events have probabilities \\(\\tfrac13\\) and \\(\\tfrac14\\). Find the probability that one of them happens.", answer: "\\(\\tfrac{7}{12}\\)" },
        { prompt: "A shooter hits a target with probability 0.8 on each shot, independently. Find the probability that he misses twice in a row.", answer: "0.04", method: "\\(0.2 \\times 0.2\\)." },
      ],
      pyqExampleId: "6bdcf091-58b7-454a-b25b-cd245fa55732",
      traps: [
        {
          title: "Adding when you should multiply",
          body: "For independent events with probabilities 0.4 and 0.9, 'both' is \\(0.4 \\times 0.9 = 0.36\\). Adding gives 1.3, which is more than 1 and cannot be a probability.",
        },
        {
          title: "Exclusive is not the same as independent",
          body: "Mutually exclusive events cannot both happen, so \\(P(A \\text{ and } B) = 0\\). Independent events can happen together. Multiplying the probabilities of exclusive events gives a number where the answer is 0.",
        },
      ],
    },
  ],
};
