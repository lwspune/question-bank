import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ROR_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Ranks, Seats and Schedules",
  title: "Ranks, Seats and Schedules",
  oneLineDefinition:
    "Rank and count questions on a line, seating in a row or around a table, and puzzles that place people on days or in order of marks.",
  whyItMatters:
    "15 questions in the Tier II bank, 11 EASY and 4 MODERATE. Rank questions use one formula; seating and schedules need a quick drawing, and the clue that fixes a position exactly goes on it first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rorod-rank",
      name: "Ranks and counts in a line",
      intuition:
        "A person 7th from the top and 26th from the bottom is counted twice if you add the two ranks, so subtract one.",
      definition:
        "- **Total from two ranks:** top rank + bottom rank − 1.\n" +
        "- **Rank from the other end:** total − rank + 1.\n" +
        "- **People between two others:** total − (the two ranks counted from opposite ends) when they do not overlap; draw it when unsure.\n" +
        "- **Exactly between two people:** the middle person is the same distance from both.",
      formula: { label: "Total from both ends", latex: "N = r_{\\text{top}} + r_{\\text{bottom}} - 1" },
      authoredExample: {
        prompt: "Ravi is 9th from the top and 14th from the bottom of his class. How many students are there?",
        steps: ["Ravi is counted in both ranks.", "9 + 14 − 1 = 22."],
        answer: "22",
      },
      selfCheckExample: {
        prompt: "In a row of 30 people, Meena is 12th from the left. What is her position from the right?",
        steps: ["Position from the other end = total − rank + 1.", "30 − 12 + 1 = 19."],
        answer: "19th",
      },
      practiceSet: [
        { prompt: "Arun is 6th from the front and 11th from the back of a queue. How many are in the queue?", answer: "16" },
        { prompt: "In a row of 25, A is 8th from the left and B is 10th from the right. How many people stand between them?", answer: "7 (A at 8, B at 16 from the left)" },
        { prompt: "What is the rank from the bottom of the 1st student in a class of 40?", answer: "40th" },
      ],
      pyqExampleId: "30a6e6e7-58dc-41f3-a8a1-7f1c4539b728",
      traps: [
        {
          title: "Adding the two ranks without subtracting one",
          body: "7th from the top and 26th from the bottom gives 32 people, not 33: the person is counted in both ranks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rorod-seat",
      name: "Seating in a row or a circle",
      visualizationSlug: "imat-seating-circle",
      intuition:
        "Draw the seats first. In a row facing north, left and right are your own. Around a table facing the centre, a person's right is the next seat anticlockwise when you look down from above.",
      definition:
        "- **Start with a fixed clue:** 'at the left end', 'in the middle', 'opposite'.\n" +
        "- **Then attach neighbours:** 'immediately left of', 'second to the right of'.\n" +
        "- **Circle facing the centre:** right = anticlockwise, left = clockwise (seen from above).\n" +
        "- **A 'not' clue** ('E is not next to D') settles the last seat or two.",
      authoredExample: {
        prompt: "A, B, C, D and E sit in a row facing north. B is in the middle. A is immediately right of B. D is at the left end. E is not next to D. Who is at the right end?",
        steps: ["Seats 1 to 5 from the left: D is 1, B is 3, A is 4.", "E is not next to D, so E is not 2: E is 5 and C is 2."],
        answer: "E",
      },
      selfCheckExample: {
        prompt: "P, Q, R and S sit around a square table facing the centre. P is opposite R. Q is immediately to the right of P. Who is immediately to the left of P?",
        steps: ["P's two neighbours are Q and S (R is opposite).", "Q is on P's right, so S is on P's left."],
        answer: "S",
      },
      practiceSet: [
        { prompt: "In a row facing north, X is second to the right of Y. Is X nearer the right end than Y?", answer: "Yes" },
        { prompt: "Around a table facing the centre, which way is a person's right, seen from above?", answer: "Anticlockwise" },
        { prompt: "Six people sit around a table. How many people are opposite each person?", answer: "One" },
      ],
      pyqExampleId: "7ecc69de-49a5-4aca-a955-2c1b49133a1f",
      traps: [
        {
          title: "Using your own right in a circle",
          body: "People facing the centre have their right on the anticlockwise side. Turn the drawing in your head, or mark each person's right with an arrow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rorod-puzzle",
      name: "Schedules and orders of marks",
      intuition:
        "A week puzzle is a row of seven boxes, Monday to Sunday; a marks puzzle is a ladder from highest to lowest. Put down the clue that names an exact day or mark first, and the 'before, after, between' clues fall into place.",
      definition:
        "- **Draw the boxes:** days in order, or ranks from highest to lowest.\n" +
        "- **Exact clues first:** a named day ('on Thursday') or a named mark ('scored 65').\n" +
        "- **'Only N between two people'** usually leaves one or two places; try each.\n" +
        "- **Number clues** (a multiple of some number, a fixed sum) pick out one value.",
      authoredExample: {
        prompt: "A, B, C, D and E have exams Monday to Friday, one a day. C is on Wednesday. A is the day after C. D is on Tuesday and B is before D. On which day is E?",
        steps: ["C Wednesday, A Thursday, D Tuesday, B Monday.", "Only Friday is left."],
        answer: "Friday",
      },
      selfCheckExample: {
        prompt: "Four students scored 40, 55, 70 and 85. Ravi scored more than Sita but less than Om. Om did not score the highest. What did Lata score?",
        steps: ["Om > Ravi > Sita, and Om is not the top.", "So Om 70, Ravi 55, Sita 40, and Lata 85."],
        answer: "85",
      },
      practiceSet: [
        { prompt: "Seven talks run Monday to Sunday. Exactly three talks fall between X's and Y's. Y's is on Friday and X's is earlier. Which day is X's?", answer: "Monday" },
        { prompt: "B scored a multiple of 9 between 50 and 60, and B + D = 100. What did D score?", answer: "46 (B = 54)" },
        { prompt: "Which clue do you place first in a week puzzle?", answer: "One that names an exact day" },
      ],
      pyqExampleId: "257eb673-885d-4cb7-a918-69f4245a6c77",
      traps: [
        {
          title: "Counting the end days as 'between'",
          body: "'Only two days between P and R' means two days strictly between them. With R on Friday and P earlier, P is on Tuesday, not Wednesday.",
        },
      ],
    },
  ],
};
