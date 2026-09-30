import type { SubtopicNote } from "@/app/notes/_types";

export const MODULUS_AOI_NOTE: SubtopicNote = {
  subtopicName: "Modulus Curves",
  title: "Modulus Curves",
  oneLineDefinition:
    "Regions bounded by curves with a modulus, split where the expression inside changes sign so that each piece is an ordinary line or parabola.",
  whyItMatters:
    "Sixteen PYQs, ten of them multiple choice, and one from 2026. Eight have V shapes from the modulus of a linear term, against a line, a parabola or √x; eight take the modulus of a quadratic or of a product such as x|x − 3|, which folds part of a parabola up. Two ideas cover the page.",
  concepts: [
    // C1 — moduli of linear terms
    {
      kind: "formula" as const,
      slug: "jaoi-mod-linear",
      name: "Moduli of linear terms",
      intuition:
        "\\(|x-a|\\) has a corner at \\(x=a\\); a sum of such terms is a broken line with a corner at each one. Split at the corners and each side is a straight line. Against another line the region is a polygon, so triangles and trapezia give the area without integrating; against a curve, integrate top minus bottom on each side.",
      definition:
        "- \\(|x-a|=x-a\\) for \\(x\\ge a\\), and \\(a-x\\) for \\(x<a\\).\n" +
        "- A sum of linear moduli is a broken line with corners at those points.\n" +
        "- For a nested modulus such as \\(\\big||x|-1\\big|\\), draw the inside first, then reflect the parts below the axis.",
      formula: {
        label: "Split at the corner",
        latex: "|x-a|=\\begin{cases}x-a,&x\\ge a\\\\a-x,&x<a\\end{cases}",
      },
      authoredExample: {
        prompt: "Find the area bounded by \\(y=|x-2|\\) and \\(y=3\\).",
        steps: [
          "The V has its corner at \\((2,0)\\) and meets \\(y=3\\) at \\(x=-1\\) and \\(x=5\\).",
          "The region is a triangle with base 6 and height 3.",
        ],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y=|x+1|+|x-1|\\) and \\(y=4\\).",
        steps: [
          "\\(y=2\\) on \\([-1,1]\\), \\(y=2x\\) for \\(x\\ge1\\) and \\(y=-2x\\) for \\(x\\le-1\\); it reaches 4 at \\(x=\\pm2\\).",
          "The region is a trapezium with parallel sides 4 and 2, and height 2.",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(y=|x|\\) and \\(y=1\\)?", answer: "\\(1\\)" },
        { prompt: "Area of \\(|x|+|y|\\le1\\)?", answer: "\\(2\\)" },
        { prompt: "Corners of \\(y=|x-1|+|x-3|\\)?", answer: "\\(x=1\\) and \\(x=3\\)" },
        { prompt: "Area under \\(y=2-|x|\\), above the x-axis?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "4fd08d31-fa2b-49a7-b38f-027586e2eefb", // 2026 — linear moduli against y^2 = x
      traps: [
        {
          title: "Each side of a V against a curve",
          body: "When a V meets a parabola or \\(\\sqrt x\\), its two arms meet the curve at different points. Solve each arm separately; one equation for both sides loses a limit.",
        },
      ],
    },

    // C2 — modulus of a quadratic
    {
      kind: "formula" as const,
      slug: "jaoi-mod-quadratic",
      name: "The modulus of a quadratic",
      intuition:
        "\\(|f(x)|\\) keeps the parts of \\(y=f(x)\\) above the axis and reflects the parts below it. So \\(|x^2-a^2|\\) is the upward parabola outside \\([-a,a]\\) and the cap \\(a^2-x^2\\) inside it. For a product like \\(x|x-a|\\), the sign changes only at \\(x=a\\). Split at every zero of the quantity inside the modulus.",
      definition:
        "- \\(|x^2-a^2|=x^2-a^2\\) for \\(|x|\\ge a\\), and \\(a^2-x^2\\) for \\(|x|<a\\).\n" +
        "- \\(x|x-a|=x(x-a)\\) for \\(x\\ge a\\), and \\(x(a-x)\\) for \\(x<a\\).\n" +
        "- \\(x|x|=x^2\\) for \\(x\\ge0\\), and \\(-x^2\\) for \\(x<0\\).",
      formula: {
        label: "Split at the zeros",
        latex: "\\int_p^q|f(x)|\\,dx=\\sum_{\\text{pieces}}\\left|\\int f(x)\\,dx\\right|",
      },
      authoredExample: {
        prompt: "Find the area between \\(y=x|x-2|\\) and the x-axis for \\(0\\le x\\le3\\).",
        steps: [
          "On \\([0,2]\\): \\(y=x(2-x)\\), and \\(\\int_0^2(2x-x^2)\\,dx=4-\\frac83=\\frac43\\).",
          "On \\([2,3]\\): \\(y=x(x-2)\\), and \\(\\int_2^3(x^2-2x)\\,dx=0-\\left(\\frac83-4\\right)=\\frac43\\).",
        ],
        answer: "\\(\\frac83\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y=|x^2-1|\\) and \\(y=3\\).",
        steps: [
          "The cap peaks at 1, so \\(y=3\\) meets only the outer arms: \\(x^2-1=3\\), \\(x=\\pm2\\).",
          "By symmetry, area \\(=2\\left[\\int_0^1\\big(3-(1-x^2)\\big)dx+\\int_1^2\\big(3-(x^2-1)\\big)dx\\right]\\).",
          "\\(=2\\left(\\frac73+\\frac53\\right)\\).",
        ],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^2|x^2-1|\\,dx\\)?", answer: "\\(2\\)" },
        { prompt: "\\(|x^2-4|\\) on \\([-2,2]\\) equals?", answer: "\\(4-x^2\\)" },
        { prompt: "\\(x|x|\\) for \\(x<0\\)?", answer: "\\(-x^2\\)" },
        { prompt: "Area between \\(y=|x^2-1|\\) and the x-axis for \\(-1\\le x\\le1\\)?", answer: "\\(\\frac43\\)" },
      ],
      pyqExampleId: "48838445-d514-46c0-b045-4d20a112666b", // 2025 — |4 - x^2| below x^2, capped at y = 4
      traps: [
        {
          title: "Where the line cuts the cap",
          body: "If the line \\(y=c\\) sits below the top of the folded cap, the cap pokes through and makes a second region above the line. Check whether c is above or below the cap's peak before deciding how many regions there are.",
        },
      ],
    },
  ],
};
