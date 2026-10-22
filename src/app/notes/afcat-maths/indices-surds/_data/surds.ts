import type { SubtopicNote } from "@/app/notes/_types";

export const AF_IS_SURDS_NOTE: SubtopicNote = {
  subtopicName: "Radicals and Surds",
  title: "Surds: Simplest Form, Adding, Multiplying and Dividing",
  oneLineDefinition:
    "Know what makes a root a surd, pull the largest square out of the root, combine like surds, and multiply or divide roots under one sign.",
  whyItMatters:
    "This is the biggest page of the chapter and the gentlest: only two of its questions are HARD. Nearly all of them come down to one move, taking the largest perfect square out of the root. Marks go when a smaller square is taken out and the answer is left half simplified, or when two unlike surds are added as if they were like.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afis-surd-kinds",
      name: "What a surd is: order, pure and mixed, like and unlike",
      intuition:
        "A surd is a root that does not come out exact. \\(\\sqrt{49}\\) is just 7, but \\(\\sqrt{7}\\) is a never-ending decimal, so it stays as a root. These few words are what the questions use to describe surds.",
      definition:
        "A root is a surd only when its value is irrational. Like surds are judged after each surd is in simplest form, which is the next concept on this page.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Surd", "A root whose value is not a whole number or a fraction", "\\(\\sqrt{7}\\), \\(\\sqrt[3]{10}\\); not \\(\\sqrt{64} = 8\\)"] },
          { cells: ["Order", "The index of the root", "\\(\\sqrt[3]{6}\\) has order 3; \\(\\sqrt{6}\\) has order 2"] },
          { cells: ["Pure surd", "The whole number sits under the root", "\\(\\sqrt{12}\\)"] },
          { cells: ["Mixed surd", "A rational number times a surd", "\\(2\\sqrt{3}\\)"] },
          {
            cells: ["Like surds", "The same number under the same root, once simplified", "\\(4\\sqrt{7}\\) and \\(9\\sqrt{7}\\); \\(\\sqrt{12}\\) and \\(\\sqrt{75}\\)"],
            noteAmber: "\\(\\sqrt{12} = 2\\sqrt 3\\) and \\(\\sqrt{75} = 5\\sqrt 3\\), so they are like surds even though they look different.",
          },
          {
            cells: ["Comparing", "Same order: the larger number under the root is larger", "\\(\\sqrt{6} < \\sqrt{7} < \\sqrt{11}\\)"],
            noteAmber: "Different orders: raise both to the LCM of the indices. \\(\\sqrt 2\\) and \\(\\sqrt[3]{3}\\) to the 6th power give 8 and 9, so \\(\\sqrt[3]{3}\\) is larger.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Are \\(\\sqrt{8}\\) and \\(\\sqrt{18}\\) like surds?",
        steps: ["\\(\\sqrt 8 = 2\\sqrt 2\\) and \\(\\sqrt{18} = 3\\sqrt 2\\). Both are multiples of \\(\\sqrt 2\\)."],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Which of \\(\\sqrt{36}\\), \\(\\sqrt{40}\\), \\(\\sqrt{49}\\) is a surd?", answer: "\\(\\sqrt{40}\\)" },
        { prompt: "What is the order of \\(\\sqrt[4]{11}\\)?", answer: "4" },
        { prompt: "Arrange \\(\\sqrt{10}\\), \\(\\sqrt{7}\\), \\(\\sqrt{13}\\) from smallest to largest.", answer: "\\(\\sqrt 7 < \\sqrt{10} < \\sqrt{13}\\)" },
        { prompt: "Are \\(3\\sqrt 2\\) and \\(2\\sqrt 3\\) like surds?", answer: "No: the numbers under the roots differ." },
      ],
      pyqExampleId: "697a7055-eef3-47d2-bde0-443f1cd66e34",
      traps: [
        {
          title: "The root of a perfect square is not a surd",
          body: "\\(\\sqrt{81} = 9\\) and \\(\\sqrt[3]{64} = 4\\) are rational. A root is a surd only when it does not come out exact.",
        },
        {
          title: "The order is the index, not the number inside",
          body: "\\(\\sqrt[3]{100}\\) is a surd of order 3. The 100 under the root has nothing to do with its order.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-simplest-form",
      name: "Simplest form: take out the largest square",
      intuition:
        "\\(\\sqrt{ab} = \\sqrt a \\times \\sqrt b\\), so a square factor inside the root can come out as a whole number. \\(\\sqrt{245} = \\sqrt{49 \\times 5}\\), and the 49 comes out as 7.",
      definition:
        "- **Pure to mixed:** split the number as (largest perfect square) × (the rest) and take the square root of the square.\n" +
        "- **Mixed to pure:** square the number outside and multiply it in: \\(k\\sqrt a = \\sqrt{k^2 a}\\).\n" +
        "- A surd is in simplest form when no square factor other than 1 is left under the root.\n" +
        "- **Decimals:** write the decimal as a fraction over a power of 10. \\(\\sqrt{0.0049} = \\sqrt{\\tfrac{49}{10000}} = \\tfrac{7}{100}\\). The answer has half as many decimal places.",
      formula: {
        label: "Taking a square out",
        latex: "\\sqrt{k^2 a} = k\\sqrt{a}",
      },
      authoredExample: {
        prompt: "Write \\(\\sqrt{245}\\) in simplest form.",
        steps: [
          "The largest square factor of 245 is 49: \\(245 = 49 \\times 5\\).",
          "\\(\\sqrt{49 \\times 5} = 7\\sqrt 5\\), and 5 has no square factor left.",
        ],
        answer: "\\(7\\sqrt 5\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(4\\sqrt 5\\) as a pure surd.",
        steps: ["\\(4\\sqrt 5 = \\sqrt{16} \\times \\sqrt 5 = \\sqrt{16 \\times 5}\\)."],
        answer: "\\(\\sqrt{80}\\).",
      },
      practiceSet: [
        { prompt: "Write \\(\\sqrt{200}\\) in simplest form.", answer: "\\(10\\sqrt 2\\)" },
        { prompt: "Write \\(\\sqrt{99}\\) in simplest form.", answer: "\\(3\\sqrt{11}\\)" },
        { prompt: "Write \\(2\\sqrt 7\\) as a pure surd.", answer: "\\(\\sqrt{28}\\)" },
        { prompt: "Find \\(\\sqrt{0.0049}\\).", answer: "\\(0.07\\)" },
      ],
      pyqExampleId: "e96f9ad4-c4fc-4c41-8feb-110abb812529",
      traps: [
        {
          title: "Take out the LARGEST square",
          body: "\\(\\sqrt{288} = \\sqrt{4 \\times 72} = 2\\sqrt{72}\\) is not finished, because 72 still holds a square. \\(288 = 144 \\times 2\\), so \\(\\sqrt{288} = 12\\sqrt 2\\).",
        },
        {
          title: "A decimal root halves the decimal places",
          body: "\\(\\sqrt{0.0004} = 0.02\\), not \\(0.2\\). Four decimal places under the root give two in the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-like-surds",
      name: "Adding and subtracting like surds",
      intuition:
        "\\(4\\sqrt 3 + 2\\sqrt 3\\) is 4 of something plus 2 of the same thing, so it is 6 of them: \\(6\\sqrt 3\\). Surds add like \\(4x + 2x\\). Unlike surds, like \\(x\\) and \\(y\\), cannot be joined.",
      definition:
        "- Put every surd in simplest form first.\n" +
        "- Add or subtract the numbers in front of the like surds; the root stays as it is.\n" +
        "- A number already in front multiplies whatever comes out of the root: \\(3\\sqrt 8 = 3 \\times 2\\sqrt 2 = 6\\sqrt 2\\).\n" +
        "- Unlike surds stay as separate terms.",
      formula: {
        label: "Like surds",
        latex: "m\\sqrt a + n\\sqrt a = (m + n)\\sqrt a",
      },
      authoredExample: {
        prompt: "Simplify \\(\\sqrt{20} + \\sqrt{80} - \\sqrt{45}\\).",
        steps: [
          "\\(\\sqrt{20} = 2\\sqrt 5\\), \\(\\sqrt{80} = 4\\sqrt 5\\), \\(\\sqrt{45} = 3\\sqrt 5\\).",
          "\\((2 + 4 - 3)\\sqrt 5 = 3\\sqrt 5\\).",
        ],
        answer: "\\(3\\sqrt 5\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(3\\sqrt 8 + 2\\sqrt{50}\\).",
        steps: [
          "\\(3\\sqrt 8 = 3 \\times 2\\sqrt 2 = 6\\sqrt 2\\) and \\(2\\sqrt{50} = 2 \\times 5\\sqrt 2 = 10\\sqrt 2\\).",
          "\\(6\\sqrt 2 + 10\\sqrt 2 = 16\\sqrt 2\\).",
        ],
        answer: "\\(16\\sqrt 2\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(4\\sqrt 7 + 6\\sqrt 7\\).", answer: "\\(10\\sqrt 7\\)" },
        { prompt: "Simplify \\(\\sqrt{75} - \\sqrt{48}\\).", answer: "\\(\\sqrt 3\\)" },
        { prompt: "Simplify \\(\\sqrt{28} + \\sqrt{63}\\).", answer: "\\(5\\sqrt 7\\)" },
        { prompt: "Simplify \\(5\\sqrt 2 + 3\\sqrt 3\\).", answer: "It cannot be simplified: the surds are unlike." },
      ],
      pyqExampleId: "0e3fa569-2c44-4d87-a106-35488e3e23ec",
      traps: [
        {
          title: "The root does not add",
          body: "\\(4\\sqrt 3 + 2\\sqrt 3 = 6\\sqrt 3\\), not \\(6\\sqrt 6\\). Only the numbers in front add.",
        },
        {
          title: "The square root of a sum is not the sum of the roots",
          body: "\\(\\sqrt 9 + \\sqrt{16} = 3 + 4 = 7\\), but \\(\\sqrt{9 + 16} = \\sqrt{25} = 5\\). Never add the numbers under two roots.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afis-multiply-divide",
      name: "Multiplying and dividing surds",
      intuition:
        "Roots of the same order multiply and divide under one root sign: \\(\\sqrt a \\times \\sqrt b = \\sqrt{ab}\\). The numbers outside the roots multiply among themselves, and the result is then put in simplest form.",
      definition:
        "- \\(\\sqrt a \\times \\sqrt b = \\sqrt{ab}\\) and \\(\\dfrac{\\sqrt a}{\\sqrt b} = \\sqrt{\\dfrac ab}\\).\n" +
        "- \\(m\\sqrt a \\times n\\sqrt b = mn\\sqrt{ab}\\): outside numbers with outside numbers, roots with roots.\n" +
        "- \\(\\sqrt a \\times \\sqrt a = (\\sqrt a)^2 = a\\).\n" +
        "- A root of a fraction: simplify the fraction first, or simplify the two roots and cancel the common surd.\n" +
        "- The same root on top and bottom cancels, even when the number inside is a letter expression.",
      formula: {
        label: "One root sign",
        latex: "m\\sqrt a \\times n\\sqrt b = mn\\sqrt{ab}, \\qquad \\dfrac{\\sqrt a}{\\sqrt b} = \\sqrt{\\dfrac ab}",
      },
      authoredExample: {
        prompt: "Simplify \\(3\\sqrt 2 \\times 4\\sqrt 6\\).",
        steps: [
          "Outside: \\(3 \\times 4 = 12\\). Inside: \\(\\sqrt{2 \\times 6} = \\sqrt{12}\\).",
          "\\(12\\sqrt{12} = 12 \\times 2\\sqrt 3 = 24\\sqrt 3\\).",
        ],
        answer: "\\(24\\sqrt 3\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{\\dfrac{27}{75}}\\).",
        steps: [
          "Simplify the fraction: \\(\\dfrac{27}{75} = \\dfrac{9}{25}\\).",
          "\\(\\sqrt{\\dfrac{9}{25}} = \\dfrac 35\\).",
        ],
        answer: "\\(\\dfrac 35\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt 5 \\times \\sqrt 7\\).", answer: "\\(\\sqrt{35}\\)" },
        { prompt: "Simplify \\(\\sqrt{45} \\div \\sqrt 5\\).", answer: "\\(3\\)" },
        { prompt: "Find \\((\\sqrt{11})^2\\).", answer: "\\(11\\)" },
        { prompt: "Find \\(\\sqrt{\\dfrac{50}{32}}\\).", answer: "\\(\\dfrac 54\\)", method: "\\(\\dfrac{50}{32} = \\dfrac{25}{16}\\)." },
      ],
      pyqExampleId: "45a5a143-8997-431c-ae78-fc0e90ef523e",
      traps: [
        {
          title: "A root times itself is the number inside",
          body: "\\(\\sqrt 7 \\times \\sqrt 7 = 7\\), not \\(49\\) and not \\(\\sqrt{14}\\).",
        },
        {
          title: "Finish in simplest form",
          body: "\\(2\\sqrt 5 \\times 3\\sqrt 5 = 6 \\times 5 = 30\\). Stopping at \\(6\\sqrt{25}\\) leaves an answer that is not among the options.",
        },
      ],
    },
  ],
};
