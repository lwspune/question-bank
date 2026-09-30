import type { SubtopicNote } from "@/app/notes/_types";

export const PRODUCTS_BIN_NOTE: SubtopicNote = {
  subtopicName: "Products and Multinomial Expansions",
  title: "Products and Multinomial Expansions",
  oneLineDefinition:
    "Finding a coefficient when the expression is a product of a polynomial and a binomial, a product of two binomials, or a power of a three-term bracket.",
  whyItMatters:
    "Nineteen PYQs, nine of them numerical answer. For a product, a coefficient is a short sum of products of coefficients. For a three-term bracket, either factor it into something simpler or use the multinomial term. Two ideas cover the page.",
  concepts: [
    // C1 — products
    {
      kind: "formula" as const,
      slug: "jbin-product",
      name: "Coefficients in a product",
      intuition:
        "The coefficient of \\(x^k\\) in \\(P(x)\\,(1+x)^n\\) collects one term from each factor whose powers add to \\(k\\). With a short polynomial in front, that is two or three terms. For \\((1+x)^p(1-x)^q\\), the coefficient of \\(x\\) is \\(p-q\\) and of \\(x^2\\) is \\(\\frac{(p-q)^2-(p+q)}{2}\\), which solves most such questions at once.",
      definition:
        "- \\([x^k]\\,(a_0+a_1x+a_2x^2)(1+x)^n=a_0\\binom nk+a_1\\binom n{k-1}+a_2\\binom n{k-2}\\).\n" +
        "- \\((1+x)^p(1-x)^q\\): \\([x]=p-q\\), \\([x^2]=\\frac{(p-q)^2-(p+q)}{2}\\).\n" +
        "- Rewrite first when it helps: \\(\\left(1+\\frac3x+\\frac3{x^2}+\\frac1{x^3}\\right)^{5}=\\left(1+\\frac1x\\right)^{15}\\).",
      formula: {
        label: "Two factors",
        latex: "(1+x)^p(1-x)^q:\\quad[x]=p-q,\\quad[x^2]=\\tfrac{(p-q)^2-(p+q)}{2}",
      },
      authoredExample: {
        prompt: "Find the coefficient of \\(x^3\\) in \\((1+2x)(1+x)^{6}\\).",
        steps: [
          "\\(\\binom63+2\\binom62=20+30\\).",
        ],
        answer: "\\(50\\).",
      },
      selfCheckExample: {
        prompt: "In \\((1+x)^p(1-x)^q\\), the coefficients of \\(x\\) and \\(x^2\\) are 2 and \\(-3\\). Find \\(p\\) and \\(q\\).",
        steps: [
          "\\(p-q=2\\); \\(\\frac{4-(p+q)}{2}=-3\\Rightarrow p+q=10\\).",
        ],
        answer: "\\(p=6,\\ q=4\\).",
      },
      practiceSet: [
        { prompt: "\\([x^2]\\,(1-x)(1+x)^5\\)?", answer: "\\(10-5=5\\)" },
        { prompt: "\\([x]\\,(1+x)^5(1-x)^3\\)?", answer: "\\(2\\)" },
        { prompt: "\\(1+\\frac3x+\\frac3{x^2}+\\frac1{x^3}\\)?", answer: "\\(\\left(1+\\frac1x\\right)^3\\)" },
        { prompt: "\\([x^0]\\,(1+x)^4\\left(1+\\frac1x\\right)^4\\)?", answer: "\\(\\binom84=70\\)" },
      ],
      pyqExampleId: "9bff62d1-bcf3-4172-9ffb-b15f33c06c30", // 2023 — (1 + x)^p (1 - x)^q, coefficients 4 and -5
      traps: [
        {
          title: "Include every combination",
          body: "With a quadratic in front, the coefficient of \\(x^k\\) has three contributions, from \\(x^0\\), \\(x^1\\) and \\(x^2\\). Dropping the last one is the usual slip.",
        },
      ],
    },

    // C2 — multinomial and factor tricks
    {
      kind: "formula" as const,
      slug: "jbin-multinomial",
      name: "Three-term brackets",
      intuition:
        "First look for a factorisation: \\((1-x)(1+x+x^2)=1-x^3\\), so \\((1-x)^{n+1}(1+x+x^2)^n=(1-x)(1-x^3)^n\\), and only multiples of 3 survive. Otherwise use the multinomial term \\(\\frac{n!}{a!\\,b!\\,c!}p^aq^br^c\\) with \\(a+b+c=n\\), list the \\((a,b,c)\\) that give the required power, and add.",
      definition:
        "- \\((p+q+r)^n=\\sum\\frac{n!}{a!\\,b!\\,c!}p^aq^br^c\\), \\(a+b+c=n\\).\n" +
        "- \\((1-x)(1+x+x^2)=1-x^3\\); \\(1+x+x^2=(1-x)^2+3x\\).\n" +
        "- Two conditions (on \\(a+b+c\\) and on the power) leave one free index: list its values.",
      formula: {
        label: "Multinomial term",
        latex: "(p+q+r)^n:\\ \\ \\frac{n!}{a!\\,b!\\,c!}\\,p^a\\,q^b\\,r^c,\\quad a+b+c=n",
      },
      authoredExample: {
        prompt: "Find the coefficient of \\(x^4\\) in \\((1+x+x^2)^{3}\\).",
        steps: [
          "Powers \\(b+2c=4\\), \\(a+b+c=3\\): \\((a,b,c)=(0,2,1),(1,0,2)\\).",
          "\\(\\frac{3!}{0!\\,2!\\,1!}+\\frac{3!}{1!\\,0!\\,2!}=3+3\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Find the coefficient of \\(x^{6}\\) in \\((1-x)^{5}(1+x+x^2)^{4}\\).",
        steps: [
          "\\(=(1-x)(1-x^3)^4\\); \\(x^6\\) comes from \\(1\\cdot\\binom42x^6\\) only.",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "\\((1-x)(1+x+x^2)\\)?", answer: "\\(1-x^3\\)" },
        { prompt: "Number of terms in \\((a+b+c)^{4}\\)?", answer: "\\(\\binom62=15\\)" },
        { prompt: "\\([x]\\,(1+2x+x^2)^{5}\\)?", answer: "\\(10\\)" },
        { prompt: "\\([x^2]\\,(1+x+x^2)^{2}\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "e61682ca-3c3a-451d-9ba0-a6153de86de9", // 2023 — coefficient of x^7 in (1 - x + 2x^3)^10
      traps: [
        {
          title: "List every triple",
          body: "The two conditions usually allow several \\((a,b,c)\\). Write the free index's possible values in order before computing, so none is missed.",
        },
      ],
    },
  ],
};
