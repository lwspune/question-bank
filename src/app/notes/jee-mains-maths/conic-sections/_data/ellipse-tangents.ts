import type { SubtopicNote } from "@/app/notes/_types";

export const ELLIPSE_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents, Normals and Chords of an Ellipse",
  title: "Tangents, Normals and Chords of an Ellipse",
  oneLineDefinition:
    "Lines and the ellipse: the tangent in point, parametric and slope form, pairs of tangents and the director circle, the normal, and chords fixed by a midpoint or through a given point.",
  whyItMatters:
    "Twenty-six PYQs. The tangency condition c² = a²m² + b² and the midpoint-chord rule T = S₁ between them answer most. Four ideas cover the page.",
  concepts: [
    // C1 — tangent forms
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-tangent",
      name: "The tangent: point, parametric and slope forms",
      intuition:
        "The tangent at a point of the ellipse follows the same \\(T=0\\) pattern as for a circle: replace \\(x^2\\) by \\(xx_1\\) and \\(y^2\\) by \\(yy_1\\). A line \\(y=mx+c\\) is a tangent exactly when \\(c^2=a^2m^2+b^2\\). The tangent at the parametric point cuts the axes at \\(a\\sec\\theta\\) and \\(b\\csc\\theta\\), which makes 'smallest triangle with the axes' questions one line.",
      definition:
        "- **At \\((x_1,y_1)\\):** \\(\\frac{xx_1}{a^2}+\\frac{yy_1}{b^2}=1\\).\n" +
        "- **At \\(\\theta\\):** \\(\\frac{x\\cos\\theta}{a}+\\frac{y\\sin\\theta}{b}=1\\).\n" +
        "- **Slope form:** \\(y=mx\\pm\\sqrt{a^2m^2+b^2}\\), touching at \\(\\left(-\\frac{a^2m}{c},\\frac{b^2}{c}\\right)\\).\n" +
        "- **Intercepts** of the tangent at \\(\\theta\\): \\(a\\sec\\theta\\) and \\(b\\csc\\theta\\); the triangle with the axes has area \\(\\frac{ab}{\\sin2\\theta}\\geq ab\\).",
      formula: {
        label: "Tangency condition",
        latex: "y=mx+c\\ \\text{touches}\\ \\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\iff c^2=a^2m^2+b^2",
      },
      authoredExample: {
        prompt: "Find the tangents of slope \\(1\\) to \\(\\frac{x^2}{16}+\\frac{y^2}{9}=1\\) and the contact point of the upper one.",
        steps: [
          "\\(c^2=16+9=25\\): \\(y=x\\pm5\\).",
          "For \\(c=5\\): contact \\(\\left(-\\frac{16}{5},\\frac95\\right)\\). Check: \\(\\frac{256}{400}+\\frac{81}{225}=\\frac{16}{25}+\\frac{9}{25}=1\\).",
        ],
        answer: "\\(y=x\\pm5\\); the upper one touches at \\(\\left(-\\frac{16}{5},\\frac95\\right)\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(y=2x+k\\) a tangent to \\(\\frac{x^2}{4}+\\frac{y^2}{3}=1\\)?",
        steps: [
          "\\(k^2=a^2m^2+b^2=4\\cdot4+3\\).",
        ],
        answer: "\\(k=\\pm\\sqrt{19}\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\) at \\((0,2)\\)?", answer: "\\(y=2\\)" },
        { prompt: "Tangent to \\(\\frac{x^2}{8}+\\frac{y^2}{2}=1\\) at \\((2,1)\\)?", answer: "\\(x+2y=4\\)" },
        { prompt: "Least area of the triangle a tangent to \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\) makes with the axes?", answer: "\\(6\\)" },
        { prompt: "Is \\(y=x+3\\) a tangent to \\(\\frac{x^2}{5}+\\frac{y^2}{4}=1\\)?", answer: "Yes: \\(5+4=9\\)" },
      ],
      pyqExampleId: "a5ad3516-c5a1-4d98-8c8a-6043eaad1ae6", // 2021 — mx - y = 4 tangent to a shifted ellipse, 5m^2
      traps: [
        {
          title: "Shift the line before using \\(c^2=a^2m^2+b^2\\)",
          body: "The condition is for an ellipse centred at the origin. For \\(\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}=1\\), rewrite the line in \\(X=x-h\\), \\(Y=y-k\\) first; the slope stays, the intercept changes.",
        },
      ],
    },

    // C2 — pairs of tangents
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-tangent-pairs",
      name: "Pairs of tangents, the chord of contact and the director circle",
      intuition:
        "Tangents from an outside point \\((h,k)\\) have slopes that solve a quadratic, found by making \\(y-k=m(x-h)\\) satisfy the tangency condition. When the product of those slopes is \\(-1\\), the point sits on the director circle \\(x^2+y^2=a^2+b^2\\): every pair of perpendicular tangents meets there.",
      definition:
        "- **Slopes from \\((h,k)\\):** \\((h^2-a^2)m^2-2hkm+(k^2-b^2)=0\\).\n" +
        "- **Chord of contact:** \\(\\frac{hx}{a^2}+\\frac{ky}{b^2}=1\\).\n" +
        "- **Pair of tangents:** \\(SS_1=T^2\\).\n" +
        "- **Director circle:** \\(x^2+y^2=a^2+b^2\\), where perpendicular tangents meet.\n" +
        "- Angle \\(\\theta\\) between the tangents: \\(\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|\\) from the quadratic's sum and product.",
      formula: {
        label: "Director circle",
        latex: "x^2+y^2=a^2+b^2",
      },
      authoredExample: {
        prompt: "Where do perpendicular tangents to \\(\\frac{x^2}{16}+\\frac{y^2}{9}=1\\) meet?",
        steps: [
          "They meet on the director circle \\(x^2+y^2=16+9\\).",
        ],
        answer: "On \\(x^2+y^2=25\\).",
      },
      selfCheckExample: {
        prompt: "Find the chord of contact of \\((4,3)\\) with respect to \\(\\frac{x^2}{16}+\\frac{y^2}{9}=1\\).",
        steps: [
          "\\(\\frac{4x}{16}+\\frac{3y}{9}=1\\).",
        ],
        answer: "\\(\\frac{x}{4}+\\frac{y}{3}=1\\).",
      },
      practiceSet: [
        { prompt: "Director circle of \\(\\frac{x^2}{4}+y^2=1\\)?", answer: "\\(x^2+y^2=5\\)" },
        { prompt: "Are the tangents from \\((3,4)\\) to \\(\\frac{x^2}{9}+\\frac{y^2}{16}=1\\) perpendicular?", answer: "Yes: \\(9+16=25\\)" },
        { prompt: "Chord of contact of \\((0,3)\\) for \\(\\frac{x^2}{4}+y^2=1\\)?", answer: "\\(y=\\frac13\\)" },
        { prompt: "Sum of slopes of tangents from \\((h,k)\\)?", answer: "\\(\\frac{2hk}{h^2-a^2}\\)" },
      ],
      pyqExampleId: "438b911e-f681-4cfc-9709-4517f4501c16", // 2022 — acute angle between the tangents from (1,3) to 2x^2 + 3y^2 = 5
      traps: [
        {
          title: "The director circle uses \\(a^2+b^2\\), not \\(a^2\\)",
          body: "\\(x^2+y^2=a^2\\) is the auxiliary circle, the circle on the major axis. The meeting points of perpendicular tangents are farther out, at radius \\(\\sqrt{a^2+b^2}\\).",
        },
      ],
    },

    // C3 — normals
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-normal",
      name: "The normal to an ellipse",
      intuition:
        "The normal at a point is perpendicular to the tangent there, with slope \\(\\frac{a^2y_1}{b^2x_1}\\). In parametric form it is \\(ax\\sec\\theta-by\\csc\\theta=a^2-b^2\\). Two uses come up: where a normal crosses an axis, and the largest circle centred on the major axis that fits inside the ellipse, which touches it where a normal passes through the centre of that circle.",
      definition:
        "- **At \\((x_1,y_1)\\):** \\(\\frac{a^2x}{x_1}-\\frac{b^2y}{y_1}=a^2-b^2\\).\n" +
        "- **At \\(\\theta\\):** \\(ax\\sec\\theta-by\\csc\\theta=a^2-b^2\\).\n" +
        "- It meets the major axis at \\(x=\\frac{(a^2-b^2)\\cos\\theta}{a}=ae^2\\cos\\theta\\).\n" +
        "- The greatest distance of a normal from the centre is \\(a-b\\).",
      formula: {
        label: "Normal at the parametric point",
        latex: "ax\\sec\\theta-by\\csc\\theta=a^2-b^2",
      },
      authoredExample: {
        prompt: "Find the normal to \\(\\frac{x^2}{16}+\\frac{y^2}{4}=1\\) at \\((2,\\sqrt3)\\).",
        steps: [
          "Point form: \\(\\frac{16x}{2}-\\frac{4y}{\\sqrt3}=16-4\\).",
          "Divide by \\(4\\): \\(2x-\\frac{y}{\\sqrt3}=3\\).",
        ],
        answer: "\\(2\\sqrt3\\,x-y=3\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "Where does the normal to \\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\) at \\(\\left(3,\\frac{16}{5}\\right)\\) meet the \\(x\\)-axis?",
        steps: [
          "Here \\(\\cos\\theta=\\frac35\\).",
          "\\(x=\\frac{(25-16)\\cdot\\frac35}{5}\\).",
        ],
        answer: "\\(\\left(\\frac{27}{25},0\\right)\\).",
      },
      practiceSet: [
        { prompt: "Greatest distance of a normal of \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) from the centre?", answer: "\\(2\\)" },
        { prompt: "Normal at an end of the minor axis?", answer: "The minor axis itself (\\(x=0\\))" },
        { prompt: "Slope of the normal at \\((x_1,y_1)\\)?", answer: "\\(\\frac{a^2y_1}{b^2x_1}\\)" },
        { prompt: "Normal to \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\) at \\((3,0)\\)?", answer: "\\(y=0\\)" },
      ],
      pyqExampleId: "3fb23885-6281-4fa3-8723-dfcd7fd2ecc8", // 2023 — greatest distance of a normal from the centre is 1
      traps: [
        {
          title: "The normal has a MINUS between its terms",
          body: "The tangent is \\(\\frac{xx_1}{a^2}+\\frac{yy_1}{b^2}=1\\); the normal is \\(\\frac{a^2x}{x_1}-\\frac{b^2y}{y_1}=a^2-b^2\\). The coordinates move to the denominators and the sign changes.",
        },
      ],
    },

    // C4 — chords
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-chords",
      name: "Chords: by midpoint, through a point, and at right angles at the centre",
      intuition:
        "The chord with a given midpoint is \\(T=S_1\\), as for every conic. When a line through a point \\(P\\) meets the ellipse at \\(A\\) and \\(B\\), write the line as \\(x=x_0+r\\cos\\theta\\), \\(y=y_0+r\\sin\\theta\\): the two values of \\(r\\) are \\(PA\\) and \\(PB\\), so their product comes straight from the quadratic. And two semi-diameters \\(OP\\), \\(OQ\\) at right angles satisfy a fixed rule for their lengths.",
      definition:
        "- **Midpoint \\((h,k)\\):** \\(\\frac{hx}{a^2}+\\frac{ky}{b^2}=\\frac{h^2}{a^2}+\\frac{k^2}{b^2}\\); slope \\(-\\frac{b^2h}{a^2k}\\).\n" +
        "- **Line through \\(P\\):** substitute \\((x_0+r\\cos\\theta,\\ y_0+r\\sin\\theta)\\); \\(PA\\cdot PB=|r_1r_2|\\).\n" +
        "- **Perpendicular semi-diameters:** \\(\\frac{1}{OP^2}+\\frac{1}{OQ^2}=\\frac{1}{a^2}+\\frac{1}{b^2}\\).\n" +
        "- **Midpoints of focal chords:** put the focus into \\(T=S_1\\).",
      formula: {
        label: "Chord with midpoint (h, k)",
        latex: "\\frac{hx}{a^2}+\\frac{ky}{b^2}=\\frac{h^2}{a^2}+\\frac{k^2}{b^2}",
      },
      authoredExample: {
        prompt: "Find the chord of \\(\\frac{x^2}{16}+\\frac{y^2}{9}=1\\) bisected at \\((2,1)\\).",
        steps: [
          "\\(T=S_1\\): \\(\\frac{2x}{16}+\\frac{y}{9}=\\frac{4}{16}+\\frac19=\\frac{13}{36}\\).",
          "Multiply by \\(72\\): \\(9x+8y=26\\).",
          "Check: slope \\(-\\frac{9\\cdot2}{16\\cdot1}=-\\frac98\\), and \\((2,1)\\) lies on it.",
        ],
        answer: "\\(9x+8y=26\\).",
      },
      selfCheckExample: {
        prompt: "\\(OP\\) and \\(OQ\\) are perpendicular semi-diameters of \\(\\frac{x^2}{4}+y^2=1\\). Find \\(\\frac{1}{OP^2}+\\frac{1}{OQ^2}\\).",
        steps: [
          "\\(\\frac{1}{a^2}+\\frac{1}{b^2}=\\frac14+1\\).",
        ],
        answer: "\\(\\frac54\\).",
      },
      practiceSet: [
        { prompt: "Slope of the chord of \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\) with midpoint \\((1,1)\\)?", answer: "\\(-\\frac49\\)" },
        { prompt: "Chord of \\(\\frac{x^2}{3}+y^2=1\\) along \\(y=x\\)?", answer: "\\(\\sqrt6\\)" },
        { prompt: "Chord of \\(\\frac{x^2}{4}+\\frac{y^2}{2}=1\\) bisected at \\((1,0)\\)?", answer: "\\(x=1\\)" },
        { prompt: "Line \\(y=0\\) through \\((1,0)\\) meets \\(\\frac{x^2}{4}+y^2=1\\) at \\(A\\), \\(B\\). \\(PA\\cdot PB\\)?", answer: "\\(3\\)", method: "\\((2-1)(2+1)\\)" },
      ],
      pyqExampleId: "28890271-fe35-4140-9655-1db931656699", // 2025 — chord of x^2/9 + y^2/4 = 1 with midpoint (5/2, 1/2)
      traps: [
        {
          title: "\\(T=S_1\\) has \\(S_1\\) on the right, not \\(1\\)",
          body: "The chord with midpoint \\((h,k)\\) ends in \\(\\frac{h^2}{a^2}+\\frac{k^2}{b^2}\\). Writing \\(1\\) there gives the tangent-like line \\(T=0\\), which passes through a different point.",
        },
      ],
    },
  ],
};
