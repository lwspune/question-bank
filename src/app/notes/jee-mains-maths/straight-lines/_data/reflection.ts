import type { SubtopicNote } from "@/app/notes/_types";

export const REFLECTION_SL_NOTE: SubtopicNote = {
  subtopicName: "Image of a Point and Reflected Rays",
  title: "Image of a Point and Reflected Rays",
  oneLineDefinition:
    "The image of a point in a line, found from the foot of the perpendicular, and its use for reflected rays of light and for shortest paths that touch a line.",
  whyItMatters:
    "Thirteen PYQs, eight of them multiple choice, and two from 2026. Seven reflect a point, a centroid or a whole triangle in a line, one of them followed by a translation and a rotation. Six follow a ray of light reflected in a mirror line, or the shortest path that touches a line. Two ideas cover the page.",
  concepts: [
    // C1 — image of a point
    {
      kind: "formula" as const,
      slug: "jsl-image",
      name: "Image of a point in a line",
      intuition:
        "The image of \\(P\\) in a line is as far behind the line as \\(P\\) is in front of it, along the normal. So move \\(P\\) along \\((a,b)\\) by twice the step that reaches the foot of the perpendicular. The line is then the perpendicular bisector of \\(P\\) and its image. Reflection keeps lengths and angles, so the image of a triangle's centroid is the centroid of its image, and a circle's image has the reflected centre and the same radius.",
      definition:
        "- Image: \\(\\frac{x-x_1}a=\\frac{y-y_1}b=-\\frac{2(ax_1+by_1+c)}{a^2+b^2}\\).\n" +
        "- Foot: the same with 2 replaced by 1.\n" +
        "- In \\(y=x\\): \\((x,y)\\to(y,x)\\); in the x-axis: \\((x,y)\\to(x,-y)\\).\n" +
        "- The mirror is the perpendicular bisector of \\(P\\) and its image.",
      formula: {
        label: "Image in a line",
        latex: "\\frac{x-x_1}{a}=\\frac{y-y_1}{b}=-\\frac{2(ax_1+by_1+c)}{a^2+b^2}",
      },
      authoredExample: {
        prompt: "Find the image of \\((4,1)\\) in \\(2x+y=4\\).",
        steps: [
          "\\(2(4)+1-4=5\\), so the ratio is \\(-\\frac{2\\cdot5}{5}=-2\\).",
          "Image: \\((4-2\\cdot2,\\ 1-2\\cdot1)\\). The midpoint \\((2,0)\\) is on the line.",
        ],
        answer: "\\((0,-1)\\).",
      },
      selfCheckExample: {
        prompt: "Find the image of \\((2,-1)\\) in \\(x+y=5\\).",
        steps: [
          "\\(2-1-5=-4\\), so the ratio is \\(-\\frac{2(-4)}{2}=4\\).",
          "Image: \\((2+4,\\ -1+4)\\).",
        ],
        answer: "\\((6,3)\\).",
      },
      practiceSet: [
        { prompt: "Image of \\((3,7)\\) in \\(y=x\\)?", answer: "\\((7,3)\\)" },
        { prompt: "Image of \\((2,5)\\) in the x-axis?", answer: "\\((2,-5)\\)" },
        { prompt: "Image of the origin in \\(x+y=2\\)?", answer: "\\((2,2)\\)" },
        { prompt: "Image of \\((1,1)\\) in \\(x=4\\)?", answer: "\\((7,1)\\)" },
      ],
      pyqExampleId: "97503db8-f429-420e-855a-2cc071cab4a2", // 2026 — a line as the perpendicular bisector of PQ
      traps: [
        {
          title: "Twice, not once",
          body: "The formula with 1 gives the foot of the perpendicular; with 2 it gives the image. Check the answer: the midpoint of \\(P\\) and its image must lie on the line.",
        },
      ],
    },

    // C2 — reflected rays
    {
      kind: "formula" as const,
      slug: "jsl-rays",
      name: "Reflected rays and shortest paths",
      intuition:
        "A ray reflected in a mirror line looks as if it comes from the image of its source. So the reflected ray is the line through the image of the source and any point the reflected ray passes through. The same idea gives the shortest path from \\(A\\) to a line and on to \\(B\\), with \\(A\\) and \\(B\\) on the same side: reflect \\(A\\), join the image to \\(B\\), and the crossing point is where the path touches the line.",
      definition:
        "- Reflected ray: through the image \\(A'\\) of the source \\(A\\) and the point it reaches.\n" +
        "- Incident ray: through the source and the image of the point the reflected ray reaches.\n" +
        "- Shortest path \\(A\\to\\) line \\(\\to B\\): length \\(A'B\\), turning where \\(A'B\\) meets the line.\n" +
        "- The angle of incidence equals the angle of reflection.",
      formula: {
        label: "Path via a mirror",
        latex: "AR+RB\\ge A'B,\\ \\text{equality when } R \\text{ is on } A'B",
      },
      authoredExample: {
        prompt: "A ray from \\((1,3)\\) reflects off the x-axis and passes through \\((5,1)\\). Where does it hit the axis?",
        steps: [
          "The image of \\((1,3)\\) is \\((1,-3)\\).",
          "The line through \\((1,-3)\\) and \\((5,1)\\) is \\(y=x-4\\), which meets the axis at \\(x=4\\).",
        ],
        answer: "\\((4,0)\\).",
      },
      selfCheckExample: {
        prompt: "Find the shortest path from \\((0,2)\\) to the x-axis and on to \\((6,4)\\).",
        steps: [
          "Reflect \\((0,2)\\) to \\((0,-2)\\); its distance to \\((6,4)\\) is \\(\\sqrt{36+36}\\).",
          "The line \\(y=x-2\\) through \\((0,-2)\\) and \\((6,4)\\) meets the axis at \\((2,0)\\).",
        ],
        answer: "\\(6\\sqrt2\\), touching the axis at \\((2,0)\\).",
      },
      practiceSet: [
        { prompt: "Image of a source at \\((2,5)\\) in the y-axis?", answer: "\\((-2,5)\\)" },
        { prompt: "Shortest path \\((0,1)\\to\\) x-axis \\(\\to(4,2)\\)?", answer: "\\(5\\)" },
        { prompt: "A ray along \\(y=x\\) hits the mirror \\(x=3\\). Slope of the reflected ray?", answer: "\\(-1\\)" },
        { prompt: "A ray of slope \\(-3\\) hits the x-axis. Slope of the reflected ray?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "583ccddc-6e13-40e1-b64f-68caf13cf592", // 2026 — two rays reflected from a mirror line
      traps: [
        {
          title: "Reflect the right point",
          body: "The reflected ray passes through the image of the source. Reflecting the far point instead gives the incident ray. Check which ray the question asks for before you reflect.",
        },
      ],
    },
  ],
};
