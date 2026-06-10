import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATION_SLOPE_NOTE: SubtopicNote = {
  subtopicName: "Equation, Slope, and Family of Lines",
  title: "Equations, Slope & Family of Lines",
  oneLineDefinition:
    "The slope of a line and the standard forms of its equation, the intercept form, the family of lines through a point or an intersection, and reflections in a line.",
  whyItMatters:
    "Every other tool in the chapter starts from a line's equation. Knowing which form to reach for — slope-intercept, point-slope, intercept, or the family L₁+λL₂ — turns most questions into one substitution.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lines-slope-and-forms",
      name: "Slope and the forms of a line",
      intuition:
        "A line is fixed by a point and a direction (its slope). The slope is the tangent of the angle it makes with the x-axis. Pick the form that matches what you're given — a point and slope, two points, or intercepts.",
      definition:
        "**Slope** \\(m=\\tan\\theta=\\dfrac{y_2-y_1}{x_2-x_1}\\). Forms:\n" +
        "- **Slope-intercept:** \\(y=mx+c\\). **Point-slope:** \\(y-y_1=m(x-x_1)\\).\n" +
        "- **Two-point:** \\(\\dfrac{y-y_1}{x-x_1}=\\dfrac{y_2-y_1}{x_2-x_1}\\).\n" +
        "- **General:** \\(ax+by+c=0\\) has slope \\(-a/b\\). **Normal form:** \\(x\\cos\\theta+y\\sin\\theta=p\\) (\\(p\\) = distance from origin).",
      formula: {
        label: "Slope and forms of a line",
        latex:
          "m=\\dfrac{y_2-y_1}{x_2-x_1}\\qquad m_{ax+by+c=0}=-\\dfrac{a}{b}\\qquad y-y_1=m(x-x_1)\\qquad y=mx+c",
      },
      traps: [
        {
          title: "Slope is \\(\\Delta y/\\Delta x\\), not \\(\\Delta x/\\Delta y\\) — and a vertical line has **undefined** slope",
          body:
            "Two slips. First, slope is **rise over run**: \\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\), not \\(\\dfrac{x_2-x_1}{y_2-y_1}\\) — keep the \\(y\\)-difference on top. Second, a **vertical** line \\(x=k\\) has *undefined* slope (the run is \\(0\\)), **not** slope \\(0\\) — that's a *horizontal* line \\(y=k\\). Likewise, the slope of \\(ax+by+c=0\\) is \\(-a/b\\), with the **minus sign** — dropping it flips the line.",
        },
      ],
      authoredExample: {
        prompt: "Find the equation of the line through \\((2,3)\\) with slope \\(4\\).",
        steps: [
          "Point-slope: \\(y-3=4(x-2)\\).",
          "Simplify: \\(y=4x-5\\).",
        ],
        answer: "\\(4x-y-5=0\\).",
      },
      selfCheckExample: {
        prompt: "What is the slope of \\(3x-4y+7=0\\)?",
        steps: [
          "Slope of \\(ax+by+c=0\\) is \\(-a/b\\).",
          "\\(-\\dfrac{3}{-4}=\\dfrac34\\).",
        ],
        answer: "\\(\\tfrac34\\).",
      },
      practiceSet: [
        { prompt: "Slope of \\(ax+by+c=0\\)?", answer: "\\(-a/b\\)" },
        { prompt: "Slope in terms of the angle \\(\\theta\\) with x-axis?", answer: "\\(\\tan\\theta\\)" },
        { prompt: "Point-slope form?", answer: "\\(y-y_1=m(x-x_1)\\)" },
        { prompt: "Normal form of a line?", answer: "\\(x\\cos\\theta+y\\sin\\theta=p\\)" },
      ],
    },

    {
      kind: "formula" as const,
      slug: "lines-intercept-form",
      name: "Intercept form and intercepts",
      intuition:
        "When a line's x- and y-intercepts matter, the intercept form \\(\\tfrac{x}{a}+\\tfrac{y}{b}=1\\) reads them off directly. Many questions give a relation between the intercepts (their sum, or a midpoint) and ask for the line.",
      definition:
        "**Intercept form:** \\(\\dfrac{x}{a}+\\dfrac{y}{b}=1\\), where \\(a\\) is the x-intercept and \\(b\\) the y-intercept. From \\(ax+by+c=0\\): x-intercept \\(=-c/a\\), y-intercept \\(=-c/b\\). If \\((h,k)\\) is the midpoint of the intercept segment, then \\(a=2h\\), \\(b=2k\\).",
      formula: {
        label: "Intercept form and intercepts",
        latex:
          "\\dfrac{x}{a}+\\dfrac{y}{b}=1\\qquad x\\text{-intercept}=-\\dfrac{c}{a}\\qquad y\\text{-intercept}=-\\dfrac{c}{b}",
      },
      traps: [
        {
          title: "Intercept form needs the constant on the **RHS as \\(1\\)** — \\(a,b\\) are the intercepts only then",
          body:
            "You can read the intercepts straight off \\(\\dfrac{x}{a}+\\dfrac{y}{b}=1\\) **only when the right side is exactly \\(1\\)**. From \\(ax+by=c\\) the x-intercept is \\(c/a\\), **not** \\(a\\): divide through by \\(c\\) first to reach \\(\\dfrac{x}{c/a}+\\dfrac{y}{c/b}=1\\). Grabbing the coefficients before normalising to \\(1\\) is the classic error.",
        },
      ],
      authoredExample: {
        prompt: "A line has x-intercept \\(4\\) and y-intercept \\(2\\). Find its equation and the sum of intercepts.",
        steps: [
          "Intercept form: \\(\\dfrac{x}{4}+\\dfrac{y}{2}=1\\Rightarrow x+2y=4\\).",
          "Sum of intercepts \\(=4+2=6\\).",
        ],
        answer: "\\(x+2y=4\\); sum \\(=6\\).",
      },
      selfCheckExample: {
        prompt: "If \\((3,4)\\) is the midpoint of the segment a line cuts between the axes, find the line.",
        steps: [
          "Intercepts \\(a=2(3)=6\\), \\(b=2(4)=8\\).",
          "\\(\\dfrac{x}{6}+\\dfrac{y}{8}=1\\Rightarrow 4x+3y=24\\).",
        ],
        answer: "\\(4x+3y=24\\).",
      },
      practiceSet: [
        { prompt: "Intercept form of a line?", answer: "\\(\\tfrac{x}{a}+\\tfrac{y}{b}=1\\)" },
        { prompt: "x-intercept of \\(ax+by+c=0\\)?", answer: "\\(-c/a\\)" },
        { prompt: "Midpoint of intercepts is \\((h,k)\\): intercepts?", answer: "\\(2h,\\ 2k\\)" },
        { prompt: "Sum of intercepts of \\(\\tfrac{x}{4}+\\tfrac{y}{2}=1\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "4a119c9d-9e4e-45e8-a10d-7f36ffc33202", // sum of intercepts
    },

    {
      kind: "formula" as const,
      slug: "lines-family-and-concurrency",
      name: "Family of lines and concurrency",
      intuition:
        "Any line through the intersection of \\(L_1=0\\) and \\(L_2=0\\) can be written \\(L_1+\\lambda L_2=0\\) — without ever finding the intersection point. Choose \\(\\lambda\\) from one extra condition. Three lines are concurrent when their intersection is shared.",
      definition:
        "**Family (pencil):** through \\(L_1\\cap L_2\\), every line is \\(L_1+\\lambda L_2=0\\); fix \\(\\lambda\\) from a point or a slope condition. **Parallel/perpendicular through a point:** keep the same (or negative-reciprocal) slope. **Concurrency:** three lines are concurrent iff \\(\\begin{vmatrix}a_1&b_1&c_1\\\\a_2&b_2&c_2\\\\a_3&b_3&c_3\\end{vmatrix}=0\\). If coefficients \\(A,B,C\\) are in AP, \\(Ax+2By+C=0\\) passes through the fixed point \\((1,-1)\\) (since \\(C=2B-A\\) gives \\(A(x-1)+2B(y+1)=0\\)).",
      formula: {
        label: "Family of lines and concurrency",
        latex:
          "L_1+\\lambda L_2=0\\qquad \\begin{vmatrix}a_1&b_1&c_1\\\\a_2&b_2&c_2\\\\a_3&b_3&c_3\\end{vmatrix}=0",
      },
      traps: [
        {
          title: "The pencil is \\(L_1+\\lambda L_2=0\\) — keep each \\(L_i\\) in the form \\(=0\\) first",
          body:
            "The family through \\(L_1\\cap L_2\\) is \\(L_1+\\lambda L_2=0\\), where **each \\(L_i\\) is the whole expression \\(a_ix+b_iy+c_i\\)** moved to one side so the line reads \\(L_i=0\\). Combining \\(2x+3y=5\\) and \\(x-y=1\\) means using \\(L_1=2x+3y-5\\) and \\(L_2=x-y-1\\) — forgetting to move the constants over (using \\(2x+3y\\) and \\(x-y\\)) silently shifts the pencil off the intersection.",
        },
      ],
      authoredExample: {
        prompt: "Find the line through the intersection of \\(x+y-1=0\\) and \\(2x-y-2=0\\) that passes through \\((1,2)\\).",
        steps: [
          "Family: \\((x+y-1)+\\lambda(2x-y-2)=0\\).",
          "At \\((1,2)\\): \\((1+2-1)+\\lambda(2-2-2)=0\\Rightarrow 2-2\\lambda=0\\Rightarrow\\lambda=1\\).",
          "Sum: \\(3x-3=0\\Rightarrow x=1\\).",
        ],
        answer: "\\(x=1\\).",
      },
      selfCheckExample: {
        prompt: "For what \\(k\\) is \\((k-3)x-y+2=0\\) parallel to \\(x+y=1\\)?",
        steps: [
          "Parallel ⇒ equal slopes. Slope of the second is \\(-1\\); slope of the first is \\((k-3)\\).",
          "\\(k-3=-1\\Rightarrow k=2\\).",
        ],
        answer: "\\(k=2\\).",
      },
      practiceSet: [
        { prompt: "Family of lines through \\(L_1\\cap L_2\\)?", answer: "\\(L_1+\\lambda L_2=0\\)" },
        { prompt: "Concurrency condition for 3 lines?", answer: "Determinant of coefficients \\(=0\\)" },
        { prompt: "Parallel lines have slopes that are?", answer: "Equal" },
        { prompt: "\\(Ax+2By+C=0\\) with \\(A,B,C\\) in AP passes through?", answer: "\\((1,-1)\\)" },
      ],
      pyqExampleId: "ccb085f6-15cd-4bb9-acf5-22cb8485814a", // 3 lines concurrent
    },

    {
      kind: "formula" as const,
      slug: "lines-image-reflection",
      name: "Image of a point and reflections",
      intuition:
        "The image of a point in a line is its mirror reflection: the line is the perpendicular bisector of the segment joining the point and its image. Use 'midpoint lies on the line' plus 'segment ⟂ line' to find the image, or recover the mirror from a point–image pair.",
      definition:
        "If \\(P'\\) is the image of \\(P\\) in line \\(L\\): the midpoint of \\(PP'\\) lies on \\(L\\), and \\(PP'\\perp L\\). These two conditions pin down \\(P'\\) (or the mirror line). Foot of perpendicular from \\(P\\) to \\(L\\) is the midpoint of \\(PP'\\).",
      traps: [
        {
          title: "The **foot** of the perpendicular is the *midpoint* of \\(PP'\\), not the image itself",
          body:
            "The foot of the perpendicular \\(F\\) from \\(P\\) to the line is **halfway** to the image: \\(F\\) is the *midpoint* of \\(P\\) and \\(P'\\). So the image is \\(P'=2F-P\\) — you must **double** the displacement from \\(P\\) to \\(F\\). Reporting the foot \\(F\\) as the reflected image gives a point only half as far across the line.",
        },
      ],
      authoredExample: {
        prompt: "Find the image of \\((1,2)\\) in the line \\(y=x\\).",
        steps: [
          "Reflection in \\(y=x\\) swaps coordinates.",
          "Image \\(=(2,1)\\).",
        ],
        answer: "\\((2,1)\\).",
      },
      selfCheckExample: {
        prompt: "The image of \\((-4,2)\\) in a line is \\((4,-2)\\). What line is the mirror?",
        steps: [
          "Mirror = perpendicular bisector of \\((-4,2)\\),\\((4,-2)\\). Midpoint \\((0,0)\\); segment slope \\(\\tfrac{-2-2}{4+4}=-\\tfrac12\\).",
          "Mirror slope \\(=2\\), through origin: \\(y=2x\\).",
        ],
        answer: "\\(y=2x\\).",
      },
      practiceSet: [
        { prompt: "A line is the ___ of a point and its image.", answer: "Perpendicular bisector" },
        { prompt: "Image of \\((a,b)\\) in \\(y=x\\)?", answer: "\\((b,a)\\)" },
        { prompt: "Image of \\((a,b)\\) in the x-axis?", answer: "\\((a,-b)\\)" },
        { prompt: "Foot of perpendicular is the ___ of P and its image.", answer: "Midpoint" },
      ],
      pyqExampleId: "02e609af-e17b-42db-9093-e5043133982e", // image of (-4,2)
    },
  ],
  related: [
    { label: "Distance, Section & Locus", href: "/notes/nda-maths/lines/lines-distance-section-locus" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
