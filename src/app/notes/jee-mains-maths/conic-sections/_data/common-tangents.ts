import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Common Tangents and Loci Across Conics",
  title: "Common Tangents and Loci Across Conics",
  oneLineDefinition:
    "Questions that join two different curves: a line touching both, a tangent to one curve tested against another, loci of midpoints of chords of one curve that touch another, and the angle at which two curves cross.",
  whyItMatters:
    "Thirty-one PYQs, and they carry no new formula. Each one applies the slope-form tangency conditions from the other pages twice, once per curve. The skill is keeping the table of conditions straight. Four ideas cover the page.",
  concepts: [
    // C1 — common tangents
    {
      kind: "formula" as const,
      slug: "jcon-common-tangents",
      name: "Common tangents: one line, two tangency conditions",
      intuition:
        "Write the line in the slope form that already touches the first curve, so its intercept is a function of \\(m\\). Then impose the second curve's tangency condition on that same line. You get one equation in \\(m\\); its roots are the slopes of the common tangents. Everything depends on having the five conditions ready.",
      definition:
        "For the line \\(y=mx+c\\):\n" +
        "- **Circle** \\(x^2+y^2=r^2\\): \\(c^2=r^2(1+m^2)\\).\n" +
        "- **Parabola** \\(y^2=4ax\\): \\(c=\\frac{a}{m}\\). **Parabola** \\(x^2=4ay\\): \\(c=-am^2\\).\n" +
        "- **Ellipse** \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\): \\(c^2=a^2m^2+b^2\\).\n" +
        "- **Hyperbola** \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\): \\(c^2=a^2m^2-b^2\\).\n" +
        "- For a shifted curve, move the origin to its centre or vertex first.",
      formula: {
        label: "Parabola and circle, both about the origin",
        latex: "c=\\frac{a}{m}\\ \\ \\text{and}\\ \\ c^2=r^2(1+m^2)",
      },
      authoredExample: {
        prompt: "Find the common tangents of \\(y^2=8x\\) and \\(x^2+y^2=2\\).",
        steps: [
          "Tangent to the parabola: \\(y=mx+\\frac2m\\).",
          "Tangent to the circle: \\(\\frac{4}{m^2}=2(1+m^2)\\), so \\(m^4+m^2-2=0\\), \\(m^2=1\\).",
          "\\(m=1\\): \\(y=x+2\\); \\(m=-1\\): \\(y=-x-2\\).",
        ],
        answer: "\\(y=x+2\\) and \\(y=-x-2\\).",
      },
      selfCheckExample: {
        prompt: "A common tangent of \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\) and \\(x^2+y^2=6\\) has slope \\(m\\). Find \\(m^2\\).",
        steps: [
          "Ellipse: \\(c^2=9m^2+4\\). Circle: \\(c^2=6(1+m^2)\\).",
          "\\(9m^2+4=6+6m^2\\).",
        ],
        answer: "\\(m^2=\\frac23\\).",
      },
      practiceSet: [
        { prompt: "Common tangent of \\(y^2=4x\\) and \\(x^2=4y\\)?", answer: "\\(x+y+1=0\\)", method: "\\(\\frac1m=-m^2\\)" },
        { prompt: "Tangency condition for \\(x^2=4ay\\)?", answer: "\\(c=-am^2\\)" },
        { prompt: "Common tangent slope of \\(x^2+y^2=1\\) and \\(x^2+y^2=4\\)?", answer: "None: one circle is inside the other" },
        { prompt: "Tangency condition for \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\)?", answer: "\\(c^2=a^2m^2-b^2\\)" },
      ],
      pyqExampleId: "1053843c-5579-4d26-bb0f-966f4537be66", // 2022 — common tangent of an ellipse and a hyperbola, contact abscissae
      traps: [
        {
          title: "Equate the INTERCEPTS, with one slope",
          body: "Both conditions must be about the same line \\(y=mx+c\\). Writing one curve's tangent with slope \\(m\\) and the other's with a fresh slope, then matching, loses the fact that it is one line.",
        },
      ],
    },

    // C2 — tangent to one curve used on another
    {
      kind: "formula" as const,
      slug: "jcon-tangent-across-curves",
      name: "A tangent to one curve, tested on another",
      intuition:
        "Many questions build a tangent to one curve, usually at a given point, and then ask about it against a second curve: does it touch it, where does it cut it, what triangle does it make. Work in two clean steps. First write the tangent from the first curve's rules. Then treat it as an ordinary line for the second curve.",
      definition:
        "- **Step 1:** the tangent to the first curve (point form, parametric form or slope form).\n" +
        "- **Step 2:** for the second curve use the distance test (circle), the tangency condition (conic) or substitution (for points of intersection).\n" +
        "- A circle touching a conic at a point has its centre on the conic's normal there.",
      formula: {
        label: "Tangent to y² = 4ax at (x₁, y₁)",
        latex: "yy_1=2a(x+x_1)",
      },
      authoredExample: {
        prompt: "The tangent to \\(x^2=12y\\) at \\((6,3)\\): does it touch \\(x^2+y^2=\\frac92\\)?",
        steps: [
          "Tangent: \\(6x=6(y+3)\\), i.e. \\(y=x-3\\).",
          "Distance from the origin: \\(\\frac{3}{\\sqrt2}=\\) the radius.",
        ],
        answer: "Yes, it touches the circle.",
      },
      selfCheckExample: {
        prompt: "The tangent to \\(y^2=12x\\) at \\((3,6)\\) also touches \\(\\frac{x^2}{5}+\\frac{y^2}{b}=1\\). Find \\(b\\).",
        steps: [
          "Tangent: \\(6y=6(x+3)\\), i.e. \\(y=x+3\\).",
          "Ellipse condition: \\(c^2=a^2m^2+b\\): \\(9=5+b\\).",
        ],
        answer: "\\(b=4\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(y^2=2x\\) at \\((2,2)\\)?", answer: "\\(2y=x+2\\)" },
        { prompt: "Tangent to \\(x^2+y^2=4x\\) at \\((2,2)\\)?", answer: "\\(y=2\\)" },
        { prompt: "Where do those two tangents meet?", answer: "\\((2,2)\\)" },
        { prompt: "Does \\(y=x+1\\) touch \\(\\frac{x^2}{4}+\\frac{y^2}{3}=1\\)?", answer: "No: \\(4+3=7\\neq1\\)" },
      ],
      pyqExampleId: "b7e21326-14f2-4e97-b598-a348596f4322", // 2021 — tangent to y^2 = 8x at (2,-4) also touches x^2 + y^2 = a
      traps: [
        {
          title: "Use the tangency condition of the SECOND curve",
          body: "After step 1 the line is fixed. Checking it against the first curve's condition again only confirms step 1; the question is about the second curve.",
        },
      ],
    },

    // C3 — cross-conic loci
    {
      kind: "formula" as const,
      slug: "jcon-cross-conic-loci",
      name: "Loci of midpoints of chords that touch another curve",
      intuition:
        "Two tools combine. The chord of the first curve with midpoint \\((h,k)\\) is \\(T=S_1\\), a line whose slope and intercept depend on \\(h\\) and \\(k\\). Requiring that line to touch the second curve gives one equation in \\(h\\) and \\(k\\): that equation is the locus.",
      definition:
        "- Write the chord with midpoint \\((h,k)\\) as \\(T=S_1\\).\n" +
        "- Put it in the form \\(y=mx+c\\) (or use the distance test for a circle).\n" +
        "- Impose the second curve's tangency condition.\n" +
        "- Rename \\(h,k\\) as \\(x,y\\).",
      formula: {
        label: "Chord of x² + y² = r² with midpoint (h, k)",
        latex: "hx+ky=h^2+k^2",
      },
      authoredExample: {
        prompt: "Find the locus of the midpoints of chords of \\(x^2+y^2=9\\) that touch \\(y^2=4x\\).",
        steps: [
          "Chord: \\(hx+ky=h^2+k^2\\), i.e. \\(y=-\\frac{h}{k}x+\\frac{h^2+k^2}{k}\\).",
          "Tangent to \\(y^2=4x\\): \\(c=\\frac1m\\), so \\(\\frac{h^2+k^2}{k}=-\\frac{k}{h}\\).",
          "\\(h(h^2+k^2)+k^2=0\\).",
        ],
        answer: "\\(x(x^2+y^2)+y^2=0\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus of the midpoints of chords of \\(x^2-y^2=1\\) that touch \\(x^2+y^2=1\\).",
        steps: [
          "Chord: \\(hx-ky=h^2-k^2\\).",
          "Its distance from the origin is \\(1\\): \\(\\frac{|h^2-k^2|}{\\sqrt{h^2+k^2}}=1\\).",
        ],
        answer: "\\((x^2-y^2)^2=x^2+y^2\\).",
      },
      practiceSet: [
        { prompt: "Chord of \\(\\frac{x^2}{4}+y^2=1\\) with midpoint \\((1,\\frac12)\\)?", answer: "\\(x+2y=2\\)" },
        { prompt: "Chord of \\(y^2=4x\\) with midpoint \\((h,k)\\)?", answer: "\\(ky-2(x+h)=k^2-4h\\)" },
        { prompt: "Chord of \\(x^2+y^2=4\\) with midpoint \\((1,1)\\)?", answer: "\\(x+y=2\\)" },
        { prompt: "What does 'touches the circle \\(x^2+y^2=r^2\\)' become for a line?", answer: "Its distance from the origin equals \\(r\\)" },
      ],
      pyqExampleId: "612acadd-a4c9-4b55-8cd0-d60376f744b3", // 2021 — midpoints of chords of x^2 - y^2 = 4 that touch y^2 = 8x
      traps: [
        {
          title: "Keep \\(h,k\\) as constants until the end",
          body: "Inside \\(T=S_1\\), \\(x\\) and \\(y\\) are the line's running coordinates and \\(h,k\\) are fixed. Renaming \\(h,k\\) as \\(x,y\\) too early mixes the two and wrecks the algebra.",
        },
      ],
    },

    // C4 — angle between curves
    {
      kind: "formula" as const,
      slug: "jcon-curves-angle",
      name: "The angle between two curves, and curves that cut at right angles",
      intuition:
        "Two curves cross at the angle between their tangents at the crossing point. Find the point, find each slope (by differentiating implicitly), and use the angle formula for two lines. For two central conics there is a shortcut: they cut at right angles exactly when they share their foci.",
      definition:
        "- At the meeting point, find \\(m_1\\) and \\(m_2\\) by implicit differentiation.\n" +
        "- \\(\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|\\); right angle when \\(m_1m_2=-1\\).\n" +
        "- \\(\\frac{x^2}{a}+\\frac{y^2}{b}=1\\) and \\(\\frac{x^2}{c}+\\frac{y^2}{d}=1\\) cut at right angles when \\(a-b=c-d\\) (same foci).\n" +
        "- An ellipse and a hyperbola with the same foci always cut at right angles.",
      formula: {
        label: "Angle between the curves",
        latex: "\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|",
      },
      authoredExample: {
        prompt: "Find the angle between \\(y^2=4x\\) and \\(x^2=4y\\) at \\((4,4)\\).",
        steps: [
          "\\(y^2=4x\\): \\(y'=\\frac{2}{y}=\\frac12\\). \\(x^2=4y\\): \\(y'=\\frac{x}{2}=2\\).",
          "\\(\\tan\\theta=\\frac{2-\\frac12}{1+1}\\).",
        ],
        answer: "\\(\\tan^{-1}\\frac34\\).",
      },
      selfCheckExample: {
        prompt: "Do \\(\\frac{x^2}{16}+\\frac{y^2}{7}=1\\) and \\(\\frac{x^2}{5}-\\frac{y^2}{4}=1\\) cut at right angles?",
        steps: [
          "Write both as \\(\\frac{x^2}{p}+\\frac{y^2}{q}=1\\): \\((16,7)\\) and \\((5,-4)\\).",
          "\\(16-7=9\\) and \\(5-(-4)=9\\): equal.",
        ],
        answer: "Yes: they share the foci \\((\\pm3,0)\\).",
      },
      practiceSet: [
        { prompt: "Angle between \\(x^2+y^2=8\\) and \\(xy=4\\) at \\((2,2)\\)?", answer: "\\(0\\): they touch", method: "Both slopes are \\(-1\\)" },
        { prompt: "Slope of \\(x^2+y^2=25\\) at \\((3,4)\\)?", answer: "\\(-\\frac34\\)" },
        { prompt: "Condition for orthogonal central conics?", answer: "\\(a-b=c-d\\)" },
        { prompt: "Right angle between lines of slopes \\(2\\) and \\(m\\)?", answer: "\\(m=-\\frac12\\)" },
      ],
      pyqExampleId: "e56b4744-07f8-4ce6-b8ae-3f6fe0e8a475", // 2021 — angle between an ellipse and x^2 + y^2 = ab
      traps: [
        {
          title: "The angle uses slopes AT THE MEETING POINT",
          body: "Find the intersection first. The slopes change along each curve, so a slope taken anywhere else gives a meaningless angle.",
        },
      ],
    },
  ],
};
