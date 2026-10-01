import type { SubtopicNote } from "@/app/notes/_types";

export const CYCLES_TD_NOTE: SubtopicNote = {
  subtopicName: "Cyclic Processes",
  title: "Cyclic Processes",
  oneLineDefinition:
    "A cycle returns the gas to its starting state, so ΔU = 0 and the net heat absorbed equals the net work done, which is the area enclosed on the P–V diagram.",
  whyItMatters:
    "Twelve PYQs, eleven of them multiple choice and two from 2026, and eleven come with a diagram of the cycle. Six read the net work off the enclosed area: a triangle, a circle or ellipse, or a region bounded by a curve. Six work leg by leg, adding isothermal, isobaric and adiabatic works, or using the heat in each leg to find the one that is missing.",
  concepts: [
    // C1 — enclosed area
    {
      kind: "formula" as const,
      slug: "jpthermo-cycle-area",
      name: "Net work of a cycle as the enclosed area",
      intuition:
        "A cycle ends where it began, so ΔU = 0 and the net heat absorbed equals the net work done. On a P–V diagram that work is the area inside the loop. Going clockwise, the gas expands at high pressure and is compressed at low pressure, so it does net positive work and absorbs net heat. Going anticlockwise, both are negative.",
      definition:
        "- \\(\\Delta U_{\\text{cycle}} = 0\\), so \\(Q_{\\text{net}} = W_{\\text{net}} = \\) the area enclosed on the P–V diagram.\n" +
        "- With P up and V across: clockwise means W > 0 and heat absorbed; anticlockwise means W < 0 and heat rejected.\n" +
        "- Triangle: \\(\\tfrac{1}{2}\\,\\Delta V\\,\\Delta P\\). Rectangle: \\(\\Delta V\\,\\Delta P\\).\n" +
        "- Circle or ellipse: \\(\\pi ab\\), with a the semi-axis along V (in m³) and b the semi-axis along P (in Pa): half of each full width.\n" +
        "- A curved side: integrate \\(\\int P\\,dV\\) along it, then add the straight legs.\n" +
        "- If a diagram puts V up and P across, the direction that gives positive work is reversed.",
      formula: {
        label: "Net work of a cycle",
        latex: "W_{\\text{net}} = Q_{\\text{net}} = \\oint P\\,dV \\qquad W_{\\text{ellipse}} = \\pi ab",
      },
      authoredExample: {
        prompt:
          "A gas is taken anticlockwise round a rectangle on a P–V diagram whose sides run from 2 L to 5 L and from 100 kPa to 300 kPa. Find the net work done by the gas and the net heat.",
        steps: [
          "Area \\(= (5 - 2)\\ \\text{L} \\times (300 - 100)\\ \\text{kPa} = 3 \\times 200 = 600\\ \\text{J}\\), since kPa × L = J.",
          "Anticlockwise: the gas is compressed at the high pressure and expands at the low one, so the work it does is negative.",
          "\\(W = Q = -600\\ \\text{J}\\): the gas gives out 600 J of heat in each cycle.",
        ],
        answer: "−600 J; 600 J of heat rejected per cycle",
      },
      selfCheckExample: {
        prompt:
          "A gas goes clockwise round an ellipse on a P–V diagram. The ellipse spans V from 1 L to 5 L and P from 100 kPa to 300 kPa. Find the work done per cycle.",
        steps: [
          "Semi-axes: \\(a = 2\\ \\text{L} = 2 \\times 10^{-3}\\ \\text{m}^{3}\\) and \\(b = 100\\ \\text{kPa} = 10^{5}\\ \\text{Pa}\\).",
          "\\(W = \\pi ab = \\pi \\times 2 \\times 10^{-3} \\times 10^{5} = 200\\pi \\approx 628\\ \\text{J}\\), positive because the cycle is clockwise.",
        ],
        answer: "\\(200\\pi\\ \\text{J} \\approx 628\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "A clockwise triangular cycle has ΔV = 4 m³ and ΔP = 50 Pa. Work per cycle?", answer: "100 J" },
        { prompt: "A cycle is a circle with semi-axes 1 L along V and 100 kPa along P. Work per cycle?", answer: "\\(100\\pi\\ \\text{J}\\)" },
        { prompt: "Over one cycle a gas absorbs 900 J and rejects 700 J of heat. Net work?", answer: "200 J" },
        { prompt: "What is ΔU over one complete cycle?", answer: "Zero" },
      ],
      pyqExampleId: "c7b48d42-4a7e-4036-980b-480db1d0a1a9", // 28 Jan 2026 S2: triangular cycle ABC on a P–V diagram, work per cycle
      traps: [
        {
          title: "Half the width, not the width",
          body: "πab uses semi-axes. Using the full width on one axis doubles the area, and on both axes makes it four times too big.",
        },
        {
          title: "The direction sets the sign",
          body: "The area gives only the size of the work. Clockwise on a P–V diagram is positive work by the gas; anticlockwise is negative.",
        },
      ],
    },

    // C2 — leg by leg
    {
      kind: "formula" as const,
      slug: "jpthermo-cycle-legs",
      name: "A cycle worked leg by leg",
      intuition:
        "When a cycle is built from standard processes, find the work on each leg with that process's formula and add them. Pressures and volumes at the corners come from the process rules: PV is fixed on an isotherm, P on an isobar, V on an isochor. If heats are given instead, use net heat = net work, or ΔU summing to zero, to find the leg that is missing.",
      definition:
        "- Isothermal: \\(nRT\\ln\\dfrac{V_2}{V_1}\\). Isobaric: \\(P\\Delta V\\). Isochoric: 0. Adiabatic: \\(\\dfrac{P_1V_1 - P_2V_2}{\\gamma - 1}\\).\n" +
        "- Find the corner pressures first: after an isotherm, \\(P_2 = \\dfrac{P_1V_1}{V_2}\\).\n" +
        "- Over a cycle \\(\\sum W = \\sum Q\\) and \\(\\sum \\Delta U = 0\\).\n" +
        "- On each leg \\(Q = \\Delta U + W\\); on an adiabatic leg \\(\\Delta U = -W\\).\n" +
        "- In a cycle of two isotherms and two adiabats, the two adiabatic works cancel, since each depends only on the same temperature change.",
      formula: {
        label: "Net work leg by leg",
        latex: "W_{\\text{net}} = \\sum_{\\text{legs}} W_i = \\sum_{\\text{legs}} Q_i",
      },
      authoredExample: {
        prompt:
          "A monoatomic ideal gas goes round a cycle ABCA. AB is at constant volume and absorbs 600 J. BC is an adiabatic expansion. CA, at constant pressure, brings it back to A and rejects 500 J. Find the work on each leg and the net work.",
        steps: [
          "CA is isobaric and monoatomic, so \\(Q : \\Delta U : W = 5 : 3 : 2\\): \\(W_{CA} = -200\\ \\text{J}\\) and \\(\\Delta U_{CA} = -300\\ \\text{J}\\).",
          "AB is isochoric: \\(W_{AB} = 0\\) and \\(\\Delta U_{AB} = 600\\ \\text{J}\\).",
          "Round the cycle \\(\\sum \\Delta U = 0\\), so \\(\\Delta U_{BC} = -600 + 300 = -300\\ \\text{J}\\) and \\(W_{BC} = +300\\ \\text{J}\\).",
          "Net work \\(= 0 + 300 - 200 = 100\\ \\text{J}\\). Check: net heat \\(= 600 + 0 - 500 = 100\\ \\text{J}\\).",
        ],
        answer: "0, 300 J and −200 J; 100 J net",
      },
      selfCheckExample: {
        prompt:
          "In a three-leg cycle a gas does 800 J of work on leg 1, none on leg 2 and −500 J on leg 3. It absorbs 1000 J of heat on leg 1 and rejects 400 J on leg 2. Find the heat on leg 3.",
        steps: [
          "Net work \\(= 800 + 0 - 500 = 300\\ \\text{J}\\), so net heat \\(= 300\\ \\text{J}\\).",
          "\\(Q_3 = 300 - 1000 + 400 = -300\\ \\text{J}\\): the gas rejects 300 J on leg 3.",
        ],
        answer: "300 J rejected",
      },
      practiceSet: [
        { prompt: "1 mol at 300 K expands isothermally to 3 times its volume, then is compressed at constant pressure back to its first volume. Total work of these two legs?", answer: "\\(RT\\left(\\ln 3 - \\tfrac{2}{3}\\right)\\) with T = 300 K" },
        { prompt: "An adiabatic leg goes from \\(P_1V_1 = 700\\ \\text{J}\\) to \\(P_2V_2 = 400\\ \\text{J}\\) with γ = 1.5. Work on that leg?", answer: "600 J" },
        { prompt: "An isobaric leg at \\(2 \\times 10^{5}\\ \\text{Pa}\\) runs from 3 L to 1 L. Work on that leg?", answer: "−400 J" },
        { prompt: "A cycle has two isotherms and two adiabats. Sum of the two adiabatic works?", answer: "Zero" },
      ],
      pyqExampleId: "dab55e03-6d9f-409c-8090-8fe08d7ec71f", // 3 Apr 2025: isothermal ×4, isobaric back, isochoric heating — heat exchanged
      traps: [
        {
          title: "Find the corner pressure before using PΔV",
          body: "After an isothermal expansion to k times the volume, the pressure is P/k. An isobaric leg that follows runs at that new pressure, not at the starting one.",
        },
        {
          title: "The volume ratio in the right order",
          body: "Isothermal work by the gas is nRT ln(V_final/V_initial), which is negative for a compression. Writing the ratio upside down flips the sign.",
        },
      ],
    },
  ],
};
