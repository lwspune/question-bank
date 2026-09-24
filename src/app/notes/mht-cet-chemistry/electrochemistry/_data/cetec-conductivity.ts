import type { SubtopicNote } from "@/app/notes/_types";

export const CONDUCTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Cell Constant and Conductivity Measurements",
  title: "Cell Constant and Conductivity Measurements",
  oneLineDefinition:
    "Conductance is the reciprocal of resistance; conductivity is conductance scaled by the cell's geometry, the cell constant l/a — so κ = (cell constant)/R, and the cell constant itself is found once with a standard KCl solution.",
  whyItMatters:
    "23 PYQs, one HARD (a lost exponent in the stem). Three question shapes: multiply κ by R to get the cell constant, divide the cell constant by R to get κ, and pick the correct or incorrect relation among k = 1/ρ, k = G·(l/a), k = Λ·c. " +
    "The rest is units: siemens, S cm⁻¹, and what 1 S is not.",
  concepts: [
    // 1 — conductance, conductivity and units
    {
      kind: "formula" as const,
      slug: "cetec-conductance-and-units",
      name: "Conductance, Conductivity and Their Units",
      intuition:
        "Resistance R measures how hard current finds it to flow; conductance G = 1/R measures how easy. Both depend on the shape of the sample. Conductivity κ removes the shape: κ = G × (l/a), the conductance of a 1 cm cube — so it is a property of the solution alone.",
      definition:
        "- \\(G = \\dfrac{1}{R}\\), unit siemens (S) \\(= \\Omega^{-1} = \\text{A V}^{-1} = \\text{C V}^{-1}\\text{s}^{-1}\\). The ohm itself is NOT a unit of conductance.\n" +
        "- \\(\\kappa = \\dfrac{1}{\\rho} = G \\cdot \\dfrac{l}{a}\\), unit \\(\\text{S cm}^{-1}\\) (SI: \\(\\text{S m}^{-1}\\)). Molar conductivity has \\(\\text{S cm}^2\\,\\text{mol}^{-1}\\) — the extra cm² is how you tell them apart.\n" +
        "- \\(\\kappa = \\dfrac{\\Lambda \\cdot c}{1000}\\) (c in mol L⁻¹) is also correct; \\(k = \\dfrac{1}{R}\\cdot\\dfrac{a}{l}\\) is NOT — it inverts the cell constant.\n" +
        "- Who conducts: molten NaCl and salt solutions (mobile ions); NOT crystalline NaCl (ions fixed), diamond or sulphur. Urea in water gives no ions, so its conductivity is that of distilled water.",
      formula: {
        label: "Conductivity",
        latex:
          "\\kappa = \\frac{1}{\\rho} = G\\cdot\\frac{l}{a} = \\frac{1}{R}\\cdot\\frac{l}{a}",
      },
      authoredExample: {
        prompt: "A solution in a cell with electrodes 1.5 cm apart and 0.5 cm² in area has resistance 200 Ω. Find G and κ.",
        steps: [
          "\\(G = 1/200 = 5 \\times 10^{-3}\\ \\text{S}\\).",
          "\\(\\kappa = G \\cdot l/a = 5 \\times 10^{-3} \\times 3 = 1.5 \\times 10^{-2}\\ \\text{S cm}^{-1}\\).",
        ],
        answer: "\\(G = 5 \\times 10^{-3}\\ \\text{S}\\); \\(\\kappa = 0.015\\ \\text{S cm}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Which of these is NOT equal to 1 siemens: \\(\\Omega^{-1}\\), \\(\\text{A V}^{-1}\\), \\(\\text{V A}^{-1}\\), \\(\\text{C V}^{-1}\\text{s}^{-1}\\)?",
        steps: [
          "\\(\\text{V A}^{-1}\\) is the ohm — resistance, the reciprocal of conductance.",
        ],
        answer: "\\(\\text{V A}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "SI unit of conductivity?", answer: "\\(\\text{S m}^{-1}\\)" },
        { prompt: "Which conducts: crystalline NaCl or molten NaCl?", answer: "Molten NaCl" },
        { prompt: "Which solution conducts like distilled water: urea, NaCl, NaOH, acetic acid?", answer: "Urea" },
        { prompt: "Is \\(k = \\Lambda\\cdot c\\) a correct relation for conductivity?", answer: "Yes (with c in mol cm⁻³)" },
      ],
      pyqExampleId: "32c46b8d-5938-4020-9483-471d18b2d51a",
      traps: [
        {
          title: "Reading S cm² mol⁻¹ as the unit of conductivity",
          body:
            "That is MOLAR conductivity. Conductivity is S cm⁻¹ (or S m⁻¹). The options always offer both; the one with mol⁻¹ in it belongs to Λ.",
        },
      ],
    },

    // 2 — the cell constant
    {
      kind: "formula" as const,
      slug: "cetec-cell-constant",
      name: "Cell Constant: l/a = κ × R",
      intuition:
        "The distance between the electrodes divided by their area is fixed for a given cell. It is never measured with a ruler; the cell is filled with KCl of known conductivity, the resistance is read, and cell constant = κ × R. Once known, it converts every later resistance into a conductivity.",
      definition:
        "- Cell constant \\(= \\dfrac{l}{a}\\), unit \\(\\text{cm}^{-1}\\). From geometry: electrodes 0.92 cm apart, area 1.2 cm² → \\(0.767\\ \\text{cm}^{-1}\\).\n" +
        "- Determination: \\(\\text{cell constant} = \\kappa_{\\text{KCl}} \\times R_{\\text{KCl}}\\). 0.1 M KCl, \\(\\kappa = 1.70 \\times 10^{-4}\\), \\(R = 100\\ \\Omega\\) → \\(0.017\\ \\text{cm}^{-1}\\).\n" +
        "- Standard solutions: 1 M, 0.1 M or 0.01 M KCl, whose conductivities are tabulated. NOT saturated KCl — its concentration changes with temperature.\n" +
        "- \\(\\dfrac{l}{a} = k \\cdot R\\) is the formula; \\(\\dfrac{l}{a} = \\dfrac{k}{R}\\) and \\(\\dfrac{R}{k}\\) are the distractors.",
      formula: {
        label: "Cell constant",
        latex:
          "\\frac{l}{a} = \\kappa \\times R",
      },
      authoredExample: {
        prompt: "0.01 M KCl (\\(\\kappa = 1.41 \\times 10^{-3}\\ \\text{S cm}^{-1}\\)) shows a resistance of 850 Ω in a cell. Find the cell constant.",
        steps: [
          "\\(l/a = 1.41 \\times 10^{-3} \\times 850 = 1.20\\ \\text{cm}^{-1}\\).",
        ],
        answer: "\\(1.20\\ \\text{cm}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A cell dipped in 0.05 M KCl (\\(\\kappa = 0.0012\\ \\text{S cm}^{-1}\\)) reads 500 Ω. Cell constant?",
        steps: [
          "\\(0.0012 \\times 500 = 0.60\\ \\text{cm}^{-1}\\).",
        ],
        answer: "\\(0.60\\ \\text{cm}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\kappa = 0.014\\), \\(R = 60\\ \\Omega\\): cell constant?", answer: "\\(0.84\\ \\text{cm}^{-1}\\)" },
        { prompt: "\\(\\kappa = 1.64 \\times 10^{-4}\\), \\(R = 120\\ \\Omega\\): cell constant?", answer: "\\(0.0196\\ \\text{cm}^{-1}\\)" },
        { prompt: "Electrodes 0.92 cm apart, area 1.2 cm²: cell constant?", answer: "\\(0.767\\ \\text{cm}^{-1}\\)" },
        { prompt: "Which KCl solution cannot be the standard: 1 M, 0.1 M, 0.01 M, saturated?", answer: "Saturated" },
      ],
      pyqExampleId: "97f03eb3-9ee6-4337-a0e9-68ed84245b45",
      traps: [
        {
          title: "Dividing when the cell constant is asked",
          body:
            "\\(\\kappa = (l/a)/R\\), so \\(l/a = \\kappa R\\): MULTIPLY. Dividing gives \\(\\kappa/R\\), a number four orders too small — and it is offered as an option.",
        },
      ],
    },

    // 3 — conductivity from the cell constant
    {
      kind: "formula" as const,
      slug: "cetec-conductivity-from-cell-constant",
      name: "Conductivity From the Cell Constant and Resistance",
      intuition:
        "The reverse move. With the cell constant known, fill the cell with the unknown solution, read R, and κ = (cell constant)/R. Dilute solutions have large R (thousands of ohms) and κ of order 10⁻⁴ S cm⁻¹.",
      definition:
        "- \\(\\kappa = \\dfrac{l/a}{R}\\). Cell constant 0.9 cm⁻¹, \\(R = 6530\\ \\Omega\\) → \\(\\kappa = 1.38 \\times 10^{-4}\\ \\Omega^{-1}\\text{cm}^{-1}\\).\n" +
        "- 0.84 cm⁻¹ and 14000 Ω (\\(5 \\times 10^{-4}\\) M NaCl) → \\(6.0 \\times 10^{-5}\\); 1.32 cm⁻¹ and 528 Ω → \\(0.0025\\).\n" +
        "- Order-of-magnitude check: a 0.1 M salt is about \\(10^{-2}\\) S cm⁻¹; a \\(10^{-3}\\) M one about \\(10^{-4}\\). A result of \\(10^{2}\\) means you multiplied.\n" +
        "- Units on the answer: \\(\\Omega^{-1}\\text{cm}^{-1}\\), never \\(\\Omega\\,\\text{cm}^{-1}\\) — the paper plants that too.",
      formula: {
        label: "Conductivity of the unknown",
        latex:
          "\\kappa = \\frac{\\text{cell constant}}{R}",
      },
      authoredExample: {
        prompt: "A cell of constant 0.653 cm⁻¹ shows 6530 Ω with 0.001 M AgNO₃. Find κ.",
        steps: [
          "\\(\\kappa = 0.653 / 6530 = 1.0 \\times 10^{-4}\\ \\Omega^{-1}\\text{cm}^{-1}\\).",
        ],
        answer: "\\(1.0 \\times 10^{-4}\\ \\Omega^{-1}\\text{cm}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Cell constant 0.315 cm⁻¹, resistance 31.5 Ω. Conductivity?",
        steps: [
          "\\(0.315 / 31.5 = 0.01\\ \\Omega^{-1}\\text{cm}^{-1}\\).",
        ],
        answer: "\\(0.01\\ \\Omega^{-1}\\text{cm}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Cell constant 1.1 cm⁻¹, \\(R = 94.5\\ \\Omega\\): κ?", answer: "\\(0.0116\\ \\Omega^{-1}\\text{cm}^{-1}\\)" },
        { prompt: "Cell constant 0.33 cm⁻¹, \\(R = 30\\ \\Omega\\): κ?", answer: "\\(0.011\\ \\Omega^{-1}\\text{cm}^{-1}\\)" },
        { prompt: "Cell constant 0.84 cm⁻¹, \\(R = 14000\\ \\Omega\\): κ?", answer: "\\(6.0 \\times 10^{-5}\\ \\Omega^{-1}\\text{cm}^{-1}\\)" },
        { prompt: "Does κ of a salt solution rise or fall on dilution?", answer: "Falls (fewer ions per cm³)" },
      ],
      pyqExampleId: "18725ef5-15f8-48fa-81b2-418297447054",
      traps: [
        {
          title: "Trusting a printed exponent over the order of magnitude",
          body:
            "One 2023 paper printed κ of 0.1 M KCl as \\(1.90 \\times 10^{-6}\\) and keyed a cell constant of 218.5 cm⁻¹; the working needs κ = 1.90. When the arithmetic lands on no option, match the mantissa and let the sanity range decide the exponent.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Molar Conductivity — where κ goes next",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-molar-conductivity",
    },
    {
      label: "Electrolysis — the other thing a current does in a solution",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-electrolysis",
    },
  ],
};
