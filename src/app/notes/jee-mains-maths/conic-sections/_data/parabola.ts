import type { SubtopicNote } from "@/app/notes/_types";

export const PARABOLA_NOTE: SubtopicNote = {
  subtopicName: "Parabola and Its Focal Chords",
  title: "Parabola and Its Focal Chords",
  oneLineDefinition:
    "A parabola is the set of points equally far from a focus and a directrix. This page reads its vertex, focus and latus rectum from any equation, uses the parametric point to handle chords, and uses the focal-chord rules t₁t₂ = −1 and SP = a + x.",
  whyItMatters:
    "Forty-three PYQs. Most are solved by writing points as (at², 2at) and using one relation between the parameters: −1 for a focal chord, −4 for a right angle at the vertex. Six ideas cover the page.",
  concepts: [
    // C1 — standard and shifted forms
    {
      kind: "formula" as const,
      slug: "jcon-parabola-forms",
      name: "Standard and shifted forms: vertex, focus, directrix, latus rectum",
      intuition:
        "In \\(y^2=4ax\\) the number \\(a\\) is the distance from the vertex to the focus, and everything else follows from it: the directrix is \\(a\\) behind the vertex and the latus rectum, the chord through the focus perpendicular to the axis, has length \\(4a\\). Any parabola with a horizontal or vertical axis becomes this shape after completing the square, with the vertex moved to \\((h,k)\\).",
      definition:
        "- \\(y^2=4ax\\): vertex \\((0,0)\\), focus \\((a,0)\\), directrix \\(x=-a\\), latus rectum \\(4a\\) with ends \\((a,\\pm2a)\\).\n" +
        "- \\(x^2=4ay\\): focus \\((0,a)\\), directrix \\(y=-a\\).\n" +
        "- **Shifted:** \\((y-k)^2=4a(x-h)\\) has vertex \\((h,k)\\), focus \\((h+a,k)\\), directrix \\(x=h-a\\).\n" +
        "- \\(y=px^2+qx+r\\): complete the square; \\(4a=\\frac{1}{|p|}\\).\n" +
        "- A point's distance from the focus equals its distance from the directrix.",
      formula: {
        label: "The standard parabola",
        latex: "y^2=4ax:\\quad S=(a,0),\\ \\ x=-a,\\ \\ \\text{LR}=4a",
      },
      authoredExample: {
        prompt: "Find the vertex, focus, directrix and latus rectum of \\(y^2-4y-8x+20=0\\).",
        steps: [
          "Complete the square in \\(y\\): \\((y-2)^2=8x-16=8(x-2)\\).",
          "So \\(4a=8\\), \\(a=2\\), vertex \\((2,2)\\).",
          "Focus \\((2+2,2)\\), directrix \\(x=2-2\\).",
        ],
        answer: "Vertex \\((2,2)\\), focus \\((4,2)\\), directrix \\(x=0\\), latus rectum \\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find the focus of \\(y=x^2-4x+5\\).",
        steps: [
          "\\((x-2)^2=y-1\\), so the vertex is \\((2,1)\\) and \\(4a=1\\).",
          "The axis is vertical and the parabola opens up: the focus is \\(a=\\frac14\\) above the vertex.",
        ],
        answer: "\\(\\left(2,\\frac54\\right)\\).",
      },
      practiceSet: [
        { prompt: "Latus rectum of \\(y^2=12x\\)?", answer: "\\(12\\)" },
        { prompt: "Focus of \\(x^2=-8y\\)?", answer: "\\((0,-2)\\)" },
        { prompt: "Directrix of \\((y+1)^2=4(x-3)\\)?", answer: "\\(x=2\\)" },
        { prompt: "Distance from the focus of \\(y^2=8x\\) to the point \\((8,8)\\)?", answer: "\\(10\\)", method: "Equal to its distance from \\(x=-2\\)" },
      ],
      pyqExampleId: "05da5e98-90da-41a5-ab68-b7d557891159", // 2022 — vertex (2,-1), directrix 4x - 3y = 21, latus rectum
      traps: [
        {
          title: "Shift the focus along with the vertex",
          body: "For \\((y-k)^2=4a(x-h)\\) the focus is \\((h+a,k)\\), not \\((a,0)\\). Every feature moves with the vertex.",
        },
      ],
    },

    // C2 — focus-directrix in any position
    {
      kind: "formula" as const,
      slug: "jcon-parabola-focus-directrix",
      name: "Parabolas in any position: the focus-directrix definition",
      intuition:
        "When the axis is slanted, no standard form fits. Go back to the definition: a point \\(P\\) is on the parabola exactly when its distance to the focus equals its distance to the directrix. Squaring that gives the equation directly, \\(xy\\) term and all. The geometry also gives shortcuts: the axis passes through the focus perpendicular to the directrix, and the vertex is halfway between the focus and the directrix.",
      definition:
        "- **Equation:** \\((x-\\alpha)^2+(y-\\beta)^2=\\frac{(lx+my+n)^2}{l^2+m^2}\\) for focus \\((\\alpha,\\beta)\\), directrix \\(lx+my+n=0\\).\n" +
        "- The axis is the perpendicular from the focus to the directrix.\n" +
        "- The vertex is the midpoint of the focus and the foot of that perpendicular.\n" +
        "- Latus rectum \\(=2\\times\\) (focus to directrix) \\(=4\\times\\) (vertex to directrix).",
      formula: {
        label: "Focus-directrix equation",
        latex: "(x-\\alpha)^2+(y-\\beta)^2=\\frac{(lx+my+n)^2}{l^2+m^2}",
      },
      authoredExample: {
        prompt: "Find the parabola with focus \\((1,1)\\) and directrix \\(x+y=0\\).",
        steps: [
          "\\((x-1)^2+(y-1)^2=\\frac{(x+y)^2}{2}\\).",
          "Multiply by 2: \\(2x^2+2y^2-4x-4y+4=x^2+2xy+y^2\\).",
        ],
        answer: "\\(x^2-2xy+y^2-4x-4y+4=0\\).",
      },
      selfCheckExample: {
        prompt: "A parabola has vertex \\((1,1)\\) and focus \\((2,2)\\). Find its latus rectum and directrix.",
        steps: [
          "Vertex to focus: \\(a=\\sqrt2\\), so the latus rectum is \\(4\\sqrt2\\).",
          "The directrix is perpendicular to the axis \\(y=x\\), \\(\\sqrt2\\) behind the vertex: it passes through \\((0,0)\\).",
        ],
        answer: "Latus rectum \\(4\\sqrt2\\); directrix \\(x+y=0\\).",
      },
      practiceSet: [
        { prompt: "Focus \\((0,0)\\), directrix \\(y=-2\\): vertex?", answer: "\\((0,-1)\\)" },
        { prompt: "Focus to directrix is \\(5\\). Latus rectum?", answer: "\\(10\\)" },
        { prompt: "Vertex to directrix is \\(2\\). Latus rectum?", answer: "\\(8\\)" },
        { prompt: "Axis of the parabola with focus \\((3,4)\\) and directrix \\(3x+4y=0\\)?", answer: "\\(4x-3y=0\\)", method: "Through the focus, perpendicular to the directrix" },
      ],
      pyqExampleId: "401fb811-cfe4-4814-877d-971c2fceabdf", // 2025 — axis y = x, vertex and focus at root 2 and 2 root 2 from O
      traps: [
        {
          title: "Keep the \\(\\sqrt{l^2+m^2}\\)",
          body: "The distance to the directrix is \\(\\frac{|lx+my+n|}{\\sqrt{l^2+m^2}}\\). Dropping the denominator gives a different curve.",
        },
      ],
    },

    // C3 — parametric point and right angles at the vertex
    {
      kind: "formula" as const,
      slug: "jcon-parabola-parametric",
      name: "The parametric point and chords seen from the vertex",
      intuition:
        "Every point of \\(y^2=4ax\\) is \\((at^2,2at)\\) for one number \\(t\\). A chord is then fixed by two numbers \\(t_1,t_2\\), and its slope is simply \\(\\frac{2}{t_1+t_2}\\). A chord whose ends make a right angle at the vertex satisfies \\(t_1t_2=-4\\), and all such chords pass through \\((4a,0)\\).",
      definition:
        "- **Point:** \\((at^2,\\,2at)\\).\n" +
        "- **Chord through \\(t_1,t_2\\):** slope \\(\\frac{2}{t_1+t_2}\\); equation \\(2x-(t_1+t_2)y+2at_1t_2=0\\).\n" +
        "- **Right angle at the vertex:** \\(t_1t_2=-4\\); the chord passes through \\((4a,0)\\).\n" +
        "- **Equilateral triangle with one vertex at the vertex:** the other two are symmetric about the axis; side \\(8\\sqrt3\\,a\\).",
      formula: {
        label: "Chord joining t₁ and t₂",
        latex: "2x-(t_1+t_2)y+2at_1t_2=0",
      },
      authoredExample: {
        prompt: "On \\(y^2=8x\\), find the slope of the chord joining the points with \\(t=1\\) and \\(t=-2\\).",
        steps: [
          "Slope \\(=\\frac{2}{t_1+t_2}=\\frac{2}{-1}\\).",
          "Check with the points \\((2,4)\\) and \\((8,-8)\\): \\(\\frac{-12}{6}=-2\\).",
        ],
        answer: "\\(-2\\).",
      },
      selfCheckExample: {
        prompt: "\\(P=(1,2)\\) is on \\(y^2=4x\\) and \\(\\angle POQ=90^\\circ\\) with \\(Q\\) on the parabola, \\(O\\) the vertex. Find \\(Q\\).",
        steps: [
          "\\(P\\) has \\(t_1=1\\).",
          "\\(t_1t_2=-4\\), so \\(t_2=-4\\).",
        ],
        answer: "\\(Q=(16,-8)\\).",
      },
      practiceSet: [
        { prompt: "Parametric point of \\(y^2=12x\\)?", answer: "\\((3t^2,6t)\\)" },
        { prompt: "Chords of \\(y^2=4x\\) subtending \\(90^\\circ\\) at the vertex all pass through?", answer: "\\((4,0)\\)" },
        { prompt: "Side of the equilateral triangle in \\(y^2=4x\\) with a vertex at \\(O\\)?", answer: "\\(8\\sqrt3\\)" },
        { prompt: "Slope of the chord joining \\(t=2\\) and \\(t=3\\)?", answer: "\\(\\frac25\\)" },
      ],
      pyqExampleId: "8d4bf4fd-7dd5-4cc1-b45e-c26d4f8af6fa", // 2026 — chord subtending a right angle at the vertex of y^2 = 12x
      traps: [
        {
          title: "\\(-4\\) is for the vertex, \\(-1\\) is for the focus",
          body: "A right angle at the vertex gives \\(t_1t_2=-4\\). A chord through the focus gives \\(t_1t_2=-1\\). Swapping them is the most common slip on this page.",
        },
      ],
    },

    // C4 — focal chords
    {
      kind: "formula" as const,
      slug: "jcon-focal-chord",
      name: "Focal chords and focal distances",
      intuition:
        "A chord through the focus has ends with \\(t_1t_2=-1\\). The distance from the focus to a point is its distance to the directrix, \\(a+x\\), so focal lengths need no square roots. Put together, a focal chord's length is \\(a\\left(t+\\frac1t\\right)^2\\), or \\(\\frac{4a}{\\sin^2\\theta}\\) in terms of its angle with the axis.",
      definition:
        "- **Focal chord:** \\(t_1t_2=-1\\); the other end of \\(t\\) is \\(-\\frac1t\\).\n" +
        "- **Focal distance:** \\(SP=a+x_P=a(1+t^2)\\).\n" +
        "- **Length:** \\(a\\left(t+\\frac1t\\right)^2=x_1+x_2+2a=\\frac{4a}{\\sin^2\\theta}\\).\n" +
        "- **Harmonic property:** \\(\\frac{1}{SP}+\\frac{1}{SQ}=\\frac1a\\). Also \\(SP\\cdot SQ=a\\cdot PQ\\).\n" +
        "- The latus rectum is the shortest focal chord.",
      formula: {
        label: "Focal chord at angle θ to the axis",
        latex: "t_1t_2=-1,\\qquad PQ=\\frac{4a}{\\sin^2\\theta}",
      },
      authoredExample: {
        prompt: "One end of a focal chord of \\(y^2=12x\\) is \\((12,12)\\). Find the other end and the chord's length.",
        steps: [
          "\\(a=3\\): \\((3t^2,6t)=(12,12)\\) gives \\(t=2\\).",
          "The other end has \\(t=-\\frac12\\): \\(\\left(\\frac34,-3\\right)\\).",
          "Length \\(=x_1+x_2+2a=12+\\frac34+6\\).",
        ],
        answer: "\\(\\left(\\frac34,-3\\right)\\); length \\(\\frac{75}{4}\\).",
      },
      selfCheckExample: {
        prompt: "Find the length of the focal chord of \\(y^2=8x\\) inclined at \\(45^\\circ\\) to the axis.",
        steps: [
          "\\(4a=8\\) and \\(\\sin^245^\\circ=\\frac12\\).",
        ],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "Other end of the focal chord of \\(y^2=4x\\) from \\((4,4)\\)?", answer: "\\(\\left(\\frac14,-1\\right)\\)" },
        { prompt: "Focal distance of \\((9,6)\\) on \\(y^2=4x\\)?", answer: "\\(10\\)" },
        { prompt: "\\(SP=3\\) on \\(y^2=8x\\) (\\(a=2\\)). \\(SQ\\) for the same focal chord?", answer: "\\(6\\)", method: "\\(\\frac13+\\frac{1}{SQ}=\\frac12\\)" },
        { prompt: "Shortest focal chord of \\(y^2=20x\\)?", answer: "\\(20\\) (the latus rectum)" },
      ],
      pyqExampleId: "619d2ad1-9f50-415b-b53e-8835e7bf258a", // 2025 — focus divides the focal chord from (1,-4) as m:n
      traps: [
        {
          title: "\\(\\theta\\) is the angle with the AXIS",
          body: "\\(\\frac{4a}{\\sin^2\\theta}\\) uses the chord's angle with the parabola's axis. For \\(x^2=4ay\\) the axis is vertical, so measure from the \\(y\\)-axis.",
        },
      ],
    },

    // C5 — chords by midpoint
    {
      kind: "formula" as const,
      slug: "jcon-parabola-chord-midpoint",
      name: "Chords of a parabola by their midpoint, and where a line meets it",
      intuition:
        "For \\(y^2=4ax\\), subtracting the equations at the two ends gives \\((y_1-y_2)(y_1+y_2)=4a(x_1-x_2)\\), so a chord's slope is \\(\\frac{4a}{y_1+y_2}=\\frac{2a}{k}\\) where \\(k\\) is the midpoint's \\(y\\). The whole chord is \\(T=S_1\\). When a line meets the parabola, substitute and use the sum and product of the roots, not the roots themselves.",
      definition:
        "- **Slope of the chord with midpoint \\((h,k)\\):** \\(\\frac{2a}{k}\\).\n" +
        "- **Chord with midpoint \\((h,k)\\):** \\(T=S_1\\), i.e. \\(ky-2a(x+h)=k^2-4ah\\).\n" +
        "- **A line meets the parabola:** substitute, then use Vieta for the sum and product of the \\(y\\)'s (or \\(x\\)'s).\n" +
        "- Chord length along a line of slope \\(m\\): \\(\\sqrt{1+m^2}\\,|x_1-x_2|\\).",
      formula: {
        label: "Slope of a chord of y² = 4ax with midpoint (h, k)",
        latex: "m=\\frac{2a}{k}",
      },
      authoredExample: {
        prompt: "Find the chord of \\(y^2=12x\\) whose midpoint is \\((3,2)\\).",
        steps: [
          "\\(a=3\\), so the slope is \\(\\frac{2\\cdot3}{2}=3\\).",
          "Through \\((3,2)\\): \\(y-2=3(x-3)\\).",
        ],
        answer: "\\(y=3x-7\\).",
      },
      selfCheckExample: {
        prompt: "Find the chord of \\(y^2=4x\\) bisected at \\((2,1)\\).",
        steps: [
          "\\(a=1\\): slope \\(\\frac{2}{1}=2\\).",
          "Through \\((2,1)\\): \\(y-1=2(x-2)\\).",
        ],
        answer: "\\(y=2x-3\\).",
      },
      practiceSet: [
        { prompt: "Slope of the chord of \\(y^2=8x\\) with midpoint \\((5,4)\\)?", answer: "\\(1\\)" },
        { prompt: "Sum of the \\(y\\)'s where \\(y=x-1\\) meets \\(y^2=4x\\)?", answer: "\\(4\\)", method: "\\(y^2-4y-4=0\\)" },
        { prompt: "Midpoint's \\(y\\) for chords of \\(y^2=4x\\) with slope \\(2\\)?", answer: "\\(1\\)", method: "\\(\\frac{2a}{k}=2\\)" },
        { prompt: "Chord of \\(x^2=4y\\) bisected at \\((2,3)\\)?", answer: "\\(y=x+1\\)", method: "Slope \\(\\frac{h}{2a}=1\\)" },
      ],
      pyqExampleId: "adaf8e4c-457d-44bf-9750-2882d3d0df42", // 2024 — chord of x^2 = 8y with midpoint (1, 5/4)
      traps: [
        {
          title: "Use the MIDPOINT's ordinate",
          body: "The slope \\(\\frac{2a}{k}\\) uses the \\(y\\)-coordinate of the midpoint. Plugging in an end's \\(y\\) gives the tangent's slope at that end instead.",
        },
      ],
    },

    // C6 — loci
    {
      kind: "formula" as const,
      slug: "jcon-parabola-loci",
      name: "Loci from a moving point on a parabola",
      intuition:
        "Write the moving point as \\((at^2,2at)\\), express the new point in terms of \\(t\\), then remove \\(t\\). Because \\(x\\) depends on \\(t^2\\) and \\(y\\) on \\(t\\), midpoints and centroids built this way usually give another parabola, with its own vertex and latus rectum to read off.",
      definition:
        "- Put \\(P=(at^2,2at)\\).\n" +
        "- Write the locus point \\((h,k)\\) in terms of \\(t\\).\n" +
        "- Solve for \\(t\\) from the simpler coordinate (usually \\(k\\)) and substitute in the other.\n" +
        "- Rename \\(h,k\\) as \\(x,y\\); read the vertex and latus rectum of the new curve if asked.",
      formula: {
        label: "Parametric point to eliminate",
        latex: "P=(at^2,\\,2at)",
      },
      authoredExample: {
        prompt: "Find the locus of the midpoint of the segment joining the vertex of \\(y^2=8x\\) to a point of the parabola.",
        steps: [
          "\\(P=(2t^2,4t)\\), so the midpoint is \\((t^2,2t)\\).",
          "\\(t=\\frac{y}{2}\\) and \\(x=t^2\\).",
        ],
        answer: "\\(y^2=4x\\).",
      },
      selfCheckExample: {
        prompt: "\\(O\\) is the vertex and \\(S\\) the focus of \\(y^2=4x\\), and \\(P\\) moves on it. Find the locus of the centroid of \\(\\triangle OSP\\).",
        steps: [
          "\\(S=(1,0)\\), \\(P=(t^2,2t)\\): centroid \\(\\left(\\frac{1+t^2}{3},\\frac{2t}{3}\\right)\\).",
          "\\(t=\\frac{3y}{2}\\), so \\(3x=1+\\frac{9y^2}{4}\\).",
        ],
        answer: "\\(9y^2=12x-4\\).",
      },
      practiceSet: [
        { prompt: "Locus of \\((t^2,t)\\)?", answer: "\\(y^2=x\\)" },
        { prompt: "Latus rectum of the locus \\(y^2=2x\\)?", answer: "\\(2\\)" },
        { prompt: "Locus of the midpoint of the focus of \\(y^2=4x\\) and a point on it?", answer: "\\(y^2=2x-1\\)" },
        { prompt: "Vertex of \\(y^2=2(x-4)\\)?", answer: "\\((4,0)\\)" },
      ],
      pyqExampleId: "b38d5e27-47f5-442c-8a2c-603f739beed2", // 2021 — midpoint of the focus and a moving point: directrix of the locus
      traps: [
        {
          title: "Read the NEW curve's features",
          body: "After finding the locus, questions ask for its latus rectum or directrix. Rewrite it in standard form first; the original parabola's \\(a\\) no longer applies.",
        },
      ],
    },
  ],
};
