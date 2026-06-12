import type { SubtopicNote } from "@/app/notes/_types";

export const PARABOLA_NOTE: SubtopicNote = {
  subtopicName: "Parabola — Equation, Properties, and Latus Rectum",
  title: "Parabola — Equation, Properties & Latus Rectum",
  oneLineDefinition:
    "A parabola (e = 1) is the set of points equidistant from a focus and a directrix; its standard form y² = 4ax fixes the vertex, focus, directrix, axis, and latus rectum from the single number a.",
  whyItMatters:
    "13 PYQs. Once you match the equation to one of the four standard orientations and read off a, every property — focus, directrix, latus rectum (4a), focal distance — is immediate. Sign and orientation are where the marks are won or lost.",
  concepts: [
    // standard forms (viz)
    {
      kind: "formula" as const,
      slug: "conics-parabola-standard-forms",
      name: "Standard Forms & Their Elements",
      pyqExampleId: "f74c0512-9761-43c8-be7d-a4092a690c58",
      intuition:
        "There are four standard parabolas through the origin, one opening each way. Spotting which variable is squared (and the sign) tells you the axis and the direction it opens; the coefficient gives a, and a fixes the focus and directrix.",
      definition:
        "With vertex at the origin and \\(a > 0\\):\n" +
        "- \\(y^2 = 4ax\\): opens **right**, focus \\((a,0)\\), directrix \\(x=-a\\), axis \\(y=0\\).\n" +
        "- \\(y^2 = -4ax\\): opens **left**, focus \\((-a,0)\\), directrix \\(x=a\\).\n" +
        "- \\(x^2 = 4ay\\): opens **up**, focus \\((0,a)\\), directrix \\(y=-a\\).\n" +
        "- \\(x^2 = -4ay\\): opens **down**, focus \\((0,-a)\\), directrix \\(y=a\\).\n" +
        "The squared variable names the axis; the sign of the linear term gives the direction. From a focus and directrix, the vertex is their midpoint.",
      formula: {
        label: "Standard parabola",
        latex: "y^2 = 4ax: \\ \\text{focus } (a,0), \\ \\text{directrix } x = -a",
      },
      visualizationSlug: "conics-parabola-diagram",
      authoredExample: {
        prompt: "Find the focus and directrix of \\(x^2 = -3y\\).",
        steps: [
          "Compare with \\(x^2 = -4ay\\): \\(4a = 3\\), so \\(a = \\tfrac34\\); it opens downward.",
          "Focus \\((0,-a) = \\left(0,-\\tfrac34\\right)\\); directrix \\(y = a = \\tfrac34\\).",
        ],
        answer: "Focus \\(\\left(0,-\\tfrac34\\right)\\), directrix \\(y = \\tfrac34\\).",
      },
      traps: [
        {
          title: "The sign of the linear term sets the direction",
          body:
            "\\(x^2 = -3y\\) opens DOWNWARD (negative coefficient), so the focus is below the vertex and the directrix above. Reading it as upward flips both — the most common parabola error.",
        },
        {
          title: "Directrix of \\(y^2=4ax\\) is \\(x=-a\\), on the OTHER side of the vertex",
          body:
            "The focus is at \\((a,0)\\) and the directrix is \\(x = -a\\) — the directrix sits on the opposite side of the vertex from the focus. Writing the directrix as \\(x = a\\) (the focus's coordinate) is a frequent slip.",
        },
      ],
    },

    // latus rectum (set S10, S5)
    {
      kind: "formula" as const,
      slug: "conics-parabola-latus-rectum",
      name: "The Latus Rectum",
      pyqExampleId: "ea8e6a16-b4e9-4afb-81b5-a8762fb60544",
      intuition:
        "The latus rectum is the chord through the focus perpendicular to the axis — the parabola's 'width' at the focus. Its length is exactly 4a, the same coefficient that appears in the standard form, and its endpoints determine the parabola.",
      definition:
        "For \\(y^2 = 4ax\\), the **latus rectum** is the vertical chord through the focus \\((a,0)\\), with length \\(4a\\) and endpoints \\((a, \\pm 2a)\\). Knowing the latus rectum's endpoints fixes the focus (their midpoint) and the value of \\(a\\); two parabolas can share the same latus rectum (opening in opposite directions).",
      formula: {
        label: "Length of latus rectum",
        latex: "\\text{LR} = 4a, \\quad \\text{endpoints } (a, \\pm 2a)",
      },
      authoredExample: {
        prompt: "Find the length of the latus rectum of \\(y^2 = 12x\\).",
        steps: [
          "Compare with \\(y^2 = 4ax\\): \\(4a = 12\\).",
          "The latus rectum has length \\(4a\\).",
        ],
        answer: "\\(12\\).",
      },
      traps: [
        {
          title: "Parabola latus rectum is \\(4a\\), not \\(2a\\)",
          body:
            "The full chord through the focus is \\(4a\\) long — its half-length (focus to one endpoint) is \\(2a\\). Quoting \\(2a\\) as the latus rectum halves the answer. Read \\(4a\\) straight off the coefficient: for \\(y^2 = 12x\\), \\(4a = 12\\), so the latus rectum is \\(12\\).",
        },
      ],
    },

    // focal distance
    {
      kind: "formula" as const,
      slug: "conics-parabola-focal-distance",
      name: "Focal Distance & Focal Chords",
      pyqExampleId: "ec0d14b1-6d83-4fae-a068-70ae362b1259",
      intuition:
        "The defining property says a point's distance to the focus equals its distance to the directrix — so the focal distance is just the point's coordinate plus a. This turns 'distance to focus' questions into one addition.",
      definition:
        "For a point \\((x_1, y_1)\\) on \\(y^2 = 4ax\\):\n" +
        "- **Focal distance** \\(= x_1 + a\\) (the distance to the directrix \\(x=-a\\), by the focus–directrix property).\n" +
        "- For \\(x^2 = 4ay\\), the focal distance is \\(y_1 + a\\).\n" +
        "- A **focal chord** passes through the focus; the latus rectum is the shortest focal chord.",
      formula: {
        label: "Focal distance",
        latex: "\\text{focal distance of } (x_1,y_1) \\text{ on } y^2=4ax = x_1 + a",
      },
      authoredExample: {
        prompt: "A point on \\(y^2 = 8x\\) has focal distance 6. Find its x-coordinate.",
        steps: [
          "\\(y^2 = 8x \\Rightarrow 4a = 8\\), so \\(a = 2\\).",
          "Focal distance \\(= x_1 + a = x_1 + 2 = 6\\).",
        ],
        answer: "\\(x_1 = 4\\).",
      },
      traps: [
        {
          title: "Focal distance is \\(x_1 + a\\), not \\(x_1 - a\\)",
          body:
            "By the focus–directrix property, the distance to the focus equals the distance to the directrix \\(x=-a\\), which is \\(x_1 + a\\) (you ADD \\(a\\)). Using \\(x_1 - a\\) (distance to the focus's x-coordinate) is wrong because the directrix, not the focus, sets the measurement.",
        },
      ],
    },

    // tangents & chords
    {
      kind: "formula" as const,
      slug: "conics-parabola-tangent-and-chords",
      name: "Tangents & Chords of a Parabola",
      pyqExampleId: "6a9591db-8f5c-470b-9abd-24c182abbdb5",
      intuition:
        "Tangent and chord questions reduce to substituting a line into the parabola and using the slope or the angle. A tangent of slope m to y² = 4ax has a fixed form; chords through the vertex or focus give clean intersections.",
      definition:
        "- **Tangent of slope \\(m\\)** to \\(y^2 = 4ax\\): \\(y = mx + \\dfrac{a}{m}\\) (touch point \\(\\left(\\tfrac{a}{m^2}, \\tfrac{2a}{m}\\right)\\)). A tangent inclined at angle \\(\\theta\\) has \\(m=\\tan\\theta\\).\n" +
        "- **Chord through the vertex** at angle \\(\\theta\\): substitute \\(y = x\\tan\\theta\\) to find where it meets the curve.\n" +
        "- **Two parabolas** \\(y^2=4ax\\) and \\(x^2=4ay\\) meet at \\((0,0)\\) and \\((4a,4a)\\), both on the line \\(y=x\\).",
      formula: {
        label: "Tangent of slope m",
        latex: "y = mx + \\dfrac{a}{m} \\quad (\\text{to } y^2 = 4ax)",
      },
      authoredExample: {
        prompt: "Find the equation of the tangent of slope \\(2\\) to \\(y^2 = 8x\\).",
        steps: [
          "\\(y^2 = 8x \\Rightarrow a = 2\\). Tangent of slope \\(m\\): \\(y = mx + \\dfrac{a}{m}\\).",
          "With \\(m = 2,\\ a = 2\\): \\(y = 2x + \\dfrac{2}{2}\\).",
        ],
        answer: "\\(y = 2x + 1\\).",
      },
    },
  ],
};
