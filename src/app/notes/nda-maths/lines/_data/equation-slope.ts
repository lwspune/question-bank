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
        "**Slope** \\(m=\\tan\\theta\\), where \\(\\theta\\) is the angle the line makes with the " +
        "**positive x-axis**, measured anticlockwise, \\(0^\\circ\\le\\theta<180^\\circ\\). So a line " +
        "leaning to the left has \\(\\theta\\) obtuse and \\(m\\) **negative**. Computed from **any two " +
        "points on the line**, \\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\) — which pair you pick makes no " +
        "difference, and that is what makes slope a property of the line rather than of the points. " +
        "Forms:\n" +
        "- **Slope-intercept:** \\(y=mx+c\\) — use when you know the slope and the y-intercept \\(c\\).\n" +
        "- **Point-slope:** \\(y-y_1=m(x-x_1)\\) — use when you know one point and the slope.\n" +
        "- **Two-point:** \\(\\dfrac{y-y_1}{x-x_1}=\\dfrac{y_2-y_1}{x_2-x_1}\\) — use when you know two points.\n" +
        "- **General:** \\(ax+by+c=0\\), slope \\(-a/b\\). Careful: this \\(c\\) is the **constant term**, not the y-intercept it meant one line above.\n" +
        "- **Normal (perpendicular) form:** \\(x\\cos\\alpha+y\\sin\\alpha=p\\), where \\(p\\) is the distance from the origin to the line and \\(\\alpha\\) is the angle **that perpendicular** makes with the x-axis — a different angle from \\(\\theta\\).",
      formula: {
        label: "Slope and forms of a line",
        latex:
          "m=\\dfrac{y_2-y_1}{x_2-x_1}\\qquad m_{ax+by+c=0}=-\\dfrac{a}{b}\\qquad y-y_1=m(x-x_1)\\qquad y=mx+c",
        // This chapter reuses a, b, c and theta for different things within a
        // few lines, so the legend is load-bearing here, not decoration.
        symbols: [
          { symbol: "\\(m\\)", meaning: "slope of the line" },
          { symbol: "\\(\\theta\\)", meaning: "angle the LINE makes with the positive x-axis" },
          { symbol: "\\(\\alpha\\)", meaning: "angle the PERPENDICULAR from the origin makes — normal form only" },
          { symbol: "\\(c\\)", meaning: "y-intercept in \\(y=mx+c\\); the constant term in \\(ax+by+c=0\\)" },
          { symbol: "\\(p\\)", meaning: "distance from the origin to the line" },
        ],
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
        { prompt: "Slope of a line inclined at \\(\\theta\\) to the positive x-axis?", answer: "\\(\\tan\\theta\\)" },
        { prompt: "Point-slope form?", answer: "\\(y-y_1=m(x-x_1)\\)" },
        { prompt: "Normal form of a line?", answer: "\\(x\\cos\\alpha+y\\sin\\alpha=p\\)" },
      ],
      pyqExampleId: "e163beed-4c11-4b17-854f-b9e02157d673", // normal ("perpendicular") form of √3x+2y=7
    },

    {
      kind: "formula" as const,
      slug: "lines-intercept-form",
      name: "Intercept form and intercepts",
      intuition:
        "When a line's x- and y-intercepts matter, the intercept form \\(\\tfrac{x}{a}+\\tfrac{y}{b}=1\\) reads them off directly. Many questions give a relation between the intercepts (their sum, or a midpoint) and ask for the line.",
      definition:
        "An **intercept is a number, not a point**: the x-intercept is the value of \\(x\\) at which the " +
        "line crosses the x-axis. That is why a question can ask for their **sum**.\n" +
        "- **Intercept form:** \\(\\dfrac{x}{a}+\\dfrac{y}{b}=1\\), where \\(a\\) is the x-intercept and \\(b\\) the y-intercept — readable off the equation **only when the right-hand side is exactly \\(1\\)**.\n" +
        "- **From a general line** \\(px+qy+r=0\\): x-intercept \\(=-r/p\\), y-intercept \\(=-r/q\\). The letters are \\(p,q,r\\) here on purpose — in the line above, \\(a\\) and \\(b\\) are **intercepts**, while in a general equation \\(a\\) and \\(b\\) are **coefficients**. They are not the same thing, and confusing them is this concept's classic error.\n" +
        "- **From a midpoint:** if \\((h,k)\\) is the midpoint of the segment the line cuts between the axes, then \\(a=2h\\) and \\(b=2k\\).\n" +
        "- **Distance from the origin to \\(\\tfrac xa+\\tfrac yb=1\\):** \\(p=\\dfrac{|ab|}{\\sqrt{a^2+b^2}}\\), i.e. \\(\\dfrac1{p^2}=\\dfrac1{a^2}+\\dfrac1{b^2}\\) — the altitude-to-the-hypotenuse relation of the right triangle the line cuts off. A stem that gives the intercepts and asks for \\(p\\) (or gives \\(p\\) and one intercept) is this line.",
      formula: {
        label: "Intercept form and intercepts",
        latex:
          "\\dfrac{x}{a}+\\dfrac{y}{b}=1\\qquad\\text{from }px+qy+r=0:\\quad x\\text{-int}=-\\dfrac{r}{p},\\quad y\\text{-int}=-\\dfrac{r}{q}",
        symbols: [
          { symbol: "\\(a,b\\)", meaning: "the x- and y-INTERCEPTS (numbers), in intercept form only" },
          { symbol: "\\(p,q,r\\)", meaning: "the COEFFICIENTS of a general line \\(px+qy+r=0\\)" },
          { symbol: "\\((h,k)\\)", meaning: "midpoint of the segment cut between the axes" },
        ],
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
        { prompt: "x-intercept of \\(px+qy+r=0\\)?", answer: "\\(-r/p\\)" },
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
        "- **Family (pencil):** every line through the intersection of \\(L_1=0\\) and \\(L_2=0\\) can be written \\(L_1+\\lambda L_2=0\\), so you never have to find the intersection point. Fix \\(\\lambda\\) from one extra condition. (The single line it misses is \\(L_2=0\\) itself.)\n" +
        "- **Through a point, parallel or perpendicular to a given line:** keep the same slope, or the negative-reciprocal one. Both tests are proved in the next block, Angle Between Lines — for now, **parallel means equal slopes** and **perpendicular means the slopes multiply to \\(-1\\)**.\n" +
        "- **Concurrent** means all three lines pass through **one common point**. If three lines are concurrent, then \\(\\begin{vmatrix}a_1&b_1&c_1\\\\a_2&b_2&c_2\\\\a_3&b_3&c_3\\end{vmatrix}=0\\). The converse is **not** automatic: the determinant also vanishes when two of the lines are parallel, so a zero determinant is evidence, not proof. Expanding a \\(3\\times3\\) determinant is in the Matrices & Determinants notes, linked below.\n" +
        "- **A fixed point forced by a coefficient condition:** if \\(A,B,C\\) are in AP then \\(C-B=B-A\\), so \\(C=2B-A\\). Put that into \\(Ax+2By+C=0\\): \\(Ax+2By+2B-A=0\\), which regroups as \\(A(x-1)+2B(y+1)=0\\). That holds for **every** \\(A\\) and \\(B\\) only when \\(x-1=0\\) and \\(y+1=0\\) — so every such line passes through \\((1,-1)\\).\n" +
        "- **How many intersection points can \\(n\\) lines make?** At most \\(\\binom n2\\) (every pair meets once, no two parallel, no three concurrent); \\(n\\) lines and a circle add at most \\(2n\\) more (each line cuts the circle twice); \\(n\\) circles meet in at most \\(2\\binom n2=n(n-1)\\) points.",
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
        // Tests the pencil itself, which is what this concept is for. The old
        // self-check asked for a value of k making two lines parallel — a test
        // taught in the NEXT block, and not this concept's technique at all.
        prompt:
          "Find the line through the intersection of \\(2x+3y-5=0\\) and \\(x-y-1=0\\) that passes through the origin.",
        steps: [
          "Family: \\((2x+3y-5)+\\lambda(x-y-1)=0\\).",
          "It passes through \\((0,0)\\): \\(-5+\\lambda(-1)=0\\Rightarrow\\lambda=-5\\).",
          "Substitute: \\((2x+3y-5)-5(x-y-1)=-3x+8y=0\\).",
        ],
        answer: "\\(3x-8y=0\\).",
      },
      practiceSet: [
        { prompt: "Family of lines through \\(L_1\\cap L_2\\)?", answer: "\\(L_1+\\lambda L_2=0\\)" },
        { prompt: "Three lines concurrent ⇒ their coefficient determinant?", answer: "\\(=0\\) (the converse needs checking)" },
        { prompt: "\"Concurrent\" means?", answer: "All three pass through one common point" },
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
        "If \\(P'\\) is the image of \\(P\\) in the line \\(L\\), two facts pin it down: the **midpoint of " +
        "\\(PP'\\) lies on \\(L\\)**, and **\\(PP'\\) is perpendicular to \\(L\\)**. Write \\(P'=(h,k)\\), " +
        "turn each fact into an equation, and solve the pair.\n" +
        "- Two things borrowed from later blocks, stated here so this method is usable now: the midpoint of \\((x_1,y_1)\\) and \\((x_2,y_2)\\) is \\(\\left(\\tfrac{x_1+x_2}{2},\\tfrac{y_1+y_2}{2}\\right)\\), and **perpendicular** means the two slopes multiply to \\(-1\\).\n" +
        "- The **foot of the perpendicular** \\(F\\) from \\(P\\) to \\(L\\) is the *midpoint* of \\(PP'\\), so \\(P'=2F-P\\).\n" +
        "- **Shortcuts worth memorising:** reflecting in \\(y=x\\) swaps coordinates, \\((a,b)\\to(b,a)\\); in the x-axis, \\((a,b)\\to(a,-b)\\); in the y-axis, \\((a,b)\\to(-a,b)\\).\n" +
        "- **Backwards:** given \\(P\\) and its image \\(P'\\), the mirror is the perpendicular bisector of \\(PP'\\).",
      formula: {
        label: "Image of a point in a line",
        latex:
          "\\text{midpoint}(PP')\\in L\\qquad PP'\\perp L\\qquad P'=2F-P",
        symbols: [
          { symbol: "\\(P\\)", meaning: "the original point" },
          { symbol: "\\(P'\\)", meaning: "its image (mirror reflection) in the line" },
          { symbol: "\\(F\\)", meaning: "foot of the perpendicular from \\(P\\) to the line — the MIDPOINT of \\(PP'\\)" },
        ],
      },
      traps: [
        {
          title: "The **foot** of the perpendicular is the *midpoint* of \\(PP'\\), not the image itself",
          body:
            "The foot of the perpendicular \\(F\\) from \\(P\\) to the line is **halfway** to the image: \\(F\\) is the *midpoint* of \\(P\\) and \\(P'\\). So the image is \\(P'=2F-P\\) — you must **double** the displacement from \\(P\\) to \\(F\\). Reporting the foot \\(F\\) as the reflected image gives a point only half as far across the line.",
        },
      ],
      authoredExample: {
        // Works the GENERAL method, not the y=x swap. The shortcut is in the
        // definition; a worked example that only swaps coordinates leaves the
        // taught two-condition method demonstrated zero times.
        prompt: "Find the image of \\((1,2)\\) in the line \\(x+y=5\\).",
        steps: [
          "Let the image be \\(P'=(h,k)\\).",
          "Midpoint on the line: \\(\\dfrac{1+h}{2}+\\dfrac{2+k}{2}=5\\Rightarrow h+k=7\\).",
          "Perpendicular: the line has slope \\(-1\\), so \\(PP'\\) has slope \\(1\\): \\(\\dfrac{k-2}{h-1}=1\\Rightarrow k=h+1\\).",
          "Solve: \\(h+(h+1)=7\\Rightarrow h=3,\\ k=4\\).",
        ],
        answer: "\\((3,4)\\).",
      },
      selfCheckExample: {
        prompt: "Find the image of \\((4,1)\\) in the line \\(x-y=1\\).",
        steps: [
          "Let \\(P'=(h,k)\\). Midpoint on the line: \\(\\dfrac{4+h}{2}-\\dfrac{1+k}{2}=1\\Rightarrow h-k=-1\\).",
          "The line has slope \\(1\\), so \\(PP'\\) has slope \\(-1\\): \\(\\dfrac{k-1}{h-4}=-1\\Rightarrow k=5-h\\).",
          "Solve: \\(h-(5-h)=-1\\Rightarrow h=2,\\ k=3\\).",
        ],
        answer: "\\((2,3)\\).",
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
    { label: "Next: Angle, Parallel & Perpendicular", href: "/notes/nda-maths/lines/lines-angle-parallel-perp" },
    { label: "Matrices & Determinants notes (expanding a 3×3 determinant)", href: "/notes/nda-maths/matrices-determinants" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
