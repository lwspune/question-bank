import type { SubtopicNote } from "@/app/notes/_types";

export const BISECTORS_SL_NOTE: SubtopicNote = {
  subtopicName: "Angle Bisectors and Pairs of Lines",
  title: "Angle Bisectors and Pairs of Lines",
  oneLineDefinition:
    "The bisectors of the angles between two lines, the angle bisector theorem in a triangle, and a pair of lines through one point written as a single second-degree equation.",
  whyItMatters:
    "Ten PYQs, eight of them multiple choice, and three from 2026. Six find an angle bisector, between two lines or at a vertex of a triangle, some with the angle bisector theorem. Four write a pair of lines through one point as a single equation and read off its angle or its bisectors. Two ideas cover the page.",
  concepts: [
    // C1 — angle bisectors
    {
      kind: "formula" as const,
      slug: "jsl-bisector",
      name: "Angle bisectors",
      intuition:
        "A point on a bisector is equally far from the two lines, so the bisectors come from setting the two distances equal, with a ± sign. With both constants positive, the + sign gives the bisector of the angle that contains the origin. In a triangle, the bisector of angle \\(B\\) cuts \\(AC\\) at \\(D\\) with \\(AD:DC=BA:BC\\). The image of \\(A\\) in that bisector lies on line \\(BC\\), which often gives the side \\(BC\\) directly.",
      definition:
        "- Bisectors: \\(\\frac{a_1x+b_1y+c_1}{\\sqrt{a_1^2+b_1^2}}=\\pm\\frac{a_2x+b_2y+c_2}{\\sqrt{a_2^2+b_2^2}}\\).\n" +
        "- With \\(c_1,c_2>0\\), the + sign gives the bisector of the angle containing the origin.\n" +
        "- Internal bisector of \\(B\\) meets \\(AC\\) at \\(D\\) with \\(AD:DC=BA:BC\\).\n" +
        "- The image of \\(A\\) in the bisector of angle \\(B\\) lies on \\(BC\\).",
      formula: {
        label: "Angle bisectors",
        latex: "\\frac{a_1x+b_1y+c_1}{\\sqrt{a_1^2+b_1^2}}=\\pm\\frac{a_2x+b_2y+c_2}{\\sqrt{a_2^2+b_2^2}}",
      },
      authoredExample: {
        prompt: "Find the bisectors of the angles between \\(3x-4y+1=0\\) and \\(4x+3y+2=0\\).",
        steps: [
          "Both normals have length 5, so \\(3x-4y+1=\\pm(4x+3y+2)\\).",
          "The + sign gives \\(x+7y+1=0\\); the − sign gives \\(7x-y+3=0\\).",
        ],
        answer: "\\(x+7y+1=0\\) (the angle containing the origin) and \\(7x-y+3=0\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(ABC\\), \\(B=(0,0)\\), \\(A=(3,4)\\), \\(C=(12,0)\\). The bisector of angle \\(B\\) meets \\(AC\\) at \\(D\\). Find \\(D\\).",
        steps: [
          "\\(BA=5\\) and \\(BC=12\\), so \\(AD:DC=5:12\\).",
          "\\(D=\\frac{12A+5C}{17}=\\frac{(36+60,\\ 48)}{17}\\).",
        ],
        answer: "\\(\\left(\\frac{96}{17},\\frac{48}{17}\\right)\\).",
      },
      practiceSet: [
        { prompt: "Bisectors of the angles between the axes?", answer: "\\(y=x\\) and \\(y=-x\\)" },
        { prompt: "Bisectors of \\(y=0\\) and \\(y=\\sqrt3x\\)?", answer: "\\(y=\\frac{x}{\\sqrt3}\\) and \\(y=-\\sqrt3x\\)" },
        { prompt: "\\(BA=4\\), \\(BC=6\\), \\(AC=5\\); the bisector of \\(B\\) meets \\(AC\\) at \\(D\\). \\(AD\\)?", answer: "\\(2\\)" },
        { prompt: "The bisector of \\(x+y+1=0\\) and \\(x-y+3=0\\) in the angle containing the origin?", answer: "\\(y=1\\)" },
      ],
      pyqExampleId: "27603683-1aab-43bf-9f41-1093749e4f59", // 2026 — bisector of angle ABC from three points
      traps: [
        {
          title: "Origin angle is not always the acute one",
          body: "The + sign picks the angle containing the origin, which may be acute or obtuse. For the acute bisector, check the angle it makes with one of the lines: it must be less than \\(45^\\circ\\).",
        },
      ],
    },

    // C2 — pair of lines
    {
      kind: "formula" as const,
      slug: "jsl-pair",
      name: "A pair of lines in one equation",
      intuition:
        "Two lines \\(L_1=0\\) and \\(L_2=0\\) together are \\(L_1L_2=0\\), one second-degree equation. Through the origin, \\(ax^2+2hxy+by^2=0\\) is two lines whose slopes are the roots of \\(bm^2+2hm+a=0\\). The points equidistant from two lines satisfy one such equation too: squaring the bisector condition gives both bisectors at once. To get the lines joining the origin to the points where a line meets a curve, make the curve's equation homogeneous using the line.",
      definition:
        "- \\(ax^2+2hxy+by^2=0\\): \\(m_1+m_2=-\\frac{2h}b\\), \\(m_1m_2=\\frac ab\\).\n" +
        "- Angle: \\(\\tan\\theta=\\frac{2\\sqrt{h^2-ab}}{|a+b|}\\); perpendicular when \\(a+b=0\\).\n" +
        "- Its bisectors: \\(\\frac{x^2-y^2}{a-b}=\\frac{xy}h\\).\n" +
        "- Equidistant from two lines: \\(\\frac{(a_1x+b_1y+c_1)^2}{a_1^2+b_1^2}=\\frac{(a_2x+b_2y+c_2)^2}{a_2^2+b_2^2}\\).\n" +
        "- Homogenise with \\(lx+my=n\\): replace each 1 in the curve by \\(\\frac{lx+my}n\\).",
      formula: {
        label: "Pair of lines through the origin",
        latex: "ax^2+2hxy+by^2=0:\\quad \\tan\\theta=\\frac{2\\sqrt{h^2-ab}}{|a+b|}",
      },
      authoredExample: {
        prompt: "Find the angle between the lines \\(x^2-4xy+y^2=0\\).",
        steps: [
          "\\(a=1\\), \\(h=-2\\), \\(b=1\\).",
          "\\(\\tan\\theta=\\frac{2\\sqrt{4-1}}{2}=\\sqrt3\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "Find the angle at the origin subtended by the chord of \\(x^2+y^2=4\\) cut off by \\(x+y=2\\).",
        steps: [
          "Replace 4 by \\(4\\left(\\frac{x+y}2\\right)^2=(x+y)^2\\).",
          "\\(x^2+y^2=(x+y)^2\\) gives \\(xy=0\\): the two axes.",
        ],
        answer: "\\(90^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Product of the slopes for \\(2x^2+3xy-y^2=0\\)?", answer: "\\(-2\\)" },
        { prompt: "Are the lines \\(3x^2+2xy-3y^2=0\\) perpendicular?", answer: "Yes" },
        { prompt: "The lines \\(x^2-y^2=0\\)?", answer: "\\(y=x\\) and \\(y=-x\\)" },
        { prompt: "Sum of the slopes for \\(x^2+6xy+2y^2=0\\)?", answer: "\\(-3\\)" },
      ],
      pyqExampleId: "028f344e-c186-41f9-ba56-e9fc46f189ac", // 2024 — points equidistant from two lines as one equation
      traps: [
        {
          title: "h is half the xy coefficient",
          body: "In \\(ax^2+2hxy+by^2\\), the coefficient of \\(xy\\) is \\(2h\\). For \\(x^2-4xy+y^2\\), \\(h=-2\\), not \\(-4\\).",
        },
      ],
    },
  ],
};
