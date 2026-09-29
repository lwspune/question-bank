import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCLE_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "Equation of a Circle",
  title: "Equation of a Circle",
  oneLineDefinition:
    "Reading a circle's centre and radius from any form of its equation, and building the equation from given conditions: points it passes through, lines it touches, intercepts it cuts, or a locus rule.",
  whyItMatters:
    "Forty-nine PYQs, the largest page in Conic Sections. Most are two steps: find the centre and radius from the data, then read off what is asked. The rest are loci that turn out to be circles. Six ideas cover all of them.",
  concepts: [
    // C1 — general form
    {
      kind: "formula" as const,
      slug: "jcon-general-form",
      name: "The general equation: centre, radius and when it is a circle",
      intuition:
        "Every circle is \\((x-h)^2+(y-k)^2=r^2\\). Expand it and you get \\(x^2+y^2+2gx+2fy+c=0\\) with centre \\((-g,-f)\\) and \\(r^2=g^2+f^2-c\\). So a second-degree equation is a circle only when \\(x^2\\) and \\(y^2\\) carry **equal** coefficients and there is **no** \\(xy\\) term. Divide by the common coefficient before reading \\(g\\), \\(f\\) and \\(c\\).",
      definition:
        "- **Centre-radius form:** \\((x-h)^2+(y-k)^2=r^2\\).\n" +
        "- **General form:** \\(x^2+y^2+2gx+2fy+c=0\\), centre \\((-g,-f)\\), radius \\(\\sqrt{g^2+f^2-c}\\).\n" +
        "- **Real circle:** \\(g^2+f^2-c>0\\). If it is \\(0\\) the circle is a single point; if negative there is no real circle.\n" +
        "- **Is it a circle?** \\(ax^2+2hxy+by^2+\\dots=0\\) is a circle only if \\(a=b\\neq0\\) and \\(h=0\\).",
      formula: {
        label: "Centre and radius of the general form",
        latex: "C=(-g,-f),\\qquad r=\\sqrt{g^2+f^2-c}",
      },
      authoredExample: {
        prompt: "Find the centre and radius of \\(2x^2+2y^2-8x+12y+6=0\\).",
        steps: [
          "Divide by \\(2\\): \\(x^2+y^2-4x+6y+3=0\\).",
          "Match with \\(x^2+y^2+2gx+2fy+c=0\\): \\(g=-2\\), \\(f=3\\), \\(c=3\\).",
          "Centre \\((-g,-f)=(2,-3)\\); \\(r^2=4+9-3=10\\).",
        ],
        answer: "Centre \\((2,-3)\\), radius \\(\\sqrt{10}\\).",
      },
      selfCheckExample: {
        prompt: "For which values of \\(k\\) is \\(x^2+y^2+kx-4y+13=0\\) a real circle?",
        steps: [
          "Here \\(g=\\frac{k}{2}\\), \\(f=-2\\), \\(c=13\\).",
          "Need \\(r^2=\\frac{k^2}{4}+4-13>0\\), i.e. \\(k^2>36\\).",
        ],
        answer: "\\(|k|>6\\).",
      },
      practiceSet: [
        { prompt: "Centre and radius of \\(x^2+y^2-6x+8y=0\\)?", answer: "\\((3,-4)\\), \\(5\\)" },
        { prompt: "Radius of \\(x^2+y^2+2x-4y-4=0\\)?", answer: "\\(3\\)", method: "\\(\\sqrt{1+4+4}\\)" },
        { prompt: "For which \\(c\\) is \\(x^2+y^2-2x+4y+c=0\\) a single point?", answer: "\\(c=5\\)", method: "\\(g^2+f^2-c=0\\)" },
        { prompt: "Can \\(x^2+y^2+xy+x=0\\) be a circle?", answer: "No: it has an \\(xy\\) term" },
      ],
      pyqExampleId: "61562927-20f8-4280-9994-e4bdd6adfd1c", // 2022 — centre on a line, through a point, x-intercept
      traps: [
        {
          title: "Divide by the \\(x^2\\) coefficient first",
          body: "In \\(2x^2+2y^2-8x+12y+6=0\\), reading \\(2g=-8\\) directly gives the wrong centre \\((4,-6)\\). The formulas \\((-g,-f)\\) and \\(\\sqrt{g^2+f^2-c}\\) hold only after the \\(x^2\\) and \\(y^2\\) coefficients are \\(1\\).",
        },
        {
          title: "The centre is \\((-g,-f)\\), with the signs flipped",
          body: "\\(x^2+y^2-4x+6y=0\\) has \\(2g=-4\\), so \\(g=-2\\) and the centre's \\(x\\)-coordinate is \\(+2\\). Half the coefficient, then change the sign.",
        },
      ],
    },

    // C2 — position of a point
    {
      kind: "formula" as const,
      slug: "jcon-point-position",
      name: "Position of a point, and nearest and farthest distances",
      intuition:
        "Put a point \\(P(x_1,y_1)\\) into the left side of \\(S=x^2+y^2+2gx+2fy+c\\). The number you get, \\(S_1\\), equals \\(PC^2-r^2\\). So its **sign** tells you where \\(P\\) is. The nearest and farthest points of the circle from \\(P\\) both lie on the line \\(PC\\), at distances \\(|PC-r|\\) and \\(PC+r\\).",
      definition:
        "- \\(S_1<0\\): \\(P\\) is inside. \\(S_1=0\\): on the circle. \\(S_1>0\\): outside.\n" +
        "- Nearest distance from \\(P\\) to the circle: \\(|PC-r|\\).\n" +
        "- Farthest distance: \\(PC+r\\).\n" +
        "- Both extreme points lie on the line through \\(P\\) and the centre \\(C\\).",
      formula: {
        label: "Power of a point",
        latex: "S_1=x_1^2+y_1^2+2gx_1+2fy_1+c=PC^2-r^2",
      },
      authoredExample: {
        prompt: "Is \\((1,2)\\) inside \\(x^2+y^2-4x-2y-4=0\\)? Find its nearest and farthest distances from the circle.",
        steps: [
          "\\(S_1=1+4-4-4-4=-7<0\\), so the point is inside.",
          "Centre \\((2,1)\\), \\(r=\\sqrt{4+1+4}=3\\), and \\(PC=\\sqrt{1+1}=\\sqrt2\\).",
          "Nearest \\(=3-\\sqrt2\\), farthest \\(=3+\\sqrt2\\).",
        ],
        answer: "Inside; nearest \\(3-\\sqrt2\\), farthest \\(3+\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "Find the greatest distance of \\((5,5)\\) from a point of \\(x^2+y^2-2x-2y-7=0\\).",
        steps: [
          "Centre \\((1,1)\\), \\(r=\\sqrt{1+1+7}=3\\).",
          "\\(PC=\\sqrt{16+16}=4\\sqrt2\\).",
          "Greatest distance \\(=PC+r\\).",
        ],
        answer: "\\(4\\sqrt2+3\\).",
      },
      practiceSet: [
        { prompt: "Where is \\((3,4)\\) relative to \\(x^2+y^2=25\\)?", answer: "On the circle (\\(S_1=0\\))" },
        { prompt: "Sign of \\(S_1\\) for \\((0,0)\\) and \\(x^2+y^2-2x-3=0\\)?", answer: "Negative: inside", method: "\\(S_1=-3\\)" },
        { prompt: "Shortest distance from \\((6,8)\\) to \\(x^2+y^2=4\\)?", answer: "\\(8\\)", method: "\\(10-2\\)" },
        { prompt: "Farthest distance from \\((1,0)\\) to \\(x^2+y^2=9\\)?", answer: "\\(4\\)", method: "\\(PC+r=1+3\\)" },
      ],
      pyqExampleId: "60578a2a-6ccc-492b-910b-638526c8ca80", // 2021 — largest and smallest circles through a point, centres on a circle
      traps: [
        {
          title: "For a point inside, the nearest distance is \\(r-PC\\)",
          body: "Writing \\(PC-r\\) for an inside point gives a negative 'distance'. Use \\(|PC-r|\\): it is \\(PC-r\\) outside and \\(r-PC\\) inside.",
        },
      ],
    },

    // C3 — diameter form
    {
      kind: "formula" as const,
      slug: "jcon-diameter-form",
      name: "The diameter form and right angles",
      intuition:
        "If \\(A\\) and \\(B\\) are the ends of a diameter, every other point \\(P\\) of the circle sees \\(AB\\) at a right angle, so \\(\\vec{PA}\\cdot\\vec{PB}=0\\). Written out, that is the diameter form. Read it backwards too: when a right angle stands on a fixed segment, its vertex lies on the circle with that segment as diameter. This is how four points are shown to be concyclic, and why the circumcentre of a right triangle is the midpoint of its hypotenuse.",
      definition:
        "- **Diameter form:** ends \\((x_1,y_1)\\), \\((x_2,y_2)\\) give \\((x-x_1)(x-x_2)+(y-y_1)(y-y_2)=0\\).\n" +
        "- **Angle in a semicircle** is \\(90^\\circ\\).\n" +
        "- **Right triangle:** circumcentre = midpoint of the hypotenuse, circumradius = half the hypotenuse.\n" +
        "- If \\(x_1,x_2\\) are roots of one quadratic and \\(y_1,y_2\\) of another, the equation needs only their sums and products (Vieta). Do not solve for the roots.",
      formula: {
        label: "Diameter form",
        latex: "(x-x_1)(x-x_2)+(y-y_1)(y-y_2)=0",
      },
      authoredExample: {
        prompt: "The points \\((2,0)\\), \\((0,4)\\), \\((0,0)\\) and \\((k,k)\\), \\(k\\neq0\\), lie on one circle. Find \\(k\\).",
        steps: [
          "At the origin, the lines to \\((2,0)\\) and \\((0,4)\\) are the two axes, which are perpendicular. So the segment joining \\((2,0)\\) and \\((0,4)\\) is a diameter.",
          "Diameter form: \\((x-2)x+y(y-4)=0\\), i.e. \\(x^2+y^2-2x-4y=0\\).",
          "Put \\((k,k)\\): \\(2k^2-6k=0\\), so \\(k=3\\).",
        ],
        answer: "\\(k=3\\).",
      },
      selfCheckExample: {
        prompt: "The abscissae of \\(P\\) and \\(Q\\) are the roots of \\(x^2-2x-3=0\\) and their ordinates the roots of \\(y^2-4y+1=0\\). Write the circle on \\(PQ\\) as diameter.",
        steps: [
          "Expanding the diameter form: \\(x^2+y^2-(x_1+x_2)x-(y_1+y_2)y+x_1x_2+y_1y_2=0\\).",
          "Vieta: \\(x_1+x_2=2\\), \\(x_1x_2=-3\\), \\(y_1+y_2=4\\), \\(y_1y_2=1\\).",
        ],
        answer: "\\(x^2+y^2-2x-4y-2=0\\).",
      },
      practiceSet: [
        { prompt: "Circle on the diameter joining \\((0,0)\\) and \\((4,2)\\)?", answer: "\\(x^2+y^2-4x-2y=0\\)" },
        { prompt: "Circumradius of the triangle with vertices \\((0,0)\\), \\((6,0)\\), \\((0,8)\\)?", answer: "\\(5\\)", method: "Half the hypotenuse" },
        { prompt: "Circumcentre of the same triangle?", answer: "\\((3,4)\\)", method: "Midpoint of the hypotenuse" },
        { prompt: "A square is inscribed in a circle of radius \\(4\\). Its side?", answer: "\\(4\\sqrt2\\)", method: "Its diagonal is a diameter" },
      ],
      pyqExampleId: "44be3480-6ca4-4f82-91c6-484b0d6c6a78", // 2025 — four concyclic points, (4,6) and (-1,5) seen at a right angle from O
      traps: [
        {
          title: "Both points must be ends of ONE diameter",
          body: "The diameter form through two points that are merely ON the circle gives a different, smaller circle. First check that the segment really is a diameter, for example by a right angle standing on it.",
        },
      ],
    },

    // C4 — axes and intercepts
    {
      kind: "formula" as const,
      slug: "jcon-axes-intercepts",
      name: "Touching the axes and cutting intercepts",
      intuition:
        "To meet the \\(x\\)-axis put \\(y=0\\): \\(x^2+2gx+c=0\\). Its roots are the ends of the \\(x\\)-intercept, which has length \\(2\\sqrt{g^2-c}\\). The circle **touches** the \\(x\\)-axis when that length is zero, which happens exactly when the radius equals the centre's distance from the axis, \\(|k|\\). The \\(y\\)-axis works the same way with \\(f\\).",
      definition:
        "- \\(x\\)-intercept \\(=2\\sqrt{g^2-c}\\); \\(y\\)-intercept \\(=2\\sqrt{f^2-c}\\).\n" +
        "- Touches the \\(x\\)-axis: \\(r=|k|\\) (equivalently \\(g^2=c\\)). Touches the \\(y\\)-axis: \\(r=|h|\\).\n" +
        "- Touches both axes: centre \\((\\pm r,\\pm r)\\), signs chosen by the quadrant.\n" +
        "- Meets neither axis: \\(r<|h|\\) and \\(r<|k|\\).\n" +
        "- A chord at distance \\(d\\) from the centre has length \\(2\\sqrt{r^2-d^2}\\); an intercept is the case where the chord is an axis.",
      formula: {
        label: "Intercepts on the axes",
        latex: "\\ell_x=2\\sqrt{g^2-c},\\qquad \\ell_y=2\\sqrt{f^2-c}",
      },
      authoredExample: {
        prompt: "A circle touches the \\(x\\)-axis at \\((3,0)\\), lies above it and cuts an intercept of \\(8\\) on the \\(y\\)-axis. Find its equation.",
        steps: [
          "Touching the \\(x\\)-axis at \\((3,0)\\): centre \\((3,r)\\), radius \\(r\\).",
          "Distance of the centre from the \\(y\\)-axis is \\(3\\), so the \\(y\\)-intercept is \\(2\\sqrt{r^2-9}=8\\).",
          "\\(r^2=25\\), \\(r=5\\).",
        ],
        answer: "\\((x-3)^2+(y-5)^2=25\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(c\\) does \\(x^2+y^2-6x+4y+c=0\\) meet neither axis?",
        steps: [
          "Centre \\((3,-2)\\), \\(r^2=9+4-c=13-c\\).",
          "Need \\(0<r<\\min(3,2)=2\\): \\(0<13-c<4\\).",
        ],
        answer: "\\(9<c<13\\).",
      },
      practiceSet: [
        { prompt: "\\(x\\)-intercept of \\(x^2+y^2-4x-5=0\\)?", answer: "\\(6\\)", method: "\\(2\\sqrt{4+5}\\)" },
        { prompt: "Radius of a circle in the 2nd quadrant touching both axes, centre on \\(x+2y=6\\)?", answer: "\\(6\\)", method: "Centre \\((-r,r)\\): \\(-r+2r=6\\)" },
        { prompt: "Does \\(x^2+y^2-2x-4y+1=0\\) touch the \\(x\\)-axis?", answer: "Yes: \\(g^2=c=1\\)" },
        { prompt: "\\(y\\)-intercept of \\(x^2+y^2+6y-7=0\\)?", answer: "\\(8\\)", method: "\\(2\\sqrt{9+7}\\)" },
      ],
      pyqExampleId: "b52e6d34-12ef-427b-82cf-a07b5e884119", // 2021 — touches the y-axis at (0,6), x-intercept 6 root 5
      traps: [
        {
          title: "Touching the \\(x\\)-axis fixes \\(r=|k|\\), not \\(|h|\\)",
          body: "The radius to the point of contact is perpendicular to the axis, so it runs vertically: its length is the centre's \\(y\\)-coordinate. Mixing up \\(h\\) and \\(k\\) here is the usual slip.",
        },
      ],
    },

    // C5 — circle from conditions
    {
      kind: "formula" as const,
      slug: "jcon-circle-from-conditions",
      name: "Building a circle from conditions",
      intuition:
        "A circle has three unknowns, \\(h\\), \\(k\\), \\(r\\), so it needs three conditions. Each condition gives one equation: passing through a point (substitute it), centre on a line (substitute the centre), touching a line (distance from the centre equals \\(r\\)), touching a curve at a known point (the centre lies on the normal there). Pick the form in which the given conditions are easiest to write.",
      definition:
        "- Through \\(A\\) and \\(B\\): the centre is on the perpendicular bisector of \\(AB\\).\n" +
        "- Touches a line \\(L\\): the distance from the centre to \\(L\\) equals \\(r\\).\n" +
        "- Touches \\(L\\) at \\(P\\): the centre is on the normal to \\(L\\) at \\(P\\), at distance \\(r\\).\n" +
        "- Touches two parallel lines: \\(2r\\) is the gap between them and the centre is on the midway line.\n" +
        "- Touches two crossing lines: the centre is on a bisector of the angle between them.",
      formula: {
        label: "Distance from the centre to a tangent line",
        latex: "\\frac{|ah+bk+c|}{\\sqrt{a^2+b^2}}=r",
      },
      authoredExample: {
        prompt: "A circle passes through \\((1,0)\\) and \\((5,0)\\) and touches the \\(y\\)-axis. Find it.",
        steps: [
          "The centre is on the perpendicular bisector of the two points: \\(h=3\\).",
          "Touching the \\(y\\)-axis: \\(r=|h|=3\\).",
          "Through \\((1,0)\\): \\(4+k^2=9\\), so \\(k=\\pm\\sqrt5\\).",
        ],
        answer: "\\((x-3)^2+(y\\mp\\sqrt5)^2=9\\).",
      },
      selfCheckExample: {
        prompt: "A circle with centre on the \\(x\\)-axis touches \\(3x+4y=5\\) and \\(3x+4y=15\\). Find its centre and radius.",
        steps: [
          "The lines are parallel, \\(\\frac{15-5}{5}=2\\) apart, so \\(r=1\\).",
          "The centre lies on the midway line \\(3x+4y=10\\) and on \\(y=0\\): \\(x=\\frac{10}{3}\\).",
        ],
        answer: "Centre \\(\\left(\\frac{10}{3},0\\right)\\), radius \\(1\\).",
      },
      practiceSet: [
        { prompt: "Radius of the circle with centre \\((1,2)\\) touching \\(3x+4y=1\\)?", answer: "\\(2\\)", method: "\\(\\frac{|3+8-1|}{5}\\)" },
        { prompt: "Centre on \\(y=x\\), through \\((0,0)\\) and \\((4,0)\\): centre?", answer: "\\((2,2)\\)" },
        { prompt: "Gap between \\(x+y=2\\) and \\(x+y=6\\) as a diameter: radius?", answer: "\\(\\sqrt2\\)", method: "Gap \\(\\frac{4}{\\sqrt2}=2\\sqrt2\\)" },
        { prompt: "How many conditions fix a circle?", answer: "Three" },
      ],
      pyqExampleId: "e5bb730a-e435-483f-ae6f-68f5a0157da5", // 2022 — through A and B, centre on another circle
      traps: [
        {
          title: "Two parallel tangents give the DIAMETER, not the radius",
          body: "The gap between two parallel tangents spans the whole circle, so \\(r\\) is half of it. Taking the gap as \\(r\\) doubles the radius.",
        },
        {
          title: "A distance condition gives two signs",
          body: "\\(|ah+bk+c|=r\\sqrt{a^2+b^2}\\) splits into two cases. Keep both until a stated condition (a quadrant, 'below the axis') rules one out.",
        },
      ],
    },

    // C6 — loci that are circles
    {
      kind: "formula" as const,
      slug: "jcon-loci-circles",
      name: "Loci that turn out to be circles",
      intuition:
        "Call the moving point \\((h,k)\\), turn the condition into an equation, simplify, and rename \\(h,k\\) as \\(x,y\\). Several conditions always give circles: a fixed ratio of distances from two points (other than \\(1\\)), a fixed sum of squared distances from fixed points, and a point that divides a segment whose other end moves on a circle. When the point is given by a parameter, remove it with \\(\\cos^2\\theta+\\sin^2\\theta=1\\).",
      definition:
        "- \\(PA=\\lambda\\,PB\\) with \\(\\lambda\\neq1\\): a circle. With \\(\\lambda=1\\) it is the perpendicular bisector, a line.\n" +
        "- \\(\\sum PA_i^2=\\) constant: a circle centred at the centroid of the fixed points.\n" +
        "- \\(A\\) fixed, \\(B\\) moving on a circle of centre \\(O\\), radius \\(r\\); \\(P\\) divides \\(AB\\) as \\(m:n\\) from \\(A\\): \\(P\\) moves on a circle of centre \\(\\frac{nA+mO}{m+n}\\) and radius \\(\\frac{m}{m+n}r\\).\n" +
        "- Parameter \\(\\theta\\): isolate \\(\\cos\\theta\\) and \\(\\sin\\theta\\), then square and add.",
      formula: {
        label: "A dividing point whose far end moves on a circle",
        latex: "P=\\frac{nA+mB}{m+n}\\ \\Rightarrow\\ \\text{radius}=\\frac{m}{m+n}\\,r",
      },
      authoredExample: {
        prompt: "Find the locus of \\(P\\) with \\(PA=2\\,PB\\), where \\(A=(0,0)\\) and \\(B=(3,0)\\).",
        steps: [
          "Square the condition: \\(x^2+y^2=4\\left[(x-3)^2+y^2\\right]\\).",
          "Collect: \\(3x^2+3y^2-24x+36=0\\), i.e. \\(x^2+y^2-8x+12=0\\).",
          "Centre \\((4,0)\\), \\(r^2=16-12=4\\).",
        ],
        answer: "The circle \\(x^2+y^2-8x+12=0\\): centre \\((4,0)\\), radius \\(2\\).",
      },
      selfCheckExample: {
        prompt: "\\(A=(2,0)\\) is fixed and \\(B\\) moves on \\(x^2+y^2=9\\). Find the locus of the midpoint of \\(AB\\).",
        steps: [
          "The midpoint divides \\(AB\\) as \\(1:1\\), so \\(m=n=1\\).",
          "Centre \\(\\frac{A+O}{2}=(1,0)\\), radius \\(\\frac12\\cdot3\\).",
        ],
        answer: "A circle of centre \\((1,0)\\) and radius \\(\\frac32\\): \\((x-1)^2+y^2=\\frac94\\).",
      },
      practiceSet: [
        { prompt: "Locus of \\((3\\cos\\theta,3\\sin\\theta)\\)?", answer: "\\(x^2+y^2=9\\)" },
        { prompt: "Locus of \\(P\\) with \\(PA=PB\\)?", answer: "The perpendicular bisector of \\(AB\\) (a line)" },
        { prompt: "\\(B\\) on \\(x^2+y^2=25\\), \\(A=(0,0)\\); \\(P\\) divides \\(AB\\) as \\(2:3\\) from \\(A\\). Radius of \\(P\\)'s locus?", answer: "\\(2\\)", method: "\\(\\frac{2}{5}\\cdot5\\)" },
        { prompt: "Locus of \\((1+2\\cos t,\\ 2\\sin t-1)\\)?", answer: "\\((x-1)^2+(y+1)^2=4\\)" },
      ],
      pyqExampleId: "aa7062f1-9ac4-4642-827f-44ec4452d151", // 2021 — distance from (5,0) thrice the distance from (-5,0)
      traps: [
        {
          title: "The radius scales by the MOVING end's share",
          body: "If \\(P\\) divides \\(AB\\) as \\(m:n\\) from the fixed point \\(A\\), \\(P\\) is \\(\\frac{m}{m+n}\\) of the way to \\(B\\), so its circle has radius \\(\\frac{m}{m+n}r\\). Using \\(\\frac{n}{m+n}\\) swaps the shares.",
        },
        {
          title: "Equal distances give a line, not a circle",
          body: "The ratio rule gives a circle only for \\(\\lambda\\neq1\\). When \\(PA=PB\\), the squared terms cancel and the locus is the perpendicular bisector.",
        },
      ],
    },
  ],
};
