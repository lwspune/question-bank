import type { SubtopicNote } from "@/app/notes/_types";

export const ERRORS_NOTE: SubtopicNote = {
  subtopicName: "Units, Dimensions, and Error Analysis",
  title: "Units and Errors in Measurement",
  oneLineDefinition:
    "A repeated measurement is reported as its mean ± its mean absolute error; absolute errors add in a sum or a difference, and percentage errors add in a product or a quotient, each multiplied by the power its quantity is raised to.",
  whyItMatters:
    "14 PYQs, none HARD. Ten ask for the percentage error in a density, a pressure, a kinetic energy, g from a pendulum, or a general product of powers. " +
    "Four are a mean with its error, the error in a temperature rise, which errors are random, and the unit of L/R. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-um-absolute-errors",
      name: "Means, Absolute Errors and Kinds of Error",
      intuition:
        "Several readings are reported as their mean, with the mean of their absolute deviations as the error: 30, 32, 35, 35 s give 33 ± 2 s. In a sum or a difference the absolute errors ADD, never subtract: (82.3 ± 0.3) − (38.6 ± 0.2) = 43.7 ± 0.5. Systematic errors push every reading the same way (a badly calibrated thermometer, a zero error); random errors scatter them (a fluctuating supply). Units follow from formulas: L/R is the time constant of an LR circuit, measured in seconds.",
      definition:
        "- Mean \\(\\bar{x}\\); mean absolute error \\(\\overline{|x_i - \\bar{x}|}\\).\n" +
        "- Sum or difference: \\(\\Delta Z = \\Delta A + \\Delta B\\).\n" +
        "- **Systematic**: calibration, zero error. **Random**: unpredictable fluctuations. **Gross**: misreadings.\n" +
        "- \\(\\dfrac{L}{R}\\) (henry per ohm) is a time: second.",
      formula: {
        label: "Sums and differences",
        latex: "Z = A \\pm B \\Rightarrow \\Delta Z = \\Delta A + \\Delta B",
      },
      authoredExample: {
        prompt: "Readings 2.1, 2.3, 2.2 and 2.4 s. Mean and mean absolute error?",
        steps: ["Mean = 8.8/4 = 2.2 s.", "Deviations 0.1, 0.1, 0, 0.2: mean 0.1 s."],
        answer: "(2.2 ± 0.1) s",
      },
      selfCheckExample: {
        prompt: "Lengths (10.5 ± 0.2) cm and (4.3 ± 0.1) cm. Their difference with its error?",
        steps: ["Errors add."],
        answer: "(6.2 ± 0.3) cm",
      },
      practiceSet: [
        { prompt: "Which is a random error: zero error, poor calibration, or supply fluctuations?", answer: "Supply fluctuations" },
      ],
      pyqExampleId: "288160e2-6c6f-46a4-aabc-c4c2779fd4df",
      traps: [
        {
          title: "Subtracting errors in a difference",
          body:
            "Errors never cancel: the worst case is one reading high and the other low. A difference carries the SUM of the absolute errors.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-um-error-propagation",
      name: "Percentage Errors Through Products and Powers",
      intuition:
        "For Z = AᵃBᵇ/Cᶜ, the maximum fractional error is a(ΔA/A) + b(ΔB/B) + c(ΔC/C): each error times the magnitude of its power, all added — even the ones in the denominator. A density m/l³ from a cube with 3% in l and 4% in m has 4 + 3 × 3 = 13%. A radius error of 2% gives 6% in a volume. For g from a pendulum, g ∝ l/T², so Δg/g = Δl/l + 2ΔT/T, with ΔT/T from the stopwatch's least count over the total time measured.",
      definition:
        "- \\(Z = \\dfrac{A^aB^b}{C^c}\\) ⇒ \\(\\dfrac{\\Delta Z}{Z} = a\\dfrac{\\Delta A}{A} + b\\dfrac{\\Delta B}{B} + c\\dfrac{\\Delta C}{C}\\).\n" +
        "- Density \\(\\dfrac{m}{l^3}\\): 5% and 6% ⇒ 23%. Pressure \\(\\dfrac{F}{L^2}\\): 3% and 2% ⇒ 7%. KE \\(\\tfrac{1}{2}mv^2\\): 3% and 4% ⇒ 11%.\n" +
        "- \\(\\dfrac{pq^2}{r^2s^4}\\) with 3, 2, 3, 1% ⇒ 17%.\n" +
        "- Pendulum: \\(\\dfrac{\\Delta g}{g} = \\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T}\\) (1 mm in 1 m, 0.1 s in 200 s ⇒ 0.2%).",
      formula: {
        label: "Combining errors",
        latex: "\\frac{\\Delta Z}{Z} = a\\frac{\\Delta A}{A} + b\\frac{\\Delta B}{B} + c\\frac{\\Delta C}{C}",
      },
      authoredExample: {
        prompt: "Z = A²B/C³ with errors 1%, 2% and 1%. Percentage error in Z?",
        steps: ["2 × 1 + 1 × 2 + 3 × 1.", "= 7%."],
        answer: "7%",
      },
      selfCheckExample: {
        prompt: "A sphere's radius has a 1.5% error. Error in its volume?",
        steps: ["V ∝ r³."],
        answer: "4.5%",
      },
      practiceSet: [
        { prompt: "P = x³y/z² with errors 0.6%, 3%, 1.3%. Error in P?", answer: "7.4%" },
      ],
      pyqExampleId: "f14b6beb-9dde-4fcc-a684-947da2849c5b",
      traps: [
        {
          title: "Subtracting the error of a quantity in the denominator",
          body:
            "Dividing by C does not cancel C's error; it adds c times it. Every term in the error sum is positive.",
        },
        {
          title: "Forgetting the power",
          body:
            "An error in a quantity that appears cubed counts three times. A 3% error in a side gives 9% in a volume and in a density.",
        },
      ],
    },
  ],
  related: [],
};
