import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCLE_CHORDS_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Chords and Tangents of a Circle",
  title: "Chords and Tangents of a Circle",
  oneLineDefinition:
    "How a line meets one circle: the length of the chord it cuts, the chord with a given midpoint, when a line is a tangent, and what the two tangents from an outside point make: their length, the chord of contact, the angle and the areas.",
  whyItMatters:
    "Forty-six PYQs. Nearly every one reduces to one fact: the distance from the centre to a line, compared with the radius. Less than the radius gives a chord, equal gives a tangent. Five ideas cover the page.",
  concepts: [
    // C1 — chord length
    {
      kind: "formula" as const,
      slug: "jcon-chord-length",
      name: "Chord length from the distance to the centre",
      intuition:
        "Drop a perpendicular from the centre to the chord. It bisects the chord, so half the chord, the perpendicular \\(d\\) and the radius make a right triangle. That gives the chord length at once, without finding the two ends. The same picture answers 'which chord through a point is longest or shortest': the longest is the diameter, the shortest is perpendicular to the line joining the point to the centre.",
      definition:
        "- Chord at distance \\(d\\) from the centre: length \\(2\\sqrt{r^2-d^2}\\).\n" +
        "- The perpendicular from the centre bisects every chord.\n" +
        "- \\(d<r\\): the line cuts the circle; \\(d=r\\): it touches; \\(d>r\\): it misses.\n" +
        "- Through a point \\(P\\) inside: the longest chord is the diameter; the shortest (and the one farthest from the centre) is perpendicular to \\(CP\\).",
      formula: {
        label: "Chord length",
        latex: "\\ell=2\\sqrt{r^2-d^2}",
      },
      authoredExample: {
        prompt: "Find the length of the chord that \\(3x+4y=10\\) cuts on \\(x^2+y^2=25\\).",
        steps: [
          "Distance from the centre \\((0,0)\\): \\(d=\\frac{10}{5}=2\\).",
          "\\(\\ell=2\\sqrt{25-4}\\).",
        ],
        answer: "\\(2\\sqrt{21}\\).",
      },
      selfCheckExample: {
        prompt: "The line \\(y=x+c\\) cuts a chord of length \\(4\\) on \\(x^2+y^2=8\\). Find \\(c\\).",
        steps: [
          "Half the chord is \\(2\\), so \\(d=\\sqrt{8-4}=2\\).",
          "Distance from the origin to \\(x-y+c=0\\) is \\(\\frac{|c|}{\\sqrt2}=2\\).",
        ],
        answer: "\\(c=\\pm2\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "Chord of \\(x^2+y^2=9\\) on the line \\(x=1\\)?", answer: "\\(4\\sqrt2\\)", method: "\\(2\\sqrt{9-1}\\)" },
        { prompt: "Shortest chord of \\(x^2+y^2=25\\) through \\((3,0)\\)?", answer: "\\(8\\)", method: "\\(d=3\\)" },
        { prompt: "Does \\(x+y=4\\) meet \\(x^2+y^2=4\\)?", answer: "No: \\(d=2\\sqrt2>2\\)" },
        { prompt: "Chord \\(x=3\\) of \\((x-1)^2+y^2=13\\)?", answer: "\\(6\\)", method: "\\(d=2\\), \\(2\\sqrt9\\)" },
      ],
      pyqExampleId: "cb0e2f2a-9fb9-4c52-bbaa-2a23ea6e467d", // 2022 — touches x-axis at (1,0), chord 2 on x + y = 0
      traps: [
        {
          title: "Use the distance from the CENTRE, not from the origin",
          body: "For a circle not centred at the origin, the chord length needs the perpendicular distance from \\((-g,-f)\\) to the line. Measuring from \\((0,0)\\) out of habit gives a wrong \\(d\\).",
        },
      ],
    },

    // C2 — chords by midpoint or by the angle they subtend
    {
      kind: "formula" as const,
      slug: "jcon-chord-midpoint",
      name: "Chords by their midpoint, or by the angle they subtend",
      intuition:
        "The chord with a given midpoint \\(M\\) is perpendicular to \\(CM\\), so its equation is fixed. The shortcut \\(T=S_1\\) writes it in one line. When a chord through a fixed point varies, its midpoints \\(M\\) all see \\(CP\\) at a right angle, so they lie on the circle with \\(CP\\) as diameter. And a chord that subtends a right angle at the origin is found by homogenising: combine the circle and the line into one equation of degree two and ask that its two lines through the origin be perpendicular.",
      definition:
        "- \\(T=xx_1+yy_1+g(x+x_1)+f(y+y_1)+c\\) and \\(S_1\\) is the circle's value at \\((x_1,y_1)\\).\n" +
        "- **Chord with midpoint \\((x_1,y_1)\\):** \\(T=S_1\\).\n" +
        "- **Midpoints of chords through \\(P\\):** the circle on \\(CP\\) as diameter (the part inside the given circle).\n" +
        "- **Chord subtending \\(90^\\circ\\) at the origin:** write the chord as \\(lx+my=1\\), make the circle's equation homogeneous with it, and set (coefficient of \\(x^2\\)) + (coefficient of \\(y^2\\)) \\(=0\\).",
      formula: {
        label: "Chord with a given midpoint",
        latex: "T=S_1",
      },
      authoredExample: {
        prompt: "Find the chord of \\(x^2+y^2-4x-6y-12=0\\) whose midpoint is \\((1,1)\\).",
        steps: [
          "\\(T=x+y-2(x+1)-3(y+1)-12\\) and \\(S_1=1+1-4-6-12=-20\\).",
          "\\(T=S_1\\): \\(-x-2y-17=-20\\).",
          "Check: the centre is \\((2,3)\\), \\(CM\\) has slope \\(2\\), and the chord's slope \\(-\\frac12\\) is perpendicular.",
        ],
        answer: "\\(x+2y=3\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus of the midpoints of chords of \\(x^2+y^2=16\\) that pass through \\((2,0)\\).",
        steps: [
          "The midpoints lie on the circle with diameter joining the centre \\((0,0)\\) and \\(P(2,0)\\).",
          "Diameter form: \\(x(x-2)+y\\cdot y=0\\).",
        ],
        answer: "\\(x^2+y^2-2x=0\\).",
      },
      practiceSet: [
        { prompt: "Chord of \\(x^2+y^2=25\\) with midpoint \\((1,2)\\)?", answer: "\\(x+2y=5\\)" },
        { prompt: "Slope of the chord of \\(x^2+y^2=9\\) bisected at \\((1,1)\\)?", answer: "\\(-1\\)", method: "Perpendicular to \\(CM\\)" },
        { prompt: "Chord of \\(x^2+y^2-2x=0\\) bisected at \\(\\left(1,\\frac12\\right)\\)?", answer: "\\(y=\\frac12\\)", method: "The centre \\((1,0)\\) is straight below, so the chord is horizontal" },
        { prompt: "Midpoints of chords of \\(x^2+y^2=a^2\\) through \\((a,0)\\) lie on?", answer: "\\(x^2+y^2-ax=0\\)" },
      ],
      pyqExampleId: "e3cf6765-0422-4941-8afb-6de1f3f54f7b", // 2025 — through (4,2) and (0,2), chord with midpoint (1,2)
      traps: [
        {
          title: "\\(T=S_1\\) is not \\(T=0\\)",
          body: "\\(T=0\\) is the tangent (or polar) at \\((x_1,y_1)\\). The chord with midpoint \\((x_1,y_1)\\) is \\(T=S_1\\). Mixing them gives a line through the wrong point.",
        },
      ],
    },

    // C3 — tangent conditions
    {
      kind: "formula" as const,
      slug: "jcon-tangent-condition",
      name: "When a line is a tangent, and the tangent at a point",
      intuition:
        "A line is a tangent exactly when its distance from the centre equals the radius. The radius to the point of contact is perpendicular to the tangent, so the normal at any point passes through the centre. That is why two normals meet at the centre, and why a circle touching three lines is the incircle (or an excircle) of the triangle they form.",
      definition:
        "- **Tangent test:** distance from the centre \\(=r\\).\n" +
        "- **Tangent at \\((x_1,y_1)\\) on the circle:** \\(T=0\\), i.e. \\(xx_1+yy_1+g(x+x_1)+f(y+y_1)+c=0\\).\n" +
        "- **Slope form for \\(x^2+y^2=a^2\\):** \\(y=mx\\pm a\\sqrt{1+m^2}\\).\n" +
        "- **Normal:** passes through the centre, so two normals meet at the centre.",
      formula: {
        label: "Tangent of slope m to x² + y² = a²",
        latex: "y=mx\\pm a\\sqrt{1+m^2}",
      },
      authoredExample: {
        prompt: "Find the tangents of slope \\(2\\) to \\(x^2+y^2=9\\).",
        steps: [
          "Slope form with \\(a=3\\), \\(m=2\\): \\(c=\\pm3\\sqrt{1+4}\\).",
        ],
        answer: "\\(y=2x\\pm3\\sqrt5\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(c\\) does \\(3x-4y=c\\) touch \\(x^2+y^2-2x+4y-4=0\\)?",
        steps: [
          "Centre \\((1,-2)\\), \\(r=\\sqrt{1+4+4}=3\\).",
          "\\(\\frac{|3+8-c|}{5}=3\\), so \\(|11-c|=15\\).",
        ],
        answer: "\\(c=-4\\) or \\(c=26\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(x^2+y^2=25\\) at \\((3,4)\\)?", answer: "\\(3x+4y=25\\)" },
        { prompt: "Two normals of a circle are \\(x=2\\) and \\(y=-1\\). Centre?", answer: "\\((2,-1)\\)" },
        { prompt: "Does \\(x+y=2\\) touch \\(x^2+y^2=2\\)?", answer: "Yes: \\(d=\\sqrt2=r\\)" },
        { prompt: "Radius of the circle centred at \\((0,0)\\) touching \\(x+y=4\\)?", answer: "\\(2\\sqrt2\\)" },
      ],
      pyqExampleId: "6a365f02-61c7-4d33-a494-d12d33b15570", // 2021 — tangent 2x - y + 1 = 0 at (2,5), centre on x - 2y = 4
      traps: [
        {
          title: "The slope form needs the circle centred at the origin",
          body: "\\(y=mx\\pm a\\sqrt{1+m^2}\\) is for \\(x^2+y^2=a^2\\). For any other circle, use the distance test from the actual centre, or shift the origin first.",
        },
      ],
    },

    // C4 — tangents from an outside point
    {
      kind: "formula" as const,
      slug: "jcon-tangents-from-point",
      name: "Tangents from an outside point: length, chord of contact, angle, area",
      intuition:
        "From an outside point \\(P\\), two tangents touch the circle at \\(A\\) and \\(B\\). The picture is symmetric about \\(PC\\): the two tangents are equal, \\(PA\\perp CA\\), and \\(AB\\) is perpendicular to \\(PC\\). Every quantity comes from the right triangle \\(PAC\\) with legs \\(L\\) (tangent length) and \\(r\\). The line \\(AB\\), the chord of contact, has the same equation \\(T=0\\) as a tangent. Here \\((x_1,y_1)\\) is the outside point, so it is the polar of \\(P\\).",
      definition:
        "- **Tangent length:** \\(L=\\sqrt{S_1}\\), where \\(S_1=PC^2-r^2\\).\n" +
        "- **Chord of contact (polar of \\(P\\)):** \\(T=0\\).\n" +
        "- **Angle between the tangents:** \\(2\\tan^{-1}\\frac{r}{L}\\).\n" +
        "- **Chord of contact length:** \\(\\frac{2rL}{\\sqrt{r^2+L^2}}\\).\n" +
        "- **Area of triangle \\(PAB\\):** \\(\\frac{rL^3}{r^2+L^2}\\). Area of quadrilateral \\(PACB\\): \\(rL\\).\n" +
        "- **Power of a point:** any line through \\(P\\) meeting the circle at \\(R\\), \\(S\\) has \\(PR\\cdot PS=S_1\\).",
      formula: {
        label: "Tangent length and area of triangle PAB",
        latex: "L=\\sqrt{S_1},\\qquad [PAB]=\\frac{rL^3}{r^2+L^2}",
      },
      authoredExample: {
        prompt: "From \\(P(4,3)\\) tangents are drawn to \\(x^2+y^2=9\\). Find the tangent length, the chord of contact and the angle between the tangents.",
        steps: [
          "\\(S_1=16+9-9=16\\), so \\(L=4\\).",
          "Chord of contact \\(T=0\\): \\(4x+3y=9\\).",
          "\\(\\tan\\frac{\\theta}{2}=\\frac{r}{L}=\\frac34\\).",
        ],
        answer: "\\(L=4\\); \\(4x+3y=9\\); angle \\(2\\tan^{-1}\\frac34\\).",
      },
      selfCheckExample: {
        prompt: "For the same point and circle, find the area of the triangle formed by the two tangents and the chord of contact.",
        steps: [
          "\\(r=3\\), \\(L=4\\).",
          "\\([PAB]=\\frac{3\\cdot64}{9+16}\\).",
        ],
        answer: "\\(\\frac{192}{25}\\).",
      },
      practiceSet: [
        { prompt: "Tangent length from \\((5,0)\\) to \\(x^2+y^2=16\\)?", answer: "\\(3\\)" },
        { prompt: "Chord of contact of \\((2,1)\\) for \\(x^2+y^2=4\\)?", answer: "\\(2x+y=4\\)" },
        { prompt: "A line through \\(P\\) meets a circle at \\(R\\), \\(S\\); \\(S_1=12\\) at \\(P\\). \\(PR\\cdot PS\\)?", answer: "\\(12\\)" },
        { prompt: "\\(L=r\\): angle between the tangents?", answer: "\\(90^\\circ\\)", method: "\\(2\\tan^{-1}1\\)" },
      ],
      pyqExampleId: "c5f2efa9-3d0f-4714-af43-685a4eb03625", // 2022 — tangents from the origin to x^2+y^2-4x+3=0, area of OAB
      traps: [
        {
          title: "The angle is TWICE \\(\\tan^{-1}\\frac{r}{L}\\)",
          body: "\\(\\tan^{-1}\\frac{r}{L}\\) is the angle between one tangent and \\(PC\\). The angle between the two tangents is double it.",
        },
        {
          title: "Triangle \\(PAB\\) is not triangle \\(PAC\\)",
          body: "\\([PAC]=\\frac12rL\\) is half the quadrilateral \\(PACB\\). The triangle cut off by the chord of contact is smaller: \\(\\frac{rL^3}{r^2+L^2}\\).",
        },
      ],
    },

    // C5 — parametric points and extremes
    {
      kind: "formula" as const,
      slug: "jcon-circle-parametric",
      name: "Parametric points and largest and smallest values",
      intuition:
        "Every point of \\((x-h)^2+(y-k)^2=r^2\\) is \\((h+r\\cos\\theta,\\ k+r\\sin\\theta)\\). That turns 'the largest value of an expression over the circle' into a one-variable problem. For a distance from a fixed point, you do not even need the parameter: the extremes lie on the line through the centre.",
      definition:
        "- **Parametric point:** \\((h+r\\cos\\theta,\\ k+r\\sin\\theta)\\).\n" +
        "- \\(a\\cos\\theta+b\\sin\\theta\\) ranges over \\([-\\sqrt{a^2+b^2},\\ \\sqrt{a^2+b^2}]\\).\n" +
        "- Distance from a fixed point \\(Q\\) to the circle: between \\(|QC-r|\\) and \\(QC+r\\).",
      formula: {
        label: "Parametric point",
        latex: "(h+r\\cos\\theta,\\ k+r\\sin\\theta)",
      },
      authoredExample: {
        prompt: "Find the largest and smallest values of \\(x^2+y^2\\) for points on \\((x-3)^2+(y-4)^2=1\\).",
        steps: [
          "\\(x^2+y^2\\) is the squared distance from the origin.",
          "The centre is \\(5\\) from the origin and \\(r=1\\), so distances run from \\(4\\) to \\(6\\).",
        ],
        answer: "Largest \\(36\\), smallest \\(16\\).",
      },
      selfCheckExample: {
        prompt: "Find the largest value of \\(3x+4y\\) on \\(x^2+y^2=4\\).",
        steps: [
          "Put \\(x=2\\cos\\theta\\), \\(y=2\\sin\\theta\\): \\(6\\cos\\theta+8\\sin\\theta\\).",
          "Its largest value is \\(\\sqrt{36+64}\\).",
        ],
        answer: "\\(10\\).",
      },
      practiceSet: [
        { prompt: "Parametric point of \\(x^2+y^2-2x=0\\)?", answer: "\\((1+\\cos\\theta,\\ \\sin\\theta)\\)" },
        { prompt: "Smallest value of \\(x+y\\) on \\(x^2+y^2=8\\)?", answer: "\\(-4\\)" },
        { prompt: "Farthest point of \\(x^2+y^2=1\\) from \\((3,0)\\)?", answer: "\\((-1,0)\\)" },
        { prompt: "Range of \\(x\\) on \\((x-2)^2+y^2=9\\)?", answer: "\\([-1,5]\\)" },
      ],
      pyqExampleId: "abe88ea4-2fb4-49f8-a732-1dbd8ac69f9b", // 2024 — circle of radius 1 tangent to lines through (3,2); shortest distance to (5,5)
      traps: [
        {
          title: "Find the centre before measuring",
          body: "Extremes of distance run along the line through the CENTRE. Working from a point on the circle that merely looks nearest gives the wrong value.",
        },
      ],
    },
  ],
};
