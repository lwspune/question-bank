import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RDS_DS_NOTE: SubtopicNote = {
  subtopicName: "Data Sufficiency: One, Both or Neither",
  title: "Data Sufficiency: One, Both or Neither",
  oneLineDefinition:
    "A question and two statements: decide whether statement I alone, II alone, either, both together or neither gives a single sure answer.",
  whyItMatters:
    "14 questions in the Tier II bank, 4 EASY and 10 MODERATE. 'Neither' and 'both together' are answers as often as the single statements, so test every case rather than stopping at the first that seems to work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rdsds-seating",
      name: "Seating and line-up questions",
      intuition:
        "A statement is sufficient only if it leaves exactly one arrangement for the person asked about. Draw every arrangement the statement allows; if two of them give different answers, it is not enough.",
      definition:
        "The routine:\n" +
        "1. **Statement I alone:** draw all arrangements it allows. One answer? Then I is sufficient.\n" +
        "2. **Statement II alone:** the same test.\n" +
        "3. **Only if neither works alone:** combine them and test again.\n" +
        "- **Circle facing the centre:** your right is anticlockwise as seen from above; fix one person first.\n" +
        "- **Row facing north:** left and right are the reader's left and right.",
      authoredExample: {
        prompt:
          "P, Q, R and S sit in a row facing north. Who sits at the left end? I: Q sits at the right end. II: P sits immediately left of Q, and R is not at an end.",
        steps: [
          "I alone fixes Q but not the left end. II alone does not say where Q is.",
          "Together: Q is 4th, P is 3rd, R (not at an end) is 2nd, so S is at the left end.",
        ],
        answer: "Both statements together are needed.",
      },
      selfCheckExample: {
        prompt: "Who is the tallest of A, B and C? I: A is taller than B, and C is taller than A. II: B is the shortest.",
        steps: ["I gives C > A > B: C is tallest.", "II leaves A and C undecided."],
        answer: "Statement I alone is sufficient.",
      },
      practiceSet: [
        { prompt: "A statement allows two arrangements that give different answers. Is it sufficient?", answer: "No" },
        { prompt: "Each statement alone gives the same single answer. Which option is correct?", answer: "Either statement alone is sufficient" },
        { prompt: "When do you combine the two statements?", answer: "Only when neither works alone" },
      ],
      pyqExampleId: "f78c2485-2002-405f-99c8-7b08562a6976",
      traps: [
        {
          title: "Combining before testing each alone",
          body: "If statement I alone already answers the question, the answer is 'I alone', even though both together also work.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rdsds-other",
      name: "Codes, relations and numbers",
      intuition:
        "The same test works for any topic: does the statement pin down one answer? For a code, a word is fixed only when its code is the one that two sentences share and nothing else is shared.",
      definition:
        "- **Codes:** two coded sentences fix a word only if that word is the ONLY one they share.\n" +
        "- **Relations:** gender matters; 'Navya is the daughter' fixes a gender, 'the child' does not.\n" +
        "- **Numbers:** a percentage needs both the part and the total; a total alone is not enough.\n" +
        "- **Order:** to know who is last, every person must be placed, not just the top.",
      authoredExample: {
        prompt: "What is the code for 'sun'? I: 'sun is hot' is 'ka mo ri'. II: 'hot sun rises' is 'mo ri pe'.",
        steps: ["Together, 'sun' and 'hot' are both shared, and 'mo' and 'ri' are both shared.", "Nothing tells which of mo and ri is sun."],
        answer: "Neither: the statements together are not sufficient.",
      },
      selfCheckExample: {
        prompt: "How many boys are in a class of 40? I: There are 16 girls. II: Boys are 60% of the class.",
        steps: ["I: 40 − 16 = 24 boys.", "II: 60% of 40 = 24 boys."],
        answer: "Either statement alone is sufficient.",
      },
      practiceSet: [
        { prompt: "'red ball' is 'ti ko' and 'red cap' is 'ti su'. What is the code for 'red'?", answer: "ti (the only shared word and code)" },
        { prompt: "Is 'X is the parent of Y' enough to say whether X is Y's father?", answer: "No: X's gender is not given" },
        { prompt: "Is 'there are 7 blue and green marbles' enough to find the share of white marbles?", answer: "No: the total or the white count is needed" },
      ],
      pyqExampleId: "ae76fbc4-15c5-476a-97af-0ee438332fa7",
      traps: [
        {
          title: "Taking two shared words as solved",
          body: "When two sentences share two words and two codes, you cannot tell which code is which. That is 'not sufficient', not a guess.",
        },
      ],
    },
  ],
};
