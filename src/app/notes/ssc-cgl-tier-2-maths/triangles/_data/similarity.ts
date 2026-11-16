import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TR_SIMILARITY_NOTE: SubtopicNote = {
  subtopicName: "Congruence and Similarity",
  title: "Congruence and Similarity",
  oneLineDefinition:
    "Congruent triangles are exact copies matched letter by letter; similar triangles share their angles and keep one ratio for every matching side, and their areas go in the square of that ratio.",
  whyItMatters:
    "14 questions in the Tier II bank, 8 EASY, 5 MODERATE and 1 HARD. The hard ones hide a pair of similar triangles; finding two equal angles is the step that unlocks them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2trsm-congruent",
      name: "Congruent triangles",
      intuition:
        "Congruent triangles are copies: every matching side and angle is equal. The order of the letters in a statement like ΔABC ≅ ΔPQR tells you exactly which part matches which.",
      definition:
        "- Tests: SSS, SAS (the angle between the two sides), ASA or AAS, and RHS for right triangles. SSA and AAA are not tests.\n" +
        "- In \\(\\Delta ABC \\cong \\Delta PQR\\): A matches P, B matches Q, C matches R, so \\(AB = PQ\\) and \\(\\angle C = \\angle R\\).\n" +
        "- To show two lengths or angles equal, place them in two triangles you can prove congruent.",
      formula: {
        label: "Congruence tests",
        latex: "\\text{SSS},\\quad \\text{SAS},\\quad \\text{ASA (AAS)},\\quad \\text{RHS}",
      },
      authoredExample: {
        prompt: "\\(\\Delta ABC \\cong \\Delta XYZ\\), with AB = 7 cm, BC = 9 cm, angle A = 50° and angle B = 70°. Find YZ and angle Z.",
        steps: ["B matches Y and C matches Z, so YZ \\(= BC = 9\\) cm.", "\\(\\angle Z = \\angle C = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ\\)."],
        answer: "9 cm and \\(60^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In triangles PQR and LMN, PQ = LM, QR = MN and angle Q = angle M. Which test shows they are congruent, and which angle equals angle R?",
        steps: ["Two sides and the angle between them: SAS.", "R matches N, so angle R \\(=\\) angle N."],
        answer: "SAS; angle N",
      },
      practiceSet: [
        { prompt: "If every angle of one triangle equals an angle of another, must the two triangles be the same size?", answer: "No: only similar" },
        { prompt: "\\(\\Delta DEF \\cong \\Delta KLM\\) with DE = 4, EF = 6 and FD = 5. Find KM.", answer: "5", method: "KM matches DF." },
        { prompt: "Right triangles PQR and XYZ have equal hypotenuses and an equal leg. Which test proves them congruent?", answer: "RHS" },
      ],
      pyqExampleId: "8738f849-6ad4-4231-a967-58714f5e9ca4",
      traps: [
        {
          title: "Matching by the drawing instead of the letters",
          body: "In \\(\\Delta ABC \\cong \\Delta PQR\\), side AC matches PR because of the letter order, whatever the sketch looks like.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trsm-similar",
      name: "Similar triangles: matching sides",
      intuition:
        "Similar triangles have the same shape at different sizes: matching angles are equal and matching sides are all in one ratio. Find two equal angles, and the ratio of any matching pair gives every other length.",
      definition:
        "- Two equal angles (AA) are enough for similarity.\n" +
        "- Matching sides, perimeters, medians and altitudes all share the same ratio k.\n" +
        "- A line parallel to one side cuts off a triangle similar to the whole.\n" +
        "- In a right triangle, the altitude to the hypotenuse makes two smaller triangles similar to it, so \\(BD^2 = AD \\times DC\\).\n" +
        "- If \\(\\Delta DAB \\sim \\Delta DCA\\), then \\(DA^2 = DB \\times DC\\).",
      formula: {
        label: "Matching ratios",
        latex: "\\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP} = \\frac{\\text{perimeter}_1}{\\text{perimeter}_2}",
      },
      authoredExample: {
        prompt: "\\(\\Delta ABC \\sim \\Delta PQR\\) with AB = 6, BC = 9 and PQ = 4. Find QR.",
        steps: ["The ratio is \\(\\frac{PQ}{AB} = \\frac{4}{6} = \\frac{2}{3}\\).", "\\(QR = 9 \\times \\frac{2}{3} = 6\\)."],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "Triangle ABC is right-angled at B, and BD is the altitude to AC. If AD = 4 and DC = 9, find BD.",
        steps: ["\\(BD^2 = AD \\times DC = 36\\).", "\\(BD = 6\\)."],
        answer: "6",
      },
      practiceSet: [
        { prompt: "Two similar triangles have perimeters 30 cm and 45 cm. A side of the first is 8 cm. Find the matching side of the second.", answer: "12 cm" },
        { prompt: "D on AB and E on AC with DE parallel to BC; AD = 3, DB = 6 and BC = 12. Find DE.", answer: "4", method: "\\(\\frac{DE}{BC} = \\frac{AD}{AB} = \\frac{1}{3}\\)" },
        { prompt: "A perpendicular from the right-angle corner splits the hypotenuse into a 4 cm part and a 9 cm part. How long is the perpendicular?", answer: "6 cm" },
      ],
      pyqExampleId: "c95ce134-46c8-412b-8c1e-2bd516004832",
      traps: [
        {
          title: "Using a piece of a side instead of the whole side",
          body: "With DE parallel to BC, \\(\\frac{DE}{BC} = \\frac{AD}{AB}\\), the part over the WHOLE side. Using \\(\\frac{AD}{DB}\\) gives the wrong ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trsm-areas",
      name: "Areas of similar triangles",
      intuition:
        "Areas grow with the square of length. If two similar triangles have sides in the ratio k, their areas are in the ratio k squared; going from areas back to sides needs a square root.",
      definition:
        "- Area ratio \\(= (\\text{side ratio})^2\\).\n" +
        "- Side ratio \\(= \\sqrt{\\text{area ratio}}\\): areas 196 : 625 mean sides 14 : 25.\n" +
        "- The letter order fixes which side matches which: in \\(\\Delta BAC \\sim \\Delta PQR\\), BA matches PQ.",
      formula: {
        label: "Areas of similar triangles",
        latex: "\\frac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\frac{\\text{side}_1}{\\text{side}_2}\\right)^2",
      },
      authoredExample: {
        prompt: "Similar triangles cover 64 cm² and 100 cm². One side of the smaller is 12 cm; how long is the corresponding side of the bigger?",
        steps: ["Side ratio \\(= \\sqrt{\\frac{64}{100}} = \\frac{8}{10}\\).", "Larger side \\(= 12 \\times \\frac{10}{8} = 15\\) cm."],
        answer: "15 cm",
      },
      selfCheckExample: {
        prompt: "Matching sides of two similar triangles measure 3 cm and 5 cm, and the smaller triangle covers 27 cm². How much does the larger cover?",
        steps: ["Area ratio \\(= 9 : 25\\).", "Larger area \\(= 27 \\times \\frac{25}{9} = 75\\ \\text{cm}^2\\)."],
        answer: "\\(75\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Similar triangles have areas in the ratio 81 : 144. What is the ratio of their sides?", answer: "3 : 4" },
        { prompt: "Every side of a triangle is doubled. By what factor does its area change?", answer: "4" },
        { prompt: "DE is parallel to BC with AD : DB = 1 : 2. Find area of triangle ADE : area of triangle ABC.", answer: "1 : 9" },
      ],
      pyqExampleId: "e88bbe9c-5cc9-43a0-8f29-73c275558769",
      traps: [
        {
          title: "Using the area ratio for the sides",
          body: "Areas of 4 : 9 mean sides of 2 : 3, not 4 : 9. Take the square root before you scale a length.",
        },
      ],
    },
  ],
};
