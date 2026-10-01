import type { SubtopicNote } from "@/app/notes/_types";

export const ERRORS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Propagation of Errors",
  title: "Propagation of Errors",
  oneLineDefinition:
    "For a product of powers, the maximum relative error is each relative error times the size of its power, all added; for a sum or a difference, the absolute errors add.",
  whyItMatters:
    "Twenty-seven PYQs, twenty-two of them multiple choice, and five from 2026. Fifteen give percentage errors and a formula built from powers; seven give each measurement as value ± error, so the relative errors must be worked out first; five add errors in a sum, a parallel combination or a mean of readings. Two rules cover all of them, and every error in them is added.",
  concepts: [
    // C1 — the power rule
    {
      kind: "formula" as const,
      slug: "jpunit-power-rule",
      name: "Relative error of a product of powers",
      intuition:
        "If a quantity is a product of powers, a small relative error in one factor is multiplied by its power. The question asks for the MAXIMUM error, the worst case, so every contribution is added with a plus sign, even for a quantity in the denominator and even if one error is stated as negative.",
      definition:
        "- \\(Q = \\dfrac{a^{p}b^{q}}{c^{r}}\\) gives \\(\\dfrac{\\Delta Q}{Q} = p\\dfrac{\\Delta a}{a} + q\\dfrac{\\Delta b}{b} + r\\dfrac{\\Delta c}{c}\\).\n" +
        "- Use the size of each power: a square root counts ½, a cube root ⅓.\n" +
        "- Multiply by 100 for a percentage error. Constants such as 4π² carry no error.\n" +
        "- Signs of individual errors do not reduce the maximum error: a 2% positive error in T and a 1% negative error in m still give \\(1 + 2 \\times 2 = 5\\%\\) in \\(k = 4\\pi^{2}m/T^{2}\\).\n" +
        "- A diameter used for an area or a volume enters with power 2 or 3; d and r have the same relative error.\n" +
        "- Exponential factor \\(e^{-\\beta t}\\): it adds the ABSOLUTE amount \\(\\beta\\,\\Delta t\\) to the relative error, not a percentage of t.",
      formula: {
        label: "Maximum relative error",
        latex: "Q = \\frac{a^{p}b^{q}}{c^{r}} \\Rightarrow \\frac{\\Delta Q}{Q} = p\\frac{\\Delta a}{a} + q\\frac{\\Delta b}{b} + r\\frac{\\Delta c}{c}",
      },
      authoredExample: {
        prompt:
          "\\(Q = \\dfrac{A^{3}B^{2}}{\\sqrt{C}}\\). The percentage errors in A, B and C are 0.5%, 1.5% and 2%. Find the maximum percentage error in Q.",
        steps: [
          "A contributes \\(3 \\times 0.5 = 1.5\\%\\).",
          "B contributes \\(2 \\times 1.5 = 3\\%\\).",
          "C is in the denominator with power ½: \\(\\tfrac{1}{2} \\times 2 = 1\\%\\), still added.",
          "Total: \\(1.5 + 3 + 1 = 5.5\\%\\).",
        ],
        answer: "\\(5.5\\%\\)",
      },
      selfCheckExample: {
        prompt:
          "The mass of a body is measured with a 2% error and its speed with a 3% error. Find the maximum percentage error in its kinetic energy \\(\\tfrac{1}{2}mv^{2}\\).",
        steps: [
          "\\(\\dfrac{\\Delta K}{K} = \\dfrac{\\Delta m}{m} + 2\\dfrac{\\Delta v}{v}\\); the ½ carries no error.",
          "\\(2 + 2 \\times 3 = 8\\%\\).",
        ],
        answer: "\\(8\\%\\)",
      },
      practiceSet: [
        { prompt: "A cube's side has a 1% error. What is the percentage error in its volume?", answer: "\\(3\\%\\)" },
        { prompt: "Heat \\(H = I^{2}Rt\\); errors in I, R, t are 1%, 2%, 1%. Maximum error in H?", answer: "\\(5\\%\\)" },
        { prompt: "\\(Z = \\dfrac{A^{2}}{B^{3}}\\); write the relative error in Z.", answer: "\\(2\\dfrac{\\Delta A}{A} + 3\\dfrac{\\Delta B}{B}\\)" },
        { prompt: "The radius of a wire has a 0.5% error and its length a 0.2% error. Error in its resistance \\(R = \\rho l/(\\pi r^{2})\\)?", answer: "\\(1.2\\%\\)" },
      ],
      pyqExampleId: "66cc8182-acff-4d57-aa17-3e9feb46421a", // 2023: P = a²b³/(c√d), errors 1, 2, 3, 4 %
      traps: [
        {
          title: "An error in the denominator is added, not subtracted",
          body: "Dividing by c does not cancel c's error. The maximum relative error of a/c is Δa/a + Δc/c. Subtracting gives a smaller number, which is usually one of the options.",
        },
        {
          title: "A stated negative error still adds",
          body: "For the maximum error, a '1% negative error' counts as 1%. Signs matter only for the most likely error, which JEE questions do not ask for.",
        },
        {
          title: "An exponential adds βΔt, not a percentage",
          body: "In E = α³e^(−βt), the exponential contributes β·Δt to ΔE/E. With β = 0.2 s⁻¹ and Δt = 0.5 s, that is 0.1, or 10%, whatever the value of t.",
        },
      ],
    },

    // C2 — values given as x ± Δx
    {
      kind: "formula" as const,
      slug: "jpunit-plus-minus",
      name: "Percentage error from values given with their absolute errors",
      intuition:
        "Often the question gives each measurement as value ± absolute error. Turn each into a relative error, Δx/x, then apply the power rule. If the answer is wanted as value ± error, multiply the relative error back by the value.",
      definition:
        "- Relative error \\(= \\dfrac{\\Delta x}{x}\\); percentage error \\(= \\dfrac{\\Delta x}{x} \\times 100\\).\n" +
        "- Apply the power rule to the relative errors.\n" +
        "- Absolute error of the result: \\(\\Delta Q = Q \\times \\dfrac{\\Delta Q}{Q}\\).\n" +
        "- Density of a cylinder \\(\\rho = \\dfrac{4m}{\\pi d^{2}l}\\): \\(\\dfrac{\\Delta m}{m} + 2\\dfrac{\\Delta d}{d} + \\dfrac{\\Delta l}{l}\\). Of a sphere \\(\\rho = \\dfrac{3m}{4\\pi r^{3}}\\): \\(\\dfrac{\\Delta m}{m} + 3\\dfrac{\\Delta r}{r}\\).\n" +
        "- Keep units consistent within each ratio; the ratio itself has no unit.",
      formula: {
        label: "Absolute error from relative error",
        latex: "\\Delta Q = Q\\left(p\\frac{\\Delta a}{a} + q\\frac{\\Delta b}{b} + r\\frac{\\Delta c}{c}\\right)",
      },
      authoredExample: {
        prompt:
          "A sphere has mass \\((25.0 \\pm 0.1)\\) g and radius \\((2.00 \\pm 0.01)\\) cm. Find the maximum percentage error in its density.",
        steps: [
          "\\(\\dfrac{\\Delta m}{m} = \\dfrac{0.1}{25.0} = 0.4\\%\\).",
          "\\(\\dfrac{\\Delta r}{r} = \\dfrac{0.01}{2.00} = 0.5\\%\\); the radius is cubed, so it gives \\(1.5\\%\\).",
          "Total: \\(0.4 + 1.5 = 1.9\\%\\).",
        ],
        answer: "\\(1.9\\%\\)",
      },
      selfCheckExample: {
        prompt:
          "A voltage \\((12.0 \\pm 0.3)\\) V drives a current \\((3.0 \\pm 0.1)\\) A. Find the resistance with its absolute error.",
        steps: [
          "\\(R = 12.0/3.0 = 4.0\\ \\Omega\\).",
          "\\(\\dfrac{\\Delta R}{R} = \\dfrac{0.3}{12.0} + \\dfrac{0.1}{3.0} = 0.025 + 0.0333 = 0.0583\\), or \\(5.83\\%\\).",
          "\\(\\Delta R = 4.0 \\times 0.0583 = 0.23\\ \\Omega\\).",
        ],
        answer: "\\(R = (4.0 \\pm 0.23)\\ \\Omega\\)",
      },
      practiceSet: [
        { prompt: "Length \\((50.0 \\pm 0.5)\\) cm. Percentage error?", answer: "\\(1\\%\\)" },
        { prompt: "Mass \\((2.0 \\pm 0.1)\\) kg and speed \\((10 \\pm 0.2)\\) m/s. Percentage error in momentum?", answer: "\\(7\\%\\)" },
        { prompt: "Area of a square of side \\((4.0 \\pm 0.1)\\) cm, with its absolute error?", answer: "\\((16.0 \\pm 0.8)\\ \\text{cm}^{2}\\)" },
        { prompt: "A wire's diameter is \\((0.50 \\pm 0.01)\\) mm. Percentage error in its cross-sectional area?", answer: "\\(4\\%\\)" },
      ],
      pyqExampleId: "db975aa3-904f-480a-a415-4608642124a4", // 2026: density of a cylinder from m, l and d with their errors
      traps: [
        {
          title: "A diameter's error counts twice in an area",
          body: "Area is πd²/4, so its relative error is 2Δd/d. Using Δd/d once, as if the area grew in proportion to d, halves that contribution.",
        },
      ],
    },

    // C3 — sums, parallel combinations and means
    {
      kind: "formula" as const,
      slug: "jpunit-sums-means",
      name: "Errors in sums, parallel combinations and means",
      intuition:
        "When quantities are added or subtracted, their absolute errors add: the worst case is every reading off in the same direction. Only after the sum is formed do you divide by it to get a percentage. A parallel combination is a sum of reciprocals, so it needs one more step.",
      definition:
        "- \\(Z = A + B\\) or \\(A - B\\): \\(\\Delta Z = \\Delta A + \\Delta B\\).\n" +
        "- Springs in parallel or resistors in series: \\(k = k_1 + k_2\\), so \\(\\Delta k = \\Delta k_1 + \\Delta k_2\\).\n" +
        "- Resistors in parallel, \\(\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}\\): \\(\\dfrac{\\Delta R}{R^{2}} = \\dfrac{\\Delta R_1}{R_1^{2}} + \\dfrac{\\Delta R_2}{R_2^{2}}\\).\n" +
        "- Mean absolute error: \\(\\overline{\\Delta x} = \\dfrac{1}{n}\\sum|x_i - \\bar x|\\); relative error \\(= \\overline{\\Delta x}/\\bar x\\).",
      formula: {
        label: "Sums and reciprocal sums",
        latex: "\\Delta(A \\pm B) = \\Delta A + \\Delta B \\qquad \\frac{\\Delta R}{R^{2}} = \\frac{\\Delta R_1}{R_1^{2}} + \\frac{\\Delta R_2}{R_2^{2}}",
      },
      authoredExample: {
        prompt:
          "Two resistors are \\(R_1 = (6.0 \\pm 0.2)\\ \\Omega\\) and \\(R_2 = (12.0 \\pm 0.3)\\ \\Omega\\). Find the equivalent resistance with its error (a) in series and (b) in parallel.",
        steps: [
          "(a) \\(R = 18.0\\ \\Omega\\), \\(\\Delta R = 0.2 + 0.3 = 0.5\\ \\Omega\\): \\(2.8\\%\\).",
          "(b) \\(R = \\dfrac{6 \\times 12}{18} = 4.0\\ \\Omega\\).",
          "\\(\\dfrac{\\Delta R}{R^{2}} = \\dfrac{0.2}{36} + \\dfrac{0.3}{144} = 0.00556 + 0.00208 = 0.00764\\).",
          "\\(\\Delta R = 16 \\times 0.00764 = 0.12\\ \\Omega\\), which is \\(3.1\\%\\).",
        ],
        answer: "(a) \\((18.0 \\pm 0.5)\\ \\Omega\\); (b) \\((4.0 \\pm 0.12)\\ \\Omega\\).",
      },
      selfCheckExample: {
        prompt:
          "A time is measured four times: 2.52 s, 2.48 s, 2.55 s and 2.45 s. Find the mean, the mean absolute error and the percentage error.",
        steps: [
          "Mean \\(= 10.00/4 = 2.50\\) s.",
          "Deviations: 0.02, 0.02, 0.05, 0.05; their mean is \\(0.14/4 = 0.035\\) s.",
          "Relative error \\(= 0.035/2.50 = 0.014\\).",
        ],
        answer: "\\((2.50 \\pm 0.035)\\) s; \\(1.4\\%\\).",
      },
      practiceSet: [
        { prompt: "\\((5.0 \\pm 0.1)\\) cm \\(- (2.0 \\pm 0.1)\\) cm, with its error?", answer: "\\((3.0 \\pm 0.2)\\) cm" },
        { prompt: "Two springs \\((4 \\pm 0.1)\\) N/m and \\((6 \\pm 0.1)\\) N/m in parallel. Percentage error in k?", answer: "\\(2\\%\\)" },
        { prompt: "Readings 5.1, 4.9, 5.0, 5.0. Mean absolute error?", answer: "\\(0.05\\)" },
        { prompt: "Two equal resistors \\((10 \\pm 0.4)\\ \\Omega\\) in parallel. Equivalent with error?", answer: "\\((5 \\pm 0.2)\\ \\Omega\\)" },
      ],
      pyqExampleId: "ff6d61a4-ef0d-4803-88f5-8cf451ec2def", // 2026: two springs in parallel, percentage error in k
      traps: [
        {
          title: "Errors add in a difference too",
          body: "For Z = A − B, ΔZ = ΔA + ΔB. Subtracting the errors assumes they cancel, but the maximum error comes when they do not.",
        },
        {
          title: "Do not add percentage errors in a sum",
          body: "For k = k₁ + k₂, add the ABSOLUTE errors and then divide by k. Adding the two percentage errors overstates the answer: (10 ± 0.3) + (30 ± 0.3) is 40 ± 0.6, which is 1.5%, not 3% + 1% = 4%.",
        },
      ],
    },
  ],
};
