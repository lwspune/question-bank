import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TR_CONGRUENCE_NOTE: SubtopicNote = {
  subtopicName: "Congruence of Triangles",
  title: "Congruence of Triangles",
  oneLineDefinition:
    "Two triangles are congruent when one fits exactly on the other, and three well-chosen equal parts (SSS, SAS, ASA, AAS or RHS) are enough to prove it.",
  whyItMatters:
    "Eleven questions in the bank, nine of them EASY. None asks for a long proof: they ask which rule fits, which part is still needed, or which way round the letters go. The two MODERATE ones both turn on order, the included angle in SAS and the matching of vertices.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitrco-matching",
      name: "Congruent triangles and the order of the letters",
      intuition:
        "Congruent triangles are exact copies: same three sides and same three angles. The statement \\(\\triangle ABC \\cong \\triangle PQR\\) also tells you which corner sits on which: first on first, second on second, third on third.",
      definition:
        "- **Congruent** means all six parts match: three sides and three angles.\n" +
        "- In \\(\\triangle ABC \\cong \\triangle PQR\\), A goes to P, B to Q and C to R.\n" +
        "- So the matching sides are AB and PQ, BC and QR, CA and RP, and the matching angles are A and P, B and Q, C and R.\n" +
        "- To find the order from given sides, look for the corner two equal sides share: that corner matches the corner the other two sides share.",
      formula: {
        label: "Matching parts",
        latex: "\\triangle ABC \\cong \\triangle PQR \\Rightarrow AB = PQ,\\ BC = QR,\\ CA = RP,\\ \\angle A = \\angle P,\\ \\angle B = \\angle Q,\\ \\angle C = \\angle R",
      },
      authoredExample: {
        prompt: "If \\(\\triangle DEF \\cong \\triangle LMN\\), which side equals EF and which angle equals \\(\\angle F\\)?",
        steps: [
          "Match by position: D to L, E to M, F to N.",
          "EF is the 2nd and 3rd letters, so it matches the 2nd and 3rd letters of LMN: MN.",
          "\\(\\angle F\\) is the 3rd letter, so it matches \\(\\angle N\\).",
        ],
        answer: "\\(EF = MN\\) and \\(\\angle F = \\angle N\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\triangle KLM \\cong \\triangle RST\\), which side of \\(\\triangle RST\\) equals KM?",
        steps: ["K goes to R and M goes to T.", "So KM matches RT."],
        answer: "RT",
      },
      practiceSet: [
        { prompt: "If \\(\\triangle ABC \\cong \\triangle XYZ\\) and \\(\\angle B = 70^\\circ\\), which angle of \\(\\triangle XYZ\\) is \\(70^\\circ\\)?", answer: "\\(\\angle Y\\)" },
        { prompt: "If \\(\\triangle MNO \\cong \\triangle UVW\\), which side of \\(\\triangle UVW\\) equals MN?", answer: "UV" },
        {
          prompt: "In triangles ABC and XYZ, AB = YZ, BC = ZX and CA = XY. Complete the statement \\(\\triangle ABC \\cong \\triangle\\) ___.",
          answer: "\\(\\triangle YZX\\)",
          method: "B is shared by AB and BC, Z by YZ and ZX, so B goes to Z; then A goes to Y and C to X.",
        },
        { prompt: "Two triangles are congruent. Are their areas equal?", answer: "Yes, one fits exactly on the other." },
      ],
      pyqExampleId: "1713affa-f1c8-4881-9046-98a4985036bc",
      traps: [
        {
          title: "Matching letters in alphabetical order",
          body:
            "\\(\\triangle ABC \\cong \\triangle PQR\\) is only right if A really matches P. When AB = QR, B and R are not paired by alphabet but by the sides they share. Work out each corner before writing the statement.",
        },
        {
          title: "Equal angles alone are not congruence",
          body:
            "Two triangles with the same three angles can be different sizes. They are similar, not congruent, until a pair of matching sides is also equal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spitrco-rules",
      name: "The congruence rules SSS, SAS, ASA, AAS and RHS",
      intuition:
        "You never need all six parts. Three of the right kind lock the triangle's shape and size, so the other three must match too. The rule's name lists those three parts in order round the triangle.",
      definition:
        "Two triangles are congruent when one of these holds:\n" +
        "- **SSS:** three sides equal.\n" +
        "- **SAS:** two sides and the angle **between** them.\n" +
        "- **ASA:** two angles and the side **between** them.\n" +
        "- **AAS:** two angles and a side that is not between them.\n" +
        "- **RHS:** a right angle, the hypotenuse and one other side.\n" +
        "**AAA** and **SSA** are not congruence rules.",
      table: {
        columns: ["Rule", "Parts that must be equal", "Note"],
        rows: [
          { cells: ["SSS", "All three pairs of sides", "No angle is needed"] },
          { cells: ["SAS", "Two sides and the angle they make", "The angle must sit between the two sides"] },
          { cells: ["ASA", "Two angles and the side joining their corners", "The side must sit between the two angles"] },
          { cells: ["AAS", "Two angles and a side not between them", "Works because the third angles are then equal too"] },
          { cells: ["RHS", "Right angle, hypotenuse, one other side", "Only for right triangles"] },
          {
            cells: ["AAA", "Three angles", "Not a congruence rule"],
            noteAmber: "Equal angles give similar triangles, which may differ in size.",
          },
          {
            cells: ["SSA", "Two sides and an angle not between them", "Not a congruence rule"],
            noteAmber: "The right-angled case of this pattern is RHS, which does work.",
          },
        ],
        caption: "The letters name the parts in order round the triangle: S for a side, A for an angle.",
      },
      selfCheckExample: {
        prompt: "In triangles PQR and XYZ, PQ = XY = 5 cm, QR = YZ = 6 cm and \\(\\angle Q = \\angle Y = 50^\\circ\\). By which rule are they congruent?",
        steps: ["\\(\\angle Q\\) lies between PQ and QR, and \\(\\angle Y\\) between XY and YZ.", "Two sides and the angle between them: SAS."],
        answer: "SAS",
      },
      practiceSet: [
        { prompt: "Two triangles have all three pairs of sides equal. Which congruence rule applies?", answer: "SSS" },
        { prompt: "Two triangles have two pairs of equal angles and the sides joining those angles equal. Which rule applies?", answer: "ASA" },
        { prompt: "Two triangles have two pairs of equal angles and one pair of equal sides that are not between them. Which rule applies?", answer: "AAS" },
        { prompt: "Two triangles have all three pairs of angles equal. Must they be congruent?", answer: "No, only similar." },
      ],
      pyqExampleId: "22be1ee3-4e9b-46f0-b347-64507bee15ab",
      traps: [
        {
          title: "Calling RHS when the side given is not the hypotenuse",
          body:
            "RHS needs the HYPOTENUSE of each right triangle to be equal, plus one more side. Two equal legs with the right angle between them is SAS, not RHS.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitrco-included",
      name: "The included angle and the included side",
      intuition:
        "An angle sits at a corner, between the two sides that meet there. A side joins two corners, so it sits between the angles at its two ends. SAS and ASA only work with these 'in between' parts.",
      definition:
        "- The angle **included** between sides AB and BC is the angle at their shared letter: \\(\\angle B\\).\n" +
        "- The side **included** between \\(\\angle P\\) and \\(\\angle Q\\) is the side joining those letters: PQ.\n" +
        "- To use SAS, find the corner the two given sides share; to use ASA, join the two given corners.",
      authoredExample: {
        prompt: "You want to prove \\(\\triangle XYZ \\cong \\triangle LMN\\) by ASA, and you know \\(\\angle X = \\angle L\\) and \\(\\angle Y = \\angle M\\). Which pair of sides must also be equal?",
        steps: [
          "ASA needs the side between the two given angles.",
          "Between \\(\\angle X\\) and \\(\\angle Y\\) is XY; between \\(\\angle L\\) and \\(\\angle M\\) is LM.",
        ],
        answer: "\\(XY = LM\\)",
      },
      selfCheckExample: {
        prompt: "In triangles KLM and RST, KL = RS and LM = ST. Which pair of angles must be equal for SAS?",
        steps: ["KL and LM share the letter L; RS and ST share S.", "So \\(\\angle L = \\angle S\\) is needed."],
        answer: "\\(\\angle L = \\angle S\\)",
      },
      practiceSet: [
        { prompt: "Which angle of a triangle ABC is included between sides AB and BC?", answer: "\\(\\angle B\\)" },
        { prompt: "Which side of a triangle PQR is included between \\(\\angle P\\) and \\(\\angle Q\\)?", answer: "PQ" },
        { prompt: "In a triangle GHI, which side lies between \\(\\angle G\\) and \\(\\angle I\\)?", answer: "GI" },
        { prompt: "To use SAS with sides DE and EF of a triangle DEF, which angle must be given?", answer: "\\(\\angle E\\)" },
      ],
      pyqExampleId: "9137c7e1-510a-41ec-83ee-f70c44111a1c",
      traps: [
        {
          title: "An angle that is not between the sides",
          body:
            "Two equal sides and an equal angle at the wrong corner is SSA, and it does not prove congruence. Check that the angle's letter is the letter the two sides share.",
        },
      ],
    },
  ],
};
