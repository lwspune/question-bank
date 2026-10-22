import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TR_SIMILAR_NOTE: SubtopicNote = {
  subtopicName: "Similar Triangles and Proportional Sides",
  title: "Similar Triangles and Proportional Sides",
  oneLineDefinition:
    "Similar triangles have the same shape: equal angles and every side multiplied by the same number, and a line parallel to one side, or a line bisecting an angle, cuts the other sides in a fixed ratio.",
  whyItMatters:
    "Eleven questions in the bank: seven EASY, two MODERATE and the chapter's two HARD ones. Nearly all come down to one proportion. The marks go when the wrong sides are paired, so the order of letters from the congruence page matters even more here.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spitrsi-criteria",
      name: "When two triangles are similar",
      intuition:
        "A photo and its enlargement show the same shape at different sizes. Triangles are the same: if the angles match, the sides all grow by one scale factor, and if the sides grow by one factor, the angles match.",
      definition:
        "Two triangles are similar (written \\(\\sim\\)) when one of these holds:\n" +
        "- **AA (or AAA):** two pairs of angles equal. The third pair is then equal too.\n" +
        "- **SSS:** all three pairs of sides in the same ratio.\n" +
        "- **SAS:** two pairs of sides in the same ratio and the angles between them equal.\n" +
        "As with congruence, \\(\\triangle ABC \\sim \\triangle DEF\\) pairs A with D, B with E and C with F.",
      table: {
        columns: ["Criterion", "What you must show", "Example"],
        rows: [
          { cells: ["AA", "Two pairs of equal angles", "Angles 40°, 60° in one and 40°, 60° in the other"] },
          { cells: ["SSS", "Three pairs of sides in one ratio", "Sides 3, 4, 5 and 6, 8, 10 (ratio 1 : 2)"] },
          { cells: ["SAS", "Two pairs of sides in one ratio, included angles equal", "4 and 6 with 50° between; 6 and 9 with 50° between"] },
          { cells: ["Parallel line", "A line parallel to one side cuts off a small triangle", "Gives equal corresponding angles, so AA"] },
          {
            cells: ["Every pair of equilateral triangles", "Nothing more: all angles are 60°", "Always similar"],
            noteAmber: "Congruent triangles are similar too, with ratio 1 : 1.",
          },
        ],
        caption: "Similar means the same shape; congruent means the same shape and the same size.",
      },
      selfCheckExample: {
        prompt: "\\(\\triangle ABC \\sim \\triangle PQR\\), \\(\\angle A = 50^\\circ\\) and \\(\\angle B = 60^\\circ\\). Find \\(\\angle R\\).",
        steps: ["\\(\\angle R\\) matches \\(\\angle C\\).", "\\(\\angle C = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ\\)."],
        answer: "\\(70^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Are triangles with sides 3, 4, 5 and 9, 12, 15 similar?", answer: "Yes, by SSS (ratio 1 : 3)." },
        { prompt: "One triangle has angles \\(40^\\circ\\) and \\(60^\\circ\\); another has angles \\(40^\\circ\\) and \\(80^\\circ\\). Are they similar?", answer: "Yes. The first one's third angle is \\(80^\\circ\\), so the angles match (AA)." },
        { prompt: "Are any two equilateral triangles similar?", answer: "Yes, all their angles are \\(60^\\circ\\)." },
        { prompt: "Name the three similarity criteria for triangles.", answer: "AA (AAA), SSS and SAS" },
      ],
      pyqExampleId: "e72f5381-aaec-44af-8fa0-4639b1e95f30",
      traps: [
        {
          title: "Finding the angle at the wrong corner",
          body:
            "In \\(\\triangle ABC \\sim \\triangle ADE\\), the angle at D matches the angle at B because both are in second place. Find the angle at B first, then copy it to D.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitrsi-ratio",
      name: "Corresponding sides are in one ratio",
      intuition:
        "Once two triangles are similar, one is a scaled copy of the other. Find the scale factor from one known pair of matching sides, then multiply any other side by it.",
      definition:
        "- In \\(\\triangle ABC \\sim \\triangle DEF\\): \\(\\dfrac{AB}{DE} = \\dfrac{BC}{EF} = \\dfrac{CA}{FD}\\).\n" +
        "- Perimeters, heights and medians grow by the same factor as the sides.\n" +
        "- **Shadows:** at the same moment the sun's rays make the same angle everywhere, so height over shadow is the same for every object.\n" +
        "- Two lines crossing between two parallel lines make two similar triangles, joined at the crossing point.",
      formula: {
        label: "Ratio of corresponding sides",
        latex: "\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{CA}{FD} \\qquad \\frac{\\text{height}_1}{\\text{shadow}_1} = \\frac{\\text{height}_2}{\\text{shadow}_2}",
      },
      authoredExample: {
        prompt: "\\(\\triangle ABC \\sim \\triangle DEF\\) with AB = 4 cm, BC = 6 cm and DE = 10 cm. Find EF.",
        steps: [
          "AB matches DE, and BC matches EF.",
          "Scale factor \\(= \\frac{DE}{AB} = \\frac{10}{4} = 2.5\\).",
          "\\(EF = 2.5 \\times 6 = 15\\) cm.",
        ],
        answer: "15 cm",
      },
      selfCheckExample: {
        prompt: "A 2 m stick casts a 3 m shadow. At the same moment a tower casts a 24 m shadow. How tall is the tower?",
        steps: ["Height over shadow is the same: \\(\\frac{h}{24} = \\frac{2}{3}\\).", "\\(h = 24 \\times \\frac{2}{3} = 16\\) m."],
        answer: "16 m",
      },
      practiceSet: [
        { prompt: "\\(\\triangle PQR \\sim \\triangle XYZ\\), PQ = 3 cm, XY = 12 cm and QR = 5 cm. Find YZ.", answer: "20 cm" },
        { prompt: "\\(\\triangle ABC \\sim \\triangle DEF\\), AB = 9 cm, DE = 6 cm and AC = 12 cm. Find DF.", answer: "8 cm" },
        { prompt: "Two similar triangles have corresponding sides 4 cm and 6 cm. The smaller has perimeter 18 cm. Find the perimeter of the larger.", answer: "27 cm" },
      ],
      pyqExampleId: "a396afbc-5f20-4742-9b9f-ad3a1dec123c",
      traps: [
        {
          title: "Pairing sides by their position on the page",
          body:
            "In \\(\\triangle ACB \\sim \\triangle APQ\\), C matches P and B matches Q, so CB pairs with PQ and AB pairs with AQ. Read the pairs from the statement, never from how the figure looks.",
        },
        {
          title: "Turning the ratio upside down",
          body:
            "If the second triangle is the bigger one, its sides are the small sides TIMES the factor. Check the answer is bigger when it should be: a 2 m stick with a 3 m shadow means the tower is shorter than its shadow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitrsi-bpt",
      name: "Basic proportionality theorem",
      intuition:
        "Draw a line across a triangle parallel to its base. It cuts off a smaller triangle of the same shape, so it divides the two slanting sides in the same ratio.",
      definition:
        "- If DE is parallel to BC, with D on AB and E on AC, then \\(\\dfrac{AD}{DB} = \\dfrac{AE}{EC}\\).\n" +
        "- Also \\(\\dfrac{AD}{AB} = \\dfrac{AE}{AC}\\): part over whole on both sides.\n" +
        "- **Converse:** if a line divides two sides in the same ratio, it is parallel to the third side.\n" +
        "- **Dividing a segment AB in the ratio \\(m : n\\):** draw a ray AX, mark \\(m + n\\) equal steps \\(A_1, A_2, \\ldots\\) on it, join B to the last one, \\(A_{m+n}\\), and draw a line through \\(A_m\\) parallel to it.",
      formula: {
        label: "Basic proportionality theorem",
        latex: "DE \\parallel BC \\Rightarrow \\frac{AD}{DB} = \\frac{AE}{EC} \\quad \\text{and} \\quad \\frac{AD}{AB} = \\frac{AE}{AC}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), DE is parallel to BC with D on AB and E on AC. AD = 3 cm, DB = 4 cm and AE = 4.5 cm. Find EC.",
        steps: [
          "\\(\\frac{AD}{DB} = \\frac{AE}{EC}\\): \\(\\frac{3}{4} = \\frac{4.5}{EC}\\).",
          "\\(EC = \\frac{4.5 \\times 4}{3} = 6\\) cm.",
        ],
        answer: "6 cm",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), DE is parallel to BC with D on AB and E on AC. AD = 2 cm, DB = 3 cm and AC = 10 cm. Find AE.",
        steps: ["Part over whole: \\(\\frac{AD}{AB} = \\frac{AE}{AC}\\), and AB = 5 cm.", "\\(\\frac{2}{5} = \\frac{AE}{10}\\), so AE = 4 cm."],
        answer: "4 cm",
      },
      practiceSet: [
        { prompt: "In \\(\\triangle ABC\\), DE is parallel to BC with D on AB and E on AC. AD = 5 cm, DB = 10 cm and AE = 4 cm. Find EC.", answer: "8 cm" },
        { prompt: "In \\(\\triangle ABC\\), DE is parallel to BC with D on AB and E on AC. \\(\\frac{AD}{DB} = \\frac{2}{3}\\) and AE = 6 cm. Find AC.", answer: "15 cm (EC = 9 cm)" },
        { prompt: "To divide a segment in the ratio 3 : 5 by construction, how many equal steps are marked on the ray?", answer: "8" },
      ],
      pyqExampleId: "209129aa-c0cf-47ba-bf12-96eba7efc1c2",
      traps: [
        {
          title: "Mixing a part with a whole",
          body:
            "\\(\\frac{AD}{DB} = \\frac{AE}{EC}\\) compares part with part; \\(\\frac{AD}{AB} = \\frac{AE}{AC}\\) compares part with whole. \\(\\frac{AD}{AB} = \\frac{AE}{EC}\\) mixes the two and is wrong.",
        },
        {
          title: "Joining B to the wrong point",
          body:
            "To divide AB in the ratio 4 : 7, B is joined to \\(A_{11}\\), the last of \\(4 + 7\\) steps. The parallel line then goes through \\(A_4\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitrsi-bisector",
      name: "The angle bisector divides the opposite side",
      intuition:
        "A line that cuts an angle of a triangle in half meets the opposite side closer to the shorter arm. It splits that side in the same ratio as the two sides that make the angle.",
      definition:
        "- If AD bisects \\(\\angle A\\) of \\(\\triangle ABC\\), with D on BC, then \\(\\dfrac{BD}{DC} = \\dfrac{AB}{AC}\\).\n" +
        "- Each part of BC goes with the side it touches: BD with AB, DC with AC.\n" +
        "- If AB = AC, the bisector meets BC at its midpoint.",
      formula: {
        label: "Angle bisector theorem",
        latex: "\\frac{BD}{DC} = \\frac{AB}{AC}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle PQR\\), PS bisects \\(\\angle P\\) and meets QR at S. PQ = 6 cm, PR = 9 cm and QR = 10 cm. Find QS and SR.",
        steps: [
          "\\(\\frac{QS}{SR} = \\frac{PQ}{PR} = \\frac{6}{9} = \\frac{2}{3}\\).",
          "Split 10 cm in the ratio 2 : 3: \\(QS = \\frac{2}{5} \\times 10 = 4\\) cm, \\(SR = 6\\) cm.",
        ],
        answer: "QS = 4 cm, SR = 6 cm",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), AD bisects \\(\\angle A\\) and meets BC at D. AB = 8 cm, AC = 12 cm and BD = 4 cm. Find DC.",
        steps: ["\\(\\frac{BD}{DC} = \\frac{AB}{AC}\\): \\(\\frac{4}{DC} = \\frac{8}{12}\\).", "\\(DC = \\frac{4 \\times 12}{8} = 6\\) cm."],
        answer: "6 cm",
      },
      practiceSet: [
        { prompt: "In \\(\\triangle XYZ\\), XW bisects \\(\\angle X\\) and meets YZ at W. XY = 5 cm, XZ = 7 cm and YW = 2.5 cm. Find WZ.", answer: "3.5 cm" },
        { prompt: "In \\(\\triangle ABC\\), AB = AC and AD bisects \\(\\angle A\\), meeting BC at D. Find BD : DC.", answer: "1 : 1" },
        { prompt: "In \\(\\triangle ABC\\), AB = 6 cm, AC = 4 cm and BC = 5 cm. The bisector of \\(\\angle A\\) meets BC at D. Find BD.", answer: "3 cm (BD : DC = 3 : 2)" },
      ],
      pyqExampleId: "a9973547-33e7-430a-b02c-c93dbcb513ef",
      traps: [
        {
          title: "Pairing a part with the far side",
          body:
            "BD sits next to AB, so \\(\\frac{BD}{DC} = \\frac{AB}{AC}\\). Writing \\(\\frac{BD}{DC} = \\frac{AC}{AB}\\) puts the longer part next to the shorter side.",
        },
      ],
    },
  ],
};
