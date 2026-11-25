import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_PARTICULAR_NOTE: SubtopicNote = {
  subtopicName: "Integrals of Some Particular Functions",
  title: "Integrals of Some Particular Functions",
  oneLineDefinition:
    "Six standard integrals with x² ± a² or a² − x², with and without a square root, and the two ways of reaching them: completing the square, and splitting a linear numerator.",
  whyItMatters:
    "55 questions, twenty-three of them from board papers: three in 2022, four in 2023, four in 2024, four in 2025 and eight in 2026. The one-mark items ask for 1 over the root of 9 − 4x² (2024), 1 over the root of 25 − 16x² (2026) and forms in e to the x, a to the x or sin x that reduce to a standard one (2025 three times, 2026). The longer questions complete the square, as in 1 over x² − 6x + 13 and 1 over the root of 4x − x² (2022), e to the x over a root quadratic in e to the x (2023 twice) and 1 over 5 + 4x − x² (2024). Almost every year also brings a linear numerator over a quadratic or its root, such as (3x + 5) over the root of x² + 2x + 4 (2024) and four of these in 2026. The textbook adds Examples 8 to 10, Exercise 7.4 and Miscellaneous questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbmin-six-forms",
      name: "The six standard forms",
      intuition:
        "These six results come up in almost every long answer of the chapter, so learn them as a set. Look at two things: is there a square root, and which sign joins the square terms? That picks the formula. A coefficient on \\(x^2\\), as in \\(9 - 4x^2\\), is taken out first so that the \\(x^2\\) term stands alone.",
      definition:
        "- Write the denominator as \\(x^2 \\pm a^2\\) or \\(a^2 - x^2\\), with \\(x^2\\) having coefficient 1.\n" +
        "- If \\(x\\) is replaced by a function such as \\(e^x\\), \\(\\sin x\\) or \\(x^3\\), first substitute \\(t\\) for it.\n" +
        "- No root: the answer is a log or \\(\\tan^{-1}\\). With a root: a log or \\(\\sin^{-1}\\).\n" +
        "- Only \\(\\dfrac{1}{x^2 + a^2}\\) gives \\(\\tan^{-1}\\), and only \\(\\dfrac{1}{\\sqrt{a^2 - x^2}}\\) gives \\(\\sin^{-1}\\).",
      table: {
        columns: ["Integrand", "Integral"],
        rows: [
          { cells: ["\\(\\dfrac{1}{x^2 - a^2}\\)", "\\(\\dfrac{1}{2a}\\log\\left|\\dfrac{x - a}{x + a}\\right| + C\\)"] },
          { cells: ["\\(\\dfrac{1}{a^2 - x^2}\\)", "\\(\\dfrac{1}{2a}\\log\\left|\\dfrac{a + x}{a - x}\\right| + C\\)"] },
          { cells: ["\\(\\dfrac{1}{x^2 + a^2}\\)", "\\(\\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a} + C\\)"] },
          { cells: ["\\(\\dfrac{1}{\\sqrt{x^2 - a^2}}\\)", "\\(\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + C\\)"] },
          { cells: ["\\(\\dfrac{1}{\\sqrt{a^2 - x^2}}\\)", "\\(\\sin^{-1}\\dfrac{x}{a} + C\\)"], noteAmber: "Board 2024 and 2026 asked this form with a coefficient on x squared, as one-mark questions.", pyqExampleId: "ce99a3c0-93a8-4e60-a61f-f321c3b3a8cb" },
          { cells: ["\\(\\dfrac{1}{\\sqrt{x^2 + a^2}}\\)", "\\(\\log\\left|x + \\sqrt{x^2 + a^2}\\right| + C\\)"] },
        ],
        caption: "In each form, \\(a > 0\\) is a constant.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{4x^2 - 9}}\\).",
        steps: [
          "Take 4 out of the root: \\(\\sqrt{4x^2 - 9} = 2\\sqrt{x^2 - \\left(\\dfrac{3}{2}\\right)^2}\\).",
          "\\(\\int \\dfrac{dx}{2\\sqrt{x^2 - \\left(\\dfrac{3}{2}\\right)^2}} = \\dfrac{1}{2}\\log\\left|x + \\sqrt{x^2 - \\dfrac{9}{4}}\\right| + C_1\\).",
          "\\(x + \\sqrt{x^2 - \\dfrac{9}{4}} = \\dfrac{2x + \\sqrt{4x^2 - 9}}{2}\\); the \\(\\log\\dfrac{1}{2}\\) joins the constant.",
          "\\(\\therefore\\) the integral is \\(\\dfrac{1}{2}\\log\\left|2x + \\sqrt{4x^2 - 9}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\log\\left|2x + \\sqrt{4x^2 - 9}\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{x^2 - 25}\\).", answer: "\\(\\dfrac{1}{10}\\log\\left|\\dfrac{x - 5}{x + 5}\\right| + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{25x^2 + 4}\\).", answer: "\\(\\dfrac{1}{10}\\tan^{-1}\\dfrac{5x}{2} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{x^2 + 49}}\\).", answer: "\\(\\log\\left|x + \\sqrt{x^2 + 49}\\right| + C\\)" },
      ],
      pyqExampleId: "b93e5e3c-fa92-49bd-a3f8-ad3b755fff72",
      traps: [
        {
          title: "The coefficient of x squared left inside",
          body: "\\(\\int \\dfrac{dx}{\\sqrt{9 - 4x^2}}\\) is not \\(\\sin^{-1}\\dfrac{2x}{3}\\). Taking 4 out of the root leaves \\(\\dfrac{1}{2}\\) in front: \\(\\dfrac{1}{2}\\sin^{-1}\\dfrac{2x}{3} + C\\).",
        },
        {
          title: "Mixing up x² − a² and a² − x²",
          body: "\\(\\dfrac{1}{x^2 - a^2}\\) gives \\(\\log\\left|\\dfrac{x - a}{x + a}\\right|\\), while \\(\\dfrac{1}{a^2 - x^2}\\) gives \\(\\log\\left|\\dfrac{a + x}{a - x}\\right|\\). Check which term carries the minus sign before you write the formula.",
        },
        {
          title: "Dropping the minus sign of the substitution",
          body: "With \\(t = e^{-x}\\), \\(dt = -e^{-x}\\,dx\\). That minus sign stays in front of the whole answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-complete-square",
      name: "Completing the square",
      intuition:
        "A quadratic \\(ax^2 + bx + c\\) that does not factor easily is written as a perfect square plus or minus a number. Then \\(x\\) plus a constant plays the part of \\(x\\) in one of the six standard forms. When the \\(x^2\\) term is negative, take the minus sign out first, complete the square inside, and only then bring it back.",
      definition:
        "- Make the coefficient of \\(x^2\\) equal to 1 by taking \\(a\\) out.\n" +
        "- \\(x^2 + bx = \\left(x + \\dfrac{b}{2}\\right)^2 - \\dfrac{b^2}{4}\\): add and subtract the square of half the coefficient of \\(x\\).\n" +
        "- For \\(c + bx - x^2\\), write \\(c - (x^2 - bx)\\), complete the square in the bracket and simplify to \\(k^2 - (x - h)^2\\).\n" +
        "- Put \\(t = x + \\dfrac{b}{2}\\), so \\(dt = dx\\), and use the matching standard form.\n" +
        "- The same works under a root: \\(\\dfrac{1}{\\sqrt{ax^2 + bx + c}}\\).",
      formula: {
        label: "Completing the square",
        latex: "x^2 + bx + c = \\left(x + \\dfrac{b}{2}\\right)^2 + \\left(c - \\dfrac{b^2}{4}\\right)",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{x^2 + 4x + 13}\\).",
        steps: [
          "\\(x^2 + 4x + 13 = (x + 2)^2 + 9 = (x + 2)^2 + 3^2\\).",
          "Put \\(x + 2 = t\\), so \\(dx = dt\\).",
          "\\(\\int \\dfrac{dt}{t^2 + 3^2} = \\dfrac{1}{3}\\tan^{-1}\\dfrac{t}{3} + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x + 2}{3}\\right) + C\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x + 2}{3}\\right) + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{6x - x^2 - 8}}\\).",
        steps: [
          "\\(6x - x^2 - 8 = -(x^2 - 6x + 8) = -[(x - 3)^2 - 1] = 1 - (x - 3)^2\\).",
          "Put \\(x - 3 = t\\), so \\(dx = dt\\).",
          "\\(\\int \\dfrac{dt}{\\sqrt{1 - t^2}} = \\sin^{-1} t + C\\).",
          "\\(\\therefore\\) the integral is \\(\\sin^{-1}(x - 3) + C\\).",
        ],
        answer: "\\(\\sin^{-1}(x - 3) + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{x^2 + 6x + 10}}\\).", answer: "\\(\\log\\left|x + 3 + \\sqrt{x^2 + 6x + 10}\\right| + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{x^2 - 2x - 3}\\).", answer: "\\(\\dfrac{1}{4}\\log\\left|\\dfrac{x - 3}{x + 1}\\right| + C\\)", method: "\\((x - 1)^2 - 2^2\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{2x^2 + 4x + 6}\\).", answer: "\\(\\dfrac{1}{2\\sqrt{2}}\\tan^{-1}\\left(\\dfrac{x + 1}{\\sqrt{2}}\\right) + C\\)", method: "\\(2[(x + 1)^2 + 2]\\)" },
      ],
      pyqExampleId: "0090d35e-ae6d-4b21-ae2e-b01e1222840f",
      traps: [
        {
          title: "Losing the sign when x squared is negative",
          body: "\\(7 + 6x - x^2\\) is \\(16 - (x - 3)^2\\), not \\((x - 3)^2 - 16\\) or \\((x + 3)^2 - 2\\). Take the minus sign out first: \\(7 - (x^2 - 6x)\\).",
        },
        {
          title: "Not taking the coefficient of x squared out",
          body: "In \\(2x^2 + 4x + 6\\), complete the square only after writing \\(2(x^2 + 2x + 3)\\). The factor \\(\\dfrac{1}{2}\\) then stands in front of the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-linear-numerator",
      name: "A linear numerator over a quadratic or its root",
      intuition:
        "Split the numerator \\(px + q\\) into two parts: a multiple of the derivative of the quadratic, which integrates to a log or a root, and a constant left over, which goes to completing the square. Two small integrals replace one hard one.",
      definition:
        "- Write \\(px + q = A\\dfrac{d}{dx}(ax^2 + bx + c) + B\\), and find \\(A\\) and \\(B\\) by comparing coefficients.\n" +
        "- **No root:** \\(A\\int \\dfrac{2ax + b}{ax^2 + bx + c}\\,dx = A\\log|ax^2 + bx + c|\\).\n" +
        "- **With a root:** \\(A\\int \\dfrac{2ax + b}{\\sqrt{ax^2 + bx + c}}\\,dx = 2A\\sqrt{ax^2 + bx + c}\\).\n" +
        "- The part \\(B\\int \\dfrac{dx}{ax^2 + bx + c}\\) or \\(B\\int \\dfrac{dx}{\\sqrt{ax^2 + bx + c}}\\) is done by completing the square.\n" +
        "- If the numerator's degree is not less than the denominator's, divide first. A root such as \\(\\sqrt{\\dfrac{x + a}{x - a}}\\) becomes \\(\\dfrac{x + a}{\\sqrt{x^2 - a^2}}\\) after multiplying top and bottom by \\(\\sqrt{x + a}\\).",
      formula: {
        label: "Splitting the numerator",
        latex: "px + q = A\\dfrac{d}{dx}(ax^2 + bx + c) + B",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{2x + 5}{x^2 + 2x + 5}\\,dx\\).",
        steps: [
          "\\(\\dfrac{d}{dx}(x^2 + 2x + 5) = 2x + 2\\), so \\(2x + 5 = (2x + 2) + 3\\).",
          "\\(I = \\int \\dfrac{2x + 2}{x^2 + 2x + 5}\\,dx + 3\\int \\dfrac{dx}{x^2 + 2x + 5}\\).",
          "First part: \\(\\log(x^2 + 2x + 5)\\), since the quadratic is always positive.",
          "Second part: \\(x^2 + 2x + 5 = (x + 1)^2 + 2^2\\), so \\(3\\int \\dfrac{dx}{(x + 1)^2 + 2^2} = \\dfrac{3}{2}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right)\\).",
          "\\(\\therefore I = \\log(x^2 + 2x + 5) + \\dfrac{3}{2}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right) + C\\).",
        ],
        answer: "\\(\\log(x^2 + 2x + 5) + \\dfrac{3}{2}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right) + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{x + 1}{\\sqrt{x^2 + 4}}\\,dx\\).",
        steps: [
          "\\(x + 1 = \\dfrac{1}{2}(2x) + 1\\).",
          "\\(\\dfrac{1}{2}\\int \\dfrac{2x}{\\sqrt{x^2 + 4}}\\,dx = \\dfrac{1}{2} \\cdot 2\\sqrt{x^2 + 4} = \\sqrt{x^2 + 4}\\).",
          "\\(\\int \\dfrac{dx}{\\sqrt{x^2 + 2^2}} = \\log\\left|x + \\sqrt{x^2 + 4}\\right|\\).",
          "\\(\\therefore\\) the integral is \\(\\sqrt{x^2 + 4} + \\log\\left|x + \\sqrt{x^2 + 4}\\right| + C\\).",
        ],
        answer: "\\(\\sqrt{x^2 + 4} + \\log\\left|x + \\sqrt{x^2 + 4}\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{x + 2}{x^2 + 1}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\log(x^2 + 1) + 2\\tan^{-1} x + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{x - 3}{\\sqrt{1 - x^2}}\\,dx\\).", answer: "\\(-\\sqrt{1 - x^2} - 3\\sin^{-1} x + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{4x - 1}{\\sqrt{x^2 - 1}}\\,dx\\).", answer: "\\(4\\sqrt{x^2 - 1} - \\log\\left|x + \\sqrt{x^2 - 1}\\right| + C\\)" },
      ],
      pyqExampleId: "c1cf471d-8456-4a73-b3db-a97bbd95fda2",
      traps: [
        {
          title: "Integrating the root part to a log",
          body: "\\(\\int \\dfrac{2x + 2}{\\sqrt{x^2 + 2x + 5}}\\,dx = 2\\sqrt{x^2 + 2x + 5}\\), not \\(\\log|x^2 + 2x + 5|\\). With a root, \\(\\int \\dfrac{dt}{\\sqrt{t}} = 2\\sqrt{t}\\).",
        },
        {
          title: "Wrong A and B",
          body: "Check the split by expanding: \\(\\dfrac{5}{2}(2x + 4) - 7 = 5x + 3\\). A wrong \\(A\\) or \\(B\\) spoils both parts of the answer, so this one line is worth writing.",
        },
      ],
    },
  ],
};
