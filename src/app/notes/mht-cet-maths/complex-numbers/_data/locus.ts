import type { SubtopicNote } from "@/app/notes/_types";

export const LOCUS_NOTE: SubtopicNote = {
  subtopicName: "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
  title: "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
  oneLineDefinition:
    "|z − a| is the distance from z to the point a — so |z − a| = r is a circle, |z − a| = |z − b| is a perpendicular bisector, and the greatest and least |z| on a disc are |a| ± r.",
  whyItMatters:
    "12 PYQs at 17% HARD — the cheapest page in the chapter once one sentence is fixed: a modulus is a distance. " +
    "Every locus question is then geometry: a circle from |z − a| = r or from a ratio of distances, a line from equal distances, and the greatest-and-least-modulus stem that is answered by adding and subtracting a radius — the same move as the Circle chapter's extremum question. " +
    "The one algebraic member is 'Re of a quotient is zero', which is a circle after rationalising.",
  concepts: [
    // 1 — circle from a modulus condition
    {
      kind: "formula" as const,
      slug: "cetcn-circle-from-modulus-condition",
      name: "|z − a| = r Is a Circle: Centre a, Radius r",
      intuition:
        "\\(|z - a|\\) measures how far \\(z\\) is from the point \\(a\\). Keeping that distance fixed at \\(r\\) traces a circle. \\(|z + 1| = 1\\) is \\(|z - (-1)| = 1\\): centre \\((-1, 0)\\), radius \\(1\\).",
      definition:
        "- \\(|z - (x_0 + iy_0)| = r \\iff (x - x_0)^2 + (y - y_0)^2 = r^2\\). Read the centre off the sign: \\(|z + 1|\\) is centred at \\(-1\\).\n" +
        "- \\(\\left|\\dfrac{z}{1 + i}\\right| = 2\\) means \\(|z| = 2|1 + i| = 2\\sqrt2\\): a circle centred at the origin of radius \\(2\\sqrt2\\) (\\(x^2 + y^2 = 8\\)).\n" +
        "- A **ratio of distances** \\(\\left|\\dfrac{z + i}{z - i}\\right| = \\sqrt3\\) is also a circle (Apollonius): square and expand, \\(x^2 + (y + 1)^2 = 3\\left[x^2 + (y - 1)^2\\right]\\), giving \\(x^2 + (y - 2)^2 = 3\\) — centre \\((0, 2)\\), radius \\(\\sqrt3\\).\n" +
        "- Ratio equal to \\(1\\) is the exception: that is a line (next concept).",
      formula: {
        label: "Circle in the Argand plane",
        latex:
          "|z - a| = r \\iff \\text{circle, centre } a,\\ \\text{radius } r \\qquad \\left|\\frac{z - a}{z - b}\\right| = k \\ne 1 \\iff \\text{circle (Apollonius)}",
      },
      authoredExample: {
        prompt: "Describe the locus \\(|z - 2 - 3i| = 4\\).",
        steps: [
          "\\(|z - (2 + 3i)| = 4\\): distance from the point \\(2 + 3i\\) is \\(4\\).",
        ],
        answer: "A circle with centre \\((2, 3)\\) and radius \\(4\\).",
      },
      selfCheckExample: {
        prompt: "Find the centre and radius of \\(\\left|\\dfrac{z - 3}{z}\\right| = 2\\).",
        steps: [
          "\\(|z - 3|^2 = 4|z|^2\\): \\((x - 3)^2 + y^2 = 4x^2 + 4y^2 \\Rightarrow 3x^2 + 3y^2 + 6x - 9 = 0 \\Rightarrow x^2 + y^2 + 2x - 3 = 0\\).",
          "\\((x + 1)^2 + y^2 = 4\\).",
        ],
        answer: "Centre \\((-1, 0)\\), radius \\(2\\).",
      },
      practiceSet: [
        {
          prompt: "Centre of \\(|z + 2i| = 3\\)?",
          answer: "\\((0, -2)\\)",
        },
        {
          prompt: "Radius of \\(\\left|\\dfrac{z}{1 + i}\\right| = 2\\)?",
          answer: "\\(2\\sqrt2\\)",
        },
        {
          prompt: "\\(|z| = 5\\) is?",
          answer: "A circle of radius \\(5\\) centred at the origin.",
        },
        {
          prompt: "\\(|z - 1| = 1\\) passes through the origin?",
          answer: "Yes — the origin is at distance \\(1\\) from \\(1\\).",
        },
      ],
      pyqExampleId: "5955f7ce-7e13-405e-9eb0-3dac3bdb9a3f",
      traps: [
        {
          title: "Reading |z + 1| as centred at +1",
          body:
            "\\(|z + 1| = |z - (-1)|\\): the centre is \\(-1\\). The option 'centre \\((1, 0)\\)' is built for this sign slip.",
        },
      ],
    },

    // 2 — perpendicular bisector and lines
    {
      kind: "formula" as const,
      slug: "cetcn-perpendicular-bisector-and-lines",
      name: "|z − a| = |z − b| Is the Perpendicular Bisector of ab",
      intuition:
        "Points equidistant from two fixed points lie on the perpendicular bisector of the segment joining them. So an equality of two moduli is a straight line — no circle, whatever the algebra looks like.",
      definition:
        "- \\(|z - a| = |z - b|\\): the perpendicular bisector of \\(a\\) and \\(b\\). \\(|z + 1 - i| = |z - 1 + i|\\) is equidistance from \\(-1 + i\\) and \\(1 - i\\): squaring gives \\(4x - 4y = 0\\), the line \\(y = x\\) through the origin in quadrants I and III.\n" +
        "- \\(\\left|\\dfrac{z - 1}{z + 2i}\\right| = 1\\) and \\(\\left|\\dfrac{z}{z - i/3}\\right| = 1\\) are the same shape — a line — because the ratio is \\(1\\).\n" +
        "- **Difference of distances**: \\(|z + 3| - |z - 3| = 6\\) with foci \\(\\pm3\\) at distance \\(6\\) apart is the degenerate hyperbola — the ray of the real axis with \\(x \\ge 3\\). The option list says 'X-axis'.\n" +
        "- Squaring \\(|z - a| = |z - b|\\) always cancels the \\(x^2\\) and \\(y^2\\) terms; if they do not cancel, the two moduli had different coefficients and the locus is a circle.",
      formula: {
        label: "Line from equal distances",
        latex:
          "|z - a| = |z - b| \\iff \\text{perpendicular bisector of } a, b \\qquad |z - a| - |z - b| = |a - b| \\ \\text{ is a ray (degenerate hyperbola)}",
      },
      authoredExample: {
        prompt: "Find the locus \\(|z - 2| = |z + 2i|\\).",
        steps: [
          "\\((x - 2)^2 + y^2 = x^2 + (y + 2)^2 \\Rightarrow -4x + 4 = 4y + 4 \\Rightarrow y = -x\\).",
        ],
        answer: "The line \\(y = -x\\) — the perpendicular bisector of \\(2\\) and \\(-2i\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus \\(\\left|\\dfrac{z - 3}{z - 1}\\right| = 1\\).",
        steps: [
          "\\(|z - 3| = |z - 1|\\): equidistant from \\(3\\) and \\(1\\), so \\(x = 2\\).",
        ],
        answer: "The vertical line \\(x = 2\\).",
      },
      practiceSet: [
        {
          prompt: "\\(|z| = |z - 2|\\) is?",
          answer: "The line \\(x = 1\\).",
        },
        {
          prompt: "\\(|z - i| = |z + i|\\) is?",
          answer: "The real axis, \\(y = 0\\).",
        },
        {
          prompt: "Is \\(\\left|\\dfrac{z - 1}{z + 1}\\right| = 2\\) a line or a circle?",
          answer: "A circle (ratio \\(\\ne 1\\)).",
        },
        {
          prompt: "Slope of the locus \\(|z + 1 - i| = |z - 1 + i|\\)?",
          answer: "\\(1\\)",
        },
      ],
      pyqExampleId: "7d1da260-8018-4cc3-a1d5-2aa431787dd5",
      traps: [
        {
          title: "Calling every modulus locus a circle",
          body:
            "When the two moduli have equal weight the squares cancel and the locus is a LINE. 'Circle' is the first option on every such stem for the student who did not square.",
        },
      ],
    },

    // 3 — Re of a quotient = 0
    {
      kind: "formula" as const,
      slug: "cetcn-real-part-of-a-quotient-is-zero",
      name: "Re of a Quotient Equals Zero: Rationalise, Then Read the Circle",
      intuition:
        "'\\(\\dfrac{z - 1}{2z + 1}\\) is purely imaginary' means its real part is \\(0\\). Rationalise, and that real part is a quadratic in \\(x\\) and \\(y\\) with equal \\(x^2, y^2\\) coefficients — a circle whose centre and radius are read by completing the square.",
      definition:
        "- Real part of \\(\\dfrac{z - 1}{2z + 1}\\) with \\(z = x + iy\\): numerator of the real part is \\((x - 1)(2x + 1) + 2y^2 = 2x^2 + 2y^2 - x - 1\\). Setting it to \\(0\\): \\(\\left(x - \\frac14\\right)^2 + y^2 = \\frac{9}{16}\\), radius \\(\\frac34\\).\n" +
        "- On \\(|z| = 1\\): \\(\\operatorname{Re}\\dfrac{z - 1}{z + 1} = \\dfrac{x^2 + y^2 - 1}{(x + 1)^2 + y^2} = 0\\) — the unit circle maps to the imaginary axis.\n" +
        "- An **integer-point** condition can define a finite locus: \\(z\\bar z^3 + \\bar z z^3 = 350\\) is \\(|z|^2(z^2 + \\bar z^2) = 2(x^2 + y^2)(x^2 - y^2) = 350\\), i.e. \\(x^4 - y^4 = 175 = 25\\times7\\), so \\(x^2 = 16\\), \\(y^2 = 9\\): the four points \\((\\pm4, \\pm3)\\) form a rectangle of area \\(8\\times6 = 48\\).\n" +
        "- Method: rationalise → separate the real part → set to zero → complete the square.",
      formula: {
        label: "Purely imaginary quotient",
        latex:
          "\\operatorname{Re}\\frac{z - 1}{2z + 1} = 0 \\iff 2x^2 + 2y^2 - x - 1 = 0 \\iff \\left(x - \\tfrac14\\right)^2 + y^2 = \\tfrac{9}{16}",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac{z - 2}{z + 2}\\) is purely imaginary, find the locus of \\(z\\).",
        steps: [
          "Rationalise: real part of \\(\\dfrac{(x - 2 + iy)(x + 2 - iy)}{(x + 2)^2 + y^2}\\) has numerator \\((x - 2)(x + 2) + y^2 = x^2 + y^2 - 4\\).",
          "Setting it to \\(0\\): \\(x^2 + y^2 = 4\\).",
        ],
        answer: "The circle \\(|z| = 2\\) (excluding \\(z = -2\\)).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{z - i}{z + i}\\) is purely imaginary, find the locus of \\(z\\).",
        steps: [
          "Real-part numerator: \\((x + i(y - 1))(x - i(y + 1))\\) has real part \\(x^2 + (y - 1)(y + 1) = x^2 + y^2 - 1\\).",
          "\\(x^2 + y^2 = 1\\).",
        ],
        answer: "The unit circle (excluding \\(z = -i\\)).",
      },
      pyqExampleId: "cc2ff9a2-04a7-4a5e-b3f2-11f13e0387ec",
      traps: [
        {
          title: "Reporting the radius squared",
          body:
            "\\(\\left(x - \\frac14\\right)^2 + y^2 = \\frac{9}{16}\\) has radius \\(\\frac34\\); \\(\\frac{9}{16}\\) is the first distractor on the list.",
        },
      ],
    },

    // 4 — greatest and least modulus
    {
      kind: "formula" as const,
      slug: "cetcn-greatest-and-least-modulus-on-a-disc",
      name: "Greatest and Least |z| on a Disc: |a| + r and |a| − r",
      intuition:
        "\\(|z - a| \\le r\\) is a disc centred at \\(a\\). The point of the disc nearest the origin is \\(r\\) closer than the centre; the farthest is \\(r\\) farther. So the extreme values of \\(|z|\\) are \\(|a| - r\\) and \\(|a| + r\\), and their difference is \\(2r\\) whatever the centre.",
      definition:
        "- On \\(|z - a| \\le r\\) (or \\(= r\\)): \\(\\max|z| = |a| + r\\), \\(\\min|z| = \\big||a| - r\\big|\\).\n" +
        "- \\(|z - 2 + i| \\le 2\\): centre \\(2 - i\\), \\(|a| = \\sqrt5\\), so greatest \\(\\sqrt5 + 2\\), least \\(\\sqrt5 - 2\\), difference \\(4\\).\n" +
        "- The **difference** is always \\(2r\\) when the origin is outside the disc — the question can be answered without computing \\(|a|\\) at all.\n" +
        "- Same move for \\(|z - z_1|\\) on a disc centred at \\(a\\): \\(|z_1 - a| \\pm r\\). It is the Circle chapter's 'maximum distance from a point to a circle' in complex dress.",
      formula: {
        label: "Extreme modulus on a disc",
        latex:
          "|z - a| \\le r:\\quad |a| - r \\le |z| \\le |a| + r \\qquad \\max|z| - \\min|z| = 2r \\ (|a| \\ge r)",
      },
      authoredExample: {
        prompt: "If \\(|z - 3 - 4i| \\le 2\\), find the greatest and least values of \\(|z|\\).",
        steps: [
          "Centre \\(3 + 4i\\), \\(|a| = 5\\), radius \\(2\\).",
          "Greatest \\(5 + 2 = 7\\); least \\(5 - 2 = 3\\).",
        ],
        answer: "Greatest \\(7\\), least \\(3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(|z + 1 - i| = 1\\), find the difference between the greatest and least values of \\(|z|\\).",
        steps: [
          "Centre \\(-1 + i\\) with \\(|a| = \\sqrt2 > 1 = r\\), so the origin is outside the circle.",
          "Difference \\(= 2r = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt: "Max \\(|z|\\) on \\(|z - 5| \\le 3\\)?",
          answer: "\\(8\\)",
        },
        {
          prompt: "Min \\(|z|\\) on \\(|z - 5| \\le 3\\)?",
          answer: "\\(2\\)",
        },
        {
          prompt: "Difference of max and min \\(|z|\\) on \\(|z - 2 + i| \\le 2\\)?",
          answer: "\\(4\\)",
        },
        {
          prompt: "Min \\(|z|\\) on \\(|z - 1| \\le 3\\)?",
          answer: "\\(0\\)",
          method: "The origin is inside the disc.",
        },
      ],
      pyqExampleId: "93f4bc63-a68a-42f5-8d5e-62ceeb20f303",
      traps: [
        {
          title: "Answering 2√5 for the difference",
          body:
            "The difference of the extreme moduli is \\(2r\\), the diameter, not \\(2|a|\\). For \\(|z - 2 + i| \\le 2\\) that is \\(4\\); \\(2\\sqrt5\\) is the planted wrong answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Modulus and Argument — |z| as a distance, the fact every locus here rests on",
      href: "/notes/mht-cet-maths/complex-numbers/cetcn-modulus-argument-polar",
    },
  ],
};
