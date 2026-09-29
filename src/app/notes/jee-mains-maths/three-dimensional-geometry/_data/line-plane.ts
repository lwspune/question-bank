import type { SubtopicNote } from "@/app/notes/_types";

export const LINE_PLANE_3D_NOTE: SubtopicNote = {
  subtopicName: "Lines Meeting Planes",
  title: "Lines Meeting Planes",
  oneLineDefinition:
    "A line and a plane together: where the line meets the plane and in what ratio a plane cuts a segment, the angle between them, when a line is parallel to or lies in a plane, and distances measured along a given direction.",
  whyItMatters:
    "Thirty-six PYQs. Almost every one substitutes the line's general point into the plane's equation. The largest group measures a distance 'parallel to a line', which is the same substitution read as a length. Three ideas cover the page.",
  concepts: [
    // C1 — where a line meets a plane
    {
      kind: "formula" as const,
      slug: "j3d-line-plane-meet",
      name: "Where a line meets a plane, and the ratio a plane cuts",
      intuition:
        "Put the line's general point \\(A+t\\vec d\\) into the plane's equation. It becomes one linear equation in \\(t\\), and its root gives the meeting point. The same idea tells how a plane cuts a segment \\(AB\\): the plane's values at \\(A\\) and \\(B\\) are in the ratio of the pieces, and opposite signs mean the cut is between them.",
      definition:
        "- **Meeting point:** substitute \\(A+t\\vec d\\) into the plane and solve for \\(t\\).\n" +
        "- **Ratio:** a plane divides \\(AB\\) in the ratio \\(-\\frac{P(A)}{P(B)}\\), internally when \\(P(A)\\), \\(P(B)\\) have opposite signs.\n" +
        "- **Projection of a line on a plane:** it passes through the meeting point and through the foot of any other point of the line.",
      formula: {
        label: "Ratio in which a plane divides AB",
        latex: "\\frac{AC}{CB}=-\\frac{P(A)}{P(B)}",
      },
      authoredExample: {
        prompt: "Where does \\(\\frac{x-1}{1}=\\frac{y-2}{2}=\\frac{z-3}{3}\\) meet \\(x+y+z=12\\)?",
        steps: [
          "\\((1+t)+(2+2t)+(3+3t)=12\\), so \\(6+6t=12\\), \\(t=1\\).",
        ],
        answer: "At \\((2,4,6)\\).",
      },
      selfCheckExample: {
        prompt: "In what ratio does \\(2x+y+z=7\\) divide the segment from \\((1,1,1)\\) to \\((3,2,4)\\)?",
        steps: [
          "\\(P(A)=2+1+1-7=-3\\), \\(P(B)=6+2+4-7=5\\).",
          "Opposite signs: internally, in the ratio \\(3:5\\).",
        ],
        answer: "\\(3:5\\) internally.",
      },
      practiceSet: [
        { prompt: "Where does the \\(x\\)-axis meet \\(2x+3y+z=8\\)?", answer: "\\((4,0,0)\\)" },
        { prompt: "Where does the \\(z\\)-axis meet \\(x+y+z=5\\)?", answer: "\\((0,0,5)\\)" },
        { prompt: "\\(P(A)\\) and \\(P(B)\\) have the same sign. The cut?", answer: "External (outside the segment)" },
        { prompt: "The line's substitution gives \\(0\\cdot t=4\\). Meaning?", answer: "The line is parallel to the plane and never meets it" },
      ],
      pyqExampleId: "5baa8ee0-5772-497b-b444-e363795341ac", // 2021 — intersection of a line with 2x - y + z = 6, distance squared from (-1,-1,2)
      traps: [
        {
          title: "\\(0\\cdot t=c\\) means no meeting point",
          body: "If \\(t\\) drops out, the line is parallel to the plane: no solution when the constant is non-zero, every point when it is zero (the line lies in the plane).",
        },
      ],
    },

    // C2 — angle, parallel, lying in
    {
      kind: "formula" as const,
      slug: "j3d-line-plane-angle",
      name: "The angle between a line and a plane; parallel and lying in",
      intuition:
        "The angle a line makes with a plane is the complement of the angle it makes with the normal, so it uses SINE: \\(\\sin\\theta=\\frac{|\\vec d\\cdot\\vec n|}{|\\vec d||\\vec n|}\\). A line is parallel to the plane when \\(\\vec d\\perp\\vec n\\); it lies in the plane when, in addition, one of its points does. A line given as two planes has direction \\(\\vec n_1\\times\\vec n_2\\).",
      definition:
        "- \\(\\sin\\theta=\\frac{|\\vec d\\cdot\\vec n|}{|\\vec d||\\vec n|}\\).\n" +
        "- **Parallel:** \\(\\vec d\\cdot\\vec n=0\\). **Lies in the plane:** also one point satisfies it.\n" +
        "- **Line of intersection of two planes:** direction \\(\\vec n_1\\times\\vec n_2\\).\n" +
        "- A line parallel to a plane is at a constant distance from it: the distance of any of its points.",
      formula: {
        label: "Angle between a line and a plane",
        latex: "\\sin\\theta=\\frac{|\\vec d\\cdot\\vec n|}{|\\vec d|\\,|\\vec n|}",
      },
      authoredExample: {
        prompt: "Find the angle between \\(\\frac x1=\\frac y2=\\frac z2\\) and the plane \\(2x-y+2z=5\\).",
        steps: [
          "\\(\\vec d\\cdot\\vec n=2-2+4=4\\); \\(|\\vec d|=|\\vec n|=3\\).",
        ],
        answer: "\\(\\sin^{-1}\\frac49\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) does \\(\\frac{x-1}{2}=\\frac{y-2}{1}=\\frac{z-3}{k}\\) lie in the plane \\(x+y-z=0\\)?",
        steps: [
          "The point \\((1,2,3)\\): \\(1+2-3=0\\), on the plane.",
          "Direction: \\(2+1-k=0\\).",
        ],
        answer: "\\(k=3\\).",
      },
      practiceSet: [
        { prompt: "Is the \\(z\\)-axis parallel to \\(x+y=1\\)?", answer: "Yes: \\((0,0,1)\\cdot(1,1,0)=0\\)" },
        { prompt: "Direction of the line \\(x+y=1\\), \\(y+z=1\\)?", answer: "\\((1,-1,1)\\)" },
        { prompt: "Angle between a line along the normal and the plane?", answer: "\\(90^\\circ\\)" },
        { prompt: "A line parallel to a plane: its distance from the plane?", answer: "The distance of any one of its points" },
      ],
      pyqExampleId: "a3ba4848-a2d9-4666-82f7-e85e75729d8c", // 2023 — angle cos^-1 root(5/14) between a line and x + 2y + 3z = 4
      traps: [
        {
          title: "SINE for a line and a plane",
          body: "The dot product with the NORMAL gives the angle with the normal. The angle with the plane is its complement, so the formula has \\(\\sin\\theta\\). A question stating \\(\\cos\\theta\\) of the line-plane angle needs converting first.",
        },
      ],
    },

    // C3 — distance along a direction
    {
      kind: "formula" as const,
      slug: "j3d-distance-along-line",
      name: "Distance measured parallel to a given line",
      intuition:
        "'The distance of \\(P\\) from a plane measured parallel to a line' means: leave \\(P\\) in the given direction until you reach the plane, and measure that walk. Write \\(P+t\\vec d\\), substitute into the plane to find \\(t\\), and the distance is \\(|t|\\,|\\vec d|\\). If the target is a line instead of a plane, make the point \\(P+t\\vec d\\) satisfy that line's equations.",
      definition:
        "- Moving point: \\(P+t\\vec d\\), \\(\\vec d\\) the given direction.\n" +
        "- **Target a plane:** substitute and solve for \\(t\\).\n" +
        "- **Target a line:** equate with the line's general point; two coordinates give the parameters, the third checks.\n" +
        "- **Distance:** \\(|t|\\,|\\vec d|\\) (or \\(|t|\\) if \\(\\vec d\\) was a unit vector).\n" +
        "- If \\(\\vec d\\) is parallel to the plane, there is no such distance.",
      formula: {
        label: "Distance along a direction",
        latex: "\\text{distance}=|t|\\,|\\vec d|,\\quad P+t\\vec d\\ \\text{on the target}",
      },
      authoredExample: {
        prompt: "Find the distance of \\((1,2,3)\\) from \\(x+y+z=12\\) measured parallel to \\((2,2,1)\\).",
        steps: [
          "\\((1+2t)+(2+2t)+(3+t)=12\\), so \\(5t=6\\), \\(t=\\frac65\\).",
          "\\(|\\vec d|=3\\): distance \\(\\frac65\\cdot3\\).",
        ],
        answer: "\\(\\frac{18}{5}\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance of \\((3,0,0)\\) from the line \\(x=y=z\\) measured parallel to \\((-1,1,1)\\).",
        steps: [
          "\\((3-t,t,t)\\) on \\(x=y=z\\): \\(3-t=t\\), \\(t=\\frac32\\).",
          "Distance \\(\\frac32\\cdot\\sqrt3\\).",
        ],
        answer: "\\(\\frac{3\\sqrt3}{2}\\).",
      },
      practiceSet: [
        { prompt: "Measured along the normal, this distance is?", answer: "The ordinary perpendicular distance" },
        { prompt: "\\(t=-2\\), \\(|\\vec d|=3\\). Distance?", answer: "\\(6\\)" },
        { prompt: "Distance of \\((0,0,0)\\) from \\(z=4\\) parallel to \\((0,3,4)\\)?", answer: "\\(5\\)" },
        { prompt: "The direction is parallel to the plane. The distance?", answer: "Not defined: the walk never meets it" },
      ],
      pyqExampleId: "d74cf358-b471-468f-808e-a5e42c66cc94", // 2021 — distance of (1,-2,3) from x - y + z = 5 parallel to 2,3,-6
      traps: [
        {
          title: "Multiply by \\(|\\vec d|\\) at the end",
          body: "\\(t\\) counts steps of \\(\\vec d\\), not units of length. Unless \\(\\vec d\\) is a unit vector, the distance is \\(|t|\\,|\\vec d|\\).",
        },
      ],
    },
  ],
};
