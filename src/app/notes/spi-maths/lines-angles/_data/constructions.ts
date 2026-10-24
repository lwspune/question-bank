import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LA_CONSTRUCTIONS_NOTE: SubtopicNote = {
  subtopicName: "Constructions",
  title: "Constructions",
  oneLineDefinition:
    "With a ruler and compass you can divide a segment in any ratio m to n by marking m plus n equal steps, and you can build 60 degrees from an equilateral triangle and halve any angle you have.",
  whyItMatters:
    "Five questions in the bank, four EASY and one HARD. Nobody asks you to draw: they ask how many points to mark on the ray, or which angle a set of arcs makes, so learn the steps well enough to count them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilaco-divide",
      name: "Dividing a segment in a ratio",
      intuition:
        "To cut AB in the ratio m to n, draw a slanting ray from A and mark m plus n equal steps on it. Join the last mark to B and draw a parallel line through mark m. Parallel lines cut the two lines in the same ratio, so the parallel meets AB at the point you want.",
      definition:
        "- Draw a ray AX making an **acute angle** with AB.\n" +
        "- Mark \\(m + n\\) equal steps \\(A_1, A_2, \\ldots, A_{m+n}\\) on AX. This is the **least** number of points needed.\n" +
        "- Join \\(A_{m+n}\\) to B, and through \\(A_m\\) draw a line parallel to it. It meets AB at P, and \\(AP : PB = m : n\\).\n" +
        "- A ratio \\(m : n\\) splits the segment into \\(m + n\\) equal parts, so the pieces are \\(\\frac{m}{m+n}\\) and \\(\\frac{n}{m+n}\\) of the length.",
      formula: {
        label: "Dividing in the ratio m to n",
        latex: "\\text{points on the ray} = m + n \\qquad AP = \\frac{m}{m+n} \\times AB, \\quad PB = \\frac{n}{m+n} \\times AB",
      },
      authoredExample: {
        prompt: "AB is to be divided in the ratio 3 : 4. How many equal points are marked on the ray AX, which point is joined to B, and through which point is the parallel drawn?",
        steps: [
          "\\(3 + 4 = 7\\) points: \\(A_1\\) to \\(A_7\\).",
          "Join \\(A_7\\) to B.",
          "Draw the parallel to \\(A_7B\\) through \\(A_3\\). It cuts AB in the ratio 3 : 4.",
        ],
        answer: "7 points; join \\(A_7\\) to B; parallel through \\(A_3\\)",
      },
      selfCheckExample: {
        prompt: "A segment 14 cm long is divided in the ratio 3 : 4. Find the two parts.",
        steps: ["There are \\(3 + 4 = 7\\) equal parts of \\(\\frac{14}{7} = 2\\) cm.", "The parts are \\(3 \\times 2 = 6\\) cm and \\(4 \\times 2 = 8\\) cm."],
        answer: "6 cm and 8 cm",
      },
      practiceSet: [
        { prompt: "What is the least number of equal points marked on the ray to divide a segment in the ratio 4 : 9?", answer: "13" },
        { prompt: "A segment is divided in the ratio 1 : 3. Into how many equal parts is it cut?", answer: "4" },
        { prompt: "A segment 20 cm long is divided in the ratio 2 : 3. Find the two parts.", answer: "8 cm and 12 cm" },
        { prompt: "To divide AB in the ratio 2 : 5, \\(A_7\\) is joined to B. Through which point is the parallel drawn?", answer: "\\(A_2\\)" },
      ],
      pyqExampleId: "1d0218b8-25db-4ae6-b968-db1a6026a2ab",
      traps: [
        {
          title: "Marking only the larger number of points",
          body: "A ratio 5 : 9 needs \\(5 + 9 = 14\\) points, not 9. The ray must hold both parts of the ratio.",
        },
        {
          title: "Marking one point too few",
          body: "The steps are counted from A, so \\(m + n\\) steps need \\(m + n\\) marked points. 'm + n minus 1' is a printed wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spilaco-angles",
      name: "Angles you can build with a ruler and compass",
      intuition:
        "Two moves make every school construction: an equilateral triangle gives 60 degrees, and bisecting halves any angle you already have. Every angle in the table comes from those two moves.",
      definition:
        "- **60 degrees**: with the compass point on A draw an arc cutting the ray at D. With the same radius and the point on D, cut the arc at E. AD, AE and DE are equal, so triangle ADE is **equilateral** and the angle at A is \\(60^\\circ\\).\n" +
        "- **Bisecting** an angle halves it, and can be repeated.\n" +
        "- An angle with a half degree in it can still be built if it is half of an angle you can build.",
      table: {
        columns: ["Angle", "How it is built"],
        rows: [
          { cells: ["60°", "The equilateral arc construction"] },
          { cells: ["120°", "Two 60° steps along the same arc"] },
          { cells: ["90°", "Bisect the angle between the 60° and 120° marks"] },
          { cells: ["30°", "Bisect 60°"] },
          { cells: ["45°", "Bisect 90°"] },
          { cells: ["15°", "Bisect 30°"] },
          { cells: ["22½°", "Bisect 45°"] },
          { cells: ["135°", "90° plus half of the next 90°"] },
          { cells: ["67½°", "Bisect 135°"] },
          { cells: ["150°", "120° plus half of the last 60°"] },
          {
            cells: ["32½°", "Not by these steps"],
            noteAmber: "It is half of 65°, and 65° cannot be built from 60°, 90° and their halves.",
          },
        ],
        caption: "If an angle comes from 60° and 90° by adding, subtracting and halving, you can build it.",
      },
      selfCheckExample: {
        prompt: "Which angle do you get by bisecting an angle of \\(90^\\circ\\) twice?",
        steps: ["Once: \\(45^\\circ\\).", "Twice: \\(22\\frac{1}{2}^\\circ\\)."],
        answer: "\\(22\\frac{1}{2}^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Which angle do you get by bisecting an angle of \\(60^\\circ\\)?", answer: "\\(30^\\circ\\)" },
        { prompt: "How many times must you bisect \\(60^\\circ\\) to get \\(7\\frac{1}{2}^\\circ\\)?", answer: "3 times: 30, 15, then \\(7\\frac{1}{2}\\)" },
        { prompt: "Which of \\(15^\\circ\\), \\(25^\\circ\\) and \\(45^\\circ\\) cannot be built from \\(60^\\circ\\), \\(90^\\circ\\) and their halves?", answer: "\\(25^\\circ\\)" },
        { prompt: "Which angle do you get by bisecting an angle of \\(135^\\circ\\)?", answer: "\\(67\\frac{1}{2}^\\circ\\)" },
      ],
      pyqExampleId: "4b32ac40-9c1b-46c2-a30d-c25e8c23bead",
      traps: [
        {
          title: "Thinking a half degree makes an angle impossible",
          body: "\\(22\\frac{1}{2}^\\circ\\) is half of \\(45^\\circ\\) and \\(67\\frac{1}{2}^\\circ\\) is half of \\(135^\\circ\\), so both can be built.",
        },
        {
          title: "Thinking every half angle can be built",
          body: "Halving only works on an angle you can already build. \\(32\\frac{1}{2}^\\circ\\) is half of \\(65^\\circ\\), and \\(65^\\circ\\) does not come from \\(60^\\circ\\) and \\(90^\\circ\\).",
        },
      ],
    },
  ],
};
