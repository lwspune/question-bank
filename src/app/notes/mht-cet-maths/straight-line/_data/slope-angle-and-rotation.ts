import type { SubtopicNote } from "@/app/notes/_types";

export const SLOPE_ANGLE_AND_ROTATION_NOTE: SubtopicNote = {
  subtopicName: "Slope, Angle Between Lines and Rotation",
  title: "Slope, Angle Between Lines and Rotation",
  oneLineDefinition:
    "Slope is tan of the inclination; tan θ = |(m₁ − m₂)/(1 + m₁m₂)| gives the angle between two lines, and the same formula, solved for m, gives the lines through a point at a given angle, the rotated line, the angle bisector and the reflected line.",
  whyItMatters:
    "15 PYQs at 33% HARD — the chapter's largest page and the only one with HARD questions. The recurring stems are a perpendicular-slope condition, an acute angle between two lines (once between the diagonals of a parallelogram), lines through a point at 45° or 60° to a given line, a line rotated about a point by 15° or 45°, and the bisector of angle PQR set in two consecutive years. " +
    "All five HARD questions are the angle formula run backwards — solve for the unknown slope — and the wrong answer is always the second root.",
  concepts: [
    // 1 — slope, inclination, parallel, perpendicular
    {
      kind: "formula" as const,
      slug: "cetsl-slope-inclination-parallel-perpendicular",
      name: "Slope and Inclination: Parallel Means m₁ = m₂, Perpendicular Means m₁m₂ = −1",
      intuition:
        "The slope \\(m = \\tan\\theta\\) is rise over run; two points give it as \\(\\dfrac{y_2 - y_1}{x_2 - x_1}\\), and \\(ax + by + c = 0\\) gives \\(-\\dfrac{a}{b}\\). Parallel lines share a slope; perpendicular slopes multiply to \\(-1\\).",
      definition:
        "- \\(2x - 3y + 17 = 0\\) has slope \\(\\dfrac23\\); the line through \\((7, 17)\\) and \\((15, \\beta)\\) has slope \\(\\dfrac{\\beta - 17}{8}\\). Perpendicular: \\(\\dfrac23 \\cdot \\dfrac{\\beta - 17}{8} = -1 \\Rightarrow \\beta = 5\\).\n" +
        "- Inclination is measured anticlockwise from the positive \\(x\\)-axis in \\([0, \\pi)\\): slope \\(-1\\) means \\(\\theta = \\dfrac{3\\pi}{4}\\), not \\(-\\dfrac{\\pi}{4}\\). The line through \\((-3, 6)\\) and the midpoint \\((1, 2)\\) of \\((4, -5)\\), \\((-2, 9)\\) has slope \\(-1\\), inclination \\(\\dfrac{3\\pi}{4}\\).\n" +
        "- A point \\((h, k)\\) on \\(l_1\\) through \\((1, 2)\\), \\((-3, 4)\\) (slope \\(-\\tfrac12\\), \\(x + 2y = 5\\)) such that the line to \\((4, 3)\\) is perpendicular (slope \\(2\\), \\(2x - y = 5\\)): solve, \\((3, 1)\\), \\(\\dfrac{k}{h} = \\dfrac13\\).\n" +
        "- A vertical line has no slope; a horizontal one has slope \\(0\\). Treat them separately in every formula below.",
      formula: {
        label: "Slope",
        latex:
          "m = \\tan\\theta = \\frac{y_2 - y_1}{x_2 - x_1} = -\\frac{a}{b} \\qquad \\text{parallel: } m_1 = m_2 \\qquad \\text{perpendicular: } m_1 m_2 = -1",
      },
      authoredExample: {
        prompt: "The line \\(3x + 4y = 12\\) is perpendicular to the line through \\((1, 2)\\) and \\((4, k)\\). Find \\(k\\).",
        steps: [
          "Slope of the first: \\(-\\dfrac34\\); perpendicular slope \\(\\dfrac43\\).",
          "\\(\\dfrac{k - 2}{3} = \\dfrac43 \\Rightarrow k = 6\\).",
        ],
        answer: "\\(k = 6\\)",
      },
      selfCheckExample: {
        prompt: "Find the inclination of the line through \\((2, 5)\\) and the midpoint of \\((6, 1)\\) and \\((-2, 3)\\).",
        steps: [
          "Midpoint \\((2, 2)\\); the line through \\((2, 5)\\) and \\((2, 2)\\) is vertical.",
        ],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "Slope of \\(5x - 2y = 3\\)?",
          answer: "\\(\\dfrac52\\)",
        },
        {
          prompt: "Slope perpendicular to \\(\\dfrac23\\)?",
          answer: "\\(-\\dfrac32\\)",
        },
        {
          prompt: "Inclination of slope \\(-\\sqrt3\\)?",
          answer: "\\(\\dfrac{2\\pi}{3}\\)",
        },
        {
          prompt: "Slope through \\((1, 1)\\) and \\((4, 7)\\)?",
          answer: "\\(2\\)",
        },
      ],
      pyqExampleId: "0ee2ef93-81a6-4a9f-8977-6922999bb372",
      traps: [
        {
          title: "Reading a negative slope as a negative angle",
          body:
            "Inclination lives in \\([0, \\pi)\\). Slope \\(-1\\) is \\(\\dfrac{3\\pi}{4}\\); option \\(\\dfrac{\\pi}{4}\\) is the sign-blind answer.",
        },
      ],
    },

    // 2 — angle between two lines
    {
      kind: "formula" as const,
      slug: "cetsl-angle-between-two-lines",
      name: "Angle Between Two Lines: tan θ = |(m₁ − m₂)/(1 + m₁m₂)|",
      intuition:
        "The angle between two lines is the difference of their inclinations, and \\(\\tan(\\theta_1 - \\theta_2)\\) expands to the formula. The modulus picks the acute angle; if one line is vertical, the angle with a line of slope \\(m\\) has \\(\\tan\\theta = \\left|\\dfrac{1}{m}\\right|\\).",
      definition:
        "- \\(4x - 2y + 13 = 0\\) (slope \\(2\\)) and the equal-intercept line \\(x + y = a\\) (slope \\(-1\\)): \\(\\tan\\theta = \\left|\\dfrac{-1 - 2}{1 - 2}\\right| = 3\\), \\(\\theta = \\tan^{-1}3\\).\n" +
        "- Normal-form lines \\(x\\cos\\alpha + y\\sin\\alpha = p\\) have slope \\(-\\cot\\alpha\\), i.e. inclination \\(\\alpha + 90^\\circ\\); the angle between \\(\\alpha = 30^\\circ\\) and \\(\\alpha = 60^\\circ\\) is simply \\(30^\\circ\\).\n" +
        "- Diagonals of the parallelogram \\(A(2,-1)\\), \\(B(0,2)\\), \\(C(2,3)\\), \\(D(4,0)\\): \\(AC\\) is vertical, \\(BD\\) has slope \\(-\\tfrac12\\); \\(\\tan\\theta = 2\\), \\(\\theta = \\tan^{-1}2\\).\n" +
        "- Parallel lines give \\(\\tan\\theta = 0\\); perpendicular ones make the denominator \\(0\\) (\\(\\theta = 90^\\circ\\)).",
      formula: {
        label: "Angle between lines",
        latex:
          "\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| \\qquad \\text{one line vertical: } \\tan\\theta = \\left|\\frac{1}{m}\\right|",
      },
      visualizationSlug: "lines-angle-between-diagram",
      authoredExample: {
        prompt: "Find the acute angle between \\(y = 3x + 1\\) and \\(y = \\dfrac{x}{2} - 4\\).",
        steps: [
          "\\(\\tan\\theta = \\left|\\dfrac{3 - \\frac12}{1 + \\frac32}\\right| = \\left|\\dfrac{5/2}{5/2}\\right| = 1\\).",
        ],
        answer: "\\(45^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "Find the acute angle between the lines \\(x\\cos 20^\\circ + y\\sin 20^\\circ = 2\\) and \\(x\\cos 80^\\circ + y\\sin 80^\\circ = 7\\).",
        steps: [
          "Normal-form lines with normals at \\(20^\\circ\\) and \\(80^\\circ\\) meet at the angle between the normals.",
        ],
        answer: "\\(60^\\circ\\)",
      },
      practiceSet: [
        {
          prompt: "Angle between slopes \\(1\\) and \\(0\\)?",
          answer: "\\(45^\\circ\\)",
        },
        {
          prompt: "Angle between slopes \\(\\sqrt3\\) and \\(\\dfrac{1}{\\sqrt3}\\)?",
          answer: "\\(30^\\circ\\)",
        },
        {
          prompt: "Angle between \\(x = 2\\) and \\(y = 2x\\)?",
          answer: "\\(\\tan^{-1}\\dfrac12\\)",
        },
        {
          prompt: "Slope of \\(x\\cos\\alpha + y\\sin\\alpha = p\\)?",
          answer: "\\(-\\cot\\alpha\\)",
        },
      ],
      pyqExampleId: "0e5a6ff3-a2ee-4a7d-bcc9-e4fcc9ae955a",
      traps: [
        {
          title: "Dropping the modulus and reporting the obtuse angle",
          body:
            "\\(\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\) can come out negative; the acute angle uses its absolute value. \\(\\tan^{-1}(-3)\\) is not an option, but \\(\\tan^{-1}\\frac13\\) — the reciprocal slip — is.",
        },
      ],
    },

    // 3 — lines through a point at a given angle
    {
      kind: "formula" as const,
      slug: "cetsl-lines-through-a-point-at-a-given-angle",
      name: "Lines Through a Point at a Given Angle: Solve the Angle Formula for m",
      intuition:
        "Fix \\(m_1\\) and \\(\\tan\\theta\\), and the angle formula becomes a quadratic in the unknown slope \\(m\\) with two roots — one on each side of the given line. Each root with the point gives a line; a root may be \\(0\\) (horizontal) or the quadratic may drop to linear, meaning the second line is vertical.",
      definition:
        "- Through \\((3, 2)\\) at \\(45^\\circ\\) to \\(x - 2y - 3 = 0\\) (\\(m_1 = \\tfrac12\\)): \\(\\left|\\dfrac{m - \\frac12}{1 + \\frac{m}{2}}\\right| = 1 \\Rightarrow m = 3\\) or \\(-\\tfrac13\\). Lines \\(3x - y - 7 = 0\\) and \\(x + 3y - 9 = 0\\).\n" +
        "- Through \\((3, -2)\\) at \\(60^\\circ\\) to \\(\\sqrt3 x + y = 1\\) (\\(m_1 = -\\sqrt3\\), inclination \\(120^\\circ\\)): inclinations \\(60^\\circ\\) and \\(180^\\circ\\), slopes \\(\\sqrt3\\) and \\(0\\). The horizontal one \\(y = -2\\) never meets the \\(x\\)-axis, so the required line is \\(y - \\sqrt3 x + 2 + 3\\sqrt3 = 0\\).\n" +
        "- Thinking in inclinations is faster than the quadratic: the two lines have inclinations \\(\\theta_1 \\pm \\alpha\\).\n" +
        "- Check any extra condition in the stem (meets the \\(x\\)-axis; passes through a quadrant) — it is there to kill one of the two roots.",
      formula: {
        label: "Two slopes",
        latex:
          "\\left|\\frac{m - m_1}{1 + m m_1}\\right| = \\tan\\alpha \\ \\Rightarrow\\ m = \\frac{m_1 \\pm \\tan\\alpha}{1 \\mp m_1\\tan\\alpha} \\quad(\\text{inclinations } \\theta_1 \\pm \\alpha)",
      },
      authoredExample: {
        prompt: "Find the lines through \\((1, 1)\\) making \\(45^\\circ\\) with \\(y = 2x\\).",
        steps: [
          "\\(m_1 = 2\\): \\(m = \\dfrac{2 \\pm 1}{1 \\mp 2}\\), i.e. \\(m = -3\\) or \\(m = \\dfrac13\\).",
          "\\(y - 1 = -3(x - 1) \\Rightarrow 3x + y - 4 = 0\\); \\(y - 1 = \\dfrac13(x - 1) \\Rightarrow x - 3y + 2 = 0\\).",
        ],
        answer: "\\(3x + y - 4 = 0\\) and \\(x - 3y + 2 = 0\\)",
      },
      selfCheckExample: {
        prompt: "A line through \\((2, 3)\\) makes \\(30^\\circ\\) with \\(y = \\sqrt3 x + 5\\) and has positive slope. Find its equation.",
        steps: [
          "Inclination of the given line \\(60^\\circ\\); candidates \\(30^\\circ\\) and \\(90^\\circ\\). Positive slope: \\(\\tan 30^\\circ = \\dfrac{1}{\\sqrt3}\\).",
          "\\(y - 3 = \\dfrac{1}{\\sqrt3}(x - 2) \\Rightarrow x - \\sqrt3 y + 3\\sqrt3 - 2 = 0\\).",
        ],
        answer: "\\(x - \\sqrt3 y + 3\\sqrt3 - 2 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Inclinations at \\(45^\\circ\\) to a line of inclination \\(60^\\circ\\)?",
          answer: "\\(105^\\circ\\) and \\(15^\\circ\\)",
        },
        {
          prompt: "Slopes at \\(45^\\circ\\) to slope \\(\\dfrac12\\)?",
          answer: "\\(3\\) and \\(-\\dfrac13\\)",
        },
        {
          prompt: "Slopes at \\(60^\\circ\\) to slope \\(-\\sqrt3\\)?",
          answer: "\\(\\sqrt3\\) and \\(0\\)",
        },
        {
          prompt: "Does \\(y = -2\\) meet the \\(x\\)-axis?",
          answer: "No.",
        },
      ],
      pyqExampleId: "cc2a562b-1b75-4381-af1a-1f7b4cebdc28",
      traps: [
        {
          title: "Keeping only one root",
          body:
            "The angle condition always yields TWO lines. Option lists pair the right line with a wrong partner (a sign flipped in the second equation); check both.",
        },
      ],
    },

    // 4 — rotation about a point
    {
      kind: "formula" as const,
      slug: "cetsl-rotation-about-a-point",
      name: "Rotating a Line About a Point: Add or Subtract the Angle From the Inclination",
      intuition:
        "Rotation about a point on the line keeps that point and changes the inclination by the rotation angle — anticlockwise adds, clockwise subtracts. The new slope is \\(\\tan\\) of the new inclination, and the line is written through the fixed point.",
      definition:
        "- \\(AB\\) through \\(A(2, 0)\\), \\(B(3, 1)\\) has inclination \\(45^\\circ\\); rotated anticlockwise by \\(15^\\circ\\) it is at \\(60^\\circ\\): \\(y = \\sqrt3(x - 2)\\).\n" +
        "- A line through \\(A(2, 0)\\) at \\(30^\\circ\\) rotated CLOCKWISE by \\(15^\\circ\\) is at \\(15^\\circ\\): \\(y = (2 - \\sqrt3)(x - 2)\\), i.e. \\((2 - \\sqrt3)x - y - 4 + 2\\sqrt3 = 0\\).\n" +
        "- \\(x - y - 2 = 0\\) meets the \\(x\\)-axis at \\(M(2, 0)\\) with inclination \\(45^\\circ\\); rotated anticlockwise by \\(45^\\circ\\) it is vertical: \\(x = 2\\).\n" +
        "- \\(\\tan 15^\\circ = 2 - \\sqrt3\\), \\(\\tan 75^\\circ = 2 + \\sqrt3\\); \\(90^\\circ\\) means a vertical line, not an infinite slope to substitute.",
      formula: {
        label: "Rotation",
        latex:
          "\\theta_{\\text{new}} = \\theta \\pm \\alpha \\ (+\\text{ anticlockwise}),\\qquad y - y_0 = \\tan\\theta_{\\text{new}}\\,(x - x_0)",
      },
      authoredExample: {
        prompt: "The line through \\(P(1, 2)\\) with inclination \\(60^\\circ\\) is rotated clockwise about \\(P\\) through \\(30^\\circ\\). Find the new line.",
        steps: [
          "New inclination \\(30^\\circ\\), slope \\(\\dfrac{1}{\\sqrt3}\\).",
          "\\(y - 2 = \\dfrac{1}{\\sqrt3}(x - 1) \\Rightarrow x - \\sqrt3 y + 2\\sqrt3 - 1 = 0\\).",
        ],
        answer: "\\(x - \\sqrt3 y + 2\\sqrt3 - 1 = 0\\)",
      },
      selfCheckExample: {
        prompt: "The line \\(y = x + 3\\) is rotated anticlockwise about its \\(y\\)-intercept through \\(45^\\circ\\). Find the new line.",
        steps: [
          "Fixed point \\((0, 3)\\); inclination \\(45^\\circ + 45^\\circ = 90^\\circ\\): vertical through \\((0, 3)\\).",
        ],
        answer: "\\(x = 0\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\tan 15^\\circ = ?\\)",
          answer: "\\(2 - \\sqrt3\\)",
        },
        {
          prompt: "Inclination \\(30^\\circ\\), clockwise \\(15^\\circ\\): new inclination?",
          answer: "\\(15^\\circ\\)",
        },
        {
          prompt: "Inclination \\(45^\\circ\\), anticlockwise \\(45^\\circ\\): new line through \\((2, 0)\\)?",
          answer: "\\(x = 2\\)",
        },
        {
          prompt: "\\(x\\)-intercept of \\(x - y - 2 = 0\\)?",
          answer: "\\(2\\)",
        },
      ],
      pyqExampleId: "267191e3-222b-4f8c-b44c-c10e58a3d9e6",
      traps: [
        {
          title: "Rotating the wrong way",
          body:
            "Clockwise subtracts. \\(30^\\circ - 15^\\circ = 15^\\circ\\) gives slope \\(2 - \\sqrt3\\); adding gives \\(45^\\circ\\) and a line that is on the list as a distractor.",
        },
      ],
    },

    // 5 — bisector and reflection
    {
      kind: "formula" as const,
      slug: "cetsl-angle-bisector-and-reflection-of-a-line",
      name: "Bisector of an Angle at a Vertex, and the Reflection of a Line",
      intuition:
        "At a vertex \\(Q\\), the bisector of \\(\\angle PQR\\) points along the average of the directions \\(QP\\) and \\(QR\\). Reflecting a line in another keeps the angle between them, so the reflected slope is the second root of the angle formula — the same trick as the equal-distance stem.",
      definition:
        "- \\(P(-5, 0)\\), \\(Q(0, 0)\\), \\(R(2, 2\\sqrt3)\\): \\(QP\\) points at \\(180^\\circ\\), \\(QR\\) at \\(60^\\circ\\); the bisector is at \\(120^\\circ\\), slope \\(-\\sqrt3\\): \\(\\sqrt3 x + y = 0\\). The 2024 twin with \\(R(3, 3\\sqrt3)\\) is the same picture.\n" +
        "- \\(A(2, -7)\\); \\(AB\\) is \\(4x + y = 1\\) (slope \\(-4\\)), \\(BC\\) is \\(3x - 4y + 1 = 0\\) (slope \\(\\tfrac34\\)); \\(AB = AC\\) means \\(AC\\) is the reflection of \\(AB\\) in the perpendicular from \\(A\\) to \\(BC\\), equivalently the other line through \\(A\\) making the same angle with \\(BC\\): \\(\\dfrac{m - \\frac34}{1 + \\frac{3m}{4}} = -\\dfrac{19}{8} \\Rightarrow m = -\\dfrac{52}{89}\\); \\(52x + 89y + 519 = 0\\).\n" +
        "- Distances from \\((2, 5)\\) to \\(3x + y + 4 = 0\\) measured along two lines are equal iff the two lines make equal angles with it: slope \\(\\tfrac34\\) makes \\(\\tan\\theta = 3\\); the other slope with \\(\\tan\\theta = 3\\) is \\(m = 0\\).\n" +
        "- Bisector direction as an average works only with directions measured at the vertex; compute both direction angles from \\(Q\\), not the lines' inclinations.",
      formula: {
        label: "Bisector direction",
        latex:
          "\\theta_{\\text{bisector}} = \\frac{\\theta_{QP} + \\theta_{QR}}{2} \\qquad \\text{reflected slope: the other root of } \\left|\\frac{m - m_L}{1 + m m_L}\\right| = \\tan\\theta",
      },
      authoredExample: {
        prompt: "Find the bisector of \\(\\angle AOB\\) where \\(O\\) is the origin, \\(A(4, 0)\\) and \\(B(0, 4)\\).",
        steps: [
          "\\(OA\\) at \\(0^\\circ\\), \\(OB\\) at \\(90^\\circ\\); bisector at \\(45^\\circ\\).",
        ],
        answer: "\\(y = x\\)",
      },
      selfCheckExample: {
        prompt: "Through \\((0, 0)\\), the line \\(y = 2x\\) makes some angle with \\(y = x\\). Find the other line through the origin making the same angle with \\(y = x\\).",
        steps: [
          "Reflect slope \\(2\\) in \\(y = x\\): the reflection of \\(y = mx\\) in \\(y = x\\) is \\(y = \\dfrac{x}{m}\\).",
        ],
        answer: "\\(y = \\dfrac{x}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "Bisector of the angle between directions \\(180^\\circ\\) and \\(60^\\circ\\) at the origin?",
          answer: "Direction \\(120^\\circ\\): \\(\\sqrt3 x + y = 0\\).",
        },
        {
          prompt: "Reflection of \\(y = 3x\\) in \\(y = x\\)?",
          answer: "\\(y = \\dfrac{x}{3}\\)",
        },
        {
          prompt: "\\(\\tan 120^\\circ = ?\\)",
          answer: "\\(-\\sqrt3\\)",
        },
        {
          prompt: "Two lines through a point at equal angles to a third: how many?",
          answer: "Two (symmetric about the third).",
        },
      ],
      pyqExampleId: "dffab745-499e-4bc4-bdc1-7529a0eea6c8",
      traps: [
        {
          title: "Bisecting the inclinations instead of the directions",
          body:
            "\\(QP\\) has inclination \\(0^\\circ\\) as a line but direction \\(180^\\circ\\) from \\(Q\\). Averaging \\(0^\\circ\\) and \\(60^\\circ\\) gives \\(30^\\circ\\) — the bisector of the OTHER angle at \\(Q\\), and its equation is offered.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Forms of a Line — writing the line once the slope is known",
      href: "/notes/mht-cet-maths/straight-line/cetsl-forms-intersections-and-concurrency",
    },
    {
      label: "Pair of Straight Lines — the same angle formula for a joint equation",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-angle-between-the-pair",
    },
  ],
};
