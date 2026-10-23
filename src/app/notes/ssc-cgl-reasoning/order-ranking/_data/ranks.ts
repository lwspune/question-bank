import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ROR_RANKS_NOTE: SubtopicNote = {
  subtopicName: "Ranking and Position",
  title: "Ranking and Position",
  oneLineDefinition:
    "A person's place in a row counted from either end, the number of people between two places, and left and right for people facing a direction or a circle's centre.",
  whyItMatters:
    "Seven questions in the bank, all from the 2025 shifts: four on ranks in a row and three on seating. Each is one or two lines of arithmetic once the two ranks are counted from the same end, or once you know which way a seated person's right hand points.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrorrk-rank",
      name: "Rank from the left and from the right",
      intuition:
        "A person 9th from the left has 8 people on that side; 14th from the right, 13 on the other side. Add both sides and the person, and you have the whole row. Every rank question is that one picture.",
      definition:
        "- **Total in the row:** add the two ranks of one person and take away 1, because that person is counted in both.\n" +
        "- **Rank from the other end:** total minus the rank, plus 1.\n" +
        "- The same holds for top and bottom of a list, front and back of a queue, and a class ranked by marks.\n" +
        "- **A swap:** when two people interchange places, each takes the other's seat. So the new rank of one person, from either end, is the other person's old rank from that end.",
      formula: {
        label: "Ranks in a row",
        latex: "N = L + R - 1 \\qquad R = N - L + 1",
        symbols: [
          { symbol: "N", meaning: "number of people in the row" },
          { symbol: "L", meaning: "a person's position from the left" },
          { symbol: "R", meaning: "the same person's position from the right" },
        ],
      },
      authoredExample: {
        prompt: "In a row of girls, Tara is 9th from the left and 14th from the right. How many girls are in the row?",
        steps: [
          "Tara has 8 girls on her left and 13 on her right.",
          "Total \\(= 8 + 13 + 1 = 22\\), which is the same as \\(9 + 14 - 1\\).",
        ],
        answer: "22",
      },
      selfCheckExample: {
        prompt:
          "In a row of 25 people, P is 7th from the left and Q is 10th from the right. P and Q interchange their places. What is Q's new position from the right?",
        steps: [
          "After the swap, Q stands in P's old seat, which is 7th from the left.",
          "From the right that seat is \\(25 - 7 + 1 = 19\\)th.",
        ],
        answer: "19th from the right",
      },
      practiceSet: [
        { prompt: "Ravi is 11th from the left in a row of 40. What is his position from the right?", answer: "30th", method: "\\(40 - 11 + 1 = 30\\)." },
        { prompt: "Mona is 6th from the top and 15th from the bottom of a list. How many names are on the list?", answer: "20", method: "\\(6 + 15 - 1 = 20\\)." },
        { prompt: "In a class of 35 ranked by marks, Asha is 8th from the top. What is her rank from the bottom?", answer: "28th" },
        {
          prompt: "In a row, A is 5th from the left. A and B interchange their places. What is B's new position from the left?",
          answer: "5th",
          method: "B takes A's old seat.",
        },
      ],
      pyqExampleId: "e042a9b6-01a4-49be-aec8-e2476bb403e3",
      traps: [
        {
          title: "Adding the two ranks without taking away 1",
          body:
            "A person 5th from the left and 8th from the right is counted in both ranks, so the row has \\(5 + 8 - 1 = 12\\) people, not 13. The answer that forgets the 1 is usually among the options.",
        },
        {
          title: "Moving the ranks instead of the people",
          body:
            "In a swap, the seats stay where they are and the people move. Each person's new rank is the old rank of the seat they move into, counted from the same end as that old rank.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrorrk-between",
      name: "Counting the people between two ranks",
      intuition:
        "To count the people between two places, both places must be counted from the same end. Turn one rank round, subtract, and take away 1 for the person at the far end of the gap.",
      definition:
        "- **Same end:** if one person is \\(a\\)th and another \\(b\\)th from the left, the number between them is the difference of the ranks minus 1.\n" +
        "- **Different ends:** turn one rank round first. B, \\(R\\)th from the right in a row of \\(N\\), is \\((N - R + 1)\\)th from the left.\n" +
        "- **Fast route, different ends, no crossing:** if A is \\(L\\)th from the left and B is \\(R\\)th from the right, and \\(L + R\\) is less than \\(N\\), then \\(N - L - R\\) people stand between them.\n" +
        "- **Crossed:** if \\(L + R\\) is more than \\(N\\), B stands to the left of A, and \\(L + R - N - 2\\) people stand between them. Check which case you are in before using either rule.",
      formula: {
        label: "People between two ranks",
        latex: "\\text{same end: } |a - b| - 1 \\qquad \\text{opposite ends: } N - L - R \\qquad \\text{crossed: } L + R - N - 2",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the two positions, counted from the same end" },
          { symbol: "L", meaning: "A's position from the left" },
          { symbol: "R", meaning: "B's position from the right" },
          { symbol: "N", meaning: "number of people in the row" },
        ],
      },
      authoredExample: {
        prompt: "In a row of 45 students, Kabir is 12th from the left and Neel is 21st from the right. How many students are between them?",
        steps: [
          "Full method: Neel is \\(45 - 21 + 1 = 25\\)th from the left.",
          "Between the 12th and the 25th: \\(25 - 12 - 1 = 12\\).",
          "Fast route: \\(12 + 21 = 33\\) is less than 45, so \\(45 - 12 - 21 = 12\\).",
        ],
        answer: "12",
      },
      selfCheckExample: {
        prompt: "In a row of 30 people, X is 20th from the left and Y is 16th from the right. How many people are between them?",
        steps: [
          "Y is \\(30 - 16 + 1 = 15\\)th from the left, so Y is to the left of X.",
          "Between the 15th and the 20th: \\(20 - 15 - 1 = 4\\).",
          "Check with the crossed rule: \\(20 + 16 - 30 - 2 = 4\\).",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "In a line, A is 4th from the left and B is 11th from the left. How many people stand between them?", answer: "6" },
        {
          prompt: "In a row of 25, P is 7th from the left and Q is 9th from the right. How many people are between P and Q?",
          answer: "9",
          method: "\\(25 - 7 - 9 = 9\\).",
        },
        {
          prompt: "In a row of 20, M is 15th from the left and N is 12th from the right. How many people are between them?",
          answer: "5",
          method: "N is 9th from the left: \\(15 - 9 - 1 = 5\\).",
        },
        {
          prompt: "In a row, R is 10th from the left and S is 6th from the right, with R to the left of S and exactly 3 people between them. How many people are in the row?",
          answer: "19",
          method: "\\(10 + 3 + 6 = 19\\).",
        },
      ],
      pyqExampleId: "636209a0-7a04-44d6-9ede-ad00f2113b11",
      traps: [
        {
          title: "Subtracting ranks counted from different ends",
          body:
            "25th from the left and 20th from the right are not 5 places apart. Turn one rank round so both count from the same end, and only then subtract.",
        },
        {
          title: "Using the no-crossing rule after the two have crossed",
          body:
            "\\(N - L - R\\) works only when \\(L + R\\) is less than \\(N\\). If \\(L + R\\) is more than \\(N\\) the formula gives a negative number or a wrong count; use \\(L + R - N - 2\\) instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrorrk-seating",
      name: "Left and right in a row and around a circle",
      intuition:
        "Left and right belong to the seated person, not to you. Turn yourself to face the way they face, and their right is your right. For a circle, picture yourself in a seat looking at the centre.",
      definition:
        "- **A row facing north:** each person's right is east, which is the right side of a map. **Facing south:** their right is west, the map's left.\n" +
        "- **A circle facing the centre:** moving to a person's **left** is clockwise and to their **right** is anticlockwise, seen from above. Facing outward, both turn round.\n" +
        "- **'Second to the right'** means one person sits between them; 'immediate right' means next to them.\n" +
        "- **Opposite** in a circle of \\(n\\) evenly spaced seats is \\(n \\div 2\\) seats away.\n" +
        "- **Procedure:** number the seats, put the first named person in seat 1, place each clue by counting steps, and leave a clue with no placed person until one is placed.\n" +
        "- If the stem never says which way the person you count from is facing, the side cannot be fixed, and 'Cannot be determined' may be the answer.",
      authoredExample: {
        prompt:
          "Six friends P, Q, R, S, T and U sit around a round table facing the centre. Q is second to the left of P. R is opposite P. S is to the immediate left of R. T is to the immediate right of P. Who sits to the immediate left of P?",
        steps: [
          "Number the seats 1 to 6 clockwise, which is each person's left. Put P in seat 1.",
          "Q, second to the left of P: seat 3. R, opposite P: seat 4. S, immediate left of R: seat 5.",
          "T, immediate right of P, is one step anticlockwise: seat 6. U takes the last seat, 2.",
          "P's immediate left is seat 2.",
        ],
        answer: "U",
      },
      selfCheckExample: {
        prompt:
          "Five people A, B, C, D and E sit in a row facing north. B is at the extreme left end. D is second to the right of B. E is to the immediate right of D. A sits between B and D. Who sits at the extreme right end?",
        steps: [
          "Facing north, left to right on the page is left to right for them. B is in seat 1.",
          "D is in seat 3, E in seat 4, A in seat 2.",
          "Seat 5 is left for C.",
        ],
        answer: "C",
      },
      practiceSet: [
        { prompt: "A person faces north. Which compass direction is on their right?", answer: "East" },
        { prompt: "In a row where everyone faces south, is a person's right towards east or west?", answer: "West" },
        {
          prompt: "People sit around a circle facing the centre. Seen from above, is moving to a person's right clockwise or anticlockwise?",
          answer: "Anticlockwise",
        },
        { prompt: "Eight people sit evenly around a circle. How many seats away is the person opposite you?", answer: "4" },
      ],
      pyqExampleId: "7592f1b7-5aec-4f8e-8fdb-082b6df96434",
      traps: [
        {
          title: "Using the page's right for a person facing you",
          body:
            "For a person facing south, or facing the centre of a circle, their right is on the page's left. Turn yourself to face their way before you count.",
        },
        {
          title: "Leaving two people between for 'second to the right'",
          body:
            "Second to the right of A means one person sits between A and that seat. Third to the right means two between.",
        },
      ],
    },
  ],
};
