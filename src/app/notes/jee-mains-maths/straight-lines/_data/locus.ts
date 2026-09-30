import type { SubtopicNote } from "@/app/notes/_types";

export const LOCUS_SL_NOTE: SubtopicNote = {
  subtopicName: "Family of Lines and Locus",
  title: "Family of Lines and Locus",
  oneLineDefinition:
    "Families of lines through a fixed point, three lines that meet at one point, and the locus of a point that moves under a condition, found by eliminating the parameter.",
  whyItMatters:
    "Ten PYQs, nine of them multiple choice, and one from 2026. Four use a family of lines through a fixed point, or ask when three lines fail to form a triangle. Six find the locus of a moving point by eliminating a slope, an angle or a coordinate. Two ideas cover the page.",
  concepts: [
    // C1 — family of lines
    {
      kind: "formula" as const,
      slug: "jsl-family",
      name: "Lines through a fixed point",
      intuition:
        "\\(L_1+\\lambda L_2=0\\) is every line through the meeting point of \\(L_1=0\\) and \\(L_2=0\\), except \\(L_2\\) itself. An equation that is linear in a parameter can be sorted into this shape, and then the fixed point is where \\(L_1=L_2=0\\). Three lines meet at one point exactly when the determinant of their coefficients is 0. Three lines fail to form a triangle when two of them are parallel or all three meet at one point.",
      definition:
        "- Through \\(L_1\\cap L_2\\): \\(L_1+\\lambda L_2=0\\).\n" +
        "- Fixed point: sort the equation into \\(L_1+\\lambda L_2=0\\), then solve \\(L_1=L_2=0\\).\n" +
        "- Concurrent: \\(\\begin{vmatrix}a_1&b_1&c_1\\\\a_2&b_2&c_2\\\\a_3&b_3&c_3\\end{vmatrix}=0\\).\n" +
        "- No triangle: two lines parallel, or all three concurrent.\n" +
        "- Of the lines through \\(P\\), the one farthest from \\(Q\\) is perpendicular to \\(PQ\\), at distance \\(PQ\\).",
      formula: {
        label: "Family through a point",
        latex: "L_1+\\lambda L_2=0",
      },
      authoredExample: {
        prompt: "Find the fixed point of the lines \\((2+\\lambda)x+(1-\\lambda)y=3+\\lambda\\).",
        steps: [
          "Sort by \\(\\lambda\\): \\((2x+y-3)+\\lambda(x-y-1)=0\\).",
          "Solve \\(2x+y=3\\) and \\(x-y=1\\).",
        ],
        answer: "\\(\\left(\\frac43,\\frac13\\right)\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) do \\(x+y=2\\), \\(x-y=0\\) and \\(2x+ky=5\\) meet at one point?",
        steps: [
          "The first two meet at \\((1,1)\\).",
          "\\(2+k=5\\).",
        ],
        answer: "\\(k=3\\).",
      },
      practiceSet: [
        { prompt: "Fixed point of \\(y-2=m(x+1)\\)?", answer: "\\((-1,2)\\)" },
        { prompt: "Fixed point of \\(x+\\lambda y=\\lambda\\)?", answer: "\\((0,1)\\)" },
        { prompt: "The line of slope 1 through the meeting point of \\(x=1\\) and \\(y=2\\)?", answer: "\\(y=x+1\\)" },
        { prompt: "When are \\(kx+y=1\\) and \\(2x+y=3\\) parallel?", answer: "\\(k=2\\)" },
      ],
      pyqExampleId: "21c18828-f965-4512-9f0d-e85bb504e3e9", // 2026 — lines through a meeting point, locus of the midpoint of the intercepts
      traps: [
        {
          title: "Count every way to fail",
          body: "Three lines do not form a triangle when any two are parallel or when all three meet at one point. Each case gives its own values of the parameter, and the answer needs all of them.",
        },
      ],
    },

    // C2 — locus
    {
      kind: "formula" as const,
      slug: "jsl-locus",
      name: "Locus of a moving point",
      intuition:
        "Call the moving point \\((h,k)\\). Write \\(h\\) and \\(k\\) in terms of whatever moves it: a slope, an angle or another point's coordinate. Then eliminate that parameter and rename \\(h,k\\) as \\(x,y\\). For angles, \\(\\cos^2\\theta+\\sin^2\\theta=1\\) or the tan addition formula usually does the elimination.",
      definition:
        "- Set the point as \\((h,k)\\) and express both in the parameter.\n" +
        "- Eliminate the parameter; then write \\(x,y\\) for \\(h,k\\).\n" +
        "- The midpoint of the intercepts of \\(\\frac xa+\\frac yb=1\\) is \\(\\left(\\frac a2,\\frac b2\\right)\\).\n" +
        "- A fixed area on a fixed base: the locus is a line parallel to the base.",
      formula: {
        label: "Elimination",
        latex: "h=f(t),\\ k=g(t)\\ \\Rightarrow\\ F(h,k)=0",
      },
      authoredExample: {
        prompt: "A line through \\((2,3)\\) meets the axes at \\(A\\) and \\(B\\). Find the locus of the midpoint of \\(AB\\).",
        steps: [
          "If the midpoint is \\((h,k)\\), the intercepts are \\(2h\\) and \\(2k\\), so \\(\\frac2{2h}+\\frac3{2k}=1\\).",
          "Multiply by \\(2hk\\): \\(2k+3h=2hk\\).",
        ],
        answer: "\\(3x+2y=2xy\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus of \\(\\left(\\tan\\theta,\\ \\tan\\left(\\theta+\\frac\\pi4\\right)\\right)\\).",
        steps: [
          "\\(y=\\frac{\\tan\\theta+1}{1-\\tan\\theta}=\\frac{x+1}{1-x}\\).",
          "Clear the fraction: \\(y-xy=x+1\\).",
        ],
        answer: "\\(xy+x-y+1=0\\).",
      },
      practiceSet: [
        { prompt: "Locus of \\((t,t^2)\\)?", answer: "\\(y=x^2\\)" },
        { prompt: "Locus of \\((3\\cos t,\\ 3\\sin t)\\)?", answer: "\\(x^2+y^2=9\\)" },
        { prompt: "Locus of the points at distance 2 from the x-axis?", answer: "\\(y=\\pm2\\)" },
        { prompt: "Locus of \\((1+t,\\ 2-t)\\)?", answer: "\\(x+y=3\\)" },
      ],
      pyqExampleId: "de6c6bf3-72f0-47ff-a81d-c8cb2e49e4f6", // 2025 — eliminate theta from two tangents
      traps: [
        {
          title: "Keep the restrictions",
          body: "Eliminating the parameter can add points the moving point never reaches. If \\(\\theta\\) or a coordinate is restricted, the locus is only the matching part of the curve, and the options may differ only there.",
        },
      ],
    },
  ],
};
