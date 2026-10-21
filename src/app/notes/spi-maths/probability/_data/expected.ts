import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PR_EXPECTED_NOTE: SubtopicNote = {
  subtopicName: "Experimental Probability and Expected Counts",
  title: "Experimental Probability and Expected Counts",
  oneLineDefinition:
    "From a record of trials, probability is how often the event happened over the number of trials; from a probability, the expected number is the probability times the total.",
  whyItMatters:
    "Five questions in the bank, all EASY, and each is one multiplication or division: a coin tossed 400 times, tickets in a lottery, ice creams or eggs in a lot. The traps are giving the count of the event when the question asks for the rest (good eggs, not bad ones) and dropping a decimal place.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiprex-experimental",
      name: "Experimental probability from a record of trials",
      intuition:
        "When you cannot list equally likely outcomes, you can still count what actually happened. The share of trials in which the event occurred is its experimental probability.",
      definition:
        "- Experimental probability \\(= \\dfrac{\\text{number of times the event happened}}{\\text{number of trials}}\\).\n" +
        "- It comes from data, so it need not equal the classical value: 225 heads in 400 tosses gives \\(\\frac{9}{16}\\), not \\(\\frac{1}{2}\\).\n" +
        "- The two experimental probabilities of an event and its complement still add to 1.",
      formula: {
        label: "Experimental probability",
        latex: "P(E) = \\frac{\\text{times } E \\text{ happened}}{\\text{total trials}}",
      },
      authoredExample: {
        prompt: "A die is thrown 300 times and a 6 comes up 45 times. Find the experimental probability of a 6.",
        steps: ["\\(\\frac{45}{300}\\).", "Divide top and bottom by 15: \\(\\frac{3}{20}\\)."],
        answer: "\\(\\frac{3}{20}\\)",
      },
      selfCheckExample: {
        prompt: "It rained on 40 of 250 days. Find the experimental probability of a dry day.",
        steps: ["Dry days: \\(250 - 40 = 210\\).", "\\(\\frac{210}{250} = \\frac{21}{25}\\)."],
        answer: "\\(\\frac{21}{25}\\)",
      },
      practiceSet: [
        { prompt: "A coin is tossed 50 times and shows 28 heads. What is the experimental probability of a tail?", answer: "\\(\\frac{22}{50} = \\frac{11}{25}\\)" },
        { prompt: "A batsman hit a boundary in 6 of 40 balls. What is the experimental probability that he hits one off the next ball?", answer: "\\(\\frac{6}{40} = \\frac{3}{20}\\)" },
        { prompt: "In 80 trials an event happened 20 times. What is the experimental probability that it does not happen?", answer: "\\(\\frac{60}{80} = \\frac{3}{4}\\)" },
      ],
      pyqExampleId: "1da7ee97-f2a9-4b7f-ac6f-700b9f0b65fc",
      traps: [
        {
          title: "Answering 1/2 for a recorded coin",
          body:
            "When the question gives the number of heads in a record of tosses, the answer comes from that record. A fair coin's \\(\\frac{1}{2}\\) is the classical value, not the experimental one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprex-expected",
      name: "Expected number from a probability",
      intuition:
        "A probability is a share. Multiply the share by the total and you get how many to expect; divide a known number by the total and you get the share back.",
      definition:
        "- Expected number \\(=\\) probability \\(\\times\\) total.\n" +
        "- Read which count is asked for: if P(bad) is given and the question wants the good ones, subtract from the total, or multiply by \\(1 - P(\\text{bad})\\).\n" +
        "- Working backwards: tickets held \\(=\\) P(win) \\(\\times\\) tickets sold.",
      formula: {
        label: "Expected count",
        latex: "\\text{expected number} = P(E) \\times \\text{total}",
      },
      authoredExample: {
        prompt: "The probability that a student is absent on a given day is 0.08. In a class of 50, how many students are expected to be absent?",
        steps: ["\\(0.08 \\times 50 = 4\\)."],
        answer: "4",
      },
      selfCheckExample: {
        prompt: "A die is thrown 120 times. How many times would you expect a 5?",
        steps: ["\\(P(5) = \\frac{1}{6}\\).", "\\(\\frac{1}{6} \\times 120 = 20\\)."],
        answer: "20",
      },
      practiceSet: [
        { prompt: "The probability that a ticket wins a prize is \\(\\frac{1}{40}\\). If 2000 tickets are sold, how many win?", answer: "50" },
        { prompt: "A fair coin is tossed 600 times. How many tails would you expect?", answer: "300" },
        { prompt: "A box of 200 balls gives a red ball with probability 0.35. How many red balls are in the box?", answer: "70" },
        { prompt: "Each ticket wins with probability \\(\\frac{3}{50}\\), and 9 tickets win. How many tickets were sold?", answer: "\\(9 \\div \\frac{3}{50} = 150\\)" },
      ],
      pyqExampleId: "ed065e9f-3682-466c-bb75-702f5e03be64",
      traps: [
        {
          title: "Giving the count of the event, not the one asked",
          body:
            "If P(bad egg) is 0.045 in 400 eggs, the bad eggs number 18. A question asking for the good eggs wants \\(400 - 18 = 382\\), and 18 is printed as a wrong option.",
        },
        {
          title: "Dropping a decimal place",
          body: "\\(0.055 \\times 600 = 33\\), not 3.3 or 330. Check the size: 0.055 is about one in twenty, and one twentieth of 600 is 30.",
        },
      ],
    },
  ],
};
