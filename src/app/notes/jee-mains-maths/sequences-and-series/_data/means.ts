import type { SubtopicNote } from "@/app/notes/_types";

export const MEANS_SEQ_NOTE: SubtopicNote = {
  subtopicName: "AP and GP Conditions, Means and AM-GM",
  title: "AP and GP Conditions, Means and AM–GM",
  oneLineDefinition:
    "Turning 'in AP', 'in GP' and 'in HP' into equations, the arithmetic, geometric and harmonic means of two numbers, and the AM–GM inequality for maxima and minima.",
  whyItMatters:
    "Twenty-five PYQs. Two thirds state that numbers are in AP, GP or HP, often one set in AP and a changed set in GP, and ask for the numbers. The rest use the means of two numbers or find a least or greatest value by AM–GM. Three ideas cover the page.",
  concepts: [
    // C1 — conditions
    {
      kind: "formula" as const,
      slug: "jseq-conditions",
      name: "Turning 'in AP', 'in GP' and 'in HP' into equations",
      intuition:
        "Three numbers \\(a,b,c\\) are in AP when \\(2b=a+c\\), in GP when \\(b^2=ac\\), and in HP when their reciprocals are in AP, \\(b=\\frac{2ac}{a+c}\\). Logarithms in AP mean the numbers are in GP. When one set is in AP and a shifted set is in GP, write the AP with one unknown \\(d\\) and put the shifted terms into \\(b^2=ac\\): one quadratic in \\(d\\).",
      definition:
        "- **AP:** \\(2b=a+c\\). **GP:** \\(b^2=ac\\). **HP:** \\(\\frac2b=\\frac1a+\\frac1c\\).\n" +
        "- \\(\\log a,\\log b,\\log c\\) in AP \\(\\iff a,b,c\\) in GP.\n" +
        "- **AP then shifted GP:** write \\(a,a+d,a+2d\\), shift, and apply \\(b^2=ac\\).\n" +
        "- Reject a root that makes a GP term zero.",
      formula: {
        label: "Three conditions",
        latex: "2b=a+c,\\qquad b^2=ac,\\qquad b=\\frac{2ac}{a+c}",
      },
      authoredExample: {
        prompt: "\\(1,a,b\\) are in AP and \\(1,a-2,b-3\\) are in GP. Find \\(a\\) and \\(b\\).",
        steps: [
          "\\(a=1+d\\), \\(b=1+2d\\): \\((d-1)^2=2d-2\\), so \\(d^2-4d+3=0\\), \\(d=1\\) or \\(3\\).",
          "\\(d=1\\) makes the GP \\(1,0,0\\): reject it.",
        ],
        answer: "\\(a=4\\), \\(b=7\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\ln a,\\ln b,\\ln c\\) are in AP with \\(a=2\\), \\(c=18\\). Find \\(b\\).",
        steps: [
          "\\(a,b,c\\) are in GP: \\(b^2=36\\).",
        ],
        answer: "\\(b=6\\).",
      },
      practiceSet: [
        { prompt: "\\(x,6,9\\) in HP. \\(x\\)?", answer: "\\(\\frac92\\)" },
        { prompt: "\\(a,b,c\\) in GP. Then \\(\\log a,\\log b,\\log c\\) are in?", answer: "AP" },
        { prompt: "\\(2^a,2^b,2^c\\) in GP. Then \\(a,b,c\\) are in?", answer: "AP" },
        { prompt: "\\(3,x,12\\) in GP, \\(x>0\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "4d16c16e-2247-4734-8386-0eeced50b647", // 2024 — 3,a,b,c in AP and 3,a-1,b+1,c+9 in GP
      traps: [
        {
          title: "A zero term is not a GP",
          body: "A root that makes any GP term zero, or the ratio undefined, must be rejected even though it satisfies \\(b^2=ac\\).",
        },
      ],
    },

    // C2 — AM, GM, HM
    {
      kind: "formula" as const,
      slug: "jseq-means-inserted",
      name: "AM, GM and HM of two numbers, and means inserted between them",
      intuition:
        "For positive \\(a,b\\): \\(A=\\frac{a+b}2\\), \\(G=\\sqrt{ab}\\), \\(H=\\frac{2ab}{a+b}\\). Always \\(A\\ge G\\ge H\\), and \\(G^2=AH\\). Inserting \\(n\\) arithmetic means makes an AP of \\(n+2\\) terms, so the means add to \\(n\\) times the single AM. Inserting \\(n\\) geometric means makes a GP, so their product is \\(G^n\\).",
      definition:
        "- \\(A=\\frac{a+b}2\\), \\(G=\\sqrt{ab}\\), \\(H=\\frac{2ab}{a+b}\\); \\(A\\ge G\\ge H\\), \\(G^2=AH\\).\n" +
        "- \\(a,b\\) are the roots of \\(x^2-2Ax+G^2=0\\).\n" +
        "- **\\(n\\) AMs** add to \\(n\\cdot\\frac{a+b}2\\). **\\(n\\) GMs** multiply to \\((\\sqrt{ab})^n\\); their ratio is \\(\\left(\\frac ba\\right)^{1/(n+1)}\\).",
      formula: {
        label: "The three means",
        latex: "A\\ge G\\ge H,\\qquad G^2=A\\,H",
      },
      authoredExample: {
        prompt: "Find the three means of 4 and 16.",
        steps: [
          "\\(A=10\\), \\(G=8\\), \\(H=\\frac{128}{20}\\).",
          "Check: \\(G^2=64=10\\cdot6.4\\).",
        ],
        answer: "\\(A=10\\), \\(G=8\\), \\(H=6.4\\).",
      },
      selfCheckExample: {
        prompt: "Insert 3 geometric means between 2 and 32.",
        steps: [
          "\\(r^4=16\\), \\(r=2\\).",
        ],
        answer: "\\(4,8,16\\) (product \\(8^3\\)).",
      },
      practiceSet: [
        { prompt: "Sum of 5 AMs between 3 and 17?", answer: "\\(50\\)" },
        { prompt: "\\(A=5\\), \\(G=4\\). \\(H\\)?", answer: "\\(\\frac{16}5\\)" },
        { prompt: "\\(A=5\\), \\(G=4\\). The two numbers?", answer: "\\(2\\) and \\(8\\)" },
        { prompt: "Product of 4 GMs between 1 and 64?", answer: "\\(8^4=4096\\)" },
      ],
      pyqExampleId: "5db1c260-0494-4ebc-b4da-28354c6befc1", // 2023 — two AMs and three GMs of two numbers, an identity
      traps: [
        {
          title: "The larger root is the AM",
          body: "When the AM and GM are given as the roots of a quadratic, the larger root is the AM, because \\(A\\ge G\\).",
        },
      ],
    },

    // C3 — AM-GM for extremes
    {
      kind: "formula" as const,
      slug: "jseq-am-gm",
      name: "Least and greatest values by AM–GM",
      intuition:
        "For positive numbers, the average is at least the geometric mean, with equality only when all are equal. To make a sum such as \\(px+qy\\) least while \\(x^ay^b\\) is fixed, split \\(px\\) into \\(a\\) equal pieces and \\(qy\\) into \\(b\\) equal pieces, so the product of the pieces is a fixed number. The same split finds the greatest product under a fixed sum. Comparisons of powers, like \\(11^n\\) against \\(10^n+9^n\\), go by dividing through and checking small \\(n\\).",
      definition:
        "- \\(\\frac{x_1+\\dots+x_n}{n}\\ge\\sqrt[n]{x_1x_2\\cdots x_n}\\), all \\(x_i>0\\).\n" +
        "- **Equality** when all \\(x_i\\) are equal: this gives the point where the extreme occurs.\n" +
        "- **Split to match the powers:** for \\(x^ay^b\\) fixed, use \\(a\\) copies of \\(\\frac{px}{a}\\) and \\(b\\) copies of \\(\\frac{qy}{b}\\).",
      formula: {
        label: "AM–GM",
        latex: "\\frac{x_1+x_2+\\dots+x_n}{n}\\ge\\left(x_1x_2\\cdots x_n\\right)^{1/n}",
      },
      authoredExample: {
        prompt: "\\(x,y>0\\) and \\(xy^2=32\\). Find the least value of \\(x+y\\).",
        steps: [
          "\\(x+\\frac y2+\\frac y2\\ge3\\left(\\frac{xy^2}{4}\\right)^{1/3}=3\\cdot2\\).",
          "Equality at \\(x=\\frac y2\\): \\(x=2\\), \\(y=4\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "\\(a,b>0\\) and \\(a+b=6\\). Find the greatest value of \\(a^2b\\).",
        steps: [
          "\\(\\frac a2+\\frac a2+b=6\\ge3\\left(\\frac{a^2b}4\\right)^{1/3}\\), so \\(a^2b\\le32\\).",
          "Equality at \\(\\frac a2=b\\): \\(a=4\\), \\(b=2\\).",
        ],
        answer: "\\(32\\).",
      },
      practiceSet: [
        { prompt: "Least value of \\(x+\\frac1x\\), \\(x>0\\)?", answer: "\\(2\\)" },
        { prompt: "Least value of \\(4x+\\frac9x\\), \\(x>0\\)?", answer: "\\(12\\)" },
        { prompt: "Greatest \\(xy\\) with \\(x+y=10\\)?", answer: "\\(25\\)" },
        { prompt: "Least value of \\(\\tan^2\\theta+4\\cot^2\\theta\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "3347f70c-2736-40db-9a89-80d3ac9e8985", // 2022 — x^3y^2 = 2^15, least value of 3x + 2y
      traps: [
        {
          title: "Check the equality case",
          body: "AM–GM gives a bound, and the bound is the answer only if the equal-pieces point is allowed: positive, and inside any stated range.",
        },
      ],
    },
  ],
};
