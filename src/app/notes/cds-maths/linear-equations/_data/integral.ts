import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LE_INTEGRAL_NOTE: SubtopicNote = {
  subtopicName: "Integral Solutions and Diophantine Equations",
  title: "Whole-Number Solutions",
  oneLineDefinition:
    "An equation like 7a + 10b = 200 has only a few whole-number solutions; find one, then step to the others by the coefficients.",
  whyItMatters:
    "Five PYQs, three of them HARD — the densest HARD page in the chapter, because it needs counting as well as algebra. Most come down to divisibility (7a + 10b = 200 forces a to be a multiple of 10) or to factorising into a product that equals a small number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsle-integral",
      name: "Stepping through the solutions",
      intuition:
        "If \\(ax + by = c\\) has one whole-number solution, the next is found by adding \\(b\\) to \\(x\\) and taking \\(a\\) from \\(y\\) (for coprime \\(a, b\\)). So the solutions march in equal steps, and counting them is counting steps.",
      definition:
        "- \\(ax + by = c\\) with \\(\\gcd(a, b) = 1\\): from one solution \\((x_0, y_0)\\), all are \\(x = x_0 + bt\\), \\(y = y_0 - at\\).\n" +
        "- Divisibility first: in \\(5a + 7o = 500\\), \\(7o\\) is a multiple of \\(5\\), so \\(o\\) is.\n" +
        "- 'Positive' excludes \\(0\\); 'buys both' excludes \\(0\\) too.\n" +
        "- Positive solutions of \\(x + y + z = n\\): \\(\\binom{n - 1}{2}\\).\n" +
        "- Products: rearrange into \\((px - q)(py - r) = N\\) and list the factor pairs of \\(N\\).",
      formula: {
        label: "All solutions",
        latex: "x = x_0 + bt, \\quad y = y_0 - at",
      },
      authoredExample: {
        prompt: "How many ways can Rs. \\(100\\) be spent exactly on pens at Rs. \\(3\\) and notebooks at Rs. \\(8\\), buying at least one of each?",
        steps: ["\\(8b\\) must leave a multiple of \\(3\\): \\(b = 2, 5, 8, 11\\).", "\\(b = 11\\) needs \\(88\\), leaving \\(12\\): four pens."],
        answer: "\\(4\\) ways.",
      },
      selfCheckExample: {
        prompt: "How many positive-integer solutions has \\(x + y + z = 9\\)?",
        steps: ["\\(\\binom{8}{2}\\)."],
        answer: "\\(28\\).",
      },
      practiceSet: [
        { prompt: "\\(2x + 5y = 20\\), \\(x, y \\ge 0\\). Solutions?", answer: "\\(3\\)" },
        { prompt: "\\(x + y = 10\\), positive integers. Solutions?", answer: "\\(9\\)" },
        { prompt: "\\(3a + 4b = 24\\), \\(a, b \\ge 0\\). Most items \\(a + b\\)?", answer: "\\(8\\)" },
        { prompt: "\\((x - 1)(y - 1) = 6\\), positive integers. Pairs?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "2c32dd9c-acb9-45e6-b8eb-1749ed69b365", // 2017 (I) — Rs. 200 on sweets at Rs. 7 and Rs. 10
      traps: [
        {
          title: "Does zero count?",
          body:
            "'Buy both apples and oranges' rules out zero of either; 'non-negative' allows it. The count changes by one or two at each end, which is exactly the spread of the options.",
        },
      ],
    },
  ],
};
