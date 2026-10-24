import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RDC_OPPOSITE_NOTE: SubtopicNote = {
  subtopicName: "Opposite Faces of a Dice",
  title: "Opposite Faces of a Dice",
  oneLineDefinition:
    "Find the face opposite a given face from two or three views of the same dice, using the fact that a face touches four others and is opposite the one it never meets, or from a flat net of the cube.",
  whyItMatters:
    "Forty-one questions in the bank, 16 from the 2023 shifts and 25 from the 2024 shifts, with 23 EASY and 18 MODERATE. Nearly all fall to one rule about neighbours, which needs only a list of the faces seen together.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrdcop-neighbours",
      name: "The face that never appears beside it",
      intuition:
        "Every face of a cube touches four other faces and is opposite the sixth. Faces shown together in one view are never opposite. So list everything ever seen beside a face: once four neighbours are known, the face left over is its opposite.",
      definition:
        "1. For each view, write the three faces it shows. Any two of them are neighbours, never opposite.\n" +
        "2. Pick the face the question asks about (or one that appears in many views) and list all its neighbours.\n" +
        "3. When four different neighbours are listed, the sixth face is opposite it.\n" +
        "4. If you have fewer than four, find another face's opposite first and remove that pair.\n" +
        "- **Fast route:** start with the face that appears in the most views. It usually has four known neighbours at once.",
      authoredExample: {
        prompt:
          "Three views of a dice with faces A to F show (A, B, C), (A, D, E) and (B, F, E). Which face is opposite B?",
        steps: [
          "B is seen with A and C (view 1) and with F and E (view 3).",
          "B's four neighbours are A, C, E and F.",
          "The face left over is D, so D is opposite B.",
        ],
        answer: "D",
      },
      selfCheckExample: {
        prompt: "Two views of a dice numbered 1 to 6 show 3 with 1 and 5, and 3 with 2 and 6. Which number is opposite 3?",
        steps: ["3 is seen beside 1, 5, 2 and 6.", "The only number left is 4."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "How many faces of a cube touch any one face?", answer: "4" },
        { prompt: "Can two faces shown together in one view be opposite each other?", answer: "No" },
        { prompt: "On a dice numbered 1 to 6, the face 4 is seen beside 1, 2, 5 and 6. Which number is opposite 4?", answer: "3" },
        { prompt: "A face has only three known neighbours. What should you do?", answer: "Find another face's opposite first and remove that pair." },
      ],
      pyqExampleId: "83a25553-b7ec-4bd1-a1e4-7134d57eede2",
      traps: [
        {
          title: "Choosing a face from the same view",
          body:
            "The answer can never be a face shown beside the given face. Strike every option that appears with it in any view before you do anything else.",
        },
        {
          title: "Stopping at three neighbours",
          body:
            "With three neighbours known, two faces are still possible. Keep listing until you have four, or settle another opposite pair first.",
        },
        {
          title: "Assuming opposite faces add to 7",
          body:
            "On a common playing dice, opposite faces add to 7, but these questions never say the dice is a common one. Work only from the views given.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrdcop-nets",
      name: "Opposite faces in a net",
      intuition:
        "A net is the cube unfolded flat. Squares that share an edge in the net become neighbours on the cube. In a straight row, the squares two apart fold to opposite faces.",
      definition:
        "- **In a straight row or column of squares,** alternate squares are opposite: in a row of four A, B, C, D, A is opposite C and B is opposite D.\n" +
        "- **Two squares joined on one side** of the row (one above, one below) are opposite each other when they are separated by the row.\n" +
        "- **Squares that share an edge** in the net are never opposite.\n" +
        "- **Fast route:** find the longest straight line of squares and pair its alternate squares; the two squares left over are the last pair.",
      authoredExample: {
        prompt:
          "A net is a row of four squares A, B, C, D, with E above B and F below C. Which pairs of faces are opposite?",
        steps: [
          "In the row of four, alternate squares are opposite: A with C, and B with D.",
          "The two squares left, E and F, are opposite each other.",
        ],
        answer: "A and C, B and D, E and F",
      },
      selfCheckExample: {
        prompt:
          "A net has a column of four squares P, Q, R, U from top to bottom, with S to the left of Q and T to the right of Q. Which face is opposite S?",
        steps: [
          "In the column, P is opposite R and Q is opposite U.",
          "The two squares left over, S and T, are opposite each other.",
        ],
        answer: "T",
      },
      practiceSet: [
        { prompt: "In a straight row of three squares in a net, which two are opposite?", answer: "The first and the third" },
        { prompt: "Can two squares that share an edge in a net be opposite on the cube?", answer: "No" },
        { prompt: "In a row of four squares W, X, Y, Z, which face is opposite X?", answer: "Z" },
        { prompt: "How many pairs of opposite faces does a cube have?", answer: "3" },
      ],
      pyqExampleId: "d2ea8df0-90fe-406a-916c-a115a59c16bc",
      traps: [
        {
          title: "Pairing neighbours in the net",
          body:
            "Two squares side by side in the net fold to faces that share an edge. Opposite faces are two apart in a straight line, never next to each other.",
        },
        {
          title: "Counting two apart around a corner",
          body:
            "Two squares that both touch the same square, one on its side and one on its end, are two steps apart but meet at an edge when folded. Only squares two apart in a straight line are opposite.",
        },
      ],
    },
  ],
};
