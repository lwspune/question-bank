import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_PROPORTION_NOTE: SubtopicNote = {
  subtopicName: "Proportionals",
  title: "Proportion: Fourth, Third and Mean Proportionals",
  oneLineDefinition:
    "Four numbers are in proportion when the first two make the same ratio as the last two; from that one equation come the fourth, third and mean proportionals.",
  whyItMatters:
    "The largest page in the chapter's practice bank, and nearly all of it is one of three formulas: the fourth proportional bc/a, the third proportional b²/a, or the mean proportional √(ab). Learn which is which and most of these questions take one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-fourth-proportional",
      name: "Four numbers in proportion, and the fourth proportional",
      intuition:
        "\\(a, b, c, d\\) are in proportion when \\(a : b = c : d\\). Cross-multiplying turns that into one equation: the product of the outer two equals the product of the inner two. Every question on this concept is that equation.",
      definition:
        "- \\(a : b :: c : d\\) means \\(\\dfrac ab = \\dfrac cd\\), so \\(ad = bc\\). \\(a\\) and \\(d\\) are the **extremes**, \\(b\\) and \\(c\\) the **means**.\n" +
        "- The **fourth proportional** to \\(a, b, c\\) is \\(d = \\dfrac{bc}{a}\\).\n" +
        "- 'What must be added to each number to make them proportional?': add \\(x\\) to all four and solve \\((a + x)(d + x) = (b + x)(c + x)\\). The \\(x^2\\) terms cancel.\n" +
        "- Letters work the same way: the fourth proportional to \\(p, q, r\\) is \\(\\dfrac{qr}{p}\\).",
      formula: {
        label: "Product of extremes equals product of means",
        latex: "a : b :: c : d \\;\\text{means}\\; ad = bc, \\qquad d = \\dfrac{bc}{a}",
      },
      authoredExample: {
        prompt: "Find the fourth proportional to 5, 12 and 20.",
        steps: ["\\(5 : 12 = 20 : d\\).", "\\(d = \\dfrac{12 \\times 20}{5} = 48\\)."],
        answer: "\\(48\\).",
      },
      selfCheckExample: {
        prompt: "What number must be added to each of 3, 7, 11 and 23 so that they are in proportion?",
        steps: [
          "\\((3 + x)(23 + x) = (7 + x)(11 + x)\\).",
          "The \\(x^2\\) terms cancel: \\(69 + 26x = 77 + 18x\\).",
          "\\(8x = 8\\), so \\(x = 1\\). Check: \\(4 : 8 = 12 : 24\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Find the fourth proportional to 2, 9 and 6.", answer: "\\(27\\)" },
        { prompt: "If 4, 10, \\(x\\) and 25 are in proportion, find \\(x\\).", answer: "\\(10\\)" },
        { prompt: "Find the fourth proportional to 1.5, 4.5 and 6.", answer: "\\(18\\)" },
        { prompt: "If \\(x\\), 9, 12 and \\(y\\) are in proportion, find \\(xy\\).", answer: "\\(108\\)" },
      ],
      pyqExampleId: "c28f5ed8-bdb6-422c-b423-98a08c18ba38",
      traps: [
        {
          title: "Extremes times extremes",
          body: "In \\(a : b :: c : d\\) the test is \\(a \\times d = b \\times c\\). Multiplying \\(a \\times c\\), the first terms of each ratio, tests nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-third-proportional",
      name: "Third proportional",
      intuition:
        "The third proportional to \\(a\\) and \\(b\\) is the number \\(c\\) that continues the pattern \\(a : b = b : c\\). The middle number is used twice.",
      definition:
        "- \\(c\\) is the **third proportional** to \\(a\\) and \\(b\\) when \\(a : b = b : c\\), so \\(c = \\dfrac{b^2}{a}\\).\n" +
        "- Order matters: the third proportional to 2 and 6 is 18, but to 6 and 2 it is \\(\\tfrac 23\\).\n" +
        "- Given \\(c\\) and \\(a\\), find \\(b\\) from \\(b^2 = ac\\).",
      formula: {
        label: "Third proportional",
        latex: "a : b = b : c \\;\\Rightarrow\\; c = \\dfrac{b^2}{a}",
      },
      authoredExample: {
        prompt: "Find the third proportional to 16 and 20.",
        steps: ["\\(16 : 20 = 20 : c\\).", "\\(c = \\dfrac{20^2}{16} = \\dfrac{400}{16} = 25\\)."],
        answer: "\\(25\\).",
      },
      selfCheckExample: {
        prompt: "49 is the third proportional to 9 and \\(x\\), with \\(x > 0\\). Find \\(x\\).",
        steps: ["\\(9 : x = x : 49\\), so \\(x^2 = 9 \\times 49 = 441\\).", "\\(x = 21\\)."],
        answer: "\\(21\\).",
      },
      practiceSet: [
        { prompt: "Find the third proportional to 5 and 10.", answer: "\\(20\\)" },
        { prompt: "Find the third proportional to 0.4 and 1.2.", answer: "\\(3.6\\)" },
        { prompt: "Find the third proportional to 3 and 9.", answer: "\\(27\\)" },
        { prompt: "Find the third proportional to \\(x\\) and \\(x^2\\).", answer: "\\(x^3\\)" },
      ],
      pyqExampleId: "2497d3d7-ff7c-4551-ab57-7260de11952b",
      traps: [
        {
          title: "Square the second number, not the first",
          body: "The third proportional to 25 and 30 is \\(\\dfrac{30^2}{25} = 36\\). \\(\\dfrac{25^2}{30}\\) is the third proportional to 30 and 25, the other way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-mean-proportional",
      name: "Mean proportional",
      intuition:
        "The mean proportional between \\(a\\) and \\(b\\) is the number in the middle of \\(a : x = x : b\\). It is the square root of their product.",
      definition:
        "- \\(x\\) is the **mean proportional** between \\(a\\) and \\(b\\) when \\(a : x = x : b\\), so \\(x = \\sqrt{ab}\\).\n" +
        "- For decimals and fractions, multiply first, then take the root: \\(\\sqrt{0.02 \\times 0.32} = \\sqrt{0.0064} = 0.08\\).\n" +
        "- Surds often multiply out to a whole number: \\((3 + \\sqrt 5)(3 - \\sqrt 5) = 4\\).\n" +
        "- Given the mean proportional \\(m\\) and one number \\(a\\), the other is \\(\\dfrac{m^2}{a}\\).",
      formula: {
        label: "Mean proportional",
        latex: "a : x = x : b \\;\\Rightarrow\\; x = \\sqrt{ab}",
      },
      authoredExample: {
        prompt: "Find the mean proportional between 12 and 75.",
        steps: ["\\(x = \\sqrt{12 \\times 75} = \\sqrt{900} = 30\\)."],
        answer: "\\(30\\).",
      },
      selfCheckExample: {
        prompt: "The mean proportional between 18 and a number is 24. Find the number.",
        steps: ["\\(18 \\times n = 24^2 = 576\\).", "\\(n = 576 \\div 18 = 32\\)."],
        answer: "\\(32\\).",
      },
      practiceSet: [
        { prompt: "Find the mean proportional between 4 and 25.", answer: "\\(10\\)" },
        { prompt: "Find the mean proportional between 0.2 and 0.45.", answer: "\\(0.3\\)" },
        { prompt: "Find the mean proportional between \\(\\tfrac 14\\) and \\(\\tfrac 19\\).", answer: "\\(\\tfrac 16\\)" },
        { prompt: "Find the mean proportional between \\(x^2 y\\) and \\(y\\) (all positive).", answer: "\\(xy\\)" },
      ],
      pyqExampleId: "f62ac17d-c557-4251-ae88-2d7808ee7a1d",
      traps: [
        {
          title: "A square root, not an average",
          body: "The mean proportional between 4 and 16 is \\(\\sqrt{4 \\times 16} = 8\\). Their ordinary average, 10, is a different number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-continued-proportion",
      name: "Continued proportion",
      intuition:
        "Three numbers \\(a, b, c\\) are in continued proportion when \\(a : b = b : c\\). Each is the one before times the same factor, so they form a geometric progression, and the middle one is the mean proportional of the outer two.",
      definition:
        "- \\(a, b, c\\) in continued proportion means \\(\\dfrac ab = \\dfrac bc\\), so \\(b^2 = ac\\).\n" +
        "- They form a **G.P.**: \\(a, ar, ar^2\\).\n" +
        "- Given \\(a : c\\), the middle term is the square root of the product: if \\(a : c = 1 : 9\\), then \\(a : b : c = 1 : 3 : 9\\).\n" +
        "- In an expression in \\(a, b, c\\), replace \\(b^2\\) by \\(ac\\). To check an answer quickly, try a G.P. such as 1, 2, 4.",
      formula: {
        label: "Continued proportion",
        latex: "a : b = b : c \\;\\text{means}\\; b^2 = ac",
      },
      authoredExample: {
        prompt: "\\(x, y, z\\) are in continued proportion and \\(x : z = 9 : 49\\). Find \\(x : y : z\\).",
        steps: [
          "Let \\(x = 9k\\) and \\(z = 49k\\). Then \\(y^2 = xz = 441k^2\\).",
          "So \\(y = 21k\\).",
        ],
        answer: "\\(9 : 21 : 49\\).",
      },
      selfCheckExample: {
        prompt: "The mean proportional of two numbers is 4 and their third proportional is 32. Find the numbers.",
        steps: [
          "With the numbers \\(a\\) and \\(b\\): \\(ab = 16\\) and \\(\\dfrac{b^2}{a} = 32\\).",
          "Multiply the two: \\(b^3 = 16 \\times 32 = 512\\), so \\(b = 8\\) and \\(a = 2\\).",
        ],
        answer: "2 and 8.",
      },
      practiceSet: [
        { prompt: "4, \\(x\\) and 36 are in continued proportion, \\(x > 0\\). Find \\(x\\).", answer: "\\(12\\)" },
        { prompt: "3, 6 and \\(c\\) are in continued proportion. Find \\(c\\).", answer: "\\(12\\)" },
        {
          prompt: "\\(a, b, c\\) are in continued proportion with \\(a : c = 1 : 16\\). Find \\(a : b : c\\).",
          answer: "\\(1 : 4 : 16\\)",
        },
        { prompt: "Are 2, 6 and 18 in continued proportion?", answer: "Yes", method: "\\(6^2 = 36 = 2 \\times 18\\)." },
      ],
      pyqExampleId: "48a878df-0c55-4b06-accd-21ac587123a5",
      traps: [
        {
          title: "Continued proportion is a G.P., not an A.P.",
          body: "In 4, 6, 9 the middle term passes \\(6^2 = 4 \\times 9\\). The test \\(p + r = 2q\\) is for an arithmetic progression and is a different condition.",
        },
      ],
    },
  ],
};
