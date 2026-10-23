import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_CONGRUENCE_NOTE: SubtopicNote = {
  subtopicName: "Congruent Triangles",
  title: "Congruent Triangles",
  oneLineDefinition:
    "Congruent triangles are exact copies: the order of letters in the statement pairs their corners, and SSS, SAS, ASA or RHS is enough to prove it.",
  whyItMatters:
    "Thirty-two questions in the bank, 31 EASY and 1 MODERATE, the largest group in the chapter. Twelve hand you a statement like △ABC ≅ △RPQ and ask which side or angle matches; fifteen ask which rule applies, or whether one applies at all. Nearly every wrong option is a part matched by its position in the figure instead of by the order of the letters.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctrcg-equal",
      name: "What congruent triangles have in common",
      intuition:
        "Two congruent triangles are the same triangle placed in two spots: cut one out and it fits exactly on the other, perhaps after a turn or a flip. Anything you can measure on one, you get on the other.",
      definition:
        "- **Congruent** (written ≅) means the same shape **and** the same size.\n" +
        "- So all three pairs of matching sides are equal and all three pairs of matching angles are equal.\n" +
        "- It follows that the **perimeters are equal**, the **areas are equal**, and the ratio of any side to its matching side is 1 : 1.\n" +
        "- Two triangles with the same three side lengths are congruent, so they cannot have different areas or different angles.\n" +
        "- Congruent triangles are always similar. Triangles with only the same angles have the same shape, but may differ in size.",
      authoredExample: {
        prompt: "Triangle ABC has sides 9 cm, 12 cm and 15 cm, and triangle DEF is congruent to it. Find the perimeter and the area of triangle DEF.",
        steps: [
          "DEF has the same three sides, so its perimeter is \\(9 + 12 + 15 = 36\\) cm.",
          "\\(9^2 + 12^2 = 225 = 15^2\\), so the triangle is right-angled with legs 9 and 12. Area \\(= \\frac{1}{2} \\times 9 \\times 12 = 54\\) cm², the same for both triangles.",
        ],
        answer: "Perimeter 36 cm, area 54 cm²",
      },
      selfCheckExample: {
        prompt:
          "Triangles ABC and DEF are congruent. Which of these statements is false: (a) AB : DE = 1 : 1, (b) the two triangles have equal areas, (c) the perimeter of ABC is twice the perimeter of DEF?",
        steps: [
          "Matching sides are equal, so (a) holds, and equal sides give equal areas, so (b) holds.",
          "Equal sides also give equal perimeters, so (c) is false.",
        ],
        answer: "(c)",
      },
      practiceSet: [
        { prompt: "Triangle ABC is congruent to triangle PQR, and the perimeter of PQR is 31 cm. Find the perimeter of ABC.", answer: "31 cm" },
        { prompt: "Two triangles each have sides 8 cm, 11 cm and 13 cm. Are they congruent?", answer: "Yes" },
        { prompt: "Are two congruent triangles always similar?", answer: "Yes" },
        { prompt: "Two triangles are congruent. What is the ratio of a side of one to the matching side of the other?", answer: "1 : 1" },
      ],
      pyqExampleId: "92170577-3cd7-4f04-8cd1-5d5a8224c5f3",
      traps: [
        {
          title: "Taking equal angles as congruence",
          body: "Three equal angles fix only the shape of a triangle. A small and a large equilateral triangle have the same angles and are not congruent.",
        },
        {
          title: "Believing congruent triangles can differ in area",
          body: "Congruent triangles are exact copies, so any option saying their areas or perimeters differ is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrcg-correspond",
      name: "Reading the matching corners from a congruence statement",
      intuition:
        "A congruence statement is written so that its letters line up: the first corner of one triangle goes with the first corner of the other, and so on. The statement, not the drawing, tells you which parts are equal.",
      definition:
        "- In \\(\\triangle ABC \\cong \\triangle PQR\\) the corners pair **in the order written**: A with P, B with Q, C with R.\n" +
        "- Sides pair the same way: AB = PQ, BC = QR, CA = RP. Angles too: \\(\\angle A = \\angle P\\), \\(\\angle B = \\angle Q\\), \\(\\angle C = \\angle R\\).\n" +
        "- **Method:** write the two names one under the other and read down the columns. To find the side matching PQ in \\(\\triangle ABC \\cong \\triangle RPQ\\), see that P and Q are the 2nd and 3rd letters, so the answer is the 2nd and 3rd letters of ABC: BC.\n" +
        "- When the parts are given as expressions, set the matching parts equal and solve.\n" +
        "- When two angles of one triangle are known, the third comes from the angle sum, and it equals its partner in the other triangle.",
      formula: {
        label: "Matching parts",
        latex: "\\triangle ABC \\cong \\triangle PQR \\;\\Rightarrow\\; AB = PQ,\\; BC = QR,\\; CA = RP,\\; \\angle A = \\angle P,\\; \\angle B = \\angle Q,\\; \\angle C = \\angle R",
      },
      authoredExample: {
        prompt:
          "\\(\\triangle KLM \\cong \\triangle TRS\\), with KL = 9 cm, LM = 12 cm, \\(\\angle K = 58^\\circ\\) and \\(\\angle L = 71^\\circ\\). Find RS and \\(\\angle S\\).",
        steps: [
          "Read down the columns: K with T, L with R, M with S.",
          "RS matches LM, so RS = 12 cm.",
          "\\(\\angle S\\) matches \\(\\angle M = 180^\\circ - 58^\\circ - 71^\\circ = 51^\\circ\\).",
        ],
        answer: "RS = 12 cm, ∠S = 51°",
      },
      selfCheckExample: {
        prompt:
          "\\(\\triangle DEF \\cong \\triangle UVW\\), with \\(\\angle E = (3a + 10)^\\circ\\), \\(\\angle V = 64^\\circ\\), EF = \\(2b - 3\\) cm and VW = 15 cm. Find \\(a + b\\).",
        steps: [
          "E matches V: \\(3a + 10 = 64\\), so \\(a = 18\\).",
          "EF matches VW: \\(2b - 3 = 15\\), so \\(b = 9\\).",
          "\\(a + b = 27\\).",
        ],
        answer: "27",
      },
      practiceSet: [
        { prompt: "\\(\\triangle ABC \\cong \\triangle ZXY\\). Which side of triangle ZXY equals AC?", answer: "ZY" },
        { prompt: "\\(\\triangle PQR \\cong \\triangle CAB\\). Which angle of triangle CAB equals \\(\\angle Q\\)?", answer: "∠A" },
        { prompt: "\\(\\triangle LMN \\cong \\triangle XYZ\\), with \\(\\angle L = 40^\\circ\\) and \\(\\angle M = 75^\\circ\\). Find \\(\\angle Z\\).", answer: "65°" },
        {
          prompt:
            "Right triangles ABC and PQR are congruent with \\(\\angle A = \\angle P = 90^\\circ\\), QR = 17 cm and AC = 8 cm. Find PQ.",
          answer: "15 cm",
          method: "BC = QR = 17 is the hypotenuse, so \\(AB = \\sqrt{289 - 64} = 15\\), and PQ matches AB.",
        },
      ],
      pyqExampleId: "51d16081-b243-423e-a972-b1a0211fbe39",
      traps: [
        {
          title: "Matching corners by alphabet or by position",
          body: "In △ABC ≅ △FDE, A matches F, B matches D and C matches E. The pairing comes only from the order the letters are written in.",
        },
        {
          title: "Trusting how the figure is drawn",
          body: "Two congruent triangles may be drawn turned or flipped. Read the matching sides from the statement, then check the figure against it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrcg-rules",
      name: "The congruence rules: SSS, SAS, ASA and RHS",
      intuition:
        "You do not need all six parts to know two triangles are copies. Three well-chosen parts already fix a triangle completely, so if those three match, everything matches.",
      definition:
        "- **SSS:** all three pairs of sides equal.\n" +
        "- **SAS:** two sides and the angle **between** them (the included angle).\n" +
        "- **ASA:** two angles and the side between them. **AAS** (two angles and any matching side) also works, because the third angle follows from the angle sum.\n" +
        "- **RHS:** a right angle, the hypotenuse and one other side.\n" +
        "- **Not rules:** AAA fixes only the shape, and SSA (an angle that is not between the two sides) does not fix the triangle, except when that angle is 90°, which is RHS.\n" +
        "- **Free parts:** a side shared by both triangles, and vertically opposite angles where two lines cross, count as equal.\n" +
        "- Two equal pairs of sides plus equal perimeters give the third pair equal, so SSS. The same base with the same area or height is not enough: the top corner can slide along a line.\n" +
        "- Once two triangles are congruent, every matching part is equal. This is how a congruence proves two angles or sides equal.",
      authoredExample: {
        prompt:
          "In quadrilateral PQRS the diagonal PR is drawn, PQ = RS and QR = SP. Are triangles PQR and RSP congruent? If so, by which rule, and which angle equals \\(\\angle PQR\\)?",
        steps: [
          "PQ = RS and QR = SP are given, and PR is a side of both triangles.",
          "Three pairs of sides are equal, so \\(\\triangle PQR \\cong \\triangle RSP\\) by SSS, with P matching R, Q matching S and R matching P.",
          "\\(\\angle PQR\\) is at Q, which matches S, so it equals \\(\\angle RSP\\).",
        ],
        answer: "Yes, by SSS; ∠PQR = ∠RSP",
      },
      selfCheckExample: {
        prompt: "Triangles ABC and DEF have AB = DE, \\(\\angle A = \\angle D\\) and BC = EF. Is this enough to prove them congruent?",
        steps: [
          "The equal angle at A lies between AB and AC, not between AB and BC.",
          "So the data is two sides and an angle that is not included (SSA), which is not a congruence rule.",
        ],
        answer: "No",
      },
      practiceSet: [
        { prompt: "Which congruence rule uses two angles and the side between them?", answer: "ASA" },
        { prompt: "Two right triangles have equal hypotenuses and one pair of equal legs. By which rule are they congruent?", answer: "RHS" },
        { prompt: "Two triangles have all three angles equal. Must they be congruent?", answer: "No: they are only similar" },
        {
          prompt: "In triangles ABC and PQR, AB = PQ = 6 cm, AC = PR = 9 cm and \\(\\angle A = \\angle P = 50^\\circ\\). By which rule are they congruent?",
          answer: "SAS",
        },
        {
          prompt: "Segments AB and CD bisect each other at O. By which rule are triangles AOC and BOD congruent?",
          answer: "SAS",
          method: "OA = OB, OC = OD, and the angles at O are vertically opposite.",
        },
      ],
      pyqExampleId: "f71b9971-7c79-4479-ad6c-ae9eff131bca",
      traps: [
        {
          title: "Accepting two sides and a non-included angle",
          body: "Two sides with an angle that is not between them (SSA) do not fix a triangle. The only exception is a right angle, which is the RHS rule.",
        },
        {
          title: "Calling a right-angle case SAS",
          body: "With a right angle, the hypotenuse and a leg equal, the right angle is not between the two given sides. The rule is RHS, not SAS.",
        },
        {
          title: "Missing the shared side or the crossing angles",
          body: "A side common to both triangles, or two vertically opposite angles, are equal parts that the question does not state. Count them.",
        },
      ],
    },
  ],
};
