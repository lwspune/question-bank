import type { SubtopicNote } from "@/app/notes/_types";

export const INTEGER_FRACTIONAL_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integer and Fractional Parts of Binomial Expressions",
  title: "Integer & Fractional Parts of Binomial Expressions",
  oneLineDefinition:
    "When a surd like (a+√b)ⁿ is expanded, pairing it with its conjugate (a−√b)ⁿ makes the irrational parts cancel — turning a messy surd power into a clean integer plus a small fractional remainder.",
  whyItMatters:
    "8 PYQs, and they look intimidating until you know the one trick: add the conjugate. Then 'find the fractional part', 'is it an integer', 'find the inverse' all fall out of two facts — the conjugate product is small, and the conjugate sum is an integer.",
  concepts: [
    // 1 — conjugate integer trick
    {
      kind: "formula" as const,
      slug: "bt-conjugate-integer-trick",
      name: "The Conjugate Trick — Irrational Parts Cancel",
      pyqExampleId: "ccfaea88-a2d2-41de-8ffd-641bc7e50139",
      intuition:
        "Expanding (a+√b)ⁿ gives some rational terms and some terms carrying √b. Expanding the conjugate (a−√b)ⁿ gives the SAME terms but with the √b ones flipped in sign. Add them and every √b term cancels — so the sum is a pure integer. Their product is even simpler.",
      definition:
        "For integers \\(a, b\\) with \\(b\\) not a perfect square:\n" +
        "- **Sum is an integer:** \\((a+\\sqrt{b})^n + (a-\\sqrt{b})^n = 2\\!\\!\\sum_{r\\text{ even}}\\!\\!\\binom{n}{r} a^{\\,n-r} b^{\\,r/2}\\) — all the odd (irrational) terms cancel, leaving an even integer.\n" +
        "- **Product is small:** \\((a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b\\), so \\((a+\\sqrt{b})^n (a-\\sqrt{b})^n = (a^2-b)^n\\). When \\(a^2 - b = 1\\) the product is exactly \\(1\\).\n" +
        "- Since \\(0 < a-\\sqrt{b} < 1\\) (when \\(a^2-b=1\\) and \\(a>1\\)), the conjugate power \\((a-\\sqrt{b})^n\\) is a small positive number less than 1.",
      formula: {
        label: "Conjugate sum & product",
        latex: "(a+\\sqrt{b})^n + (a-\\sqrt{b})^n \\in \\mathbb{Z}, \\qquad (a+\\sqrt{b})^n(a-\\sqrt{b})^n = (a^2-b)^n",
      },
      authoredExample: {
        prompt: "If \\(k < (\\sqrt{2}+1)^3 < k+2\\) for a natural number \\(k\\), find \\(k\\).",
        steps: [
          "Expand by the binomial theorem: \\((\\sqrt2+1)^3 = 2\\sqrt2 + 3(2) + 3\\sqrt2 + 1 = 5 + 7\\sqrt2\\).",
          "Numerically \\(7\\sqrt2 \\approx 9.90\\), so \\((\\sqrt2+1)^3 \\approx 14.90\\).",
          "Then \\(k < 14.90 < k+2\\) with \\(k\\) a natural number gives \\(k = 13\\).",
        ],
        answer: "\\(k = 13\\).",
      },
      traps: [
        {
          title: "Add the conjugate — don't expand the whole thing",
          body:
            "Trying to expand \\((a+\\sqrt b)^{20}\\) term by term is hopeless. The intended move is always to bring in \\((a-\\sqrt b)^n\\): its sum is an integer and its product is \\((a^2-b)^n\\).",
        },
      ],
    },

    // 2 — fractional part (set S1: the (sqrt2+1)^10 family)
    {
      kind: "formula" as const,
      slug: "bt-fractional-part",
      name: "Integer Part + Fractional Part",
      pyqExampleId: "3ce59b1b-5134-4af4-97de-17a2ec19f615",
      intuition:
        "Write the big surd power as its integer part I plus a fractional part f (with 0 ≤ f < 1). The small conjugate power f′ = (a−√b)ⁿ is itself between 0 and 1. Because I + f + f′ is a whole integer and f + f′ is squeezed strictly between 0 and 2, f + f′ must equal exactly 1.",
      definition:
        "Let \\(N = (a+\\sqrt{b})^n = I + f\\) with integer part \\(I\\) and \\(0 \\le f < 1\\), and let \\(f' = (a-\\sqrt{b})^n\\) with \\(0 < f' < 1\\) (taking \\(a^2-b=1,\\ a>1\\)). From the conjugate trick \\(N + f' = I + f + f'\\) is an integer, so:\n" +
        "- \\(f + f' = 1\\) (since it is an integer strictly between 0 and 2).\n" +
        "- The integer part is \\(I = N + f' - 1\\); the **fractional part of \\(N\\) is \\(f = 1 - f'\\)**.\n" +
        "- Products like \\(N \\cdot f' = (a^2-b)^n\\) give relations such as \\(I\\cdot f' = (a^2-b)^n - f f'\\), pinning quantities like \\(uv\\) into \\((0,1)\\).",
      formula: {
        label: "Fractional parts add to 1",
        latex: "f + f' = 1, \\qquad f' = (a-\\sqrt{b})^n",
      },
      authoredExample: {
        prompt: "For \\((\\sqrt{2}+1)^{10} = u + f\\) (\\(u\\) integer, \\(0\\le f<1\\)) and \\(v = (\\sqrt{2}-1)^{10}\\), show \\(f + v = 1\\).",
        steps: [
          "By the conjugate trick \\((\\sqrt2+1)^{10} + (\\sqrt2-1)^{10}\\) is an integer, i.e. \\(u + f + v \\in \\mathbb{Z}\\).",
          "Since \\(u\\) is an integer, \\(f + v\\) is an integer.",
          "But \\(0 \\le f < 1\\) and \\(0 < v < 1\\), so \\(0 < f + v < 2\\) — the only integer there is 1.",
        ],
        answer: "\\(f + v = 1\\).",
      },
      traps: [
        {
          title: "The conjugate power IS the missing fractional part",
          body:
            "\\(f' = (a-\\sqrt b)^n\\) is not just \"small\" — it is exactly \\(1 - f\\). Treating \\(f'\\) as negligible or zero loses the relation \\(f + f' = 1\\) the question is built on.",
        },
      ],
    },
  ],
};
