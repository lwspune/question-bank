import type { SubtopicNote } from "@/app/notes/_types";

export const ANGLE_PARALLEL_PERP_NOTE: SubtopicNote = {
  subtopicName: "Angle Between Lines, Parallelism, and Perpendicularity",
  title: "Angle Between Lines, Parallel & Perpendicular",
  oneLineDefinition:
    "The angle between two lines from their slopes, and the slope conditions for lines to be parallel or perpendicular.",
  whyItMatters:
    "The angle formula and the parallel/perpendicular tests are short, high-frequency tools — used directly and inside triangle and quadrilateral problems. The only trap is the sign in the tangent formula (acute vs obtuse).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lines-angle-between",
      name: "Angle between two lines",
      intuition:
        "The angle between two lines depends only on their slopes. The tangent formula gives the acute angle when you take the absolute value; drop the bars (or take the supplement) for the obtuse one.",
      definition:
        "For slopes \\(m_1,m_2\\): \\(\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1 m_2}\\right|\\) gives the **acute** angle; the obtuse angle is its supplement. If \\(1+m_1m_2=0\\) the lines are perpendicular (\\(\\theta=90°\\)). For lines given as \\(a_1x+b_1y+c_1=0\\), use slopes \\(-a_i/b_i\\).",
      formula: {
        label: "Angle between two lines",
        latex: "\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1 m_2}\\right|",
      },
      traps: [
        {
          title: "The difference of slopes is on **top**: \\(\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|\\)",
          body:
            "The angle formula puts the **difference** \\(m_1-m_2\\) in the numerator and \\(1+m_1m_2\\) in the denominator — students often invert it to \\(\\dfrac{1+m_1m_2}{m_1-m_2}\\). Also watch the denominator's **plus** sign (\\(1+m_1m_2\\), not \\(1-m_1m_2\\)); when \\(1+m_1m_2=0\\) the tangent blows up, correctly signalling \\(\\theta=90^\\circ\\).",
        },
      ],
      visualizationSlug: "lines-angle-between-diagram",
      authoredExample: {
        prompt: "Find the acute angle between lines of slopes \\(1\\) and \\(\\tfrac13\\).",
        steps: [
          "\\(\\tan\\theta=\\left|\\dfrac{1-\\tfrac13}{1+1\\cdot\\tfrac13}\\right|=\\dfrac{2/3}{4/3}=\\tfrac12\\).",
          "\\(\\theta=\\tan^{-1}\\tfrac12\\).",
        ],
        answer: "\\(\\tan^{-1}\\tfrac12\\).",
      },
      selfCheckExample: {
        prompt: "Find the obtuse angle between lines with slopes \\(2-\\sqrt3\\) and \\(2+\\sqrt3\\).",
        steps: [
          "\\(m_1m_2=(2)^2-(\\sqrt3)^2=1\\), so \\(1+m_1m_2=2\\); \\(m_1-m_2=-2\\sqrt3\\).",
          "\\(\\tan\\theta=\\left|\\tfrac{-2\\sqrt3}{2}\\right|=\\sqrt3\\Rightarrow\\theta=60°\\) (acute); obtuse \\(=120°\\).",
        ],
        answer: "\\(120°\\).",
      },
      practiceSet: [
        { prompt: "Angle formula between slopes \\(m_1,m_2\\)?", answer: "\\(\\tan\\theta=\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|\\)" },
        { prompt: "Absolute value gives which angle?", answer: "The acute one" },
        { prompt: "\\(1+m_1m_2=0\\) means?", answer: "Perpendicular (90°)" },
        { prompt: "Obtuse angle relates to acute how?", answer: "It is the supplement" },
      ],
      pyqExampleId: "1265efbd-5451-4221-94ad-93262c7ee25d", // obtuse angle between lines
    },

    {
      kind: "formula" as const,
      slug: "lines-parallel-perpendicular",
      name: "Parallel and perpendicular conditions",
      intuition:
        "Two lines are parallel when their slopes match, and perpendicular when the slopes multiply to \\(-1\\). In coefficient form these become clean conditions on \\(a,b\\).",
      definition:
        "**Parallel:** \\(m_1=m_2\\); for \\(a_1x+b_1y+c_1=0\\) and \\(a_2x+b_2y+c_2=0\\), parallel iff \\(a_1b_2=a_2b_1\\) (i.e. \\(\\tfrac{a_1}{a_2}=\\tfrac{b_1}{b_2}\\)). **Perpendicular:** \\(m_1 m_2=-1\\), i.e. \\(a_1a_2+b_1b_2=0\\).",
      formula: {
        label: "Parallel and perpendicular conditions",
        latex:
          "\\text{Parallel: } m_1=m_2\\qquad \\text{Perpendicular: } m_1 m_2=-1\\qquad a_1a_2+b_1b_2=0",
      },
      traps: [
        {
          title: "Perpendicular slope is the **negative reciprocal**: \\(m_2=-\\dfrac{1}{m_1}\\), not \\(\\dfrac{1}{m_1}\\)",
          body:
            "Parallel ⇒ **equal** slopes (\\(m_1=m_2\\)); perpendicular ⇒ the product is \\(-1\\) (\\(m_1m_2=-1\\)), so the second slope is the **negative reciprocal** \\(-1/m_1\\). The two classic slips: forgetting the **minus** (using \\(1/m_1\\), the plain reciprocal), and swapping the two rules — \"perpendicular means equal slopes\" is wrong. If \\(m_1=\\tfrac23\\), a perpendicular line has slope \\(-\\tfrac32\\), not \\(\\tfrac32\\).",
        },
      ],
      authoredExample: {
        prompt: "Are \\(2x+3y=5\\) and \\(3x-2y=7\\) perpendicular?",
        steps: [
          "\\(a_1a_2+b_1b_2=2(3)+3(-2)=6-6=0\\).",
          "The condition holds.",
        ],
        answer: "Yes — perpendicular.",
      },
      selfCheckExample: {
        prompt: "Under what condition are \\(ax+by+c=0\\) and \\(a'x+b'y+c'=0\\) parallel?",
        steps: [
          "Equal slopes: \\(-\\tfrac{a}{b}=-\\tfrac{a'}{b'}\\).",
          "Cross-multiply: \\(ab'=a'b\\).",
        ],
        answer: "\\(ab'=a'b\\) (\\(a/a'=b/b'\\)).",
      },
      practiceSet: [
        { prompt: "Parallel condition on slopes?", answer: "\\(m_1=m_2\\)" },
        { prompt: "Perpendicular condition on slopes?", answer: "\\(m_1m_2=-1\\)" },
        { prompt: "Perpendicular in coefficients?", answer: "\\(a_1a_2+b_1b_2=0\\)" },
        { prompt: "Are \\(2x+3y=5\\), \\(3x-2y=7\\) perpendicular?", answer: "Yes" },
      ],
      pyqExampleId: "67b873bd-cc3f-4c6a-9a66-d37a9fccc284", // parallel condition
    },
  ],
  related: [
    { label: "Distance, Section & Locus", href: "/notes/nda-maths/lines/lines-distance-section-locus" },
    { label: "Triangles, Quadrilaterals & Polygons", href: "/notes/nda-maths/lines/lines-triangles-polygons" },
  ],
};
