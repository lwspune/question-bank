import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Square Roots of Surds and Surd Equations",
  title: "Square Roots of Surds and Surd Equations",
  oneLineDefinition:
    "A number of the form a + 2√b is the square of √m + √n when m + n = a and mn = b; an equation with two roots is solved through their sum and difference, or by componendo and dividendo.",
  whyItMatters:
    "Ten questions in the bank, 4 EASY and 6 MODERATE, all from the 2025 shifts. Six ask for the square root of a whole number plus a surd, and four are equations with two square roots. Each has a two-line method, and each can also be settled by putting the options back in.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsirt-sqrt",
      name: "The square root of a + 2√b",
      intuition:
        "Squaring \\(\\sqrt{m} + \\sqrt{n}\\) gives \\(m + n + 2\\sqrt{mn}\\): a whole number plus twice a root. So to undo it, look for two numbers that add up to the whole number and multiply to the number under the root.",
      definition:
        "- First write the surd part as **2 times a root**: \\(4\\sqrt{5} = 2\\sqrt{20}\\), \\(6\\sqrt{3} = 2\\sqrt{27}\\).\n" +
        "- Find \\(m\\) and \\(n\\) with \\(m + n = a\\) and \\(mn = b\\), taking \\(m > n\\).\n" +
        "- Then \\(\\sqrt{a + 2\\sqrt{b}} = \\sqrt{m} + \\sqrt{n}\\) and \\(\\sqrt{a - 2\\sqrt{b}} = \\sqrt{m} - \\sqrt{n}\\). The larger root goes first, because a square root is never negative.\n" +
        "- The two results multiply to \\(m - n\\). When \\(m - n = 1\\) they are reciprocals, so \\(\\frac{1}{\\sqrt{m} - \\sqrt{n}} = \\sqrt{m} + \\sqrt{n}\\).\n" +
        "- **Fast route:** square each option and keep the one that gives the number back.",
      formula: {
        label: "Square root of a surd",
        latex: "\\sqrt{a \\pm 2\\sqrt{b}} = \\sqrt{m} \\pm \\sqrt{n} \\quad \\text{where } m + n = a,\\ mn = b,\\ m > n",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{8 + 2\\sqrt{15}}\\).",
        steps: [
          "The surd part is already \\(2\\sqrt{15}\\), so look for \\(m + n = 8\\) and \\(mn = 15\\).",
          "5 and 3 work.",
          "So \\(\\sqrt{8 + 2\\sqrt{15}} = \\sqrt{5} + \\sqrt{3}\\). Check: \\(5 + 3 + 2\\sqrt{15}\\).",
        ],
        answer: "\\(\\sqrt{5} + \\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{14 - 6\\sqrt{5}}\\).",
        steps: [
          "\\(6\\sqrt{5} = 2\\sqrt{45}\\), so look for \\(m + n = 14\\) and \\(mn = 45\\): 9 and 5.",
          "\\(\\sqrt{14 - 6\\sqrt{5}} = \\sqrt{9} - \\sqrt{5} = 3 - \\sqrt{5}\\), which is positive.",
          "Check: \\((3 - \\sqrt{5})^2 = 9 + 5 - 6\\sqrt{5}\\).",
        ],
        answer: "\\(3 - \\sqrt{5}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{7 + 2\\sqrt{10}}\\).", answer: "\\(\\sqrt{5} + \\sqrt{2}\\)" },
        { prompt: "Find \\(\\sqrt{6 - 2\\sqrt{5}}\\).", answer: "\\(\\sqrt{5} - 1\\)", method: "\\(m + n = 6\\), \\(mn = 5\\): 5 and 1." },
        { prompt: "Write \\(8\\sqrt{3}\\) in the form \\(2\\sqrt{b}\\).", answer: "\\(2\\sqrt{48}\\)" },
        {
          prompt: "Find \\(\\sqrt{13 + 4\\sqrt{3}}\\).",
          answer: "\\(2\\sqrt{3} + 1\\)",
          method: "\\(4\\sqrt{3} = 2\\sqrt{12}\\); 12 and 1 add to 13, so \\(\\sqrt{12} + 1\\).",
        },
      ],
      pyqExampleId: "1fd7426b-5206-4816-979a-c4b9ce9dc990",
      traps: [
        {
          title: "Not writing the surd part as 2√b first",
          body:
            "In \\(11 + 6\\sqrt{2}\\) the surd part is \\(2\\sqrt{18}\\), so look for \\(m + n = 11\\) and \\(mn = 18\\): 9 and 2, giving \\(3 + \\sqrt{2}\\). Using \\(mn = 2\\) or \\(mn = 6\\) finds no pair.",
        },
        {
          title: "Putting the smaller root first after a minus",
          body:
            "\\(\\sqrt{7 - 2\\sqrt{12}}\\) is \\(2 - \\sqrt{3}\\), not \\(\\sqrt{3} - 2\\). A square root is never negative, so the larger root goes first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsirt-pair",
      name: "Equations with a sum and a difference of square roots",
      intuition:
        "The product of a sum and a difference of roots has no roots in it: \\((\\sqrt{A} + \\sqrt{B})(\\sqrt{A} - \\sqrt{B}) = A - B\\). So if you know the sum and can see \\(A - B\\), you also know the difference, and adding the two gives \\(\\sqrt{A}\\).",
      definition:
        "- Given \\(\\sqrt{A} + \\sqrt{B} = s\\) and \\(\\sqrt{A} - \\sqrt{B} = d\\): add to get \\(2\\sqrt{A} = s + d\\), subtract to get \\(2\\sqrt{B} = s - d\\).\n" +
        "- Given only the sum, as in \\(\\sqrt{x + p} + \\sqrt{x - q} = s\\): the two numbers under the roots differ by \\(p + q\\), so the difference of the roots is \\(\\frac{p + q}{s}\\). Then add and subtract as above.\n" +
        "- **Fast route:** try the options; each needs two quick square roots.\n" +
        "- Always check the answer in the original equation.",
      formula: {
        label: "Sum times difference of roots",
        latex: "(\\sqrt{A} + \\sqrt{B})(\\sqrt{A} - \\sqrt{B}) = A - B",
      },
      authoredExample: {
        prompt: "Solve \\(\\sqrt{x + 7} + \\sqrt{x - 5} = 6\\).",
        steps: [
          "The numbers under the roots differ by \\(7 + 5 = 12\\), so \\(\\sqrt{x + 7} - \\sqrt{x - 5} = \\frac{12}{6} = 2\\).",
          "Add the two equations: \\(2\\sqrt{x + 7} = 8\\), so \\(\\sqrt{x + 7} = 4\\) and \\(x = 9\\).",
          "Check: \\(\\sqrt{16} + \\sqrt{4} = 6\\).",
        ],
        answer: "\\(x = 9\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sqrt{p} + \\sqrt{q} = 9\\) and \\(\\sqrt{p} - \\sqrt{q} = 3\\), find \\(p\\) and \\(q\\).",
        steps: [
          "Add: \\(2\\sqrt{p} = 12\\), so \\(\\sqrt{p} = 6\\) and \\(p = 36\\).",
          "Subtract: \\(2\\sqrt{q} = 6\\), so \\(\\sqrt{q} = 3\\) and \\(q = 9\\).",
        ],
        answer: "\\(p = 36\\), \\(q = 9\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sqrt{A} + \\sqrt{B} = 7\\) and \\(A - B = 21\\), what is \\(\\sqrt{A} - \\sqrt{B}\\)?", answer: "3" },
        {
          prompt: "Solve \\(\\sqrt{x + 9} + \\sqrt{x} = 9\\).",
          answer: "\\(x = 16\\)",
          method: "The difference of the roots is \\(\\frac{9}{9} = 1\\), so \\(2\\sqrt{x + 9} = 10\\) and \\(x + 9 = 25\\).",
        },
        { prompt: "What is \\((\\sqrt{12} + \\sqrt{3})(\\sqrt{12} - \\sqrt{3})\\)?", answer: "9" },
        { prompt: "If \\(\\sqrt{m} + \\sqrt{n} = 10\\) and \\(\\sqrt{m} - \\sqrt{n} = 4\\), what is \\(n\\)?", answer: "9" },
      ],
      pyqExampleId: "1eea25c5-d703-4cc4-baae-ce7c56b80310",
      traps: [
        {
          title: "Squaring a sum of roots term by term",
          body:
            "\\(\\sqrt{x + 7} + \\sqrt{x - 5} = 6\\) does not give \\((x + 7) + (x - 5) = 36\\). Squaring a sum adds the middle term \\(2\\sqrt{(x + 7)(x - 5)}\\), which is why the sum-and-difference route is quicker.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsirt-componendo",
      name: "Componendo and dividendo",
      intuition:
        "When a ratio has a sum on top and the matching difference below, adding and subtracting its top and bottom pulls the two parts apart. With roots, one step leaves the ratio of the two roots.",
      definition:
        "- If \\(\\frac{p}{q} = \\frac{a}{b}\\), then \\(\\frac{p + q}{p - q} = \\frac{a + b}{a - b}\\). The rule also runs backwards.\n" +
        "- So \\(\\frac{\\sqrt{A} + \\sqrt{B}}{\\sqrt{A} - \\sqrt{B}} = k\\) gives \\(\\frac{\\sqrt{A}}{\\sqrt{B}} = \\frac{k + 1}{k - 1}\\).\n" +
        "- Square it: \\(\\frac{A}{B} = \\left(\\frac{k + 1}{k - 1}\\right)^2\\), then solve the plain equation in \\(x\\).\n" +
        "- **Fast route:** test the options, starting with the ones that make both numbers under the roots perfect squares.",
      formula: {
        label: "Componendo and dividendo",
        latex:
          "\\frac{p}{q} = \\frac{a}{b} \\;\\Rightarrow\\; \\frac{p + q}{p - q} = \\frac{a + b}{a - b} \\qquad \\frac{\\sqrt{A} + \\sqrt{B}}{\\sqrt{A} - \\sqrt{B}} = k \\;\\Rightarrow\\; \\frac{A}{B} = \\left(\\frac{k + 1}{k - 1}\\right)^2",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{\\sqrt{x + 4} + \\sqrt{x - 4}}{\\sqrt{x + 4} - \\sqrt{x - 4}} = 3\\).",
        steps: [
          "Componendo and dividendo: \\(\\frac{\\sqrt{x + 4}}{\\sqrt{x - 4}} = \\frac{3 + 1}{3 - 1} = 2\\).",
          "Square: \\(x + 4 = 4(x - 4)\\), so \\(3x = 20\\) and \\(x = \\frac{20}{3}\\).",
          "Check: \\(x + 4 = \\frac{32}{3}\\) and \\(x - 4 = \\frac{8}{3}\\), whose roots are in the ratio 2 to 1, and \\(\\frac{2 + 1}{2 - 1} = 3\\).",
        ],
        answer: "\\(x = \\frac{20}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{\\sqrt{2 + x} + \\sqrt{2 - x}}{\\sqrt{2 + x} - \\sqrt{2 - x}} = 5\\).",
        steps: [
          "\\(\\frac{\\sqrt{2 + x}}{\\sqrt{2 - x}} = \\frac{6}{4} = \\frac{3}{2}\\).",
          "Square: \\(4(2 + x) = 9(2 - x)\\), so \\(13x = 10\\).",
        ],
        answer: "\\(x = \\frac{10}{13}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\frac{p}{q} = \\frac{5}{3}\\), what is \\(\\frac{p + q}{p - q}\\)?", answer: "4" },
        { prompt: "If \\(\\frac{\\sqrt{A} + \\sqrt{B}}{\\sqrt{A} - \\sqrt{B}} = 4\\), what is \\(\\frac{A}{B}\\)?", answer: "\\(\\frac{25}{9}\\)", method: "\\(\\frac{\\sqrt{A}}{\\sqrt{B}} = \\frac{5}{3}\\)." },
        { prompt: "If \\(\\frac{a + b}{a - b} = 7\\), what is \\(\\frac{a}{b}\\)?", answer: "\\(\\frac{4}{3}\\)", method: "\\(\\frac{7 + 1}{7 - 1} = \\frac{8}{6}\\)." },
        { prompt: "Solve \\(\\frac{\\sqrt{x} + 1}{\\sqrt{x} - 1} = 3\\).", answer: "\\(x = 4\\)", method: "\\(\\sqrt{x} = \\frac{3 + 1}{3 - 1} = 2\\)." },
      ],
      pyqExampleId: "92da7041-b34c-43d9-8960-22abd6e4eb56",
      traps: [
        {
          title: "Forgetting to square the ratio of the roots",
          body:
            "From \\(\\frac{\\sqrt{A}}{\\sqrt{B}} = 3\\) the ratio \\(\\frac{A}{B}\\) is 9, not 3. Componendo and dividendo gives the ratio of the roots; square it before solving for \\(x\\).",
        },
      ],
    },
  ],
};
