import type { SubtopicNote } from "@/app/notes/_types";

export const HEAT_CAPACITY_TD_NOTE: SubtopicNote = {
  subtopicName: "Internal Energy and Heat Capacities",
  title: "Internal Energy and Heat Capacities",
  oneLineDefinition:
    "The internal energy of an ideal gas changes by nCvΔT in every process; the heat needed depends on the process, and the heat per mole per kelvin is that process's molar heat capacity.",
  whyItMatters:
    "Twenty PYQs, nine of them asking for a number, and five from 2026. Six find a change in internal energy from Cv, which is often first worked out from Cp or from the degrees of freedom. Ten split the heat at constant pressure into internal energy and work. Four find a molar heat capacity from the first law: for a process that turns a set fraction of its heat into work, for a polytropic process, or for a gas that is not ideal.",
  concepts: [
    // C1 — ΔU = nCvΔT and the degrees of freedom
    {
      kind: "formula" as const,
      slug: "jpthermo-cv-dof",
      name: "Internal energy from Cv and the degrees of freedom",
      intuition:
        "The internal energy of an ideal gas depends only on its temperature. So ΔU = nCvΔT holds in every process, not only at constant volume: the heat needed changes from path to path, but ΔU does not. Cv itself comes from the degrees of freedom, each of which holds ½RT of energy per mole.",
      definition:
        "- \\(U = \\dfrac{f}{2}nRT\\), so \\(\\Delta U = nC_V\\Delta T\\) with \\(C_V = \\dfrac{f}{2}R\\), **in any process**.\n" +
        "- f = 3 for a monoatomic gas; f = 5 for a diatomic gas that rotates but does not vibrate (\"rigid\"); f = 6 for a rigid non-linear molecule. Each vibrational mode adds 2.\n" +
        "- \\(C_P - C_V = R\\) (Mayer's relation) and \\(\\gamma = \\dfrac{C_P}{C_V} = 1 + \\dfrac{2}{f}\\).\n" +
        "- \\(R \\approx 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1} \\approx 2\\ \\text{cal mol}^{-1}\\text{K}^{-1}\\). Keep Cp, Cv and R in the same unit.\n" +
        "- A temperature **change** has the same size in °C and in K.\n" +
        "- With a specific heat per kilogram at constant volume, \\(\\Delta U = mc_V\\Delta T\\).",
      formula: {
        label: "Internal energy and heat capacities",
        latex: "\\Delta U = nC_V\\Delta T \\qquad C_V = \\frac{f}{2}R \\qquad C_P - C_V = R \\qquad \\gamma = 1 + \\frac{2}{f}",
      },
      authoredExample: {
        prompt:
          "3 mol of a gas is heated at constant pressure from 20 °C to 50 °C. Its \\(C_P = 5\\ \\text{cal mol}^{-1}\\,^{\\circ}\\text{C}^{-1}\\), and take \\(R = 2\\ \\text{cal mol}^{-1}\\,^{\\circ}\\text{C}^{-1}\\). Find ΔU.",
        steps: [
          "\\(C_V = C_P - R = 5 - 2 = 3\\ \\text{cal mol}^{-1}\\,^{\\circ}\\text{C}^{-1}\\).",
          "\\(\\Delta T = 50 - 20 = 30\\ ^{\\circ}\\text{C}\\), the same as 30 K.",
          "\\(\\Delta U = nC_V\\Delta T = 3 \\times 3 \\times 30 = 270\\ \\text{cal}\\). Constant pressure does not change this: ΔU always uses Cv.",
        ],
        answer: "270 cal",
      },
      selfCheckExample: {
        prompt:
          "2 mol of a rigid diatomic gas warms from 300 K to 360 K by some process. Find ΔU in terms of R.",
        steps: [
          "Rigid diatomic: f = 5, so \\(C_V = \\tfrac{5}{2}R\\).",
          "\\(\\Delta U = 2 \\times \\tfrac{5}{2}R \\times 60 = 300R\\), whatever the process.",
        ],
        answer: "300R",
      },
      practiceSet: [
        { prompt: "What are f and γ for a rigid diatomic gas?", answer: "f = 5 and γ = 7/5" },
        { prompt: "A gas has \\(C_V = 3R\\). Find \\(C_P\\) and γ.", answer: "\\(C_P = 4R\\) and γ = 4/3" },
        { prompt: "A non-linear molecule has 2 vibrational modes. Find f and \\(C_V\\).", answer: "f = 10 and \\(C_V = 5R\\)" },
        { prompt: "\\(C_P = 29\\ \\text{J mol}^{-1}\\text{K}^{-1}\\) and \\(R = 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1}\\). Find \\(C_V\\).", answer: "\\(20.7\\ \\text{J mol}^{-1}\\text{K}^{-1}\\)" },
      ],
      pyqExampleId: "469f0293-759c-415f-94d3-cb0dcf961fcc", // 21 Jan 2026 S1: oxygen at constant volume, Cv = Cp − R
      traps: [
        {
          title: "ΔU uses Cv even at constant pressure",
          body: "The heat at constant pressure is nCpΔT, but the rise in internal energy is still nCvΔT. Using Cp for ΔU is the most common slip on this page.",
        },
        {
          title: "Each vibrational mode counts twice",
          body: "A vibration stores both kinetic and potential energy, so each vibrational mode adds 2 to f, not 1.",
        },
        {
          title: "Calories and joules do not mix",
          body: "R is about 2 in cal mol⁻¹ K⁻¹ and about 8.3 in J mol⁻¹ K⁻¹. Subtracting R in joules from Cp in calories gives a meaningless Cv.",
        },
      ],
    },

    // C2 — isobaric split Q : ΔU : W
    {
      kind: "formula" as const,
      slug: "jpthermo-isobaric-split",
      name: "How heat splits at constant pressure",
      intuition:
        "At constant pressure the heat is Q = nCpΔT, the internal energy rises by nCvΔT and the work is PΔV = nRΔT. All three share the factor nΔT, so they always stand in the ratio Cp : Cv : R. Knowing any one of them fixes the other two.",
      definition:
        "- \\(Q : \\Delta U : W = C_P : C_V : R = \\left(\\tfrac{f}{2} + 1\\right) : \\tfrac{f}{2} : 1\\).\n" +
        "- Monoatomic gas (f = 3): 5 : 3 : 2.\n" +
        "- From the work: \\(Q = \\dfrac{\\gamma}{\\gamma - 1}W\\) and \\(\\Delta U = \\dfrac{W}{\\gamma - 1}\\).\n" +
        "- From the heat: \\(\\Delta U = \\dfrac{Q}{\\gamma}\\) and \\(W = Q\\left(1 - \\dfrac{1}{\\gamma}\\right)\\).\n" +
        "- \\(W = P\\Delta V = nR\\Delta T\\) at constant pressure.",
      formula: {
        label: "Isobaric heat split",
        latex: "Q : \\Delta U : W = C_P : C_V : R \\qquad Q = \\frac{\\gamma}{\\gamma - 1}W \\qquad \\Delta U = \\frac{Q}{\\gamma}",
      },
      authoredExample: {
        prompt:
          "A monoatomic ideal gas expands at constant pressure and does \\(60\\ \\text{J}\\) of work. Find the heat supplied and the rise in internal energy.",
        steps: [
          "Monoatomic: \\(Q : \\Delta U : W = 5 : 3 : 2\\).",
          "W is 2 parts = 60 J, so 1 part = 30 J.",
          "\\(Q = 5 \\times 30 = 150\\ \\text{J}\\) and \\(\\Delta U = 3 \\times 30 = 90\\ \\text{J}\\).",
          "Check with γ = 5/3: \\(Q = \\dfrac{5/3}{2/3} \\times 60 = 2.5 \\times 60 = 150\\ \\text{J}\\).",
        ],
        answer: "\\(Q = 150\\ \\text{J}\\), \\(\\Delta U = 90\\ \\text{J}\\)",
      },
      selfCheckExample: {
        prompt:
          "A gas whose molecules have 6 degrees of freedom is given \\(400\\ \\text{J}\\) of heat at constant pressure. How much goes into internal energy and how much into work?",
        steps: [
          "\\(C_V = 3R\\) and \\(C_P = 4R\\), so \\(Q : \\Delta U : W = 4 : 3 : 1\\).",
          "One part \\(= 400/4 = 100\\ \\text{J}\\): \\(\\Delta U = 300\\ \\text{J}\\), \\(W = 100\\ \\text{J}\\).",
        ],
        answer: "\\(\\Delta U = 300\\ \\text{J}\\), \\(W = 100\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "A monoatomic gas heated at constant pressure gains 45 J of internal energy. Work done?", answer: "30 J" },
        { prompt: "A gas with γ = 4/3 does 50 J of work at constant pressure. Heat supplied?", answer: "200 J" },
        { prompt: "What fraction of the heat does a monoatomic gas turn into work at constant pressure?", answer: "2/5" },
        { prompt: "A gas has \\(C_V = 3R\\). At constant pressure, what is Q/W?", answer: "4" },
      ],
      pyqExampleId: "4d292b13-06a9-406a-a8d1-dcd02d73e11d", // 31 Jan 2023: 735 J at constant pressure, rotating diatomic, ΔU
      traps: [
        {
          title: "Only at constant volume does all the heat stay inside",
          body: "At constant pressure part of the heat, R/Cp of it, leaves as work. ΔU equals Q only when the volume is fixed.",
        },
        {
          title: "\"Rotates but does not oscillate\" means f = 5",
          body: "That phrase describes a rigid diatomic molecule: f = 5, Cv = 5R/2, γ = 7/5. Vibration would add 2 more degrees of freedom.",
        },
      ],
    },

    // C3 — molar heat capacity of a general process
    {
      kind: "formula" as const,
      slug: "jpthermo-process-heat-capacity",
      name: "Molar heat capacity of any process",
      intuition:
        "A molar heat capacity is heat per mole per kelvin, and its value depends on the path. At constant volume it is Cv and at constant pressure it is Cp. For any other process, use the first law: find what share of the heat stays as internal energy, then divide the heat by nΔT.",
      definition:
        "- \\(C = \\dfrac{Q}{n\\Delta T}\\). Since \\(\\Delta U = nC_V\\Delta T\\) always, \\(C = C_V + \\dfrac{W}{n\\Delta T}\\).\n" +
        "- If the gas turns a fraction 1/k of the heat into work, \\(\\Delta U = \\left(1 - \\tfrac{1}{k}\\right)Q\\), so \\(C = \\dfrac{C_V}{1 - 1/k}\\).\n" +
        "- Polytropic process \\(PV^{x} = \\text{const}\\): \\(C = C_V + \\dfrac{R}{1 - x}\\). x = 0 gives Cp; x = γ (adiabatic) gives 0; x = 1 (isothermal) gives an infinite C.\n" +
        "- Two processes between the same two temperatures: the one doing more work needs more heat, so it has the larger C.\n" +
        "- For a gas that is not ideal (U still depending on T alone), \\(C_P - C_V = P\\left(\\dfrac{\\partial V}{\\partial T}\\right)_{P}\\). Find \\((\\partial V/\\partial T)_P\\) from its equation of state; for PV = RT it gives R.",
      formula: {
        label: "Molar heat capacity of a process",
        latex: "C = \\frac{Q}{n\\Delta T} = C_V + \\frac{W}{n\\Delta T} \\qquad C_{\\text{poly}} = C_V + \\frac{R}{1 - x}",
      },
      authoredExample: {
        prompt:
          "A monoatomic ideal gas does work equal to one-third of the heat it receives. Find its molar heat capacity in this process.",
        steps: [
          "\\(\\Delta U = Q - \\tfrac{1}{3}Q = \\tfrac{2}{3}Q\\).",
          "\\(n C_V \\Delta T = \\tfrac{2}{3}Q\\), so \\(Q = \\tfrac{3}{2}nC_V\\Delta T\\).",
          "\\(C = \\dfrac{Q}{n\\Delta T} = \\tfrac{3}{2}C_V = \\tfrac{3}{2} \\times \\tfrac{3}{2}R = \\tfrac{9}{4}R\\).",
        ],
        answer: "\\(\\tfrac{9}{4}R\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the molar heat capacity of a rigid diatomic ideal gas in a process where its pressure is proportional to its volume.",
        steps: [
          "\\(P \\propto V\\) means \\(PV^{-1} = \\text{const}\\), so x = −1.",
          "\\(C = C_V + \\dfrac{R}{1 - (-1)} = \\tfrac{5}{2}R + \\tfrac{1}{2}R = 3R\\).",
        ],
        answer: "3R",
      },
      practiceSet: [
        { prompt: "What is the molar heat capacity in an adiabatic process?", answer: "Zero" },
        { prompt: "What is the molar heat capacity in an isothermal process?", answer: "Infinite: heat flows with no change in temperature" },
        { prompt: "A monoatomic ideal gas follows \\(PV^{3} = \\text{const}\\). Find its molar heat capacity.", answer: "\\(\\tfrac{3}{2}R - \\tfrac{1}{2}R = R\\)" },
        { prompt: "A gas obeys \\(P(V - b) = RT\\) for one mole. Find \\(C_P - C_V\\).", answer: "R, as for an ideal gas" },
      ],
      pyqExampleId: "fd2b5978-e4e7-4332-82e6-93e9b6e1f630", // 2021 Paper 26: rigid diatomic, work = Q/5, C = xR/8
      traps: [
        {
          title: "A heat capacity can be negative",
          body: "For PV^x = constant with x between 1 and γ, C = Cv + R/(1 − x) is negative: the gas takes in heat yet cools, because it does more work than the heat it gets.",
        },
        {
          title: "A fraction of Q, not of ΔU",
          body: "\"The gas does work equal to Q/6\" means a sixth of the HEAT leaves as work, so ΔU = 5Q/6. Taking the fraction of ΔU instead gives a different heat capacity.",
        },
      ],
    },
  ],
};
