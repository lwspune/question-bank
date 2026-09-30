import type { SubtopicNote } from "@/app/notes/_types";

export const NATURE_QE_NOTE: SubtopicNote = {
  subtopicName: "Discriminant and Location of Roots",
  title: "Discriminant and Location of Roots",
  oneLineDefinition:
    "What the discriminant says about the roots — real, equal, rational or absent — and how the sign of the quadratic at chosen points places the roots on the number line.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them multiple choice, and three from 2026. Nine use the sign of the discriminant — equal roots, real roots, no real roots, or a quadratic that keeps one sign for every x; three need the discriminant to be a perfect square, so the roots are rational or integers; six place the roots against given numbers — both positive, both negative, inside an interval, or on either side of a point. Three ideas cover the page.",
  concepts: [
    // C1 — sign of the discriminant
    {
      kind: "formula" as const,
      slug: "jqe-discriminant",
      name: "The sign of the discriminant",
      intuition:
        "\\(D=b^2-4ac\\) decides the roots: two real roots when \\(D>0\\), one repeated root when \\(D=0\\), none when \\(D<0\\). The same number controls the sign of the quadratic: with \\(a>0\\) and \\(D<0\\) the graph never reaches the axis, so the quadratic is positive for every \\(x\\). When \\(x\\) and \\(y\\) are tied by one equation, read it as a quadratic in one of them; for that one to be real, its discriminant must be \\(\\ge0\\).",
      definition:
        "- \\(D>0\\): two distinct real roots; \\(D=0\\): equal roots; \\(D<0\\): no real roots.\n" +
        "- \\(ax^2+bx+c>0\\) for all \\(x\\) exactly when \\(a>0\\) and \\(D<0\\).\n" +
        "- \\(ax^2+bx+c<0\\) for all \\(x\\) exactly when \\(a<0\\) and \\(D<0\\).\n" +
        "- If the \\(x^2\\) coefficient can be \\(0\\), check that value on its own.",
      formula: {
        label: "Discriminant",
        latex: "D=b^2-4ac,\\qquad x=\\frac{-b\\pm\\sqrt D}{2a}",
      },
      authoredExample: {
        prompt: "For which \\(m\\) does \\(x^2-2mx+4m-3=0\\) have equal roots?",
        steps: [
          "\\(D=4m^2-4(4m-3)=4(m-1)(m-3)\\).",
          "\\(D=0\\) at \\(m=1\\) or \\(m=3\\).",
        ],
        answer: "\\(m=1\\) (root \\(1\\)) or \\(m=3\\) (root \\(3\\)).",
      },
      selfCheckExample: {
        prompt: "How many integers \\(k\\) make \\(x^2-(k+1)x+4>0\\) for every real \\(x\\)?",
        steps: [
          "The leading coefficient is positive, so the condition is \\(D<0\\).",
          "\\((k+1)^2<16\\) gives \\(-5<k<3\\).",
        ],
        answer: "\\(7\\) (\\(k=-4,\\dots,2\\)).",
      },
      practiceSet: [
        { prompt: "Nature of the roots of \\(2x^2-3x+5=0\\)?", answer: "No real roots (\\(D=-31\\))" },
        { prompt: "\\(x^2+6x+c=0\\) has equal roots. \\(c\\)?", answer: "\\(9\\)" },
        { prompt: "For which \\(a\\) is \\(ax^2+4x+a<0\\) for all \\(x\\)?", answer: "\\(a<-2\\)" },
        { prompt: "\\(x^2+y^2-2x=0\\) with \\(x,y\\) real: the range of \\(y\\)?", answer: "\\([-1,1]\\)" },
      ],
      pyqExampleId: "e6f266d8-460c-40d8-b2f9-f752c6d2ca44", // 2025 — equal roots fix k, then a distance
      traps: [
        {
          title: "The x² coefficient can vanish",
          body: "When the leading coefficient holds a parameter, the value that makes it \\(0\\) leaves a linear equation, and the discriminant test does not apply. Treat that value on its own — it is often the case the options exclude.",
        },
      ],
    },

    // C2 — rational and integer roots
    {
      kind: "formula" as const,
      slug: "jqe-integer-roots",
      name: "Rational and integer roots",
      intuition:
        "With integer coefficients, the roots are rational exactly when \\(D\\) is a perfect square: the square root in the formula disappears. For \\(x^2+bx+c=0\\) with integers \\(b,c\\), rational roots are integers. So the question becomes one of two searches: for which parameters is \\(D\\) a perfect square, or which factor pairs of \\(c\\) add up to \\(-b\\).",
      definition:
        "- Integer coefficients: roots rational exactly when \\(D\\) is a perfect square.\n" +
        "- \\(x^2+bx+c=0\\), \\(b,c\\) integers: rational roots are integers.\n" +
        "- Integer roots: list the factor pairs of \\(c\\) whose sum is \\(-b\\).",
      formula: {
        label: "Rational roots",
        latex: "\\sqrt{b^2-4ac}\\in\\mathbb{Z}\\ \\Rightarrow\\ x=\\frac{-b\\pm\\sqrt{D}}{2a}\\ \\text{is rational}",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2-px+12=0\\) are integers. How many values can \\(p\\) take?",
        steps: [
          "The roots multiply to \\(12\\) and add to \\(p\\).",
          "Pairs \\((1,12),(2,6),(3,4)\\) and their negatives give \\(p=\\pm13,\\pm8,\\pm7\\).",
        ],
        answer: "Six values.",
      },
      selfCheckExample: {
        prompt: "For which natural \\(k\\) has \\(x^2-5x+k=0\\) rational roots?",
        steps: [
          "\\(D=25-4k\\) must be a perfect square, with \\(k\\ge1\\).",
          "\\(25-4k\\in\\{21,17,13,9,5,1\\}\\): squares at \\(k=4\\) and \\(k=6\\).",
        ],
        answer: "\\(k=4\\) (roots \\(1,4\\)) or \\(k=6\\) (roots \\(2,3\\)).",
      },
      practiceSet: [
        { prompt: "Are the roots of \\(2x^2-7x+3=0\\) rational?", answer: "Yes: \\(D=25\\), roots \\(3\\) and \\(\\frac12\\)" },
        { prompt: "Are the roots of \\(x^2-4x+2=0\\) rational?", answer: "No: \\(D=8\\)" },
        { prompt: "Integer roots of \\(x^2+x-20=0\\)?", answer: "\\(4\\) and \\(-5\\)" },
        { prompt: "Smallest natural \\(c\\) for which \\(x^2-8x+c=0\\) has integer roots?", answer: "\\(7\\) (roots \\(1\\) and \\(7\\))" },
      ],
      pyqExampleId: "090b9df3-9098-4bf5-9f03-80ec618866f0", // 2025 — count n in [20, 100] with integral roots
      traps: [
        {
          title: "Rational coefficients first",
          body: "The perfect-square test works only when the coefficients are rational. With \\(\\sqrt2\\) in a coefficient, the roots can be irrational even when \\(D\\) is a perfect square.",
        },
      ],
    },

    // C3 — location of roots
    {
      kind: "formula" as const,
      slug: "jqe-location",
      name: "Placing the roots on the number line",
      intuition:
        "For \\(f(x)=ax^2+bx+c\\) with \\(a>0\\), the graph is a U. A number \\(k\\) lies between the roots exactly when \\(f(k)<0\\) — no discriminant check is needed. For both roots beyond \\(k\\) on the same side, three conditions are needed: real roots, the vertex on that side, and \\(f(k)>0\\). For both roots positive, the sum and product do the same job. For one root in each of two intervals, check the sign of \\(f\\) at the end points.",
      definition:
        "- \\(k\\) between the roots: \\(af(k)<0\\).\n" +
        "- Both roots \\(>k\\): \\(D\\ge0\\), \\(-\\frac{b}{2a}>k\\), \\(af(k)>0\\).\n" +
        "- Both roots positive: \\(D\\ge0\\), sum \\(>0\\), product \\(>0\\).\n" +
        "- Both roots in \\((p,q)\\): \\(D\\ge0\\), \\(p<-\\frac{b}{2a}<q\\), \\(af(p)>0\\), \\(af(q)>0\\).",
      formula: {
        label: "A number between the roots",
        latex: "\\alpha<k<\\beta\\quad\\text{exactly when}\\quad a\\,f(k)<0",
      },
      authoredExample: {
        prompt: "For which \\(m\\) are both roots of \\(x^2-2mx+m+6=0\\) positive?",
        steps: [
          "\\(D\\ge0\\): \\(m^2-m-6\\ge0\\), so \\(m\\le-2\\) or \\(m\\ge3\\).",
          "Sum \\(2m>0\\) and product \\(m+6>0\\) leave \\(m\\ge3\\).",
        ],
        answer: "\\(m\\ge3\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) does \\(1\\) lie between the roots of \\(x^2+kx+k-4=0\\)?",
        steps: [
          "The leading coefficient is positive, so the condition is \\(f(1)<0\\).",
          "\\(f(1)=2k-3<0\\).",
        ],
        answer: "\\(k<\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\(0\\) lies between the roots of \\(x^2+x+c=0\\) when?", answer: "\\(c<0\\)" },
        { prompt: "Signs of the roots of \\(x^2+5x+6=0\\), without solving?", answer: "Both negative: sum \\(-5\\), product \\(6\\)" },
        { prompt: "Both roots of \\(x^2-4x+c=0\\) in \\((0,4)\\): the range of \\(c\\)?", answer: "\\(0<c\\le4\\)" },
        { prompt: "\\(x^2-3x+c=0\\) has one root in \\((0,1)\\) and one in \\((2,3)\\) when?", answer: "\\(0<c<2\\)" },
      ],
      pyqExampleId: "cd89fce7-42ab-400b-86ee-85956a619683", // 2026 — two positive roots: discriminant, sum and product
      traps: [
        {
          title: "The vertex condition is not optional",
          body: "\\(D\\ge0\\) and \\(f(k)>0\\) hold both when the two roots are above \\(k\\) and when both are below it. Only the vertex \\(-\\frac{b}{2a}\\) tells which side.",
        },
      ],
    },
  ],
};
