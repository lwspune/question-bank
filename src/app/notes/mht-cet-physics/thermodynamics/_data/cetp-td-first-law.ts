import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermodynamics";

export const FIRST_LAW_NOTE: SubtopicNote = {
  subtopicName: "First Law, Internal Energy, and Work-Heat Relations",
  title: "The First Law of Thermodynamics",
  oneLineDefinition:
    "Heat Q given to a gas is shared between the rise in its internal energy ΔU and the work W it does on its surroundings, Q = ΔU + W; internal energy depends only on the state, so ΔU is the same along any path and zero round a cycle.",
  whyItMatters:
    "37 PYQs, 4 of them HARD. Seventeen apply the first law directly — signs, cycles, work read from a graph, a moving container brought to rest. " +
    "Seventeen ask how heat splits at constant pressure between internal energy and work, and three find the work done in an adiabatic change. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-td-first-law-basics",
      name: "Q = ΔU + W and its Signs",
      intuition:
        "Count heat given TO the gas as positive and work done BY the gas as positive; then Q = ΔU + W. Work done by the gas is the area under its path on a P–V graph, positive when it expands. Internal energy is a property of the state, so two paths between the same states have the same ΔU even when Q and W differ, and a full cycle has ΔU = 0 so the net work equals the net heat. In an isothermal change of an ideal gas ΔU = 0 and Q = W; in an adiabatic change Q = 0 and ΔU = −W; at constant volume W = 0 and Q = ΔU. Kinetic energy of a container that stops suddenly becomes internal energy of the gas. Free expansion is too fast to pass through equilibrium states, so it cannot be drawn on a P–V diagram.",
      definition:
        "- \\(Q = \\Delta U + W\\): Q > 0 heat in, W > 0 work by the gas.\n" +
        "- Cycle: \\(\\Delta U = 0\\), \\(Q_{\\text{net}} = W_{\\text{net}}\\) = area enclosed (clockwise on P–V positive).\n" +
        "- Path independence: abc gives Q = 80, W = 35 ⇒ ΔU = 45; adc with Q = 65 ⇒ W = 20 cal.\n" +
        "- Isothermal: ΔU = 0; adiabatic: ΔU = −W; isochoric: W = 0.\n" +
        "- Compressed at constant P: work ON the gas \\(= P\\Delta V\\) adds to ΔU.\n" +
        "- Container of molar mass M stopped: \\(\\tfrac{1}{2}MV^2 = C_v\\Delta T\\) per mole (monoatomic ⇒ \\(\\Delta T = \\dfrac{MV^2}{3R}\\)).",
      formula: {
        label: "First law",
        latex: "Q = \\Delta U + W, \\qquad W = \\int P\\,dV",
      },
      authoredExample: {
        prompt: "A gas at a constant pressure of 100 N/m² expands from 2 m³ to 5 m³ while absorbing 500 J. Change in internal energy?",
        steps: ["W = PΔV = 100 × 3 = 300 J.", "ΔU = Q − W = 500 − 300 = 200 J."],
        answer: "Increases by 200 J",
      },
      selfCheckExample: {
        prompt: "A gas absorbs 100 J and does 40 J of work. Change in internal energy?",
        steps: ["ΔU = Q − W."],
        answer: "+60 J",
      },
      practiceSet: [
        { prompt: "A gas does −150 J of work isothermally. What happened to the heat?", answer: "150 J removed" },
        { prompt: "In which process is no work done?", answer: "Isochoric" },
      ],
      pyqExampleId: "82ddce30-0bcb-4fcc-9531-107e17cc64f7",
      traps: [
        {
          title: "Getting the sign of work wrong",
          body:
            "W is work done BY the gas. When the gas is compressed, W is negative and the work done ON it adds to its internal energy.",
        },
        {
          title: "Reading the direction of a cycle",
          body:
            "Round a cycle the net work is the enclosed area — positive if the path goes clockwise on a P–V graph, negative if anticlockwise. The same triangle gives +3PV or −3PV.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-td-isobaric-heat-split",
      name: "How Heat Splits at Constant Pressure",
      intuition:
        "At constant pressure the heat is Q = nC_pΔT, the rise in internal energy is ΔU = nC_vΔT, and the work is W = nRΔT. So the fractions are fixed by γ alone: ΔU/Q = 1/γ and W/Q = 1 − 1/γ. For a monoatomic gas (γ = 5/3) 60% goes to internal energy and 40% to work; for a diatomic gas (γ = 7/5) 5/7 and 2/7, so W : ΔU : Q = 2 : 5 : 7. The same relations give C_v = R/(γ − 1). Giving the same heat to a gas at constant pressure and at constant volume raises the temperature γ times more at constant volume.",
      definition:
        "- \\(C_p - C_v = R\\), \\(C_v = \\dfrac{R}{\\gamma - 1}\\).\n" +
        "- \\(\\dfrac{\\Delta U}{Q} = \\dfrac{1}{\\gamma}\\), \\(\\dfrac{W}{Q} = \\dfrac{\\gamma - 1}{\\gamma}\\), \\(\\dfrac{Q}{W} = \\dfrac{\\gamma}{\\gamma - 1}\\).\n" +
        "- Monoatomic: 60% / 40%; diatomic: W : ΔU : Q = 2 : 5 : 7.\n" +
        "- V → 2V at pressure P: \\(\\Delta U = \\dfrac{PV}{\\gamma - 1}\\).\n" +
        "- Same heat, piston free (A) or fixed (B): \\(dT_B = \\gamma\\,dT_A\\).",
      formula: {
        label: "Isobaric split",
        latex: "\\frac{\\Delta U}{Q} = \\frac{1}{\\gamma}, \\qquad \\frac{W}{Q} = 1 - \\frac{1}{\\gamma}",
      },
      authoredExample: {
        prompt: "A diatomic gas (γ = 7/5) is given 700 J at constant pressure. How much goes into internal energy and how much into work?",
        steps: ["ΔU = 700 × 5/7 = 500 J.", "W = 700 − 500 = 200 J."],
        answer: "500 J and 200 J",
      },
      selfCheckExample: {
        prompt: "A monoatomic gas is given 500 J at constant pressure. Work done by it?",
        steps: ["W/Q = 1 − 3/5 = 2/5."],
        answer: "200 J",
      },
      practiceSet: [
        { prompt: "For an ideal gas, C_v in terms of R and γ?", answer: "R/(γ − 1)" },
        { prompt: "Monoatomic gas at constant pressure: percentage of heat used for work?", answer: "40%" },
      ],
      pyqExampleId: "ac10f375-e8ba-46e2-86e8-b8149f23fc66",
      traps: [
        {
          title: "Inverting the ratio",
          body:
            "Q/W is γ/(γ − 1), and W/Q is its reciprocal (γ − 1)/γ. Both appear among the options; read which one the question asks for.",
        },
        {
          title: "Using C_v for heat at constant pressure",
          body:
            "Heat supplied at constant pressure is nC_pΔT; nC_vΔT is only the part that raises the internal energy. For 14 g of nitrogen warmed 48 °C that is 84R, not 60R.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-td-adiabatic-work",
      name: "Work in an Adiabatic Change",
      intuition:
        "With no heat exchanged, all the work comes out of internal energy: W = −ΔU = nC_v(T₁ − T₂) = nR(T₁ − T₂)/(γ − 1). An expanding gas does positive work and cools. To find the final temperature first, use TV^(γ−1) = constant; for pressure against temperature, P ∝ T^(γ/(γ−1)).",
      definition:
        "- \\(W = \\dfrac{nR(T_1 - T_2)}{\\gamma - 1} = \\dfrac{P_1V_1 - P_2V_2}{\\gamma - 1}\\).\n" +
        "- 1 mole, γ = 5/3, W = 6R ⇒ T falls by 4 K.\n" +
        "- Volume doubled with γ = 3/2: \\(T_2 = \\dfrac{T}{\\sqrt{2}}\\), \\(W = RT(2 - \\sqrt{2})\\).\n" +
        "- \\(R = 0.4C_v\\) ⇒ γ = 1.4 ⇒ \\(P \\propto T^{7/2}\\).",
      formula: {
        label: "Adiabatic work",
        latex: "W = \\frac{nR\\,(T_1 - T_2)}{\\gamma - 1}",
      },
      authoredExample: {
        prompt: "Two moles of a diatomic gas (γ = 1.4) expand adiabatically and cool from 400 K to 300 K. Work done by the gas?",
        steps: ["W = 2R × 100/0.4.", "W = 500R ≈ 4155 J."],
        answer: "500R ≈ 4.2 kJ",
      },
      selfCheckExample: {
        prompt: "One mole with γ = 1.5 does 10R of work adiabatically. Fall in temperature?",
        steps: ["10R = R ΔT/0.5."],
        answer: "5 K",
      },
      practiceSet: [
        { prompt: "An ideal gas expands adiabatically. Its internal energy?", answer: "Decreases" },
      ],
      pyqExampleId: "7bf039af-f89b-4c12-890b-1ee1e895726d",
      traps: [
        {
          title: "Dividing by γ instead of γ − 1",
          body:
            "The adiabatic work is nRΔT/(γ − 1), because it equals nC_vΔT and C_v = R/(γ − 1).",
        },
      ],
    },
  ],
  related: [
    { label: "Processes — isothermal, adiabatic, isobaric, isochoric", href: `${BASE}/cetp-td-processes` },
  ],
};
