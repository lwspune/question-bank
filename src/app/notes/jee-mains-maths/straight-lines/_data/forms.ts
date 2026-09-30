import type { SubtopicNote } from "@/app/notes/_types";

export const FORMS_SL_NOTE: SubtopicNote = {
  subtopicName: "Slope, Angle and Forms of a Line",
  title: "Slope, Angle and Forms of a Line",
  oneLineDefinition:
    "The slope of a line, the angle between two lines, the intercept and normal forms of a line, and the parametric form for measuring distance along a line.",
  whyItMatters:
    "Twenty-one PYQs, all of them multiple choice, and two from 2026. Nine turn on slopes and the angle between two lines: isosceles triangles, lines at a given angle, segments that subtend a given angle at the origin. Eight write a line in intercept or normal form or find where two lines meet, three of them to minimise an area or a sum of intercepts. Four measure a distance along a line in a given direction. Three ideas cover the page.",
  concepts: [
    // C1 — angle between two lines
    {
      kind: "formula" as const,
      slug: "jsl-angle",
      name: "The angle between two lines",
      intuition:
        "The slope \\(m=\\tan\\theta\\) is the tangent of the angle a line makes with the positive x-axis. Two lines with slopes \\(m_1,m_2\\) meet at an angle whose tangent is \\(\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|\\). Run it backwards to find a line at a given angle to another: the modulus gives two answers, one on each side. Parallel lines have equal slopes; perpendicular lines have \\(m_1m_2=-1\\).",
      definition:
        "- Slope through \\((x_1,y_1),(x_2,y_2)\\): \\(m=\\frac{y_2-y_1}{x_2-x_1}\\); slope of \\(ax+by+c=0\\): \\(-\\frac ab\\).\n" +
        "- Acute angle: \\(\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|\\).\n" +
        "- Parallel: \\(m_1=m_2\\); perpendicular: \\(m_1m_2=-1\\).\n" +
        "- Isosceles triangle with its equal sides on two given lines: the base makes equal angles with both, so it is perpendicular to one of their bisectors.",
      formula: {
        label: "Angle between two lines",
        latex: "\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|",
      },
      authoredExample: {
        prompt: "Find the slopes of the lines that make \\(45^\\circ\\) with \\(y=3x\\).",
        steps: [
          "\\(\\left|\\frac{m-3}{1+3m}\\right|=1\\).",
          "\\(m-3=1+3m\\) gives \\(m=-2\\); \\(m-3=-(1+3m)\\) gives \\(m=\\frac12\\).",
        ],
        answer: "\\(-2\\) and \\(\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan\\theta\\) for the acute angle between \\(2x-y+1=0\\) and \\(x+y=4\\).",
        steps: [
          "The slopes are \\(2\\) and \\(-1\\).",
          "\\(\\left|\\frac{2-(-1)}{1+2(-1)}\\right|=\\left|\\frac{3}{-1}\\right|\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "Slope of \\(3x+4y=7\\)?", answer: "\\(-\\frac34\\)" },
        { prompt: "Slope of a line perpendicular to \\(y=\\frac25x\\)?", answer: "\\(-\\frac52\\)" },
        { prompt: "Angle of \\(y=\\sqrt3x\\) with the x-axis?", answer: "\\(60^\\circ\\)" },
        { prompt: "Acute angle between \\(x=2\\) and \\(y=x\\)?", answer: "\\(45^\\circ\\)" },
      ],
      pyqExampleId: "6108e24c-3d5b-4ab8-95a2-7ba6fd1077b5", // 2025 — isosceles triangle, sum of the slopes of the third side
      traps: [
        {
          title: "Two lines, not one",
          body: "\\(\\tan\\theta=k\\) with a modulus gives two slopes. An isosceles triangle with two sides given has two possible bases, and a line at a given angle to another has two positions. Keep both before you add or choose.",
        },
      ],
    },

    // C2 — intercept and normal forms
    {
      kind: "formula" as const,
      slug: "jsl-intercepts",
      name: "Intercept and normal forms",
      intuition:
        "A line cutting the axes at \\((a,0)\\) and \\((0,b)\\) is \\(\\frac xa+\\frac yb=1\\). The normal form \\(x\\cos\\alpha+y\\sin\\alpha=p\\) uses the length \\(p\\) of the perpendicular from the origin and the angle \\(\\alpha\\) it makes with the x-axis. For a line through a fixed point \\((h,k)\\) that meets the positive axes, the triangle it cuts off has least area \\(2hk\\), and the sum of the intercepts is least at \\((\\sqrt h+\\sqrt k)^2\\).",
      definition:
        "- Intercept form: \\(\\frac xa+\\frac yb=1\\).\n" +
        "- Normal form: \\(x\\cos\\alpha+y\\sin\\alpha=p\\), with \\(p\\ge0\\) the distance from the origin.\n" +
        "- Through \\((h,k)\\), positive intercepts: least area \\(2hk\\); least \\(a+b=(\\sqrt h+\\sqrt k)^2\\).\n" +
        "- Two lines meet where both equations hold.\n" +
        "- A line through the centre of a rectangle halves its area.",
      formula: {
        label: "Intercept and normal forms",
        latex: "\\frac xa+\\frac yb=1,\\qquad x\\cos\\alpha+y\\sin\\alpha=p",
      },
      authoredExample: {
        prompt: "The perpendicular from the origin to a line has length 4 and makes \\(60^\\circ\\) with the positive x-axis. Find the intercepts.",
        steps: [
          "\\(x\\cos60^\\circ+y\\sin60^\\circ=4\\), i.e. \\(\\frac x2+\\frac{\\sqrt3\\,y}2=4\\).",
          "Put \\(y=0\\): \\(x=8\\). Put \\(x=0\\): \\(y=\\frac8{\\sqrt3}\\).",
        ],
        answer: "\\(8\\) and \\(\\frac8{\\sqrt3}\\).",
      },
      selfCheckExample: {
        prompt: "A line through \\((2,8)\\) meets the positive axes at \\(A\\) and \\(B\\). Find the least area of triangle \\(OAB\\).",
        steps: [
          "The least area is \\(2hk=2\\cdot2\\cdot8\\).",
          "It comes with intercepts \\(4\\) and \\(16\\): \\(\\frac24+\\frac8{16}=1\\).",
        ],
        answer: "\\(32\\).",
      },
      practiceSet: [
        { prompt: "Intercepts of \\(3x+2y=12\\)?", answer: "\\(4\\) and \\(6\\)" },
        { prompt: "The line with intercepts \\(2\\) and \\(-5\\)?", answer: "\\(5x-2y=10\\)" },
        { prompt: "Distance of \\(x\\cos30^\\circ+y\\sin30^\\circ=6\\) from the origin?", answer: "\\(6\\)" },
        { prompt: "Least \\(OA+OB\\) for a line through \\((1,4)\\)?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "b666a95f-e008-411f-85e9-80621eedb1a1", // 2026 — a line halving a rectangle, then a distance
      traps: [
        {
          title: "Normal form needs a unit normal",
          body: "\\(3x+4y=10\\) is not in normal form until you divide by \\(\\sqrt{3^2+4^2}=5\\): \\(\\frac35x+\\frac45y=2\\), so \\(p=2\\). Reading \\(p=10\\) from the raw equation is the usual slip.",
        },
      ],
    },

    // C3 — parametric form
    {
      kind: "formula" as const,
      slug: "jsl-parametric",
      name: "Distance along a line",
      intuition:
        "Every point on the line through \\((x_1,y_1)\\) at angle \\(\\theta\\) to the x-axis is \\((x_1+r\\cos\\theta,\\ y_1+r\\sin\\theta)\\), and \\(|r|\\) is its distance from \\((x_1,y_1)\\). To measure a distance in a given direction, substitute this point into the second line and solve for \\(r\\). To find the point at a given distance, put in \\(r\\).",
      definition:
        "- \\(x=x_1+r\\cos\\theta\\), \\(y=y_1+r\\sin\\theta\\).\n" +
        "- \\(|r|\\) is the distance from \\((x_1,y_1)\\); the sign of \\(r\\) gives the side.\n" +
        "- \"Measured parallel to a line\" means along that line's direction.",
      formula: {
        label: "Parametric form",
        latex: "\\frac{x-x_1}{\\cos\\theta}=\\frac{y-y_1}{\\sin\\theta}=r",
      },
      authoredExample: {
        prompt: "Find the distance of \\((1,2)\\) from \\(2x+y=10\\), measured along a line at \\(45^\\circ\\) to the x-axis.",
        steps: [
          "The point is \\(\\left(1+\\frac r{\\sqrt2},\\ 2+\\frac r{\\sqrt2}\\right)\\).",
          "Substitute: \\(4+\\frac{3r}{\\sqrt2}=10\\), so \\(r=2\\sqrt2\\).",
        ],
        answer: "\\(2\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "Find the points on the line through \\((3,1)\\) with slope \\(\\frac34\\) at distance 5 from \\((3,1)\\).",
        steps: [
          "\\(\\cos\\theta=\\frac45\\), \\(\\sin\\theta=\\frac35\\).",
          "\\(r=\\pm5\\) gives \\((3\\pm4,\\ 1\\pm3)\\).",
        ],
        answer: "\\((7,4)\\) and \\((-1,-2)\\).",
      },
      practiceSet: [
        { prompt: "The point at distance 2 from the origin along \\(\\theta=60^\\circ\\)?", answer: "\\((1,\\sqrt3)\\)" },
        { prompt: "Distance from the origin to \\(x=5\\) along \\(\\theta=60^\\circ\\)?", answer: "\\(10\\)" },
        { prompt: "\\(\\cos\\theta,\\ \\sin\\theta\\) for slope \\(\\frac5{12}\\), \\(\\theta\\) acute?", answer: "\\(\\frac{12}{13},\\ \\frac5{13}\\)" },
        { prompt: "Distance from \\((1,1)\\) to \\(y=4\\) along \\(\\theta=30^\\circ\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "a31d9535-b8b6-40d2-91f5-9dd486a65d8a", // 2026 — two lines from a point reaching a line at a given distance
      traps: [
        {
          title: "Two directions give two answers",
          body: "When only the distance is given, \\(\\theta\\) is the unknown, and the equation for it usually has two solutions: two lines from the point reach the line at that distance. The question may want both, or their sum.",
        },
      ],
    },
  ],
};
