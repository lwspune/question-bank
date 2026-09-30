import type { SubtopicNote } from "@/app/notes/_types";

export const DISTANCE_SL_NOTE: SubtopicNote = {
  subtopicName: "Distance from a Line and Parallel Lines",
  title: "Distance from a Line and Parallel Lines",
  oneLineDefinition:
    "The perpendicular distance from a point to a line, the distance between parallel lines, and the sign of ax + by + c that tells which side of a line a point is on.",
  whyItMatters:
    "Thirteen PYQs, twelve of them multiple choice, and three from 2026. Six use the distance from a point to a line, five of them for an equilateral triangle with one side on a given line. Four use parallel lines: an equilateral triangle with vertices on two of them, sides shifted inwards, or the points at a fixed distance from a line. Three decide which side of a line a point is on. Three ideas cover the page.",
  concepts: [
    // C1 — perpendicular distance
    {
      kind: "formula" as const,
      slug: "jsl-perp-distance",
      name: "Distance from a point to a line",
      intuition:
        "The distance from \\((x_1,y_1)\\) to \\(ax+by+c=0\\) is \\(\\frac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}\\). The foot of the perpendicular is the point moved back along the normal \\((a,b)\\). In an equilateral triangle with one side on a line, that distance is the height \\(h\\): the side is \\(\\frac{2h}{\\sqrt3}\\), and the centroid, orthocentre and circumcentre all sit a third of the way up from the foot.",
      definition:
        "- Distance: \\(d=\\frac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}\\).\n" +
        "- Foot: \\(\\frac{x-x_1}a=\\frac{y-y_1}b=-\\frac{ax_1+by_1+c}{a^2+b^2}\\).\n" +
        "- Equilateral triangle of height \\(h\\): side \\(\\frac{2h}{\\sqrt3}\\), area \\(\\frac{h^2}{\\sqrt3}\\).\n" +
        "- Its centre is \\(\\frac h3\\) above the base: \\(r=\\frac h3\\), \\(R=\\frac{2h}3\\).",
      formula: {
        label: "Perpendicular distance",
        latex: "d=\\frac{|ax_1+by_1+c|}{\\sqrt{a^2+b^2}}",
      },
      authoredExample: {
        prompt: "Find the distance of \\((2,-1)\\) from \\(3x-4y+5=0\\), and the foot of the perpendicular.",
        steps: [
          "\\(3(2)-4(-1)+5=15\\) and \\(\\sqrt{9+16}=5\\), so \\(d=3\\).",
          "Foot: \\((2,-1)-\\frac{15}{25}(3,-4)=\\left(\\frac15,\\frac75\\right)\\).",
        ],
        answer: "Distance 3, foot \\(\\left(\\frac15,\\frac75\\right)\\).",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has a vertex at the origin and the opposite side on \\(3x+4y=15\\). Find its area.",
        steps: [
          "Height \\(h=\\frac{15}{5}=3\\).",
          "Area \\(=\\frac{h^2}{\\sqrt3}=\\frac9{\\sqrt3}\\).",
        ],
        answer: "\\(3\\sqrt3\\).",
      },
      practiceSet: [
        { prompt: "Distance of the origin from \\(5x+12y=26\\)?", answer: "\\(2\\)" },
        { prompt: "Distance of \\((1,1)\\) from \\(x+y=4\\)?", answer: "\\(\\sqrt2\\)" },
        { prompt: "Side of an equilateral triangle of height \\(3\\sqrt3\\)?", answer: "\\(6\\)" },
        { prompt: "Inradius of an equilateral triangle of height 6?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "e48054e4-9ed5-45d7-b606-e117a11f8ae8", // 2026 — equilateral triangle with a side on a line, its orthocentre
      traps: [
        {
          title: "Write the line as ax + by + c = 0 first",
          body: "The denominator is \\(\\sqrt{a^2+b^2}\\) of the rearranged equation. For \\(y=2x+3\\), that is \\(2x-y+3=0\\), so the denominator is \\(\\sqrt5\\), not \\(3\\).",
        },
      ],
    },

    // C2 — parallel lines
    {
      kind: "formula" as const,
      slug: "jsl-parallel",
      name: "Parallel lines",
      intuition:
        "Parallel lines differ only in the constant: \\(ax+by+c_1=0\\) and \\(ax+by+c_2=0\\) are \\(\\frac{|c_1-c_2|}{\\sqrt{a^2+b^2}}\\) apart, once both have the same \\(a\\) and \\(b\\). A line shifted by \\(d\\) is \\(ax+by+c\\pm d\\sqrt{a^2+b^2}=0\\); the sign picks the side. The points at a fixed distance from a line lie on the two parallel lines at that distance, so a fixed area on a fixed base gives two parallel lines.",
      definition:
        "- Distance: \\(\\frac{|c_1-c_2|}{\\sqrt{a^2+b^2}}\\), with equal \\(a\\) and \\(b\\).\n" +
        "- Parallel line through \\((x_1,y_1)\\): \\(a(x-x_1)+b(y-y_1)=0\\).\n" +
        "- Shift by \\(d\\): \\(ax+by+c\\pm d\\sqrt{a^2+b^2}=0\\).\n" +
        "- Equilateral triangle with one vertex between two parallel lines, at distances \\(p\\) and \\(q\\) from them, and the other two vertices on the lines: side\\(^2=\\frac43(p^2+pq+q^2)\\).",
      formula: {
        label: "Distance between parallel lines",
        latex: "d=\\frac{|c_1-c_2|}{\\sqrt{a^2+b^2}}",
      },
      authoredExample: {
        prompt: "Find the distance between \\(3x+4y=2\\) and \\(6x+8y+11=0\\).",
        steps: [
          "Write the first as \\(6x+8y-4=0\\).",
          "\\(d=\\frac{|-4-11|}{\\sqrt{36+64}}=\\frac{15}{10}\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      selfCheckExample: {
        prompt: "Find the lines parallel to \\(x+2y=3\\) at distance \\(\\sqrt5\\) from it.",
        steps: [
          "Shift: \\(x+2y-3\\pm\\sqrt5\\cdot\\sqrt5=0\\).",
        ],
        answer: "\\(x+2y+2=0\\) and \\(x+2y-8=0\\).",
      },
      practiceSet: [
        { prompt: "Distance between \\(x+y=1\\) and \\(x+y=5\\)?", answer: "\\(2\\sqrt2\\)" },
        { prompt: "The line through \\((1,2)\\) parallel to \\(3x-y=7\\)?", answer: "\\(3x-y=1\\)" },
        { prompt: "Distance between \\(2x-y=4\\) and \\(4x-2y=3\\)?", answer: "\\(\\frac{\\sqrt5}2\\)" },
        { prompt: "Equilateral triangle: one vertex midway between two lines 2 apart, the others on the lines. Side?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "d3a8b5b1-9a46-41ca-903d-abf02c3216f7", // 2026 — equilateral triangle with vertices on two parallel lines
      traps: [
        {
          title: "Match the coefficients first",
          body: "\\(x+2y+1=0\\) and \\(2x+4y+7=0\\) are parallel, but the formula needs equal \\(a\\) and \\(b\\). Doubling the first gives \\(\\frac{|2-7|}{\\sqrt{20}}\\), not \\(\\frac{|1-7|}{\\sqrt5}\\).",
        },
      ],
    },

    // C3 — sides of a line
    {
      kind: "formula" as const,
      slug: "jsl-regions",
      name: "Which side of a line",
      intuition:
        "\\(ax+by+c\\) is zero on the line, positive on one side and negative on the other. Two points are on the same side exactly when they give the same sign. A point is inside a triangle when, for each side, it has the same sign as the opposite vertex. The origin is usually the easiest point to test against.",
      definition:
        "- Same side of \\(ax+by+c=0\\): \\(ax_1+by_1+c\\) and \\(ax_2+by_2+c\\) have the same sign.\n" +
        "- Inside a triangle: on the same side of each side as the opposite vertex.\n" +
        "- With \\(b>0\\), \\(ax+by+c>0\\) is the side above the line.",
      formula: {
        label: "Same side of a line",
        latex: "(ax_1+by_1+c)(ax_2+by_2+c)>0",
      },
      authoredExample: {
        prompt: "For which \\(k\\) are \\((k,1)\\) and the origin on the same side of \\(x+2y=6\\)?",
        steps: [
          "At the origin, \\(x+2y-6=-6<0\\).",
          "At \\((k,1)\\): \\(k+2-6<0\\).",
        ],
        answer: "\\(k<4\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(t\\) is \\((t,1)\\) inside the triangle with vertices \\((0,0)\\), \\((4,0)\\), \\((0,4)\\)?",
        steps: [
          "The sides are \\(y=0\\), \\(x=0\\) and \\(x+y=4\\); compare with the opposite vertex each time.",
          "\\(1>0\\), \\(t>0\\) and \\(t+1<4\\).",
        ],
        answer: "\\(0<t<3\\).",
      },
      practiceSet: [
        { prompt: "Sign of \\(3x-y+2\\) at the origin?", answer: "Positive" },
        { prompt: "Is \\((2,5)\\) above \\(y=2x\\)?", answer: "Yes" },
        { prompt: "Are \\((1,2)\\) and \\((3,-2)\\) on the same side of \\(x+y=2\\)?", answer: "No" },
        { prompt: "For which \\(a\\) is \\((a,a)\\) on the origin's side of \\(x+y=6\\)?", answer: "\\(a<3\\)" },
      ],
      pyqExampleId: "38d93dd5-91d5-4ddf-977b-9e31add1fe91", // 2025 — a point on or inside a triangle given by its sides
      traps: [
        {
          title: "Test with the vertex, not the sketch",
          body: "Deciding \"inside\" from a rough picture fails when the lines are close together. For each side, compare signs with the opposite vertex; the three inequalities give the exact range.",
        },
      ],
    },
  ],
};
