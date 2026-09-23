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
        // Different numbers from the featured PYQ on purpose. The old
        // self-check was that PYQ verbatim, so the "meet it on a real exam
        // question" rung was a re-read of the rung above it.
        prompt: "Find the obtuse angle between the lines with slopes \\(3\\) and \\(\\tfrac12\\).",
        steps: [
          "\\(m_1m_2=\\tfrac32\\), so \\(1+m_1m_2=\\tfrac52\\); and \\(m_1-m_2=3-\\tfrac12=\\tfrac52\\).",
          "\\(\\tan\\theta=\\left|\\tfrac{5/2}{5/2}\\right|=1\\Rightarrow\\theta=45°\\) — that is the acute one.",
          "The obtuse angle is its supplement: \\(180°-45°\\).",
        ],
        answer: "\\(135°\\).",
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
        "- **Parallel:** \\(m_1=m_2\\). In coefficients, for \\(a_1x+b_1y+c_1=0\\) and \\(a_2x+b_2y+c_2=0\\), that is \\(a_1b_2=a_2b_1\\), i.e. \\(\\tfrac{a_1}{a_2}=\\tfrac{b_1}{b_2}\\).\n" +
        "- **That test also passes for the same line written twice.** It says the two lines have the same *direction*; it does not say they are *different* lines. They are **coincident** when the constants agree as well, \\(\\tfrac{a_1}{a_2}=\\tfrac{b_1}{b_2}=\\tfrac{c_1}{c_2}\\), and **strictly parallel** when the first two ratios agree and the third does **not**. A question that says \"parallel\" almost always wants the strict kind — so check the constant before you answer, or you will pick a value that makes the two lines identical.\n" +
        "- **Perpendicular:** \\(m_1 m_2=-1\\), i.e. \\(a_1a_2+b_1b_2=0\\).",
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
        // Exercises the strict-parallel-vs-coincident distinction, which is
        // what the featured PYQ turns on. The old self-check asked the reader
        // to re-derive a line the definition prints two blocks above.
        prompt:
          "For what \\(k\\) are \\(2x+ky=5\\) and \\(6x-9y=4\\) parallel — and are they then distinct lines?",
        steps: [
          "Slopes are \\(-a/b\\): the first is \\(-\\tfrac{2}{k}\\), the second is \\(-\\tfrac{6}{-9}=\\tfrac23\\).",
          "Set them equal: \\(-\\tfrac{2}{k}=\\tfrac23\\Rightarrow -6=2k\\Rightarrow k=-3\\).",
          "Now check they are not the same line: \\(\\tfrac26=\\tfrac{-3}{-9}=\\tfrac13\\), but \\(\\tfrac54\\ne\\tfrac13\\).",
          "The constants disagree, so the lines are distinct.",
        ],
        answer: "\\(k=-3\\), and the lines are distinct — strictly parallel.",
      },
      practiceSet: [
        { prompt: "Parallel condition on slopes?", answer: "\\(m_1=m_2\\)" },
        { prompt: "Perpendicular condition on slopes?", answer: "\\(m_1m_2=-1\\)" },
        { prompt: "Perpendicular in coefficients?", answer: "\\(a_1a_2+b_1b_2=0\\)" },
        { prompt: "All three ratios \\(\\tfrac{a_1}{a_2}=\\tfrac{b_1}{b_2}=\\tfrac{c_1}{c_2}\\) equal means?", answer: "Coincident — one line, not two parallel ones" },
      ],
      pyqExampleId: "67b873bd-cc3f-4c6a-9a66-d37a9fccc284", // parallel condition
    },
  ],
  related: [
    { label: "Back: Equations & Slope", href: "/notes/nda-maths/lines/lines-equation-slope" },
    { label: "Next: Distance, Section & Locus", href: "/notes/nda-maths/lines/lines-distance-section-locus" },
  ],
};
