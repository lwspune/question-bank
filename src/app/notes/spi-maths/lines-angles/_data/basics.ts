import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LA_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Lines, Rays and Angle Pairs",
  title: "Lines, Rays and Angle Pairs",
  oneLineDefinition:
    "A line has no endpoints, a ray has one and a segment has two; two angles are complementary when they add to 90 degrees and supplementary when they add to 180 degrees.",
  whyItMatters:
    "Nine questions in the bank, seven of them EASY, and all three 2022 questions on this chapter are here. Most are one definition: what a line is, what congruent means, the complement of 30 degrees. The two harder 2022 questions are counting questions, and they are lost by counting too few.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spilaba-terms",
      name: "Lines, rays, segments and kinds of angle",
      intuition:
        "Geometry questions use a small set of words very exactly. A line, a ray and a segment differ only in their endpoints, and an angle is named by how it compares with 90 and 180 degrees.",
      definition:
        "Two facts settle the counting questions:\n" +
        "- **Opposite rays** start at the same point and go in opposite directions along one line. Every line through a point gives **one pair** of opposite rays at that point.\n" +
        "- **Congruent angles** have **equal measures**, so an angle congruent to \\(55^\\circ\\) is \\(55^\\circ\\).",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Line", "A straight path going on endlessly in both directions, with no endpoints"] },
          { cells: ["Line segment", "A part of a line with two endpoints"] },
          { cells: ["Ray", "A part of a line with one endpoint, going on endlessly in one direction"] },
          { cells: ["Opposite rays", "Two rays from one point going opposite ways along the same line"] },
          { cells: ["Congruent angles", "Angles with the same measure"] },
          { cells: ["Acute angle", "Less than 90°"] },
          { cells: ["Right angle", "Exactly 90°"] },
          { cells: ["Obtuse angle", "More than 90° and less than 180°"] },
          { cells: ["Straight angle", "Exactly 180°"] },
          { cells: ["Reflex angle", "More than 180° and less than 360°"] },
        ],
        caption: "Count opposite rays point by point: at each crossing point, one pair for every line through it.",
      },
      selfCheckExample: {
        prompt: "Three lines pass through one point. How many pairs of opposite rays do they make at that point?",
        steps: ["Each line through the point gives one pair of opposite rays there.", "Three lines give 3 pairs."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "How many endpoints does a ray have?", answer: "One" },
        { prompt: "An angle is congruent to an angle of \\(72^\\circ\\). What is its measure?", answer: "\\(72^\\circ\\)" },
        { prompt: "What kind of angle measures \\(200^\\circ\\)?", answer: "A reflex angle" },
        { prompt: "Two lines cross at a point. How many pairs of opposite rays are formed at that point?", answer: "2" },
      ],
      pyqExampleId: "b79cdfb0-4221-4b69-bf47-d7304bf5e27b",
      traps: [
        {
          title: "Counting one pair per line instead of per point",
          body: "A line through two marked crossing points gives a pair of opposite rays at each of them, so it counts twice. Go point by point and add.",
        },
        {
          title: "Reading congruent as supplementary",
          body: "Congruent angles are equal. An angle congruent to \\(120^\\circ\\) is \\(120^\\circ\\), not \\(60^\\circ\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilaba-pairs",
      name: "Complementary and supplementary angles",
      intuition:
        "Two angles that fill a right angle together are complementary; two that fill a straight angle are supplementary. Name the unknown angle x, write its partner as 90 minus x or 180 minus x, and the word problem becomes one equation.",
      definition:
        "- **Complementary**: the two angles add to \\(90^\\circ\\). The complement of \\(x\\) is \\(90^\\circ - x\\).\n" +
        "- **Supplementary**: the two angles add to \\(180^\\circ\\). The supplement of \\(x\\) is \\(180^\\circ - x\\).\n" +
        "- Supplementary angles need not sit side by side. Two neighbouring angles on a straight line are a **linear pair**, but any two angles adding to \\(180^\\circ\\) count, so a figure can have more supplementary pairs than linear pairs.\n" +
        "- When the value you find is not among the options, the answer is 'None of these'.",
      formula: {
        label: "Complement and supplement",
        latex: "\\text{complement of } x = 90^\\circ - x \\qquad \\text{supplement of } x = 180^\\circ - x",
      },
      authoredExample: {
        prompt: "An angle is twice its complement. Find the angle.",
        steps: [
          "Let the angle be \\(x\\). Its complement is \\(90 - x\\).",
          "\\(x = 2(90 - x)\\), so \\(x = 180 - 2x\\) and \\(3x = 180\\).",
          "\\(x = 60^\\circ\\). Check: the complement is \\(30^\\circ\\), and \\(60 = 2 \\times 30\\).",
        ],
        answer: "\\(60^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "Find the complement and the supplement of \\(38^\\circ\\).",
        steps: ["Complement: \\(90^\\circ - 38^\\circ = 52^\\circ\\).", "Supplement: \\(180^\\circ - 38^\\circ = 142^\\circ\\)."],
        answer: "\\(52^\\circ\\) and \\(142^\\circ\\)",
      },
      practiceSet: [
        { prompt: "What is the supplement of \\(65^\\circ\\)?", answer: "\\(115^\\circ\\)" },
        { prompt: "Two complementary angles are in the ratio 2 : 7. Find them.", answer: "\\(20^\\circ\\) and \\(70^\\circ\\)" },
        { prompt: "An angle is \\(30^\\circ\\) more than its supplement. Find the angle.", answer: "\\(x - (180 - x) = 30\\), so \\(x = 105^\\circ\\)" },
        { prompt: "An angle is equal to its complement. Find the angle.", answer: "\\(45^\\circ\\)" },
      ],
      pyqExampleId: "d8a468d2-31f8-42a5-8975-37d296ecca06",
      traps: [
        {
          title: "Mixing up complement and supplement",
          body: "Complementary angles add to \\(90^\\circ\\), supplementary angles to \\(180^\\circ\\). The complement of \\(30^\\circ\\) is \\(60^\\circ\\); \\(150^\\circ\\) is its supplement.",
        },
        {
          title: "Answering with the partner angle",
          body: "If an angle is five times its supplement, \\(x = 5(180 - x)\\) gives \\(x = 150^\\circ\\) and a supplement of \\(30^\\circ\\). The question asks for the angle, so the answer is \\(150^\\circ\\).",
        },
      ],
    },
  ],
};
