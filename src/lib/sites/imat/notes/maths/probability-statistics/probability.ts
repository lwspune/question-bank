import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_PST_PROBABILITY_NOTE: SubtopicNote = {
  subtopicName: "Probability Rules",
  title: "Probability: Outcomes, Rules and Trees",
  oneLineDefinition:
    "Probability is favourable outcomes over equally likely outcomes; the addition rule handles 'or', multiplication handles 'and', and the second draw changes when nothing is put back.",
  whyItMatters:
    "Each ministry paper with a probability item used two dice (2023) or two balls drawn from a bag, with replacement (2024) or without (2026). An older question moved an object from one box to another before a second draw, which is a two-stage tree.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-pst-equally-likely",
      name: "Probability from equally likely outcomes, and the complement",
      intuition:
        "When every outcome is equally likely, probability is a fraction: how many outcomes you want out of how many there are. With two dice it pays to picture the 6 by 6 grid of 36 ordered pairs, because a 2 then a 5 is a different outcome from a 5 then a 2. When the event you want is messy, count what you do not want and subtract from 1.",
      definition:
        "- For **equally likely** outcomes: \\(P(A) = \\dfrac{\\text{number of outcomes in } A}{\\text{total number of outcomes}}\\).\n" +
        "- \\(0 \\le P(A) \\le 1\\): 0 means impossible, 1 means certain.\n" +
        "- **Complement**: \\(P(\\text{not } A) = 1 - P(A)\\). Use it for \"at least one\".\n" +
        "- Two dice give 36 equally likely **ordered** pairs; two coins give 4 (HH, HT, TH, TT).",
      formula: {
        label: "Equally likely outcomes",
        latex: "P(A) = \\frac{n(A)}{n(S)} \\qquad P(\\text{not } A) = 1 - P(A)",
        symbols: [
          { symbol: "\\(n(A)\\)", meaning: "number of outcomes in the event" },
          { symbol: "\\(n(S)\\)", meaning: "number of possible outcomes" },
        ],
      },
      authoredExample: {
        prompt: "Two fair dice are rolled. Find the probability that the total is 9, and the probability that at least one die shows a 6.",
        steps: [
          "Total 9: \\((3, 6), (4, 5), (5, 4), (6, 3)\\), 4 of the 36 pairs. \\(P = \\tfrac{4}{36} = \\tfrac{1}{9}\\).",
          "At least one 6: count the opposite. No 6 on either die: \\(5 \\times 5 = 25\\) pairs.",
          "\\(P = 1 - \\tfrac{25}{36} = \\tfrac{11}{36}\\).",
        ],
        answer: "\\(\\tfrac{1}{9}\\) and \\(\\tfrac{11}{36}\\)",
      },
      selfCheckExample: {
        prompt: "Two fair six-sided dice are rolled. What is the probability that the two scores differ by exactly 2?",
        options: ["\\(\\tfrac{1}{9}\\)", "\\(\\tfrac{4}{21}\\)", "\\(\\tfrac{2}{9}\\)", "\\(\\tfrac{1}{6}\\)", "\\(\\tfrac{5}{18}\\)"],
        steps: [
          "Pairs: \\((1,3), (3,1), (2,4), (4,2), (3,5), (5,3), (4,6), (6,4)\\): 8 ordered pairs.",
          "\\(P = \\tfrac{8}{36} = \\tfrac{2}{9}\\).",
          "A counts each pair once instead of in both orders; B also uses 21 unordered pairs, which are not equally likely; E is a difference of exactly 1; D is the chance of equal scores.",
        ],
        answer: "(C) \\(\\tfrac{2}{9}\\)",
      },
      practiceSet: [
        { prompt: "A card is drawn from a standard pack of 52. What is the probability it is a heart?", answer: "\\(\\tfrac{1}{4}\\)" },
        { prompt: "The probability of rain tomorrow is 0.35. What is the probability of no rain?", answer: "0.65" },
        { prompt: "A fair die is rolled. What is the probability of a prime number?", answer: "\\(\\tfrac{1}{2}\\)", method: "2, 3 and 5" },
        { prompt: "Two fair coins are tossed. What is the probability of at least one head?", answer: "\\(\\tfrac{3}{4}\\)", method: "\\(1 - \\tfrac{1}{4}\\)" },
      ],
      traps: [
        {
          title: "With two dice, (2, 5) and (5, 2) are different outcomes",
          body: "The 36 ordered pairs are equally likely; the 21 unordered pairs are not (a double can happen one way, a mixed pair two ways). Count ordered pairs, so a mixed pair counts twice and a double once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-addition",
      name: "The addition rule for 'A or B'",
      intuition:
        "Adding \\(P(A)\\) and \\(P(B)\\) counts the overlap, where both happen, twice, so you take it away once. Picture two overlapping circles in a box: the region covered by either circle is the two circles minus the lens they share. If the circles do not overlap, nothing is subtracted.",
      definition:
        "- **Addition rule**: \\(P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)\\).\n" +
        "- **Mutually exclusive** events cannot happen together: \\(P(A \\text{ and } B) = 0\\), so the probabilities simply add.\n" +
        "- \"Neither A nor B\" is the complement of \"A or B\": \\(1 - P(A \\text{ or } B)\\).",
      formula: {
        label: "Addition rule",
        latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        symbols: [
          { symbol: "\\(A \\cup B\\)", meaning: "A or B (or both)" },
          { symbol: "\\(A \\cap B\\)", meaning: "A and B together" },
        ],
      },
      authoredExample: {
        prompt: "A card is drawn from a standard pack of 52. What is the probability that it is a heart or a king?",
        steps: [
          "\\(P(\\text{heart}) = \\tfrac{13}{52}\\), \\(P(\\text{king}) = \\tfrac{4}{52}\\).",
          "The king of hearts is in both: \\(P(\\text{both}) = \\tfrac{1}{52}\\).",
          "\\(P = \\tfrac{13 + 4 - 1}{52} = \\tfrac{16}{52} = \\tfrac{4}{13}\\).",
        ],
        answer: "\\(\\tfrac{4}{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "In a school, 60% of students play football, 45% play tennis and 25% play both. A student is chosen at random. What is the probability that the student plays neither sport?",
        options: ["0.80", "0.25", "0.22", "0.20", "0.40"],
        steps: [
          "\\(P(\\text{F or T}) = 0.60 + 0.45 - 0.25 = 0.80\\).",
          "Neither: \\(1 - 0.80 = 0.20\\).",
          "A is the probability of at least one sport; B is both; C wrongly treats the sports as independent (\\(0.40 \\times 0.55\\)); E only removes the footballers.",
        ],
        answer: "(D) 0.20",
      },
      practiceSet: [
        { prompt: "A fair die is rolled. What is the probability of an even number or a number greater than 4?", answer: "\\(\\tfrac{2}{3}\\)", method: "Outcomes 2, 4, 5, 6" },
        { prompt: "A and B are mutually exclusive, \\(P(A) = 0.3\\), \\(P(B) = 0.5\\). Find \\(P(A \\text{ or } B)\\).", answer: "0.8" },
        { prompt: "\\(P(A) = 0.5\\), \\(P(B) = 0.4\\), \\(P(A \\text{ or } B) = 0.7\\). Find \\(P(A \\text{ and } B)\\).", answer: "0.2" },
        { prompt: "Can two events with \\(P(A) = 0.7\\) and \\(P(B) = 0.6\\) be mutually exclusive?", answer: "No", method: "Their sum would exceed 1" },
      ],
      traps: [
        {
          title: "Subtract the overlap when events can happen together",
          body: "\\(P(A) + P(B)\\) alone is right only for mutually exclusive events. If the sum comes out above 1, or the events clearly overlap (a heart and a king), subtract \\(P(A \\text{ and } B)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-independent",
      name: "Independent events and tree diagrams (with replacement)",
      intuition:
        "Two events are independent when one happening does not change the chance of the other: a coin has no memory. Then the chance of both is the product. A tree diagram draws each stage as branches; you multiply along a path and add the paths that give the result you want.",
      definition:
        "- A and B are **independent** if \\(P(A \\text{ and } B) = P(A) \\times P(B)\\).\n" +
        "- Repeated draws **with replacement** (the object is put back) are independent: every draw has the same probabilities.\n" +
        "- **Tree diagram**: one set of branches per stage, each labelled with its probability; the branches from one point add up to 1.\n" +
        "- Multiply **along** a path for \"this and then that\"; **add** separate paths for \"this way or that way\".\n" +
        "- \"Exactly one success in \\(n\\) tries\" has \\(n\\) paths, one for each position of the success.",
      formula: {
        label: "Independent events",
        latex: "P(A \\cap B) = P(A)\\,P(B)",
      },
      authoredExample: {
        prompt:
          "A basketball player scores each free throw with probability 0.8, independently. She takes two. Find the probability that she scores both, exactly one, and at least one.",
        steps: [
          "Both: \\(0.8 \\times 0.8 = 0.64\\).",
          "Exactly one: score then miss, or miss then score: \\(0.8 \\times 0.2 + 0.2 \\times 0.8 = 0.32\\).",
          "At least one: \\(1 - P(\\text{miss both}) = 1 - 0.2 \\times 0.2 = 0.96\\). Check: \\(0.64 + 0.32 = 0.96\\).",
        ],
        answer: "0.64, 0.32 and 0.96",
      },
      selfCheckExample: {
        prompt: "A spinner lands on red with probability \\(\\tfrac{1}{4}\\). It is spun three times, independently. What is the probability that it lands on red exactly once?",
        options: ["\\(\\tfrac{9}{64}\\)", "\\(\\tfrac{1}{4}\\)", "\\(\\tfrac{37}{64}\\)", "\\(\\tfrac{3}{4}\\)", "\\(\\tfrac{27}{64}\\)"],
        steps: [
          "One path, red then not red twice: \\(\\tfrac{1}{4} \\times \\tfrac{3}{4} \\times \\tfrac{3}{4} = \\tfrac{9}{64}\\).",
          "The red can come first, second or third: \\(3 \\times \\tfrac{9}{64} = \\tfrac{27}{64}\\).",
          "A counts only one order; C is \"at least once\" (\\(1 - \\tfrac{27}{64}\\)); B is a single spin.",
        ],
        answer: "(E) \\(\\tfrac{27}{64}\\)",
      },
      practiceSet: [
        { prompt: "A coin is tossed and a die is rolled. Probability of a head and a six?", answer: "\\(\\tfrac{1}{12}\\)" },
        { prompt: "Independent events have probabilities 0.3 and 0.5. Probability that both happen?", answer: "0.15" },
        {
          prompt: "A bag has 2 red and 3 white counters. One is drawn, replaced, and another drawn. Probability that both are white?",
          answer: "\\(\\tfrac{9}{25}\\)",
          method: "\\(\\tfrac{3}{5} \\times \\tfrac{3}{5}\\)",
        },
        { prompt: "A die is rolled three times. Probability of no six at all?", answer: "\\(\\tfrac{125}{216}\\)", method: "\\(\\left(\\tfrac{5}{6}\\right)^3\\)" },
      ],
      traps: [
        {
          title: "Exactly one needs every order",
          body: "\"Exactly one red in three spins\" is three different paths on the tree. Multiplying the probabilities along a single path gives only one of them; multiply by the number of orders.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-pst-conditional",
      name: "Conditional probability and drawing without replacement",
      intuition:
        "Once you know something has happened, you look only at the cases where it happened. Drawing without replacement is the everyday example: after one ball leaves the bag there is one ball fewer, and one fewer of its colour, so the second draw has new probabilities.",
      definition:
        "- \\(P(B \\mid A)\\), read \"the probability of B given A\", is the probability of B when A is known to have happened.\n" +
        "- \\(P(B \\mid A) = \\dfrac{P(A \\text{ and } B)}{P(A)}\\), so \\(P(A \\text{ and } B) = P(A) \\times P(B \\mid A)\\).\n" +
        "- **Without replacement**: the second draw's denominator is one less, and the numerator is one less if the first draw took that colour.\n" +
        "- From a two-way table, \\(P(B \\mid A)\\) is the count in both A and B divided by the count in A.\n" +
        "- If A and B are independent, \\(P(B \\mid A) = P(B)\\). In general \\(P(B \\mid A) \\ne P(A \\mid B)\\).",
      formula: {
        label: "Conditional probability",
        latex: "P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)}",
      },
      authoredExample: {
        prompt: "A bag holds 4 blue and 6 yellow marbles. Two are taken without replacement. Find the probability that both are blue, and that one of each colour is taken.",
        steps: [
          "Both blue: \\(\\tfrac{4}{10} \\times \\tfrac{3}{9} = \\tfrac{12}{90} = \\tfrac{2}{15}\\).",
          "Blue then yellow: \\(\\tfrac{4}{10} \\times \\tfrac{6}{9}\\); yellow then blue: \\(\\tfrac{6}{10} \\times \\tfrac{4}{9}\\). Each is \\(\\tfrac{24}{90}\\).",
          "One of each: \\(\\tfrac{48}{90} = \\tfrac{8}{15}\\).",
        ],
        answer: "\\(\\tfrac{2}{15}\\) and \\(\\tfrac{8}{15}\\)",
      },
      selfCheckExample: {
        prompt: "A box holds 9 pens, 3 of which are faulty. Two pens are taken at random without replacement. What is the probability that at least one of them is faulty?",
        options: ["\\(\\tfrac{7}{12}\\)", "\\(\\tfrac{5}{12}\\)", "\\(\\tfrac{5}{9}\\)", "\\(\\tfrac{1}{12}\\)", "\\(\\tfrac{1}{2}\\)"],
        steps: [
          "No faulty pen: \\(\\tfrac{6}{9} \\times \\tfrac{5}{8} = \\tfrac{30}{72} = \\tfrac{5}{12}\\).",
          "At least one faulty: \\(1 - \\tfrac{5}{12} = \\tfrac{7}{12}\\).",
          "B is the chance of no faulty pen; C draws with replacement (\\(1 - \\tfrac{4}{9}\\)); D is both faulty; E is exactly one faulty.",
        ],
        answer: "(A) \\(\\tfrac{7}{12}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A) = 0.5\\) and \\(P(A \\text{ and } B) = 0.2\\). Find \\(P(B \\mid A)\\).", answer: "0.4" },
        { prompt: "Two cards are drawn from 52 without replacement. Probability that both are aces?", answer: "\\(\\tfrac{1}{221}\\)", method: "\\(\\tfrac{4}{52} \\times \\tfrac{3}{51}\\)" },
        {
          prompt: "Of 200 students, 80 study biology, and 30 of those also study chemistry. A biology student is chosen. Probability that they study chemistry?",
          answer: "\\(\\tfrac{3}{8}\\)",
          method: "\\(30/80\\)",
        },
        { prompt: "If A and B are independent with \\(P(B) = 0.3\\), what is \\(P(B \\mid A)\\)?", answer: "0.3" },
      ],
      traps: [
        {
          title: "Without replacement, the second fraction changes",
          body: "After one draw the bag has one item fewer, so the second denominator drops by one. Keeping the same fraction for both draws answers the with-replacement question instead, and that answer is always among the options.",
        },
        {
          title: "P(B given A) is not P(A given B)",
          body: "The probability that a biology student studies chemistry is not the probability that a chemistry student studies biology: the two divide the same overlap by different totals.",
        },
      ],
    },
  ],
};
