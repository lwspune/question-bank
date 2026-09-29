import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_RATIO_NOTE: SubtopicNote = {
  subtopicName: "Ratio and Proportion",
  title: "Combining and Dividing by Ratios",
  oneLineDefinition:
    "Chain ratios through a common term, and divide a quantity in a ratio by finding the value of one part.",
  whyItMatters:
    "Sixteen PYQs, almost all MODERATE or EASY. Two skills do the work: scaling ratios so the shared term matches (A : B and B : C into A : B : C), and splitting a total once you know how many parts it has. Wills and inheritance chains are the same skill written as a story.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-combine-ratios",
      name: "Chaining ratios",
      intuition:
        "\\(A : B\\) and \\(B : C\\) can only be joined when \\(B\\) has the same number in both. Scale each ratio so the shared term matches, then read off \\(A : B : C\\).",
      definition:
        "- To join \\(A : B = p : q\\) and \\(B : C = r : s\\), write \\(A : B : C = pr : qr : qs\\).\n" +
        "- Chains of fractions multiply: \\(\\dfrac ad = \\dfrac ab\\cdot\\dfrac bc\\cdot\\dfrac cd\\).\n" +
        "- Pairwise sums in a ratio: if \\((a + b) : (b + c) : (c + a) = p : q : r\\), all the parts together stand for \\(2(a + b + c)\\).\n" +
        "- Fractions of fractions ('half of one-third'): multiply them.",
      formula: {
        label: "Joining two ratios",
        latex: "A : B = p : q,\\ B : C = r : s \\;\\Rightarrow\\; A : B : C = pr : qr : qs",
      },
      authoredExample: {
        prompt: "If \\(A : B = 2 : 3\\) and \\(B : C = 4 : 7\\), find \\(A : B : C\\) and \\(A : C\\).",
        steps: ["Make \\(B\\) equal: \\(2 : 3 = 8 : 12\\) and \\(4 : 7 = 12 : 21\\).", "So \\(A : B : C = 8 : 12 : 21\\)."],
        answer: "\\(8 : 12 : 21\\); \\(A : C = 8 : 21\\).",
      },
      selfCheckExample: {
        prompt: "If \\((a + b) : (b + c) : (c + a) = 4 : 6 : 8\\) and \\(a + b + c = 18\\), find \\(b\\).",
        steps: [
          "The \\(18\\) parts stand for \\(2(a + b + c) = 36\\), so one part is \\(2\\).",
          "\\(c + a = 8\\times 2 = 16\\), so \\(b = 18 - 16\\).",
        ],
        answer: "\\(b = 2\\).",
      },
      practiceSet: [
        { prompt: "\\(A : B = 1 : 2\\), \\(B : C = 3 : 4\\). \\(A : C\\)?", answer: "\\(3 : 8\\)" },
        { prompt: "\\(\\dfrac ab = 2\\), \\(\\dfrac bc = 3\\). \\(\\dfrac ac\\)?", answer: "\\(6\\)" },
        { prompt: "\\(x : y = 3 : 5\\), \\(y : z = 2 : 3\\). \\(x : y : z\\)?", answer: "\\(6 : 10 : 15\\)" },
        { prompt: "\\(a = 2b\\), \\(b = 3c\\). \\(a : c\\)?", answer: "\\(6 : 1\\)" },
      ],
      pyqExampleId: "2f294607-9324-4102-83dc-848aafc8cad5", // 2018 (I) — A : B, B : C, C : D, D : E; find B : E
      traps: [
        {
          title: "Scale, do not add",
          body:
            "Joining \\(2 : 3\\) and \\(4 : 5\\) as \\(2 : 7 : 5\\) is wrong. Multiply each ratio so the shared term is the same number: \\(8 : 12 : 15\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsra-divide-in-ratio",
      name: "Dividing a quantity in a ratio",
      intuition:
        "Dividing in the ratio \\(p : q : r\\) cuts the total into \\(p + q + r\\) equal parts. Find one part, then multiply. When shares are described as multiples of one another, name the smallest share and add everything up.",
      definition:
        "- The share of \\(p\\) when \\(T\\) is split \\(p : q : r\\) is \\(\\dfrac{p}{p + q + r}\\,T\\).\n" +
        "- Ratios given as fractions \\(\\tfrac12 : \\tfrac13 : \\tfrac14\\): multiply by the LCM of the denominators first (\\(6 : 4 : 3\\)).\n" +
        "- Two numbers in the ratio \\(m : n\\) are \\(mk\\) and \\(nk\\); a product or sum of squares then fixes \\(k\\).\n" +
        "- 'Each son gets twice a daughter, each daughter as much as the mother': call the mother's share \\(w\\) and count.",
      formula: {
        label: "Share in a ratio",
        latex: "\\text{share} = \\dfrac{p}{p + q + r}\\times T",
      },
      authoredExample: {
        prompt: "Rs. 6,300 is left to a widow, three sons and two daughters. Each son gets twice a daughter, and each daughter gets as much as the widow. Find a son's share.",
        steps: [
          "Let the widow get \\(w\\): each daughter \\(w\\), each son \\(2w\\).",
          "Total \\(w + 2w + 3\\times 2w = 9w = 6300\\), so \\(w = 700\\).",
        ],
        answer: "Rs. \\(1{,}400\\).",
      },
      selfCheckExample: {
        prompt: "Divide \\(91\\) in the ratio \\(\\dfrac12 : \\dfrac13 : \\dfrac14\\).",
        steps: ["Multiply by \\(12\\): \\(6 : 4 : 3\\), which is \\(13\\) parts of \\(7\\) each."],
        answer: "\\(42\\), \\(28\\), \\(21\\).",
      },
      practiceSet: [
        { prompt: "Divide \\(90\\) in the ratio \\(2 : 3 : 4\\). Largest share?", answer: "\\(40\\)" },
        { prompt: "Two numbers in the ratio \\(2 : 5\\) with product \\(160\\). The numbers?", answer: "\\(8\\) and \\(20\\)" },
        { prompt: "Numbers in the ratio \\(1 : 2 : 2\\), squares add to \\(81\\). Sum?", answer: "\\(15\\)" },
        { prompt: "\\(1 : \\tfrac12 : \\tfrac13\\) with whole numbers?", answer: "\\(6 : 3 : 2\\)" },
      ],
      pyqExampleId: "60ff8011-e878-49aa-9331-3b9d1e5f32d5", // 2021 (II) — ratio 2 : 3 : 5, sum of squares 1368
      traps: [
        {
          title: "Answer the share that was asked",
          body:
            "When amounts are deducted before a ratio applies, the share asked for is the amount BEFORE the deduction. Solving for the reduced amount and stopping there gives a number that looks right but is not the share.",
        },
      ],
    },
  ],
};
