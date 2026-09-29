import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_COMMON_NOTE: SubtopicNote = {
  subtopicName: "Common Tangents and Common Chords",
  title: "Two Circles: Common Tangents and Common Chords",
  oneLineDefinition:
    "A common tangent's length comes from a right triangle on the line of centres; a common chord is bisected at right angles by that line.",
  whyItMatters:
    "Six PYQs. Every one draws the line joining the centres. For a tangent, slide it parallel until it passes through a centre: the right triangle has hypotenuse d and one leg the difference (direct) or sum (transverse) of the radii. For a chord, the line of centres is its perpendicular bisector.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-common-tangent",
      name: "Direct and transverse common tangents",
      intuition:
        "The radii to a common tangent are both perpendicular to it, so they are parallel. Shift the tangent until it passes through the smaller circle's centre: what is left is a right triangle with the distance between the centres as hypotenuse.",
      definition:
        "- Direct common tangent (both circles on one side): \\(\\sqrt{d^2 - (r_1 - r_2)^2}\\).\n" +
        "- Transverse common tangent (crosses between them): \\(\\sqrt{d^2 - (r_1 + r_2)^2}\\), which exists only when \\(d > r_1 + r_2\\).\n" +
        "- Circles touching externally: \\(d = r_1 + r_2\\), so the direct tangent is \\(2\\sqrt{r_1 r_2}\\).\n" +
        "- The radii and the direct tangent form a right trapezium with parallel sides \\(r_1, r_2\\) and height the tangent length.\n" +
        "- Common tangents: \\(4\\) if apart, \\(3\\) if touching externally, \\(2\\) if intersecting, \\(1\\) if touching internally, \\(0\\) if one is inside the other.",
      formula: {
        label: "Common tangents",
        latex: "\\text{direct} = \\sqrt{d^2 - (r_1 - r_2)^2}, \\quad \\text{transverse} = \\sqrt{d^2 - (r_1 + r_2)^2}",
      },
      authoredExample: {
        prompt: "Circles of radii \\(10\\) cm and \\(4\\) cm have centres \\(10\\) cm apart. Find the direct common tangent.",
        steps: ["\\(\\sqrt{10^2 - 6^2} = \\sqrt{64}\\)."],
        answer: "\\(8\\) cm.",
      },
      selfCheckExample: {
        prompt: "Circles of radii \\(5\\) cm and \\(3\\) cm have centres \\(17\\) cm apart. Find the transverse common tangent.",
        steps: ["\\(\\sqrt{17^2 - 8^2} = \\sqrt{225}\\)."],
        answer: "\\(15\\) cm.",
      },
      practiceSet: [
        { prompt: "Touching externally, radii \\(2\\) and \\(8\\). Direct tangent?", answer: "\\(8\\)" },
        { prompt: "Common tangents of circles touching externally?", answer: "\\(3\\)" },
        { prompt: "Common tangents of intersecting circles?", answer: "\\(2\\)" },
        { prompt: "Radii \\(6, 2\\), \\(d = 5\\). Direct tangent?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "5639c1c0-3719-4a99-aa5f-b26e6743b7b3", // 2017 (II) — radii 9 and 4, centres 13 apart
      traps: [
        {
          title: "Difference for direct, sum for transverse",
          body:
            "The direct tangent keeps both circles on one side, so the leg is the DIFFERENCE of the radii. The transverse tangent crosses between them and uses the SUM. Swapping them is the standard wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-common-chord",
      name: "The common chord of intersecting circles",
      intuition:
        "Both centres are equally far from the chord's two ends, so both lie on its perpendicular bisector. The line of centres cuts the chord in half at right angles, and each centre gives a right triangle.",
      definition:
        "- The line of centres is the perpendicular bisector of the common chord.\n" +
        "- With half-chord \\(h\\): each centre is \\(\\sqrt{r^2 - h^2}\\) from the chord.\n" +
        "- Centres on opposite sides of the chord: \\(d = \\sqrt{r_1^2 - h^2} + \\sqrt{r_2^2 - h^2}\\). Same side: the difference.\n" +
        "- Equal circles each through the other's centre: \\(d = r\\) and the common chord is \\(r\\sqrt3\\).",
      formula: {
        label: "Distance between centres",
        latex: "d = \\sqrt{r_1^2 - h^2} + \\sqrt{r_2^2 - h^2}",
      },
      authoredExample: {
        prompt: "Circles of radii \\(15\\) cm and \\(13\\) cm have a common chord \\(24\\) cm long. Find the distance between their centres.",
        steps: ["\\(\\sqrt{15^2 - 12^2} = 9\\) and \\(\\sqrt{13^2 - 12^2} = 5\\).", "Centres on opposite sides of the chord."],
        answer: "\\(14\\) cm.",
      },
      selfCheckExample: {
        prompt: "Two circles of radius \\(6\\) cm each pass through the other's centre. Find the common chord.",
        steps: ["\\(d = 6\\), so the half-chord is \\(\\sqrt{36 - 9} = 3\\sqrt3\\)."],
        answer: "\\(6\\sqrt3\\) cm.",
      },
      practiceSet: [
        { prompt: "Radii \\(5\\) and \\(5\\), common chord \\(8\\). \\(d\\)?", answer: "\\(6\\)" },
        { prompt: "Radii \\(10, 17\\), common chord \\(16\\). \\(d\\) (opposite sides)?", answer: "\\(21\\)" },
        { prompt: "The common chord and the line of centres meet at?", answer: "\\(90^\\circ\\)" },
        { prompt: "Equal circles through each other's centres, radius \\(r\\). Chord?", answer: "\\(r\\sqrt3\\)" },
      ],
      pyqExampleId: "494e86cf-e93a-4999-a516-504bf10dd50c", // 2019 (II) — equal circles through each other's centres, chord 10√3
      traps: [
        {
          title: "Both centres can be on one side",
          body:
            "When the smaller circle's centre lies on the same side of the chord as the larger one's, \\(d\\) is the DIFFERENCE of the two distances. Questions mean the usual picture, centres on opposite sides, unless they say otherwise.",
        },
      ],
    },
  ],
};
