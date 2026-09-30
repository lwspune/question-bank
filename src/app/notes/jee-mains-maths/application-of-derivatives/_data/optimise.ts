import type { SubtopicNote } from "@/app/notes/_types";

export const OPTIMISE_AOD_NOTE: SubtopicNote = {
  subtopicName: "Optimisation Problems",
  title: "Optimisation Problems",
  oneLineDefinition:
    "Word problems solved by the derivative: the largest area or volume under a constraint, and the shortest distance between a point, a line and a curve.",
  whyItMatters:
    "Eighteen PYQs, fourteen of them multiple choice. Fourteen maximise or minimise an area or a volume — a box folded from a sheet, a wire cut into two shapes, a rectangle inside a curved region; four find a shortest distance or perimeter. Two ideas cover the page.",
  concepts: [
    // C1 — areas and volumes
    {
      kind: "formula" as const,
      slug: "jaod-shapes",
      name: "Largest area or volume",
      intuition:
        "Name one variable, write the quantity to optimise in terms of it using the constraint, and note the variable's allowed range. Then set the derivative to zero and check that the point is a maximum (or minimum) inside that range. For a wire cut into two shapes, let one piece be the variable and the other the remainder.",
      definition:
        "- One variable; use the constraint to remove the others.\n" +
        "- Solve \\(Q'(x)=0\\) inside the allowed range; check with \\(Q''\\) or the endpoints.\n" +
        "- Square of perimeter \\(p\\): area \\(\\frac{p^2}{16}\\); circle of circumference \\(p\\): area \\(\\frac{p^2}{4\\pi}\\).\n" +
        "- Open box from an \\(a\\times b\\) sheet: \\(V=x(a-2x)(b-2x)\\).",
      formula: {
        label: "The method",
        latex: "Q=Q(x),\\quad Q'(x)=0,\\quad Q''(x)<0\\ \\Rightarrow\\ \\text{maximum}",
      },
      authoredExample: {
        prompt: "Find the largest area of a rectangle with perimeter 20.",
        steps: [
          "Sides \\(x\\) and \\(10-x\\): \\(A=x(10-x)\\), \\(A'=10-2x=0\\) at \\(x=5\\).",
        ],
        answer: "\\(25\\), a square.",
      },
      selfCheckExample: {
        prompt: "An open box is made from a \\(12\\times12\\) sheet by cutting a square of side \\(x\\) from each corner. Find the largest volume.",
        steps: [
          "\\(V=x(12-2x)^2\\), \\(V'=(12-2x)(12-6x)=0\\) at \\(x=2\\) (as \\(x<6\\)).",
        ],
        answer: "\\(V=2\\cdot64=128\\).",
      },
      practiceSet: [
        { prompt: "Two numbers add to 10: largest product?", answer: "\\(25\\)" },
        { prompt: "Largest rectangle in a circle of radius 1?", answer: "Area \\(2\\) (a square)" },
        { prompt: "Right triangle with hypotenuse 10: largest area?", answer: "\\(25\\)" },
        { prompt: "Least \\(x+y\\) with \\(xy=16\\), \\(x,y>0\\)?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "81938163-015f-4cd6-bd85-51f373d7ded0", // 2023 — open box from a 30 cm square sheet
      traps: [
        {
          title: "Stay inside the allowed range",
          body: "The cut in a box must be less than half the sheet's side, and a wire piece cannot be negative. A root of \\(Q'\\) outside that range is not the answer.",
        },
      ],
    },

    // C2 — shortest distances
    {
      kind: "formula" as const,
      slug: "jaod-distance",
      name: "Shortest distances",
      intuition:
        "The shortest distance from a curve to a line it does not meet is along a normal, so the nearest point is where the tangent is parallel to the line. From a point to a curve, minimise the squared distance, which avoids the square root. From a circle, work from its centre and subtract the radius. For the least sum of two distances to a point on a line, reflect one point in the line.",
      definition:
        "- Curve to line (not meeting): tangent parallel to the line.\n" +
        "- Point to curve: minimise \\(D^2\\).\n" +
        "- Circle: distance from the centre, minus the radius.\n" +
        "- Least \\(PA+PB\\) with \\(P\\) on a line: reflect \\(A\\) and join to \\(B\\).",
      formula: {
        label: "Nearest point to a line",
        latex: "f'(x_0)=\\text{slope of the line}",
      },
      authoredExample: {
        prompt: "Find the shortest distance from \\((0,3)\\) to \\(y=x^2\\).",
        steps: [
          "\\(D^2=x^2+(x^2-3)^2=x^4-5x^2+9\\); its derivative \\(4x^3-10x=0\\) at \\(x^2=\\frac52\\).",
          "\\(D^2=\\frac{25}4-\\frac{25}2+9=\\frac{11}4\\).",
        ],
        answer: "\\(\\frac{\\sqrt{11}}2\\).",
      },
      selfCheckExample: {
        prompt: "Which point of \\(y=x^2\\) is nearest to the line \\(y=2x-5\\), and how far is it?",
        steps: [
          "Tangent slope \\(2x=2\\) at \\(x=1\\): the point \\((1,1)\\).",
          "Distance \\(\\frac{|2-1-5|}{\\sqrt5}\\).",
        ],
        answer: "\\((1,1)\\), at distance \\(\\frac4{\\sqrt5}\\).",
      },
      practiceSet: [
        { prompt: "Least distance from 0 to \\(xy=4\\)?", answer: "\\(2\\sqrt2\\)" },
        { prompt: "Least distance from \\((3,0)\\) to \\(x^2+y^2=1\\)?", answer: "\\(2\\)" },
        { prompt: "Point of \\(y^2=4x\\) nearest \\((2,0)\\)?", answer: "\\((0,0)\\)" },
        { prompt: "Least \\(PA+PB\\), \\(P\\) on the \\(x\\)-axis, \\(A(0,1)\\), \\(B(3,2)\\)?", answer: "\\(3\\sqrt2\\)" },
      ],
      pyqExampleId: "fa4beadc-c8a0-46c8-9a7f-fb51948a4862", // 2021 — point of y = x^2 + 4 closest to y = 4x - 1
      traps: [
        {
          title: "Only if they do not meet",
          body: "The parallel-tangent method assumes the curve and the line do not cross; if they meet, the shortest distance is 0. Check with a discriminant first.",
        },
      ],
    },
  ],
};
