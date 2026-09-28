import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_RIGHT_TRIANGLE_NOTE: SubtopicNote = {
  subtopicName: "Ratios in a Right Triangle",
  title: "Ratios in a Right Triangle",
  oneLineDefinition:
    "Every ratio of an acute angle is a quotient of two sides of a right triangle, so one known ratio — or three known sides — fixes all six.",
  whyItMatters:
    "Twenty-two PYQs, mostly MODERATE. Half give one ratio and ask for another; the rest hide a right triangle inside a rectangle, a circle or a three-question figure set. The move is always the same: draw the triangle, find the missing side, read off the ratio.",
  concepts: [
    // C1 — ratios from the sides
    {
      kind: "formula" as const,
      slug: "cdstr-ratios-from-sides",
      name: "Sine, cosine and tangent as quotients of sides",
      intuition:
        "Name the sides from the angle you care about: the side facing it is opposite, the side touching it (not the hypotenuse) is adjacent. Then sine is opposite over hypotenuse, cosine adjacent over hypotenuse, tangent opposite over adjacent — and the other three ratios are just these turned upside down.",
      definition:
        "For an acute angle \\(\\theta\\) of a right triangle:\n" +
        "- \\(\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}\\);\n" +
        "- \\(\\operatorname{cosec}\\theta\\), \\(\\sec\\theta\\), \\(\\cot\\theta\\) are their reciprocals.\n" +
        "**Pythagoras** supplies the third side. Know the common triples by sight: \\(3\\)-\\(4\\)-\\(5\\), \\(5\\)-\\(12\\)-\\(13\\), \\(8\\)-\\(15\\)-\\(17\\), \\(7\\)-\\(24\\)-\\(25\\), \\(20\\)-\\(21\\)-\\(29\\) and their multiples.",
      formula: {
        label: "The three primary ratios",
        latex: "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}",
      },
      visualizationSlug: "cds-trig-right-triangle",
      authoredExample: {
        prompt: "A rectangle is \\(24\\) cm by \\(7\\) cm. If a diagonal makes angle \\(\\theta\\) with the longer side, find \\(\\sin\\theta + \\cos\\theta\\).",
        steps: [
          "The diagonal is \\(\\sqrt{24^2 + 7^2} = \\sqrt{625} = 25\\) cm.",
          "Measured from the longer side, the adjacent side is \\(24\\) and the opposite side is \\(7\\).",
          "So \\(\\sin\\theta = \\dfrac{7}{25}\\), \\(\\cos\\theta = \\dfrac{24}{25}\\), and the sum is \\(\\dfrac{31}{25}\\).",
        ],
        answer: "\\(\\dfrac{31}{25}\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(PQR\\), right-angled at \\(Q\\), \\(PQ = 8\\) and \\(QR = 15\\). Find \\(\\tan P + \\tan R\\).",
        steps: [
          "\\(\\tan P = \\dfrac{QR}{PQ} = \\dfrac{15}{8}\\) and \\(\\tan R = \\dfrac{PQ}{QR} = \\dfrac{8}{15}\\).",
          "Sum: \\(\\dfrac{15}{8} + \\dfrac{8}{15} = \\dfrac{225 + 64}{120} = \\dfrac{289}{120}\\).",
          "Check: \\(289 = 17^2 = PR^2\\), matching \\(\\tan P + \\tan R = \\dfrac{PR^2}{PQ \\cdot QR}\\).",
        ],
        answer: "\\(\\dfrac{289}{120}\\).",
      },
      practiceSet: [
        { prompt: "Hypotenuse of a right triangle with legs \\(20\\) and \\(21\\)?", answer: "\\(29\\)" },
        { prompt: "\\(\\sin\\theta\\) if opposite \\(= 9\\), hypotenuse \\(= 41\\)?", answer: "\\(\\dfrac{9}{41}\\)" },
        { prompt: "In a triangle right-angled at \\(C\\), \\(\\tan A \\cdot \\tan B\\)?", answer: "\\(1\\)" },
        { prompt: "Angle whose tangent is \\(\\sqrt3\\)?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "b375eb35-00c4-4e74-9df5-c241bc7d40a5", // 2020 (I) — 48 by 14 rectangle, sec + cosec
      traps: [
        {
          title: "Name the sides from the angle asked about",
          body:
            "The side opposite \\(A\\) is adjacent to \\(B\\). Questions that ask about the other acute angle, or that label the right angle at \\(C\\) instead of \\(B\\), are built to catch a triangle labelled once and read the wrong way.",
        },
      ],
    },

    // C2 — from one ratio to all
    {
      kind: "formula" as const,
      slug: "cdstr-one-ratio-to-all",
      name: "From one given ratio to every other ratio",
      intuition:
        "A single ratio like \\(\\sin\\theta = \\dfrac{12}{13}\\) is a triangle in disguise: opposite \\(12\\), hypotenuse \\(13\\). Pythagoras gives the third side \\(5\\), and now every ratio is a fraction you can read off. The quadrant only decides signs.",
      definition:
        "Given one ratio \\(\\dfrac{a}{b}\\) of an acute angle:\n" +
        "- draw a right triangle with those two sides and find the third by Pythagoras;\n" +
        "- read off any other ratio;\n" +
        "- if the angle is not acute, keep the sizes and fix each **sign** from the quadrant.\n" +
        "For a ratio given as \\(\\dfrac{m^2 - n^2}{m^2 + n^2}\\), the third side is \\(2mn\\), because \\((m^2+n^2)^2 - (m^2-n^2)^2 = 4m^2n^2\\).\n" +
        "When a question gives \\(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}\\) or similar, divide top and bottom by \\(\\cos\\theta\\) to get an equation in \\(\\tan\\theta\\) alone.",
      formula: {
        label: "Third side from a Pythagorean pair",
        latex: "\\sin\\theta = \\frac{m^2-n^2}{m^2+n^2} \\;\\Rightarrow\\; \\cos\\theta = \\frac{2mn}{m^2+n^2} \\quad (\\theta \\text{ acute})",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = \\dfrac{8}{15}\\) with \\(\\theta\\) acute, find \\(\\sec\\theta + \\operatorname{cosec}\\theta\\).",
        steps: [
          "Opposite \\(8\\), adjacent \\(15\\), so the hypotenuse is \\(\\sqrt{64 + 225} = 17\\).",
          "\\(\\sec\\theta = \\dfrac{17}{15}\\) and \\(\\operatorname{cosec}\\theta = \\dfrac{17}{8}\\).",
          "Sum: \\(17\\left(\\dfrac{1}{15} + \\dfrac{1}{8}\\right) = 17 \\cdot \\dfrac{23}{120} = \\dfrac{391}{120}\\).",
        ],
        answer: "\\(\\dfrac{391}{120}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta} = 3\\), find \\(\\tan\\theta\\).",
        steps: [
          "Divide top and bottom by \\(\\cos\\theta\\): \\(\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = 3\\).",
          "So \\(\\tan\\theta + 1 = 3\\tan\\theta - 3\\), giving \\(2\\tan\\theta = 4\\).",
        ],
        answer: "\\(\\tan\\theta = 2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos\\theta\\) if \\(\\sin\\theta = \\dfrac35\\), \\(\\theta\\) acute?", answer: "\\(\\dfrac45\\)" },
        { prompt: "\\(\\sin\\theta\\) if \\(\\cot\\theta = \\dfrac{7}{24}\\), \\(\\theta\\) acute?", answer: "\\(\\dfrac{24}{25}\\)" },
        { prompt: "\\(\\cos\\theta\\) if \\(\\sin\\theta = \\dfrac{3}{5}\\) and \\(\\theta\\) is obtuse?", answer: "\\(-\\dfrac45\\)" },
        { prompt: "\\(\\sec^2\\theta\\) if \\(\\tan\\theta = 2\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "9b823f7d-d098-48fe-9377-3b48790b5727", // 2020 (I) — cot θ = 63/16, find sin θ + cos θ
      traps: [
        {
          title: "The triangle gives sizes; the quadrant gives signs",
          body:
            "A triangle only ever produces positive lengths. If the angle is in the second quadrant, the cosine you read off the triangle must be made negative before you use it.",
        },
      ],
    },

    // C3 — right triangles inside other figures
    {
      kind: "formula" as const,
      slug: "cdstr-triangle-configurations",
      name: "Right triangles hidden in other figures",
      intuition:
        "The paper rarely hands you a labelled right triangle. It gives a rectangle and a diagonal, a chord of a circle, an altitude to the hypotenuse, or a figure set with three questions. Find the right angle first — a rectangle's corner, the angle in a semicircle, the foot of a perpendicular — and the rest is the first concept again.",
      definition:
        "Places a right angle hides:\n" +
        "- the corner of a rectangle or square (a diagonal makes two right triangles);\n" +
        "- the angle in a semicircle;\n" +
        "- the foot of a perpendicular — from the centre of a circle to a chord it bisects the chord, so a chord subtending \\(2\\theta\\) at the centre of a circle of radius \\(r\\) has length \\(2r\\sin\\theta\\);\n" +
        "- the altitude to the hypotenuse, which splits the triangle into two triangles similar to it.\n" +
        "**Area** \\(= \\dfrac12 ab\\sin C\\) for any two sides and the angle between them.\n" +
        "For a sum and a hypotenuse, square: \\((AB + BC)^2 - (AB^2 + BC^2) = 2\\,AB \\cdot BC\\).",
      formula: {
        label: "Two tools that recur",
        latex: "\\text{chord} = 2r\\sin\\theta, \\qquad \\text{Area} = \\tfrac12 ab\\sin C",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), right-angled at \\(B\\), \\(AB + BC = 17\\) and \\(AC = 13\\). Find \\(\\tan A + \\tan C\\).",
        steps: [
          "Square the sum: \\(AB^2 + BC^2 + 2\\,AB\\cdot BC = 289\\).",
          "Since \\(AB^2 + BC^2 = 169\\), we get \\(AB \\cdot BC = 60\\).",
          "\\(\\tan A + \\tan C = \\dfrac{BC}{AB} + \\dfrac{AB}{BC} = \\dfrac{AB^2 + BC^2}{AB \\cdot BC} = \\dfrac{169}{60}\\).",
        ],
        answer: "\\(\\dfrac{169}{60}\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has sides \\(AB = 10\\), \\(BC = 12\\) and area \\(30\\). Find \\(\\sin B\\).",
        steps: [
          "Area \\(= \\dfrac12 \\cdot AB \\cdot BC \\cdot \\sin B = 60\\sin B\\).",
          "So \\(60\\sin B = 30\\) and \\(\\sin B = \\dfrac12\\).",
        ],
        answer: "\\(\\dfrac12\\).",
      },
      practiceSet: [
        { prompt: "Chord of a unit circle subtending \\(60^\\circ\\) at the centre?", answer: "\\(1\\)", method: "\\(2\\sin 30^\\circ\\)" },
        { prompt: "In triangle \\(ABC\\) inscribed in a semicircle on \\(AB\\), angle \\(C\\)?", answer: "\\(90^\\circ\\)" },
        { prompt: "Area of a triangle with sides \\(6\\), \\(8\\) and included angle \\(30^\\circ\\)?", answer: "\\(12\\)" },
        { prompt: "\\(\\cos^2 A + \\cos^2 B + \\cos^2 C\\) for a right triangle?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "ef9b2f19-d7b0-4648-8735-3a65eb4d1836", // 2021 (II) — AB + BC = 10(1 + √3), hypotenuse 20
      traps: [
        {
          title: "The area formula can hide an obtuse angle",
          body:
            "\\(\\dfrac12 ab\\sin C\\) fixes \\(\\sin C\\), and \\(\\sin C = \\dfrac23\\) fits both an acute and an obtuse \\(C\\). A question that asks for \\(\\cos C\\) from the area is quietly assuming the acute one; if both signs are offered, the question cannot decide.",
        },
      ],
    },
  ],
};
