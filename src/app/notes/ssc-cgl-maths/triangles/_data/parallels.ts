import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_PARALLELS_NOTE: SubtopicNote = {
  subtopicName: "Parallels, Midpoints and the Bisector Theorem",
  title: "Parallels, Midpoints and the Bisector Theorem",
  oneLineDefinition:
    "Draw a line parallel to a side and the other two sides are divided proportionally; join two midpoints and you get half the third side; bisect an angle and the far side divides as the two arms of that angle do.",
  whyItMatters:
    "Thirteen questions in the bank, all EASY. Each is one ratio set up correctly: four use the parallel-line ratio, six the midpoint theorem and the quarter-area triangle it makes, and three the angle bisector theorem. The wrong options are the answers you get from the right numbers in the wrong ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctrpl-bpt",
      name: "Basic proportionality theorem: a line parallel to one side",
      intuition:
        "A line drawn across a triangle parallel to its base cuts off a smaller similar triangle on top. Because the top triangle is a scaled copy, the two sides are cut in the same proportion.",
      definition:
        "- **DE ∥ BC** with D on AB and E on AC: \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\). This is the **basic proportionality theorem** (Thales).\n" +
        "- Also \\(\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC}\\), from the similar triangles ADE and ABC. **The parallel segment DE goes with the whole side AB**, not with DB.\n" +
        "- **Converse:** if \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\), then DE is parallel to BC.\n" +
        "- A condition like \\(5AE = 3EC\\) means AE : EC = 3 : 5: the larger number goes with the smaller piece.",
      formula: {
        label: "Basic proportionality theorem",
        latex: "\\frac{AD}{DB} = \\frac{AE}{EC} \\qquad \\frac{DE}{BC} = \\frac{AD}{AB}",
        symbols: [{ symbol: "D, E", meaning: "points on AB and AC with DE parallel to BC" }],
      },
      authoredExample: {
        prompt: "In triangle PQR, ST ∥ QR with S on PQ and T on PR. PS = 4 cm, SQ = 10 cm and PR = 21 cm. Find PT and TR.",
        steps: [
          "\\(\\frac{PS}{PQ} = \\frac{4}{14} = \\frac{2}{7}\\), so \\(PT = \\frac{2}{7} \\times 21 = 6\\) cm.",
          "\\(TR = 21 - 6 = 15\\) cm. Check: \\(\\frac{4}{10} = \\frac{6}{15}\\).",
        ],
        answer: "PT = 6 cm, TR = 15 cm",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, DE ∥ BC with D on AB and E on AC, AD : DB = 2 : 5 and DE = 8 cm. Find BC.",
        steps: ["\\(\\frac{DE}{BC} = \\frac{AD}{AB} = \\frac{2}{7}\\).", "\\(BC = 8 \\times \\frac{7}{2} = 28\\) cm."],
        answer: "28 cm",
      },
      practiceSet: [
        { prompt: "In triangle ABC, DE ∥ BC with D on AB and E on AC, AD = 5 cm, DB = 10 cm and AE = 7 cm. Find EC.", answer: "14 cm" },
        {
          prompt: "In triangle ABC, DE ∥ BC with D on AB and E on AC, \\(3AD = 2DB\\) and AC = 15 cm. Find AE.",
          answer: "6 cm",
          method: "AD : DB = 2 : 3, so AE is \\(\\frac{2}{5}\\) of AC.",
        },
        {
          prompt: "In triangle ABC, D is on AB and E on AC with AD = 3 cm, DB = 9 cm, AE = 2 cm and EC = 6 cm. Is DE parallel to BC?",
          answer: "Yes",
          method: "\\(\\frac{3}{9} = \\frac{2}{6}\\).",
        },
      ],
      pyqExampleId: "a5dea206-822c-4628-94ed-b890d026ffd1",
      traps: [
        {
          title: "Using AD : DB for the parallel segment",
          body: "DE and BC are sides of the similar triangles ADE and ABC, so DE : BC = AD : AB. With AD : DB = 1 : 2, DE is a third of BC, not a half.",
        },
        {
          title: "Reading 5AE = 3EC as AE : EC = 5 : 3",
          body: "If five of AE equal three of EC, then AE is the shorter piece: AE : EC = 3 : 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrpl-midpoint",
      name: "The midpoint theorem and the quarter triangle",
      intuition:
        "Joining the midpoints of two sides is the parallel-line case with the ratio 1 : 1. The cut-off triangle is a half-size copy, so the joining segment is half the third side.",
      definition:
        "- **Midpoint theorem:** the segment joining the midpoints of two sides is **parallel to the third side and half as long**.\n" +
        "- **Converse:** a line through the midpoint of one side, parallel to a second side, passes through the midpoint of the third.\n" +
        "- Joining all three midpoints cuts the triangle into **four congruent triangles** (each pair shares sides by the midpoint theorem, so SSS). The middle one is not congruent to the whole; it is similar with \\(k = \\frac{1}{2}\\).\n" +
        "- So each small triangle has **\\(\\frac{1}{4}\\) of the area** and half the perimeter of the whole. The quadrilateral left after cutting off one corner triangle has \\(\\frac{3}{4}\\) of the area.\n" +
        "- The midpoint triangle of an equilateral triangle is equilateral, with half the side.",
      formula: {
        label: "Midpoint theorem",
        latex: "XY = \\frac{1}{2}BC \\qquad \\text{ar}(XYZ) = \\frac{1}{4}\\,\\text{ar}(ABC)",
        symbols: [
          { symbol: "X, Y", meaning: "the midpoints of AB and AC" },
          { symbol: "XYZ", meaning: "the triangle joining the midpoints of all three sides" },
        ],
      },
      authoredExample: {
        prompt:
          "In triangle ABC, X and Y are the midpoints of AB and AC, BC = 18 cm and the area of ABC is 60 cm². Find XY, the area of triangle AXY and the area of the quadrilateral XYCB.",
        steps: [
          "\\(XY = \\frac{1}{2} \\times 18 = 9\\) cm.",
          "Triangle AXY is a half-size copy of ABC, so its area is \\(\\frac{1}{4} \\times 60 = 15\\) cm².",
          "XYCB \\(= 60 - 15 = 45\\) cm², which is \\(\\frac{3}{4}\\) of 60.",
        ],
        answer: "XY = 9 cm; 15 cm²; 45 cm²",
      },
      selfCheckExample: {
        prompt: "The midpoints of the sides of a triangle with sides 10 cm, 14 cm and 16 cm are joined. Find the perimeter of the triangle they form.",
        steps: ["Each side of the new triangle is half a side of the old one: 5, 7 and 8 cm.", "Perimeter \\(= 20\\) cm, half of 40."],
        answer: "20 cm",
      },
      practiceSet: [
        { prompt: "P and Q are the midpoints of sides AB and AC of triangle ABC, and PQ = 7.5 cm. Find BC.", answer: "15 cm" },
        {
          prompt: "The midpoints of the sides of a triangle of area 84 cm² are joined. Find the area of the triangle they form.",
          answer: "21 cm²",
        },
        {
          prompt: "In triangle ABC, X and Y are the midpoints of AB and AC, and BC − XY = 5 cm. Find BC.",
          answer: "10 cm",
          method: "\\(BC - \\frac{1}{2}BC = 5\\).",
        },
        {
          prompt: "The midpoints of the sides of an equilateral triangle of side 8 cm are joined. Describe the triangle formed.",
          answer: "An equilateral triangle of side 4 cm",
        },
      ],
      pyqExampleId: "50f16f09-6188-4c1c-9c20-3d0ecec9216c",
      traps: [
        {
          title: "Taking the midpoint triangle as half the area",
          body: "The midpoint triangle has half the side lengths, so it has a quarter of the area. Half is the ratio of perimeters.",
        },
        {
          title: "Calling the midpoint triangle congruent to the whole",
          body: "The midpoint triangle is congruent to the three corner triangles beside it, and only similar to the original triangle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrpl-bisector",
      name: "The angle bisector theorem",
      intuition:
        "The bisector of an angle leans towards the shorter side next to it, so it meets the opposite side closer to that end. The split matches the two sides exactly.",
      definition:
        "- The bisector of \\(\\angle A\\) meets BC at D. Then **\\(\\frac{BD}{DC} = \\frac{AB}{AC}\\)**: each piece goes with the side that touches it.\n" +
        "- So \\(BD = \\frac{AB}{AB + AC} \\times BC\\) and \\(DC = \\frac{AC}{AB + AC} \\times BC\\).\n" +
        "- The length of BC is only used at the end, to turn the ratio into lengths.\n" +
        "- If AB = AC the bisector meets BC at its midpoint.",
      formula: {
        label: "Angle bisector theorem",
        latex: "\\frac{BD}{DC} = \\frac{AB}{AC} \\qquad BD = \\frac{AB}{AB + AC} \\times BC",
        symbols: [{ symbol: "D", meaning: "the point where the bisector of angle A meets BC" }],
      },
      authoredExample: {
        prompt: "In triangle PQR, PQ = 15 cm, PR = 10 cm and QR = 20 cm. The bisector of \\(\\angle P\\) meets QR at S. Find QS and SR.",
        steps: [
          "\\(\\frac{QS}{SR} = \\frac{PQ}{PR} = \\frac{15}{10} = \\frac{3}{2}\\).",
          "\\(QS = \\frac{3}{5} \\times 20 = 12\\) cm and \\(SR = 8\\) cm.",
        ],
        answer: "QS = 12 cm, SR = 8 cm",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, AB = 9 cm and AC = 6 cm. The bisector of \\(\\angle A\\) meets BC at D, and BD = 4.5 cm. Find BC.",
        steps: ["\\(\\frac{BD}{DC} = \\frac{9}{6} = \\frac{3}{2}\\), so \\(DC = \\frac{2}{3} \\times 4.5 = 3\\) cm.", "\\(BC = 4.5 + 3 = 7.5\\) cm."],
        answer: "7.5 cm",
      },
      practiceSet: [
        { prompt: "In triangle XYZ, XY = 6 cm and XZ = 8 cm. The bisector of \\(\\angle X\\) meets YZ at Q. Find YQ : QZ.", answer: "3 : 4" },
        { prompt: "In triangle ABC, AB = 12 cm, AC = 18 cm and BC = 25 cm. The bisector of \\(\\angle A\\) meets BC at D. Find BD.", answer: "10 cm" },
        { prompt: "In triangle ABC, AB = AC and the bisector of \\(\\angle A\\) meets BC at D. Find BD : DC.", answer: "1 : 1" },
      ],
      pyqExampleId: "db422cb3-d697-4295-b59e-6c8b66a11735",
      traps: [
        {
          title: "Pairing each piece with the far side",
          body: "BD touches B, so it goes with AB; DC goes with AC. Swapping them gives the right numbers in the wrong order, and that answer is usually printed.",
        },
        {
          title: "Putting the third side into the ratio",
          body: "The ratio uses only the two sides that meet at the bisected angle. The side being cut is used afterwards, to share it out.",
        },
      ],
    },
  ],
};
