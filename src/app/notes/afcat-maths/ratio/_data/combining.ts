import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_COMBINING_NOTE: SubtopicNote = {
  subtopicName: "Combining Ratios",
  title: "Joining, Compounding and Comparing Ratios",
  oneLineDefinition:
    "Join A : B and B : C through the shared term, turn equal multiples into a ratio, multiply ratios to compound them, and compare two ratios as fractions.",
  whyItMatters:
    "The hardest page in the chapter's practice bank: a third of its questions are HARD, almost all of them compound ratios written with fractions, roots or letters. The method never changes. Make each ratio one simple fraction, then multiply.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-common-term",
      name: "Joining ratios through a common term",
      intuition:
        "\\(A : B\\) and \\(B : C\\) can be joined only when \\(B\\) has the same number in both. Scale each ratio so the shared term matches, then read off \\(A : B : C\\).",
      definition:
        "- To join \\(A : B = p : q\\) and \\(B : C = r : s\\), scale to \\(A : B : C = pr : qr : qs\\). Making \\(B\\) the LCM of \\(q\\) and \\(r\\) keeps the numbers small.\n" +
        "- For \\(A : C\\) alone, multiply the fractions: \\(\\dfrac AC = \\dfrac AB \\times \\dfrac BC\\). A longer chain multiplies the same way.\n" +
        "- A chain that comes back to its start multiplies to 1: \\(\\dfrac xy \\cdot \\dfrac yz \\cdot \\dfrac zx = 1\\).\n" +
        "- Once you have \\(A : B : C\\), a total splits by finding one part: the total divided by the sum of the terms.",
      formula: {
        label: "Joining two ratios",
        latex: "A : B = p : q,\\ B : C = r : s \\;\\Rightarrow\\; A : B : C = pr : qr : qs",
      },
      authoredExample: {
        prompt:
          "If \\(P : Q = 3 : 4\\) and \\(Q : R = 6 : 7\\), find \\(P : Q : R\\). If the three numbers add up to 140, find \\(R\\).",
        steps: [
          "Make \\(Q\\) equal. The LCM of 4 and 6 is 12: \\(P : Q = 9 : 12\\) and \\(Q : R = 12 : 14\\).",
          "So \\(P : Q : R = 9 : 12 : 14\\), which is 35 parts.",
          "One part is \\(140 \\div 35 = 4\\), so \\(R = 14 \\times 4 = 56\\).",
        ],
        answer: "\\(9 : 12 : 14\\); \\(R = 56\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a : b = 4 : 5\\), \\(b : c = 2 : 3\\) and \\(c : d = 5 : 7\\), find \\(a : d\\).",
        steps: [
          "Multiply the fractions: \\(\\dfrac ad = \\dfrac 45 \\cdot \\dfrac 23 \\cdot \\dfrac 57 = \\dfrac{40}{105}\\).",
          "Divide by 5: \\(\\dfrac{8}{21}\\).",
        ],
        answer: "\\(8 : 21\\).",
      },
      practiceSet: [
        { prompt: "\\(A : B = 1 : 3\\) and \\(B : C = 2 : 5\\). Find \\(A : C\\).", answer: "\\(2 : 15\\)" },
        { prompt: "\\(x : y = 3 : 4\\) and \\(y : z = 6 : 5\\). Find \\(x : y : z\\).", answer: "\\(9 : 12 : 10\\)" },
        { prompt: "\\(\\dfrac ab = 3\\) and \\(\\dfrac bc = \\dfrac 12\\). Find \\(\\dfrac ac\\).", answer: "\\(\\dfrac 32\\)" },
        { prompt: "\\(m : n = 5 : 6\\) and \\(n : p = 3 : 2\\). Find \\(m : n : p\\).", answer: "\\(5 : 6 : 4\\)" },
      ],
      pyqExampleId: "3917fece-8ce1-4dea-b34c-27c2f91fd525",
      traps: [
        {
          title: "Scale, do not stitch",
          body: "Joining \\(2 : 3\\) and \\(4 : 5\\) as \\(2 : 3 : 5\\) is wrong: the shared term is 3 in one and 4 in the other. Make it equal first, which gives \\(8 : 12 : 15\\).",
        },
        {
          title: "Read which term comes first",
          body: "Given 'the ratio of the second to the third is \\(5 : 3\\)', the second number takes the 5. Writing it the other way round joins the wrong terms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-equal-multiples",
      name: "Ratios from equal multiples",
      intuition:
        "When \\(2A = 3B = 4C\\), set all three equal to a convenient number, usually the LCM of the multipliers, and read off \\(A\\), \\(B\\) and \\(C\\). The same works for \\(\\dfrac x4 = \\dfrac y6 = \\dfrac z9\\).",
      definition:
        "- \\(pA = qB = rC\\) gives \\(A : B : C = \\dfrac 1p : \\dfrac 1q : \\dfrac 1r\\). Clear the fractions by multiplying by the LCM of \\(p, q, r\\).\n" +
        "- \\(\\dfrac xa = \\dfrac yb = \\dfrac zc\\) gives \\(x : y : z = a : b : c\\) directly.\n" +
        "- Two separate statements, such as \\(2X = 3Y\\) and \\(4Y = 5Z\\), are two ratios with a shared term: join them as in the last concept.",
      formula: {
        label: "Equal multiples",
        latex: "pA = qB = rC \\;\\Rightarrow\\; A : B : C = \\tfrac 1p : \\tfrac 1q : \\tfrac 1r",
      },
      authoredExample: {
        prompt: "If \\(2A = 3B = 4C\\), find \\(A : B : C\\).",
        steps: [
          "Set each product equal to 12, the LCM of 2, 3 and 4.",
          "Then \\(A = 6\\), \\(B = 4\\) and \\(C = 3\\).",
        ],
        answer: "\\(6 : 4 : 3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(5X = 2Y\\) and \\(3Y = 4Z\\), find \\(X : Y : Z\\).",
        steps: [
          "\\(5X = 2Y\\) gives \\(X : Y = 2 : 5\\).",
          "\\(3Y = 4Z\\) gives \\(Y : Z = 4 : 3\\).",
          "Make \\(Y\\) equal (20): \\(X : Y : Z = 8 : 20 : 15\\).",
        ],
        answer: "\\(8 : 20 : 15\\).",
      },
      practiceSet: [
        { prompt: "\\(3A = 5B\\). Find \\(A : B\\).", answer: "\\(5 : 3\\)" },
        { prompt: "\\(\\dfrac x2 = \\dfrac y3 = \\dfrac z7\\). Find \\(x : y : z\\).", answer: "\\(2 : 3 : 7\\)" },
        { prompt: "\\(4P = 6Q = 3R\\). Find \\(P : Q : R\\).", answer: "\\(3 : 2 : 4\\)", method: "Set each equal to 12." },
        { prompt: "\\(\\dfrac A3 = \\dfrac B4\\) and \\(A + B = 21\\). Find \\(B\\).", answer: "\\(12\\)" },
      ],
      pyqExampleId: "5c6ecc6c-4833-444b-8f7d-19d49a3802c0",
      traps: [
        {
          title: "Equal multiples flip the ratio",
          body: "\\(3A = 5B\\) means \\(A : B = 5 : 3\\), not \\(3 : 5\\). The bigger multiplier goes with the smaller quantity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-compound-ratio",
      name: "Compound ratio: multiplying ratios",
      intuition:
        "The compound ratio of \\(a : b\\) and \\(c : d\\) is \\(ac : bd\\): multiply the first terms together and the second terms together, then simplify. It is what you get when two effects stack, such as the number of passengers and the fare each pays.",
      definition:
        "- The compound ratio of \\(a : b\\), \\(c : d\\) and \\(e : f\\) is \\(ace : bdf\\).\n" +
        "- Cancel before you multiply, so the numbers stay small.\n" +
        "- With fractions, turn each ratio into one fraction first (\\(\\tfrac 12 : \\tfrac 13 = \\tfrac 32\\)), then multiply.\n" +
        "- With roots or letters, simplify each ratio first (\\(\\sqrt 8 : \\sqrt{18} = 2 : 3\\)). Letters cancel like numbers.\n" +
        "- An amount is a count times a rate, so amounts are in the compound ratio of the counts and the rates.",
      formula: {
        label: "Compound ratio",
        latex: "(a : b),\\ (c : d) \\;\\Rightarrow\\; ac : bd",
      },
      authoredExample: {
        prompt: "Find the compound ratio of \\(3 : 4\\), \\(8 : 9\\) and \\(15 : 16\\).",
        steps: [
          "Multiply: \\(\\dfrac{3 \\times 8 \\times 15}{4 \\times 9 \\times 16} = \\dfrac{360}{576}\\).",
          "Divide both by 72: \\(\\dfrac 58\\).",
        ],
        answer: "\\(5 : 8\\).",
      },
      selfCheckExample: {
        prompt: "Find the compound ratio of \\(\\sqrt{12} : \\sqrt{27}\\) and \\(\\tfrac 23 : \\tfrac 59\\).",
        steps: [
          "\\(\\sqrt{12} : \\sqrt{27} = 2\\sqrt 3 : 3\\sqrt 3 = 2 : 3\\).",
          "\\(\\tfrac 23 : \\tfrac 59 = \\tfrac 23 \\times \\tfrac 95 = \\tfrac 65\\).",
          "Multiply: \\(\\tfrac 23 \\times \\tfrac 65 = \\tfrac 45\\).",
        ],
        answer: "\\(4 : 5\\).",
      },
      practiceSet: [
        { prompt: "Find the compound ratio of \\(2 : 3\\) and \\(9 : 4\\).", answer: "\\(3 : 2\\)" },
        { prompt: "Find the compound ratio of \\(1 : 2\\), \\(4 : 5\\) and \\(5 : 6\\).", answer: "\\(1 : 3\\)" },
        { prompt: "Find the compound ratio of \\(a : b\\) and \\(b^2 : a^2\\).", answer: "\\(b : a\\)" },
        {
          prompt: "Two shops employ workers in the ratio \\(3 : 5\\) and pay daily wages in the ratio \\(4 : 3\\). Find the ratio of their daily wage bills.",
          answer: "\\(4 : 5\\)",
          method: "\\(12 : 15\\).",
        },
      ],
      pyqExampleId: "62684cb9-9cac-4c27-b27a-e9b5571d20ee",
      traps: [
        {
          title: "Compounding multiplies, it does not add",
          body: "The compound ratio of \\(2 : 3\\) and \\(4 : 5\\) is \\(8 : 15\\). Adding the terms to get \\(6 : 8\\) has no meaning.",
        },
        {
          title: "A ratio of fractions is one division",
          body: "\\(\\tfrac 12 : \\tfrac 13\\) is \\(\\tfrac 12 \\div \\tfrac 13 = 3 : 2\\), not \\(1 : 1\\) (the numerators) or \\(2 : 3\\) (the denominators).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-missing-ratio",
      name: "Finding a missing ratio from a compound ratio",
      intuition:
        "When the compound ratio is known and every ratio but one is known, divide: the missing ratio is the compound ratio divided by the product of the others.",
      definition:
        "- If \\(\\dfrac ab \\times \\dfrac cd = \\dfrac mn\\), then \\(\\dfrac cd = \\dfrac mn \\div \\dfrac ab\\).\n" +
        "- With an unknown inside a term, write the product as one fraction equal to the given ratio and cross-multiply.\n" +
        "- The compound ratio of \\(x : y\\) and \\(y : z\\) is \\(x : z\\): the middle term cancels.",
      formula: {
        label: "The missing ratio",
        latex: "\\dfrac ab \\times \\dfrac cd = \\dfrac mn \\;\\Rightarrow\\; \\dfrac cd = \\dfrac mn \\div \\dfrac ab",
      },
      authoredExample: {
        prompt: "The compound ratio of \\(5 : 4\\) and \\(c : d\\) is \\(15 : 16\\). Find \\(c : d\\).",
        steps: ["\\(\\dfrac cd = \\dfrac{15}{16} \\div \\dfrac 54 = \\dfrac{15}{16} \\times \\dfrac 45 = \\dfrac 34\\)."],
        answer: "\\(3 : 4\\).",
      },
      selfCheckExample: {
        prompt: "The compound ratio of \\((x + 3) : 4\\) and \\(2 : (x - 1)\\) is \\(3 : 2\\). Find \\(x\\).",
        steps: [
          "As one fraction: \\(\\dfrac{2(x + 3)}{4(x - 1)} = \\dfrac 32\\).",
          "Cross-multiply: \\(4(x + 3) = 12(x - 1)\\), so \\(4x + 12 = 12x - 12\\).",
          "\\(8x = 24\\), so \\(x = 3\\).",
        ],
        answer: "\\(x = 3\\).",
      },
      practiceSet: [
        { prompt: "The compound ratio of \\(2 : 3\\) and \\(c : d\\) is \\(1 : 2\\). Find \\(c : d\\).", answer: "\\(3 : 4\\)" },
        {
          prompt: "\\(x : y = 4 : 3\\), and the compound ratio of \\(x : y\\) and \\(y : z\\) is \\(2 : 1\\). Find \\(y : z\\).",
          answer: "\\(3 : 2\\)",
        },
        { prompt: "The compound ratio of \\(a : 2\\) and \\(6 : b\\) is \\(3 : 1\\). Find \\(a : b\\).", answer: "\\(1 : 1\\)" },
        { prompt: "The compound ratio of \\(p : q\\) and \\(q : r\\) is \\(5 : 7\\). Find \\(p : r\\).", answer: "\\(5 : 7\\)" },
      ],
      pyqExampleId: "a084d253-b138-481f-aeb3-2da8d2a7471a",
      traps: [
        {
          title: "Divide, do not subtract",
          body: "If the compound ratio is \\(6 : 5\\) and one ratio is \\(3 : 2\\), the other is \\(\\tfrac 65 \\div \\tfrac 32 = 4 : 5\\). Subtracting the terms to get \\(3 : 3\\) is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-comparing-ratios",
      name: "Comparing two ratios",
      intuition:
        "To tell which ratio is larger, compare them as fractions: turn each into a decimal, or cross-multiply.",
      definition:
        "- For positive terms, \\(a : b > c : d\\) exactly when \\(ad > bc\\).\n" +
        "- For a list, decimals are quickest: \\(7 : 20 = 0.35\\).\n" +
        "- Or give them a common second term: \\(3 : 4 = 15 : 20\\) and \\(4 : 5 = 16 : 20\\), so \\(4 : 5\\) is larger.",
      formula: {
        label: "Cross-multiplication test",
        latex: "\\dfrac ab > \\dfrac cd \\;\\text{exactly when}\\; ad > bc \\quad (b, d > 0)",
      },
      authoredExample: {
        prompt: "Which is greater, \\(5 : 7\\) or \\(7 : 10\\)?",
        steps: ["Cross-multiply: \\(5 \\times 10 = 50\\) and \\(7 \\times 7 = 49\\).", "\\(50 > 49\\), so \\(5 : 7\\) is greater."],
        answer: "\\(5 : 7\\).",
      },
      selfCheckExample: {
        prompt: "Arrange \\(2 : 3\\), \\(3 : 5\\) and \\(5 : 8\\) from smallest to largest.",
        steps: ["As decimals: \\(0.667\\), \\(0.6\\) and \\(0.625\\)."],
        answer: "\\(3 : 5\\), \\(5 : 8\\), \\(2 : 3\\).",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(4 : 9\\) or \\(5 : 11\\)?", answer: "\\(5 : 11\\)", method: "\\(44 < 45\\)." },
        { prompt: "Is \\(13 : 20\\) more or less than \\(2 : 3\\)?", answer: "Less", method: "\\(0.65 < 0.667\\)." },
        { prompt: "Which is the smallest of \\(1 : 4\\), \\(3 : 10\\) and \\(2 : 9\\)?", answer: "\\(2 : 9\\)" },
      ],
      pyqExampleId: "33ea96eb-abed-4e0c-a4ab-5f15a3fa0975",
      traps: [
        {
          title: "Bigger terms are not a bigger ratio",
          body: "\\(17 : 30\\) has bigger terms than \\(2 : 3\\) but is the smaller ratio, \\(0.57\\) against \\(0.67\\). Compare values, not the size of the terms.",
        },
      ],
    },
  ],
};
