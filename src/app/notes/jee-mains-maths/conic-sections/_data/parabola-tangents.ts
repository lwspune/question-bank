import type { SubtopicNote } from "@/app/notes/_types";

export const PARABOLA_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents and Normals to a Parabola",
  title: "Tangents and Normals to a Parabola",
  oneLineDefinition:
    "The tangent to a parabola in point, parametric and slope form, the two tangents from an outside point and where tangents meet, and the normal: where it meets the parabola again and how it gives the shortest distance.",
  whyItMatters:
    "Twenty-five PYQs. The slope form y = mx + a/m answers most tangent questions in one line, and the parametric normal answers the rest. Three ideas cover the page.",
  concepts: [
    // C1 — tangent forms
    {
      kind: "formula" as const,
      slug: "jcon-parabola-tangent",
      name: "The tangent: point, parametric and slope forms",
      intuition:
        "Substitute a line into \\(y^2=4ax\\) and you get a quadratic. The line is a tangent when that quadratic has a double root. For \\(y=mx+c\\) this happens exactly when \\(c=\\frac{a}{m}\\), which is the slope form. The tangent at a known point comes from the \\(T=0\\) rule; at the parametric point it is \\(ty=x+at^2\\).",
      definition:
        "- **At \\((x_1,y_1)\\):** \\(yy_1=2a(x+x_1)\\).\n" +
        "- **At \\(t\\):** \\(ty=x+at^2\\).\n" +
        "- **Slope form:** \\(y=mx+\\frac{a}{m}\\), touching at \\(\\left(\\frac{a}{m^2},\\frac{2a}{m}\\right)\\).\n" +
        "- For \\(x^2=4ay\\): \\(y=mx-am^2\\), touching at \\((2am,\\,am^2)\\).\n" +
        "- For \\(y=px^2+qx+r\\): substitute the line and set the discriminant to zero, or use the derivative.",
      formula: {
        label: "Slope form for y² = 4ax",
        latex: "y=mx+\\frac{a}{m},\\qquad \\text{touching at }\\left(\\frac{a}{m^2},\\frac{2a}{m}\\right)",
      },
      authoredExample: {
        prompt: "Find the tangent to \\(y^2=8x\\) with slope \\(2\\), and its point of contact.",
        steps: [
          "\\(a=2\\): \\(c=\\frac{a}{m}=1\\), so \\(y=2x+1\\).",
          "Contact \\(\\left(\\frac{2}{4},\\frac{4}{2}\\right)=\\left(\\frac12,2\\right)\\). Check: \\(2^2=8\\cdot\\frac12\\).",
        ],
        answer: "\\(y=2x+1\\), touching at \\(\\left(\\frac12,2\\right)\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(c\\) is \\(y=3x+c\\) a tangent to \\(y^2=12x\\)?",
        steps: [
          "\\(a=3\\), \\(m=3\\): \\(c=\\frac{a}{m}\\).",
        ],
        answer: "\\(c=1\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(y^2=4x\\) at \\((1,2)\\)?", answer: "\\(y=x+1\\)" },
        { prompt: "Tangent to \\(y^2=8x\\) at \\(t=2\\)?", answer: "\\(2y=x+8\\)" },
        { prompt: "Is \\(y=x+2\\) a tangent to \\(y^2=8x\\)?", answer: "Yes: \\(\\frac{a}{m}=2\\)" },
        { prompt: "Tangent to \\(y=x^2\\) with slope \\(4\\)?", answer: "\\(y=4x-4\\)" },
      ],
      pyqExampleId: "5a8c2210-a007-42a9-a048-fe217928b4aa", // 2021 — tangent to y^2 = 6x perpendicular to 2x + y = 1
      traps: [
        {
          title: "The contact point is \\(\\left(\\frac{a}{m^2},\\frac{2a}{m}\\right)\\), not \\((a,2a)\\)",
          body: "\\((a,2a)\\) is the end of the latus rectum, where the slope is \\(1\\). For any other slope use \\(\\left(\\frac{a}{m^2},\\frac{2a}{m}\\right)\\).",
        },
      ],
    },

    // C2 — tangents from a point
    {
      kind: "formula" as const,
      slug: "jcon-parabola-tangent-pairs",
      name: "Two tangents: from a point, where they meet, and the directrix",
      intuition:
        "A tangent \\(y=mx+\\frac{a}{m}\\) passes through \\((h,k)\\) when \\(hm^2-km+a=0\\). That quadratic's two roots are the slopes of the two tangents from the point, so their sum and product come free. If the tangents are perpendicular, the product \\(\\frac{a}{h}\\) is \\(-1\\), so \\(h=-a\\): the point is on the directrix. And the tangents at \\(t_1\\) and \\(t_2\\) meet at a point with a clean formula.",
      definition:
        "- **Slopes from \\((h,k)\\):** roots of \\(hm^2-km+a=0\\), so \\(m_1+m_2=\\frac{k}{h}\\), \\(m_1m_2=\\frac{a}{h}\\).\n" +
        "- **Perpendicular tangents** meet on the directrix \\(x=-a\\).\n" +
        "- **Tangents at \\(t_1,t_2\\)** meet at \\((at_1t_2,\\ a(t_1+t_2))\\).\n" +
        "- **Chord of contact** of \\((h,k)\\): \\(ky=2a(x+h)\\).\n" +
        "- The tangent at \\(t\\) meets the axis at \\((-at^2,0)\\) and the directrix at \\(\\left(-a,\\ at-\\frac{a}{t}\\right)\\).",
      formula: {
        label: "Where the tangents at t₁ and t₂ meet",
        latex: "(at_1t_2,\\ a(t_1+t_2))",
      },
      authoredExample: {
        prompt: "Show that the tangents from \\((-2,1)\\) to \\(y^2=8x\\) are perpendicular.",
        steps: [
          "\\(a=2\\), \\(h=-2\\), \\(k=1\\): \\(-2m^2-m+2=0\\).",
          "Product of the roots \\(=\\frac{2}{-2}=-1\\).",
          "This fits: \\((-2,1)\\) lies on the directrix \\(x=-2\\).",
        ],
        answer: "\\(m_1m_2=-1\\), so they are perpendicular.",
      },
      selfCheckExample: {
        prompt: "Where do the tangents to \\(y^2=4x\\) at \\(t=1\\) and \\(t=3\\) meet?",
        steps: [
          "\\(a=1\\): \\((at_1t_2,\\ a(t_1+t_2))\\).",
        ],
        answer: "\\((3,4)\\).",
      },
      practiceSet: [
        { prompt: "Chord of contact of \\((-1,2)\\) for \\(y^2=4x\\)?", answer: "\\(y=x-1\\)" },
        { prompt: "Locus of the meeting point of perpendicular tangents to \\(y^2=12x\\)?", answer: "\\(x=-3\\)" },
        { prompt: "Product of the slopes of the tangents from \\((1,3)\\) to \\(y^2=4x\\)?", answer: "\\(1\\)", method: "\\(m^2-3m+1=0\\)" },
        { prompt: "Where does the tangent at \\(t=2\\) to \\(y^2=4x\\) meet the axis?", answer: "\\((-4,0)\\)" },
      ],
      pyqExampleId: "456e279a-1a9a-4990-bd47-79f616cb587c", // 2021 — perpendicular tangents to y^2 = 16(x - 3): locus is the directrix
      traps: [
        {
          title: "Shift before using \\(x=-a\\)",
          body: "For \\(y^2=16(x-3)\\) the vertex is at \\((3,0)\\), so the directrix is \\(x=3-4=-1\\), not \\(x=-4\\).",
        },
      ],
    },

    // C3 — normals
    {
      kind: "formula" as const,
      slug: "jcon-parabola-normal",
      name: "The normal, and the shortest distance to a parabola",
      intuition:
        "The normal at \\(t\\) is perpendicular to the tangent \\(ty=x+at^2\\), so its slope is \\(-t\\). Written with its slope \\(m\\), a normal is \\(y=mx-2am-am^3\\), a cubic in \\(m\\): up to three normals pass through a point. The shortest distance from an outside point to the parabola is measured along a normal, so to find it, find the normal through that point.",
      definition:
        "- **At \\(t\\):** \\(y=-tx+2at+at^3\\).\n" +
        "- **Slope form:** \\(y=mx-2am-am^3\\), with foot \\((am^2,-2am)\\).\n" +
        "- **Meets the parabola again** at \\(t_2=-t-\\frac{2}{t}\\).\n" +
        "- **Three normals** from \\((h,0)\\) need \\(h>2a\\).\n" +
        "- **Shortest distance** from a point: along the normal through it; compare with the vertex if needed.",
      formula: {
        label: "Normal in slope form, y² = 4ax",
        latex: "y=mx-2am-am^3,\\qquad \\text{foot }(am^2,\\,-2am)",
      },
      authoredExample: {
        prompt: "The normal to \\(y^2=4x\\) at \\((1,2)\\) meets the parabola again at \\(Q\\). Find \\(Q\\).",
        steps: [
          "\\((1,2)\\) has \\(t=1\\); the normal is \\(y=-x+2+1=-x+3\\).",
          "\\(t_2=-1-2=-3\\), so \\(Q=(9,-6)\\). Check: \\(-6=-9+3\\).",
        ],
        answer: "\\(Q=(9,-6)\\).",
      },
      selfCheckExample: {
        prompt: "Find the shortest distance from \\((6,0)\\) to \\(y^2=4x\\).",
        steps: [
          "A normal \\(y=mx-2m-m^3\\) through \\((6,0)\\): \\(m(4-m^2)=0\\), so \\(m=\\pm2\\) (or \\(0\\), the axis).",
          "Feet: \\((am^2,-2am)=(4,\\mp4)\\), at distance \\(\\sqrt{4+16}=2\\sqrt5\\).",
          "The vertex is \\(6\\) away, which is larger.",
        ],
        answer: "\\(2\\sqrt5\\).",
      },
      practiceSet: [
        { prompt: "Normal to \\(y^2=8x\\) at \\(t=1\\)?", answer: "\\(y=-x+6\\)" },
        { prompt: "Least \\(h\\) with three normals from \\((h,0)\\) to \\(y^2=4x\\)?", answer: "Any \\(h>2\\)" },
        { prompt: "The normal at \\(t=2\\) meets the parabola again at?", answer: "\\(t=-3\\)" },
        { prompt: "Foot of the normal of slope \\(1\\) on \\(y^2=4x\\)?", answer: "\\((1,-2)\\)" },
      ],
      pyqExampleId: "969b644b-3391-4c3f-abf1-67f6d17ba3fc", // 2021 — normal at P meets the parabola again at Q, PQ^2
      traps: [
        {
          title: "The slope-form foot is \\((am^2,-2am)\\)",
          body: "For the normal \\(y=mx-2am-am^3\\) the foot has a MINUS \\(2am\\). The tangent's contact point \\(\\left(\\frac{a}{m^2},\\frac{2a}{m}\\right)\\) is a different point with a different \\(m\\).",
        },
      ],
    },
  ],
};
