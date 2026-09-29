import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_FORMING_NOTE: SubtopicNote = {
  subtopicName: "Solving and Forming Quadratic Equations",
  title: "Solving and Forming Quadratic Equations",
  oneLineDefinition:
    "A quadratic is fixed by the sum and the product of its roots, and when its coefficients add to zero one root is 1.",
  whyItMatters:
    "Fifteen PYQs. Two moves cover almost all of them: write the equation as x² − (sum)x + (product) = 0, and check whether the coefficients add to zero before doing any algebra. Irrational roots come in conjugate pairs, which answers the 'other root' questions at once.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-form-from-roots",
      name: "Forming an equation from its roots",
      intuition:
        "Expanding \\((x - \\alpha)(x - \\beta)\\) gives \\(x^2 - (\\alpha + \\beta)x + \\alpha\\beta\\). So the sum and the product are all you need to write the equation, and a change to the roots is a change to that sum and product.",
      definition:
        "- The equation with roots \\(\\alpha, \\beta\\) is \\(x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0\\), or any non-zero multiple of it.\n" +
        "- For \\(ax^2 + bx + c = 0\\): \\(\\alpha + \\beta = -\\dfrac ba\\) and \\(\\alpha\\beta = \\dfrac ca\\).\n" +
        "- Copying errors: a wrong constant term leaves the SUM right; a wrong \\(x\\)-coefficient leaves the PRODUCT right.\n" +
        "- With rational coefficients, an irrational root \\(p + \\sqrt q\\) comes with its conjugate \\(p - \\sqrt q\\).\n" +
        "- To find an equation satisfied by a new quantity \\(y\\), express \\(x\\) through \\(y\\) and substitute.",
      formula: {
        label: "Equation from sum and product",
        latex: "x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0",
      },
      authoredExample: {
        prompt: "The roots of an equation have sum \\(5\\) and product \\(6\\). Form the equation whose roots are each one more.",
        steps: [
          "The roots are \\(2\\) and \\(3\\); the new roots are \\(3\\) and \\(4\\).",
          "Sum \\(7\\), product \\(12\\).",
        ],
        answer: "\\(x^2 - 7x + 12 = 0\\).",
      },
      selfCheckExample: {
        prompt: "One student miscopied the constant term and got roots \\(2\\) and \\(8\\); another miscopied the \\(x\\)-coefficient and got roots \\(-4\\) and \\(-3\\). Find the correct roots.",
        steps: [
          "The first student's sum is right: \\(10\\).",
          "The second student's product is right: \\(12\\).",
          "\\(x^2 - 10x + 12 = 0\\) gives \\(x = 5 \\pm \\sqrt{13}\\).",
        ],
        answer: "\\(5 \\pm \\sqrt{13}\\).",
      },
      practiceSet: [
        { prompt: "Roots \\(3\\) and \\(-5\\). The equation?", answer: "\\(x^2 + 2x - 15 = 0\\)" },
        { prompt: "One root of a rational quadratic is \\(2 + \\sqrt3\\). The other?", answer: "\\(2 - \\sqrt3\\)" },
        { prompt: "Sum \\(4\\), product \\(-5\\). The equation?", answer: "\\(x^2 - 4x - 5 = 0\\)" },
        { prompt: "Roots of \\(x^2 - 5x + 6 = 0\\) doubled. New equation?", answer: "\\(x^2 - 10x + 24 = 0\\)" },
      ],
      pyqExampleId: "1ef885a5-6c8f-4621-b3cc-30f98db6ad8b", // 2017 (I) — Aman and Alok's copying errors
      traps: [
        {
          title: "The sign of the sum",
          body:
            "The \\(x\\)-coefficient is MINUS the sum. Roots with sum \\(2\\) give \\(x^2 - 2x + \\ldots\\), not \\(x^2 + 2x + \\ldots\\), and the wrong-sign version is always among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-coefficient-sum-zero",
      name: "When the coefficients add to zero",
      intuition:
        "Putting \\(x = 1\\) into \\(ax^2 + bx + c\\) gives \\(a + b + c\\). If that is zero, \\(1\\) is a root, and the other root is the product \\(\\dfrac ca\\). Letter-heavy equations are built this way on purpose.",
      definition:
        "- If \\(a + b + c = 0\\), the roots of \\(ax^2 + bx + c = 0\\) are \\(1\\) and \\(\\dfrac ca\\).\n" +
        "- If \\(a - b + c = 0\\), the roots are \\(-1\\) and \\(-\\dfrac ca\\).\n" +
        "- If a root is given, substitute it to find an unknown coefficient, then use the sum or product for the other root.\n" +
        "- Otherwise factorise, or use \\(x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).",
      formula: {
        label: "Root 1",
        latex: "a + b + c = 0 \\;\\Rightarrow\\; x = 1,\\ \\dfrac ca",
      },
      authoredExample: {
        prompt: "Find the roots of \\((p - q)x^2 + (q - r)x + (r - p) = 0\\).",
        steps: [
          "The coefficients add to \\(0\\), so \\(1\\) is a root.",
          "The other is the product, \\(\\dfrac{r - p}{p - q}\\).",
        ],
        answer: "\\(1\\) and \\(\\dfrac{r - p}{p - q}\\).",
      },
      selfCheckExample: {
        prompt: "One root of \\(x^2 - 7x + k = 0\\) is \\(2\\). Find \\(k\\) and the other root.",
        steps: ["\\(4 - 14 + k = 0\\), so \\(k = 10\\).", "The roots add to \\(7\\), so the other is \\(5\\)."],
        answer: "\\(k = 10\\), other root \\(5\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(3x^2 - 5x + 2 = 0\\)?", answer: "\\(1\\) and \\(\\dfrac23\\)" },
        { prompt: "Roots of \\(2x^2 + 7x + 5 = 0\\)?", answer: "\\(-1\\) and \\(-\\dfrac52\\)" },
        { prompt: "Roots of \\(x^2 - 2x - 35 = 0\\)?", answer: "\\(7\\) and \\(-5\\)" },
        { prompt: "\\(x = 3\\) is a root of \\(x^2 + bx + 6 = 0\\). Find \\(b\\).", answer: "\\(-5\\)" },
      ],
      pyqExampleId: "72856a0c-f8fe-404a-be2d-143c5381b1a0", // 2025 (II) — ((a − b)/2)x² − ((a + b)/2)x + b = 0
      traps: [
        {
          title: "Clear the fractions first",
          body:
            "The coefficient-sum test works on the equation as it stands, fractions and all, but the product \\(\\dfrac ca\\) is easier to read after multiplying through. Do not multiply only some of the terms.",
        },
      ],
    },
  ],
};
